import { useState, type ChangeEvent, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { api } from "@/config/axios";
import { Label } from "../ui/label";
import AlertDelete from "./AlertDelete";
import { Edit, PlusCircle, X } from "lucide-react";
import type { Nomination } from "@/types/nomination.type"; // Import tipe Nomination
import type { Category } from "@/types/category.type"; // Import tipe Category
import { Textarea } from "../ui/textarea";
import { SelectCustom } from "../share/SelectCustom";
import { useFetch } from "@/hooks/use-fetch";
import Loading from "../share/Loading";

// --- Tipe untuk Props ---
interface NominationFormProps {
  selectedNomination: Nomination | null;
  setSelectedNomination: (nomination: Nomination | null) => void;
  onFormSuccess: () => void;
}

export default function NominationForm({ selectedNomination, setSelectedNomination, onFormSuccess }: NominationFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(""); // State untuk category_id
  const [loading, setLoading] = useState(false);

  // Cek apakah kita dalam mode edit
  const isEditMode = !!selectedNomination;

  // Fetch data kategori untuk dropdown
  const { data: categories, loading: loadingCategories, error } = useFetch<Category[]>("/categories");

  // Format data kategori untuk SelectCustom
  const categoryOptions = categories
    ? categories.map((cat) => ({
        label: cat.name,
        value: cat.id,
      }))
    : [];

  // Gunakan useEffect untuk mengisi form saat selectedNomination berubah
  useEffect(() => {
    if (selectedNomination) {
      setName(selectedNomination.name);
      setDescription(selectedNomination.description);
      setCategoryId(selectedNomination.category_id); // Set ID kategori
    } else {
      // Jika mode create, kosongkan form
      setName("");
      setDescription("");
      setCategoryId("");
    }
  }, [selectedNomination]);

  // --- Handler untuk CREATE (POST) ---
  const handleCreate = async () => {
    if (!name || !description || !categoryId) {
      toast.error("Lengkapi semua field terlebih dahulu!");
      return;
    }

    // Body sesuai permintaan: name, description, category_id
    const body = { name, description, category_id: categoryId };

    try {
      setLoading(true);
      await api.post("/nominations", body);
      toast.success("Nominasi berhasil ditambahkan!");
      onFormSuccess(); // Panggil handler sukses dari parent
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Gagal menambah nominasi");
    } finally {
      setLoading(false);
    }
  };

  // --- Handler untuk UPDATE (PUT) ---
  const handleUpdate = async () => {
    if (!selectedNomination) return;

    if (!name || !description || !categoryId) {
      toast.error("Lengkapi semua field terlebih dahulu!");
      return;
    }

    const body = { name, description, category_id: categoryId };

    try {
      setLoading(true);
      await api.put(`/nominations/${selectedNomination.id}`, body);
      toast.success("Nominasi berhasil diupdate!");
      onFormSuccess(); // Panggil handler sukses dari parent
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Gagal update nominasi");
    } finally {
      setLoading(false);
    }
  };

  // --- Submit Handler Utama ---
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  if (loadingCategories) return <Loading />;
  if (error) return <p className="text-red-500">Gagal memuat kategori...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* SelectCustom untuk Kategori */}
      <SelectCustom title="Kategori" placeholder="Pilih Kategori" items={categoryOptions} value={categoryId} onChange={(value) => setCategoryId(value)} disabled={loadingCategories || loading} />

      <div className="space-y-2">
        <Label>Nama Nominasi</Label>
        <Input className="border-border outline" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder="Masukkan nama nominasi" />
      </div>

      <div className="space-y-2">
        <Label>Deskripsi</Label>
        <Textarea
          className="border-border outline"
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setDescription(e.target.value);
          }}
          placeholder="Deskripsi singkat nominasi"
        />
      </div>

      {/* Tampilkan tombol secara dinamis berdasarkan mode */}
      <div className="flex gap-2">
        {isEditMode ? (
          <>
            <Button type="submit" disabled={loading}>
              {loading ? "Mengupdate..." : "Update"} <Edit className="ml-2 h-4 w-4" />
            </Button>
            <AlertDelete<Nomination> item={selectedNomination} endpoint="/nominations" onSuccess={onFormSuccess} />
            <Button variant={"outline"} type="button" onClick={() => setSelectedNomination(null)}>
              Cancel <X className="ml-2 h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Submit"} <PlusCircle className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}

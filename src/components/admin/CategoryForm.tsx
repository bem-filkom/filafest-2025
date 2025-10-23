import { useState, type ChangeEvent, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { api } from "@/config/axios";
import { Label } from "../ui/label";
import { Edit, PlusCircle, X } from "lucide-react";
import type { Category } from "@/types/category.type"; // Import tipe Category
import { Textarea } from "../ui/textarea";

// --- Tipe untuk Props ---
interface CategoryFormProps {
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
  onFormSuccess: () => void;
}

export default function CategoryForm({ selectedCategory, setSelectedCategory, onFormSuccess }: CategoryFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Cek apakah kita dalam mode edit
  const isEditMode = !!selectedCategory;

  // Gunakan useEffect untuk mengisi form saat selectedCategory berubah
  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name);
      setDescription(selectedCategory.description);
    } else {
      // Jika mode create (selectedCategory null), kosongkan form
      setName("");
      setDescription("");
    }
  }, [selectedCategory]);

  // --- Handler untuk CREATE (POST) ---
  const handleCreate = async () => {
    if (!name || !description) {
      toast.error("Nama dan Deskripsi tidak boleh kosong!");
      return;
    }

    // Body untuk POST (name dan description)
    const body = { name, description };

    try {
      setLoading(true);
      // Endpoint: /categories
      await api.post("/categories", body);
      toast.success("Kategori berhasil ditambahkan!");
      onFormSuccess(); // Panggil handler sukses dari parent
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Gagal menambah kategori");
    } finally {
      setLoading(false);
    }
  };

  // --- Handler untuk UPDATE (PUT) ---
  const handleUpdate = async () => {
    if (!selectedCategory) return;

    if (!name || !description) {
      toast.error("Nama dan Deskripsi tidak boleh kosong!");
      return;
    }

    // Body untuk PUT (name dan description)
    const body = { name, description };

    try {
      setLoading(true);
      // Endpoint: /categories/:id
      await api.put(`/categories/${selectedCategory.id}`, body);
      toast.success("Kategori berhasil diupdate!");
      onFormSuccess(); // Panggil handler sukses dari parent
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Gagal update kategori");
    } finally {
      setLoading(false);
    }
  };

  // --- Submit Handler Utama ---
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Cegah default submit form
    if (isEditMode) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Nama Kategori</Label>
        <Input className="border-border outline" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder="Masukkan nama kategori" />
      </div>

      <div className="space-y-2">
        <Label>Deskripsi</Label>
        <Textarea
          className="border-border outline"
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setDescription(e.target.value);
          }}
          placeholder="Deskripsi singkat kategori"
        />
      </div>

      {/* Tampilkan tombol secara dinamis berdasarkan mode */}
      <div className="flex gap-2">
        {isEditMode ? (
          <>
            <Button type="submit" disabled={loading}>
              {loading ? "Mengupdate..." : "Update"} <Edit className="ml-2 h-4 w-4" />
            </Button>

            <Button variant={"outline"} type="button" onClick={() => setSelectedCategory(null)}>
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

import { useState, type ChangeEvent, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import FileInputDragDrop from "./FileInputDragDrop";
import { api } from "@/config/axios";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import AlertDelete from "./AlertDelete";
import { Edit, PlusCircle, X } from "lucide-react";
import type { Candidate } from "@/types/candidate.type"; // Import tipe Candidate
import { Textarea } from "../ui/textarea";

// --- Tipe untuk Props ---
interface CandidateFormProps {
  selectedCandidate: Candidate | null;
  setSelectedCandidate: (candidate: Candidate | null) => void;
  onFormSuccess: () => void;
}

export default function CandidateForm({ selectedCandidate, setSelectedCandidate, onFormSuccess }: CandidateFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState(""); // Ini akan map ke 'description' dari tipe
  const [file, setFile] = useState<File | null>(null);
  const [initialPreview, setInitialPreview] = useState<string | null>(null); // Untuk preview gambar yg sudah ada
  const [loading, setLoading] = useState(false);

  // Cek apakah kita dalam mode edit
  const isEditMode = !!selectedCandidate;

  // Gunakan useEffect untuk mengisi form saat selectedCandidate berubah
  useEffect(() => {
    if (selectedCandidate) {
      setName(selectedCandidate.name);
      setDescription(selectedCandidate?.description); // Asumsi 'content' di form = 'description' di tipe
      setFile(null); // Hapus file yg mungkin dipilih sebelumnya
      setInitialPreview(selectedCandidate.image_url); // Set preview ke gambar dari URL
    } else {
      // Jika mode create (selectedCandidate null), kosongkan form
      setName("");
      setDescription("");
      setFile(null);
      setInitialPreview(null);
    }
  }, [selectedCandidate]);

  // --- Handler untuk CREATE (POST) ---
  const handleCreate = async () => {
    if (!name || !description || !file) {
      toast.error("Lengkapi semua field terlebih dahulu!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image_file", file);

    try {
      setLoading(true);
      await api.post("/candidates", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Kandidat berhasil ditambahkan!");
      onFormSuccess(); // Panggil handler sukses dari parent
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Gagal upload kandidat");
    } finally {
      setLoading(false);
    }
  };

  // --- Handler untuk UPDATE (PATCH) ---
  const handleUpdate = async () => {
    if (!selectedCandidate) return;

    if (!name || !description) {
      toast.error("Nama dan Deskripsi tidak boleh kosong!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    // Hanya kirim file jika user memilih file baru
    if (file) {
      formData.append("image_file", file);
    }

    try {
      setLoading(true);
      // Gunakan PATCH (atau PUT) dan sertakan ID
      await api.put(`/candidates/${selectedCandidate.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Kandidat berhasil diupdate!");
      onFormSuccess(); // Panggil handler sukses dari parent
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Gagal update kandidat");
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
    // Bungkus dengan tag <form> dan gunakan onSubmit
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Foto </Label>
          <Badge className="text-xs italic font-medium" variant={"outline"}>
            *max 30mb
          </Badge>
        </div>
        {/* Teruskan initialPreview sebagai previewUrl */}
        <FileInputDragDrop file={file} setFile={setFile} previewUrl={initialPreview} />
      </div>

      <div className="space-y-2">
        <Label>Nama</Label>
        <Input className="border-border outline" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder="Masukkan nama kandidat" />
      </div>

      <div className="space-y-2">
        <Label>Deskripsi</Label>

        <Textarea
          className="border-border outline"
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setDescription(e.target.value);
          }}
          placeholder="Deskripsi singkat kandidat"
        />
      </div>

      {/* Tampilkan tombol secara dinamis berdasarkan mode */}
      <div className="flex gap-2">
        {isEditMode ? (
          <>
            <Button type="submit" disabled={loading}>
              {loading ? "Mengupdate..." : "Update"} <Edit className="ml-2 h-4 w-4" />
            </Button>

            {/* Teruskan props ke AlertDelete */}
            <AlertDelete<Candidate> item={selectedCandidate} endpoint="/candidates" onSuccess={onFormSuccess} />

            <Button variant={"outline"} type="button" onClick={() => setSelectedCandidate(null)}>
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

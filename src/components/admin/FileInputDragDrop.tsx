import { useState, type ChangeEvent, type DragEvent, useEffect } from "react"; // Import useEffect
import { Badge } from "../ui/badge";
import { CopyPlus } from "lucide-react";

interface FileInputDragDropProps {
  file: File | null;
  setFile: (file: File | null) => void;
  previewUrl?: string | null; // Tambahkan prop ini
}

export default function FileInputDragDrop({ file, setFile, previewUrl }: FileInputDragDropProps) {
  // State preview internal
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const MAX_SIZE = 30000 * 1024; // 30MB (sesuai file Anda)

  // Gunakan useEffect untuk mengatur preview berdasarkan file atau previewUrl
  useEffect(() => {
    if (file) {
      // Jika ada file baru, buat Object URL
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Cleanup Object URL saat komponen unmount atau file berubah
      return () => URL.revokeObjectURL(objectUrl);
    } else if (previewUrl) {
      // Jika tidak ada file baru tapi ada previewUrl, gunakan itu
      setPreview(previewUrl);
    } else {
      // Jika tidak ada keduanya, kosongkan preview
      setPreview(null);
    }
  }, [file, previewUrl]);

  const validateFile = (selectedFile: File) => {
    if (selectedFile.size > MAX_SIZE) {
      setError(`Ukuran file tidak boleh lebih dari ${MAX_SIZE / 1024 / 1024}mb`);
      setFile(null);
      setPreview(previewUrl || null); // Kembalikan ke preview awal jika ada
      return false;
    }
    setError(null);
    return true;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!validateFile(selectedFile)) return;

      setFile(selectedFile);
      // Preview akan di-handle oleh useEffect
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (!validateFile(droppedFile)) return;

      setFile(droppedFile);
      // Preview akan di-handle oleh useEffect
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-border bg-background"
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onClick={() => document.getElementById("picture")?.click()}
    >
      {preview ? (
        <>
          <Badge variant={"secondary"} className="absolute top-2 left-2 z-10">
            Preview Gambar
          </Badge>
          <img src={preview} alt="Preview" className="max-h-64 border border-border aspect-square object-cover rounded-lg" />
        </>
      ) : (
        <div className="py-10">
          <CopyPlus className="mx-auto" />
          <p className="text-center text-sm text-muted-foreground">Drag & drop file di sini, atau klik untuk memilih</p>
        </div>
      )}

      <input id="picture" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

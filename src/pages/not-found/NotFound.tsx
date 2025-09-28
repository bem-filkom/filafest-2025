import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-6">
      {/* Angka 404 */}
      <h1 className="text-7xl md:text-9xl font-extrabold  drop-shadow-sm">404</h1>

      {/* Judul */}
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-foreground/90">Halaman Tidak Ditemukan</h2>

      {/* Deskripsi */}
      <p className="mt-2 text-muted-foreground max-w-md">Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.</p>

      {/* Tombol kembali */}
      <div className="mt-6">
        <Link to="/">
          <Button size="lg" className="rounded-full px-6 shadow-md shadow-primary/20">
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
}

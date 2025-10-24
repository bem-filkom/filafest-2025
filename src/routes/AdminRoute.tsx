// src/routes/AdminRoute.tsx (FILE BARU)

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth"; // Sesuaikan path ke useAuth Anda
import Loading from "@/components/share/Loading";

export default function AdminRoute() {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // 1. Tampilkan loading jika context masih memeriksa token
  if (loading) {
    // Ganti dengan komponen loading/spinner jika ada
    return <Loading />;
  }

  // 2. Jika tidak login, redirect ke halaman login
  if (!isAuthenticated) {
    // Kirim 'location' agar setelah login bisa kembali ke halaman admin
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Jika login TAPI role-nya BUKAN ADMIN, redirect ke halaman lain
  //    (Asumsi role admin adalah 'ADMIN', sesuaikan jika berbeda)
  if (user?.role !== "ADMIN") {
    // Anda bisa redirect ke halaman "Unauthorized" atau halaman utama
    return <Navigate to="/" replace />;
  }

  // 4. Jika lolos semua pengecekan (login dan role ADMIN),
  //    tampilkan halaman admin yang dituju (menggunakan <Outlet />)
  return <Outlet />;
}

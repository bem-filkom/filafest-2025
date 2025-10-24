// src/routes/index.tsx (MODIFIKASI)

import Admin from "@/pages/admin/Admin";
import AdminCandidates from "@/pages/admin/candidates/AdminCandidates";
import AdminCategories from "@/pages/admin/categories/AdminCategories";
import AdminNominations from "@/pages/admin/nominations/AdminNomination";
import AdminNominee from "@/pages/admin/nominee/AdminNominee";
import Login from "@/pages/auth/Login";
import Awarding from "@/pages/awarding/Awarding";
import Candidates from "@/pages/candidates/Candidates";
import Categories from "@/pages/categories/Categories";
import Landing from "@/pages/landing/Landing";
import NotFound from "@/pages/not-found/NotFound";

import { Routes, Route } from "react-router-dom";
import AdminRoute from "./AdminRoute";

// 1. Import AdminRoute yang baru Anda buat

export default function AppRouter() {
  return (
    <Routes>
      {/* Rute Publik */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:slug" element={<Candidates />} />
      <Route path="/awarding" element={<Awarding />} />

      {/* 2. Rute Admin yang Dilindungi 
        Semua rute admin sekarang menjadi 'children' dari AdminRoute.
      */}
      <Route path="/admin" element={<AdminRoute />}>
        {/* Rute 'index' akan me-render /admin */}
        <Route index element={<Admin />} />

        {/* Rute anak tidak perlu /admin lagi di path-nya */}
        <Route path="categories" element={<AdminCategories />} />
        <Route path="nominations" element={<AdminNominations />} />
        <Route path="candidates" element={<AdminCandidates />} />
        <Route path="nominee" element={<AdminNominee />} />
      </Route>

      {/* Rute Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

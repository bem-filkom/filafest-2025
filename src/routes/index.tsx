import MainLayout from "@/components/share/MainLayout";
import Admin from "@/pages/admin/Admin";
import AdminCategories from "@/pages/admin/categories/AdminCategories";
import AdminNominations from "@/pages/admin/nominations/AdminNomination";
import Login from "@/pages/auth/Login";
import Awarding from "@/pages/awarding/Awarding";
import Candidates from "@/pages/candidates/Candidates";
import Categories from "@/pages/categories/Categories";
import Landing from "@/pages/landing/Landing";
import NotFound from "@/pages/not-found/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: (
      <MainLayout>
        <Login />
      </MainLayout>
    ),
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/categories/:slug",
    element: <Candidates />,
  },
  {
    path: "/awarding",
    element: <Awarding />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin/categories",
    element: <AdminCategories />,
  },
  {
    path: "/admin/nominations",
    element: <AdminNominations />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  //   {
  //     path: "/voting",
  //     element: (
  //       <ProtectedRoute>
  //         <VotingPage />
  //       </ProtectedRoute>
  //     ),
  //   },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

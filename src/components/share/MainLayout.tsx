import type { ReactNode } from "react";
import { Toaster } from "../ui/sonner";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      {children}
      <Toaster />
    </main>
  );
}

import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return <main className="overflow-hidden">{children}</main>;
}

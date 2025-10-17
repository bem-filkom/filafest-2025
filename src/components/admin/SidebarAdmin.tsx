import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { LayoutDashboard, LogOut, ScrollText, User2Icon } from "lucide-react";
import { Button } from "../ui/button";

export default function SidebarAdmin({ children }: { children: React.ReactNode }) {
  const items = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Kategori",
      url: "/admin/categories",
      icon: ScrollText,
    },
    {
      title: "Nominasi",
      url: "/admin/nominations",
      icon: ScrollText,
    },
    {
      title: "Candidates",
      url: "/admin/candidates",
      icon: User2Icon,
    },
  ];
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="mb-10">
          <Button>
            Keluar <LogOut />
          </Button>
        </SidebarFooter>
      </Sidebar>

      <main className="min-h-screen bg-slate-950/20 w-full p-5">{children}</main>
    </SidebarProvider>
  );
}

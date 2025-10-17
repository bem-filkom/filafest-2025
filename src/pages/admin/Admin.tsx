import ChartDashboard from "@/components/admin/ChartDashboard";
import SidebarAdmin from "@/components/admin/SidebarAdmin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartColumn } from "lucide-react";

export default function Admin() {
  return (
    <SidebarAdmin>
      <h1 className="text-3xl font-semibold mb-10">Dashboard</h1>
      <Tabs defaultValue="all" className="">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            <ChartColumn />
            Semua
          </TabsTrigger>
          <TabsTrigger value="dosen">
            <ChartColumn />
            Dosen
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-3 gap-5 mb-10">
            <ChartDashboard />
            <ChartDashboard />
            <ChartDashboard />
            <ChartDashboard />
            <ChartDashboard />
            <ChartDashboard />
            <ChartDashboard />
          </div>
        </TabsContent>
        <TabsContent value="dosen">
          <div className="grid grid-cols-3 gap-5 mb-10">
            <ChartDashboard />
          </div>
        </TabsContent>
      </Tabs>
    </SidebarAdmin>
  );
}

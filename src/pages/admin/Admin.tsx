import ChartDashboard from "@/components/admin/ChartDashboard";
import SidebarAdmin from "@/components/admin/SidebarAdmin";

export default function Admin() {
  return (
    <SidebarAdmin>
      <h1 className="text-3xl font-semibold mb-10">Dashboard</h1>
      <div className="grid grid-cols-3 gap-5 mb-10">
        <ChartDashboard />
        <ChartDashboard />
        <ChartDashboard />
        <ChartDashboard />
        <ChartDashboard />
        <ChartDashboard />
        <ChartDashboard />
      </div>
    </SidebarAdmin>
  );
}

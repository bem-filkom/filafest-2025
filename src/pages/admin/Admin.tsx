import ChartDashboard from "@/components/admin/ChartDashboard";
import SidebarAdmin from "@/components/admin/SidebarAdmin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartColumn, DecimalsArrowRight, UsersRoundIcon } from "lucide-react";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Admin() {
  return (
    <SidebarAdmin>
      <h1 className="text-3xl font-semibold mb-10">Dashboard</h1>
      <div className="grid grid-cols-4 mb-10 gap-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <CardDescription>Total Vote</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">0</CardTitle>
              <CardAction>
                <Badge>
                  <UsersRoundIcon />
                  DOSEN
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-xs">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Jumlah total suara yang diberikan untuk kategori dosen <DecimalsArrowRight className="size-4" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
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

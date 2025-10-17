import SidebarAdmin from "@/components/admin/SidebarAdmin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, Search } from "lucide-react";

export default function AdminCategories() {
  return (
    <SidebarAdmin>
      <h1 className="text-3xl font-semibold mb-10">Kelola Kategori</h1>
      <div className="grid grid-cols-2 gap-10 h-full">
        <div className="h-full">
          <Card className="h-full">
            <CardHeader className="border-b">
              <CardTitle>List Kategori</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Pencarian</Label>
                <div className="flex gap-2">
                  <Input className="border-border outline" placeholder="Cari kategori" />
                  <Button>
                    <Search />
                  </Button>
                </div>
              </div>
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="cursor-pointer border-b-2 hover:border-b-slate-500">
                  <CardContent>
                    <div className="flex justify-between">
                      <p>Hello</p>
                      <ChevronRight />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Form</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Judul</Label>
                  <Input className="border-border outline" type="password" placeholder="" />
                </div>
                <div className="space-y-2">
                  <Label>Deskripsi</Label>
                  <Input className="border-border outline" type="password" placeholder="" />
                </div>
                <Button>Submit</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarAdmin>
  );
}

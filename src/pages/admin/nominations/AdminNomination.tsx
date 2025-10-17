import AlertDelete from "@/components/admin/AlertDelete";
import SidebarAdmin from "@/components/admin/SidebarAdmin";
import { SelectCustom } from "@/components/share/SelectCustom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, Edit, PlusCircle, Search, X } from "lucide-react";

export default function AdminNominations() {
  return (
    <SidebarAdmin>
      <div className=" flex flex-col">
        <h1 className="text-3xl font-semibold mb-6">Kelola Nominasi</h1>
        <div className="grid grid-cols-2 gap-10 flex-1 ">
          <div className="flex flex-col h-[80vh]">
            <Card className="flex flex-col flex-1 overflow-y-hidden ">
              <CardHeader className="border-b shrink-0">
                <CardTitle>List Nominasi</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 overflow-hidden space-y-4">
                <div className="space-y-2 shrink-0">
                  <Label>Pencarian</Label>
                  <div className="flex gap-2">
                    <Input className="border-border outline" placeholder="Cari nominasi" />
                    <Button>
                      <Search />
                    </Button>
                  </div>
                </div>
                <div className="overflow-y-auto space-y-2 flex-1 pr-2">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Card key={index} className="cursor-pointer border-b border-slate-700">
                      <CardContent className="">
                        <div className="flex justify-between items-center">
                          <p>Hello</p>
                          <ChevronRight />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col">
            <Card className="">
              <CardHeader className="border-b">
                <CardTitle>Form</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 overflow-auto">
                <div className="space-y-2">
                  <SelectCustom
                    title="Kategori"
                    items={[
                      { label: "Dosen", value: "dosen" },
                      { label: "LO", value: "lo" },
                      { label: "Himpunan", value: "himpunan" },
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Judul</Label>
                  <Input className="border-border outline" placeholder="" />
                </div>
                <div className="space-y-2">
                  <Label>Deskripsi</Label>
                  <Input className="border-border outline" placeholder="" />
                </div>
                <div className="flex gap-2">
                  <AlertDelete />
                  <Button>
                    Update <Edit />
                  </Button>
                  <Button variant={"outline"}>
                    Cancel <X />
                  </Button>
                  <Button>
                    Submit <PlusCircle />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarAdmin>
  );
}

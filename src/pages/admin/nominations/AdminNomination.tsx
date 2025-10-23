import { useState } from "react";
import SidebarAdmin from "@/components/admin/SidebarAdmin";
import Error from "@/components/share/Error";
import Loading from "@/components/share/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFetch } from "@/hooks/use-fetch";
import { ChevronRight, Search } from "lucide-react";
import type { Nomination } from "@/types/nomination.type"; // Import tipe Nomination
import NominationForm from "@/components/admin/NominationForm"; // Import form yang baru

// --- Tipe untuk Props ListCard ---
interface ListCardProps {
  onSelectNomination: (nomination: Nomination) => void;
  selectedNominationId: string | null;
}

// --- Komponen ListCard ---
const ListCard = ({ onSelectNomination, selectedNominationId }: ListCardProps) => {
  // Gunakan endpoint /nominations
  const { data, loading, error } = useFetch<Nomination[]>("/nominations");
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <Loading />;
  if (error) return <Error />;

  const filteredData = data?.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())) ?? [];

  return (
    <Card className="flex flex-col flex-1 overflow-y-hidden">
      <CardHeader className="border-b shrink-0">
        <CardTitle>List Nominasi</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 overflow-hidden space-y-4">
        <div className="space-y-2 shrink-0">
          <Label>Pencarian</Label>
          <div className="flex gap-2">
            <Input className="border-border outline" placeholder="Cari nominasi berdasarkan nama..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Button type="button">
              <Search />
            </Button>
          </div>
        </div>

        <div className="overflow-y-auto space-y-2 flex-1 pr-2">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <Card
                key={item.id}
                className={`cursor-pointer transition-colors ${selectedNominationId === item.id ? "bg-blue-600/30 border-blue-600" : "bg-blue-600/10 hover:bg-blue-600/20"}`}
                onClick={() => onSelectNomination(item)}
              >
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <ChevronRight />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center">Tidak ada nominasi yang cocok.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// --- Komponen Halaman Utama ---
export default function AdminNominations() {
  // State untuk melacak nominasi yang dipilih
  const [selectedNomination, setSelectedNomination] = useState<Nomination | null>(null);

  // State untuk me-remount ListCard agar me-fetch ulang data
  const [listKey, setListKey] = useState(0);

  // Fungsi yang dipanggil dari form setelah sukses
  const handleFormSuccess = () => {
    setSelectedNomination(null); // Kosongkan form
    setListKey((prevKey) => prevKey + 1); // Ganti key untuk memicu fetch ulang ListCard
  };

  return (
    <SidebarAdmin>
      <div className=" flex flex-col">
        <h1 className="text-3xl font-semibold mb-6">Kelola Nominasi</h1>
        <div className="grid grid-cols-2 gap-10 flex-1 ">
          <div className="flex flex-col h-[80vh]">
            <ListCard key={listKey} onSelectNomination={setSelectedNomination} selectedNominationId={selectedNomination?.id ?? null} />
          </div>
          <div className="flex flex-col">
            <Card className="">
              <CardHeader className="border-b">
                <CardTitle>{selectedNomination ? "Edit Nominasi" : "Tambah Nominasi Baru"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 overflow-auto pt-4">
                <NominationForm selectedNomination={selectedNomination} setSelectedNomination={setSelectedNomination} onFormSuccess={handleFormSuccess} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarAdmin>
  );
}

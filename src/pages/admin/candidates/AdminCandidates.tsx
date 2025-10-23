import CandidateForm from "@/components/admin/CandidateForm";
import SidebarAdmin from "@/components/admin/SidebarAdmin";
import Error from "@/components/share/Error";
import Loading from "@/components/share/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFetch } from "@/hooks/use-fetch";
import type { Candidate } from "@/types/candidate.type";
import { ChevronRight, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

// --- Tipe untuk Props ListCard ---
interface ListCardProps {
  onSelectCandidate: (candidate: Candidate) => void;
  selectedCandidateId: string | null;
}

const ListCard = ({ onSelectCandidate, selectedCandidateId }: ListCardProps) => {
  const { data, loading, error } = useFetch<Candidate[]>("/candidates");
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <Loading />;
  if (error) return <Error />;

  const filteredData = data?.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())) ?? [];

  return (
    <Card className="flex flex-col flex-1 overflow-y-hidden">
      <CardHeader className="border-b shrink-0">
        <CardTitle>List Kandidat</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 overflow-hidden space-y-4">
        <div className="space-y-2 shrink-0">
          <Label>Pencarian</Label>
          <div className="flex gap-2">
            <Input className="border-border outline" placeholder="Cari kandidat berdasarkan nama..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Button type="button">
              <Search />
            </Button>
          </div>
        </div>

        <div className="overflow-y-auto space-y-2 flex-1 pr-2">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <Card
                key={item.id} // Gunakan ID unik, bukan index
                className={`cursor-pointer transition-colors ${selectedCandidateId === item.id ? "bg-blue-600/30 border-blue-600" : "bg-blue-600/10 hover:bg-blue-600/20"}`} // Tambahkan highlighting
                onClick={() => onSelectCandidate(item)} // Set kandidat saat di-klik
              >
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={item.image_url} />
                        <AvatarFallback>{item.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <p>{item.name}</p>
                    </div>
                    <ChevronRight />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center">Tidak ada kandidat yang cocok.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function AdminCandidates() {
  // State untuk melacak kandidat yang dipilih
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // State untuk me-remount ListCard agar me-fetch ulang data
  const [listKey, setListKey] = useState(0);

  // Fungsi yang dipanggil dari form setelah sukses (Create/Update/Delete)
  const handleFormSuccess = () => {
    setSelectedCandidate(null); // Kosongkan form
    setListKey((prevKey) => prevKey + 1); // Ganti key untuk memicu fetch ulang ListCard
  };

  return (
    <SidebarAdmin>
      <div className=" flex flex-col">
        <h1 className="text-3xl font-semibold mb-6">Kelola Kandidat</h1>
        <div className="grid grid-cols-2 gap-10 flex-1 ">
          <div className="flex flex-col h-[80vh]">
            {/* 1. Berikan key={listKey} agar komponen ini di-remount saat listKey berubah
              2. Teruskan handler untuk men-set kandidat terpilih
              3. Teruskan ID kandidat terpilih untuk highlighting
            */}
            <ListCard key={listKey} onSelectCandidate={setSelectedCandidate} selectedCandidateId={selectedCandidate?.id ?? null} />
          </div>
          <div className="flex flex-col">
            <Card className="">
              <CardHeader className="border-b">
                {/* Judul form dinamis */}
                <CardTitle>{selectedCandidate ? "Edit Kandidat" : "Tambah Kandidat Baru"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 overflow-auto pt-4">
                {/* 1. Teruskan data kandidat yang dipilih
                  2. Teruskan setter untuk mengosongkan pilihan (via tombol cancel)
                  3. Teruskan handler sukses untuk me-refresh list
                */}
                <CandidateForm selectedCandidate={selectedCandidate} setSelectedCandidate={setSelectedCandidate} onFormSuccess={handleFormSuccess} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarAdmin>
  );
}

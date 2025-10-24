import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Nomination } from "@/types/nomination.type";
import { Loader2, Plus, Search } from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { Candidate } from "@/types/candidate.type";
import { useState } from "react";
import { toast } from "sonner";
import type { Nominee } from "@/types/nominee.type"; // Asumsikan Anda punya file ini
import { api } from "@/config/axios";
import { Spinner } from "../ui/spinner";

export default function DialogAddNominee({ nomination, candidates: data }: { nomination: Nomination; candidates: Candidate[] }) {
  const [open, setOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Menyimpan ID kandidat yang terpilih saat ini
  const [selected, setSelected] = useState<string[]>([]);

  // Menyimpan ID kandidat yang sudah menjadi nominee (dari API)
  const [initialSelected, setInitialSelected] = useState<string[]>([]);

  // Memetakan candidate.id ke nominee.id untuk operasi DELETE
  const [nomineeIdMap, setNomineeIdMap] = useState<Map<string, string>>(new Map());

  const [sortedCandidates, setSortedCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fungsi untuk mengambil nominee yang sudah ada
  const fetchNominees = async () => {
    setIsFetching(true);
    try {
      const response = await api.get(`/nominees?nomination_id=${nomination.id}`);

      const existingNominees = response.data.data.nominees || [];

      const initialIds: string[] = [];
      const newMap = new Map<string, string>();

      existingNominees.forEach((nominee: Nominee) => {
        initialIds.push(nominee.candidate.id);
        newMap.set(nominee.candidate.id, nominee.id); // Map candidate_id -> nominee_id
      });

      setSelected(initialIds);
      setInitialSelected(initialIds);
      setNomineeIdMap(newMap);

      const sorted = [...data].sort((a, b) => {
        const aSelected = initialIds.includes(a.id);
        const bSelected = initialIds.includes(b.id);
        if (aSelected === bSelected) return 0;
        return aSelected ? -1 : 1;
      });
      setSortedCandidates(sorted);
    } catch (error) {
      console.error("Gagal mengambil nominee:", error);
      toast.error("Gagal memuat data nominee yang sudah ada.");
    } finally {
      setIsFetching(false);
    }
  };

  // Handler utama untuk membuka/menutup dialog
  const handleOpenChange = async (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      // Hanya eksekusi GET ketika dialog dibuka
      await fetchNominees();
    } else {
      // Bersihkan state saat dialog ditutup
      setSelected([]);
      setInitialSelected([]);
      setNomineeIdMap(new Map());
      setIsFetching(false);
      setIsSaving(false);
    }
  };

  // Toggle select berdasarkan candidate.id
  const toggleSelect = (candidateId: string) => {
    setSelected((prev) => (prev.includes(candidateId) ? prev.filter((id) => id !== candidateId) : [...prev, candidateId]));
  };

  // Handler untuk menyimpan perubahan (ADD dan DELETE)
  const handleSubmit = async () => {
    setIsSaving(true);

    // Tentukan apa yang akan ditambah dan dihapus
    const toAdd = selected.filter((id) => !initialSelected.includes(id));
    const toDelete = initialSelected.filter((id) => !selected.includes(id));

    const addRequests = toAdd.map((candidateId) =>
      api.post("/nominees", {
        nomination_id: nomination.id,
        candidate_id: candidateId,
      })
    );

    const deleteRequests = toDelete.map((candidateId) => {
      const nomineeId = nomineeIdMap.get(candidateId);
      return api.delete(`/nominees/${nomineeId}`);
    });

    try {
      await Promise.all([...addRequests, ...deleteRequests]);

      const successMessages = [];
      if (toAdd.length > 0) successMessages.push(`menambahkan ${toAdd.length}`);
      if (toDelete.length > 0) successMessages.push(`menghapus ${toDelete.length}`);

      if (successMessages.length > 0) {
        toast.success(`Berhasil ${successMessages.join(" dan ")} nominee.`);
      } else {
        toast.info("Tidak ada perubahan.");
      }

      handleOpenChange(false); // Tutup dialog dan reset state
    } catch (error) {
      console.error("Gagal menyimpan perubahan nominee:", error);
      toast.error("Terjadi kesalahan saat menyimpan perubahan.");
    } finally {
      setIsSaving(false);
    }
  };

  const isLoading = isFetching || isSaving;

  const filteredCandidates = sortedCandidates.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <article className="p-4 flex justify-between bg-blue-50/10 hover:border-orange-900 cursor-pointer border-2 border-border rounded-lg">
          <p>{nomination.name}</p>
          <Plus />
        </article>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] h-full flex flex-col">
        <DialogHeader className="border-b pb-2 ">
          <Badge className="mb-2">{nomination.name}</Badge>
          <DialogTitle className="mb-2">Edit Nominee</DialogTitle>
          <div className="flex mb-3 justify-between items-center">
            <div className="flex gap-2">
              <div className="px-4 py-2 rounded-lg bg-white/10">
                <Badge className="mb-2">Total Kandidat</Badge>
                <div className="flex items-end gap-1">
                  <p className="text-2xl">{data.length}</p>
                  <p className="text-xs italic">Orang</p>
                </div>
              </div>
              <div className="px-4 py-2 rounded-lg bg-white/10">
                <Badge className="mb-2">Total Nominee</Badge>
                <div className="flex items-end gap-1">
                  <p className="text-2xl">{nomineeIdMap.size}</p>
                  <p className="text-xs italic">Orang</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Input placeholder="Cari" className="border-border max-w-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <Button>
                <Search />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {isFetching ? (
          <div className="flex items-center justify-center grow min-h-[200px] ">
            <Spinner />
            <p className="ml-2">Memuat nominee...</p>
          </div>
        ) : (
          <fieldset disabled={isSaving} className="grid grid-cols-3 gap-4 overflow-auto grow h-max pr-2">
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  onClick={() => toggleSelect(candidate.id)}
                  className={`flex gap-2 select-none rounded-lg p-2 bg-blue-50/10 items-center h-max border cursor-pointer transition ${
                    selected.includes(candidate.id) ? "border-orange-500" : "border-border"
                  }`}
                >
                  <Checkbox checked={selected.includes(candidate.id)} onCheckedChange={() => toggleSelect(candidate.id)} className="border-white cursor-pointer" />
                  <Avatar>
                    <AvatarImage src={candidate.image_url} alt={"profile"} />
                    <AvatarFallback>{candidate.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm line-clamp-2">{candidate.name}</p>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3 text-sm text-muted-foreground italic">Tidak ada kandidat ditemukan.</p>
            )}
          </fieldset>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit} disabled={isLoading}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

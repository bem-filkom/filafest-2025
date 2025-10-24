import DialogAddNominee from "@/components/admin/DialogAddNominee";
import SidebarAdmin from "@/components/admin/SidebarAdmin";
import Error from "@/components/share/Error";
import Loading from "@/components/share/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/use-fetch";
import type { Candidate } from "@/types/candidate.type";
import type { Nomination } from "@/types/nomination.type";
import { Search } from "lucide-react";
import { useState } from "react";

export default function AdminNominee() {
  const { data: nominations, loading: loadingNomination, error: errorNomination } = useFetch<Nomination[]>("/nominations");
  const { data: candidates, loading: loadingCandidates, error: errorCandidates } = useFetch<Candidate[]>("/candidates");

  const [query, setQuery] = useState("");

  if (loadingCandidates || loadingNomination) {
    return <Loading />;
  }

  if (errorCandidates || errorNomination) {
    return <Error />;
  }

  const filteredNominations = nominations?.filter((nom) => (nom.name ?? "").toLowerCase().includes(query.toLowerCase())) ?? [];

  if (nominations && candidates)
    return (
      <SidebarAdmin>
        <div className="mb-10">
          <h1 className="text-3xl  font-semibold mb-2">List Nominasi</h1>
          <p className="mb-2">Tambahkan kandidat di nominasi, mas pras!</p>
          <div className="flex gap-2 justify-end">
            <Input placeholder="Cari nominasi" className="border-border max-w-sm" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Button>
              <Search />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mb-10">
          {filteredNominations.length > 0 ? (
            filteredNominations.map((item, index) => <DialogAddNominee nomination={item} key={index} candidates={candidates} />)
          ) : (
            <p className="text-muted-foreground col-span-3 text-center">Nominasi tidak ditemukan</p>
          )}
        </div>
      </SidebarAdmin>
    );
}

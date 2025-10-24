import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Loader2, Vote } from "lucide-react";
import type { Candidate } from "@/types/candidate.type";
import type { Nomination } from "@/types/nomination.type";
import { useState } from "react";
import { toast } from "sonner"; // Asumsi Anda menggunakan sonner untuk toast
import { api } from "@/config/axios";
import { useNavigate } from "react-router-dom";

export default function AlertVote({ candidate, nomination, nomineeId }: { candidate: Candidate; nomination: Nomination; nomineeId: string }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleVote = async () => {
    setIsLoading(true);
    try {
      await api.post("/votes", {
        nominee_id: nomineeId,
      });
      toast.success(`Vote Anda untuk ${candidate.name} telah disimpan!`);
      toast.info("Pilih nominasi lain yuk!");
      navigate("/categories");
      setOpen(false); // Tutup dialog setelah berhasil
    } catch (error) {
      console.error("Gagal menyimpan vote:", error);
      toast.error("Terjadi kesalahan saat menyimpan vote Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-full">
          Pilih kandidat <Vote className="ml-2 h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah kamu yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Memilih <strong>{candidate.name}</strong> sebagai <strong className="italic">{nomination.name}</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          {/* Mengganti AlertDialogAction dengan Button biasa 
            untuk mengontrol penutupan dialog secara manual via state
          */}
          <Button onClick={handleVote} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

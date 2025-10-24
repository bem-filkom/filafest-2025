import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CheckCircle2, Eye, Info, InfoIcon } from "lucide-react";
import AlertVote from "./AlertVote";
import { Badge } from "../ui/badge";
import type { Candidate } from "@/types/candidate.type";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { Nomination } from "@/types/nomination.type";
import { useAuth } from "@/hooks/use-auth";

export default function DialogDetailCandidate({
  candidate,
  nomination,
  nomineeId,
  isVoted,
  hasVoted,
}: {
  candidate: Candidate;
  nomination: Nomination;
  nomineeId: string;
  isVoted: boolean;
  hasVoted: boolean;
}) {
  const { isAuthenticated } = useAuth();
  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        {isVoted ? (
          <Button className="">
            <Eye /> Lihat Pilihanmu
          </Button>
        ) : (
          <Button className="bg-gradient-to-r from-[#2b1695] via-[#00309B] to-[#1581FF] w-full">
            <InfoIcon />
            Lihat informasi
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl w-full">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Info />
            Informasi Kandidat
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-5">
          <Avatar className="aspect-square border w-32 h-32 sm:w-40 sm:h-40 mb-2 rounded-lg overflow-hidden mx-auto sm:mx-0">
            <AvatarImage src={candidate.image_url} alt="Foto Kandidat" className="object-cover w-full h-full" />
            <AvatarFallback className="rounded-none">{candidate.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Badge className="mb-2">Nama</Badge>
            <h1 className="mb-2 text-sm sm:text-base italic font-semibold">{candidate.name}</h1>
            <Badge className="mb-2">Informasi</Badge>
            <p className="text-sm  leading-relaxed text-justify">{candidate.description}</p>
          </div>
        </div>
        <DialogFooter className="border-border border-t pt-4">
          {isAuthenticated ? (
            hasVoted ? (
              <Button className="bg-blue-800 disabled:opacity-100 cursor-not-allowed" disabled>
                Anda sudah memilih <CheckCircle2 />
              </Button>
            ) : (
              <AlertVote candidate={candidate} nomination={nomination} nomineeId={nomineeId} />
            )
          ) : (
            <a href="/login">
              <Button variant={"destructive"}>Login dulu yaa...</Button>
            </a>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

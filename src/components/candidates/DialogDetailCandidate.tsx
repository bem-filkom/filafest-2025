import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Info, InfoIcon } from "lucide-react";
import AlertVote from "./AlertVote";
import { Badge } from "../ui/badge";

export default function DialogDetailCandidate() {
  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        <Button className="bg-gradient-to-r from-[#2b1695] via-[#00309B] to-[#1581FF] w-full">
          <InfoIcon />
          Lihat informasi
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl w-full">
        <DialogHeader className="border-b border-border pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Info />
            Informasi Kandidat
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-5">
          <img src="https://umj.ac.id/storage/2024/10/parb.jpg" className="aspect-square border w-32 h-32 sm:w-40 sm:h-40 mb-2 rounded-lg object-cover mx-auto sm:mx-0" />
          <div className="flex-1">
            <Badge className="mb-2">Nama</Badge>
            <h1 className="mb-2 text-sm sm:text-base italic font-semibold">Ir. Bp. Numerouno S.Kom. P.hd</h1>
            <Badge className="mb-2">Informasi</Badge>
            <p className="text-sm sm:text-base leading-relaxed text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis ipsum rem alias repellendus expedita dolorum esse voluptatem itaque at aspernatur dolores quod aliquid excepturi
              possimus fugiat a neque fuga velit nulla sequi minus, accusantium assumenda nemo molestiae. Necessitatibus delectus illum corporis molestiae consequuntur at vero magni odit! Eveniet
              laborum magnam quas distinctio ipsum quasi, pariatur vero iste veritatis sit. Sequi beatae officiis inventore minima quod sunt sit ea aliquam quisquam quibusdam error, nihil expedita.
              Dolor itaque excepturi qui? Maxime magni soluta commodi qui praesentium voluptatum, impedit, illum quasi harum deserunt minima tempora, doloribus libero voluptas inventore. Rem labore
              quia quasi?
            </p>
          </div>
        </div>
        <DialogFooter className="border-border border-t pt-4">
          <AlertVote />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

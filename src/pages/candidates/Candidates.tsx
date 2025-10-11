import { Footer } from "@/components/share/Footer";
import { Navbar } from "@/components/share/Navbar";
import { Badge } from "@/components/ui/badge";
import maskotVote from "@/assets/maskots/vote.png";
import { Card, CardContent } from "@/components/ui/card";
import AlertVote from "@/components/candidates/AlertVote";
import { motion } from "framer-motion";

export default function Candidates() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <motion.header initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Badge className="mb-5">Nominasi</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight !font-serif italic">Best Inspiring Lecturer</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore, itaque.</p>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto mb-20 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {Array.from({ length: 10 }).map((_, index) => (
            <motion.div key={index} initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}>
              <Card>
                <CardContent>
                  <img src={maskotVote} className="aspect-square border mb-2 rounded-lg object-cover w-full" />
                  <h1 className="mb-2 text-sm italic font-semibold">Ir. Bp. Numerouno S.Kom. P.hd</h1>
                  <AlertVote />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </main>
  );
}

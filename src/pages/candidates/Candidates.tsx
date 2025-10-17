import { Footer } from "@/components/share/Footer";
import { Navbar } from "@/components/share/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import AlertVote from "@/components/candidates/AlertVote";
import { motion } from "framer-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import auth from "@/assets/auth-3d.webp";
import DialogDetailCandidate from "@/components/candidates/DialogDetailCandidate";

export default function Candidates() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <motion.header initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative pt-32 pb-16">
        <div className="max-w-6xl mx-auto mb-10">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/categories">Kategori</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Best Inspiring Lecture</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Badge className="mb-5">Nominasi</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight !font-serif italic">Best Inspiring Lecturer</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore, itaque.</p>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto mb-20 px-6">
        <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {Array.from({ length: 10 }).map((_, index) => (
            <motion.div key={index} initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}>
              <Card>
                <CardContent>
                  <img src={"https://umj.ac.id/storage/2024/10/parb.jpg"} className="aspect-square border mb-2 rounded-lg object-cover w-full" />
                  <h1 className="mb-2 text-sm italic font-semibold">Ir. Bp. Numerouno S.Kom. P.hd</h1>
                  <DialogDetailCandidate />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <a href="/categories">
          <div className="group relative py-20 px-10 cursor-pointer border-b-2 border-b-white border-r border-r-white bg-gradient-to-br from-orange-800 via-orange-700 to-amber-500 rounded-3xl shadow-2xl overflow-hidden">
            <img src={auth} className="absolute w-80 -rotate-6 right-0 transition-all duration-500 group-hover:scale-110" />
            <img src={auth} className="absolute w-80 rotate-6 left-0 transition-all duration-500 group-hover:scale-110" />
            <div className="relative text-center space-y-6">
              <Badge className="px-4 py-1 text-sm bg-white/20 backdrop-blur-sm text-white border border-white/30">tenang, masih banyak lagi!</Badge>
              <h1 className="font-extrabold text-5xl tracking-tight text-white uppercase drop-shadow-md">Jelajahi Kategori</h1>
              <Button className="px-6 py-3 font-semibold bg-white hover:bg-white text-orange-950 shadow">Cari Jagoanmu 🚀</Button>
            </div>
          </div>
        </a>
      </main>
      <Footer />
    </main>
  );
}

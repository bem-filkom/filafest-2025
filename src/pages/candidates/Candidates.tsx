import { Footer } from "@/components/share/Footer";
import { Navbar } from "@/components/share/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import auth from "@/assets/auth-3d.webp";
import DialogDetailCandidate from "@/components/candidates/DialogDetailCandidate";
import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/use-fetch";
import Error from "@/components/share/Error";
import Loading from "@/components/share/Loading";
import type { NomineesResponse } from "@/types/nominee.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import type { Nomination } from "@/types/nomination.type";

export default function Candidates() {
  const { slug } = useParams();

  const { data: dataNomination } = useFetch<Nomination>("/nominations/" + slug);

  const { data, error, loading } = useFetch<NomineesResponse>("/nominees?nomination_id=" + slug);

  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (data) {
      const voted = data.nominees.some((nominee) => nominee.is_voted === true);
      setHasVoted(voted);
    }
  }, [data]);

  if (loading) return <Loading />;

  if (error) {
    return <Error />;
  }

  if (data)
    return (
      <main className="min-h-screen">
        <Navbar />

        <motion.header initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative pt-32 pb-16">
          <div className="max-w-6xl mx-auto mb-10 px-6">
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
                  <BreadcrumbPage>{data.nomination.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Badge className="mb-5">Nominasi</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight !font-serif italic">{data.nomination.name}</h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">{dataNomination?.description}</p>
          </div>
        </motion.header>

        <main className="max-w-6xl mx-auto mb-20 px-6">
          {data.nominees.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground text-lg italic">Yah, kandidat masih belum ada.</div>
          ) : (
            <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {data.nominees.map((item, index) => (
                <motion.div key={index} initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}>
                  <Card className={`relative ${item.is_voted ? "border-orange-500" : ""}`}>
                    {item.is_voted && <Badge className="absolute top-1 right-1 z-10">Terpilih</Badge>}
                    <CardContent>
                      <div className="w-full aspect-square mb-2">
                        <Avatar className="w-full h-full rounded-lg border">
                          <AvatarImage src={item.candidate.image_url} alt="Foto Kandidat" className="object-cover" />
                          <AvatarFallback className="rounded-none">{item.candidate.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </div>

                      <h1 className="mb-2 text-sm italic font-semibold">{item.candidate.name}</h1>
                      <DialogDetailCandidate candidate={item.candidate} nomination={data.nomination} nomineeId={item.id} isVoted={item.is_voted} hasVoted={hasVoted} />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          <a href="/categories">
            <div className="group relative py-16 sm:py-20 px-6 sm:px-10 cursor-pointer border-b-2 border-b-white border-r border-r-white bg-gradient-to-br from-orange-800 via-orange-700 to-amber-500 rounded-3xl shadow-2xl overflow-hidden">
              <img src={auth} className="absolute w-40 sm:w-60 md:w-80 -rotate-6 right-0 transition-all duration-500 group-hover:scale-110" />
              <img src={auth} className="absolute w-40 sm:w-60 md:w-80 rotate-6 left-0 transition-all duration-500 group-hover:scale-110" />
              <div className="relative text-center space-y-4 sm:space-y-6">
                <Badge className="px-3 sm:px-4 py-1 text-xs sm:text-sm bg-white/20 backdrop-blur-sm text-white border border-white/30">tenang, masih banyak lagi!</Badge>
                <h1 className="font-extrabold text-2xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase drop-shadow-md">Jelajahi Kategori</h1>
                <Button className="px-4 sm:px-6 py-2 sm:py-3 font-semibold bg-white hover:bg-white text-orange-950 shadow">Cari Jagoanmu 🚀</Button>
              </div>
            </div>
          </a>
        </main>
        <Footer />
      </main>
    );
}

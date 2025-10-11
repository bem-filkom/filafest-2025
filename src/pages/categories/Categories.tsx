import { Footer } from "@/components/share/Footer";
import LightRays from "@/components/share/LightRays";
import { Navbar } from "@/components/share/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORIES } from "@/constant/categories";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function Categories() {
  return (
    <div className="z-10 bg-background text-foreground">
      <Navbar />

      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#FFF"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={8}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.3}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <motion.header initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative pt-32 pb-16">
        <div className="max-w-6xl mx-auto mb-10">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Kategori</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight !font-serif italic">Kategori Nominasi</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">Kategori penghargaan dalam FILAFEST tahun ini.</p>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <div className="space-y-20">
          {Object.entries(CATEGORIES).map(([name, items], groupIdx) => (
            <div key={groupIdx}>
              <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut", delay: groupIdx * 0.2 }}>
                <Card className="mb-5 bg-yellow-50/10">
                  <CardHeader>
                    <CardTitle>{name}</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((cat, idx) => (
                  <motion.a href="/categories/hello" key={idx} initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}>
                    <Card
                      className="group select-none relative cursor-pointer rounded-2xl border border-border bg-card/60 backdrop-blur-sm
                         shadow-sm hover:shadow-lg transition-transform transform
                         duration-300"
                    >
                      <Badge className="absolute top-0 right-0 bg-green-800">
                        <Check /> Sudah Vote
                      </Badge>
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{cat}</CardTitle>
                      </CardHeader>
                    </Card>
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

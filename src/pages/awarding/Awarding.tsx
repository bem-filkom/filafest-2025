import { Footer } from "@/components/share/Footer";
import LightRays from "@/components/share/LightRays";
import { Navbar } from "@/components/share/Navbar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORIES } from "@/constant/categories";
import { Drama } from "lucide-react";

import mask from "@/assets/mask.webp";

export default function Awarding() {
  return (
    <main className="min-h-screen">
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
      <div className="min-h-screen">
        <header className="relative pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight !font-serif italic">Awarding</h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Penerima <span className="font-bold !font-serif italic">Awarding</span> Filkom Awarding Festival 2025.
            </p>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-6 pb-20">
          <div className="space-y-20">
            {Object.entries(CATEGORIES).map(([name, items]) => (
              <div>
                <Card className="mb-5 bg-yellow-50/10 ">
                  <CardHeader>
                    <CardTitle>{name}</CardTitle>
                  </CardHeader>
                </Card>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((cat, idx) => (
                    <Card
                      key={idx}
                      className="group select-none relative cursor-pointer rounded-2xl border border-border bg-card/60 backdrop-blur-sm
                         shadow-sm hover:shadow-lg transition-transform transform
                         duration-300"
                    >
                      <CardContent>
                        <div className="aspect-square border mb-2 rounded-lg object-cover flex justify-center items-center">
                          {/* <Drama size={100} className="opacity-90" /> */}
                          <img src={mask} className="w-24 h-2/4 " />
                        </div>
                        {/* <h1 className="mb-2 text-sm italic font-semibold">Ir. Bp. Numerouno S.Kom. P.hd</h1> */}
                        <Badge variant={"secondary"} className="mb-2">
                          Who's the next?
                        </Badge>
                        <p className="text-sm text-muted-foreground">{cat}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </main>
  );
}

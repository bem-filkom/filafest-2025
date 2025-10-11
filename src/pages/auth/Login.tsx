import { Footer } from "@/components/share/Footer";
import LightRays from "@/components/share/LightRays";
import { Navbar } from "@/components/share/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Login() {
  return (
    <div className=" relative overflow-hidden">
      <div className="absolute -z-10 -top-[200px] -left-[200px] w-[650px] h-[650px] rounded-[650px] bg-[#CF5700] opacity-40 blur-[125px] aspect-square pointer-events-none" />
      <div className="absolute -z-10 -bottom-[200px] -right-[200px] w-[650px] h-[650px] rounded-[650px] bg-[#6FB2FF] opacity-40 blur-[125px] aspect-square pointer-events-none" />
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#FF"
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
      <Navbar />
      <div className="min-h-[90vh] relative flex z-10 items-center justify-center">
        <div className="max-w-lg w-full mx-auto text-center">
          <h1 className="text-3xl mb-2 font-bold ">Selamat Datang</h1>
          <p className="mb-4">Masuk ke akunmu</p>
          <Card className="bg-card/50  backdrop-blur-2xl w-full max-w-lg relative border-border overflow-hidden">
            <CardContent className="">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>Email UB</Label>
                  <Input className="border-border outline" placeholder="email@student.ub.ac.id" />
                </div>
                <div className="space-y-2">
                  <Label>Kata Sandi</Label>
                  <Input className="border-border outline" type="password" placeholder="Masukkan password" />
                </div>
                <p className="my-3 italic text-center">
                  Pakai akun <strong>SIAM</strong> ya!
                </p>
                <Button onClick={() => toast.success("Login berhasil.")} className="w-full bg-gradient-to-r from-[#241084] via-[#00309B] to-[#1581FF]">
                  Masuk
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

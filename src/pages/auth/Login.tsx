import { Footer } from "@/components/share/Footer";
import LightRays from "@/components/share/LightRays";
import { Navbar } from "@/components/share/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoFilafest from "@/assets/logo-filafest.webp";
import { toast } from "sonner";

export default function Login() {
  return (
    <div>
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
        <Card className="bg-card/50 backdrop-blur-2xl w-full max-w-lg relative border-border overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-card-foreground">Login</CardTitle>
            <CardDescription>Gunakan akun siam untuk masuk.</CardDescription>
            <img src={logoFilafest} alt="" className="absolute -right-10 -top-10 rotate-[-32deg] opacity-10" />
          </CardHeader>
          <CardContent className="">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label>Email atau NIM</Label>
                <Input className="border-border outline" placeholder="Masukkan nim atau email ub" />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input className="border-border outline" type="password" placeholder="Masukkan password" />
              </div>
              <Button onClick={() => toast.success("Login berhasil.")} className="text-start">
                Masuk
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

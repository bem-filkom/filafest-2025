import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, UserCheck, Vote, Trophy } from "lucide-react";

export function HowToVoteSection() {
  const steps = [
    {
      icon: UserCheck,
      title: "Registrasi Akun",
      description: "Daftar menggunakan email akademik Filkom untuk mendapatkan akses voting",
    },
    {
      icon: Vote,
      title: "Pilih Kategori",
      description: "Jelajahi berbagai kategori penghargaan dan lihat daftar nominasi",
    },
    {
      icon: CheckCircle,
      title: "Berikan Suara",
      description: "Pilih kandidat terbaik menurut Anda di setiap kategori",
    },
    {
      icon: Trophy,
      title: "Tunggu Hasil",
      description: "Hasil voting akan diumumkan pada malam puncak FILAFEST",
    },
  ];

  return (
    <section id="voting" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Cara Voting</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Ikuti langkah-langkah sederhana berikut untuk memberikan suara pada kandidat favorit Anda</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">{index + 1}</div>
                <CardTitle className="text-lg text-card-foreground">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-muted-foreground leading-relaxed">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

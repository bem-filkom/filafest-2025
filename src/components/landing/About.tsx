import { Award, Users, Trophy } from "lucide-react";
import bgImage from "@/assets/filafest-2024.webp";

export function AboutSection() {
  return (
    <section id="tentang" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 italic !font-serif">Apa itu FILAFEST?</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              FILAFEST (Filkom Awarding Festival) adalah acara penghargaan bergengsi yang diselenggarakan setiap tahun oleh Fakultas Ilmu Komputer. Festival ini bertujuan untuk mengapresiasi dan
              merayakan pencapaian luar biasa mahasiswa dalam bidang teknologi, penelitian, dan kontribusi akademik.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Prestasi</h3>
                <p className="text-sm text-muted-foreground">Mengapresiasi pencapaian terbaik</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Komunitas</h3>
                <p className="text-sm text-muted-foreground">Membangun jaringan yang kuat</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Inovasi</h3>
                <p className="text-sm text-muted-foreground">Mendorong kreativitas teknologi</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-primary/5 to-primary/90" />
            <div
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="p-8 h-96 flex items-center justify-center"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

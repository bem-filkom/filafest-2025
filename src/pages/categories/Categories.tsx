import { Footer } from "@/components/share/Footer";
import { Navbar } from "@/components/share/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CATEGORIES = [
  { title: "Student of the Year", desc: "Penghargaan bagi mahasiswa dengan prestasi akademik maupun non-akademik terbaik." },
  { title: "Best of Innovation", desc: "Apresiasi untuk ide inovatif yang memberikan dampak positif." },
  { title: "Best of Startup", desc: "Kategori untuk startup terbaik yang dikembangkan oleh mahasiswa." },
  { title: "Best of Community Engagement", desc: "Penghargaan untuk kontribusi mahasiswa dalam kegiatan sosial dan masyarakat." },
  { title: "Best of Technology", desc: "Kategori untuk pencapaian luar biasa di bidang teknologi." },
  { title: "Best of Creativity", desc: "Apresiasi karya seni, desain, dan bentuk kreativitas lainnya." },
  { title: "Best of Leadership", desc: "Diberikan kepada mahasiswa dengan kemampuan kepemimpinan yang inspiratif." },
  { title: "Best of Research", desc: "Kategori untuk penelitian terbaik dengan kontribusi nyata." },
  { title: "Best of Collaboration", desc: "Apresiasi untuk kerja sama tim dan kolaborasi yang berdampak." },
  { title: "Best of Spirit", desc: "Penghargaan bagi mahasiswa yang memberikan semangat positif bagi lingkungan sekitar." },
];

export default function Categories() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <header className="relative pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Kategori Nominasi</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">Kategori penghargaan dalam FILAFEST tahun ini.</p>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, idx) => (
            <Card
              key={idx}
              className="group rounded-2xl border border-border bg-card/60 backdrop-blur-sm
                         shadow-sm hover:shadow-lg transition-transform transform
                          duration-300"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{cat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{cat.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

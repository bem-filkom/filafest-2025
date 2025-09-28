import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">FILAFEST</h3>
            <p className="text-muted-foreground leading-relaxed">Festival penghargaan tahunan Fakultas Ilmu Komputer yang merayakan prestasi dan inovasi mahasiswa.</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#tentang" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Tentang
                </a>
              </li>
              <li>
                <a href="#voting" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Cara Voting
                </a>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground">develop by IAA X ITS | STUDENT GOVERNMENT EXECUTIVE FILKOM 2025</p>
        </div>
      </div>
    </footer>
  );
}

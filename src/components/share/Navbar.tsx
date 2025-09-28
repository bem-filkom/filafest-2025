import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, Menu, X } from "lucide-react";
import logo from "@/assets/logo-filafest.webp";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4">
      <div
        className="bg-background/70 backdrop-blur-xl border border-white/20 
                   rounded-full shadow-lg shadow-black/10 px-6 sm:px-8"
      >
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 flex items-center gap-2">
            <img src={logo} alt="" className="h-8 drop-shadow-sm" />
            <p className="font-semibold tracking-wide text-foreground/90">FILAFEST</p>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <a href="/" className="nav-link">
                Home
              </a>
              <a href="/categories" className="nav-link">
                Nominasi
              </a>
              <a href="/" className="nav-link">
                Awarding
              </a>
              <a href="/login">
                <Button variant="default" size="sm" className="ml-4 bg-white/5 hover:bg-white/10 border-white/20 backdrop-blur-sm text-white">
                  Login
                  <LogIn className="ml-1 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="hover:bg-white/10 rounded-full">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden absolute top-20 left-0 w-full px-4 transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}`}>
        <div
          className="px-5 py-4 space-y-3 bg-background/90 backdrop-blur-xl 
                     border border-white/10 rounded-2xl shadow-lg"
        >
          <a href="/" className="mobile-link">
            Home
          </a>
          <a href="/categories" className="mobile-link">
            Nominasi
          </a>
          <a href="/" className="mobile-link">
            Awarding
          </a>
          <a href="/login">
            <Button variant="outline" size="sm" className="w-full bg-white/5 hover:bg-white/10 border-white/20">
              Login
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
}

/* Tambahin ke global.css / tailwind.css */
const styles = `
.nav-link {
  @apply text-foreground/70 hover:text-primary transition-colors duration-200 text-sm font-medium;
}
.mobile-link {
  @apply block text-foreground/80 hover:text-primary px-3 py-2 text-base font-medium transition-colors duration-200 rounded-lg;
}
`;

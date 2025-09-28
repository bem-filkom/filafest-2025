import { AboutSection } from "@/components/landing/About";
import { FAQSection } from "@/components/landing/FAQ";
import { HeroSection } from "@/components/landing/Hero";
import { HowToVoteSection } from "@/components/landing/HowToVote";
import { Footer } from "@/components/share/Footer";
import { Navbar } from "@/components/share/Navbar";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <HowToVoteSection />
      <FAQSection />
      <Footer />
    </div>
  );
}

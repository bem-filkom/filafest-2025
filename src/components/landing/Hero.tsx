"use client";

import { motion, type MotionProps } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LightRays from "../share/LightRays";
import { ArrowUpRight } from "lucide-react";
import MarqueeImage from "../share/MarqueeImage";

type HeroSectionProps = React.HTMLAttributes<HTMLElement>;

const containerVariants: MotionProps["variants"] = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: MotionProps["variants"] = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export function HeroSection({ ...props }: HeroSectionProps) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden" {...props}>
      {/* Overlay Layers */}
      <motion.div className="absolute inset-0 bg-black/70 z-0" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ duration: 1.5 }} />
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
      <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} />

      {/* Content */}
      <motion.div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="show">
        {/* Welcome Badge */}
        <motion.div variants={itemVariants}>
          <Badge className="mb-6 text-sm bg-orange-600 font-bold backdrop-blur-md border px-4 py-2 shadow-sm">FILAFEST</Badge>
        </motion.div>

        {/* Main Title */}
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl !font-serif italic font-extrabold text-foreground mb-6 tracking-tight">
          FILKOM Awarding Festival
        </motion.h1>

        {/* Description */}
        <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Festival penghargaan tahunan yang merayakan prestasi, inovasi, dan dedikasi mahasiswa Fakultas Ilmu Komputer dalam berbagai bidang teknologi dan akademik.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="!px-12 py-3 rounded-full text-base font-medium shadow-lg bg-gradient-to-r from-[#241084] via-[#00309B] to-[#1581FF]">
              Vote Now!
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="bg-gradient-to-tl from-orange-600/20 absolute h-full w-full"></div>
      <div className="absolute right-0 left-0 opacity-20">
        <MarqueeImage />
      </div>
    </section>
  );
}

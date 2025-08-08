"use client";

import { Button } from "@/components/ui/button";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
import Link from "next/link";
import { ArrowRight, BookOpen, Rss } from "lucide-react";

interface HeroSectionProps {
  totalPosts: number;
}

export default function HeroSection({ totalPosts }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      
      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Main particle text effect */}
          <div className="mb-8">
            <div className="block md:hidden">
              <ParticleTextEffect 
                words={["TECH", "BLOG"]}
                className="mb-4 rounded-lg border border-border/10"
                canvasWidth={400}
                canvasHeight={120}
                fontSize={60}
                fontFamily="Space Mono, monospace"
              />
            </div>
            <div className="hidden md:block lg:hidden">
              <ParticleTextEffect 
                words={["TECH", "BLOG", "INOVACE"]}
                className="mb-4 rounded-lg border border-border/10"
                canvasWidth={600}
                canvasHeight={180}
                fontSize={90}
                fontFamily="Space Mono, monospace"
              />
            </div>
            <div className="hidden lg:block">
              <ParticleTextEffect 
                words={["TECH", "BLOG", "MODERN", "INOVACE", "KÓD"]}
                className="mb-4 rounded-lg border border-border/10"
                canvasWidth={800}
                canvasHeight={200}
                fontSize={120}
                fontFamily="Space Mono, monospace"
              />
            </div>
          </div>
          
          {/* Subtitle */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
              Objevte nejnovější trendy ve světě technologií
            </h2>
            
            <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto">
              Ponořte se do světa moderních technologií, programování a inovací. 
              Sdílíme poznatky, návody a inspiraci pro vývojáře všech úrovní.
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{totalPosts} příspěvků</span>
            </div>
            <div className="flex items-center gap-2">
              <Rss className="w-4 h-4" />
              <span>Pravidelně aktualizováno</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              asChild 
              size="lg" 
              className="group bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-medium"
            >
              <Link href="#latest-posts">
                Prozkoumejte články
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-base font-medium border-2 hover:bg-muted"
            >
              <Link href="/posts">
                Všechny příspěvky
              </Link>
            </Button>
          </div>
          
          {/* Interactive hint */}
          <div className="text-xs text-muted-foreground/60 max-w-md mx-auto">
            Slova se mění automaticky každé 4 sekundy • Pravým kliknutím a tažením ničíte particles
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-muted-foreground/30 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
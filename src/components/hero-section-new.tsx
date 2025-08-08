"use client";

import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { BookOpen, Rss } from "lucide-react";

interface HeroSectionProps {
  totalPosts: number;
}

export default function HeroSection({ totalPosts }: HeroSectionProps) {
  return (
    <HeroHighlight containerClassName="min-h-screen">
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Main heading with highlight */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug mx-auto">
              Moderne{" "}
              <Highlight className="text-black dark:text-white">
                technologie
              </Highlight>{" "}
              a inovace pro vývojáře
            </h1>
          </div>
          
          {/* Subtitle */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Objevte nejnovější trendy ve světě technologií, programování a inovací. 
              Sdílíme poznatky, návody a inspiraci pro vývojáře všech úrovní.
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-sm text-neutral-600 dark:text-neutral-400 mb-8">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{totalPosts} příspěvků</span>
            </div>
            <div className="flex items-center gap-2">
              <Rss className="w-4 h-4" />
              <span>Pravidelně aktualizováno</span>
            </div>
          </div>
          
        </div>
      </div>
    </HeroHighlight>
  );
}
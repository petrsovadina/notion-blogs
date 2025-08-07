import React from 'react';
import { cn } from '@/lib/utils'; // Upravte cestu k utils.ts podle potřeby

interface BackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  // Přidána možnost upravit barvu pozadí a mřížky přes props, pokud je potřeba
  backgroundColorClass?: string;
  gridColorClass?: string;
  gridSize?: string; // Např. "14px_24px"
  maskImage?: string; // Např. "radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)"
}

const Background: React.FC<BackgroundProps> = ({
  className,
  backgroundColorClass = "bg-background", // Výchozí z globals.css proměnné
  // Původní barva mřížky byla #4f4f4f2e. Pro flexibilitu lze nastavit přes CSS proměnnou nebo ponechat takto.
  // Zde použijeme odvození od 'border' barvy pro lepší konzistenci s tématem.
  // Uživatel si může přepsat třídou nebo CSS proměnnou.
  gridColorClass = "bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] opacity-50 dark:opacity-30",
  gridSize = "bg-[size:14px_24px]",
  maskImage = "[mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_60%,transparent_100%)]", // Původní maska z layout.tsx
  ...props
}) => {
  return (
    <div className={cn("fixed inset-0 z-[-1]", className)} {...props}>
      <div className={cn("relative h-full w-full", backgroundColorClass)}>
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 top-0",
            gridColorClass,
            gridSize,
            maskImage
            // Původní třída z Background.tsx: "bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
            // Původní třída z layout.tsx: "bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_60%,transparent_100%)]"
            // Zvolena maska z layout.tsx, zdá se univerzálnější. Barva mřížky upravena pro použití s CSS proměnnou.
          )}
        />
      </div>
    </div>
  );
};

export default Background;

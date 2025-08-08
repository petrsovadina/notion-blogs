import { ParticleTextEffect } from "@/components/ui/particle-text-effect";

export default function ParticleTextDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <ParticleTextEffect 
        words={["HELLO", "WORLD", "TECH", "BLOG", "MODERN"]}
        canvasWidth={800}
        canvasHeight={300}
        fontSize={100}
        className="border border-border rounded-lg"
      />
      <div className="mt-4 text-foreground text-sm text-center max-w-md">
        <p className="mb-2">Particle Text Effect Demo</p>
        <p className="text-muted-foreground text-xs">
          Pravé klik a tažení myši ničí particles • Slova se mění automaticky každé 4 sekundy
        </p>
      </div>
    </div>
  );
}
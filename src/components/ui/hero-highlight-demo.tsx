import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

export default function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed mx-auto">
          Toto je{" "}
          <Highlight className="text-black dark:text-white">
            Hero Highlight
          </Highlight>{" "}
          komponenta
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-300 mt-6">
          Pohybujte myší po pozadí a sledujte interaktivní efekt
        </p>
      </div>
    </HeroHighlight>
  );
}
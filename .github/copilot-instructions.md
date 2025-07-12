# Pokyny pro Copilot pro projekt `notion-blogs`

Tento dokument pomáhá AI agentům rychle se zorientovat v monorepu Next.js/TypeScript, který slouží jako portfolio a blog s integrací Notion.

## Architektura projektu

- **Framework**: Next.js (App Router, TypeScript, serverové komponenty)
- **Zdroj obsahu**: Blogové příspěvky jsou získávány z Notion pomocí logiky v `src/lib/notion.ts`.
- **Stránky**: Všechny routy jsou v `src/app/`, dynamické routování blogu je v `src/app/posts/[slug]/page.tsx`.
- **Komponenty**: Sdílené UI a layout komponenty jsou v `src/components/` a `src/components/ui/`.
- **Styly**: Globální styly v `src/app/globals.css`, konfigurace PostCSS v `postcss.config.mjs`.

## Klíčové vzory a konvence

- **MDX/Markdown**: Obsah blogu je renderován pomocí vlastních MDX komponent (`src/components/mdx-component.tsx`).
- **Témování**: Přepínání témat řeší `src/components/mode-toggle.tsx` a `theme-provider.tsx`.
- **UI knihovna**: Vlastní UI prvky (např. `button.tsx`, `card.tsx`) jsou v `src/components/ui/`.
- **Hooky**: Vlastní React hooky jsou v `src/hooks/` (např. `use-mobile.ts`).
- **Utility**: Sdílená logika v `src/lib/utils.ts`.

## Vývojářské workflow

- **Instalace závislostí:**  
  ```sh
  pnpm install
  ```
- **Spuštění vývojového serveru:**  
  ```sh
  pnpm dev
  ```
- **Build pro produkci:**  
  ```sh
  pnpm build
  ```
- **Náhled produkčního buildu:**  
  ```sh
  pnpm start
  ```

## Integrace a napojení

- **Notion API**: Veškerá logika pro práci s Notion je v `src/lib/notion.ts`. Pro změny ve fetchování nebo mapování dat upravujte tento soubor.
- **Statická aktiva**: Obrázky a SVG ukládejte do `public/` pro přímé servírování.

## Projektové poznámky

- **Dynamické routování:** Slugy blogových příspěvků řeší `[slug]` v `src/app/posts/[slug]/page.tsx`.
- **SEO:** OpenGraph a sitemap logika je v `src/opengraph-image.png`, `src/app/robots.ts` a `src/app/sitemap.ts`.
- **Testy:** Projekt aktuálně neobsahuje testovací skripty ani konfiguraci.

## Příklady

- Novou UI komponentu přidejte do `src/components/ui/` a exportujte ji.
- Nový blogový příspěvek přidejte v Notion; web jej automaticky načte a zobrazí.

---

Podrobnosti najdete v `README.md` a v adresáři `src/`.

---

_Pokud je něco nejasné nebo chybí důležité informace, napište zpětnou vazbu pro vylepšení tohoto průvodce._

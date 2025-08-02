# CLAUDE.md

Tento soubor poskytuje pokyny pro Claude Code (claude.ai/code) při práci s kódem v tomto úložišti.

## Příkazy pro vývoj

- `pnpm run dev` - Spustí vývojový server s aktualizací mezipaměti a turbopackem
- `pnpm run build` - Vytvoří produkční verzi s aktualizací mezipaměti
- `pnpm start` - Spustí produkční server
- `pnpm run lint` - Spustí linting Next.js
- `pnpm run cache:posts` - Ručně obnoví cache příspěvků z Notion

Příkaz `cache:posts` se automaticky spustí před dev a build, aby byl zajištěn aktuální obsah.

## Přehled architektury

Toto je blog Next.js 15+ poháněný Notion jako CMS. Architektura se řídí těmito klíčovými vzory:

### Systém pro správu obsahu
- **Integrace Notion**: Používá `@notionhq/client` k načtení obsahu z databáze Notion
- **Strategie ukládání do mezipaměti**: Příspěvky jsou ukládány do mezipaměti lokálně v `posts-cache.json`, aby se zabránilo omezení rychlosti API
- **Zpracování obsahu**: `notion-to-md` převádí stránky Notion na markdown pro vykreslení

### Datový tok
1. `scripts/cache-posts.ts` načítá publikované příspěvky z Notion a ukládá je do lokální mezipaměti
2. `src/lib/notion.ts` poskytuje nástroje pro čtení z mezipaměti a interakci s API Notion
3. Příspěvky jsou poskytovány z mezipaměti pro lepší výkon

### Klíčové komponenty
- `src/lib/notion.ts` - Základní integrace Notion a načítání dat
- `scripts/cache-posts.ts` – skript pro ukládání do mezipaměti, který se spouští před build/dev
- `src/app/posts/[slug]/page.tsx` – dynamické stránky příspěvků
- `src/components/mdx-component.tsx` – vykreslování Markdownu s vlastními komponenty

### Požadované proměnné prostředí
- `NOTION_TOKEN` – token integrace Notion
- `NOTION_DATABASE_ID` – ID databáze Notion obsahující příspěvky
- `NEXT_PUBLIC_SITE_URL` – URL webu pro SEO a metadata

### Schéma databáze
Databáze Notion musí mít tyto vlastnosti:
- `Title` (název) – název příspěvku
- `Status` (status) – stav publikace (musí být „Published“, aby se zobrazil)
- `Published Date` (date) – datum publikace pro třídění
- `Author` (people) – autor příspěvku
- `Tags` (multi-select) – tagy příspěvku
- `Category` (select) – kategorie příspěvku
- `Featured Image` (url) – URL obrázku na obálce

### Styl a uživatelské rozhraní
- Používá Tailwind CSS s vlastní konfigurací
- Komponenty shadcn/ui v `src/components/ui/`
- Podpora tmavého režimu přes `next-themes`
- Plugin pro typografii pro vykreslování obsahu markdown
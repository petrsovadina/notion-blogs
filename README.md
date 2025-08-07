# Gesturs Blog - Next.js s Notion CMS

Moderní, rychlá a přizpůsobitelná šablona blogu založená na Notion jako CMS a Next.js 15+. Tato šablona používá konzistentní typografii a vizuální systém podle přiloženého style guide.

## ✨ Funkce

- 🚀 **Next.js 15+** s App Router a Turbopack
- 📝 **Notion jako CMS** s automatickým cachováním příspěvků
- 🎨 **Konzistentní design systém** s custom fonty (Space Mono, Raleway, Open Sans)
- ⚡ **Optimalizovaný výkon** díky statickému generování a cachování
- 🔍 **SEO optimalizováno** s automatickými sitemaps a robots.txt
- 📱 **Plně responzivní** design
- 🌙 **Tmavý/světlý režim** s automatickou detekcí
- ✨ **Syntax highlighting** pro kódové bloky
- 📊 **Podpora tabulek** a pokročilého Notion obsahu
- 🖼️ **Optimalizace obrázků** Next.js Image komponentou
- 📅 **Čas čtení a datum** publikace
- 🎯 **TypeScript** pro lepší developer experience
- 🔄 **Automatické načítání** obsahu z Notion

## 🛠 Technologie

- **Framework:** Next.js 15.3.3 s App Router
- **Styling:** Tailwind CSS v4 s custom design systémem
- **CMS:** Notion API s cachováním
- **Package Manager:** pnpm
- **TypeScript:** Plná podpora s strict módem
- **UI:** shadcn/ui komponenty s custom variantami

## 📋 Požadavky

- **Node.js** 18.17.1 nebo novější
- **pnpm** 10.11.0+ (doporučeno)
- **Notion účet** s API přístupem
- Základní znalost Next.js a React

## Začínáme

### 1. Klonujte šablonu

1. Navštivte tuto šablonu Notion: [Šablona blogu](https://exclusive-gatsby-850.notion.site/20a186dad999800dbb94f239f907215d?v=20a186dad99980228480000c8707478c&source=github)
2. Klikněte na „Duplicate“ (Duplikovat) a naklonujte ji do svého pracovního prostoru
3. Naklonujte tento repozitář do svého lokálního počítače

### 2. Nastavení integrace Notion

1. Přejděte na [Notion Developers](https://www.notion.so/my-integrations)
2. Klikněte na „New integration“ (Nová integrace)
3. Vyplňte podrobnosti integrace:
   - Název: Zvolte název pro svou integraci.
   - Vyberte pracovní prostor, do kterého jste naklonovali šablonu blogu.
   - Zvolte „Interní integrace“.
4. V části „Funkce“ vyberte pouze „Číst obsah“ (odškrtněte „Vložit obsah“ a „Aktualizovat obsah“).
5. Zkopírujte „Interní integrační token“ (bude to váš `NOTION_TOKEN`).

### 3. Připojte integraci k vaší databázi

1. Přejděte na svou naklonovanou stránku blogu Notion.
2. Klikněte na „•••“ (tři tečky) v pravém horním rohu.
3. Přejděte na „Připojení“ -> najděte svou integraci a klikněte na „Připojit“.

### 4. Získejte ID své databáze

1. Otevřete svou databázi Notion v prohlížeči.
2. Zkopírujte ID z URL. Například:
```
https://www.notion.so/20bf471a8ac78080a3d4dad6ed77ca17?v=...
                        └───────── ID databáze ─────────┘
  ```

### 5. Nastavení prostředí

1. Vytvořte soubor `.env.local` v kořenovém adresáři projektu:
```env
   NOTION_TOKEN=váš_integrační_token_zde
   NOTION_DATABASE_ID=vaše_ID_databáze_zde
   NEXT_PUBLIC_SITE_URL=vaše_URL_stránky_zde
   ```

### 6. Instalace a spuštění

```bash
# Nainstalujte závislosti
pnpm install

# Spusťte development server (automaticky načte příspěvky z Notion)
pnpm run dev

# Alternativně - pouze načíst příspěvky z Notion
pnpm run cache:posts

# Build pro produkci
pnpm run build

# Spustit produkční server
pnpm run start

# Linting
pnpm run lint
```

Navštivte `http://localhost:3000`, abyste si prohlédli svůj blog.

## 🎨 Design Systém a Fonty

Projekt používá konzistentní typografický systém:

- **Space Mono** - Nadpisy (h1-h6) a kódové bloky
- **Raleway** - Hlavní font pro tělo textu  
- **Open Sans** - Odstavce a delší textové bloky

Tyto fonty jsou automaticky načítány z Google Fonts a optimalizovány pro rychlé načítání.

## 🔧 Architektura a Cachování

### Cachování obsahu
Projekt používá inteligentní cachování strategie:
- Příspěvky se automaticky načítají z Notion před každým buildem
- Cache se ukládá do `posts-cache.json`
- Development server automaticky aktualizuje cache při spuštění

### Klíčové soubory
- `src/lib/notion.ts` - Notion API integrace a data fetching
- `scripts/cache-posts.ts` - Script pro cachování příspěvků  
- `src/app/globals.css` - Globální styly a font definice
- `src/components/background.tsx` - Grid background komponenta
- `visual-style-guide/` - Referenční design komponenty a styly

### Visual Style Guide
Projekt obsahuje kompletní visual style guide v adresáři `visual-style-guide/`:
- **Komponenty** - shadcn/ui komponenty s custom variantami
- **Fonty** - Dokumentace typografického systému  
- **Styly** - CSS proměnné a Tailwind konfigurace
- **Dokumentace** - Detailní návody pro implementaci

Style guide je automaticky vyloučen z build procesu, ale slouží jako referenční materiál pro design konzistenci.

## Přizpůsobení šablony

### Přidání nových vlastností

1. Ve své databázi Notion můžete přidat nové vlastnosti kliknutím na „+ Přidat vlastnost“.
2. Chcete-li nové vlastnosti použít ve svém blogu, upravte soubor `src/lib/notion.ts`:

```typescript
export interface Post {
  // ... existující vlastnosti ...
  yourNewProperty?: string; // Přidejte svou novou vlastnost
}

export async function getPost(pageId: string): Promise<Post | null> {
  try {
    // ... existující kód ...
    const post: Post = {
      // ... existující vlastnosti ...
      yourNewProperty: properties.YourNewProperty?.your_property_type?.value,
    };
    // ... zbytek kódu ...
  }
}
```

### Přizpůsobení rozvržení

- Upravte soubor `src/app/posts/[slug]/page.tsx`, abyste změnili rozvržení blogového příspěvku
- Aktualizujte soubor `src/components/mdx-component.tsx`, abyste přizpůsobili vykreslování markdownu
- Stylizujte komponenty pomocí tříd Tailwind CSS

### Správa vašeho blogu

1. K nastavení integrace máte přístup kdykoli:
   - Přejděte do Nastavení Notion -> Připojení
   - Najděte svou integraci
   - Klikněte na „•••“ -> „Spravovat v portálu pro vývojáře“

2. Vytvořte nové blogové příspěvky:
   - Přidejte novou stránku do své databáze Notion
   - Vyplňte požadované vlastnosti
   - Až bude vše připraveno, nastavte stav na „Publikováno“

## 📊 Vlastnosti Notion Databáze

Šablona vyžaduje následující vlastnosti v Notion databázi:

| Vlastnost | Typ | Popis | Povinné |
|-----------|-----|-------|---------|
| `Title` | Title | Název příspěvku | ✅ |
| `Status` | Status | Stav publikace (`Published`/`Draft`) | ✅ |
| `Published Date` | Date | Datum publikace pro řazení | ✅ |
| `Author` | People | Autor příspěvku | ❌ |
| `Tags` | Multi-select | Tagy příspěvku | ❌ |
| `Category` | Select | Kategorie příspěvku | ❌ |
| `Featured Image` | URL | URL obrázku na obálce | ❌ |

**Důležité:** Pouze příspěvky se statusem `Published` se zobrazí na blogu.

## 🚀 Deployment

### Vercel (Doporučeno)
1. Nahrajte projekt na GitHub
2. Připojte repository k Vercel
3. Nastavte environment variables v Vercel dashboard
4. Vercel automaticky buildne a deployne

### Ostatní platformy
Projekt funguje na jakékoli platformě podporující Next.js:
- Netlify
- Railway  
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Troubleshooting

### Časté problémy

**Token is invalid error:**
- Zkontrolujte, že token začína `ntn_` (nový formát od září 2024) nebo `secret_` (starší formát)
- Ověřte, že integrace má oprávnění "Read content"
- Zkontrolujte, že integrace je připojena k databázi v Notion
- Ujistěte se, že `.env.local` soubor existuje a obsahuje správné proměnné

**Žádné příspěvky se nezobrazují:**
- Zkontrolujte, že příspěvky mají status `Published`
- Spusťte `pnpm run cache:posts` pro manuální update

**Build chyby:**
- Zkontrolujte, že všechny environment variables jsou nastaveny
- Ujistěte se, že `visual-style-guide` je vyloučen z build procesu

## 📝 Další Dokumentace

- `CLAUDE.md` - Pokyny pro Claude Code AI asistenta
- `visual-style-guide/README.md` - Detailní design systém dokumentace
- [Notion API Documentation](https://developers.notion.com)
- [Next.js Documentation](https://nextjs.org/docs)

## 🤝 Přispívání

Příspěvky jsou vítány! Prosím:
1. Forkněte repository
2. Vytvořte feature branch (`git checkout -b feature/nova-funkce`)
3. Commitněte změny (`git commit -am 'Přidána nová funkce'`)
4. Pushněte do branch (`git push origin feature/nova-funkce`)
5. Vytvořte Pull Request

## 📄 Licence

MIT License - tuto šablonu můžete volně používat pro svoje projekty!
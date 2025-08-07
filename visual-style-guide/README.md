# Průvodce Vizuálním Stylem a Komponentami

Tento adresář obsahuje sadu konfiguračních souborů, stylů a React komponent extrahovaných z referenčního projektu. Cílem je umožnit snadnou replikaci vizuálního stylu a klíčových UI prvků do jiných (Next.js) projektů pro zajištění vizuální konzistence.

## Obsah

-   **`/components/ui/`**: Základní UI komponenty (Avatar, Badge, Button, Card, Dialog, Separator, Tooltip). Jsou postaveny primárně na Radix UI primitivech a stylizovány pomocí Tailwind CSS.
-   **`/components/core/`**: Komplexnější, ale stále znovupoužitelné komponenty (Background, ModeToggle, ThemeProvider).
-   **`/lib/`**: Utility funkce (např. `cn` pro slučování CSS tříd).
-   **`/styles/`**: Globální CSS styly (`globals.css`) obsahující definice CSS proměnných pro témata, základní styly HTML tagů a Tailwind utility.
-   **`/tailwind/`**: Konfigurace Tailwind CSS (`tailwind.config.ts`).
-   **`/docs/`**: Dokumentace specifických aspektů, jako je konfigurace fontů (`fonts.md`).

## Základní Struktura Stylů

-   **Tailwind CSS**: Hlavní framework pro stylování.
-   **CSS Proměnné**: V `styles/globals.css` jsou definovány CSS proměnné pro barvy, poloměry zaoblení atd. Tyto proměnné jsou využívány v `tailwind.config.ts` a komponentách. Podporují světlý a tmavý režim (`:root` a `.dark`).
-   **Fonty**: Projekt používá specifické fonty (Space Mono, Raleway, Open Sans) načítané přes `next/font`. Detaily viz `docs/fonts.md`.

## Potřebné Závislosti

Pro plnou funkčnost zkopírovaných komponent a stylů budete pravděpodobně potřebovat následující závislosti ve vašem `package.json`:

### Hlavní závislosti (`dependencies`):

```json
{
  "@radix-ui/react-avatar": "^1.1.0",
  "@radix-ui/react-dialog": "^1.1.1",
  "@radix-ui/react-icons": "^1.3.0", // Pro ModeToggle a další ikony Radix
  "@radix-ui/react-separator": "^1.1.0",
  "@radix-ui/react-slot": "^1.1.0",
  "@radix-ui/react-tooltip": "^1.1.2",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "lucide-react": "^0.429.0", // Pro ikony v Dialog komponentě (např. X) a jinde
  "next": "14.x.x", // Verze Next.js by měla být kompatibilní
  "next-themes": "^0.3.0", // Pro ThemeProvider a ModeToggle
  "react": "^18.x.x",
  "react-dom": "^18.x.x",
  "tailwind-merge": "^2.5.2"
}
```

### Vývojové závislosti (`devDependencies`):

```json
{
  "tailwindcss": "^3.4.10", // Nebo aktuální verze
  "tailwindcss-animate": "^1.0.7", // Pro animace v Tailwindu
  "postcss": "^8.x.x",
  "autoprefixer": "^10.x.x", // Obvykle se přidává s Tailwindem
  "@types/node": "...",
  "@types/react": "...",
  "@types/react-dom": "...",
  "typescript": "..."
}
```

**Poznámka:** Verze se mohou lišit. Doporučuje se použít nejnovější stabilní verze, které jsou vzájemně kompatibilní. Některé komponenty (např. `lucide-react`, `@radix-ui/react-icons`) jsou specificky zmíněny v komentářích u komponent, které je využívají.

## Kroky pro Integraci do Nového Next.js Projektu

1.  **Nainstalujte závislosti**: Přidejte výše uvedené závislosti do vašeho `package.json` a spusťte `npm install`, `yarn install` nebo `pnpm install`.

2.  **Nastavte Tailwind CSS**:
    *   Zkopírujte `visual-style-guide/tailwind/tailwind.config.ts` do kořenového adresáře vašeho projektu.
    *   Ujistěte se, že máte správně nakonfigurovaný `postcss.config.js` (obvykle stačí základní konfigurace pro Tailwind).
        ```javascript
        // postcss.config.js
        module.exports = {
          plugins: {
            tailwindcss: {},
            autoprefixer: {},
          },
        };
        ```
    *   Upravte pole `content` v `tailwind.config.ts` tak, aby odpovídalo struktuře vašeho projektu (kde se nacházejí vaše stránky a komponenty).

3.  **Přidejte Globální Styly**:
    *   Zkopírujte `visual-style-guide/styles/globals.css` do vašeho adresáře se styly (např. `src/app/globals.css` nebo `src/styles/globals.css`).
    *   Importujte tento soubor do hlavního layoutu vaší aplikace (např. `src/app/layout.tsx`).
        ```typescript
        // src/app/layout.tsx
        import './globals.css'; // Nebo relativní cesta k vašemu globals.css
        ```

4.  **Nakonfigurujte Fonty**:
    *   Postupujte podle instrukcí v `visual-style-guide/docs/fonts.md` pro import a konfiguraci fontů v `src/app/layout.tsx`.

5.  **Zkopírujte Komponenty a Utility**:
    *   Zkopírujte obsah adresářů `visual-style-guide/components/ui/`, `visual-style-guide/components/core/` a `visual-style-guide/lib/` do odpovídajících míst ve vašem projektu (např. `src/components/ui/`, `src/components/core/`, `src/lib/`).
    *   **Důležité**: Pravděpodobně budete muset nastavit aliasy cest ve vašem `tsconfig.json` (nebo `jsconfig.json`), aby importy jako `@/lib/utils` nebo `@/components/ui/button` fungovaly správně. Příklad pro `tsconfig.json`:
        ```json
        {
          "compilerOptions": {
            // ...
            "baseUrl": ".",
            "paths": {
              "@/*": ["./src/*"] // Nebo jiná cesta k vašemu 'src' adresáři
            }
            // ...
          }
        }
        ```

6.  **Implementujte ThemeProvider**:
    *   V `src/app/layout.tsx` (nebo ekvivalentu) obalte obsah vaší aplikace komponentou `ThemeProvider` z `visual-style-guide/components/core/theme-provider.tsx`.
        ```typescript
        // src/app/layout.tsx
        import { ThemeProvider } from '@/components/core/theme-provider'; // Upravte cestu
        import { TooltipProvider } from '@/components/ui/tooltip'; // Pokud používáte tooltipy

        export default function RootLayout({ children }: { children: React.ReactNode }) {
          return (
            <html lang="cs" suppressHydrationWarning className={/* ...font variables... */}>
              <body>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system" // Nebo "light", "dark"
                  enableSystem
                  disableTransitionOnChange
                >
                  <TooltipProvider delayDuration={0}> {/* Volitelné, pro tooltipy */}
                    {/* ... Váš <Navbar /> ... */}
                    {/* ... Váš <Background /> ... */}
                    <main>{children}</main>
                    {/* ... Váš <Footer /> ... */}
                  </TooltipProvider>
                </ThemeProvider>
              </body>
            </html>
          );
        }
        ```

7.  **Použití Komponent**:
    *   Nyní můžete importovat a používat zkopírované komponenty ve vašem projektu.
        ```typescript
        import { Button } from '@/components/ui/button';
        import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

        function MyPage() {
          return (
            <Card>
              <CardHeader>
                <CardTitle>Titulek Karty</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Obsah karty...</p>
                <Button variant="secondary">Akce</Button>
              </CardContent>
            </Card>
          );
        }
        ```

## Příklady Použití

Projděte si kód původního projektu, ze kterého byly tyto materiály extrahovány, abyste viděli komponenty v akci a jak jsou skládány do komplexnějších celků.

## Možné Úpravy

-   **Cesty importu**: Jak již bylo zmíněno, cesty k `cn` utilitě (`@/lib/utils`) a mezi komponentami (`@/components/ui/...`) mohou vyžadovat úpravu nebo konfiguraci aliasů.
-   **Specifické styly**: Některé komponenty (např. `CardTitle`, `DialogContent`) měly v původním projektu specifické styly pro konkrétní použití (např. v `ProjectCard`). Tyto specifické styly byly v extrahovaných komponentách buď zjednodušeny, nebo okomentovány. Možná budete chtít vytvořit varianty těchto komponent nebo přidat specifické třídy při jejich použití.

Tento průvodce by měl poskytnout solidní základ pro vytvoření vizuálně konzistentních projektů. Hodně štěstí!

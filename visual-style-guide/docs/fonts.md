# Konfigurace Fontů

Pro dosažení konzistentního vizuálního stylu napříč projekty je důležité používat stejné fonty a správně je nakonfigurovat. Tento projekt využívá následující fonty z Google Fonts:

1.  **Space Mono**: Používá se primárně pro nadpisy (`h1`-`h6`) a bloky kódu.
    *   Váhy: 400 (regular), 700 (bold)
    *   Subsets: `latin`
    *   CSS proměnná: `--font-space-mono`

2.  **Raleway**: Používá se jako hlavní font pro tělo textu (výchozí pro `body`).
    *   Subsets: `latin`
    *   CSS proměnná: `--font-raleway`

3.  **Open Sans**: Používá se pro odstavce (`p`) a další delší textové bloky, kde je preferován čitelnější sans-serif font.
    *   Subsets: `latin`
    *   CSS proměnná: `--font-open-sans`

## Implementace v Next.js projektu

V souboru `src/app/layout.tsx` (nebo ekvivalentním místě, kde se definuje hlavní layout aplikace) je potřeba importovat a nakonfigurovat tyto fonty.

```typescript
// Příklad z src/app/layout.tsx

import { Space_Mono, Raleway, Open_Sans } from 'next/font/google';
import { cn } from '@/lib/utils'; // Předpokládá existenci cn utility

// Konfigurace fontů
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap', // Doporučeno pro lepší performance a UX
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

// Aplikace fontů v RootLayout komponentě
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="cs" // Nebo jiný relevantní jazyk
      suppressHydrationWarning
      className={cn(
        spaceMono.variable,
        raleway.variable,
        openSans.variable,
        'scroll-smooth' // Příklad další třídy
      )}
    >
      <body
        className={cn(
          'min-h-screen bg-background text-foreground font-raleway antialiased'
          // Další potřebné třídy pro body
        )}
      >
        {/* ... zbytek layoutu (ThemeProvider, atd.) ... */}
        {children}
      </body>
    </html>
  );
}
```

## Použití v CSS

Po definování CSS proměnných pro fonty je možné je používat v `tailwind.config.ts` a `globals.css`.

**`tailwind.config.ts`:**
Fonty jsou již definovány v sekci `theme.extend.fontFamily` v poskytnutém `tailwind.config.ts`:
```javascript
// ...
fontFamily: {
  'sans': ['var(--font-raleway)', 'sans-serif'],
  'mono': ['var(--font-space-mono)', 'monospace'],
  'alt': ['var(--font-open-sans)', 'sans-serif'],
  'space-mono': ['var(--font-space-mono)', 'monospace'],
  'raleway': ['var(--font-raleway)', 'sans-serif'],
  'open-sans': ['var(--font-open-sans)', 'sans-serif'],
},
// ...
```

**`globals.css`:**
Základní přiřazení fontů elementům:
```css
/* V @layer base */
body {
  @apply bg-background text-foreground font-raleway; /* font-raleway je výchozí */
}

h1, h2, h3, h4, h5, h6 {
  @apply font-space-mono; /* font-space-mono pro nadpisy */
}

p {
  @apply font-open-sans; /* font-open-sans pro odstavce */
}

code { /* A pro kódové bloky */
  @apply font-space-mono;
}
```

Tímto způsobem zajistíte, že vaše projekty budou používat konzistentní typografii. Nezapomeňte nainstalovat potřebné balíčky (`next/font`).

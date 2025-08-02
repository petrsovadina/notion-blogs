"use client";

import { Button } from "@/components/ui/button"; // Upravte cestu k ui/button podle potřeby
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"; // Ujistěte se, že máte @radix-ui/react-icons nainstalováno
import { useTheme } from "next-themes"; // Ujistěte se, že máte next-themes nainstalováno
import * as React from "react";

export function ModeToggle({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className={className} // Umožňuje přidat další třídy zvenčí
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      {...props}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

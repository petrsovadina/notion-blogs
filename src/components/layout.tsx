import Link from "next/link";
import { ReactNode } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import Background from "@/components/background";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Background />
      <header className="border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                href="/"
                className="flex items-center"
              >
                <img 
                  src="https://i19jax5jy5.ufs.sh/f/c7c86d08-543f-47b5-bdb2-a7a1e426f825-t3fptr.dev.png"
                  alt="Gesturs Blog Logo"
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="flex items-center">
              <ModeToggle />
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>

      <footer className="bg-muted border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-muted-foreground font-open-sans">
            © {new Date().getFullYear()} Gesturs Blog. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

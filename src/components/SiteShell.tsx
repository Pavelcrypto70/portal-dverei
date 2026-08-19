"use client";

import { usePathname } from "next/navigation";
import { CatalogStoreProvider } from "@/components/CatalogStore";
import { QuizProvider } from "@/components/QuizModal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyActions } from "@/components/StickyActions";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <CatalogStoreProvider>
      <QuizProvider>
        {isAdmin ? (
          <div className="relative z-[1] min-h-full bg-[var(--bg)]">{children}</div>
        ) : (
          <div className="relative z-[1] flex min-h-full flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <StickyActions />
          </div>
        )}
      </QuizProvider>
    </CatalogStoreProvider>
  );
}

"use client";

import { QuizProvider } from "@/components/QuizModal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyActions } from "@/components/StickyActions";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <QuizProvider>
      <div className="relative z-[1] flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyActions />
      </div>
    </QuizProvider>
  );
}

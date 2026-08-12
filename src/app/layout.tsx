import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "PORTAL — двери в Тюмени",
    template: "%s · PORTAL",
  },
  description:
    "Межкомнатные и входные двери. Прозрачная цена комплекта, бесплатный замер, монтаж под ключ.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable} h-full`}>
      <body className="shell min-h-full antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

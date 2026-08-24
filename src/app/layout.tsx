import type { Metadata } from "next";
import { Manrope, Montserrat, Unbounded } from "next/font/google";
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

const brand = Montserrat({
  variable: "--font-brand",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "ШИКАРДОРС.РФ — двери в Тюмени",
    template: "%s · ШИКАРДОРС.РФ",
  },
  description:
    "Межкомнатные и входные двери. Прозрачная цена комплекта, бесплатный замер, монтаж под ключ.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable} ${brand.variable} h-full`}>
      <body className="shell min-h-full antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

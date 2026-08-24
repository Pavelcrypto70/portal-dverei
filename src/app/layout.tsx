import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

/** Весь текст сайта — бесплатный Montserrat */
const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

/** Только лого и главная надпись: a_FuturaRound Bold */
const logo = localFont({
  src: "../fonts/a-futuraround-bold.ttf",
  variable: "--font-logo",
  weight: "700",
  display: "swap",
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
    <html lang="ru" className={`${montserrat.variable} ${logo.variable} h-full`}>
      <body className="shell min-h-full antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

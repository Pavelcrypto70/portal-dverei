type Props = {
  className?: string;
  /** Цвет основной части «ШИКАРДОРС» */
  mainClassName?: string;
  /** Цвет «.РФ» / «.рф» */
  tldClassName?: string;
  /**
   * hero — крупная надпись на главной
   * header — лого в шапке/футере (a_FuturaRound + обводка)
   */
  variant?: "default" | "hero" | "header";
  /** Светлый фон шапки → тёмная обводка, иначе белая */
  onLight?: boolean;
};

/** Логотип: только a_FuturaRound. Остальной текст сайта — Montserrat. */
export function BrandMark({
  className = "",
  mainClassName = "",
  tldClassName = "text-[var(--mute)]",
  variant = "header",
  onLight = false,
}: Props) {
  const markClass =
    variant === "hero"
      ? "brand-hero-mark"
      : onLight
        ? "brand-header-mark brand-header-mark--light"
        : "brand-header-mark";

  return (
    <span className={`${markClass} ${className}`.trim()}>
      <span className={mainClassName || undefined}>ШИКАРДОРС</span>
      <span className={tldClassName || undefined}>.рф</span>
    </span>
  );
}

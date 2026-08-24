type Props = {
  className?: string;
  /** Цвет основной части «ШИКАРДОРС» */
  mainClassName?: string;
  /** Цвет «.РФ» / «.рф» */
  tldClassName?: string;
  /**
   * hero — крупная надпись на главной
   * header — лого в шапке (тот же шрифт + обводка)
   */
  variant?: "default" | "hero" | "header";
  /** Светлый фон шапки → тёмная обводка, иначе белая */
  onLight?: boolean;
};

/** Логотип: имя + .рф */
export function BrandMark({
  className = "",
  mainClassName = "",
  tldClassName = "text-[var(--mute)]",
  variant = "default",
  onLight = false,
}: Props) {
  if (variant === "hero" || variant === "header") {
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

  return (
    <span className={`font-brand ${className}`.trim()}>
      <span className={mainClassName}>ШИКАРДОРС</span>
      <span className={tldClassName}>.РФ</span>
    </span>
  );
}

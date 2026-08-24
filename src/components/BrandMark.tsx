type Props = {
  className?: string;
  /** Цвет основной части «ШИКАРДОРС» */
  mainClassName?: string;
  /** Цвет «.РФ» / «.рф» */
  tldClassName?: string;
  /** hero = стиль лого с главной (Futura Round-like + обводка) */
  variant?: "default" | "hero";
};

/** Логотип: имя + .рф */
export function BrandMark({
  className = "",
  mainClassName = "",
  tldClassName = "text-[var(--mute)]",
  variant = "default",
}: Props) {
  if (variant === "hero") {
    return (
      <span className={`brand-hero-mark ${className}`.trim()}>
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

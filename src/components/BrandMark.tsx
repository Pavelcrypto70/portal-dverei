type Props = {
  className?: string;
  /** Цвет основной части «ШИКАРДОРС» */
  mainClassName?: string;
  /** Цвет «.РФ» */
  tldClassName?: string;
};

/** Логотип как на шикардорс.рф: имя + серый .РФ */
export function BrandMark({
  className = "",
  mainClassName = "",
  tldClassName = "text-[var(--mute)]",
}: Props) {
  return (
    <span className={className}>
      <span className={mainClassName}>ШИКАРДОРС</span>
      <span className={tldClassName}>.РФ</span>
    </span>
  );
}

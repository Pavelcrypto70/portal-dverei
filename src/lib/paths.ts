/** Prefix static asset paths for GitHub Pages basePath. */
export function withBase(path: string): string {
  if (!path || path.startsWith("http") || path.startsWith("data:") || path.startsWith("//")) {
    return path;
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

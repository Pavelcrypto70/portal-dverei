import { productImages, type Product } from "@/content/site";

/** Обложка товара: своё фото → демо-карта → запасная. */
export function productCover(product: Product): string {
  if (product.imageUrl) return product.imageUrl;
  return productImages[product.id] ?? "/media/p-turin.png";
}

/** Сжимает файл в JPEG data-URL для localStorage. */
export async function fileToJpegDataUrl(file: File, maxW = 1200, quality = 0.82): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxW / Math.max(bitmap.width, 1));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas недоступен");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", quality);
}

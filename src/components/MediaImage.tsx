import Image, { type ImageProps } from "next/image";
import { withBase } from "@/lib/paths";

type Props = Omit<ImageProps, "src"> & { src: string };

/** next/image that respects GitHub Pages basePath for /media paths. */
export function MediaImage({ src, alt, unoptimized, ...props }: Props) {
  const absolute = src.startsWith("data:") || src.startsWith("blob:") || src.startsWith("http");
  return (
    <Image
      src={absolute ? src : withBase(src)}
      alt={alt}
      unoptimized={absolute || unoptimized}
      {...props}
    />
  );
}

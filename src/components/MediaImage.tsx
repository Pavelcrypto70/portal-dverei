import Image, { type ImageProps } from "next/image";
import { withBase } from "@/lib/paths";

type Props = Omit<ImageProps, "src"> & { src: string };

/** next/image that respects GitHub Pages basePath for /media paths. */
export function MediaImage({ src, alt, ...props }: Props) {
  return <Image src={withBase(src)} alt={alt} {...props} />;
}

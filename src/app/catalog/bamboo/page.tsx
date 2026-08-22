import { redirect } from "next/navigation";

/** Старый URL бамбука → стеновые панели */
export default function BambooRedirect() {
  redirect("/catalog/panels");
}

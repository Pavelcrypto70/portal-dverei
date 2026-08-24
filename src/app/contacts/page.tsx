import { MediaImage } from "@/components/MediaImage";
import { brand, contactsPage, salons } from "@/content/site";

const salonPhotos = [
  "/media/hero-showroom.png",
  "/media/fork-interior.png",
  "/media/hero-finish.png",
];

export default function ContactsPage() {
  return (
    <div className="pt-[72px]">
      <div className="relative min-h-[280px] overflow-hidden">
        <MediaImage
          src="/media/hero-install.png"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[rgba(8,10,14,0.62)]" />
        <div className="relative z-[1] wrap flex min-h-[280px] flex-col justify-end py-12 text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent-2)]">Связь</p>
          <h1 className="display mt-3 text-4xl font-extrabold md:text-6xl">{contactsPage.title}</h1>
          <p className="mt-4 max-w-2xl text-white/75">{contactsPage.lead}</p>
        </div>
      </div>
      <div className="wrap py-12">
        <p className="text-xl font-bold">
          <a href={brand.phoneMainHref}>{brand.phoneMain}</a>
        </p>
        <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--mute)]">
          {brand.city}
        </p>
        <div className="mt-5 grid gap-8 md:grid-cols-2">
          {salons.map((s, i) => (
            <article key={s.id}>
              <div className="relative mb-4 aspect-[4/3] overflow-hidden">
                <MediaImage src={salonPhotos[i % salonPhotos.length]} alt="" fill className="object-cover" sizes="50vw" />
              </div>
              <h2 className="text-xl font-semibold">{s.name}</h2>
              {s.address && s.address !== s.name ? (
                <p className="mt-2 text-sm text-[var(--mute)]">{s.address}</p>
              ) : null}
              <a href={s.phoneHref} className="mt-3 inline-block font-semibold">
                {s.phone}
              </a>
              <p className="mt-1 text-sm text-[var(--mute)]">{s.hours}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

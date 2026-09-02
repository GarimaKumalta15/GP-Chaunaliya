import { useState } from "react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import usePageMeta from "../hooks/usePageMeta";
import { useGallery } from "../lib/useContent";

export default function Gallery() {
  usePageMeta("Gallery", "Photos of the campus, classrooms and activities at GP Chaunaliya.");
  const { data: GALLERY } = useGallery();
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      <PageHero title="Gallery" crumb="Gallery" />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow="Campus Life" title="Photo Gallery" align="center" />

          <div className="columns-2 sm:columns-3 gap-4 space-y-4">
            {GALLERY.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setActive(i)}
                className="block w-full break-inside-avoid rounded-xl overflow-hidden ring-1 ring-slate-200 shadow-sm group relative"
              >
                <img src={img.src} alt={img.caption} className="w-full h-auto group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/40 transition-colors flex items-end p-3 opacity-0 group-hover:opacity-100">
                  <p className="text-white text-xs font-semibold text-left">{img.caption}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {active !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/80 hover:text-white"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={GALLERY[active].src}
            alt={GALLERY[active].caption}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

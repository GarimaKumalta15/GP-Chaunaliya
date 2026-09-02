import { useState } from "react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import usePageMeta from "../hooks/usePageMeta";
import { useNotices } from "../lib/useContent";

export default function Notices() {
  usePageMeta(
    "Notices",
    "Latest notices and standing announcements from Government Polytechnic Chaunaliya, Almora."
  );

  const { data: NOTICES } = useNotices();
  const tags = ["All", ...Array.from(new Set(NOTICES.map((n) => n.tag).filter(Boolean) as string[]))];
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? NOTICES : NOTICES.filter((n) => n.tag === filter);

  return (
    <div>
      <PageHero title="Notices" crumb="Notices" />

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="Notice Board"
            title="Latest Notices &amp; Announcements"
            description="Standing and current notices from the institute. For admission-specific updates, always cross-check with the official UBTER portal."
          />

          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`text-xs font-semibold px-4 py-2 rounded-full ring-1 transition-colors ${
                  filter === t
                    ? "bg-navy-950 text-gold-300 ring-navy-950"
                    : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-slate-500 text-sm">No notices in this category yet.</p>
          ) : (
            <ul className="space-y-4">
              {filtered.map((n) => (
                <li
                  key={n.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white rounded-xl p-5 ring-1 ring-slate-200 shadow-sm"
                >
                  <div className="flex-1">
                    <p className="font-heading font-semibold text-navy-950 text-sm leading-snug">{n.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{n.date}</p>
                  </div>
                  {n.tag && (
                    <span className="shrink-0 self-start sm:self-auto text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full bg-gold-400/20 text-maroon-700">
                      {n.tag}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

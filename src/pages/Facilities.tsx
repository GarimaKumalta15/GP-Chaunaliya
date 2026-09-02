import type { ReactElement } from "react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import usePageMeta from "../hooks/usePageMeta";
import { useFacilities } from "../lib/useContent";

const ICONS: Record<string, ReactElement> = {
  book: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13M12 6.253C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  monitor: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  mic: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  ),
};

export default function Facilities() {
  usePageMeta(
    "Campus Facilities",
    "Library, Smart Classroom and Language Lab at Government Polytechnic Chaunaliya."
  );
  const { data: FACILITIES } = useFacilities();

  return (
    <div>
      <PageHero title="Campus Facilities" crumb="Facilities" />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="On Campus"
            title="Library, Smart Classroom &amp; Language Lab"
            description="Facilities are designed to support both academic study and the practical, communication and digital skills students need beyond the classroom."
          />

          <div className="space-y-8">
            {FACILITIES.map((f, i) => (
              <div
                key={f.id}
                className={`grid md:grid-cols-5 gap-8 items-start rounded-2xl p-8 ring-1 ring-slate-200 ${
                  i % 2 === 0 ? "bg-white" : "bg-slate-100"
                }`}
              >
                <div className="md:col-span-2 flex items-start gap-4">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-navy-950 text-gold-300 flex items-center justify-center">
                    {ICONS[f.icon]}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-navy-950">{f.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mt-2">{f.description}</p>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {f.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-slate-700 bg-white/70 rounded-lg p-3 ring-1 ring-slate-200">
                        <svg className="w-4 h-4 mt-0.5 text-maroon-700 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import usePageMeta from "../hooks/usePageMeta";
import { useAntiRaggingInfo, useAntiRaggingPunishments, useSiteSettings } from "../lib/useContent";

export default function AntiRagging() {
  usePageMeta(
    "Anti-Ragging Campaign",
    "Anti-ragging policy and grievance guidelines at Government Polytechnic Chaunaliya, Almora."
  );

  const { data: infoData } = useAntiRaggingInfo();
  const { data: punishments } = useAntiRaggingPunishments();
  const { data: SITE } = useSiteSettings();
  const ANTI_RAGGING = { ...infoData, punishments: punishments.map((p) => p.content) };

  return (
    <div>
      <PageHero title="Anti-Ragging Campaign" crumb="Anti-Ragging" />

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow="Student Welfare" title="Ragging-Free Campus Policy" />

          <div className="space-y-4 text-slate-600 leading-relaxed mb-10">
            <p>{ANTI_RAGGING.intro}</p>
            <p>{ANTI_RAGGING.definition}</p>
          </div>

          <div className="bg-white rounded-2xl p-8 ring-1 ring-slate-200 shadow-sm">
            <h3 className="font-heading font-bold text-navy-950 mb-4">Punishment for Ragging</h3>
            <p className="text-sm text-slate-600 mb-5">
              Depending on the nature and severity of the offence, students found directly or
              indirectly involved in ragging or its abetment may face:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {ANTI_RAGGING.punishments.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-slate-700 bg-slate-100 rounded-lg p-3">
                  <svg className="w-4 h-4 mt-0.5 text-maroon-700 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-2xl bg-navy-950 bg-diagonal-pattern p-8 text-white">
            <h3 className="font-heading font-bold text-white mb-2">To report an incident</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Students or guardians who wish to report a ragging incident can contact the institute
              directly at{" "}
              <a href={`tel:${SITE.phone}`} className="text-gold-300 hover:underline">
                {SITE.phone}
              </a>{" "}
              or{" "}
              <a href={`mailto:${SITE.email}`} className="text-gold-300 hover:underline">
                {SITE.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

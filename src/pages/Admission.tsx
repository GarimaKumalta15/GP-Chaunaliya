import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import usePageMeta from "../hooks/usePageMeta";
import { useAdmissionSteps } from "../lib/useContent";

export default function Admission() {
  usePageMeta("Admission", "Step-by-step JEEP admission process for Government Polytechnic Chaunaliya.");
  const { data: stepsData } = useAdmissionSteps();
  const ADMISSION_STEPS = stepsData.map((s) => s.content);

  return (
    <div>
      <PageHero title="Admission" crumb="Admission" />

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="How to Apply"
            title="Admission through JEEP"
            description="To take admission at Government Polytechnic Chaunaliya, follow the steps below."
          />

          <ol className="space-y-5">
            {ADMISSION_STEPS.map((step, i) => (
              <li key={i} className="flex gap-5 bg-white rounded-xl p-6 ring-1 ring-slate-200 shadow-sm">
                <span className="shrink-0 w-10 h-10 rounded-full bg-navy-950 text-gold-300 font-heading font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-slate-700 leading-relaxed pt-1.5">{step}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-2xl bg-navy-950 bg-diagonal-pattern p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-lg font-bold">Need the JEEP brochure?</h3>
              <p className="text-sm text-slate-300 mt-1">Download the official brochure to review eligibility, seat matrix and dates.</p>
            </div>
            <a
              href="https://www.ubter.in"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3 rounded-md transition-colors"
            >
              Visit UBTER Portal
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

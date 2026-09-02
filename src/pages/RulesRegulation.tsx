import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import usePageMeta from "../hooks/usePageMeta";
import { useRules } from "../lib/useContent";

export default function RulesRegulation() {
  usePageMeta(
    "Rules & Regulation",
    "Academic rules, attendance and examination regulations at Government Polytechnic Chaunaliya."
  );
  const { data: rulesData } = useRules();
  const RULES_REGULATIONS = rulesData.map((r) => r.content);

  return (
    <div>
      <PageHero title="Rules &amp; Regulation" crumb="Rules & Regulation" />

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow="Academic Policy" title="Examination &amp; Attendance Rules" />
          <ul className="space-y-4">
            {RULES_REGULATIONS.map((rule, i) => (
              <li key={i} className="flex gap-4 bg-white rounded-xl p-5 ring-1 ring-slate-200 shadow-sm">
                <span className="shrink-0 w-8 h-8 rounded-full bg-navy-950 text-gold-300 font-heading font-bold text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed pt-1">{rule}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

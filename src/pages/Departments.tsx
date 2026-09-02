import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import usePageMeta from "../hooks/usePageMeta";
import { useCourses } from "../lib/useContent";

export default function Departments() {
  usePageMeta(
    "Departments",
    "Civil and Environmental Engineering, and Computer Science and Engineering — diploma branches at GP Chaunaliya."
  );
  const { data: COURSES } = useCourses();

  return (
    <div>
      <PageHero title="Departments" crumb="Departments" />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="Academic Programmes"
            title="Two focused diploma engineering branches"
            description="Both branches follow the curriculum prescribed by the Uttarakhand Board of Technical Education, Roorkee, combining classroom theory with lab and workshop practice."
          />

          <div className="grid lg:grid-cols-2 gap-8">
            {COURSES.map((c, i) => (
              <div key={c.id} className="rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-sm bg-white">
                <div className="bg-navy-950 bg-diagonal-pattern p-8">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-gold-500 text-navy-950 font-heading font-extrabold text-lg mb-5">
                    {i + 1}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white">{c.name}</h3>
                </div>
                <div className="p-8">
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{c.description}</p>
                  <dl className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-slate-100 p-4">
                      <dt className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Duration</dt>
                      <dd className="font-heading font-bold text-navy-950 mt-1">{c.duration}</dd>
                    </div>
                    <div className="rounded-lg bg-slate-100 p-4">
                      <dt className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Intake</dt>
                      <dd className="font-heading font-bold text-navy-950 mt-1">{c.intake}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

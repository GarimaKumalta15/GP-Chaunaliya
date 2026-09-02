import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import usePageMeta from "../hooks/usePageMeta";
import { principal } from "../data/content";
import { useSiteSettings } from "../lib/useContent";

export default function About() {
  usePageMeta(
    "About the Institute",
    "History, affiliations and the Principal's message for Government Polytechnic Chaunaliya, Almora."
  );
  const { data: SITE } = useSiteSettings();

  return (
    <div>
      <PageHero title="About the Institute" crumb="About" />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-3 gap-14">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Who We Are" title={SITE.name} />
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Government Polytechnic Chaunaliya is a technical education institute located at Almora,
                Uttarakhand. Established in {SITE.established}, the institute is affiliated to the{" "}
                {SITE.affiliations[0]} and approved by the {SITE.affiliations[1]}.
              </p>
              <p>
                We are single-mindedly focused on addressing students' needs in an increasingly
                competitive world. Life, for us, is not a set of instructions but a series of experiences
                and a continuous learning process.
              </p>
              <p>
                Our aim is not only to pursue academic excellence but also to motivate and empower
                students — identifying and encouraging each one's talent, skills and abilities so they
                can reach great heights. Our supportive system provides access to academic mentoring,
                career counselling and hands-on experience within organisations.
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              <div className="rounded-xl bg-slate-100 p-6 ring-1 ring-slate-200">
                <p className="font-heading font-bold text-navy-950 mb-2">Courses Offered</p>
                <ul className="text-sm text-slate-600 space-y-1.5">
                  <li>1. Civil and Environmental Engineering</li>
                  <li>2. Computer Science &amp; Engineering</li>
                </ul>
              </div>
              <div className="rounded-xl bg-slate-100 p-6 ring-1 ring-slate-200">
                <p className="font-heading font-bold text-navy-950 mb-2">Affiliating Bodies</p>
                <ul className="text-sm text-slate-600 space-y-1.5">
                  {SITE.affiliations.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Principal's message */}
          <aside className="bg-navy-950 rounded-2xl p-8 text-white h-fit bg-diagonal-pattern">
            <div className="flex items-center gap-4 mb-6">
              <img src={principal} alt="Shailendra Joshi, Coordinator" className="w-16 h-16 rounded-full object-cover ring-2 ring-gold-400" />
              <div>
                <p className="font-heading font-bold text-white">Shailendra Joshi</p>
                <p className="text-xs text-gold-300 uppercase tracking-wide font-semibold">Coordinator's Message</p>
              </div>
            </div>
            <svg className="w-8 h-8 text-gold-500/40 mb-3" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36 1 24.416 4.352 28 9.104 28c4.512 0 7.856-3.68 7.856-8.16 0-4.288-3.008-7.232-6.816-7.232-.72 0-1.44.096-1.888.288C8.784 9.088 11.264 6.24 15.024 4L9.352 4zm16.624 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.056 3.36 8.64 8.112 8.64 4.512 0 7.856-3.68 7.856-8.16 0-4.288-3.008-7.232-6.816-7.232-.72 0-1.44.096-1.888.288C25.408 9.088 27.888 6.24 31.648 4h-5.672z" />
            </svg>
            <p className="text-sm text-slate-300 leading-relaxed">
              I am honoured and feel very privileged to be the Principal of Government Polytechnic
              Chaunaliya, Almora — an institute with an outstanding reputation for setting high
              expectations and achieving excellent academic results. Talent is constantly developed
              through sports and varied co-curricular activities.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed mt-4">
              While academic excellence is our major thrust, the College is equally devoted to preparing
              students for life — grooming them to face the challenges of tomorrow and encouraging them
              to be socially relevant.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed mt-4">
              I believe that quality, inspirational and passionate teachers are essential to a school's
              success — building classrooms where errors are welcome, engagement is the norm, and
              questioning runs high.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}

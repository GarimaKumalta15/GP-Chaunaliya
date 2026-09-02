import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import usePageMeta from "../hooks/usePageMeta";

const LINKS = [
  { to: "/notices", label: "Notices", desc: "Admission, examination and general announcements." },
  { to: "/admission", label: "Admission", desc: "Step-by-step JEEP admission process." },
  { to: "/rules-regulation", label: "Rules & Regulation", desc: "Attendance, exams and sessional marking rules." },
  { to: "/anti-ragging", label: "Anti-Ragging Campaign", desc: "Ragging-free campus policy and reporting." },
  { to: "/facilities", label: "Facilities", desc: "Library, Smart Classroom & Language Lab." },
  { to: "/gallery", label: "Gallery", desc: "Photos from campus life and events." },
];

export default function StudentCorner() {
  usePageMeta(
    "Student Corner",
    "Quick access to notices, admission, rules, anti-ragging policy and other student resources."
  );

  return (
    <div>
      <PageHero title="Student Corner" crumb="Student Corner" />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="For Students"
            title="Everything students need, in one place"
            align="center"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group bg-white rounded-xl p-6 ring-1 ring-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <h3 className="font-heading font-bold text-navy-950 mb-2 group-hover:text-maroon-700 transition-colors">
                  {l.label}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{l.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

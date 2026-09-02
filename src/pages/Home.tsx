import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import ImportantLinks from "../components/ImportantLinks";
import Reveal from "../components/Reveal";
import usePageMeta from "../hooks/usePageMeta";
import { campusMain, campusClassroom } from "../data/content";
import { useCourses, useFacilities, useSiteSettings } from "../lib/useContent";

const STATS = [
  { label: "Established", value: "2007" },
  { label: "Diploma Branches", value: "2" },
  { label: "Annual Intake", value: "120" },
  { label: "Approving Body", value: "AICTE" },
];

const ICONS: Record<string, ReactElement> = {
  book: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13M12 6.253C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  monitor: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  mic: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  ),
};

export default function Home() {
  usePageMeta(
    "Home",
    "Government Polytechnic Chaunaliya, Almora, Uttarakhand — AICTE approved diploma engineering institute offering Civil and Computer Science Engineering."
  );
  const { data: COURSES } = useCourses();
  const { data: FACILITIES } = useFacilities();
  const { data: SITE } = useSiteSettings();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-950 overflow-hidden">
        <div className="absolute inset-0 bg-diagonal-pattern pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10 items-center pt-14 pb-14 sm:pt-20 sm:pb-16">
          <div>
            <p className="inline-flex items-center gap-2 bg-white/10 text-gold-300 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-6 ring-1 ring-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              Govt. of Uttarakhand · AICTE Approved
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Welcome to Government
              <span className="text-gold-300"> Polytechnic Chaunaliya</span>
            </h1>
            <p className="mt-6 text-slate-300 text-lg leading-relaxed">
              A technical education institute in Almora District, Uttarakhand — single-mindedly focused
              on addressing students' needs in an increasingly competitive world, and preparing them
              for real careers in engineering.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/admission"
                className="btn-press inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3.5 rounded-md transition-colors shadow-lg shadow-gold-500/20"
              >
                Apply for Admission
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/about"
                className="btn-press inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3.5 rounded-md ring-1 ring-white/25 transition-colors"
              >
                About the Institute
              </Link>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-2xl">
            <img
              src={campusMain}
              alt="Government Polytechnic Chaunaliya campus building"
              className="w-full h-72 sm:h-96 lg:h-[420px] object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-5 py-3">
              <p className="text-white text-xs font-semibold tracking-wide">Government Polytechnic Chaunaliya, Almora</p>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <p className="font-heading text-2xl sm:text-3xl font-bold text-gold-300">{s.value}</p>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About preview + Important Links sidebar */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <Reveal>
              <SectionHeading
                eyebrow="About the Institute"
                title="Building skills, character and career-readiness"
              />
              <p className="text-slate-600 leading-relaxed mb-4">
                Established in {SITE.established}, Government Polytechnic Chaunaliya is affiliated to the
                Uttarakhand Board of Technical Education, Roorkee, and approved by the All India Council
                for Technical Education (AICTE), New Delhi.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Our aim is not only to pursue academic excellence but to identify and encourage the talent,
                skills and abilities of every student — supported by academic mentoring, career counselling
                and hands-on experience.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-navy-900 font-bold hover:text-maroon-700 transition-colors">
                Read the Principal's message
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </Reveal>

            <Reveal delay={100} className="grid grid-cols-2 gap-4 mt-10">
              <img src={campusMain} alt="GP Chaunaliya campus building" className="interactive-card rounded-xl object-cover w-full h-48 sm:h-60 shadow-md" />
              <img src={campusClassroom} alt="Students in a classroom at GP Chaunaliya" className="interactive-card rounded-xl object-cover w-full h-48 sm:h-60 shadow-md mt-8" />
            </Reveal>
          </div>

          <Reveal delay={150}>
            <ImportantLinks />
          </Reveal>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Reveal><SectionHeading eyebrow="Programmes Offered" title="Diploma Engineering Courses" align="center" /></Reveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {COURSES.map((c, i) => (
              <Reveal key={c.id} delay={i * 100}>
                <div className="interactive-card bg-white rounded-xl p-7 shadow-sm ring-1 ring-slate-200 h-full">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-navy-900 text-gold-300 font-heading font-bold mb-5">
                    {i + 1}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-navy-950 mb-2">{c.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">{c.description}</p>
                  <div className="flex gap-4 text-xs font-semibold text-slate-500 border-t border-slate-100 pt-4">
                    <span>⏱ {c.duration}</span>
                    <span>🎓 {c.intake}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Reveal><SectionHeading eyebrow="Campus Facilities" title="Everything students need to learn well" align="center" /></Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {FACILITIES.map((f, i) => (
              <Reveal key={f.id} delay={i * 100}>
                <div className="interactive-card rounded-xl p-7 bg-white ring-1 ring-slate-200 shadow-sm h-full">
                  <div className="w-12 h-12 rounded-lg bg-maroon-700/10 text-maroon-700 flex items-center justify-center mb-5">
                    {ICONS[f.icon]}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy-950 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-950 bg-diagonal-pattern relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 text-center relative">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Ready to start your engineering journey?
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto">
            Admissions are conducted through the Joint Entrance Examination for Polytechnics (JEEP),
            counselled and allotted via UBTER, Roorkee.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/admission" className="btn-press bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3.5 rounded-md transition-colors">
              View Admission Process
            </Link>
            <Link to="/contact" className="btn-press bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3.5 rounded-md ring-1 ring-white/25 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Link } from "react-router-dom";
import { NAV_LINKS } from "../data/content";
import { useSiteSettings } from "../lib/useContent";

export default function Footer() {
  const { data: SITE } = useSiteSettings();
  return (
    <footer className="bg-navy-950 text-slate-300 bg-diagonal-pattern">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center ring-2 ring-gold-400">
              <span className="font-heading font-bold text-gold-300">GP</span>
            </div>
            <p className="font-heading font-bold text-white text-sm leading-tight">
              Government Polytechnic<br />Chaunaliya
            </p>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Technical education institute in {SITE.district}, established {SITE.established}.
            Affiliated to UBTER Roorkee and approved by AICTE, New Delhi.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wide mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="text-slate-400 hover:text-gold-300 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wide mb-4">Student Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/notices" className="text-slate-400 hover:text-gold-300 transition-colors">Notices</Link></li>
            <li><Link to="/rules-regulation" className="text-slate-400 hover:text-gold-300 transition-colors">Rules &amp; Regulation</Link></li>
            <li><Link to="/anti-ragging" className="text-slate-400 hover:text-gold-300 transition-colors">Anti-Ragging Campaign</Link></li>
            <li><Link to="/student-corner" className="text-slate-400 hover:text-gold-300 transition-colors">Student Corner</Link></li>
          </ul>
          <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wide mt-6 mb-4">Departments</h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>Civil and Environmental Engineering</li>
            <li>Computer Science and Engineering</li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wide mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex gap-2.5">
              <svg className="w-4 h-4 mt-0.5 text-gold-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
              {SITE.address}
            </li>
            <li className="flex gap-2.5">
              <svg className="w-4 h-4 mt-0.5 text-gold-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
              {SITE.phone}
            </li>
            <li className="flex gap-2.5">
              <svg className="w-4 h-4 mt-0.5 text-gold-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
              {SITE.email}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Government Polytechnic Chaunaliya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

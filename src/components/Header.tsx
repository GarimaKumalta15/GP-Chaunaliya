import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../data/content";
import { useSiteSettings } from "../lib/useContent";

export default function Header() {
  const { data: SITE } = useSiteSettings();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="hidden sm:block bg-navy-950 text-slate-200 text-xs">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-9 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-gold-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
            <span>{SITE.hours}</span>
          </div>
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-gold-300 transition-colors">
            <svg className="w-3.5 h-3.5 text-gold-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
            <span>{SITE.email}</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <header className={`bg-white transition-shadow ${scrolled ? "shadow-md" : "shadow-sm"} border-b border-slate-200`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center ring-2 ring-gold-400 ring-offset-2 shrink-0">
                <span className="font-heading font-bold text-gold-300 text-lg">GP</span>
              </div>
              <div className="leading-tight">
                <p className="font-heading font-bold text-navy-900 text-sm sm:text-base tracking-tight">
                  Government Polytechnic
                </p>
                <p className="text-[11px] sm:text-xs text-maroon-700 font-semibold tracking-wide uppercase">
                  Chaunaliya · Almora, Uttarakhand
                </p>
              </div>
            </NavLink>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                      isActive
                        ? "text-navy-900 bg-gold-400/20"
                        : "text-slate-600 hover:text-navy-900 hover:bg-slate-100"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden lg:block">
              <NavLink
                to="/admission"
                className="inline-flex items-center gap-2 bg-maroon-700 hover:bg-maroon-600 text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors shadow-sm"
              >
                Apply for Admission
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </NavLink>
            </div>

            <button
              className="lg:hidden p-2 rounded-md text-navy-900 hover:bg-slate-100"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-md text-sm font-semibold ${
                      isActive ? "text-navy-900 bg-gold-400/20" : "text-slate-600"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/admission"
                onClick={() => setOpen(false)}
                className="mt-2 text-center bg-maroon-700 text-white text-sm font-semibold px-4 py-2.5 rounded-md"
              >
                Apply for Admission
              </NavLink>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}

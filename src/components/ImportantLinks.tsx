import { useImportantLinks } from "../lib/useContent";

/**
 * Sidebar card of verified external links. Lives inside the homepage layout
 * next to other content — not a top banner.
 */
export default function ImportantLinks() {
  const { data: IMPORTANT_LINKS } = useImportantLinks();
  return (
    <div className="bg-white rounded-2xl p-6 ring-1 ring-slate-200 shadow-sm sticky top-24">
      <p className="text-xs font-bold uppercase tracking-widest text-maroon-700 mb-1">Quick Access</p>
      <h3 className="font-heading font-bold text-navy-950 text-lg mb-5">Important Links</h3>
      <ul className="space-y-2.5">
        {IMPORTANT_LINKS.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-3 text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-gold-400/15 rounded-lg px-4 py-3 ring-1 ring-slate-200 hover:ring-gold-400 transition-colors interactive-card"
            >
              <span>{link.label}</span>
              <svg
                className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-maroon-700 group-hover:translate-x-0.5 transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

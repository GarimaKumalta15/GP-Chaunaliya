import { Link } from "react-router-dom";
import { useNotices } from "../lib/useContent";

export default function NoticeMarquee() {
  const { data: NOTICES } = useNotices();
  const items = [...NOTICES, ...NOTICES];

  return (
    <div className="bg-gold-500 text-navy-950 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-stretch">
        <Link
          to="/notices"
          className="shrink-0 flex items-center gap-2 bg-navy-950 text-gold-300 font-heading font-bold text-xs sm:text-sm uppercase tracking-wide px-4 py-2.5 pr-6 relative z-10 hover:bg-navy-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a2 2 0 01-2-2h4a2 2 0 01-2 2z" /></svg>
          Notices
        </Link>
        <div className="flex-1 overflow-hidden py-2.5 flex items-center">
          <div className="marquee-track">
            {items.map((n, i) => (
              <span key={i} className="flex items-center whitespace-nowrap text-sm font-medium px-6">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-900 mr-2" />
                {n.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

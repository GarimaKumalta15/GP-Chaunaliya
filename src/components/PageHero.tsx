import { Link } from "react-router-dom";

interface Props {
  title: string;
  crumb: string;
}

export default function PageHero({ title, crumb }: Props) {
  return (
    <div className="relative bg-navy-950 bg-diagonal-pattern overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-black opacity-90" />
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-14 sm:py-16">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">{title}</h1>
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
          <Link to="/" className="hover:text-gold-300 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gold-300">{crumb}</span>
        </div>
      </div>
    </div>
  );
}

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({ eyebrow, title, description, align = "left", light = false }: Props) {
  const isCenter = align === "center";
  return (
    <div className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""} mb-10`}>
      {eyebrow && (
        <p className={`section-label text-xs font-bold uppercase tracking-widest mb-3 ${light ? "text-gold-300" : "text-maroon-700"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-heading text-3xl sm:text-4xl font-bold tracking-tight ${light ? "text-white" : "text-navy-950"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${light ? "text-slate-300" : "text-slate-600"}`}>
          {description}
        </p>
      )}
      <div className={`mt-5 h-1 w-16 rounded-full bg-gold-500 ${isCenter ? "mx-auto" : ""}`} />
    </div>
  );
}

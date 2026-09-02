import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import usePageMeta from "../hooks/usePageMeta";
import { useStaff } from "../lib/useContent";

export default function Faculty() {
  usePageMeta("Faculty & Staff", "Faculty and staff directory at Government Polytechnic Chaunaliya, Almora.");
  const { data: STAFF } = useStaff();

  return (
    <div>
      <PageHero title="Faculty &amp; Staff" crumb="Faculty" />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow="Our People" title="Faculty and Staff Directory" align="center" />

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {STAFF.map((s) => (
              <div key={s.id} className="bg-white rounded-xl overflow-hidden ring-1 ring-slate-200 shadow-sm hover:shadow-lg transition-shadow group">
                <div className="aspect-[4/5] overflow-hidden bg-slate-200">
                  {s.photo ? (
                    <img
                      src={s.photo}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-heading text-3xl font-bold">
                      {s.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <p className="font-heading font-bold text-navy-950 text-sm">{s.name}</p>
                  <p className="text-xs text-maroon-700 font-semibold mt-1">{s.designation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

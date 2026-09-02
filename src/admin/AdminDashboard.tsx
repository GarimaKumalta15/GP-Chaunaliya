import { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import GenericTableEditor from "./GenericTableEditor";
import SingleRowEditor from "./SingleRowEditor";

const SECTIONS = [
  { id: "notices", label: "Notices" },
  { id: "staff", label: "Faculty & Staff" },
  { id: "courses", label: "Courses" },
  { id: "facilities", label: "Facilities" },
  { id: "gallery", label: "Gallery" },
  { id: "links", label: "Important Links" },
  { id: "rules", label: "Rules & Regulations" },
  { id: "admission", label: "Admission Steps" },
  { id: "anti-ragging", label: "Anti-Ragging" },
  { id: "settings", label: "Site Settings" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const [active, setActive] = useState<SectionId>("notices");

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-60 shrink-0 bg-navy-950 text-white flex flex-col">
        <div className="p-5 border-b border-white/10">
          <p className="font-heading font-bold text-sm text-gold-300">GPC Chaunaliya</p>
          <p className="text-xs text-white/60 mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-3">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`w-full text-left px-5 py-2.5 text-sm transition-colors ${
                active === s.id ? "bg-white/10 text-gold-300 font-semibold" : "text-white/80 hover:bg-white/5"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => signOut()}
            className="w-full text-xs font-semibold text-white/70 hover:text-white ring-1 ring-white/20 rounded-lg py-2"
          >
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {active === "notices" && (
          <GenericTableEditor
            table="notices"
            title="Notices"
            description="Items shown on the Notices page and the homepage marquee."
            fields={[
              { key: "title", label: "Title", type: "textarea" },
              { key: "date", label: "Date / label", type: "text", placeholder: "e.g. Standing notice" },
              { key: "tag", label: "Tag", type: "text", placeholder: "e.g. Admission, General" },
              { key: "sort_order", label: "Order (lower = higher up)", type: "number" },
            ]}
            emptyRow={{ title: "", date: "", tag: "", sort_order: 0 }}
          />
        )}

        {active === "staff" && (
          <GenericTableEditor
            table="staff"
            title="Faculty & Staff"
            description="People shown on the Faculty page."
            fields={[
              { key: "name", label: "Name", type: "text" },
              { key: "designation", label: "Designation", type: "text" },
              { key: "photo_url", label: "Photo", type: "image" },
              { key: "sort_order", label: "Order (lower = higher up)", type: "number" },
            ]}
            emptyRow={{ name: "", designation: "", photo_url: "", sort_order: 0 }}
          />
        )}

        {active === "courses" && (
          <GenericTableEditor
            table="courses"
            title="Courses"
            description="Diploma programmes shown on the Departments page."
            fields={[
              { key: "name", label: "Full Name", type: "text" },
              { key: "short_name", label: "Short Name", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "duration", label: "Duration", type: "text" },
              { key: "intake", label: "Intake", type: "text" },
              { key: "sort_order", label: "Order (lower = higher up)", type: "number" },
            ]}
            emptyRow={{ name: "", short_name: "", description: "", duration: "", intake: "", sort_order: 0 }}
          />
        )}

        {active === "facilities" && (
          <GenericTableEditor
            table="facilities"
            title="Facilities"
            description="Campus facilities shown on the Facilities page."
            fields={[
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "points", label: "Points (one per line)", type: "list" },
              { key: "icon", label: "Icon", type: "select", options: ["book", "monitor", "mic"] },
              { key: "sort_order", label: "Order (lower = higher up)", type: "number" },
            ]}
            emptyRow={{ title: "", description: "", points: [], icon: "book", sort_order: 0 }}
          />
        )}

        {active === "gallery" && (
          <GenericTableEditor
            table="gallery"
            title="Gallery"
            description="Photos shown on the Gallery page."
            fields={[
              { key: "image_url", label: "Photo", type: "image" },
              { key: "caption", label: "Caption", type: "text" },
              { key: "sort_order", label: "Order (lower = higher up)", type: "number" },
            ]}
            emptyRow={{ image_url: "", caption: "", sort_order: 0 }}
          />
        )}

        {active === "links" && (
          <GenericTableEditor
            table="important_links"
            title="Important Links"
            description="External links shown across the site (UBTER, JEEP, AICTE, etc.)."
            fields={[
              { key: "label", label: "Label", type: "text" },
              { key: "url", label: "URL", type: "text", placeholder: "https://..." },
              { key: "sort_order", label: "Order (lower = higher up)", type: "number" },
            ]}
            emptyRow={{ label: "", url: "", sort_order: 0 }}
          />
        )}

        {active === "rules" && (
          <GenericTableEditor
            table="rules"
            title="Rules & Regulations"
            description="Each item shown as one rule on the Rules & Regulation page."
            fields={[
              { key: "content", label: "Rule text", type: "textarea" },
              { key: "sort_order", label: "Order (lower = higher up)", type: "number" },
            ]}
            emptyRow={{ content: "", sort_order: 0 }}
          />
        )}

        {active === "admission" && (
          <GenericTableEditor
            table="admission_steps"
            title="Admission Steps"
            description="Step-by-step admission process shown on the Admission page."
            fields={[
              { key: "content", label: "Step text", type: "textarea" },
              { key: "sort_order", label: "Order (lower = higher up)", type: "number" },
            ]}
            emptyRow={{ content: "", sort_order: 0 }}
          />
        )}

        {active === "anti-ragging" && (
          <div className="space-y-10">
            <SingleRowEditor
              table="anti_ragging_info"
              title="Anti-Ragging — Intro & Definition"
              description="The main text shown at the top of the Anti-Ragging page."
              fields={[
                { key: "intro", label: "Intro paragraph", type: "textarea" },
                { key: "definition", label: "Definition paragraph", type: "textarea" },
              ]}
            />
            <GenericTableEditor
              table="anti_ragging_punishments"
              title="Anti-Ragging — Punishments List"
              description="Each item shown as one punishment on the Anti-Ragging page."
              fields={[
                { key: "content", label: "Punishment text", type: "text" },
                { key: "sort_order", label: "Order (lower = higher up)", type: "number" },
              ]}
              emptyRow={{ content: "", sort_order: 0 }}
            />
          </div>
        )}

        {active === "settings" && (
          <SingleRowEditor
            table="site_settings"
            title="Site Settings"
            description="Core institute details used across the site (header, footer, contact page)."
            fields={[
              { key: "name", label: "Full Name", type: "text" },
              { key: "short_name", label: "Short Name", type: "text" },
              { key: "district", label: "District", type: "text" },
              { key: "established", label: "Established Year", type: "number" },
              { key: "address", label: "Address", type: "textarea" },
              { key: "phone", label: "Phone", type: "text" },
              { key: "email", label: "Email", type: "text" },
              { key: "hours", label: "Office Hours", type: "text" },
            ]}
          />
        )}
      </main>
    </div>
  );
}

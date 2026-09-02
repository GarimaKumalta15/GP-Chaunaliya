import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { FieldDef } from "./GenericTableEditor";

interface Props {
  table: string;
  title: string;
  description: string;
  fields: FieldDef[];
}

export default function SingleRowEditor({ table, title, description, fields }: Props) {
  const [row, setRow] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from(table)
      .select("*")
      .eq("id", 1)
      .single()
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setRow(data ?? {});
        setLoading(false);
      });
  }, [table]);

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);
    const { error } = await supabase.from(table).update(row).eq("id", 1);
    setSaving(false);
    if (error) setError(error.message);
    else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  if (loading) return <p className="text-sm text-slate-500">Loading…</p>;

  return (
    <div>
      <h2 className="font-heading font-bold text-lg text-navy-950">{title}</h2>
      <p className="text-sm text-slate-500 mt-0.5 mb-6">{description}</p>

      {error && (
        <div className="mb-4 text-sm bg-red-50 text-red-700 ring-1 ring-red-200 rounded-lg p-3">{error}</div>
      )}
      {saved && (
        <div className="mb-4 text-sm bg-green-50 text-green-700 ring-1 ring-green-200 rounded-lg p-3">
          Saved successfully.
        </div>
      )}

      <div className="bg-white rounded-xl ring-1 ring-slate-200 p-6 space-y-4 max-w-xl">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-xs font-semibold text-slate-600 mb-1">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                rows={4}
                value={row[field.key] ?? ""}
                onChange={(e) => setRow({ ...row, [field.key]: e.target.value })}
                className="w-full rounded-lg ring-1 ring-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-600"
              />
            ) : field.type === "number" ? (
              <input
                type="number"
                value={row[field.key] ?? 0}
                onChange={(e) => setRow({ ...row, [field.key]: Number(e.target.value) })}
                className="w-full rounded-lg ring-1 ring-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-600"
              />
            ) : (
              <input
                type="text"
                value={row[field.key] ?? ""}
                onChange={(e) => setRow({ ...row, [field.key]: e.target.value })}
                className="w-full rounded-lg ring-1 ring-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-600"
              />
            )}
          </div>
        ))}

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-navy-950 text-gold-300 font-semibold text-sm rounded-lg px-5 py-2.5 hover:bg-navy-900 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

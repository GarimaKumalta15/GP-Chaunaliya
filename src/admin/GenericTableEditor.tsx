import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export type FieldType = "text" | "textarea" | "number" | "list" | "image" | "select";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  options?: string[]; // for "select"
  placeholder?: string;
}

interface Props {
  table: string;
  title: string;
  description: string;
  fields: FieldDef[];
  orderBy?: string;
  emptyRow: Record<string, any>;
  imageBucket?: string; // if any field is type "image", uploads go to this bucket
}

export default function GenericTableEditor({
  table,
  title,
  description,
  fields,
  orderBy = "sort_order",
  emptyRow,
  imageBucket = "site-images",
}: Props) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<any | null>(null); // row being edited, or emptyRow for "new"
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from(table).select("*").order(orderBy, { ascending: true });
    if (error) setError(error.message);
    else setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) setError(error.message);
    else load();
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    setError(null);

    const payload = { ...editing };
    delete payload.created_at;
    const isNew = !payload.id;
    if (isNew) delete payload.id;

    const { error } = isNew
      ? await supabase.from(table).insert(payload)
      : await supabase.from(table).update(payload).eq("id", payload.id);

    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setEditing(null);
    load();
  }

  async function handleImageUpload(file: File, key: string) {
    setUploadingKey(key);
    setError(null);
    const ext = file.name.split(".").pop();
    const path = `${table}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: uploadError } = await supabase.storage.from(imageBucket).upload(path, file);
    if (uploadError) {
      setError(uploadError.message);
      setUploadingKey(null);
      return;
    }
    const { data } = supabase.storage.from(imageBucket).getPublicUrl(path);
    setEditing((prev: any) => ({ ...prev, [key]: data.publicUrl }));
    setUploadingKey(null);
  }

  function moveRow(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= rows.length) return;
    const a = rows[index];
    const b = rows[targetIndex];
    const aOrder = a.sort_order ?? index;
    const bOrder = b.sort_order ?? targetIndex;
    Promise.all([
      supabase.from(table).update({ sort_order: bOrder }).eq("id", a.id),
      supabase.from(table).update({ sort_order: aOrder }).eq("id", b.id),
    ]).then(() => load());
  }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-lg text-navy-950">{title}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{description}</p>
        </div>
        <button
          onClick={() => setEditing({ ...emptyRow })}
          className="shrink-0 bg-navy-950 text-gold-300 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-navy-900"
        >
          + Add New
        </button>
      </div>

      {error && (
        <div className="mb-4 text-sm bg-red-50 text-red-700 ring-1 ring-red-200 rounded-lg p-3">{error}</div>
      )}

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-slate-500">Nothing here yet. Click "Add New" to create the first item.</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((row, i) => (
            <li
              key={row.id}
              className="flex items-center gap-3 bg-white rounded-xl p-4 ring-1 ring-slate-200"
            >
              {row.sort_order !== undefined && (
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button
                    onClick={() => moveRow(i, -1)}
                    disabled={i === 0}
                    className="text-slate-400 hover:text-navy-900 disabled:opacity-20 text-xs"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveRow(i, 1)}
                    disabled={i === rows.length - 1}
                    className="text-slate-400 hover:text-navy-900 disabled:opacity-20 text-xs"
                  >
                    ▼
                  </button>
                </div>
              )}

              {fields.find((f) => f.type === "image") &&
                row[fields.find((f) => f.type === "image")!.key] && (
                  <img
                    src={row[fields.find((f) => f.type === "image")!.key]}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover shrink-0 ring-1 ring-slate-200"
                  />
                )}

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-navy-950 truncate">
                  {String(row[fields[0].key] ?? "")}
                </p>
                {fields[1] && (
                  <p className="text-xs text-slate-500 truncate">{String(row[fields[1].key] ?? "")}</p>
                )}
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setEditing(row)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg ring-1 ring-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg ring-1 ring-red-200 text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6">
            <h3 className="font-heading font-bold text-navy-950 mb-4">
              {editing.id ? "Edit Item" : "Add New Item"}
            </h3>

            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{field.label}</label>

                  {field.type === "textarea" && (
                    <textarea
                      rows={3}
                      value={editing[field.key] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(e) => setEditing({ ...editing, [field.key]: e.target.value })}
                      className="w-full rounded-lg ring-1 ring-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-600"
                    />
                  )}

                  {field.type === "text" && (
                    <input
                      type="text"
                      value={editing[field.key] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(e) => setEditing({ ...editing, [field.key]: e.target.value })}
                      className="w-full rounded-lg ring-1 ring-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-600"
                    />
                  )}

                  {field.type === "number" && (
                    <input
                      type="number"
                      value={editing[field.key] ?? 0}
                      onChange={(e) => setEditing({ ...editing, [field.key]: Number(e.target.value) })}
                      className="w-full rounded-lg ring-1 ring-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-600"
                    />
                  )}

                  {field.type === "select" && (
                    <select
                      value={editing[field.key] ?? field.options?.[0]}
                      onChange={(e) => setEditing({ ...editing, [field.key]: e.target.value })}
                      className="w-full rounded-lg ring-1 ring-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-600"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  {field.type === "list" && (
                    <textarea
                      rows={3}
                      value={(editing[field.key] ?? []).join("\n")}
                      placeholder="One item per line"
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          [field.key]: e.target.value.split("\n").filter((l) => l.trim() !== ""),
                        })
                      }
                      className="w-full rounded-lg ring-1 ring-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-600"
                    />
                  )}

                  {field.type === "image" && (
                    <div className="space-y-2">
                      {editing[field.key] && (
                        <img
                          src={editing[field.key]}
                          alt=""
                          className="w-20 h-20 rounded-lg object-cover ring-1 ring-slate-200"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, field.key);
                        }}
                        className="text-xs"
                      />
                      {uploadingKey === field.key && <p className="text-xs text-slate-500">Uploading…</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-navy-950 text-gold-300 font-semibold text-sm rounded-lg py-2.5 hover:bg-navy-900 disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save"}
              </button>
              <button
                onClick={() => setEditing(null)}
                className="flex-1 ring-1 ring-slate-300 text-slate-700 font-semibold text-sm rounded-lg py-2.5 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

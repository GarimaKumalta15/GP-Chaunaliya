import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "./supabaseClient";
import type { Notice, StaffMember, Course, Facility, GalleryImage, ImportantLink } from "../types";
import * as fallback from "../data/content";

interface UseTableResult<T> {
  data: T[];
  loading: boolean;
  refresh: () => void;
}

function useTable<T>(
  table: string,
  mapRow: (row: any) => T,
  fallbackData: T[],
  orderBy = "sort_order"
): UseTableResult<T> {
  const [data, setData] = useState<T[]>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!isSupabaseConfigured) {
        setData(fallbackData);
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data: rows, error } = await supabase.from(table).select("*").order(orderBy, { ascending: true });
      if (cancelled) return;
      if (error || !rows) {
        console.error(`[Supabase] Failed to load "${table}":`, error?.message);
        setData(fallbackData);
      } else {
        setData(rows.map(mapRow));
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, tick]);

  return { data, loading, refresh: () => setTick((t) => t + 1) };
}

export function useNotices() {
  return useTable<Notice>(
    "notices",
    (r) => ({ id: r.id, title: r.title, date: r.date, tag: r.tag ?? undefined }),
    fallback.NOTICES
  );
}

export function useStaff() {
  return useTable<StaffMember>(
    "staff",
    (r) => ({ id: r.id, name: r.name, designation: r.designation, photo: r.photo_url ?? undefined }),
    fallback.STAFF
  );
}

export function useCourses() {
  return useTable<Course>(
    "courses",
    (r) => ({
      id: r.id,
      name: r.name,
      shortName: r.short_name,
      description: r.description,
      duration: r.duration,
      intake: r.intake,
    }),
    fallback.COURSES
  );
}

export function useFacilities() {
  return useTable<Facility>(
    "facilities",
    (r) => ({ id: r.id, title: r.title, description: r.description, points: r.points ?? [], icon: r.icon }),
    fallback.FACILITIES
  );
}

export function useGallery() {
  return useTable<GalleryImage>(
    "gallery",
    (r) => ({ id: r.id, src: r.image_url, caption: r.caption }),
    fallback.GALLERY
  );
}

export function useImportantLinks() {
  return useTable<ImportantLink>(
    "important_links",
    (r) => ({ id: r.id, label: r.label, url: r.url }),
    fallback.IMPORTANT_LINKS
  );
}

export function useRules() {
  return useTable<{ id: string; content: string }>(
    "rules",
    (r) => ({ id: r.id, content: r.content }),
    fallback.RULES_REGULATIONS.map((content, i) => ({ id: String(i), content }))
  );
}

export function useAdmissionSteps() {
  return useTable<{ id: string; content: string }>(
    "admission_steps",
    (r) => ({ id: r.id, content: r.content }),
    fallback.ADMISSION_STEPS.map((content, i) => ({ id: String(i), content }))
  );
}

export function useAntiRaggingPunishments() {
  return useTable<{ id: string; content: string }>(
    "anti_ragging_punishments",
    (r) => ({ id: r.id, content: r.content }),
    fallback.ANTI_RAGGING.punishments.map((content, i) => ({ id: String(i), content }))
  );
}

export function useAntiRaggingInfo() {
  const [data, setData] = useState(fallback.ANTI_RAGGING);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }
      const { data: row } = await supabase.from("anti_ragging_info").select("*").eq("id", 1).single();
      if (!cancelled && row) {
        setData((prev) => ({ ...prev, intro: row.intro, definition: row.definition }));
      }
      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading };
}

export function useSiteSettings() {
  const [data, setData] = useState(fallback.SITE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }
      const { data: row } = await supabase.from("site_settings").select("*").eq("id", 1).single();
      if (!cancelled && row) {
        setData({
          name: row.name,
          shortName: row.short_name,
          district: row.district,
          established: row.established,
          affiliations: fallback.SITE.affiliations,
          address: row.address,
          phone: row.phone,
          email: row.email,
          hours: row.hours,
        });
      }
      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading };
}

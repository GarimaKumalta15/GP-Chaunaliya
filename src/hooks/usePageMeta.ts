import { useEffect } from "react";

const SITE_SUFFIX = "GP Chaunaliya, Almora";

/**
 * Sets the document title and meta description for the current page.
 * Keeps basic per-page SEO without adding a router-meta dependency.
 */
export default function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | ${SITE_SUFFIX}`;

    let meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? undefined;

    if (description) {
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }

    return () => {
      document.title = previousTitle;
      if (meta && previousDescription !== undefined) {
        meta.setAttribute("content", previousDescription);
      }
    };
  }, [title, description]);
}

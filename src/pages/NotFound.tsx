import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("Page Not Found", "The page you're looking for doesn't exist.");

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-heading text-6xl font-extrabold text-navy-950">404</p>
        <p className="text-slate-600 mt-3">The page you're looking for doesn't exist.</p>
        <Link to="/" className="inline-block mt-6 bg-maroon-700 hover:bg-maroon-600 text-white font-semibold px-6 py-3 rounded-md transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

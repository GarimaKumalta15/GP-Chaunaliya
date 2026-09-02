import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NoticeMarquee from "./components/NoticeMarquee";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Departments from "./pages/Departments";
import Facilities from "./pages/Facilities";
import Faculty from "./pages/Faculty";
import Admission from "./pages/Admission";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Notices from "./pages/Notices";
import RulesRegulation from "./pages/RulesRegulation";
import AntiRagging from "./pages/AntiRagging";
import StudentCorner from "./pages/StudentCorner";
import NotFound from "./pages/NotFound";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedRoute from "./admin/ProtectedRoute";

export default function App() {
  const location = useLocation();
  // Admin routes render their own layout — no public header/footer/marquee,
  // and nothing that hints an admin area exists (no nav link points here).
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <NoticeMarquee />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/student-corner" element={<StudentCorner />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/rules-regulation" element={<RulesRegulation />} />
          <Route path="/anti-ragging" element={<AntiRagging />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

import { useState, type FormEvent } from "react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import usePageMeta from "../hooks/usePageMeta";
import { useSiteSettings } from "../lib/useContent";

export default function Contact() {
  usePageMeta("Contact Us", "Address, phone, email and office hours for Government Polytechnic Chaunaliya.");
  const { data: SITE } = useSiteSettings();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Website enquiry from ${form.name || "Website Visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  }

  return (
    <div>
      <PageHero title="Contact Us" crumb="Contact" />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <SectionHeading eyebrow="Get in Touch" title="Visit or reach out to us" />

            <div className="space-y-4">
              <div className="flex gap-4 bg-white rounded-xl p-5 ring-1 ring-slate-200 shadow-sm">
                <div className="w-11 h-11 shrink-0 rounded-lg bg-navy-950 text-gold-300 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <p className="font-heading font-bold text-navy-950 text-sm">Address</p>
                  <p className="text-sm text-slate-600 mt-1">{SITE.address}</p>
                </div>
              </div>
              <div className="flex gap-4 bg-white rounded-xl p-5 ring-1 ring-slate-200 shadow-sm">
                <div className="w-11 h-11 shrink-0 rounded-lg bg-navy-950 text-gold-300 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                </div>
                <div>
                  <p className="font-heading font-bold text-navy-950 text-sm">Phone</p>
                  <a href={`tel:${SITE.phone}`} className="text-sm text-slate-600 mt-1 hover:text-maroon-700 transition-colors">{SITE.phone}</a>
                </div>
              </div>
              <div className="flex gap-4 bg-white rounded-xl p-5 ring-1 ring-slate-200 shadow-sm">
                <div className="w-11 h-11 shrink-0 rounded-lg bg-navy-950 text-gold-300 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                </div>
                <div>
                  <p className="font-heading font-bold text-navy-950 text-sm">Email</p>
                  <a href={`mailto:${SITE.email}`} className="text-sm text-slate-600 mt-1 hover:text-maroon-700 transition-colors">{SITE.email}</a>
                </div>
              </div>
              <div className="flex gap-4 bg-white rounded-xl p-5 ring-1 ring-slate-200 shadow-sm">
                <div className="w-11 h-11 shrink-0 rounded-lg bg-navy-950 text-gold-300 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <p className="font-heading font-bold text-navy-950 text-sm">Office Hours</p>
                  <p className="text-sm text-slate-600 mt-1">{SITE.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 ring-1 ring-slate-200 shadow-sm space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-navy-950 mb-2">Your Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-950 mb-2">Your Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-950 mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-maroon-700 hover:bg-maroon-600 text-white font-semibold px-6 py-3 rounded-md transition-colors"
              >
                Send Message
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <p className="text-xs text-slate-500">Submitting opens your email app addressed to {SITE.email}.</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

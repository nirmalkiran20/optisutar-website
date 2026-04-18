import type { Metadata } from "next";

export const contactMetadata: Metadata = {
  title: "Contact Us | Get a Free SEO Audit",
  description:
    "Get in touch with Optisutar for a free SEO audit and digital marketing consultation. Based in Pune, serving clients across India and globally.",
  alternates: { canonical: "https://optisutar.com/contact" },
  openGraph: {
    title: "Contact Optisutar | Free SEO Audit",
    description: "Book a free audit and find out exactly where your brand stands in search and AI results.",
    url: "https://optisutar.com/contact",
  },
};

import { useState } from "react";

const contactDetails = [
  {
    icon: "📍",
    label: "Address",
    value: "Pune, Maharashtra, India",
    color: "#a78bfa",
  },
  {
    icon: "📧",
    label: "Email",
    value: "hello@optisutar.com",
    color: "#38bdf8",
    href: "mailto:hello@optisutar.com",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+91 98765 43210",
    color: "#4ade80",
    href: "tel:+919876543210",
  },
  {
    icon: "🕐",
    label: "Working Hours",
    value: "Mon – Sat, 9am – 7pm IST",
    color: "#fb923c",
  },
];

const services = [
  "AIO — AI Optimisation",
  "GEO — Generative Engine Optimisation",
  "AEO — Answer Engine Optimisation",
  "AI SEO",
  "PPC Advertising",
  "Google My Business",
  "Reputation Management",
  "Website Design",
  "Social Media Marketing",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#080c1a] text-white">

      {/* Hero */}
      <section className="relative pt-28 pb-16 px-6 text-center overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #6366f1, transparent)" }}
        />
        <p className="text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-3">
          Get In Touch
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Let's Build Something{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Great Together
          </span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          Tell us about your project and we'll get back to you within 24 hours with a free audit and strategy overview.
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left — Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Contact cards */}
            {contactDetails.map((detail) => (
              <div
                key={detail.label}
                className="relative flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group"
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-10 blur-2xl pointer-events-none rounded-full"
                  style={{ background: `radial-gradient(circle, ${detail.color}, transparent)` }}
                />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border border-white/10"
                  style={{ backgroundColor: `${detail.color}18` }}
                >
                  {detail.icon}
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1">{detail.label}</p>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="text-white/80 text-sm font-medium hover:text-white transition-colors"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="text-white/80 text-sm font-medium">{detail.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
              <p className="text-white/30 text-xs uppercase tracking-wider mb-4">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { label: "LinkedIn", emoji: "💼", href: "#" },
                  { label: "Twitter", emoji: "🐦", href: "#" },
                  { label: "Instagram", emoji: "📸", href: "#" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10 transition-all duration-200 text-sm text-white/60 hover:text-white"
                  >
                    <span>{s.emoji}</span>
                    <span className="text-xs">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 overflow-hidden">
              {/* Background glow */}
              <div
                className="absolute -top-20 -right-20 w-64 h-64 opacity-10 blur-3xl pointer-events-none rounded-full"
                style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
              />

              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                  <span className="text-6xl">🎉</span>
                  <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                  <p className="text-white/50 max-w-sm">
                    Thanks for reaching out. We'll review your details and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", service: "", message: "" }); }}
                    className="mt-4 px-6 py-2.5 rounded-full border border-white/15 text-white/60 text-sm hover:border-white/35 hover:text-white transition-all duration-200"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="relative z-10">
                  <h2 className="text-xl font-bold text-white mb-1">Send Us a Message</h2>
                  <p className="text-white/40 text-sm mb-7">Fill in the form and we'll be in touch shortly.</p>

                  <div className="space-y-4">
                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">
                          Full Name <span className="text-indigo-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">
                          Email <span className="text-indigo-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Phone + Service */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">
                          Service Interested In
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full bg-[#0e1228] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all duration-200 cursor-pointer"
                        >
                          <option value="" className="text-white/40">Select a service...</option>
                          {services.map((s) => (
                            <option key={s} value={s} className="bg-[#0e1228]">{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">
                        Message <span className="text-indigo-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us about your business, goals, and what you'd like help with..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3.5 rounded-xl hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 text-sm"
                    >
                      Send Message →
                    </button>

                    <p className="text-center text-white/25 text-xs pt-1">
                      We typically respond within 24 hours on business days.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-3xl overflow-hidden border border-white/10 h-80">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242118.26890956502!2d73.72892565!3d18.5245649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1713000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

    </main>
  );
}
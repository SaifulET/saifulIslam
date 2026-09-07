"use client";

import React, { useState, useEffect } from "react";
import { 
  Send, 
  Mail, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  ExternalLink 
} from "lucide-react";
import SocialIcon from "./SocialIcon";

export default function ContactSection() {
  const [profile, setProfile] = useState<any>({
    email: "saifulislam3412883@gmail.com",
    location: "Dhaka / Sylhet, Bangladesh",
    phone: "01707961402",
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com",
    socialLinks: [],
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    linkedin: "",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setProfile((prev: any) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully. I will get back to you shortly.",
        });
        setFormData({
          name: "",
          email: "",
          address: "",
          linkedin: "",
          location: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again or email directly.",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const emailValue = profile.email || "saifulislam3412883@gmail.com";
  const locationValue = profile.location || "Dhaka / Sylhet, Bangladesh";
  const phoneValue = profile.phone;

  // Filter social links that have showInContact enabled and prevent duplicating Email / Phone
  const contactSocialLinks = (profile.socialLinks && profile.socialLinks.length > 0)
    ? profile.socialLinks.filter((l: any) => {
        if (l.showInContact === false) return false;
        const normPlat = (l.platform || "").toLowerCase();
        const normUrl = (l.url || "").toLowerCase();
        const normIcon = (l.iconName || "").toLowerCase();
        // Skip duplicate email card if email is already rendered above
        if (emailValue && (normPlat.includes("email") || normPlat.includes("mail") || normUrl.startsWith("mailto:") || normIcon.includes("mail"))) {
          return false;
        }
        // Skip duplicate phone card if phone is already rendered above
        if (phoneValue && (normPlat.includes("phone") || normPlat.includes("mobile") || normUrl.startsWith("tel:") || normIcon.includes("phone"))) {
          return false;
        }
        return true;
      })
    : (profile.linkedinUrl ? [{ platform: "LinkedIn", url: profile.linkedinUrl, iconName: "Linkedin", showInContact: true }] : []);

  return (
    <section id="contact" className="relative py-20 pb-28 sm:pb-20 scroll-mt-20 bg-slate-50 dark:bg-[#070612] text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-wider text-slate-900 dark:text-white uppercase">
            <Send className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900 dark:text-white" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-wider uppercase">
              CONTACT
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">
          
          {/* LEFT COLUMN: CONTACT CARDS & DETAILS */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c0d16] border border-slate-200 dark:border-zinc-800/80 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Contact Information</span>
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Email - Linkable */}
                {emailValue && (
                  <a 
                    href={`mailto:${emailValue}`}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-100/90 dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800/80 transition-all hover:border-[#5AB2FF]/60 hover:bg-sky-50/50 dark:hover:bg-zinc-900 shadow-sm group"
                  >
                    <div className="p-2.5 rounded-xl bg-sky-100 dark:bg-[#5AB2FF]/10 border border-sky-300 dark:border-[#5AB2FF]/40 text-sky-600 dark:text-[#5AB2FF] shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 uppercase font-semibold">Gmail / Email</div>
                      <div className="font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-sky-600 dark:group-hover:text-[#5AB2FF] transition-colors break-all flex items-center gap-1.5">
                        <span>{emailValue}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                    </div>
                  </a>
                )}

                {/* Location - Linkable to Google Maps */}
                {locationValue && (
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(locationValue)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-100/90 dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800/80 transition-all hover:border-purple-400/60 hover:bg-purple-50/50 dark:hover:bg-zinc-900 shadow-sm group"
                  >
                    <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-500/40 text-purple-600 dark:text-purple-400 shrink-0 group-hover:scale-110 transition-transform">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 uppercase font-semibold">Location</div>
                      <div className="font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex items-center gap-1.5">
                        <span>{locationValue}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                    </div>
                  </a>
                )}

                {/* Phone / Mobile if present */}
                {profile.phone && (
                  <a 
                    href={`tel:${profile.phone}`}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-100/90 dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800/80 transition-all hover:border-emerald-400/60 hover:bg-emerald-50/50 dark:hover:bg-zinc-900 shadow-sm group"
                  >
                    <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 uppercase font-semibold">Phone / Mobile</div>
                      <div className="font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                        <span>{profile.phone}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                    </div>
                  </a>
                )}

                {/* Dynamic Social Links configured to show in Contact */}
                {contactSocialLinks.map((link: any, idx: number) => {
                  const href = link.url.startsWith("http") || link.url.startsWith("mailto:") || link.url.startsWith("tel:")
                    ? link.url
                    : `https://${link.url}`;
                  return (
                    <a
                      key={link._id || idx}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-100/90 dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800/80 transition-all hover:border-[#5AB2FF]/60 hover:bg-sky-50/50 dark:hover:bg-zinc-900 shadow-sm group"
                    >
                      <div className="p-2.5 rounded-xl bg-sky-100 dark:bg-[#5AB2FF]/10 border border-sky-300 dark:border-[#5AB2FF]/40 text-sky-600 dark:text-[#5AB2FF] shrink-0 group-hover:scale-110 transition-transform">
                        <SocialIcon iconName={link.iconName} platform={link.platform} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 uppercase font-semibold">
                          {link.platform}
                        </div>
                        <div className="font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-sky-600 dark:group-hover:text-[#5AB2FF] transition-colors truncate flex items-center gap-1.5">
                          <span className="truncate">{link.url.replace(/^https?:\/\/(www\.)?/, "")}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </div>
                      </div>
                    </a>
                  );
                })}

              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: INTERACTIVE CONTACT FORM */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl p-[1.5px] overflow-hidden bg-slate-200/80 dark:bg-zinc-800/80 shadow-xl">
              
              <form 
                onSubmit={handleSubmit}
                className="relative rounded-[calc(1.5rem-1.5px)] bg-white dark:bg-[#0c0d16] p-6 sm:p-8 space-y-5"
              >
                
                {status && (
                  <div
                    className={`p-4 rounded-xl flex items-start gap-3 text-xs sm:text-sm font-medium ${
                      status.type === "success"
                        ? "bg-purple-50 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/60 text-purple-800 dark:text-purple-200"
                        : "bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-500/60 text-red-800 dark:text-red-200"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    )}
                    <span>{status.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-zinc-300">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#5AB2FF] focus:ring-1 focus:ring-[#5AB2FF] transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-zinc-300">Your Email / Gmail *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#5AB2FF] focus:ring-1 focus:ring-[#5AB2FF] transition-all"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-zinc-300">Company / Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Organization or Street Address"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#5AB2FF] focus:ring-1 focus:ring-[#5AB2FF] transition-all"
                    />
                  </div>

                  {/* LinkedIn Profile */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-zinc-300">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#5AB2FF] focus:ring-1 focus:ring-[#5AB2FF] transition-all"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-zinc-300">City / Country Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. New York, USA or London, UK"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#5AB2FF] focus:ring-1 focus:ring-[#5AB2FF] transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-zinc-300">Your Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your project details or inquiries here..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#5AB2FF] focus:ring-1 focus:ring-[#5AB2FF] transition-all resize-none"
                    />
                  </div>

                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white !text-white font-bold text-sm sm:text-base shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin !text-white text-white" />
                      <span className="!text-white text-white font-bold">Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 !text-white text-white" />
                      <span className="!text-white text-white font-bold">Transmit Message</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

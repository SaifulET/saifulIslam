"use client";

import React, { useState } from "react";
import { 
  Send, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Sparkles
} from "lucide-react";
import { LinkedinIcon } from "@/components/Icons";

export default function ContactSection() {
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
          message: "Message received successfully. Thank you for reaching out, I will get back to you shortly.",
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
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (err: any) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 pb-28 sm:pb-20 scroll-mt-20 bg-[#070612] text-white border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-wider text-white uppercase">
            <Send className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase">
              CONTACT
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">
          
          {/* LEFT COLUMN: CONTACT CARDS & DETAILS */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0d16] border border-zinc-800/80 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Contact Information</span>
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Email */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80">
                  <div className="p-2.5 rounded-xl bg-[#5AB2FF]/10 border border-[#5AB2FF]/40 text-[#5AB2FF] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-zinc-400 uppercase">Gmail / Email</div>
                    <a href="mailto:saifulislam3412883@gmail.com" className="font-semibold text-zinc-200 hover:text-[#5AB2FF] transition-colors">
                      saifulislam3412883@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80">
                  <div className="p-2.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-zinc-400 uppercase">Location</div>
                    <div className="font-semibold text-zinc-200">
                      Dhaka / Sylhet, Bangladesh
                    </div>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80">
                  <div className="p-2.5 rounded-xl bg-[#5AB2FF]/10 border border-[#5AB2FF]/40 text-[#5AB2FF] shrink-0">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-zinc-400 uppercase">LinkedIn</div>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-semibold text-zinc-200 hover:text-[#5AB2FF] transition-colors"
                    >
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>

              </div>

              {/* Status Pill */}
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5AB2FF] animate-pulse"></span>
                <span>Response Time: Typically within 24 hours</span>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: INTERACTIVE CONTACT FORM */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl p-[1.5px] overflow-hidden bg-gradient-to-tr from-purple-500/30 via-zinc-800/40 to-[#5AB2FF]/30 shadow-2xl">
              
              <form 
                onSubmit={handleSubmit}
                className="relative rounded-[calc(1.5rem-1.5px)] bg-[#0c0d16] p-6 sm:p-8 space-y-5"
              >
                
                {status && (
                  <div
                    className={`p-4 rounded-xl flex items-start gap-3 text-xs sm:text-sm font-medium ${
                      status.type === "success"
                        ? "bg-purple-950/80 border border-purple-500/60 text-purple-200"
                        : "bg-red-950/80 border border-red-500/60 text-red-200"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <span>{status.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-zinc-300">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#5AB2FF] focus:ring-1 focus:ring-[#5AB2FF] transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-zinc-300">Your Email / Gmail *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#5AB2FF] focus:ring-1 focus:ring-[#5AB2FF] transition-all"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-zinc-300">Company / Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Organization or Street Address"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#5AB2FF] focus:ring-1 focus:ring-[#5AB2FF] transition-all"
                    />
                  </div>

                  {/* LinkedIn Profile */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-zinc-300">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#5AB2FF] focus:ring-1 focus:ring-[#5AB2FF] transition-all"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-zinc-300">City / Country Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. New York, USA or London, UK"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#5AB2FF] focus:ring-1 focus:ring-[#5AB2FF] transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-mono font-bold text-zinc-300">Your Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your project details or inquiries here..."
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#5AB2FF] focus:ring-1 focus:ring-[#5AB2FF] transition-all resize-none"
                    />
                  </div>

                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-[#5AB2FF] hover:opacity-95 text-white font-bold text-sm shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
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

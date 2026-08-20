'use client';

import React, { useState } from 'react';
import {
  Mail,
  MessageSquare,
  Building2,
  CheckCircle2,
  AlertCircle,
  Send,
  HelpCircle,
  FileCheck,
  GraduationCap,
  RefreshCw
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all required fields (Name, Email, and Message).');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>Contact & Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Get in Touch with Nyayota
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Have feedback on our legal repository, identified a statutory amendment to be updated, or interested in academic collaboration? Send us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Message Received</h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to the Nyayota team. Our research coordinators will review your inquiry and follow up at <strong>{formData.email}</strong> if required.
                </p>
                <button
                  type="button"
                  id="contact-reset-btn"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', category: 'General Inquiry', subject: '', message: '' });
                  }}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Send an Inquiry</h2>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Ahmed"
                      className="w-full p-2.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@example.com"
                      className="w-full p-2.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-category" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Inquiry Department
                    </label>
                    <select
                      id="contact-category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 dark:text-zinc-100"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Statute Data Correction">Statute / Amendment Correction</option>
                      <option value="Academic Research Collaboration">Academic Research Collaboration</option>
                      <option value="Feature / Jurisdiction Request">Jurisdiction Expansion Request</option>
                      <option value="Accessibility Feedback">Accessibility Feedback</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Bangladesh Labour Act 2018 amendment update"
                      className="w-full p-2.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Message Details <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your query or statutory verification reference..."
                    className="w-full p-3 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-zinc-900 dark:text-zinc-100 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors shadow-md shadow-amber-500/20"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Channels & Future Support Infrastructure */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Direct Communication Channels</h3>
            
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-zinc-900 dark:text-white block">General Inquiries</strong>
                  <span className="font-mono text-zinc-500">contact@nyayota.org</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-zinc-900 dark:text-white block">Statutory Verification & Archives</strong>
                  <span className="font-mono text-zinc-500">research@nyayota.org</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-zinc-900 dark:text-white block">Academic Partnerships</strong>
                  <span className="font-mono text-zinc-500">partnerships@nyayota.org</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900 text-white border border-zinc-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Educational Notice</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Nyayota team members cannot provide individualized legal counsel, draft court pleadings for private lawsuits, or assess the merits of ongoing criminal or civil cases. Please consult a licensed attorney.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

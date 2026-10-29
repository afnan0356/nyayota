'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
  Building2,
  GraduationCap,
  FileCheck,
  Phone,
  Lock
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    subject: '',
    message: '',
    consent: false,
  });
  const [copied, setCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const OFFICIAL_EMAIL = 'nyayota.contact@gmail.com';

  const generateMailtoUrl = () => {
    const subjectLine = formData.subject.trim() || `[${formData.category}] Inquiry from ${formData.name.trim()}`;
    const emailBody = `Name: ${formData.name.trim()}
Email: ${formData.email.trim()}
Department: ${formData.category}

Message:
${formData.message.trim()}

---
Submitted via Nyayota Legal Platform`;
    return `mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(emailBody)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all required fields (Name, Email, and Message).');
      return;
    }
    if (!formData.consent) {
      setErrorMsg('Please confirm your consent to process this inquiry according to the Privacy Policy.');
      return;
    }
    setErrorMsg('');
    setIsSubmitted(true);

    // Open mail client directly with pre-composed query
    const mailtoUrl = generateMailtoUrl();
    window.location.href = mailtoUrl;
  };

  const handleCopyText = async () => {
    const fullText = `To: ${OFFICIAL_EMAIL}
Subject: ${formData.subject.trim() || `[${formData.category}] Inquiry from ${formData.name.trim()}`}
From: ${formData.name.trim()} (${formData.email.trim()})

${formData.message.trim()}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback if clipboard API blocked
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>Contact and Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Get in Touch with Nyayota
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Have feedback on our legal repository, identified a statutory amendment to be updated, or interested in academic collaboration? Direct inquiries to our official editorial desk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-7 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-5">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Inquiry Prepared for Dispatch</h2>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Your inquiry has been formatted for the Nyayota editorial team at <span className="font-mono text-zinc-900 dark:text-zinc-200 font-semibold">{OFFICIAL_EMAIL}</span>. If your mail client did not open automatically, you can send it directly or copy the formatted text below.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={generateMailtoUrl()}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Email App</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold text-xs flex items-center justify-center space-x-2 transition-colors border border-zinc-200 dark:border-zinc-700"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied to Clipboard' : 'Copy Formatted Text'}</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', category: 'General Inquiry', subject: '', message: '', consent: false });
                    }}
                    className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Send an Inquiry</h2>

                {errorMsg && (
                  <div role="alert" className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center space-x-2">
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
                      <option value="Statute Data Correction">Statute / Gazette Amendment Correction</option>
                      <option value="Accessibility Feedback">Accessibility &amp; Platform Feedback</option>
                      <option value="Academic Collaboration">Academic &amp; Research Collaboration</option>
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

                {/* Privacy Consent Checkbox */}
                <div className="flex items-start space-x-2 pt-1">
                  <input
                    id="contact-consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 text-amber-500 focus:ring-amber-400"
                  />
                  <label htmlFor="contact-consent" className="text-xs text-zinc-600 dark:text-zinc-400">
                    I agree that the details provided above will be transmitted to the Nyayota team to evaluate and respond to this inquiry in accordance with the{' '}
                    <Link href="/privacy" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">
                      Privacy Policy
                    </Link>.
                  </label>
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors shadow-md shadow-amber-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry to Official Desk</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Channels & Educational Notice */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Communication and Departmental Channels</h3>
            
            <div className="space-y-3 text-xs">
              {/* General Inquiries */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <strong className="text-zinc-900 dark:text-white block">Official Contact Desk</strong>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-semibold">
                      Monitored
                    </span>
                  </div>
                  <a
                    href={`mailto:${OFFICIAL_EMAIL}`}
                    className="font-mono text-zinc-600 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 hover:underline block text-xs"
                  >
                    {OFFICIAL_EMAIL}
                  </a>
                  <p className="text-[11px] text-zinc-500">Public inquiries, statutory corrections, and research communications.</p>
                </div>
              </div>

              {/* Academic Partnerships */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/80 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-500 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <strong className="text-zinc-900 dark:text-white block">Academic Partnerships</strong>
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    Law faculty, student researchers, and civic legal organizations may reach out directly via {OFFICIAL_EMAIL}.
                  </p>
                </div>
              </div>

              {/* Verification & Archive Requests */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/80 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-500 flex items-center justify-center shrink-0">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <strong className="text-zinc-900 dark:text-white block">Statute Verification Reports</strong>
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    If you detect a gazette amendment or section typo, cite the gazette number and section in your message for immediate verification.
                  </p>
                </div>
              </div>

              {/* Phone Support (Planned / Non-operational) */}
              <div
                id="contact-phone-support-card"
                className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/80 flex items-start space-x-3 opacity-80"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center space-x-2">
                    <strong className="text-zinc-700 dark:text-zinc-300 block">Phone Support</strong>
                    <span className="inline-flex items-center space-x-1 text-[9px] px-1.5 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold border border-zinc-300 dark:border-zinc-700">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Coming soon</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    Phone support is planned for a future update. No phone contact number is currently available.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 text-white border border-zinc-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Educational Notice</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Nyayota team members cannot provide individualized legal counsel, draft court pleadings for private lawsuits, or assess the merits of ongoing criminal or civil cases. Please consult a licensed advocate or call the national legal aid helpline (16430 in Bangladesh).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

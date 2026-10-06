import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Athlete',
    state: 'Tamil Nadu',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#070D1E] text-slate-100 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-20">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-sky-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Support & Federation Enquiries</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get in Touch
          </h1>

          <p className="text-base text-slate-400 leading-relaxed font-normal">
            Have questions about biometric video assessments, academy partnerships, or scout verification? Our team is here to assist.
          </p>
        </div>

        {/* Contact Form and Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          {/* Information Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-6">
              <h2 className="text-xl font-bold text-white">Direct Communication</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect with our technical assessment desk or state sports federation liaison officers.
              </p>

              <div className="space-y-4 pt-2 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">Email Inquiries</span>
                    <span className="text-slate-400">support@talent.udaan.in</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">Toll-Free Athlete Desk</span>
                    <span className="text-slate-400">1800-120-UDAAN (Mon-Sat, 9AM-6PM)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">Headquarters</span>
                    <span className="text-slate-400">National Sports Technology Center, New Delhi, India</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-6 text-xs text-slate-400 space-y-2">
              <span className="font-semibold text-white block">State Federation Partnerships</span>
              <p className="leading-relaxed">
                Registered sports academies and district associations can request bulk onboarding and trial integration.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Received</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. A coordinator from our team will respond to your registered email shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-750 transition"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1.5 font-medium">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/60 transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1.5 font-medium">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/60 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1.5 font-medium">I Am A</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500/60 transition"
                      >
                        <option value="Athlete">Athlete</option>
                        <option value="Coach / Trainer">Coach / Trainer</option>
                        <option value="Sports Academy">Sports Academy</option>
                        <option value="Federation Scout">Federation Scout</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1.5 font-medium">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we assist you?"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/60 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

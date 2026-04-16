'use client';

import { useState } from 'react';
import { Send, Mail, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to an API endpoint
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold mb-4 gradient-text">Contact Us</h1>
      <p className="text-lg text-[var(--text-secondary)] mb-12 max-w-2xl">
        Have questions, feedback, or suggestions? We&apos;d love to hear from you. Reach out through the form below or join our community channels.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="card p-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Mail size={20} className="text-[var(--accent)]" />
            Send a Message
          </h2>

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4">
                <Send size={24} className="text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-green-400 mb-2">Message Sent!</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Thank you for reaching out. We&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button type="submit" className="btn-gradient w-full flex items-center justify-center gap-2">
                <Send size={16} />
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Community Channels */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <MessageSquare size={18} className="text-[var(--accent)]" />
              Community Channels
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Join our community for real-time support and discussions.
            </p>
            <div className="space-y-3">
              <a
                href="https://t.me/arcadecalc01"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#0088cc]/10 border border-[#0088cc]/20 hover:border-[#0088cc]/40 transition-colors"
              >
                <Send size={18} className="text-[#0088cc]" />
                <div>
                  <div className="text-sm font-semibold">Telegram Community</div>
                  <div className="text-xs text-[var(--text-muted)]">5,000+ members</div>
                </div>
              </a>
              <a
                href="https://chat.whatsapp.com/Br4pRBxixgD3BL5f8jb2aI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 hover:border-[#25D366]/40 transition-colors"
              >
                <MessageSquare size={18} className="text-[#25D366]" />
                <div>
                  <div className="text-sm font-semibold">WhatsApp Group</div>
                  <div className="text-xs text-[var(--text-muted)]">Active discussions</div>
                </div>
              </a>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-bold mb-2">Response Time</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              We typically respond within 24-48 hours. For urgent queries, please use our Telegram community for faster support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

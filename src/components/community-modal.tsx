'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';
import { useProfileStore } from '@/store/profile-store';

export default function CommunityModal() {
  const show = useProfileStore((s) => s.showCommunityModal);
  const setShow = useProfileStore((s) => s.setShowCommunityModal);

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => setShow(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-2xl"
          >
            <div className="card p-0 overflow-hidden">
              {/* Close button */}
              <button
                onClick={() => setShow(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-(--bg-card) border border-(--border-color) text-(--text-secondary) hover:text-(--text-primary) z-10"
              >
                <X size={16} />
              </button>

              <div className="grid md:grid-cols-2">
                {/* ── Left: Join Community ── */}
                <div className="p-8 border-b md:border-b-0 md:border-r border-(--border-color)">
                  <h3 className="text-xl font-bold mb-2">Join our community</h3>
                  <p className="text-sm text-(--text-secondary) mb-2">
                    Connect with over <span className="font-bold text-(--text-primary)">5k</span> members.
                  </p>
                  <ul className="text-sm text-(--text-secondary) space-y-2 mb-6">
                    <li>🤝 Peer guidance</li>
                    <li>📈 Real-time updates</li>
                  </ul>

                  <div className="space-y-3">
                    <a
                      href="https://t.me/arcadecalc01"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0088cc] text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                      <Send size={18} />
                      Telegram
                    </a>
                    <a
                      href="https://chat.whatsapp.com/Br4pRBxixgD3BL5f8jb2aI"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                      <MessageCircle size={18} />
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* ── Right: Feedback ── */}
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-2">Help Us Improve</h3>
                  <p className="text-sm text-(--text-secondary) mb-6">
                    Your feedback shapes our future. Share suggestion, bugs, and experience via our Google Form.
                  </p>
                  <a
                    href="https://forms.gle/example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gradient flex items-center justify-center gap-2 w-full text-center"
                  >
                    🔥 Share your feedback!
                    <br />
                    <span className="text-xs opacity-80">(Opens Google Form)</span>
                  </a>

                  <div className="mt-6 pt-6 border-t border-(--border-color)">
                    <p className="text-sm font-semibold text-(--text-primary) mb-1">
                      Don&apos;t forget the official registration form.
                    </p>
                    <p className="text-xs text-(--text-secondary) mb-4">
                      It&apos;s compulsory, or you won&apos;t be eligible for swags.
                    </p>
                    <div className="flex gap-3">
                      <a
                        href="https://forms.gle/2h6xCvY3sW29pw4p7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 rounded-xl bg-(--bg-card) border border-(--border-color) text-sm font-medium text-center hover:border-(--accent) transition-colors"
                      >
                        Arcade Registration Form
                      </a>
                      <button
                        onClick={() => setShow(false)}
                        className="flex-1 py-2.5 rounded-xl bg-(--bg-card) border border-(--border-color) text-sm font-medium text-center hover:border-(--accent) transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

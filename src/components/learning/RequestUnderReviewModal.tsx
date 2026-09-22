import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  ShieldAlert,
  CheckCircle2,
  Mail,
  ArrowRight,
  X,
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';

interface RequestUnderReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
  displayName?: string;
  requestedPathway?: string;
}

export const RequestUnderReviewModal: React.FC<RequestUnderReviewModalProps> = ({
  isOpen,
  onClose,
  email,
  displayName,
  requestedPathway = 'Structural MRI Analysis',
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-stone-900 text-stone-100 rounded-3xl shadow-2xl overflow-hidden border border-amber-500/30"
        >
          {/* Top glowing accent banner */}
          <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 px-6 py-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-amber-200/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-1.5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Fellowship Admission Status</span>
            </div>
            <h3 className="text-xl font-extrabold text-amber-50">Application Under Review</h3>
            <p className="text-amber-200/80 text-xs mt-1">
              African Brain Data Network · Global Neuroscience Fellowship
            </p>
          </div>

          <div className="p-6 sm:p-7 space-y-6">
            {/* Status Callout Card */}
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                  <Clock className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-200">
                    Cohort Admission Request Pending
                  </h4>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                    Hello <strong className="text-white">{displayName || 'Fellow'}</strong>, your request to join the{' '}
                    <strong className="text-amber-300">{requestedPathway}</strong> track has been submitted and is currently being reviewed by the ABDN Academic Superadmin team.
                  </p>
                </div>
              </div>

              {email && (
                <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-xs text-stone-400">
                  <span>Registered Account:</span>
                  <span className="font-mono text-amber-300 font-semibold">{email}</span>
                </div>
              )}
            </div>

            {/* Explanatory Steps */}
            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Request Dispatched:</strong> An admission notification has been forwarded directly to the ABDN Administrative Command Center.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Roster Verification:</strong> To maintain academic standards, access to live lectures, datasets, and compute environments requires Superadmin roster whitelisting.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Instant Access Upon Approval:</strong> Once approved, you will simply sign in with this email and be automatically routed to your dedicated curriculum.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 border-t border-stone-800">
              <a
                href={`mailto:africanbraindatanetwork@gmail.com?subject=ABDN Fellowship Admission Follow-up (${encodeURIComponent(
                  email || ''
                )})`}
                className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl border border-stone-700 bg-stone-800/80 hover:bg-stone-800 text-stone-200 hover:text-white font-medium text-xs transition flex items-center justify-center space-x-2"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Contact Academic Board</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Understood</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

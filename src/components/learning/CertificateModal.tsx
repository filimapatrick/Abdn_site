import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Download, Share2, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  recipientName?: string;
  issueDate?: string;
  skills?: string[];
  certId?: string;
}

export default function CertificateModal({
  isOpen,
  onClose,
  title = 'MRI Foundations & Morphometry',
  recipientName = 'Patrick Filima',
  issueDate = 'August 2026',
  skills = ['T1w Preprocessing', 'FreeSurfer Cortical Reconstruction', 'VBM Analysis', 'BIDS Standards'],
  certId = 'ABDN-CERT-2026-MRI-8842',
}: CertificateModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-amber-200 my-8"
        >
          {/* Top action bar */}
          <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Verified Credential · ABDN NeuroLearning
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Certificate Frame */}
          <div className="p-8 sm:p-10 bg-gradient-to-b from-amber-50/40 via-white to-stone-50 text-stone-900 border-8 border-stone-100 relative space-y-6">
            
            {/* Watermark / Seal */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-amber-600/10 border-2 border-amber-600/30 text-amber-800 flex items-center justify-center mx-auto shadow-inner font-extrabold text-lg">
                ABDN
              </div>
              <div className="text-xs uppercase tracking-widest text-amber-800 font-extrabold">
                African Brain Data Network · NeuroLearning
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight pt-1">
                Certificate of Demonstrated Competency
              </h2>
            </div>

            <div className="text-center space-y-1">
              <p className="text-xs text-stone-500 uppercase tracking-wider">This certifies that</p>
              <h3 className="text-xl sm:text-2xl font-bold text-amber-900 border-b border-amber-200 pb-2 inline-block px-8">
                {recipientName}
              </h3>
            </div>

            <div className="text-center text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
              has successfully completed all computational labs, automated assessment checkpoints, and research capstone milestones for
              <div className="font-extrabold text-stone-900 text-base sm:text-lg mt-1 text-amber-800">
                {title}
              </div>
            </div>

            {/* Verified Skills Tags */}
            <div className="pt-2">
              <div className="text-[11px] font-mono text-center text-stone-400 uppercase tracking-wider mb-2">
                Demonstrated Methodological Competencies
              </div>
              <div className="flex flex-wrap justify-center gap-1.5">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-amber-100/70 border border-amber-200 text-amber-900 text-[11px] font-medium"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Signatures & Verification Hash */}
            <div className="pt-6 border-t border-stone-200 grid grid-cols-2 gap-4 text-xs items-end">
              <div>
                <div className="font-mono text-[10px] text-stone-400 uppercase">Verification ID</div>
                <div className="font-mono font-bold text-stone-800 text-[11px]">{certId}</div>
                <div className="text-[10px] text-emerald-700 flex items-center space-x-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Digitally Signed & Validated</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] text-stone-400 uppercase">Issued On</div>
                <div className="font-semibold text-stone-800">{issueDate}</div>
                <div className="text-[10px] text-stone-500">ABDN Academic Committee</div>
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="p-4 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <span className="text-xs text-stone-500">
              Shareable verified URL: <code>abdn.org/verify/{certId}</code>
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.print()}
                className="py-2 px-4 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => alert('Certificate verification link copied to clipboard!')}
                className="py-2 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Credential</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Brain,
} from 'lucide-react';
import {
  signInWithGoogle,
  ElearningUser,
} from '../../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signup' | 'signin';
  defaultPathway?: string | null;
  onAuthSuccess?: (userProfile: ElearningUser) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = 'signup',
  defaultPathway = null,
  onAuthSuccess,
}: AuthModalProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successUser, setSuccessUser] = useState<ElearningUser | null>(null);

  // Sync mode when modal opens
  React.useEffect(() => {
    setError(null);
    setSuccessUser(null);
    setLoading(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setError(null);
    setLoading(true);

    try {
      const { profile } = await signInWithGoogle(defaultPathway, 'researcher');
      setSuccessUser(profile);
      if (onAuthSuccess) onAuthSuccess(profile);
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      if (err?.code === 'auth/popup-closed-by-user') {
        setError('Google sign-in window was closed before completing. Please try again.');
      } else if (err?.code === 'auth/popup-blocked') {
        setError('Popup blocked by browser. Please enable popups and try again.');
      } else {
        setError(err?.message || 'Failed to sign in with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-amber-800 via-amber-900 to-stone-900 px-6 py-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Brain className="w-4 h-4" />
              <span>ABDN Single Sign-On</span>
            </div>
            <h3 className="text-xl font-bold">Welcome to ABDN E-learning</h3>
            <p className="text-stone-300 text-xs mt-1">
              African Brain Data Network · Global Neuroscience Academy
            </p>
          </div>

          <div className="p-6">
            {successUser ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-stone-900">
                  Welcome, {successUser.displayName || 'Learner'}!
                </h4>
                <p className="text-xs text-stone-600">
                  Your account is synchronized. Redirecting to your learning workspace...
                </p>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium text-sm transition-colors"
                >
                  Continue to Learning
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-stone-800">
                    Sign in or create your learner account with 1-click Google Single Sign-On.
                  </p>
                  {defaultPathway && (
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs text-amber-800">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Enrolling in: <strong>{defaultPathway}</strong></span>
                    </div>
                  )}
                </div>

                {/* Google Sign In Button */}
                <button
                  onClick={handleGoogleAuth}
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center space-x-3 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
                      <span>Connecting to Google...</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-stone-500 text-center leading-relaxed">
                  By signing in, your learner profile will automatically sync across the ABDN network according to ABDN's{' '}
                  <a href="/about" className="text-amber-700 hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/cookie-policy" className="text-amber-700 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>

                <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-center space-x-1.5 text-[11px] text-stone-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Secured by Google Identity & Firebase</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

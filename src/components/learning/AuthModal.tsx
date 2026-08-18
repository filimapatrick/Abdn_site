import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Check,
} from 'lucide-react';
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  sendPasswordReset,
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
  const [mode, setMode] = useState<'signup' | 'signin' | 'forgot'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('researcher');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);
  const [successUser, setSuccessUser] = useState<ElearningUser | null>(null);

  // Sync mode when initialMode changes or modal opens
  React.useEffect(() => {
    setMode(initialMode);
    setError(null);
    setResetSuccessMessage(null);
    setSuccessUser(null);
    setLoading(false);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const getFirebaseErrorMessage = (err: any): string => {
    const code = err?.code || '';
    switch (code) {
      case 'auth/email-already-in-use':
        return 'An account already exists with this email address. Please sign in instead.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please verify and try again.';
      case 'auth/popup-closed-by-user':
        return 'Google sign-in was closed before completing. Please try again.';
      case 'auth/popup-blocked':
        return 'Popup blocked by browser. Please enable popups or try email login.';
      case 'auth/network-request-failed':
        return 'Network connection error. Please check your internet connection.';
      default:
        return err?.message || 'An unexpected error occurred. Please try again.';
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { profile } = await signUpWithEmail(
          email.trim(),
          password,
          name.trim(),
          role,
          defaultPathway
        );
        setSuccessUser(profile);
        if (onAuthSuccess) onAuthSuccess(profile);
      } else if (mode === 'signin') {
        const { profile } = await signInWithEmail(email.trim(), password);
        setSuccessUser(profile);
        if (onAuthSuccess) onAuthSuccess(profile);
      }
    } catch (err: any) {
      console.error('Email Auth Error:', err);
      setError(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setLoading(true);

    try {
      const { profile } = await signInWithGoogle(defaultPathway, role);
      setSuccessUser(profile);
      if (onAuthSuccess) onAuthSuccess(profile);
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setError(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your registered email address.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await sendPasswordReset(email.trim());
      setResetSuccessMessage(`Password reset link dispatched to ${email.trim()}. Please check your inbox.`);
    } catch (err: any) {
      console.error('Password Reset Error:', err);
      setError(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = () => {
    const shouldOnboard = mode === 'signup' || !successUser?.onboardingCompleted;
    handleResetAndClose();
    if (shouldOnboard) {
      navigate('/learning/onboarding');
    } else {
      navigate('/learning/dashboard');
    }
  };

  const handleResetAndClose = () => {
    setSuccessUser(null);
    setError(null);
    setResetSuccessMessage(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 bg-stone-900/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-amber-100 my-8"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 text-white p-6 sm:p-8">
            <button
              onClick={handleResetAndClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>ABDN NeuroLearning</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {mode === 'signup' && 'Join ABDN NeuroLearning'}
              {mode === 'signin' && 'Welcome back'}
              {mode === 'forgot' && 'Reset Your Password'}
            </h2>
            <p className="text-amber-200/90 text-sm mt-1.5 leading-relaxed">
              {mode === 'signup' &&
                'Create your account to access structured brain-data learning pathways, datasets, and progress tracking.'}
              {mode === 'signin' &&
                'Continue your personalized learning pathways, research projects, and certifications.'}
              {mode === 'forgot' &&
                'Enter your registered email and we’ll send you instructions to reset your password.'}
            </p>

            {defaultPathway && mode === 'signup' && (
              <div className="mt-3 p-2.5 rounded-xl bg-amber-700/40 border border-amber-400/30 flex items-center space-x-2 text-xs text-amber-100">
                <span className="font-semibold">Selected Path:</span>
                <span className="bg-amber-500/30 px-2 py-0.5 rounded-md font-medium text-amber-100">
                  {defaultPathway}
                </span>
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8">
            {successUser ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900">
                    {mode === 'signup' ? 'Account Created!' : 'Welcome Back!'}
                  </h3>
                  <p className="text-sm font-semibold text-amber-800 mt-1">
                    {successUser.displayName || successUser.email}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-stone-700 text-left space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Track / Role:</span>
                    <span className="font-semibold text-amber-900 uppercase">
                      {successUser.role || 'Researcher'}
                    </span>
                  </div>
                  {successUser.selectedPathway && (
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Active Path:</span>
                      <span className="font-semibold text-stone-900">
                        {successUser.selectedPathway}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">E-Learning Status:</span>
                    <span className="font-semibold text-emerald-700 flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Synchronized in ABDN Hub</span>
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleProceed}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm shadow-md shadow-amber-600/20 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>
                      {mode === 'signup' || !successUser?.onboardingCompleted
                        ? 'Personalize My Learning Plan →'
                        : 'Proceed to My Learning Dashboard →'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div>
                {/* Error Banner */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start space-x-2.5 text-xs text-rose-800"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Reset Link Success Message */}
                {resetSuccessMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start space-x-2.5 text-xs text-emerald-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{resetSuccessMessage}</span>
                  </motion.div>
                )}

                {mode !== 'forgot' && (
                  <>
                    {/* Google OAuth Button */}
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleGoogleAuth}
                      className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl border border-stone-200 hover:border-amber-400 bg-stone-50/50 hover:bg-amber-50/30 text-stone-700 font-medium transition-all shadow-sm group disabled:opacity-60"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
                      ) : (
                        <svg className="w-5 h-5 group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
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
                      )}
                      <span>
                        {mode === 'signup' ? 'Continue with Google' : 'Sign in with Google'}
                      </span>
                    </button>

                    {/* Divider */}
                    <div className="relative my-5 flex items-center justify-center">
                      <div className="border-t border-stone-200 w-full" />
                      <span className="bg-white px-3 text-xs uppercase font-medium text-stone-400">
                        OR
                      </span>
                    </div>
                  </>
                )}

                {/* Email Form */}
                {mode === 'forgot' ? (
                  <form onSubmit={handlePasswordReset} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Registered Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@institution.org"
                          className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium shadow-md shadow-amber-700/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-60"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                      ) : (
                        <span>Send Password Reset Link</span>
                      )}
                    </button>

                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setMode('signin');
                          setError(null);
                          setResetSuccessMessage(null);
                        }}
                        className="text-xs text-amber-700 font-semibold hover:text-amber-900"
                      >
                        Back to Sign In
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleEmailAuth} className="space-y-4">
                    {mode === 'signup' && (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                            Full Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="e.g. Dr. Amina Bello"
                              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                            Primary Role / Track
                          </label>
                          <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                          >
                            <option value="researcher">Researcher / Postdoc</option>
                            <option value="student">Student (Undergrad / Masters / PhD)</option>
                            <option value="data_scientist">Data Scientist / Bioinformatician</option>
                            <option value="faculty">Faculty / Educator / Mentor</option>
                            <option value="clinician">Neurologist / Clinician</option>
                          </select>
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                        Email address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@institution.org"
                          className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                          Password
                        </label>
                        {mode === 'signin' && (
                          <button
                            type="button"
                            onClick={() => {
                              setMode('forgot');
                              setError(null);
                            }}
                            className="text-xs text-amber-700 hover:text-amber-900 font-medium transition-colors"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium shadow-md shadow-amber-700/20 hover:shadow-lg transition-all flex items-center justify-center space-x-2 group disabled:opacity-60"
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                        ) : (
                          <>
                            <span>{mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* Footer terms / mode switch */}
                {mode === 'signup' && (
                  <p className="text-[11px] text-stone-500 text-center mt-4 leading-relaxed">
                    By creating an account, you agree to ABDN's{' '}
                    <a href="/about" className="text-amber-700 hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/cookie-policy" className="text-amber-700 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                )}

                {mode !== 'forgot' && (
                  <div className="mt-5 pt-4 border-t border-stone-100 text-center">
                    {mode === 'signup' ? (
                      <p className="text-xs text-stone-600">
                        Already have an account?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setMode('signin');
                            setError(null);
                          }}
                          className="text-amber-700 font-semibold hover:text-amber-900 transition-colors"
                        >
                          Sign In
                        </button>
                      </p>
                    ) : (
                      <p className="text-xs text-stone-600">
                        Don't have an account?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setMode('signup');
                            setError(null);
                          }}
                          className="text-amber-700 font-semibold hover:text-amber-900 transition-colors"
                        >
                          Create one for free
                        </button>
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-3 flex items-center justify-center space-x-1.5 text-[11px] text-stone-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Secured by Firebase · FAIR Brain Data Architecture</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

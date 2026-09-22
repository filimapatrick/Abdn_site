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
  Clock,
  Mail,
  ArrowRight,
  ShieldAlert,
  Globe,
  Building2,
  UserCheck,
  Check
} from 'lucide-react';
import {
  signInWithGoogle,
  submitCohortJoinRequest,
  ElearningUser,
} from '../../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signup' | 'signin';
  defaultPathway?: string | null;
  onAuthSuccess?: (userProfile: ElearningUser) => void;
}

const COUNTRY_OPTIONS = [
  'Nigeria',
  'Ghana',
  'South Africa',
  'Kenya',
  'Egypt',
  'Uganda',
  'Ethiopia',
  'Rwanda',
  'Cameroon',
  'Tanzania',
  'Zimbabwe',
  'Senegal',
  'Zambia',
  'Morocco',
  'Tunisia',
  'Algeria',
  'Sudan',
  'Benin',
  'Ivory Coast',
  'Malawi',
  'Botswana',
  'Namibia',
  'Burkina Faso',
  'United Kingdom',
  'United States',
  'Canada',
  'Germany',
  'France',
  'Other / International'
];

const GENDER_OPTIONS = [
  'Female',
  'Male',
  'Non-binary',
  'Prefer not to say'
];

const COHORT_TRACK_OPTIONS = [
  'Structural MRI Analysis',
  'EEG Data Science',
  'fNIRS Optical Neuroimaging',
  'Electrophysiological Dynamics'
];

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = 'signup',
  defaultPathway = null,
  onAuthSuccess,
}: AuthModalProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submittingDetails, setSubmittingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successUser, setSuccessUser] = useState<ElearningUser | null>(null);

  // Step state: 'auth' | 'details' | 'under_review'
  const [currentStep, setCurrentStep] = useState<'auth' | 'details' | 'under_review'>('auth');

  // Candidate application fields
  const [applicantEmail, setApplicantEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('Female');
  const [country, setCountry] = useState('Nigeria');
  const [institution, setInstitution] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<string>(
    defaultPathway || 'Structural MRI Analysis'
  );

  // Sync state when modal opens or defaultPathway changes
  React.useEffect(() => {
    setError(null);
    setSuccessUser(null);
    setCurrentStep('auth');
    setLoading(false);
    setSubmittingDetails(false);
    if (defaultPathway) {
      setSelectedTrack(defaultPathway);
    }
  }, [isOpen, defaultPathway]);

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setError(null);
    setLoading(true);

    try {
      const result = await signInWithGoogle(selectedTrack, 'fellow');
      if (result.profile) {
        setSuccessUser(result.profile);
        if (onAuthSuccess) onAuthSuccess(result.profile);
      } else if (result.needsProfileDetails && result.pendingEmail) {
        // Prompt for gender and country before submitting application
        setApplicantEmail(result.pendingEmail);
        setFullName(result.pendingDisplayName || '');
        if (result.requestedPathway) {
          setSelectedTrack(result.requestedPathway);
        }
        setCurrentStep('details');
      } else if (result.isUnderReview) {
        setApplicantEmail(result.pendingEmail || 'your Google account');
        setCurrentStep('under_review');
      }
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      if (err?.code === 'auth/popup-closed-by-user') {
        setError('Google sign-in window was closed before completing. Please try again.');
      } else if (err?.code === 'auth/popup-blocked') {
        setError('Popup blocked by browser. Please enable popups and try again.');
      } else if (err?.code === 'auth/cancelled-popup-request') {
        // Ignored
      } else {
        setError(err?.message || 'Failed to authenticate with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantEmail) return;
    setError(null);
    setSubmittingDetails(true);

    try {
      await submitCohortJoinRequest({
        email: applicantEmail,
        displayName: fullName,
        gender,
        country,
        institution,
        requestedPathway: selectedTrack,
      });

      setCurrentStep('under_review');
    } catch (err: any) {
      console.error('Submit Join Request Error:', err);
      setError(err?.message || 'Could not submit application. Please try again.');
    } finally {
      setSubmittingDetails(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto"
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
              <span>ABDN Fellowship Portal</span>
            </div>
            <h3 className="text-xl font-bold">
              {currentStep === 'under_review'
                ? 'Application Under Review'
                : currentStep === 'details'
                ? 'Complete Fellowship Profile'
                : 'Welcome to ABDN E-learning'}
            </h3>
            <p className="text-stone-300 text-xs mt-1">
              African Brain Data Network · Global Neuroscience Academy
            </p>
          </div>

          <div className="p-6">
            {/* STEP 1: INITIAL GOOGLE SIGN IN */}
            {currentStep === 'auth' && !successUser && (
              <div className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-stone-800">
                    Sign in with Google to enter your ABDN Fellowship workspace.
                  </p>
                  {selectedTrack && (
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs text-amber-800">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Cohort Track: <strong>{selectedTrack}</strong></span>
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
                  Only whitelisted participants, instructors, and faculty can authenticate into the live e-learning portal.
                </p>

                <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-center space-x-1.5 text-[11px] text-stone-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Secured by Google Identity & Firebase</span>
                </div>
              </div>
            )}

            {/* STEP 2: PROFILE DETAILS FORM (GENDER, COUNTRY, INSTITUTION) */}
            {currentStep === 'details' && !successUser && (
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-950 flex items-start space-x-2.5">
                  <UserCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">New Candidate Admission:</span> Please provide your country and academic details to complete your fellowship roster profile.
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Email Address (Read-only verified Google ID) */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Google Verified Email</label>
                  <input
                    type="email"
                    value={applicantEmail}
                    disabled
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-600 text-xs font-mono select-none"
                  />
                </div>

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Jane Doe"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-stone-900 text-xs focus:ring-1 focus:ring-amber-700 focus:border-amber-700"
                  />
                </div>

                {/* Gender Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">Gender *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {GENDER_OPTIONS.map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => setGender(g)}
                        className={`py-2 px-2 text-center rounded-xl text-xs font-semibold border transition-all ${
                          gender === g
                            ? 'bg-amber-800 border-amber-800 text-white shadow-sm'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Country Dropdown */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 flex items-center space-x-1">
                    <Globe className="w-3.5 h-3.5 text-amber-700" />
                    <span>Country of Residence *</span>
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-stone-900 text-xs bg-white focus:ring-1 focus:ring-amber-700 focus:border-amber-700"
                  >
                    {COUNTRY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Institution */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700 flex items-center space-x-1">
                    <Building2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>University / Institution *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. University of Port Harcourt / KNUST"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-stone-900 text-xs focus:ring-1 focus:ring-amber-700 focus:border-amber-700"
                  />
                </div>

                {/* Selected Modality Track */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Requested Fellowship Track</label>
                  <select
                    value={selectedTrack}
                    onChange={(e) => setSelectedTrack(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/50 text-amber-950 font-bold text-xs focus:ring-1 focus:ring-amber-700 focus:border-amber-700"
                  >
                    {COHORT_TRACK_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submittingDetails}
                    className="w-full py-3 px-4 rounded-xl bg-amber-800 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-2 disabled:opacity-60"
                  >
                    {submittingDetails ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </div>
                    ) : (
                      <>
                        <span>Submit Application for Review</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: APPLICATION UNDER REVIEW CONFIRMATION */}
            {currentStep === 'under_review' && (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0">
                      <Clock className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-amber-950">
                        Cohort Request Received & Under Review
                      </h4>
                      <p className="text-xs text-amber-900/80 mt-1 leading-relaxed">
                        Hello <strong className="text-amber-950">{fullName || 'Fellow'}</strong>, your request to enroll in{' '}
                        <strong className="text-amber-950 font-bold">
                          {selectedTrack || 'the 2026 Fellowship Cohort'}
                        </strong>{' '}
                        has been submitted to the ABDN Academic Superadmin team.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-amber-200/80 grid grid-cols-2 gap-2 text-[11px] text-amber-900">
                    <div>
                      <span className="text-amber-800/80">Applicant:</span>{' '}
                      <span className="font-bold text-amber-950">{applicantEmail}</span>
                    </div>
                    <div>
                      <span className="text-amber-800/80">Country:</span>{' '}
                      <span className="font-bold text-amber-950">{country}</span>
                    </div>
                    <div>
                      <span className="text-amber-800/80">Gender:</span>{' '}
                      <span className="font-bold text-amber-950">{gender}</span>
                    </div>
                    <div>
                      <span className="text-amber-800/80">Track:</span>{' '}
                      <span className="font-bold text-amber-950">{selectedTrack}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-stone-600">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      An announcement with your country and academic track was dispatched to the Superadmin Dashboard.
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      Once approved by the Academic Committee, simply sign in with this Google account to access your live coursework.
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center space-x-3">
                  <a
                    href={`mailto:africanbraindatanetwork@gmail.com?subject=ABDN Fellowship Admission Request (${encodeURIComponent(
                      applicantEmail
                    )})`}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 font-medium text-xs text-center flex items-center justify-center space-x-1.5 transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-700" />
                    <span>Contact Team</span>
                  </a>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-amber-800 hover:bg-amber-700 text-white font-bold text-xs text-center transition shadow-sm"
                  >
                    Understood
                  </button>
                </div>
              </div>
            )}

            {/* SUCCESS USER VIEW */}
            {successUser && (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-stone-900">
                  Welcome, {successUser.displayName || 'Fellow'}!
                </h4>
                <p className="text-xs text-stone-600">
                  Your account is synchronized with your assigned cohort:{' '}
                  <strong className="text-amber-900">{successUser.selectedPathway}</strong>.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/learning/dashboard');
                  }}
                  className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold text-sm transition-colors shadow-md"
                >
                  Enter Cohort Workspace →
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

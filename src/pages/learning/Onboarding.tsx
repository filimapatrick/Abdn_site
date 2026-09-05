import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Layers,
  GraduationCap,
  Microscope,
  Award,
  ChevronRight,
  Check,
  Compass,
  User,
  ShieldCheck,
} from 'lucide-react';
import SEO from '../../components/SEO';
import { useAuth } from '../../context/AuthContext';
import { saveUserOnboarding } from '../../services/authService';
import { recordEngagementEvent } from '../../services/elearningMetricsService';
import { isSuperadminEmail } from '../../config/approvedEmails';

export default function Onboarding() {
  const { currentUser, userProfile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const isSuperAdmin = isSuperadminEmail(currentUser?.email) || userProfile?.role === 'superadmin';

  React.useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/network/learning', { replace: true });
    }
  }, [loading, currentUser, navigate]);

  // Selected modalities (1 track for fellows, multi-select for superadmin)
  const [selectedModalities, setSelectedModalities] = useState<string[]>([
    'Structural MRI Analysis',
  ]);

  // "Not sure yet" state
  const [isUndecided, setIsUndecided] = useState(false);

  // Experience level state
  const [experienceLevel, setExperienceLevel] = useState<string>('beginner');

  // Goals state (multi-select)
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    'Learn neuroscience fundamentals',
    'Analyze brain data',
    'Develop data-science skills',
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayName =
    userProfile?.displayName ||
    currentUser?.displayName ||
    currentUser?.email?.split('@')[0] ||
    'Learner';

  const modalityOptions = [
    {
      id: 'mri',
      name: 'Structural MRI Analysis',
      shortName: 'MRI',
      tagline: 'Magnetic Resonance Imaging',
      desc: 'Structural T1w/T2w scans, voxel-based morphometry, tissue segmentation & FreeSurfer.',
      icon: '🧠',
    },
    {
      id: 'eeg',
      name: 'EEG Data Science',
      shortName: 'EEG',
      tagline: 'Electroencephalography',
      desc: 'Microvolt scalp time-series, ICA artifact removal, time-frequency wavelets & ERPs.',
      icon: '⚡',
    },
    {
      id: 'electrophysiology',
      name: 'Electrophysiological Dynamics',
      shortName: 'Electrophysiology',
      tagline: 'Cellular & Circuit Neurophysiology',
      desc: 'Microelectrode silicon probes, Kilosort spike sorting, LFPs & action potential dynamics.',
      icon: '📈',
    },
    {
      id: 'fnirs',
      name: 'fNIRS Optical Neuroimaging',
      shortName: 'fNIRS',
      tagline: 'Functional Near-Infrared Spectroscopy',
      desc: 'Wearable optical neuroimaging, Modified Beer-Lambert Law & scalp hemodynamics.',
      icon: '🔴',
    },
    {
      id: 'fmri',
      name: 'Functional MRI (fMRI) Analysis',
      shortName: 'fMRI',
      tagline: 'Functional Magnetic Resonance Imaging',
      desc: 'BOLD hemodynamics, fMRIPrep automated workflows, task GLM & resting-state connectomes.',
      icon: '🧠',
    },
  ];

  const experienceOptions = [
    { id: 'beginner', title: 'Beginner', desc: 'No prior neuroimaging or brain-data coding experience.' },
    { id: 'some_experience', title: 'Some experience', desc: 'Familiar with basic neuroscience concepts or general Python.' },
    { id: 'intermediate', title: 'Intermediate', desc: 'Have processed raw neuroimaging data or used tools like SPM/MNE.' },
    { id: 'advanced', title: 'Advanced', desc: 'Experienced computational researcher looking to specialize or adopt FAIR pipelines.' },
  ];

  const goalOptions = [
    'Learn neuroscience fundamentals',
    'Analyze brain data',
    'Support my research',
    'Develop data-science skills',
    'Prepare for a fellowship',
    'Work on research projects',
  ];

  const toggleModality = (name: string) => {
    setIsUndecided(false);
    if (!isSuperAdmin) {
      // Non-superadmin fellows can only enroll in 1 cohort track
      setSelectedModalities([name]);
    } else {
      if (selectedModalities.includes(name)) {
        if (selectedModalities.length > 1) {
          setSelectedModalities(selectedModalities.filter((m) => m !== name));
        }
      } else {
        setSelectedModalities([...selectedModalities, name]);
      }
    }
  };

  const handleSelectUndecided = () => {
    setIsUndecided(true);
    setSelectedModalities(['Brain Data Science Foundations']);
  };

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      if (selectedGoals.length > 1) {
        setSelectedGoals(selectedGoals.filter((g) => g !== goal));
      }
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (currentUser) {
        await saveUserOnboarding(currentUser.uid, {
          selectedModalities: isUndecided ? ['Brain Data Science Foundations'] : selectedModalities,
          experienceLevel,
          learningGoals: selectedGoals,
        });
        
        // Telemetry: Record onboarding_complete event
        recordEngagementEvent({
          type: 'onboarding_complete',
          userId: currentUser.uid,
          userEmail: currentUser.email,
          userName: currentUser.displayName,
          meta: { experienceLevel, selectedModalities }
        });

        await refreshProfile();
      }
      navigate('/learning/dashboard');
    } catch (err: any) {
      console.error('Onboarding Save Error:', err);
      setError(err?.message || 'Failed to save your learning plan. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Personalize Your Learning Plan — ABDN NeuroLearning"
        description="Choose your brain-data modalities, experience level, and research goals to build your personalized ABDN NeuroLearning plan."
        url="https://africanbraindatanetwork.com/learning/onboarding"
      />

      <div className="min-h-screen bg-stone-950 text-stone-100 font-sans py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-500 selection:text-stone-950">
        
        {/* Background glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10 space-y-10">
          
          {/* Header Brand & Welcome Greeting */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Onboarding</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Welcome to ABDN NeuroLearning, {displayName} 👋
            </h1>

            <p className="text-stone-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
              What would you like to learn? Choose one or more areas you're interested in. You can always change these later in your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* ===================================================================== */}
            {/* STEP 1: CHOOSE YOUR LEARNING PATH(S) */}
            {/* ===================================================================== */}
            <div className="bg-stone-900/80 rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-6">
              <div className="space-y-1">
                <div className="text-[11px] font-mono font-bold uppercase text-amber-400">
                  STEP 1 OF 3
                </div>
                <h2 className="text-xl font-bold text-white">
                  Choose Your Learning Path(s)
                </h2>
                <p className="text-xs text-stone-400">
                  Select the modalities you wish to learn. We will configure your personalized workspace around these paths.
                </p>
              </div>

              {/* Modality Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {modalityOptions.map((modality) => {
                  const isSelected = !isUndecided && selectedModalities.includes(modality.name);
                  return (
                    <div
                      key={modality.id}
                      onClick={() => toggleModality(modality.name)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 select-none ${
                        isSelected
                          ? 'bg-amber-950/40 border-amber-500 shadow-md ring-1 ring-amber-500'
                          : 'bg-stone-950/80 border-stone-800/90 hover:border-stone-700 hover:bg-stone-950'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2.5">
                          <span className="text-2xl">{modality.icon}</span>
                          <div>
                            <div className="font-bold text-sm text-white">{modality.shortName}</div>
                            <div className="text-[11px] text-amber-400 font-mono">{modality.tagline}</div>
                          </div>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                            isSelected
                              ? 'bg-amber-600 border-amber-500 text-white'
                              : 'border-stone-700 bg-stone-900'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <p className="text-xs text-stone-400 leading-relaxed font-light">
                        {modality.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* "Not Sure Yet" Option */}
              <div
                onClick={handleSelectUndecided}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isUndecided
                    ? 'bg-amber-950/40 border-amber-500 ring-1 ring-amber-500'
                    : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🧭</span>
                  <div>
                    <div className="font-semibold text-xs text-stone-200">
                      I'm not sure yet — Recommend ABDN's beginner pathway
                    </div>
                    <div className="text-[11px] text-stone-400">
                      We'll start you on Brain Data Foundations before choosing a specific modality.
                    </div>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                    isUndecided
                      ? 'bg-amber-600 border-amber-500 text-white'
                      : 'border-stone-700 bg-stone-900'
                  }`}
                >
                  {isUndecided && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* STEP 2: WHAT'S YOUR EXPERIENCE LEVEL? */}
            {/* ===================================================================== */}
            <div className="bg-stone-900/80 rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-6">
              <div className="space-y-1">
                <div className="text-[11px] font-mono font-bold uppercase text-amber-400">
                  STEP 2 OF 3
                </div>
                <h2 className="text-xl font-bold text-white">
                  What's your experience level?
                </h2>
                <p className="text-xs text-stone-400">
                  We'll adapt lesson paces and recommended practice environments to your background.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {experienceOptions.map((option) => {
                  const isSelected = experienceLevel === option.id;
                  return (
                    <div
                      key={option.id}
                      onClick={() => setExperienceLevel(option.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between space-x-3 select-none ${
                        isSelected
                          ? 'bg-amber-950/40 border-amber-500 shadow-md ring-1 ring-amber-500'
                          : 'bg-stone-950/80 border-stone-800/90 hover:border-stone-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="font-bold text-xs sm:text-sm text-white">{option.title}</div>
                        <p className="text-[11px] text-stone-400 leading-relaxed font-light">
                          {option.desc}
                        </p>
                      </div>

                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center border flex-shrink-0 mt-0.5 ${
                          isSelected ? 'bg-amber-600 border-amber-500' : 'border-stone-700'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ===================================================================== */}
            {/* STEP 3: WHAT ARE YOU HOPING TO ACHIEVE? */}
            {/* ===================================================================== */}
            <div className="bg-stone-900/80 rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-6">
              <div className="space-y-1">
                <div className="text-[11px] font-mono font-bold uppercase text-amber-400">
                  STEP 3 OF 3
                </div>
                <h2 className="text-xl font-bold text-white">
                  What are you hoping to achieve?
                </h2>
                <p className="text-xs text-stone-400">
                  Select your primary objectives to tailor your research capstone milestones.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {goalOptions.map((goal) => {
                  const isSelected = selectedGoals.includes(goal);
                  return (
                    <div
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs font-medium select-none ${
                        isSelected
                          ? 'bg-amber-950/40 border-amber-500 text-white'
                          : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <span>{goal}</span>
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-amber-600 border-amber-500 text-white'
                            : 'border-stone-700 bg-stone-900'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-800 text-xs text-rose-300">
                {error}
              </div>
            )}

            {/* Build My Learning Plan Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-amber-800/30 hover:shadow-2xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Configuring Your Workspace...' : 'Build My Learning Plan →'}</span>
              </button>

              <div className="pt-3 text-center text-xs text-stone-500 flex items-center justify-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Free to explore · Flexible pacing · Change modalities anytime</span>
              </div>
            </div>

          </form>

        </div>
      </div>
    </>
  );
}

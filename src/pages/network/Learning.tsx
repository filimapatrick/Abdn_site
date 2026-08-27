import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Sparkles,
  ArrowRight,
  Play,
  Layers,
  Code2,
  Database,
  CheckCircle2,
  Microscope,
  GraduationCap,
  Users,
  Compass,
  FileCheck2,
  Globe2,
  ChevronRight,
  Search,
  BookOpen,
  Cpu,
  Activity,
  Terminal,
  Clock,
  ShieldCheck,
  Share2,
  Award,
  Zap,
  BarChart3,
  Flame,
  Check,
  X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import { seoConfig } from '../../config/seo';
import AuthModal from '../../components/learning/AuthModal';
import PathwayModal, { PathwayDetail } from '../../components/learning/PathwayModal';
import { useAuth } from '../../context/AuthContext';
import { enrollInPathway } from '../../services/authService';

// --- Pathway Data Definition (4 Fellowship Modalities) ---
const pathwaysData: PathwayDetail[] = [
  {
    id: 'mri',
    name: 'MRI & fMRI Analysis',
    category: 'Structural & Functional Neuroimaging',
    icon: '🧠',
    level: 'Beginner → Advanced',
    duration: '10 Weeks · 6 hrs/wk',
    modulesCount: 10,
    lessonsCount: 40,
    exercisesCount: 6,
    tagline: 'Learn structural T1w/T2w imaging, FreeSurfer morphometry, BOLD signal dynamics, fMRIPrep pipelines, and connectomics.',
    overview:
      'Master anatomical and functional brain imaging from raw DICOM to NIfTI volumes, structural morphometry (VBM, FreeSurfer), BOLD fMRI preprocessing with fMRIPrep, task GLM modeling, and resting-state functional connectomics.',
    curriculum: [
      {
        level: 'Level 1',
        title: 'MRI Physics & Structural Morphometry',
        description: 'Understand nuclear magnetic resonance physics, structural T1w/T2w imaging, and FreeSurfer pipelines.',
        topics: [
          'MRI physics, T1, T2, FLAIR contrast & BIDS standardization',
          'FreeSurfer automated cortical reconstruction & tissue segmentation',
          'Voxel-Based Morphometry (VBM) & cortical thickness mapping',
          'Structural quality control & artifact recognition with MRIQC',
        ],
      },
      {
        level: 'Level 2',
        title: 'BOLD Dynamics & Automated Preprocessing (fMRIPrep)',
        description: 'Standardize 4D functional volumes and model hemodynamic signals.',
        topics: [
          'Neurovascular coupling & BOLD hemodynamic response modeling',
          'Task paradigms (block, event-related) vs. resting-state fMRI',
          'fMRIPrep automated preprocessing (slice timing, motion realignment, MNI normalization)',
          'Confound regression (CompCor, ICA-AROMA, framewise displacement)',
        ],
      },
      {
        level: 'Level 3',
        title: 'Statistical GLM & Functional Connectomics',
        description: 'Map cognitive activations and large-scale intrinsic brain networks.',
        topics: [
          'General Linear Model (GLM) for first & second-level group statistics',
          'Resting-state seed-based correlation & Dual Regression',
          'Default Mode Network (DMN) and Executive Network parcellation',
          'Graph theoretical functional connectome matrices with Nilearn',
        ],
      },
    ],
    tools: ['FreeSurfer', 'fMRIPrep', 'NiLearn', 'SPM12', 'FSL', 'MRIQC'],
    datasets: ['ABDN Nigerian Parkinson’s T1w & fMRI Dataset', 'HCP 1200 Resting-State', 'OASIS-3'],
    skillsGained: ['Cortical Thickness Mapping', 'fMRIPrep Orchestration', 'Task GLM Modeling', 'Functional Connectomics'],
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    gradient: 'from-amber-800 via-stone-900 to-amber-950',
  },
  {
    id: 'eeg',
    name: 'EEG Data Science',
    category: 'Scalp Electrophysiology',
    icon: '⚡',
    level: 'Beginner → Advanced',
    duration: '8 Weeks · 5 hrs/wk',
    modulesCount: 8,
    lessonsCount: 32,
    exercisesCount: 4,
    tagline: 'Learn EEG acquisition, artifact cleaning, time-frequency decomposition, and Event-Related Potentials.',
    overview:
      'Master the complete electroencephalography (EEG) data science pipeline from raw microvolt recordings to spectral power, event-related potentials (ERPs), source space reconstruction, and clinical seizure biomarker modeling.',
    curriculum: [
      {
        level: 'Level 1',
        title: 'EEG Foundations & Acquisition',
        description: 'Neurophysiology of postsynaptic potentials and signal recording.',
        topics: [
          'Neurophysiology of postsynaptic potentials & pyramidal dipoles',
          'International 10-20 electrode placement systems',
          'Impedance, sampling rates & recording hardware standards',
          'Standard data formats (EDF, BrainVision, BDF & BIDS-EEG)',
        ],
      },
      {
        level: 'Level 2',
        title: 'Preprocessing & Artifact Removal',
        description: 'Transform noisy raw recordings into clean, research-ready data matrices.',
        topics: [
          'Bad channel detection & spherical spline interpolation',
          'Highpass, lowpass, and notch filtering techniques',
          'Independent Component Analysis (ICA) for ocular/cardiac artifacts',
          'Epoching, baseline correction & robust re-referencing',
        ],
      },
      {
        level: 'Level 3',
        title: 'Time-Frequency Analysis & ERPs',
        description: 'Extract neuroscientific insights and model brain rhythms.',
        topics: [
          'Time-frequency decomposition (Morlet Wavelets & Multitapers)',
          'Event-Related Potential (ERP) peak & latency quantification',
          'Phase-Locking Value (PLV) & sensor-space coherence networks',
          'Automated clinical seizure detection pipeline in Python',
        ],
      },
    ],
    tools: ['MNE-Python', 'EEGLAB', 'FieldTrip', 'BIDS-EEG'],
    datasets: ['ABDN Nigerian Epilepsy Cohort', 'OpenNeuro ds003645', 'PhysioNet EEG'],
    skillsGained: ['Signal Processing', 'ICA Artifact Cleaning', 'Time-Frequency Analysis', 'ERP Modeling'],
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    gradient: 'from-amber-700 via-amber-800 to-stone-900',
  },
  {
    id: 'fnirs',
    name: 'fNIRS Optical Neuroimaging',
    category: 'Optical Neuroimaging',
    icon: '🔆',
    level: 'Beginner → Intermediate',
    duration: '6 Weeks · 4 hrs/wk',
    modulesCount: 6,
    lessonsCount: 24,
    exercisesCount: 3,
    tagline: 'Learn functional near-infrared spectroscopy, optode montage design, and hemodynamics.',
    overview:
      'Explore wearable, non-invasive optical neuroimaging ideally suited for mobile, pediatric, and field research across Africa. Learn to convert raw optical densities into oxygenated and deoxygenated hemoglobin concentrations.',
    curriculum: [
      {
        level: 'Level 1',
        title: 'Optical Physics & fNIRS Instrumentation',
        description: 'Near-infrared light propagation and optode placement geometry.',
        topics: [
          'Modified Beer-Lambert Law (MBLL) equations',
          'Source-detector optode geometry & sensitivity profiles',
          'Differential Pathlength Factor (DPF) calibration',
          'SNIRF open data format standard',
        ],
      },
      {
        level: 'Level 2',
        title: 'Signal Conditioning & Artifact Rejection',
        description: 'Isolate cortical neural signals from superficial scalp hemodynamics.',
        topics: [
          'Motion artifact identification (wavelet & spline filtering)',
          'Bandpass filtering for cardiac & respiratory pulsations',
          'Short-separation channel regression methods',
          'Channel validation & optical density conversion',
        ],
      },
      {
        level: 'Level 3',
        title: 'Cortical Activation & Statistical Mapping',
        description: 'Map task-related cognitive responses on 3D cortical surfaces.',
        topics: [
          'GLM analysis for fNIRS block & event cognitive paradigms',
          'Hemodynamic Response Function (HRF) parameter estimation',
          'Cortical surface projection with AtlasViewer',
          'Field deployment workflows in rural African communities',
        ],
      },
    ],
    tools: ['MNE-NIRS', 'Homer3', 'AtlasViewer', 'SNIRF'],
    datasets: ['African Developmental fNIRS Cohort', 'Mendi Neurofeedback Data'],
    skillsGained: ['MBLL Optical Conversions', 'Short-Channel Regression', 'Optode Mapping', 'Field Research Protocols'],
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    gradient: 'from-rose-800 via-amber-900 to-stone-900',
  },
  {
    id: 'electrophysiology',
    name: 'Electrophysiological Dynamics',
    category: 'Electrophysiology',
    icon: '🔬',
    level: 'Intermediate → Advanced',
    duration: '6 Weeks · 5 hrs/wk',
    modulesCount: 6,
    lessonsCount: 24,
    exercisesCount: 3,
    tagline: 'Master microelectrode arrays, local field potentials (LFP), spike sorting, and neural dynamics.',
    overview:
      'Delve into cellular and circuit-level electrophysiology. Learn to process multi-channel extracellular recordings, perform spike sorting, analyze Local Field Potentials (LFP), and decode millisecond-scale neural dynamics.',
    curriculum: [
      {
        level: 'Level 1',
        title: 'Electrophysiology Principles & Recording Systems',
        description: 'Membrane biophysics and multi-channel electrode recording arrays.',
        topics: [
          'Membrane biophysics & action potential generation',
          'Extracellular microelectrode arrays & silicon probes',
          'Local Field Potentials (LFP) vs. Action Potentials',
          'SpikeInterface open ecosystem & recording architectures',
        ],
      },
      {
        level: 'Level 2',
        title: 'Spike Sorting & Single-Unit Isolation',
        description: 'Isolate individual neuronal spike trains from noisy extracellular signals.',
        topics: [
          'Highpass filtering for multi-unit activity (MUA)',
          'Automated spike detection & feature clustering via Kilosort',
          'Manual curation metrics (isolation distance, refractory violations)',
          'Peristimulus Time Histograms (PSTH) & raster plots',
        ],
      },
      {
        level: 'Level 3',
        title: 'LFP Oscillations & Cross-Frequency Dynamics',
        description: 'Characterize neural circuit communication and population dynamics.',
        topics: [
          'Current Source Density (CSD) laminar depth profiles',
          'Phase-Amplitude Coupling (PAC) and neural synchrony',
          'Spike-field coherence (SFC) analysis',
          'Decoding motor & sensory representations with population vectors',
        ],
      },
    ],
    tools: ['SpikeInterface', 'Kilosort', 'MNE-Python', 'Elephant', 'Phy'],
    datasets: ['Allen Institute Neuropixels Open Data', 'CRCNS Electrophysiology Datasets'],
    skillsGained: ['Spike Sorting Pipelines', 'LFP Spectral Dynamics', 'Spike-Field Coherence', 'Population Decoding'],
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    gradient: 'from-stone-800 via-amber-900 to-stone-950',
  },
];

// --- Featured Programs Data ---
const featuredPrograms = [
  {
    title: 'ABDN Neuroimaging Fellowship',
    badge: 'Cohort-based · 6 Months',
    badgeColor: 'bg-amber-500 text-stone-950 font-bold',
    description:
      'Learn brain-data methods through expert-led sessions, hands-on assignments, dedicated faculty mentorship, and collaborative group research capstones.',
    features: ['Live mentor office hours', 'Real clinical dataset access', 'Peer research working groups', 'Certificate of Completion'],
    actionText: 'Explore Fellowship',
    pathwayRef: 'ABDN Neuroimaging Fellowship',
  },
  {
    title: 'Brain Data Science Foundations',
    badge: 'Beginner · Self-paced',
    badgeColor: 'bg-emerald-500 text-stone-950 font-bold',
    description:
      'Build foundational skills in neuroscience data, FAIR principles, basic signal processing, and computational research methods using Python.',
    features: ['No prior coding required', 'Interactive Jupyter notebooks', 'Self-graded coding exercises', 'Community discussion forum'],
    actionText: 'Start Learning',
    pathwayRef: 'Brain Data Science Foundations',
  },
  {
    title: 'Advanced Neuroimaging & Connectomics',
    badge: 'Intermediate · Cohort & Self-Paced',
    badgeColor: 'bg-amber-400 text-stone-950 font-bold',
    description:
      'Develop advanced skills in multi-shell diffusion MRI, resting-state fMRI networks, connectomics graph theory, and reproducible HPC pipelines.',
    features: ['HPC cloud pipeline access', 'Multimodal data integration', 'Advanced graph theory labs', 'Faculty code reviews'],
    actionText: 'Explore Program',
    pathwayRef: 'Advanced Neuroimaging & Connectomics',
  },
  {
    title: 'FAIR Neuroimaging & Data Stewardship',
    badge: 'Specialization · Professional',
    badgeColor: 'bg-stone-800 text-amber-300 font-bold border border-amber-400/30',
    description:
      'Master data standardization, BIDS conversion, neuroethics, and open-access data repository management tailored for African research centers.',
    features: ['BIDS governance guidelines', 'Data curation frameworks', 'Institutional data policy blueprints', 'Verified Specialization Badge'],
    actionText: 'Explore Specialization',
    pathwayRef: 'FAIR Neuroimaging & Data Stewardship',
  },
];

// --- Community Personas Data ---
const personaItems = [
  {
    icon: '👩🏾‍🎓',
    role: 'Students',
    target: 'Undergraduate, Masters & PhD scholars',
    description: 'Build foundational neuroscience, programming, and data-science skills with zero prior neuroimaging experience required.',
    benefit: 'Establish competitive academic credentials and join research labs.',
  },
  {
    icon: '🔬',
    role: 'Researchers & Postdocs',
    target: 'Early-career & established investigators',
    description: 'Master reproducible computational pipelines to process your own raw neuroimaging data and accelerate high-impact publications.',
    benefit: 'Adopt FAIR standards and publish world-class African brain data.',
  },
  {
    icon: '👨🏾‍💻',
    role: 'Data Scientists & Engineers',
    target: 'Bioinformaticians & machine learning specialists',
    description: 'Apply state-of-the-art machine learning, deep neural networks, and signal processing to real biological brain data.',
    benefit: 'Transition data expertise into impactful computational neuroscience.',
  },
  {
    icon: '🧑🏾‍🏫',
    role: 'Educators & Mentors',
    target: 'University faculty & research supervisors',
    description: 'Access standardized, open-access curricula, slide decks, and interactive coding labs to train students in your department.',
    benefit: 'Equip African institutions with modern neuroinformatics pedagogy.',
  },
];

// --- 2026 Fellowship Teaching Assistants Data (4 Cohorts - Placeholders) ---
interface FellowshipTA {
  id: string;
  role: string;
  name: string;
  avatar: string;
  imageBg: string;
}

const taTeamData: FellowshipTA[] = [
  {
    id: 'ta-mri',
    role: 'MRI & fMRI TA',
    name: 'TA Mentor Name',
    avatar: '🧠',
    imageBg: 'bg-amber-100/70 text-amber-900 border-amber-200',
  },
  {
    id: 'ta-eeg',
    role: 'EEG Data Science TA',
    name: 'TA Mentor Name',
    avatar: '⚡',
    imageBg: 'bg-amber-100/70 text-amber-900 border-amber-200',
  },
  {
    id: 'ta-fnirs',
    role: 'fNIRS Optical TA',
    name: 'TA Mentor Name',
    avatar: '🔆',
    imageBg: 'bg-rose-100/70 text-rose-900 border-rose-200',
  },
  {
    id: 'ta-ephys',
    role: 'Electrophysiology TA',
    name: 'TA Mentor Name',
    avatar: '🔬',
    imageBg: 'bg-amber-100/70 text-amber-900 border-amber-200',
  },
];

export default function Learning() {
  const seo = seoConfig.learning;
  const navigate = useNavigate();
  const { currentUser, userProfile, isLoggedIn, logout, refreshProfile } = useAuth();

  // Modal states
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');
  const [selectedPathwayName, setSelectedPathwayName] = useState<string | null>(null);
  const [activePathwayModal, setActivePathwayModal] = useState<PathwayDetail | null>(null);

  // Enrollment notification toast
  const [enrollmentNotification, setEnrollmentNotification] = useState<string | null>(null);

  // Curriculum Hub Tab State ('pathways' | 'programs')
  const [curriculumTab, setCurriculumTab] = useState<'pathways' | 'programs'>('pathways');

  // Interactive hero simulation states (4 Fellowship Modalities)
  const [activeHeroTab, setActiveHeroTab] = useState<'mri' | 'eeg' | 'fnirs' | 'electrophysiology'>('mri');

  const openAuth = (mode: 'signup' | 'signin', pathwayName?: string) => {
    setAuthMode(mode);
    setSelectedPathwayName(pathwayName || null);
    setIsAuthOpen(true);
  };

  const handleStartPathway = async (pathwayName: string) => {
    setActivePathwayModal(null);
    if (isLoggedIn && currentUser) {
      try {
        await enrollInPathway(currentUser.uid, pathwayName);
        await refreshProfile();
        setEnrollmentNotification(`You have successfully enrolled in ${pathwayName}!`);
        setTimeout(() => setEnrollmentNotification(null), 5000);
      } catch (err) {
        console.error('Error enrolling in pathway:', err);
      }
    } else {
      openAuth('signup', pathwayName);
    }
  };

  const handleAuthSuccess = async (profile: any) => {
    await refreshProfile();
    navigate('/learning/dashboard');
  };

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        url={seo.url}
      />

      <Layout>
        <div className="bg-stone-50 text-stone-900 min-h-screen selection:bg-amber-500 selection:text-stone-950 font-sans">

          {/* ========================================================================= */}
          {/* 1. HERO / VALUE PROPOSITION SECTION */}
          {/* ========================================================================= */}
          <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-gradient-to-b from-amber-50/70 via-stone-50 to-stone-50 border-b border-amber-100/60">
            {/* Subtle background ambient glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-10 right-10 w-72 h-72 bg-amber-200/20 rounded-full blur-2xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                {/* Left Column: Value Prop & CTAs */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  {/* Descriptive Badge / User Session */}
                  <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-950 text-xs font-semibold uppercase tracking-wider shadow-sm"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                      <span>ABDN NeuroLearning · Neuroimaging Learning Hub</span>
                    </motion.div>

                    {isLoggedIn && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-medium"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>
                          Signed in as{' '}
                          <strong>
                            {userProfile?.displayName || currentUser?.displayName || currentUser?.email}
                          </strong>
                        </span>
                        <button
                          onClick={logout}
                          className="ml-1 text-[11px] text-emerald-800 hover:text-emerald-950 underline font-semibold"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </div>

                  {/* Main Headline */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.12]"
                  >
                    Build Your <br className="hidden sm:inline" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900">
                      Brain Data Skills
                    </span>
                  </motion.h1>

                  {/* Value Proposition */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg sm:text-xl text-stone-700 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0"
                  >
                    Learn neuroscience and brain-data science through structured courses, practical exercises, real datasets, and expert-led training.
                  </motion.p>

                  {/* Secondary Supporting Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                  >
                    From EEG and MRI to fNIRS, DTI and neuroinformatics, follow structured learning pathways designed to help you move from learning concepts to applying them in research.
                  </motion.p>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
                  >
                    {isLoggedIn ? (
                      <Link
                        to="/learning/dashboard"
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-semibold text-base shadow-lg shadow-amber-800/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 group"
                      >
                        <span>Go to My Dashboard</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => openAuth('signup')}
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-semibold text-base shadow-lg shadow-amber-800/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 group"
                      >
                        <span>Start Learning</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}

                    <a
                      href="#pathways"
                      className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-amber-50/50 border border-stone-300 hover:border-amber-400 text-stone-800 font-semibold text-base shadow-sm hover:shadow transition-all flex items-center justify-center space-x-2"
                    >
                      <Compass className="w-5 h-5 text-amber-700" />
                      <span>Explore Learning Paths</span>
                    </a>
                  </motion.div>

                  {/* Trust Badge */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="pt-2 text-xs sm:text-sm text-stone-500 flex items-center justify-center lg:justify-start space-x-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Free to explore · Learn at your own pace · Built for the African Brain Data Network</span>
                  </motion.div>
                </div>

                {/* Right Column: Hero Visual (Digital Learning Platform Preview) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:col-span-5 relative"
                >
                  {/* Decorative glass glow card */}
                  <div className="relative rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white p-6 shadow-2xl border border-stone-800 overflow-hidden">
                    {/* Glowing corner gradients */}
                    <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-36 h-36 bg-amber-600/15 rounded-full blur-2xl pointer-events-none" />

                    {/* Window Controls & Brand */}
                    <div className="flex items-center justify-between pb-4 border-b border-stone-800 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                        <span className="text-stone-400 font-mono text-[11px] ml-2">ABDN NeuroLearning App</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px]">
                        LIVE HUB
                      </span>
                    </div>

                    {/* Interactive Modality Tabs (4 Fellowship Modalities) */}
                    <div className="grid grid-cols-4 gap-1 my-4 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
                      {(['mri', 'eeg', 'fnirs', 'electrophysiology'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveHeroTab(tab)}
                          className={`py-1.5 px-1.5 rounded-lg font-semibold uppercase tracking-wider text-[10px] sm:text-[11px] transition-all truncate ${activeHeroTab === tab
                              ? 'bg-amber-600 text-white shadow-sm'
                              : 'text-stone-400 hover:text-white hover:bg-stone-900'
                            }`}
                        >
                          {tab === 'mri' ? 'MRI & fMRI' : tab === 'electrophysiology' ? 'E-Phys' : tab.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    {/* Active Track Card Visual */}
                    <div className="bg-stone-800/60 rounded-2xl p-4 border border-stone-700/60 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
                            Fellowship Learning Track
                          </div>
                          <div className="text-base font-bold text-white mt-0.5">
                            {activeHeroTab === 'mri' && 'MRI & fMRI Analysis'}
                            {activeHeroTab === 'eeg' && 'EEG Data Science'}
                            {activeHeroTab === 'fnirs' && 'fNIRS Optical Neuroimaging'}
                            {activeHeroTab === 'electrophysiology' && 'Electrophysiological Dynamics'}
                          </div>
                        </div>
                        <span className="px-2 py-1 rounded-md bg-stone-900 text-stone-300 text-[10px] font-mono border border-stone-700">
                          Module 03 / 08
                        </span>
                      </div>

                      {/* Progress Bar & Stat */}
                      <div>
                        <div className="flex justify-between text-xs text-stone-300 mb-1.5">
                          <span>Pathway Progress</span>
                          <span className="font-mono font-bold text-amber-400">
                            {activeHeroTab === 'mri' && '72% Completed'}
                            {activeHeroTab === 'eeg' && '82% Completed'}
                            {activeHeroTab === 'fnirs' && '54% Completed'}
                            {activeHeroTab === 'electrophysiology' && '60% Completed'}
                          </span>
                        </div>
                        <div className="h-2 w-full bg-stone-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                            style={{
                              width:
                                activeHeroTab === 'mri'
                                  ? '72%'
                                  : activeHeroTab === 'eeg'
                                    ? '82%'
                                    : activeHeroTab === 'fnirs'
                                      ? '54%'
                                      : '60%',
                            }}
                          />
                        </div>
                      </div>

                      {/* Next Up Activity */}
                      <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2.5">
                          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                            <Activity className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-stone-200">
                              {activeHeroTab === 'mri' && 'Lab 2: FreeSurfer & fMRIPrep Preprocessing'}
                              {activeHeroTab === 'eeg' && 'Lab 2: ICA Ocular Artifact Filtering'}
                              {activeHeroTab === 'fnirs' && 'Lab 2: Short-Channel Hemodynamic Regression'}
                              {activeHeroTab === 'electrophysiology' && 'Lab 2: Kilosort Spike Sorting & LFPs'}
                            </div>
                            <div className="text-[11px] text-stone-400">Hands-on Jupyter Lab · African Cohort</div>
                          </div>
                        </div>
                        <button
                          onClick={() => openAuth('signup')}
                          className="px-2.5 py-1 rounded-md bg-amber-600 hover:bg-amber-500 text-white font-medium text-[11px] flex items-center space-x-1"
                        >
                          <span>Resume</span>
                          <Play className="w-3 h-3 fill-current" />
                        </button>
                      </div>
                    </div>

                    {/* Modality Node Visualization */}
                    <div className="mt-4 pt-4 border-t border-stone-800/80">
                      <div className="text-[11px] uppercase tracking-wider text-stone-400 mb-2 font-semibold text-center">
                        Fellowship Modalities
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-stone-300 py-1">
                        <span className="px-2.5 py-1 rounded-full bg-stone-800 border border-stone-700 text-amber-300 font-mono text-[11px]">
                          ● MRI / fMRI
                        </span>
                        <span className="text-stone-600">↔</span>
                        <span className="px-2.5 py-1 rounded-full bg-stone-800 border border-stone-700 text-amber-300 font-mono text-[11px]">
                          ● EEG
                        </span>
                        <span className="text-stone-600">↔</span>
                        <span className="px-2.5 py-1 rounded-full bg-stone-800 border border-stone-700 text-amber-300 font-mono text-[11px]">
                          ● fNIRS
                        </span>
                        <span className="text-stone-600">↔</span>
                        <span className="px-2.5 py-1 rounded-full bg-stone-800 border border-stone-700 text-amber-300 font-mono text-[11px]">
                          ● ELECTROPHYSIOLOGY
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 2. PLATFORM FEATURES & METHODOLOGY */}
          {/* ========================================================================= */}
          <section className="py-20 bg-white border-b border-stone-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  <span>Learning Environment</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                  Learn by Doing, Not Just Watching
                </h2>
                <p className="text-base sm:text-lg text-stone-600">
                  ABDN NeuroLearning is an active workspace engineered to transform curiosity into verified research competency.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 01 Learn */}
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="bg-stone-50 rounded-3xl p-8 border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 uppercase">
                        01 · Expert Masterclasses
                      </span>
                      <span className="text-3xl">🎥</span>
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900">Structured Curricula</h3>
                    <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                      Follow step-by-step video lessons and live workshops led by ABDN researchers and global neuroscience faculty.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-stone-200/60 mt-6 text-xs text-amber-800 font-semibold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Theory, physics & standard conventions</span>
                  </div>
                </motion.div>

                {/* 02 Practice */}
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="bg-stone-50 rounded-3xl p-8 border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 uppercase">
                        02 · Real Datasets & Code
                      </span>
                      <span className="text-3xl">🧪</span>
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900">Interactive Jupyter Labs</h3>
                    <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                      Apply concepts directly using curated African neuroimaging cohorts (EEG, MRI, fNIRS) in ready-to-run notebooks.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-stone-200/60 mt-6 text-xs text-amber-800 font-semibold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Interactive Python & FAIR data pipelines</span>
                  </div>
                </motion.div>

                {/* 03 Build */}
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="bg-stone-50 rounded-3xl p-8 border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 uppercase">
                        03 · Research Capstones
                      </span>
                      <span className="text-3xl">🔬</span>
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900">Verified Credentials</h3>
                    <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                      Complete practical research capstones, generate reproducible code portfolios, and benchmark your computational competencies.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-stone-200/60 mt-6 text-xs text-amber-800 font-semibold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>Publication-ready capstone portfolios</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 3. CURRICULUM HUB (PATHWAYS & FELLOWSHIP PROGRAMS) */}
          {/* ========================================================================= */}
          <section id="pathways" className="py-20 bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50 border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* Main Tab Switcher Header */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  <span>Curriculum Catalog</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                  Choose Your Learning Path
                </h2>
                <p className="text-base sm:text-lg text-stone-600">
                  Select a structured modality pathway or explore our featured programs.
                </p>

                {/* Primary Category Switcher: Modality Pathways vs Featured Programs */}
                <div className="inline-flex items-center p-1.5 bg-stone-200/80 rounded-2xl border border-stone-300 shadow-inner mt-2">
                  <button
                    onClick={() => setCurriculumTab('pathways')}
                    className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${curriculumTab === 'pathways'
                        ? 'bg-amber-700 text-white shadow-md'
                        : 'text-stone-700 hover:text-stone-950 hover:bg-stone-300/60'
                      }`}
                  >
                    <span>🧠 Modality Pathways ({pathwaysData.length})</span>
                  </button>
                  <button
                    disabled
                    title="Featured Programs navigation disabled"
                    className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 text-stone-400 opacity-60 cursor-not-allowed"
                  >
                    <span>⭐ Featured Programs ({featuredPrograms.length})</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-300/80 text-stone-600 font-semibold uppercase tracking-wider">Soon</span>
                  </button>
                </div>
              </div>

              {/* TAB 1: MODALITY PATHWAYS */}
              {curriculumTab === 'pathways' && (
                <div>
                  {/* Pathways Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pathwaysData.map((pathway) => (
                      <motion.div
                        key={pathway.id}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-3xl p-7 border border-stone-200 shadow-sm hover:shadow-2xl hover:border-amber-400 transition-all flex flex-col justify-between group"
                      >
                        <div>
                          {/* Top Header Row */}
                          <div className="flex items-start justify-between mb-5">
                            <div className="text-4xl p-3 bg-amber-50 rounded-2xl border border-amber-100 group-hover:scale-110 transition-transform">
                              {pathway.icon}
                            </div>
                            <div className="flex flex-col items-end space-y-1.5">
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold uppercase tracking-wider">
                                {pathway.category}
                              </span>
                              <span className="text-[11px] text-stone-500 font-medium">
                                {pathway.duration}
                              </span>
                            </div>
                          </div>

                          {/* Title & Tagline */}
                          <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-amber-700 transition-colors">
                            {pathway.name}
                          </h3>
                          <p className="text-sm text-stone-600 leading-relaxed mb-6">
                            {pathway.tagline}
                          </p>

                          {/* Tools preview */}
                          <div className="mb-6">
                            <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-2">
                              Key Tools & Libraries
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {pathway.tools.map((tool, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-xs font-mono"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Footer Action */}
                        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                          <span className="text-xs font-semibold text-amber-800">
                            {pathway.level}
                          </span>
                          <button
                            onClick={() => setActivePathwayModal(pathway)}
                            className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-600 text-amber-900 hover:text-white font-semibold text-xs transition-all flex items-center space-x-1.5 group-hover:bg-amber-600 group-hover:text-white shadow-sm"
                          >
                            <span>Explore Path</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: FELLOWSHIP PROGRAMS */}
              {curriculumTab === 'programs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredPrograms.map((prog, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="p-8 rounded-3xl bg-white border border-stone-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider ${prog.badgeColor}`}>
                            {prog.badge}
                          </span>
                          <Sparkles className="w-5 h-5 text-amber-600" />
                        </div>

                        <h3 className="text-2xl font-bold text-stone-900">
                          {prog.title}
                        </h3>

                        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                          {prog.description}
                        </p>

                        <div className="pt-2 space-y-2">
                          {prog.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center space-x-2 text-xs text-stone-700">
                              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-8 mt-6 border-t border-stone-200/80 flex items-center justify-between">
                        <button
                          onClick={() => openAuth('signup', prog.pathwayRef)}
                          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold text-sm shadow-md shadow-amber-700/20 hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                        >
                          <span>{prog.actionText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

            </div>
          </section>

          {/* ========================================================================= */}
          {/* 3B. 2026 FELLOWSHIP TEACHING ASSISTANTS GALLERY SECTION */}
          {/* ========================================================================= */}
          <section className="py-20 bg-white border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5 text-amber-700" />
                  <span>2026 Fellowship Faculty & TAs</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                  2026 Fellowship Teaching Assistants
                </h2>
                <p className="text-base text-stone-600">
                  Dedicated mentors leading weekly live coding labs, office hours, and capstones across our cohorts.
                </p>
              </div>

              {/* TA Gallery Grid: 4 items per row matching reference design */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {taTeamData.map((ta) => (
                  <motion.div
                    key={ta.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center text-center group"
                  >
                    {/* Portrait Photo Frame */}
                    <div className={`w-full aspect-square rounded-3xl ${ta.imageBg} border flex items-center justify-center text-6xl shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300 mb-5 overflow-hidden relative`}>
                      <span className="select-none">{ta.avatar}</span>
                    </div>

                    {/* Role Title (Navy/Bold matching reference) */}
                    <h3 className="text-lg font-extrabold text-amber-950 tracking-tight mb-1">
                      {ta.role}
                    </h3>

                    {/* Name Subtitle */}
                    <p className="text-sm font-semibold text-stone-700">
                      {ta.name}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. COMPACT AUDIENCE / PERSONAS SECTION */}
          {/* ========================================================================= */}
          <section className="py-16 bg-white border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-stone-50 rounded-3xl p-8 border border-stone-200">
                <div className="space-y-2 text-center lg:text-left lg:max-w-md">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                    <span>Community Alignment</span>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900">
                    Who is ABDN NeuroLearning for?
                  </h3>
                  <p className="text-sm text-stone-600">
                    Tailored pathways engineered for every stage of your research journey.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:max-w-2xl">
                  {personaItems.map((persona, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-start space-x-3"
                    >
                      <div className="text-2xl p-2 rounded-xl bg-amber-50 border border-amber-100 flex-shrink-0">
                        {persona.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-stone-900">{persona.role}</h4>
                        <p className="text-xs text-stone-600 mt-0.5 leading-snug">{persona.target}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 8. SIGNUP CALL TO ACTION SECTION */}
          {/* ========================================================================= */}
          <section className="py-24 bg-gradient-to-br from-amber-900 via-amber-800 to-stone-950 text-white relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-amber-200 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Begin Your Learning Journey</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Start building your brain-data skills today
              </h2>

              <p className="text-base sm:text-lg text-amber-100/90 max-w-2xl mx-auto font-light leading-relaxed">
                Create your free ABDN account and get immediate access to structured learning pathways, progress tracking, and practical African neuroscience datasets.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => openAuth('signup')}
                  className="w-full sm:w-auto px-9 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-base shadow-xl shadow-black/30 hover:scale-105 transition-all flex items-center justify-center space-x-2 group"
                >
                  <span>Create Free Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-stone-950" />
                </button>
              </div>

              <div className="pt-3">
                <p className="text-xs sm:text-sm text-amber-200/80">
                  Already have an account?{' '}
                  <button
                    onClick={() => openAuth('signin')}
                    className="text-white font-semibold underline hover:text-amber-300 transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* TOAST NOTIFICATION */}
          {/* ========================================================================= */}
          <AnimatePresence>
            {enrollmentNotification && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                className="fixed bottom-6 right-6 z-50 p-4 max-w-md rounded-2xl bg-stone-900 text-white border border-amber-500/50 shadow-2xl flex items-center justify-between space-x-3 text-xs sm:text-sm"
              >
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="font-medium text-stone-100">{enrollmentNotification}</span>
                </div>
                <button
                  onClick={() => setEnrollmentNotification(null)}
                  className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ========================================================================= */}
          {/* MODALS */}
          {/* ========================================================================= */}
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            initialMode={authMode}
            defaultPathway={selectedPathwayName}
            onAuthSuccess={handleAuthSuccess}
          />

          <PathwayModal
            isOpen={!!activePathwayModal}
            pathway={activePathwayModal}
            onClose={() => setActivePathwayModal(null)}
            onStartPathway={handleStartPathway}
          />

        </div>
      </Layout>
    </>
  );
}

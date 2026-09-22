import React, { useState, useEffect } from 'react';
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
  User,
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
  X,
  Sun,
  Star,
  Mail
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
    icon: <Brain className="w-6 h-6 text-amber-800" />,
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
    icon: <Zap className="w-6 h-6 text-amber-800" />,
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
    icon: <Sun className="w-6 h-6 text-rose-800" />,
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
    icon: <Microscope className="w-6 h-6 text-amber-800" />,
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
    icon: <GraduationCap className="w-6 h-6 text-amber-700" />,
    role: 'Students',
    target: 'Undergraduate, Masters & PhD scholars',
    description: 'Build foundational neuroscience, programming, and data-science skills with zero prior neuroimaging experience required.',
    benefit: 'Establish competitive academic credentials and join research labs.',
  },
  {
    icon: <Microscope className="w-6 h-6 text-amber-700" />,
    role: 'Researchers & Postdocs',
    target: 'Early-career & established investigators',
    description: 'Master reproducible computational pipelines to process your own raw neuroimaging data and accelerate high-impact publications.',
    benefit: 'Adopt FAIR standards and publish world-class African brain data.',
  },
  {
    icon: <Code2 className="w-6 h-6 text-amber-700" />,
    role: 'Data Scientists & Engineers',
    target: 'Bioinformaticians & machine learning specialists',
    description: 'Apply state-of-the-art machine learning, deep neural networks, and signal processing to real biological brain data.',
    benefit: 'Transition data expertise into impactful computational neuroscience.',
  },
  {
    icon: <Users className="w-6 h-6 text-amber-700" />,
    role: 'Educators & Mentors',
    target: 'University faculty & research supervisors',
    description: 'Access standardized, open-access curricula, slide decks, and interactive coding labs to train students in your department.',
    benefit: 'Equip African institutions with modern neuroinformatics pedagogy.',
  },
];

// --- 2026 Fellowship Teaching Assistants Data ---
interface FellowshipTA {
  id: string;
  name: string;
  email?: string;
  affiliation?: string;
  researchInterest?: string;
  bio?: string;
  image?: string;
  teams: { label: string; color: string }[];
}

const taTeamData: FellowshipTA[] = [
  {
    id: 'ta-nicole',
    name: 'Nicole Vissers',
    email: 'n.vissers@ucl.ac.uk',
    affiliation: 'Sainsbury Wellcome Centre, UCL, UK',
    researchInterest: 'Systems Neuroscience, Inhibition, Neuropeptides, Neuromodulation',
    bio: 'Nicole Vissers is completing her PhD at the Sainsbury Wellcome Centre in London, UK, where she focusses on how different inhibitory cell-types in the ventral lateral geniculate nucleus of the thalamus contribute to visually guided defensive behaviours. Nicole is passionate about making science more inclusive and aims to create environments where everyone feels valued, encouraged to follow their curiosity, and empowered to learn and grow. As a TA for ABDN, she is excited to support students, share her knowledge, and help foster a welcoming scientific community.',
    image: '/assets/Fellowship_2026/Nicole.png',
    teams: [{ label: 'Electrophysiology', color: 'bg-rose-100 text-rose-950 border-rose-300' }],
  },
  {
    id: 'ta-sude',
    name: 'Sude Umac',
    email: 'msuneuro22@hotmail.com',
    affiliation: 'University of Cambridge',
    researchInterest: 'Neurotechnology / Epilepsy / Memory',
    bio: 'I am a neuroscience and AI researcher with a BSc in Medical Neuroscience and an MSc in AI and Adaptive Systems from the University of Sussex. Currently a Fellow at Cambridge NeuroWorks, my research focuses on neurotechnology, epilepsy, and AI-driven brain monitoring systems, with interests spanning seizure prediction, closed-loop neuromodulation, brain-computer interfaces, and computational neuroscience.',
    image: '/assets/Fellowship_2026/Sude.png',
    teams: [{ label: 'EEG', color: 'bg-lime-100 text-lime-950 border-lime-300' }],
  },
  {
    id: 'ta-raphael',
    name: 'Raphael Brefo Takyi',
    email: 'raphaeltakyi@gmail.com',
    affiliation: 'Institute of Psychiatry and Neuroscience of Paris',
    researchInterest: 'Neuroimaging, Stroke, Motor recovery',
    bio: 'Physician-scientist with a strong foundation in both patient care and biomedical science research. Experienced in academic teaching and deeply committed to impacting the next generation through knowledge-sharing. Passionate about advancing the field of neurology by using advanced neuroimaging to improve patient care especially in neurodegenerative diseases and stroke. Proficient in neuroimaging techniques (SPM, FSL, FreeSurfer), Python and R programming, and statistical modeling, with a focus on improving diagnostics and outcomes in neurological disorders.',
    image: '/assets/Fellowship_2026/Rapael.png',
    teams: [
  { label: 'MRI', color: 'bg-emerald-100 text-emerald-950 border-emerald-300' },
      { label: 'fMRI', color: 'bg-sky-100 text-sky-950 border-sky-300' },
    ],
  },
  {
    id: 'ta-nada',
    name: 'Nada Osama Salah',
    email: 'nada.salah@ejust.edu.eg',
    affiliation: 'Egypt-Japan University of Science and Technology',
    researchInterest: 'Cognitive and Computational Neuroscience',
    bio: 'Nada Salah is a researcher in computational neuroscience and neuroengineering. She graduated with a BSc in Biomedical Engineering from Egypt-Japan University of Science and Technology. Her interests lie in EEG, signal processing, cognition, and neural computation, mainly in understanding how neural activity gives rise to cognition and behaviour. She has worked on projects involving EEG analysis, neural decoding, speech-based cognitive assessment and is further interested in the intersection of brain science and neurotechnology.',
    image: '/assets/Fellowship_2026/Nade.png',
    teams: [{ label: 'EEG', color: 'bg-lime-100 text-lime-950 border-lime-300' }],
  },
  {
    id: 'ta-huimin',
    name: 'Huimin Tang',
    email: 'huimin1019@outlook.com',
    affiliation: 'University of Nottingham Ningbo China',
    researchInterest: 'Mental workload, fNIRS, HCI, Information searching',
    bio: "I am a PhD student at the University of Nottingham Ningbo China (UNNC) and a team member of the Brain and Physiological Data Group at the University of Nottingham. My main research interests are in the field of Human Computer Interaction (HCI). I am particularly interested in understanding users' preferences and current mental workload through their physiological feedback (specifically brain activity). My research currently focuses on exploring the correlation between users' Cognitive Style and their fNIRS data in the Information Retrieval process.",
    image: '/assets/Fellowship_2026/Huimin.png',
    teams: [{ label: 'fNIRS', color: 'bg-rose-100 text-rose-950 border-rose-300' }],
  },
  {
    id: 'ta-obed',
    name: 'Obed Apochi',
    email: 'apochiobed@gmail.com',
    affiliation: 'Ruhr University Bochum, Germany',
    researchInterest: "Alzheimer's disease, Neuromodulation, Neurostimulation, Brain imaging (fMRI, MRI), Aging, Spatial Navigation",
    bio: 'Apochi Obed Okwoli is a DAAD-funded PhD researcher in Neuroscience at Ruhr University Bochum, Germany. His work focuses on Alzheimer’s disease, memory, neuroimaging, spatial navigation, and non-invasive brain stimulation. He is passionate about scientific innovation, mentorship, and advancing neuroscience research in Africa.',
    image: '/assets/Fellowship_2026/Obed.png',
    teams: [
      { label: 'MRI', color: 'bg-emerald-100 text-emerald-950 border-emerald-300' },
      { label: 'fMRI', color: 'bg-sky-100 text-sky-950 border-sky-300' },
    ],
  },
  {
    id: 'ta-zubair',
    name: 'Abdulrazaq A. Zubair',
    email: 'abdulrazaq.zubair@fuhsa.edu.ng',
    affiliation: 'Federal University of Health Sciences, Azare (FUHSA)',
    researchInterest: 'AI in medical imaging, MRI safety, Stroke, Glioma & Dementia',
    bio: 'An MRI specialist radiographer, educator, and researcher with over nine years of experience across clinical radiography, MRI, ultrasound, and CT. Held academic and clinical leadership roles in Nigeria, training medical radiography students and coordinating advanced imaging and neuroimaging services. Currently pursuing a Ph.D. in Medical Radiography at Bayero University Kano.',
    image: '/assets/Fellowship_2026/Zubair.png',
    teams: [
      { label: 'MRI', color: 'bg-emerald-100 text-emerald-950 border-emerald-300' },
      { label: 'fMRI', color: 'bg-sky-100 text-sky-950 border-sky-300' },
    ],
  },
  {
    id: 'ta-eric',
    name: 'Happiness Eric Aigbogun',
    email: 'aigbogunerichappiness@gmail.com',
    affiliation: 'UPMC Karikari Lab, University of Pittsburgh',
    researchInterest: "Data Science, AI & Alzheimer's Disease Biomarkers",
    bio: 'Happiness Eric Aigbogun is a Data Coordinator and Analyst at the UPMC Karikari Lab, University of Pittsburgh, where she supports Alzheimer\'s disease biomarker research. With a BSc in Computer Science and a Master of Data Science in progress, she works at the intersection of data science, bioinformatics, and neuroscience. She is also the creator and lead of ResurchIn, a free research training and mentorship initiative.',
    image: '/assets/Fellowship_2026/Eric.jpeg',
    teams: [
      { label: 'EEG', color: 'bg-lime-100 text-lime-950 border-lime-300' },
      // { label: 'Data Science', color: 'bg-purple-100 text-purple-950 border-purple-300' },
    ],
  },
  {
    id: 'ta-anita',
    name: 'Anita Esi Eshun',
    affiliation: 'Global Health and Infectious Disease - Kumasi Centre for Collaborative Research in Tropical Medicine, KNUST',
    researchInterest: 'Neuroimaging Analysis, Python & Tropical Medicine Research',
    bio: "Anita Esi Eshun is a data scientist, statistician, computational neuroscience educator with expertise in machine learning, deep learning, data analytics, and statistical modeling. She holds a Bachelor's degree in Statistics from Kwame Nkrumah University of Science and Technology (KNUST) and a Master's degree in Data Science from the African Institute for Mathematical Sciences (AIMS).\n\nHer work lies at the intersection of mathematics, computational learning, healthcare, and neuroscience, where she develops data-driven solutions to address complex real-world challenges. Her research interests include computational neuroscience, global health, brain imaging, and trustworthy AI for healthcare.\n\nAnita currently serves as a Data Scientist under the Global Health and Infectious Disease Group at the Kumasi Centre for Collaborative Research in Tropical Medicine (KCCR), where she develops and implements statistical and computational methodologies to address research questions in Global Health.",
    image: '/assets/Anita_Esun.JPG',
    teams: [{ label: 'EEG', color: 'bg-lime-100 text-lime-950 border-lime-300' }],
  },
  {
    id: 'ta-ahabwe',
    name: 'Ahabwe Agnes Lynn',
    affiliation:'Sungkyunkwan University',
    researchInterest:'NeuroAI',
    bio:'An AI engineer interested in neuroAI, biophysically realistic constrained ML pipelines of high dimensional brain data, and closed-loop neural decoding, to be concise. Lynn is interested in using AI to revolutionise healthcare, and drive inclusion through technology.',
    image:'/assets/Fellowship_2026/lynn.png',
    teams: [{ label: 'EEG', color: 'bg-lime-100 text-lime-950 border-lime-300' }],
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

  // TA Profile Modal state
  const [selectedTaModal, setSelectedTaModal] = useState<FellowshipTA | null>(null);

  // Lock body scroll & dismiss on Escape when any modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedTaModal(null);
        setActivePathwayModal(null);
      }
    };
    if (selectedTaModal || activePathwayModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedTaModal, activePathwayModal]);

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
          <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-gradient-to-b from-stone-100/80 via-stone-50 to-stone-50 border-b border-stone-200/80">
            {/* Subtle background dot grid texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#d6d3d1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                {/* Left Column: Value Prop & CTAs */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  {/* User Session Badge */}
                  {isLoggedIn && (
                    <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
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
                    </div>
                  )}

                  {/* Main Headline */}
                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.12]"
                  >
                    Build Your Skills in <br className="hidden sm:inline" />
                    <span className="text-amber-800 underline decoration-amber-400/60 decoration-4 underline-offset-4">
                      Brain Data Science
                    </span>
                  </motion.h1>

                  {/* Value Proposition */}
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-lg sm:text-xl text-stone-700 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0"
                  >
                    Learn neuroscience and brain data science through structured courses, practical exercises, open datasets, and expert-led training.
                  </motion.p>

                  {/* Secondary Supporting Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                  >
                    From EEG and MRI to fNIRS, electrophysiology and neuroinformatics, follow structured pathways engineered to help you move from concepts to research application.
                  </motion.p>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
                  >
                    {isLoggedIn ? (
                      <Link
                        to="/learning/dashboard"
                        className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 group"
                      >
                        <span>Go to My Dashboard</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => openAuth('signup')}
                        className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 group"
                      >
                        <span>Start Learning</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}

                    <a
                      href="#pathways"
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-amber-50/50 border border-stone-300 hover:border-amber-400 text-stone-800 font-semibold text-base shadow-sm transition-all flex items-center justify-center space-x-2"
                    >
                      <Compass className="w-5 h-5 text-amber-700" />
                      <span>Explore Learning Paths</span>
                    </a>
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
          {/* 3. CURRICULUM HUB (PATHWAYS & FELLOWSHIP PROGRAMS) - COMMENTED OUT */}
          {/* ========================================================================= */}
          {false && (
            <section id="pathways" className="py-20 bg-stone-50 border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Tab Switcher Header */}
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 space-y-3">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                    Choose Your Learning Path
                  </h2>
                  <p className="text-base text-stone-600">
                    Select a structured modality pathway to explore curriculum modules, datasets, and computational tools.
                  </p>

                  {/* Primary Category Switcher: Modality Pathways vs Featured Programs */}
                  <div className="inline-flex items-center p-1.5 bg-stone-200/80 rounded-2xl border border-stone-300 shadow-inner mt-2">
                    <button
                      onClick={() => setCurriculumTab('pathways')}
                      className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${curriculumTab === 'pathways'
                          ? 'bg-amber-800 text-white shadow-md'
                          : 'text-stone-700 hover:text-stone-950 hover:bg-stone-300/60'
                        }`}
                    >
                      <Brain className="w-4 h-4" />
                      <span>Modality Pathways ({pathwaysData.length})</span>
                    </button>
                    <button
                      disabled
                      title="Featured Programs navigation disabled"
                      className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 text-stone-400 opacity-60 cursor-not-allowed"
                    >
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Featured Programs ({featuredPrograms.length})</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-300/80 text-stone-600 font-semibold uppercase tracking-wider">Soon</span>
                    </button>
                  </div>
                </div>

                {/* TAB 1: MODALITY PATHWAYS */}
                {curriculumTab === 'pathways' && (
                  <div>
                    {/* Pathways Grid: 4 items on a row for lg screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {pathwaysData.map((pathway) => (
                        <motion.div
                          key={pathway.id}
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between group"
                        >
                          <div>
                            {/* Top Header Row */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="p-2.5 bg-amber-50 rounded-2xl border border-amber-100 group-hover:scale-105 transition-transform flex-shrink-0 flex items-center justify-center">
                                {pathway.icon}
                              </div>
                              <div className="flex flex-col items-end space-y-1 text-right pl-2">
                                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider leading-none">
                                  {pathway.category}
                                </span>
                                <span className="text-[10px] text-stone-500 font-medium mt-0.5">
                                  {pathway.duration}
                                </span>
                              </div>
                            </div>

                            {/* Title & Tagline */}
                            <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-1.5 group-hover:text-amber-700 transition-colors leading-snug">
                              {pathway.name}
                            </h3>
                            <p className="text-xs text-stone-600 leading-relaxed mb-2">
                              {pathway.tagline}
                            </p>
                          </div>

                          {/* Footer Action */}
                          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-amber-800">
                              {pathway.level}
                            </span>
                            <button
                              onClick={() => setActivePathwayModal(pathway)}
                              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-600 text-amber-900 hover:text-white font-semibold text-[11px] transition-all flex items-center space-x-1 group-hover:bg-amber-600 group-hover:text-white shadow-sm"
                            >
                              <span>Explore Path</span>
                              <ChevronRight className="w-3.5 h-3.5" />
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
          )}

          {/* ========================================================================= */}
          {/* 3B. 2026 FELLOWSHIP TEACHING ASSISTANTS SHOWCASE */}
          {/* ========================================================================= */}
          <section className="py-20 bg-white border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                  Meet Our Fellowship Teaching Assistants
                </h2>
                <p className="text-base text-stone-600">
                  Academic researchers and neuroscientists leading weekly hands-on coding labs and mentorship.
                </p>
              </div>

              {/* TA Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {taTeamData.map((ta) => (
                  <motion.div
                    key={ta.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedTaModal(ta)}
                    className="flex flex-col justify-between group cursor-pointer p-5 rounded-2xl bg-stone-50 hover:bg-amber-50/40 transition-all border border-stone-200/90 hover:border-amber-300 shadow-sm hover:shadow-md"
                  >
                    <div>
                      {/* Avatar */}
                      <div className="w-24 h-24 rounded-full bg-stone-100 border-2 border-amber-200/90 flex items-center justify-center shadow-sm group-hover:scale-105 transition-all duration-300 mb-3.5 overflow-hidden relative mx-auto">
                        {ta.image && (
                          <img
                            src={ta.image}
                            alt={ta.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.parentElement?.querySelector('.avatar-fallback');
                              if (fallback) (fallback as HTMLElement).classList.remove('hidden');
                            }}
                          />
                        )}
                        <div className={`avatar-fallback ${ta.image ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                          <User className="w-12 h-12 text-stone-400 group-hover:text-amber-700 transition-colors" />
                        </div>
                      </div>

                      {/* TA Name */}
                      <h3 className="text-base font-bold text-stone-900 tracking-tight text-center mb-1 group-hover:text-amber-800 transition-colors">
                        {ta.name}
                      </h3>

                      {/* Affiliation */}
                      {ta.affiliation && (
                        <p className="text-xs text-stone-500 text-center line-clamp-1 mb-2.5 font-medium">
                          {ta.affiliation}
                        </p>
                      )}

                      {/* Team Badges */}
                      <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                        {ta.teams.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${t.color}`}
                          >
                            {t.label}
                          </span>
                        ))}
                      </div>

                      {/* Research Focus Snippet */}
                      {ta.researchInterest && (
                        <p className="text-[11px] text-stone-600 line-clamp-2 text-center leading-relaxed pt-2 border-t border-stone-200/60 mb-3">
                          {ta.researchInterest}
                        </p>
                      )}
                    </div>

                    {/* View Profile Action Link */}
                    <div className="pt-2 text-center">
                      <span className="text-xs font-semibold text-amber-800 inline-flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                        <span>View Profile & Bio</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 3C. ROADMAP & ETHICAL GOVERNANCE PREVIEW */}
          {/* ========================================================================= */}
          <section className="py-20 bg-gradient-to-br from-amber-50/70 via-amber-50/30 to-white border-y border-amber-200/70 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
                  Platform Roadmap & Data Governance Engine
                </h2>
                <p className="text-base text-stone-600 leading-relaxed font-normal">
                  Built on FAIR data principles and CARE African data sovereignty guidelines for open computational research.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* 01 SynapseAI */}
                <div className="bg-white rounded-3xl p-7 border border-[#E3D9C3] hover:border-amber-400/80 shadow-md shadow-amber-900/5 hover:shadow-xl transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 uppercase tracking-wider">
                        Socratic Assistant
                      </span>
                      <Brain className="w-6 h-6 text-amber-800 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                      SynapseAI Code Tutor
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      In-notebook assistant providing guided signal processing explanations, parameter tuning feedback, and error diagnosis.
                    </p>
                  </div>
                  <div className="pt-5 border-t border-[#EBE2D0] mt-5 text-[11px] text-amber-800 font-mono flex items-center space-x-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-800" />
                    <span>In-Notebook Interactive Mentorship</span>
                  </div>
                </div>

                {/* 02 CARE Data Sovereignty */}
                <div className="bg-white rounded-3xl p-7 border border-[#E3D9C3] hover:border-emerald-400/80 shadow-md shadow-amber-900/5 hover:shadow-xl transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300/80 uppercase tracking-wider">
                        Data Sovereignty
                      </span>
                      <ShieldCheck className="w-6 h-6 text-emerald-700 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                      CARE African Bioethics
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      Bioethics framework enforcing Collective Benefit, Control, Responsibility, and Ethics across open African brain data repositories.
                    </p>
                  </div>
                  <div className="pt-5 border-t border-[#EBE2D0] mt-5 text-[11px] text-emerald-800 font-mono flex items-center space-x-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Bioethics & Data Compliance</span>
                  </div>
                </div>

                {/* 03 NeuroBench AI */}
                <div className="bg-white rounded-3xl p-7 border border-[#E3D9C3] hover:border-sky-400/80 shadow-md shadow-amber-900/5 hover:shadow-xl transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-sky-100 text-sky-900 border border-sky-300/80 uppercase tracking-wider">
                        FAIR Code Inspector
                      </span>
                      <Award className="w-6 h-6 text-sky-700 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-sky-800 transition-colors">
                      NeuroBench Code Auditor
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      Automated code inspector verifying reproducibility, random seed consistency, and FAIR data standards before capstone submission.
                    </p>
                  </div>
                  <div className="pt-5 border-t border-[#EBE2D0] mt-5 text-[11px] text-sky-800 font-mono flex items-center space-x-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-700" />
                    <span>Reproducibility & Journal Readiness</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* TA PROFILE BIO MODAL OVERLAY */}
          {/* ========================================================================= */}
          <AnimatePresence>
            {selectedTaModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
                onClick={() => setSelectedTaModal(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 15 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden my-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedTaModal(null)}
                    className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors z-10"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                    {/* Large Circular Avatar */}
                    <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-stone-100 border-2 border-amber-300 flex items-center justify-center shadow-md overflow-hidden flex-shrink-0 relative">
                      {selectedTaModal.image && (
                        <img
                          src={selectedTaModal.image}
                          alt={selectedTaModal.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentElement?.querySelector('.avatar-modal-fallback');
                            if (fallback) (fallback as HTMLElement).classList.remove('hidden');
                          }}
                        />
                      )}
                      <div className={`avatar-modal-fallback ${selectedTaModal.image ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                        <User className="w-16 h-16 text-stone-400" />
                      </div>
                    </div>

                    <div className="text-center sm:text-left space-y-2 flex-1">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mb-1">
                        {selectedTaModal.teams.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${t.color}`}
                          >
                            {t.label}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                        {selectedTaModal.name}
                      </h3>

                      {selectedTaModal.affiliation && (
                        <div className="text-sm font-semibold text-amber-800 flex items-center justify-center sm:justify-start space-x-1.5">
                          <GraduationCap className="w-4 h-4 text-amber-700 flex-shrink-0" />
                          <span>{selectedTaModal.affiliation}</span>
                        </div>
                      )}

                      {selectedTaModal.email && (
                        <div className="text-xs text-stone-500 font-mono pt-0.5 flex items-center space-x-1.5 justify-center sm:justify-start">
                          <Mail className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                          <span>{selectedTaModal.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Research Focus */}
                  {selectedTaModal.researchInterest && (
                    <div className="mb-5 bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80">
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center space-x-1.5">
                        <Microscope className="w-3.5 h-3.5 text-amber-700" />
                        <span>Research Focus & Specialization</span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
                        {selectedTaModal.researchInterest}
                      </p>
                    </div>
                  )}

                  {/* Bio */}
                  {selectedTaModal.bio && (
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono">
                        About & Biography
                      </div>
                      <p className="text-sm text-stone-600 leading-relaxed max-h-60 overflow-y-auto pr-1 font-normal whitespace-pre-line">
                        {selectedTaModal.bio}
                      </p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ========================================================================= */}
          {/* 4. COMPACT AUDIENCE / PERSONAS SECTION */}
          {/* ========================================================================= */}
          <section className="py-16 bg-white border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-stone-50 rounded-2xl p-8 border border-stone-200">
                <div className="space-y-2 text-center lg:text-left lg:max-w-md">
                  <h3 className="text-2xl font-extrabold text-stone-900">
                    Who is ABDN NeuroLearning for?
                  </h3>
                  <p className="text-sm text-stone-600">
                    Tailored pathways engineered for every stage of your neuroscience research journey.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:max-w-2xl">
                  {personaItems.map((persona, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex items-start space-x-3"
                    >
                      <div className="p-2 rounded-lg bg-amber-50 border border-amber-200/80 flex-shrink-0 flex items-center justify-center">
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
          <section className="py-20 bg-stone-900 text-white relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Start building your brain data skills today
              </h2>

              <p className="text-base sm:text-lg text-amber-100/90 max-w-2xl mx-auto font-light leading-relaxed">
                Create your ABDN account for access to structured learning pathways, progress tracking, and open African neuroscience datasets.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => openAuth('signup')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-base shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 group"
                >
                  <span>Create Free Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-stone-950" />
                </button>
              </div>

              <div className="pt-2">
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

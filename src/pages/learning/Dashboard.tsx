import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Brain,
  BookOpen,
  CheckCircle2,
  Clock,
  Code2,
  Database,
  ExternalLink,
  Flame,
  GraduationCap,
  Layers,
  LogOut,
  Play,
  Plus,
  Search,
  Sparkles,
  Terminal,
  Trophy,
  User,
  Users,
  ChevronRight,
  Download,
  AlertCircle,
  FileCode2,
  Share2,
  Calendar,
  Check,
  Zap,
  Activity,
  ArrowRight,
  ArrowLeft,
  Video,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Microscope,
  Award,
  Settings,
  HelpCircle,
  Filter,
  BarChart2,
  ShieldCheck,
  FileText,
  Copy,
  Sliders,
  Send,
  MessageSquare,
  RefreshCw,
  Presentation,
  FolderGit2,
  GitBranch,
  Target,
  X
} from 'lucide-react';
import SEO from '../../components/SEO';
import { useAuth } from '../../context/AuthContext';
import { enrollInPathway, unenrollFromPathway } from '../../services/authService';
import { recordEngagementEvent } from '../../services/elearningMetricsService';
import DashboardTopNav from '../../components/learning/DashboardTopNav';
import DashboardSidebar, { DashboardTabId } from '../../components/learning/DashboardSidebar';
import AssessmentModal from '../../components/learning/AssessmentModal';
import CertificateModal from '../../components/learning/CertificateModal';
import LessonPlayerModal from '../../components/learning/LessonPlayerModal';
import { 
  getPublishedLessons, 
  LessonWithVideoAccess, 
  modalityConfigs, 
  groupLessonsByMonthAndWeek,
  formatWeekEndingDisplay,
  ModalityType,
  fetchLessonGitHubMaterials,
  GitHubMaterialItem,
  DEFAULT_GITHUB_REPO,
  deriveDefaultGitHubPaths,
  fetchModalityCurriculum,
  ModalityCurriculumData,
  DEFAULT_CURRICULUM_REPO
} from '../../services/elearningService';
import { 
  getUserProgressMap, 
  calculateProgressMetrics, 
  UserLessonProgress
} from '../../services/progressService';

export default function Dashboard() {
  const { currentUser, userProfile, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();

  // Active view tab in the dashboard workspace
  const [activeTab, setActiveTab] = useState<DashboardTabId>('dashboard');

  // Dynamic Published Lessons from Firestore
  const [publishedLessons, setPublishedLessons] = useState<LessonWithVideoAccess[]>([]);
  const [loadingLessons, setLoadingLessons] = useState<boolean>(true);

  // Lesson Filter States
  const [sessionMonthFilter, setSessionMonthFilter] = useState<string>('All');
  const [sessionWeekFilter, setSessionWeekFilter] = useState<string>('All');
  const [sessionModalityFilter, setSessionModalityFilter] = useState<string>('All');
  const [sessionSearchQuery, setSessionSearchQuery] = useState<string>('');

  // Modal states
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [activeAssessmentTitle, setActiveAssessmentTitle] = useState('MRI Preprocessing Assessment');
  const [activeCertTitle, setActiveCertTitle] = useState('MRI Foundations & Morphometry');
  const [activeLessonTitle, setActiveLessonTitle] = useState('Lab 4: Automated FreeSurfer Cortical Surface Reconstruction');
  const [activeSelectedLesson, setActiveSelectedLesson] = useState<LessonWithVideoAccess | null>(null);

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // My Learning Filter State
  const [learningFilter, setLearningFilter] = useState<'all' | 'in_progress' | 'completed' | 'saved'>('all');
  const [selectedModalityCourse, setSelectedModalityCourse] = useState<string | null>(null);

  // Modality GitHub Learning Materials & Assignments state
  const [modalityMaterials, setModalityMaterials] = useState<GitHubMaterialItem[]>([]);
  const [modalityAssignments, setModalityAssignments] = useState<GitHubMaterialItem[]>([]);
  const [loadingModalityMaterials, setLoadingModalityMaterials] = useState<boolean>(false);
  const [modalityCurriculum, setModalityCurriculum] = useState<ModalityCurriculumData | null>(null);
  const [loadingCurriculum, setLoadingCurriculum] = useState<boolean>(false);

  // Projects submission state
  const [projectRepoUrl, setProjectRepoUrl] = useState('');
  const [projectSubmitted, setProjectSubmitted] = useState(false);

  // User Progress Map from Firestore (users/{userId}/progress)
  const [userProgressMap, setUserProgressMap] = useState<Record<string, UserLessonProgress>>({});

  // Fetch Published Lessons & User Progress from Firestore on Mount
  const loadLessonsData = async () => {
    try {
      setLoadingLessons(true);
      const data = await getPublishedLessons('ABDN-2026');
      setPublishedLessons(data);
    } catch (err) {
      console.error('Error loading published fellowship lessons:', err);
    } finally {
      setLoadingLessons(false);
    }
  };

  const loadUserProgress = async () => {
    try {
      const progress = await getUserProgressMap(currentUser?.uid);
      setUserProgressMap(progress);
    } catch (err) {
      console.error('Error loading user progress:', err);
    }
  };

  useEffect(() => {
    loadLessonsData();
    loadUserProgress();
  }, [currentUser]);

  // Compute live fellowship & modality metrics from source-of-truth progress records
  const progressMetrics = useMemo(() => {
    return calculateProgressMetrics(publishedLessons, userProgressMap, currentUser?.email);
  }, [publishedLessons, userProgressMap, currentUser?.email]);

  // Auto-redirect to ABDN public website if user logs out
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/network/learning', { replace: true });
    }
  }, [loading, currentUser, navigate]);

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName =
    userProfile?.displayName ||
    currentUser?.displayName ||
    currentUser?.email?.split('@')[0] ||
    'Fellow';

  // 4 Fellowship Modalities Base Catalog with dynamic progress calculation
  const allFellowshipModalities = useMemo(() => {
    const baseModalities = [
      {
        id: 'mri',
        name: 'MRI / fMRI',
        fullName: 'MRI & fMRI Analysis',
        icon: '🧠',
        modalityType: 'MRI/fMRI' as ModalityType,
        tagline: 'Structural T1w/T2w Scans, VBM, fMRIPrep & FreeSurfer.',
        overview: 'Master structural T1w/T2w volumetric analysis, BOLD fMRI preprocessing with fMRIPrep, FreeSurfer cortical reconstruction, and connectomics calibrated on African population cohorts.',
        duration: '16.5 Hours',
        badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
        tools: ['FreeSurfer', 'ANTs', 'CAT12', 'BIDS / HeuDiConv', 'MRIQC', 'FSL'],
      },
      {
        id: 'eeg',
        name: 'EEG',
        fullName: 'EEG Data Science',
        icon: '⚡',
        modalityType: 'EEG' as ModalityType,
        tagline: 'Microvolt Scalp Time-Series, ICA Artifact Cleaning & ERP Analysis.',
        overview: 'Explore high-density electroencephalography (EEG), time-frequency wavelet decompositions, independent component analysis (ICA) artifact cleaning, and clinical seizure classification with MNE-Python.',
        duration: '15.0 Hours',
        badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
        tools: ['MNE-Python', 'FastICA', 'EEGLAB', 'BIDS-EEG', 'SciPy', 'Wavelets'],
      },
      {
        id: 'fnirs',
        name: 'fNIRS',
        fullName: 'fNIRS Optical Imaging',
        icon: '🔴',
        modalityType: 'fNIRS' as ModalityType,
        tagline: 'Near-Infrared Spectroscopy, Optode Layouts & Hemodynamics.',
        overview: 'Master functional near-infrared spectroscopy (fNIRS), optode calibration on African hair textures, modified Beer-Lambert law calculations, and Homer3/MNE-NIRS pipelines.',
        duration: '12.0 Hours',
        badgeColor: 'text-rose-400 bg-rose-400/10 border-rose-400/30',
        tools: ['Homer3', 'MNE-NIRS', 'SNIRF', 'AtlasViewer'],
      },
      {
        id: 'ephys',
        name: 'Electrophysiology',
        fullName: 'Cellular & Systems Electrophysiology',
        icon: '📈',
        modalityType: 'Electrophysiology' as ModalityType,
        tagline: 'Spike Sorting, Microelectrode Arrays & Local Field Potentials.',
        overview: 'Decompose multi-channel extracellular spike waveforms, execute automated clustering with SpikeInterface, and compute local field potential (LFP) spectral coherence.',
        duration: '14.0 Hours',
        badgeColor: 'text-sky-400 bg-sky-400/10 border-sky-400/30',
        tools: ['SpikeInterface', 'Elephant', 'Neo', 'SciPy'],
      }
    ];

    return baseModalities.map((mod) => {
      const modalityLessons = publishedLessons.filter(
        (l) => l.modality === mod.modalityType || (mod.id === 'mri' && l.modality === 'MRI/fMRI')
      );
      const totalCount = modalityLessons.length;
      const completedCount = modalityLessons.filter((l) => {
        const key = l.id || l.contentId;
        return userProgressMap[key]?.status === 'completed';
      }).length;
      const calculatedProgress = totalCount > 0 
        ? Math.round((completedCount / totalCount) * 100) 
        : (progressMetrics.modalityBreakdown[mod.modalityType]?.percent || 0);

      return {
        ...mod,
        modulesCount: 5,
        lessonsCount: totalCount,
        progress: calculatedProgress,
        level: completedCount > 0 ? `${completedCount} of ${totalCount} Sessions Done` : 'Active Track',
        stoppedAt: totalCount > 0 ? `${completedCount} of ${totalCount} Sessions Completed` : 'Ready to begin',
      };
    });
  }, [publishedLessons, userProgressMap, progressMetrics]);

  // User's enrolled modalities from Firestore (or fallback to onboarding selections)
  const userEnrolledList = userProfile?.enrolledPathways || [];

  const myEnrolledModalities = allFellowshipModalities.filter((modality) => {
    if (userEnrolledList.length > 0) {
      return userEnrolledList.some(
        (p) =>
          p.pathwayName.toLowerCase().includes(modality.name.toLowerCase()) ||
          modality.fullName.toLowerCase().includes(p.pathwayName.toLowerCase())
      );
    }
    if (userProfile?.selectedPathway) {
      return (
        userProfile.selectedPathway.toLowerCase().includes(modality.name.toLowerCase()) ||
        modality.fullName.toLowerCase().includes(userProfile.selectedPathway.toLowerCase())
      );
    }
    return modality.id === 'mri' || modality.id === 'eeg';
  });

  const availableToEnrollModalities = allFellowshipModalities.filter(
    (modality) => !myEnrolledModalities.some((m) => m.id === modality.id)
  );

  const handleEnrollInNewPathway = async (pathwayFullName: string) => {
    if (currentUser) {
      try {
        await enrollInPathway(currentUser.uid, pathwayFullName);
        
        // Telemetry: Record track enrollment event
        recordEngagementEvent({
          type: 'enrollment',
          userId: currentUser.uid,
          userEmail: currentUser.email,
          userName: currentUser.displayName,
          modality: pathwayFullName,
        });

        await refreshProfile();
        setToastMessage(`Enrolled in ${pathwayFullName}! Added to your learning library.`);
        setTimeout(() => setToastMessage(null), 4000);
      } catch (err) {
        console.error('Error enrolling:', err);
      }
    } else {
      setToastMessage(`Enrolled in ${pathwayFullName}!`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleUnenrollFromPathway = async (pathwayName: string, pathwayFullName: string) => {
    if (currentUser) {
      try {
        await unenrollFromPathway(currentUser.uid, pathwayName);
        await refreshProfile();
        if (selectedModalityCourse) {
          const currentCourse = allFellowshipModalities.find((m) => m.id === selectedModalityCourse);
          if (
            currentCourse &&
            (currentCourse.name.toLowerCase().includes(pathwayName.toLowerCase()) ||
              currentCourse.fullName.toLowerCase().includes(pathwayFullName.toLowerCase()))
          ) {
            setSelectedModalityCourse(null);
          }
        }
        setToastMessage(`Unenrolled from ${pathwayFullName}. Track removed from your library.`);
        setTimeout(() => setToastMessage(null), 4000);
      } catch (err) {
        console.error('Error unenrolling from pathway:', err);
      }
    } else {
      setToastMessage(`Unenrolled from ${pathwayFullName}.`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  // Fetch live GitHub materials, assignments, and master curriculum whenever a modality course is selected
  useEffect(() => {
    if (selectedModalityCourse) {
      const course = allFellowshipModalities.find((m) => m.id === selectedModalityCourse);
      if (course) {
        const paths = deriveDefaultGitHubPaths(course.modalityType);
        setLoadingModalityMaterials(true);
        setLoadingCurriculum(true);
        Promise.all([
          fetchLessonGitHubMaterials(DEFAULT_GITHUB_REPO, paths.materialsPath),
          fetchLessonGitHubMaterials(DEFAULT_GITHUB_REPO, paths.assignmentPath),
          fetchModalityCurriculum(course.modalityType || course.id),
        ])
          .then(([mats, assigns, curric]) => {
            setModalityMaterials(mats);
            setModalityAssignments(assigns);
            setModalityCurriculum(curric);
          })
          .catch((err) => {
            console.warn('Error loading modality materials/curriculum from GitHub:', err);
          })
          .finally(() => {
            setLoadingModalityMaterials(false);
            setLoadingCurriculum(false);
          });
      }
    } else {
      setModalityMaterials([]);
      setModalityAssignments([]);
      setModalityCurriculum(null);
    }
  }, [selectedModalityCourse]);

  const formatFileSize = (bytes?: number) => {
    if (!bytes || bytes <= 0) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatFileDisplayName = (fileName: string) => {
    return fileName
      .replace(/\.[^/.]+$/, '') // remove extension
      .replace(/_/g, ' ') // replace underscores with spaces
      .replace(/Session\s*(\d+)/gi, 'Session $1')
      .replace(/Week\s*(\d+)/gi, 'Week $1')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Filtered published lessons from Firestore
  const filteredSessions = useMemo(() => {
    return publishedLessons.filter((lesson) => {
      // Month Filter
      if (sessionMonthFilter !== 'All' && lesson.month !== sessionMonthFilter) {
        return false;
      }
      // Week Filter
      if (sessionWeekFilter !== 'All') {
        const weekNum = parseInt(sessionWeekFilter.replace(/[^0-9]/g, ''), 10);
        if (lesson.weekNumber !== weekNum) return false;
      }
      // Modality Filter
      if (sessionModalityFilter !== 'All' && lesson.modality !== sessionModalityFilter) {
        return false;
      }
      // Search Query Filter
      if (sessionSearchQuery.trim()) {
        const q = sessionSearchQuery.toLowerCase();
        const titleMatch = lesson.title?.toLowerCase().includes(q);
        const descMatch = lesson.description?.toLowerCase().includes(q);
        const contentIdMatch = lesson.contentId?.toLowerCase().includes(q);
        const instructorMatch = lesson.instructor?.toLowerCase().includes(q);
        const topicMatch = lesson.topics?.some((t) => t.toLowerCase().includes(q));
        if (!titleMatch && !descMatch && !contentIdMatch && !instructorMatch && !topicMatch) {
          return false;
        }
      }
      return true;
    });
  }, [publishedLessons, sessionMonthFilter, sessionWeekFilter, sessionModalityFilter, sessionSearchQuery]);

  // Grouped filtered lessons
  const groupedSessions = useMemo(() => {
    return groupLessonsByMonthAndWeek(filteredSessions);
  }, [filteredSessions]);

  // Available unique months and weeks in current published lessons
  const availableMonths = useMemo(() => {
    const months = Array.from(new Set(publishedLessons.map((l) => l.month || 'August')));
    return months.length > 0 ? months : ['August', 'September', 'October'];
  }, [publishedLessons]);

  const availableWeeks = useMemo(() => {
    const weeks = Array.from(new Set(publishedLessons.map((l) => l.weekNumber || 1))).sort((a, b) => a - b);
    return weeks.length > 0 ? weeks : [1, 2, 3, 4];
  }, [publishedLessons]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleStartLesson = (lessonName: string, pathwayName: string) => {
    setActiveLessonTitle(lessonName);
    setActiveSelectedLesson(null);
    setIsLessonModalOpen(true);
  };

  const handleWatchFellowshipSession = (lesson: LessonWithVideoAccess) => {
    setActiveSelectedLesson(lesson);
    setActiveLessonTitle(lesson.title);
    setIsLessonModalOpen(true);
  };

  const handleStartAssessment = (assessmentName: string) => {
    setActiveAssessmentTitle(assessmentName);
    setIsAssessmentOpen(true);
  };

  const handleViewCertificate = (certName: string) => {
    setActiveCertTitle(certName);
    setIsCertModalOpen(true);
  };

  return (
    <>
      <SEO
        title="Personalized Research Workspace — ABDN NeuroLearning"
        description="The heart of ABDN NeuroLearning: track your MRI, EEG, fNIRS, electrophysiology and fMRI pathways, Jupyter labs, and capstone research."
        url="https://africanbraindatanetwork.com/learning/dashboard"
      />

      <div className="h-screen max-h-screen bg-[#FAF8F5] text-stone-900 font-sans flex flex-col overflow-hidden selection:bg-amber-600 selection:text-white">
        
        {/* ========================================================================= */}
        {/* 1. TOP NAVIGATION BAR */}
        {/* ========================================================================= */}
        <div className="flex-shrink-0 z-30">
          <DashboardTopNav
            onSelectTab={(tabId) => setActiveTab(tabId as DashboardTabId)}
            onSearch={(query) => {
              setSessionSearchQuery(query);
              showToast(`Filtering sessions for "${query}"...`);
            }}
            publishedLessons={publishedLessons}
            onWatchLesson={handleWatchFellowshipSession}
            onSelectModality={(modId) => {
              setSelectedModalityCourse(modId);
              setActiveTab('learning');
            }}
          />
        </div>

        {/* ========================================================================= */}
        {/* 2. BODY: LEFT SIDEBAR + MAIN CONTENT AREA */}
        {/* ========================================================================= */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
          
          {/* Left Sidebar */}
          <div className="hidden md:flex flex-col h-full flex-shrink-0 min-h-0">
            <DashboardSidebar
              activeTab={activeTab}
              onSelectTab={(tab) => setActiveTab(tab)}
              streakDays={progressMetrics.completedCount > 0 ? Math.min(progressMetrics.completedCount, 7) : 0}
              enrolledCount={myEnrolledModalities.length}
            />
          </div>

          {/* Mobile Tab Switcher */}
          <div className="md:hidden bg-white border-b border-[#EBE4D8] p-2 flex items-center space-x-2 overflow-x-auto flex-shrink-0">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'learning', label: `My Learning (${myEnrolledModalities.length})` },
              { id: 'profile', label: 'My Profile' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as DashboardTabId)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-700 text-white font-bold'
                    : 'text-stone-700 hover:text-stone-950 bg-[#FAF7F0] border border-[#E2D9C7]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content Workspace (Scrolls independently) */}
          <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-[#FAF8F5] text-stone-900 min-h-0">
            {/* ===================================================================== */}
            {/* VIEW 1: 🏠 DASHBOARD (THE HEART OF ABDN NEUROLEARNING) */}
            {/* ===================================================================== */}
            {activeTab === 'dashboard' && (
              <div className="max-w-6xl mx-auto space-y-8 relative">
                
                {/* Ambient Warm ABDN Lighting Effects */}
                <div className="absolute -top-10 -right-10 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/2 -left-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />

                {/* 1. Electrifying Greeting & Live Stats Header */}
                <div className="relative z-10 space-y-4">
                  {userProfile?.onboardingCompleted === false && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100 border border-amber-300/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-md shadow-amber-900/5"
                    >
                      <div className="flex items-center space-x-3 text-amber-900">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-700 shrink-0 ring-1 ring-amber-400/40 animate-pulse">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="font-semibold">
                          You haven't customized your fellowship plan yet. Select your target modalities and research goals!
                        </span>
                      </div>
                      <Link
                        to="/learning/onboarding"
                        className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold flex-shrink-0 transition-all shadow-md shadow-amber-900/20 hover:scale-105"
                      >
                        Personalize Plan →
                      </Link>
                    </motion.div>
                  )}

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-900 text-xs font-bold font-mono tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                        <span className="uppercase">2026 ABDN NEUROIMAGING FELLOWSHIP</span>
                      </div>
                      <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900 flex items-center space-x-2.5">
                        <span>{getGreeting()},</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900">
                          {displayName}
                        </span>
                        <span className="inline-block animate-bounce">👋</span>
                      </h1>
                      <p className="text-sm text-stone-600 font-normal">
                        Your computational neuroscience workspace and live fellowship lecture hub.
                      </p>
                    </div>

                    {/* Quick Stats Pills Ticker */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="px-3.5 py-2 rounded-xl bg-white border border-[#E8DFC9] text-xs flex items-center space-x-2 shadow-sm">
                        <Flame className="w-4 h-4 text-amber-600 animate-pulse" />
                        <span className="text-stone-500 font-mono text-[11px]">STREAK:</span>
                        <span className="font-bold text-amber-800 font-mono">
                          {progressMetrics.completedCount > 0 ? Math.min(progressMetrics.completedCount * 2 + 1, 14) : 0} Days
                        </span>
                      </div>

                      <div className="px-3.5 py-2 rounded-xl bg-white border border-[#E8DFC9] text-xs flex items-center space-x-2 shadow-sm">
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                        <span className="text-stone-500 font-mono text-[11px]">TRACKS:</span>
                        <span className="font-bold text-stone-900 font-mono">{myEnrolledModalities.length} Active</span>
                      </div>

                      <div className="px-3.5 py-2 rounded-xl bg-white border border-[#E8DFC9] text-xs flex items-center space-x-2 shadow-sm">
                        <Trophy className="w-4 h-4 text-amber-600" />
                        <span className="text-stone-500 font-mono text-[11px]">ATTENDANCE:</span>
                        <span className="font-bold text-amber-800 font-mono">{progressMetrics.overallPercent}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. FEATURE CINEMA SHOWCASE CARD (THE HERO CONTINUE LEARNING STAGE) */}
                {(() => {
                  const activeSession = progressMetrics.continueLearningLesson || publishedLessons[0];
                  if (!activeSession) return null;

                  const activeKey = activeSession.id || activeSession.contentId;
                  const activeProgress = userProgressMap[activeKey] || (activeSession.id ? userProgressMap[activeSession.id] : null) || (activeSession.contentId ? userProgressMap[activeSession.contentId] : null);
                  const isCompleted = activeProgress?.status === 'completed';
                  const isInProgress = activeProgress?.status === 'in_progress';

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-white to-[#FAF4E8] p-6 sm:p-8 border border-[#E3D9C3] shadow-xl shadow-amber-900/5 overflow-hidden group hover:border-amber-400 transition-all"
                    >
                      {/* Cinema Background Glow */}
                      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none group-hover:opacity-100 transition-opacity opacity-70" />

                      <div className="relative z-10 space-y-6">
                        
                        {/* Top Header Row */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EBE2D0] pb-4">
                          <div className="flex items-center space-x-2.5">
                            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black uppercase tracking-wider font-mono shadow-sm flex items-center space-x-1.5">
                              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                              <span>{isInProgress ? 'RESUME SESSION' : isCompleted ? 'REWATCH SESSION' : 'CONTINUE LEARNING'}</span>
                            </span>
                            {isCompleted ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-extrabold uppercase flex items-center gap-1">
                                <Check size={10} className="stroke-[3]" /> Completed
                              </span>
                            ) : isInProgress ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold uppercase flex items-center gap-1">
                                <Clock size={10} /> In Progress
                              </span>
                            ) : null}
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 rounded-xl bg-white text-stone-800 text-xs font-mono font-bold border border-[#E3D9C3] shadow-sm">
                              {activeSession.weekTitle || `Week ${activeSession.weekNumber || 1}`} · {activeSession.contentId}
                            </span>
                          </div>
                        </div>

                        {/* Middle Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          <div className="lg:col-span-8 space-y-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shadow-sm">
                                🧠
                              </div>
                              <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-800 text-xs font-mono font-bold uppercase tracking-wider border border-stone-200">
                                {activeSession.modality}
                              </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight group-hover:text-amber-800 transition-colors">
                              {activeSession.title}
                            </h2>
                            <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed line-clamp-3">
                              {activeSession.description}
                            </p>
                          </div>

                          {/* Action & Metadata Box */}
                          <div className="lg:col-span-4 p-5 rounded-2xl bg-[#FBF9F4] border border-[#EBE3D3] space-y-4 flex flex-col justify-between shadow-inner">
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs font-mono">
                                <span className="text-stone-600">Attendance & Progress</span>
                                <span className="font-extrabold text-amber-800">{progressMetrics.overallPercent}%</span>
                              </div>
                              <div className="h-2.5 w-full bg-[#ECE5D8] rounded-full overflow-hidden p-0.5 border border-[#DFD6C3]">
                                <div
                                  className="h-full bg-gradient-to-r from-amber-600 to-amber-500 rounded-full transition-all duration-500 shadow-sm"
                                  style={{ width: `${Math.max(progressMetrics.overallPercent, progressMetrics.completedCount > 0 ? 8 : 0)}%` }}
                                />
                              </div>
                              <div className="text-[10px] text-stone-500 font-mono flex items-center justify-between pt-0.5">
                                <span>{progressMetrics.completedCount} of {publishedLessons.length} sessions</span>
                                <span>{activeSession.durationMinutes || 75} mins</span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleWatchFellowshipSession(activeSession)}
                              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-black text-sm shadow-md shadow-amber-900/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                            >
                              <Play className="w-4 h-4 fill-current" />
                              <span>
                                {isCompleted ? 'Rewatch Recording →' : isInProgress ? 'Resume Recording →' : 'Watch Recording →'}
                              </span>
                            </button>

                            <div className="text-[10px] text-stone-500 font-mono text-center truncate">
                              Instructor: <strong className="text-stone-800">{activeSession.instructor || 'ABDN Specialist'}</strong>
                            </div>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  );
                })()}

                {/* 3. VIBRANT MODALITY TRACK CARDS ("MY LEARNING PATHS") */}
                <div className="space-y-4 pt-4 border-t border-[#E8DFC9]">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-xl font-extrabold text-stone-900 flex items-center space-x-2">
                        <span>My Learning Paths</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-mono font-bold border border-amber-300">
                          {myEnrolledModalities.length} Enrolled
                        </span>
                      </h3>
                      <p className="text-xs text-stone-600">
                        Your personalized neuroimaging fellowship modalities and dataset processing tracks.
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Link
                        to="/learning/onboarding"
                        className="text-xs text-stone-600 hover:text-amber-800 transition-colors hidden sm:block font-semibold"
                      >
                        Adjust Goals
                      </Link>
                      <button
                        onClick={() => setActiveTab('learning')}
                        className="text-xs text-amber-900 hover:text-amber-800 font-bold flex items-center space-x-1 bg-amber-100/80 px-3 py-1.5 rounded-xl border border-amber-300 transition-all hover:bg-amber-200/80 shadow-sm"
                      >
                        <span>Explore Library</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {myEnrolledModalities.map((modality) => {
                      const isMri = modality.id === 'mri';
                      const isEeg = modality.id === 'eeg';
                      const isFnirs = modality.id === 'fnirs';

                      const progressColor = isMri
                        ? 'bg-amber-600'
                        : isEeg
                        ? 'bg-emerald-600'
                        : isFnirs
                        ? 'bg-rose-600'
                        : 'bg-amber-700';

                      return (
                        <motion.div
                          key={modality.id}
                          whileHover={{ y: -4 }}
                          className="p-5 rounded-2xl bg-white border border-[#EBE4D8] hover:border-amber-500 shadow-md shadow-stone-900/5 hover:shadow-xl hover:shadow-amber-900/10 transition-all flex flex-col justify-between space-y-4 group"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2.5">
                                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                  {modality.icon}
                                </div>
                                <div>
                                  <h4 className="font-bold text-sm text-stone-900 group-hover:text-amber-800 transition-colors">
                                    {modality.name}
                                  </h4>
                                  <span className="text-[10px] font-mono text-stone-500">{modality.duration}</span>
                                </div>
                              </div>

                              <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                                {modality.progress > 0 ? `${modality.progress}%` : 'Active'}
                              </span>
                            </div>

                            <p className="text-xs text-stone-600 leading-snug line-clamp-2">{modality.tagline}</p>

                            {/* Dynamic Progress Bar */}
                            <div className="space-y-1">
                              <div className="h-2 w-full bg-[#ECE5D8] rounded-full overflow-hidden p-0.5 border border-[#DFD6C3]">
                                <div
                                  className={`h-full ${progressColor} rounded-full transition-all duration-500`}
                                  style={{ width: `${Math.max(modality.progress, 5)}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedModalityCourse(modality.id);
                              setActiveTab('learning');
                            }}
                            className="pt-2.5 text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center justify-between border-t border-[#F0E9DC] group-hover:translate-x-0.5 transition-transform"
                          >
                            <span>Open Track Workspace</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. DYNAMIC FELLOWSHIP WEEKLY SESSIONS & RECORDED LECTURES */}
                <div className="space-y-6 pt-6 border-t border-[#E8DFC9]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-2.5">
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono uppercase font-black">
                          Firebase Live Stream
                        </span>
                        <h3 className="text-xl font-extrabold text-stone-900">
                          Fellowship Weekly Sessions & Recorded Lectures
                        </h3>
                      </div>
                      <p className="text-xs text-stone-600 mt-1">
                        Dynamic multi-modality fellowship sessions managed directly from the ABDN Admin Dashboard. Grouped by Month → Week → Modality.
                      </p>
                    </div>

                    <button
                      onClick={loadLessonsData}
                      disabled={loadingLessons}
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-bold transition-all shadow-sm self-start md:self-auto"
                      title="Refresh from Firebase"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 text-amber-700 ${loadingLessons ? 'animate-spin' : ''}`} />
                      <span>{loadingLessons ? 'Syncing...' : 'Sync Lessons'}</span>
                    </button>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#EBE4D8] space-y-4 shadow-lg shadow-stone-900/5">
                    
                    {/* Top Row: Search + Month Selector */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                      
                      {/* Search Bar */}
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search sessions by title, topic, content ID, or instructor..."
                          value={sessionSearchQuery}
                          onChange={(e) => setSessionSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#E2D9C7] text-xs text-stone-900 placeholder-stone-500 focus:outline-none focus:border-amber-600 transition-colors"
                        />
                      </div>

                      {/* Month Filter */}
                      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
                        <span className="text-[11px] text-stone-500 font-mono uppercase mr-1 hidden sm:inline">Month:</span>
                        {['All', ...availableMonths].map((month) => (
                          <button
                            key={month}
                            onClick={() => setSessionMonthFilter(month)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                              sessionMonthFilter === month
                                ? 'bg-amber-700 text-white shadow-md shadow-amber-900/20'
                                : 'bg-[#FAF7F0] text-stone-700 hover:text-stone-900 border border-[#E2D9C7]'
                            }`}
                          >
                            {month}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Row: Week & Modality Filters */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#EBE2D0] text-xs">
                      
                      {/* Week Selectors */}
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[11px] text-stone-500 font-mono uppercase mr-1">Week:</span>
                        <button
                          onClick={() => setSessionWeekFilter('All')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                            sessionWeekFilter === 'All'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                              : 'bg-[#FAF7F0] text-stone-700 hover:text-stone-900 border border-[#E2D9C7]'
                          }`}
                        >
                          All Weeks
                        </button>
                        {availableWeeks.map((wk) => (
                          <button
                            key={wk}
                            onClick={() => setSessionWeekFilter(`Week ${wk}`)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                              sessionWeekFilter === `Week ${wk}`
                                ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                                : 'bg-[#FAF7F0] text-stone-700 hover:text-stone-900 border border-[#E2D9C7]'
                            }`}
                          >
                            Week {wk}
                          </button>
                        ))}
                      </div>

                      {/* Modality Chips */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] text-stone-500 font-mono uppercase mr-1">Modality:</span>
                        {[
                          { id: 'All', label: 'All Modalities' },
                          { id: 'MRI/fMRI', label: 'MRI / fMRI' },
                          { id: 'EEG', label: 'EEG' },
                          { id: 'fNIRS', label: 'fNIRS' },
                          { id: 'Electrophysiology', label: 'Electrophysiology' },
                        ].map((m) => (
                          <button
                            key={m.id}
                            onClick={() => setSessionModalityFilter(m.id)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                              sessionModalityFilter === m.id
                                ? 'bg-amber-800 text-white border border-amber-900 shadow-sm'
                                : 'bg-[#FAF7F0] text-stone-700 hover:text-stone-900 border border-[#E2D9C7]'
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Sessions Grouped Listing */}
                  {loadingLessons ? (
                    <div className="p-12 text-center rounded-3xl bg-white border border-[#EBE4D8] space-y-3">
                      <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
                      <div className="text-xs text-stone-600 font-mono">Loading published fellowship sessions from Firebase...</div>
                    </div>
                  ) : groupedSessions.length === 0 ? (
                    <div className="p-12 text-center rounded-3xl bg-white border border-[#EBE4D8] space-y-3">
                      <div className="text-3xl">🔍</div>
                      <h4 className="font-bold text-sm text-stone-900">No matching fellowship sessions found</h4>
                      <p className="text-xs text-stone-600 max-w-sm mx-auto">
                        Try adjusting your search query, month, or modality filter to discover available sessions.
                      </p>
                      <button
                        onClick={() => {
                          setSessionMonthFilter('All');
                          setSessionWeekFilter('All');
                          setSessionModalityFilter('All');
                          setSessionSearchQuery('');
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-xs font-bold text-white shadow-sm"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {groupedSessions.map((group) => (
                        <div key={group.month} className="space-y-6">
                          
                          {/* Month Header Banner */}
                          <div className="flex items-center space-x-3 border-b border-[#E8DFC9] pb-3">
                            <Calendar className="w-4 h-4 text-amber-700" />
                            <h4 className="text-lg font-black text-stone-900 uppercase tracking-wider">
                              {group.month} Fellowship Schedule
                            </h4>
                            <span className="text-xs font-mono text-amber-900 font-semibold bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                              {group.weeks.reduce((acc, w) => acc + w.lessons.length, 0)} Sessions
                            </span>
                          </div>

                          {/* Weeks within Month */}
                          <div className="space-y-6">
                            {group.weeks.map((week) => (
                              <div
                                key={`${group.month}-week-${week.weekNumber}`}
                                className="p-5 sm:p-6 rounded-3xl bg-[#FAF7F2] border border-[#E5DDD0] space-y-4 shadow-sm"
                              >
                                {/* Week Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E0D7C7] pb-3">
                                  <div className="flex items-center space-x-3">
                                    <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-900 font-mono font-black text-xs border border-amber-300">
                                      {week.weekTitle}
                                    </span>
                                    {week.weekEnding && (
                                      <span className="text-xs text-stone-600">
                                        Week Ending: <strong className="text-stone-900">{formatWeekEndingDisplay(week.weekEnding)}</strong>
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[11px] text-stone-500 font-mono">
                                    {week.lessons.length} Multi-Modality {week.lessons.length === 1 ? 'Session' : 'Sessions'}
                                  </span>
                                </div>

                                {/* Multi-Modality Lesson Cards Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {week.lessons.map((lesson) => {
                                    const modConfig = modalityConfigs[lesson.modality] || {
                                      name: lesson.modality,
                                      shortCode: 'MOD',
                                      color: '#b45309',
                                      badgeBg: 'bg-amber-100 border-amber-300',
                                      badgeText: 'text-amber-900'
                                    };

                                    const hasValidRecording = lesson.hasRecording || Boolean(lesson.videoAccess?.recordingUrl);
                                    const sessionKey = lesson.id || lesson.contentId;
                                    const sessionProgress = userProgressMap[sessionKey] || (lesson.id ? userProgressMap[lesson.id] : null) || (lesson.contentId ? userProgressMap[lesson.contentId] : null);
                                    const isSessionCompleted = sessionProgress?.status === 'completed';
                                    const isSessionInProgress = sessionProgress?.status === 'in_progress';

                                    return (
                                      <div
                                        key={lesson.id || lesson.contentId}
                                        className={`p-5 rounded-2xl bg-white border transition-all flex flex-col justify-between space-y-4 group shadow-md hover:shadow-xl ${
                                          isSessionCompleted 
                                            ? 'border-emerald-300 bg-emerald-50/30'
                                            : isSessionInProgress
                                            ? 'border-amber-400 bg-amber-50/20'
                                            : 'border-[#EBE4D8] hover:border-amber-500'
                                        }`}
                                      >
                                        <div className="space-y-3">
                                          
                                          {/* Top Badges: Modality & Content ID & Progress State */}
                                          <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center space-x-2">
                                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${modConfig.badgeBg} ${modConfig.badgeText}`}>
                                                {lesson.modality}
                                              </span>
                                              <span className="text-[10px] font-mono bg-[#F5EFE4] text-stone-700 px-2 py-0.5 rounded border border-[#E5DDD0]">
                                                {lesson.contentId}
                                              </span>
                                            </div>

                                            <div className="flex items-center space-x-1.5">
                                              {isSessionCompleted ? (
                                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-black uppercase flex items-center gap-1">
                                                  <Check size={10} className="stroke-[3]" /> Completed
                                                </span>
                                              ) : isSessionInProgress ? (
                                                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black uppercase flex items-center gap-1">
                                                  <Clock size={10} /> In Progress
                                                </span>
                                              ) : (
                                                <span className="text-[10px] font-mono text-stone-500 font-semibold">
                                                  {lesson.durationMinutes || 60} mins
                                                </span>
                                              )}
                                            </div>
                                          </div>

                                          {/* Title & Description */}
                                          <div className="space-y-1.5">
                                            <h5 className="font-extrabold text-sm sm:text-base text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-2">
                                              {lesson.title}
                                            </h5>
                                            <p className="text-xs text-stone-600 font-normal leading-relaxed line-clamp-3">
                                              {lesson.description || 'Comprehensive fellowship session covering theoretical physics, pipeline execution, and open dataset processing.'}
                                            </p>
                                          </div>

                                          {/* Instructor details */}
                                          <div className="flex items-center space-x-2 text-xs text-stone-600 pt-1">
                                            <User className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                                            <span className="truncate">
                                              <strong className="text-stone-800">{lesson.instructor || 'ABDN Specialist'}</strong>
                                              {lesson.instructorTitle ? ` · ${lesson.instructorTitle}` : ''}
                                            </span>
                                          </div>

                                          {/* Topics Chips */}
                                          {lesson.topics && lesson.topics.length > 0 && (
                                            <div className="flex flex-wrap gap-1 pt-1">
                                              {lesson.topics.slice(0, 3).map((topic, tIdx) => (
                                                <span
                                                  key={tIdx}
                                                  className="px-2 py-0.5 rounded-md bg-[#F4EFE6] border border-[#E3DBCF] text-[10px] font-mono text-stone-700"
                                                >
                                                  {topic}
                                                </span>
                                              ))}
                                              {lesson.topics.length > 3 && (
                                                <span className="text-[10px] font-mono text-stone-500 self-center">
                                                  +{lesson.topics.length - 3} more
                                                </span>
                                              )}
                                            </div>
                                          )}
                                        </div>

                                        {/* Bottom Action Footer */}
                                        <div className="pt-3 border-t border-[#EBE2D0] flex items-center justify-between gap-2 text-xs">
                                          {hasValidRecording ? (
                                            <button
                                              onClick={() => handleWatchFellowshipSession(lesson)}
                                              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-sm ${
                                                isSessionCompleted
                                                  ? 'bg-stone-900 hover:bg-black text-white font-bold'
                                                  : isSessionInProgress
                                                  ? 'bg-amber-700 hover:bg-amber-800 text-white shadow-amber-900/20'
                                                  : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-900/20'
                                              }`}
                                            >
                                              <Play className="w-3.5 h-3.5 fill-current" />
                                              <span>
                                                {isSessionCompleted ? 'Rewatch Session' : isSessionInProgress ? 'Resume Session' : 'Watch Session'}
                                              </span>
                                              <span className="text-[10px] font-normal opacity-80 font-mono">({lesson.durationMinutes || 75}m)</span>
                                            </button>
                                          ) : (
                                            <div className="w-full py-2 px-3 rounded-xl bg-[#FAF7F0] border border-[#E2D9C7] text-stone-500 text-[11px] font-medium flex items-center justify-center space-x-1.5">
                                              <Clock className="w-3.5 h-3.5 text-stone-500" />
                                              <span>Recording coming soon/unavailable</span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 5. FELLOWSHIP MILESTONES & PROFILE OVERVIEW */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  
                  {/* Fellowship Milestone Tracker Card */}
                  <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#EBE4D8] space-y-5 flex flex-col justify-between shadow-lg shadow-stone-900/5">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-extrabold text-stone-900 flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-amber-700" />
                          <span>Fellowship Milestone Tracker</span>
                        </h3>
                        <span className="text-[10px] font-mono text-amber-900 font-bold uppercase bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                          Cohort 2026
                        </span>
                      </div>

                      <div className="p-4.5 rounded-2xl bg-[#FAF7F0] border border-[#E5DEC5] space-y-2.5 shadow-inner">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-stone-800 font-bold">Session Attendance & Lecture Progress</span>
                          <span className="text-amber-800 font-mono font-black">{progressMetrics.overallPercent}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-[#ECE5D8] rounded-full overflow-hidden p-0.5 border border-[#DFD6C3]">
                          <div
                            className="h-full bg-gradient-to-r from-amber-600 to-amber-500 rounded-full transition-all duration-500 shadow-sm"
                            style={{ width: `${progressMetrics.overallPercent}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-stone-600 font-mono pt-1">
                          <span>{progressMetrics.completedCount} of {publishedLessons.length} sessions attended</span>
                          <span>{myEnrolledModalities.length} active tracks</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#E5DEC5] text-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-bold text-stone-900 text-xs">Phase 1: Live Lectures & Recordings</div>
                            <div className="text-[11px] text-stone-600">Watch weekly fellowship sessions and study lecture slides</div>
                          </div>
                          <span className="text-[10px] font-mono uppercase font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                            Active
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-[#E5DEC5]">
                          <div className="space-y-0.5">
                            <div className="font-bold text-stone-800 text-xs">Phase 2: GitHub Code & Lab Submissions</div>
                            <div className="text-[11px] text-stone-600">Push weekly Jupyter notebooks to <code className="text-amber-900 font-mono text-[10px]">participants/</code></div>
                          </div>
                          <span className="text-[10px] font-mono uppercase font-black text-sky-900 bg-sky-100 px-2 py-0.5 rounded-full border border-sky-300">
                            Hands-on
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('learning')}
                      className="w-full py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-black text-xs transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-amber-900/20"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>View All Learning Paths →</span>
                    </button>
                  </div>

                  {/* Profile Summary Card */}
                  <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#EBE4D8] space-y-5 flex flex-col justify-between shadow-lg shadow-stone-900/5">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-extrabold text-stone-900 flex items-center space-x-2">
                          <User className="w-4 h-4 text-amber-700" />
                          <span>Researcher Profile</span>
                        </h3>
                        <span className="text-[10px] font-mono text-amber-900 font-bold uppercase bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                          2026 ABDN Scholar
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 p-4 rounded-2xl bg-[#FAF7F0] border border-[#E5DEC5] shadow-inner">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-xl font-black text-white shadow-md flex-shrink-0">
                          {displayName.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="font-extrabold text-sm text-stone-900 truncate">{displayName}</div>
                          <div className="text-xs text-stone-600 truncate">{currentUser?.email}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                        <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E5DEC5]">
                          <div className="text-[10px] text-stone-500 uppercase">MODALITIES</div>
                          <div className="font-extrabold text-stone-900 text-sm">{myEnrolledModalities.length}</div>
                        </div>
                        <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E5DEC5]">
                          <div className="text-[10px] text-stone-500 uppercase">SESSIONS</div>
                          <div className="font-extrabold text-stone-900 text-sm">{publishedLessons.length}</div>
                        </div>
                        <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E5DEC5]">
                          <div className="text-[10px] text-stone-500 uppercase">COMPLETED</div>
                          <div className="font-extrabold text-amber-800 text-sm">{progressMetrics.completedCount}</div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('profile')}
                      className="w-full py-3 rounded-xl bg-[#FAF7F0] hover:bg-[#F3EDE0] text-stone-800 border border-[#E5DEC5] text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-sm"
                    >
                      <User className="w-4 h-4 text-amber-700" />
                      <span>View Full Profile →</span>
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* ===================================================================== */}
            {/* VIEW 2: 📚 MY LEARNING (COURSE LIBRARY & ENROLLED PATHS) */}
            {/* ===================================================================== */}
            {activeTab === 'learning' && (() => {
              const inProgressList = myEnrolledModalities.filter((m) => m.progress > 0 && m.progress < 100);
              const completedList = myEnrolledModalities.filter((m) => m.progress === 100);
              
              if (selectedModalityCourse) {
                const currentCourse = allFellowshipModalities.find((m) => m.id === selectedModalityCourse) || myEnrolledModalities[0];
                
                // Get dynamic Firestore live sessions matching this specific modality track
                const modalitySessions = publishedLessons.filter((l) => {
                  if (currentCourse.id === 'mri') return l.modality === 'MRI/fMRI' || l.modality?.toLowerCase().includes('mri');
                  if (currentCourse.id === 'eeg') return l.modality === 'EEG';
                  if (currentCourse.id === 'fnirs') return l.modality === 'fNIRS';
                  if (currentCourse.id === 'ephys') return l.modality === 'Electrophysiology';
                  return l.modality === currentCourse.modalityType;
                });

                return (
                  <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
                    
                    {/* Back Button */}
                    <div>
                      <button
                        onClick={() => setSelectedModalityCourse(null)}
                        className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-amber-300 text-xs font-semibold transition-all group"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        <span>Back to All Enrolled Pathways</span>
                      </button>
                    </div>

                    {/* Modality Course Header Banner */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-white to-[#FAF4E8] border border-[#E3D9C3] space-y-6 shadow-xl shadow-amber-900/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
                      
                      <div className="relative z-10 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-3xl p-2.5 bg-amber-100 rounded-2xl border border-amber-300">
                              {currentCourse.icon}
                            </span>
                            <div>
                              <div className="text-[11px] font-mono font-bold text-amber-800 uppercase tracking-widest">
                                ABDN FELLOWSHIP MODALITY TRACK
                              </div>
                              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                                {currentCourse.fullName}
                              </h2>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-bold">
                              {modalitySessions.length} Live Sessions Published
                            </span>

                            <button
                              onClick={() => handleUnenrollFromPathway(currentCourse.name, currentCourse.fullName)}
                              className="px-3 py-1 rounded-full bg-white hover:bg-rose-50 text-stone-600 hover:text-rose-700 border border-[#E2D9C7] hover:border-rose-300 text-xs font-semibold transition-all flex items-center space-x-1.5 shadow-sm"
                              title={`Unenroll from ${currentCourse.fullName}`}
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Unenroll Track</span>
                            </button>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal max-w-3xl">
                          {currentCourse.overview}
                        </p>

                        {/* Tools / Pipelines Chips */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-[11px] text-stone-600 font-mono uppercase font-bold">Pipelines & Tools:</span>
                          {currentCourse.tools.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-0.5 rounded-lg bg-white border border-[#E2D9C7] text-stone-800 text-[11px] font-mono shadow-sm"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Quick Watch Top Session CTA */}
                        {modalitySessions.length > 0 && (
                          <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#EBE4D8]">
                            <div className="space-y-1">
                              <span className="text-[11px] text-stone-600 font-mono font-medium">Latest Published Session:</span>
                              <div className="text-xs font-bold text-stone-900 flex items-center space-x-2">
                                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                                <span>{modalitySessions[0].title} ({modalitySessions[0].contentId})</span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleWatchFellowshipSession(modalitySessions[0])}
                              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs shadow-md shadow-amber-900/20 transition-all flex items-center justify-center space-x-2"
                            >
                              <Play className="w-3.5 h-3.5 fill-white" />
                              <span>Watch Latest Recording →</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* DYNAMIC FIRESTORE SESSIONS FOR THIS MODALITY */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-[#EBE4D8] pb-3">
                        <div>
                          <h3 className="text-lg font-bold text-stone-900 flex items-center space-x-2">
                            <Video className="w-4 h-4 text-amber-700" />
                            <span>Live Fellowship Sessions & Recorded Lectures</span>
                          </h3>
                          <p className="text-xs text-stone-600">
                            Published sessions for {currentCourse.fullName} from the ABDN content database ({modalitySessions.length} available).
                          </p>
                        </div>
                      </div>

                      {modalitySessions.length === 0 ? (
                        <div className="p-8 text-center rounded-3xl bg-white border border-[#EBE4D8] text-xs text-stone-600 shadow-sm">
                          No live recorded sessions published for this modality yet. Check back soon as new sessions are published weekly.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {modalitySessions.map((session) => (
                            <div
                              key={session.id || session.contentId}
                              className="p-5 rounded-2xl bg-white border border-[#EBE4D8] hover:border-amber-500 transition-all flex flex-col justify-between space-y-4 shadow-md shadow-stone-900/5 group"
                            >
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
                                    {session.contentId}
                                  </span>
                                  <span className="text-[11px] font-mono text-stone-600 font-medium">
                                    {session.month} • {session.weekTitle || `Week ${session.weekNumber}`}
                                  </span>
                                </div>

                                <div>
                                  <h4 className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-2">
                                    {session.title}
                                  </h4>
                                  <p className="text-xs text-stone-600 font-normal leading-relaxed line-clamp-3 mt-1">
                                    {session.description}
                                  </p>
                                </div>

                                <div className="flex items-center space-x-2 text-xs text-stone-600">
                                  <User className="w-3.5 h-3.5 text-amber-700" />
                                  <span>
                                    <strong className="text-stone-800">{session.instructor || 'ABDN Specialist'}</strong>
                                    {session.instructorTitle ? ` · ${session.instructorTitle}` : ''}
                                  </span>
                                </div>
                              </div>

                              <div className="pt-3 border-t border-[#EBE4D8] flex items-center justify-between">
                                <button
                                  onClick={() => handleWatchFellowshipSession(session)}
                                  className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-sm"
                                >
                                  <Play className="w-3.5 h-3.5 fill-white" />
                                  <span>Watch Session on Zoom</span>
                                  <span className="text-[10px] opacity-80">({session.durationMinutes || 60}m)</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* MASTER FELLOWSHIP CURRICULUM & SYLLABUS (GITHUB REPO SYNC) */}
                    <div className="space-y-6 pt-4 border-t border-[#EBE4D8]">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EBE4D8] pb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-bold text-stone-900 flex items-center space-x-2">
                              <BookOpen className="w-5 h-5 text-amber-700" />
                              <span>Official Fellowship Curriculum & Syllabus</span>
                            </h3>
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                              GitHub Live Synced
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 mt-0.5">
                            Official 5-month teaching curriculum and weekly learning objectives from <code className="text-amber-900 font-mono">{DEFAULT_CURRICULUM_REPO}</code>.
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          {modalityCurriculum?.githubUrl && (
                            <a
                              href={modalityCurriculum.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-[#E2D9C7] text-amber-800 hover:text-amber-900 text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
                            >
                              <span>View Raw Curriculum</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Course Objectives / Overview Banner if present */}
                      {modalityCurriculum?.objectives && modalityCurriculum.objectives.length > 0 && (
                        <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2.5 shadow-sm">
                          <div className="text-[11px] font-mono font-bold text-amber-900 uppercase tracking-wider flex items-center space-x-1.5">
                            <Target className="w-3.5 h-3.5 text-amber-700" />
                            <span>Core Course Learning Objectives</span>
                          </div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-stone-700">
                            {modalityCurriculum.objectives.map((obj, oIdx) => (
                              <li key={oIdx} className="flex items-start space-x-2">
                                <span className="text-amber-400 font-bold mt-0.5">✓</span>
                                <span className="leading-relaxed">{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Modules & Weeks List */}
                      {loadingCurriculum ? (
                        <div className="p-8 text-center rounded-3xl bg-stone-900/40 border border-stone-800 space-y-3">
                          <RefreshCw className="w-6 h-6 text-amber-400 animate-spin mx-auto" />
                          <div className="text-xs text-stone-400">Loading master curriculum from GitHub...</div>
                        </div>
                      ) : (
                        <div className="space-y-5">
                          {(modalityCurriculum?.modules || []).map((module) => (
                            <div
                              key={module.number}
                              className="p-5 sm:p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-4 shadow-sm"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-stone-800/80 pb-3">
                                <div className="space-y-1">
                                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                                    {module.monthName ? module.monthName.toUpperCase() : `MODULE ${module.number}`}
                                  </span>
                                  <h4 className="font-bold text-sm sm:text-base text-white">
                                    {module.title}
                                  </h4>
                                  {module.learningObjective && (
                                    <div className="text-xs text-stone-300 flex items-start space-x-1.5 pt-0.5">
                                      <span className="text-amber-400 font-bold flex-shrink-0">🎯 Objective:</span>
                                      <span className="font-light leading-relaxed">{module.learningObjective}</span>
                                    </div>
                                  )}
                                </div>

                                <span className="text-[11px] text-stone-500 font-mono whitespace-nowrap self-start sm:self-auto">
                                  {module.topics.length} Weekly Topics
                                </span>
                              </div>

                              {/* Topics & Weekly Items */}
                              <div className="divide-y divide-stone-800/60">
                                {module.topics.map((topic, tIdx) => (
                                  <div
                                    key={tIdx}
                                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-stone-950/40 px-2 rounded-xl transition-colors group"
                                  >
                                    <div className="flex items-start space-x-3 min-w-0">
                                      <div className="w-6 h-6 rounded-lg bg-stone-800 group-hover:bg-amber-600/30 text-amber-400 border border-stone-700 flex items-center justify-center flex-shrink-0 text-[10px] font-mono font-bold mt-0.5 transition-colors">
                                        {topic.weekNumber || tIdx + 1}
                                      </div>

                                      <div className="min-w-0 space-y-1">
                                        <div className="font-semibold text-xs sm:text-sm text-stone-200 group-hover:text-white leading-snug">
                                          {topic.title}
                                        </div>

                                        {topic.todo && (
                                          <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-mono">
                                            <span className="font-bold uppercase">TO DO:</span>
                                            <span>{topic.todo}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Action button */}
                                    <div className="flex items-center space-x-2 flex-shrink-0 self-end sm:self-auto">
                                      <button
                                        onClick={() => handleStartLesson(topic.title, currentCourse.fullName)}
                                        className="px-3 py-1 rounded-lg bg-stone-800 hover:bg-amber-600 text-stone-300 hover:text-white text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm"
                                      >
                                        <Play className="w-3 h-3 fill-current" />
                                        <span>Study Topic</span>
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Extra Module-Level Lecture Materials if present */}
                              {module.lectureMaterials && module.lectureMaterials.length > 0 && (
                                <div className="pt-3 border-t border-stone-800/80 space-y-2">
                                  <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                                    Direct Lecture Resources:
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {module.lectureMaterials.map((mat, mIdx) => (
                                      <a
                                        key={mIdx}
                                        href={mat.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1 rounded-lg bg-stone-950 hover:bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                                      >
                                        <span>{mat.label}</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* GITHUB LEARNING MATERIALS & LECTURE SLIDES SECTION (LIST VIEW) */}
                    {(() => {
                      const paths = deriveDefaultGitHubPaths(currentCourse.modalityType);
                      const slides = modalityMaterials.filter((m) => m.category === 'slides');
                      const assignments = [
                        ...modalityAssignments,
                        ...modalityMaterials.filter((m) => m.category === 'code' || m.name.endsWith('.ipynb'))
                      ];
                      const uniqueAssignments = Array.from(new Map(assignments.map(item => [item.path, item])).values());
                      const notes = modalityMaterials.filter((m) => m.category === 'notes' || m.name.endsWith('.md') || m.name.endsWith('.docx.pdf'));

                      return (
                        <div className="space-y-6 pt-4 border-t border-stone-800">
                          {/* Section Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                                  <FolderGit2 className="w-5 h-5 text-amber-400" />
                                  <span>Fellowship Learning Materials & Slides</span>
                                </h3>
                                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
                                  GitHub Live Sync
                                </span>
                              </div>
                              <p className="text-xs text-stone-400 mt-0.5">
                                Live synchronized lecture slides, PDF presentations, and coding assignments from <code className="text-amber-300 font-mono">/{paths.materialsPath}</code>.
                              </p>
                            </div>

                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  setLoadingModalityMaterials(true);
                                  Promise.all([
                                    fetchLessonGitHubMaterials(DEFAULT_GITHUB_REPO, paths.materialsPath),
                                    fetchLessonGitHubMaterials(DEFAULT_GITHUB_REPO, paths.assignmentPath),
                                  ])
                                    .then(([mats, assigns]) => {
                                      setModalityMaterials(mats);
                                      setModalityAssignments(assigns);
                                    })
                                    .finally(() => setLoadingModalityMaterials(false));
                                }}
                                disabled={loadingModalityMaterials}
                                className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 transition-colors"
                                title="Refresh materials from GitHub"
                              >
                                <RefreshCw className={`w-3.5 h-3.5 ${loadingModalityMaterials ? 'animate-spin text-amber-400' : ''}`} />
                              </button>

                              <a
                                href={`https://github.com/${DEFAULT_GITHUB_REPO}/tree/main/${paths.materialsPath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-amber-400 hover:text-amber-300 text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-sm"
                              >
                                <span>Browse on GitHub</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>

                          {/* Loading Skeleton */}
                          {loadingModalityMaterials ? (
                            <div className="p-8 text-center rounded-3xl bg-stone-900/40 border border-stone-800 space-y-3">
                              <RefreshCw className="w-6 h-6 text-amber-400 animate-spin mx-auto" />
                              <div className="text-xs text-stone-400">Loading lecture materials and assignments from GitHub repository...</div>
                            </div>
                          ) : (
                            <div className="space-y-6">
                              
                              {/* MODULE CARD 1: LECTURE SLIDES & PRESENTATION DECKS */}
                              <div className="p-5 sm:p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-4 shadow-sm">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
                                  <div>
                                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                                      <Presentation className="w-3.5 h-3.5" />
                                      <span>LECTURE PRESENTATIONS & SLIDES</span>
                                    </span>
                                    <h4 className="font-bold text-sm sm:text-base text-white mt-0.5">
                                      Official Fellowship Slide Decks & PDFs
                                    </h4>
                                    <p className="text-xs text-stone-400 font-light mt-0.5">
                                      High-resolution slides, diagrams, and theoretical overviews presented by faculty specialists.
                                    </p>
                                  </div>
                                  <span className="text-[11px] text-stone-500 font-mono whitespace-nowrap">
                                    {slides.length} Deck(s) Available
                                  </span>
                                </div>

                                {slides.length === 0 ? (
                                  <div className="p-6 text-center rounded-2xl bg-stone-950/40 border border-stone-800/80 text-xs text-stone-400">
                                    Slides for this track are being synchronized to the repository.
                                  </div>
                                ) : (
                                  <div className="divide-y divide-stone-800/60">
                                    {slides.map((slide, sIdx) => {
                                      const isCanva = slide.name.toLowerCase().includes('session 10') || slide.name.toLowerCase().includes('session_10');
                                      const canvaUrl = 'https://canva.link/0yy2dkweyjw3oqv';
                                      const isPptx = slide.name.endsWith('.pptx') || slide.name.endsWith('.ppt');

                                      return (
                                        <div
                                          key={sIdx}
                                          className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-950/40 px-2 rounded-xl transition-colors group"
                                        >
                                          <div className="flex items-center space-x-3.5 min-w-0">
                                            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                              <Presentation className="w-4 h-4" />
                                            </div>

                                            <div className="min-w-0 space-y-0.5">
                                              <div className="font-semibold text-xs sm:text-sm text-stone-200 group-hover:text-white truncate flex items-center gap-2">
                                                <span>{formatFileDisplayName(slide.name)}</span>
                                                {isCanva && (
                                                  <span className="px-2 py-0.2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-bold uppercase tracking-wider">
                                                    Canva Deck
                                                  </span>
                                                )}
                                              </div>
                                              <div className="text-[10px] text-stone-400 font-mono flex items-center space-x-2">
                                                <span className="uppercase text-amber-400/80">{isPptx ? 'PowerPoint Presentation' : 'PDF Slide Deck'}</span>
                                                {slide.size && slide.size > 0 && (
                                                  <>
                                                    <span>•</span>
                                                    <span>{formatFileSize(slide.size)}</span>
                                                  </>
                                                )}
                                                <span>•</span>
                                                <span className="text-stone-500">{slide.name}</span>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="flex items-center space-x-2 flex-shrink-0 self-end sm:self-auto">
                                            {isCanva && (
                                              <a
                                                href={canvaUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all"
                                              >
                                                <Sparkles className="w-3.5 h-3.5" />
                                                <span>Open Canva</span>
                                                <ExternalLink className="w-3 h-3" />
                                              </a>
                                            )}

                                            {slide.downloadUrl && (
                                              <a
                                                href={slide.downloadUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-colors"
                                                title="Download raw file"
                                              >
                                                <Download className="w-3.5 h-3.5" />
                                              </a>
                                            )}

                                            <a
                                              href={slide.htmlUrl}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-amber-300 hover:text-white font-semibold text-xs flex items-center space-x-1.5 transition-colors"
                                            >
                                              <span>View File</span>
                                              <ExternalLink className="w-3 h-3" />
                                            </a>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>

                              {/* MODULE CARD 2: PRACTICAL ASSIGNMENTS & JUPYTER NOTEBOOKS */}
                              {uniqueAssignments.length > 0 && (
                                <div className="p-5 sm:p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-4 shadow-sm">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
                                    <div>
                                      <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <Code2 className="w-3.5 h-3.5" />
                                        <span>HANDS-ON CODING & WEEKLY ASSIGNMENTS</span>
                                      </span>
                                      <h4 className="font-bold text-sm sm:text-base text-white mt-0.5">
                                        Interactive Jupyter Notebooks & Tasks
                                      </h4>
                                      <p className="text-xs text-stone-400 font-light mt-0.5">
                                        Executable Python environments with one-click Google Colab integration and sample datasets.
                                      </p>
                                    </div>
                                    <span className="text-[11px] text-stone-500 font-mono whitespace-nowrap">
                                      {uniqueAssignments.length} Assignment(s)
                                    </span>
                                  </div>

                                  <div className="divide-y divide-stone-800/60">
                                    {uniqueAssignments.map((item, aIdx) => {
                                      const isNotebook = item.name.endsWith('.ipynb');
                                      const colabUrl = `https://colab.research.google.com/github/${DEFAULT_GITHUB_REPO}/blob/main/${item.path}`;

                                      return (
                                        <div
                                          key={aIdx}
                                          className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-950/40 px-2 rounded-xl transition-colors group"
                                        >
                                          <div className="flex items-center space-x-3.5 min-w-0">
                                            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                              {isNotebook ? <Code2 className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                                            </div>

                                            <div className="min-w-0 space-y-0.5">
                                              <div className="font-semibold text-xs sm:text-sm text-stone-200 group-hover:text-white truncate">
                                                {formatFileDisplayName(item.name)}
                                              </div>
                                              <div className="text-[10px] text-stone-400 font-mono flex items-center space-x-2">
                                                <span className="uppercase text-sky-400/80">{isNotebook ? 'Jupyter Notebook' : 'Assignment Document'}</span>
                                                {item.size && item.size > 0 && (
                                                  <>
                                                    <span>•</span>
                                                    <span>{formatFileSize(item.size)}</span>
                                                  </>
                                                )}
                                                <span>•</span>
                                                <span className="text-stone-500">{item.name}</span>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="flex items-center space-x-2 flex-shrink-0 self-end sm:self-auto">
                                            {isNotebook && (
                                              <a
                                                href={colabUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => {
                                                  recordEngagementEvent({
                                                    type: 'colab_launch',
                                                    userId: currentUser?.uid,
                                                    userEmail: currentUser?.email,
                                                    modality: currentCourse.modalityType,
                                                    lessonTitle: item.name,
                                                  });
                                                }}
                                                className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all"
                                              >
                                                <span>Run in Colab</span>
                                                <ExternalLink className="w-3 h-3" />
                                              </a>
                                            )}

                                            <a
                                              href={item.htmlUrl}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white font-semibold text-xs flex items-center space-x-1.5 transition-colors"
                                            >
                                              <span>GitHub</span>
                                              <ExternalLink className="w-3 h-3" />
                                            </a>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* MODULE CARD 3: LECTURE NOTES & CURRICULUM DOCS */}
                              {notes.length > 0 && (
                                <div className="p-5 sm:p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-4 shadow-sm">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
                                    <div>
                                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <FileText className="w-3.5 h-3.5" />
                                        <span>DOCUMENTATION & CURRICULUM GUIDES</span>
                                      </span>
                                      <h4 className="font-bold text-sm sm:text-base text-white mt-0.5">
                                        Reading Notes & References
                                      </h4>
                                    </div>
                                    <span className="text-[11px] text-stone-500 font-mono whitespace-nowrap">
                                      {notes.length} Document(s)
                                    </span>
                                  </div>

                                  <div className="divide-y divide-stone-800/60">
                                    {notes.map((item, nIdx) => (
                                      <div
                                        key={nIdx}
                                        className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-950/40 px-2 rounded-xl transition-colors group"
                                      >
                                        <div className="flex items-center space-x-3.5 min-w-0">
                                          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                            <FileText className="w-4 h-4" />
                                          </div>
                                          <div className="min-w-0 space-y-0.5">
                                            <div className="font-semibold text-xs sm:text-sm text-stone-200 group-hover:text-white truncate">
                                              {formatFileDisplayName(item.name)}
                                            </div>
                                            <div className="text-[10px] text-stone-400 font-mono flex items-center space-x-2">
                                              <span className="uppercase text-amber-400/80">Documentation</span>
                                              <span>•</span>
                                              <span className="text-stone-500">{item.name}</span>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex items-center space-x-2 flex-shrink-0 self-end sm:self-auto">
                                          <a
                                            href={item.htmlUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white font-semibold text-xs flex items-center space-x-1.5 transition-colors"
                                          >
                                            <span>Read on GitHub</span>
                                            <ExternalLink className="w-3 h-3" />
                                          </a>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* PRODUCT SURFACE 3: DEDICATED FELLOW SUBMISSIONS & PORTFOLIO HUB */}
                              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/20 border border-stone-800 shadow-xl space-y-5">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-stone-800/80 pb-4">
                                  <div className="space-y-1">
                                    <div className="flex items-center space-x-2 text-[10px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                                      <GitBranch className="w-3.5 h-3.5" />
                                      <span>FELLOW PORTFOLIO & WORKSPACE</span>
                                    </div>
                                    <h4 className="text-base sm:text-lg font-bold text-white">Participant Submissions Hub</h4>
                                    <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
                                      Keep your weekly Jupyter notebooks, research reports, and lab outputs organized in your personal GitHub directory. Faculty and mentors review submissions directly via GitHub Pull Requests.
                                    </p>
                                  </div>

                                  <div className="flex items-center space-x-2 flex-shrink-0">
                                    <a
                                      href={`https://github.com/${DEFAULT_GITHUB_REPO}/tree/main/participants`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() => {
                                        recordEngagementEvent({
                                          type: 'assignment_submit',
                                          userId: currentUser?.uid,
                                          userEmail: currentUser?.email,
                                          modality: currentCourse.modalityType,
                                        });
                                      }}
                                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center space-x-2 shadow-md transition-all"
                                    >
                                      <span>Open Submissions on GitHub</span>
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                  </div>
                                </div>

                                {/* Step-by-Step Submission Rubric */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                                  <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1.5">
                                    <div className="text-amber-400 font-mono font-bold text-[10px] uppercase flex items-center space-x-1">
                                      <span>Step 1 · Fork & Directory</span>
                                    </div>
                                    <div className="text-stone-300 font-medium">Create your directory</div>
                                    <div className="text-[11px] text-stone-400 font-mono bg-stone-900/80 px-2 py-1 rounded border border-stone-800 truncate">
                                      participants/&lt;your_name&gt;/{currentCourse.id}/
                                    </div>
                                  </div>

                                  <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1.5">
                                    <div className="text-sky-400 font-mono font-bold text-[10px] uppercase flex items-center space-x-1">
                                      <span>Step 2 · Code & Analysis</span>
                                    </div>
                                    <div className="text-stone-300 font-medium">Add weekly notebook</div>
                                    <div className="text-[11px] text-stone-400 font-mono bg-stone-900/80 px-2 py-1 rounded border border-stone-800 truncate">
                                      week_02_preprocessing.ipynb
                                    </div>
                                  </div>

                                  <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1.5">
                                    <div className="text-emerald-400 font-mono font-bold text-[10px] uppercase flex items-center space-x-1">
                                      <span>Step 3 · Pull Request</span>
                                    </div>
                                    <div className="text-stone-300 font-medium">Open PR for feedback</div>
                                    <div className="text-[11px] text-stone-400">
                                      Mentors & peer fellows review outputs & award assignment completion.
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          )}
                        </div>
                      );
                    })()}

                  </div>
                );
              }

              return (
                <div className="max-w-6xl mx-auto space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-stone-900 flex items-center space-x-2.5">
                        <span>My Learning Library</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-mono text-xs font-bold">
                          {myEnrolledModalities.length} Enrolled
                        </span>
                      </h2>
                      <p className="text-xs sm:text-sm text-stone-600 mt-1">
                        Your personalized coursework and live fellowship recordings based on your selected modalities.
                      </p>
                    </div>

                    <Link
                      to="/learning/onboarding"
                      className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 border border-[#E2D9C7] text-stone-800 hover:text-stone-950 text-xs font-bold transition-colors self-start sm:self-auto shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span>Adjust Modalities & Goals</span>
                    </Link>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex items-center space-x-2 border-b border-stone-800 pb-3 overflow-x-auto">
                    {[
                      { id: 'all', label: `All Enrolled (${myEnrolledModalities.length})` },
                      { id: 'in_progress', label: `In Progress (${inProgressList.length})` },
                      { id: 'completed', label: `Completed (${completedList.length})` },
                      { id: 'saved', label: 'Saved (0)' },
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setLearningFilter(filter.id as any)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                          learningFilter === filter.id
                            ? 'bg-amber-600 text-white'
                            : 'text-stone-400 hover:text-white bg-stone-900'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>

                  {/* Enrolled Tracks Grid */}
                  {learningFilter === 'all' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {myEnrolledModalities.map((modality) => {
                          const liveSessionsCount = publishedLessons.filter(l => 
                            (modality.id === 'mri' && (l.modality === 'MRI/fMRI' || l.modality?.toLowerCase().includes('mri'))) ||
                            (modality.id === 'eeg' && l.modality === 'EEG') ||
                            (modality.id === 'fnirs' && l.modality === 'fNIRS') ||
                            (modality.id === 'ephys' && l.modality === 'Electrophysiology')
                          ).length;

                          return (
                            <div
                              key={modality.id}
                              className="p-6 rounded-3xl bg-stone-900 border border-stone-800 hover:border-stone-700 transition-all flex flex-col justify-between space-y-5 shadow-lg group"
                            >
                              <div className="space-y-3.5">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center space-x-3">
                                    <span className="text-3xl p-2.5 bg-stone-950 rounded-2xl border border-stone-800 group-hover:scale-105 transition-transform">
                                      {modality.icon}
                                    </span>
                                    <div>
                                      <h3 className="text-base font-bold text-white">{modality.fullName}</h3>
                                      <div className="text-xs text-amber-400 font-mono">{modality.tagline}</div>
                                    </div>
                                  </div>
                                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-mono uppercase font-bold">
                                    Enrolled
                                  </span>
                                </div>

                                <p className="text-xs text-stone-300 leading-relaxed font-light line-clamp-3">
                                  {modality.overview}
                                </p>

                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {modality.tools.map((t) => (
                                    <span
                                      key={t}
                                      className="px-2 py-0.5 rounded-md bg-stone-950 border border-stone-800 text-[10px] text-stone-400 font-mono"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-2.5">
                                  <button
                                    onClick={() => handleUnenrollFromPathway(modality.name, modality.fullName)}
                                    className="text-[11px] text-stone-500 hover:text-rose-400 font-semibold transition-colors flex items-center space-x-1 py-1"
                                    title={`Unenroll from ${modality.fullName}`}
                                  >
                                    <X className="w-3 h-3" />
                                    <span>Unenroll</span>
                                  </button>
                                  <span className="text-[10px] text-stone-500 font-mono hidden sm:inline">
                                    • {liveSessionsCount} live recordings
                                  </span>
                                </div>

                                <button
                                  onClick={() => setSelectedModalityCourse(modality.id)}
                                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-colors flex items-center space-x-1.5 shadow-md shadow-amber-900/20"
                                >
                                  <span>Open Track & Materials</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {learningFilter === 'in_progress' && (
                    <div className="space-y-6">
                      {inProgressList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {inProgressList.map((modality) => (
                            <div
                              key={modality.id}
                              className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-5 flex flex-col justify-between shadow-lg"
                            >
                              <div className="space-y-3.5">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center space-x-3">
                                    <span className="text-3xl p-2.5 bg-stone-950 rounded-2xl border border-stone-800">
                                      {modality.icon}
                                    </span>
                                    <div>
                                      <h3 className="text-base font-bold text-white">{modality.fullName}</h3>
                                      <div className="text-xs text-stone-400 font-mono">Current Track: {modality.level}</div>
                                    </div>
                                  </div>
                                  <span className="text-xs font-mono font-bold text-amber-400">
                                    {modality.progress}%
                                  </span>
                                </div>

                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
                                    <span>Course Progress</span>
                                    <span>{modality.progress}% Completed</span>
                                  </div>
                                  <div className="h-2 w-full bg-stone-950 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
                                      style={{ width: `${modality.progress}%` }}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs">
                                <button
                                  onClick={() => setSelectedModalityCourse(modality.id)}
                                  className="text-stone-400 hover:text-stone-200 font-medium"
                                >
                                  View Track & Sessions →
                                </button>

                                <button
                                  onClick={() => setSelectedModalityCourse(modality.id)}
                                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-colors flex items-center space-x-1.5 shadow-md shadow-amber-900/20"
                                >
                                  <Play className="w-3.5 h-3.5 fill-white" />
                                  <span>Continue Pathway</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-12 text-center rounded-3xl bg-stone-900/40 border border-stone-800 space-y-3">
                          <div className="text-3xl">🎯</div>
                          <h4 className="font-bold text-sm text-stone-200">No pathways in progress</h4>
                          <p className="text-xs text-stone-400 max-w-sm mx-auto">
                            Start any of your enrolled pathways from the All Enrolled tab.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {learningFilter === 'completed' && (
                    <div className="p-12 text-center rounded-3xl bg-stone-900/40 border border-stone-800 space-y-3">
                      <div className="text-3xl">🏆</div>
                      <h4 className="font-bold text-sm text-stone-200">No completed pathways yet</h4>
                      <p className="text-xs text-stone-400 max-w-sm mx-auto">
                        Complete all modules and checkpoints in a pathway to earn verified ABDN certificates.
                      </p>
                    </div>
                  )}

                  {learningFilter === 'saved' && (
                    <div className="p-12 text-center rounded-3xl bg-stone-900/40 border border-stone-800 space-y-3">
                      <div className="text-3xl">🔖</div>
                      <h4 className="font-bold text-sm text-stone-200">No bookmarked lessons</h4>
                      <p className="text-xs text-stone-400 max-w-sm mx-auto">
                        Bookmark lessons or Jupyter notebook labs to access them quickly here.
                      </p>
                    </div>
                  )}

                  {/* Explore More Fellowship Modalities */}
                  {availableToEnrollModalities.length > 0 && (
                    <div className="pt-8 space-y-5 border-t border-stone-800">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span>Explore More Fellowship Modalities</span>
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5">
                          Expand your computational skills by adding more ABDN neuroimaging pathways to your library.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {availableToEnrollModalities.map((modality) => (
                          <div
                            key={modality.id}
                            className="p-5 rounded-3xl bg-stone-900/60 border border-stone-800/80 hover:border-stone-700 transition-all flex flex-col justify-between space-y-4"
                          >
                            <div className="space-y-2.5">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl p-2 bg-stone-950 rounded-xl border border-stone-800">
                                  {modality.icon}
                                </span>
                                <div>
                                  <h4 className="font-bold text-sm text-white">{modality.fullName}</h4>
                                  <div className="text-[11px] text-amber-400 font-mono">
                                    {modality.modulesCount} Modules · {modality.lessonsCount} Lessons
                                  </div>
                                </div>
                              </div>
                              <p className="text-xs text-stone-400 leading-relaxed font-light line-clamp-2">
                                {modality.tagline}
                              </p>
                            </div>

                            <button
                              onClick={() => handleEnrollInNewPathway(modality.fullName)}
                              className="w-full py-2.5 px-3.5 rounded-xl bg-stone-800 hover:bg-amber-600 text-stone-200 hover:text-white text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 shadow-sm"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Enroll in Pathway</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ===================================================================== */}
            {/* VIEW 3: 👤 PROFILE */}
            {/* ===================================================================== */}
            {activeTab === 'profile' && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-stone-900">Researcher Profile</h2>
                  <p className="text-xs sm:text-sm text-stone-600">
                    Your public African Brain Data Network academic credentials and pathway progress.
                  </p>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EBE4D8] space-y-6 shadow-lg shadow-stone-900/5">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-700 to-amber-800 flex items-center justify-center text-3xl font-extrabold text-white shadow-xl flex-shrink-0">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3 className="text-xl font-bold text-stone-900">{displayName}</h3>
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-mono font-bold border border-amber-300 self-center sm:self-auto">
                          Enrolled Fellow
                        </span>
                      </div>
                      <p className="text-xs text-stone-600">{currentUser?.email}</p>
                      <p className="text-xs text-stone-700 pt-1 font-medium">
                        African Brain Data Network 2026 Neuroimaging Fellow · Computational Neuroscience Scholar
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-3.5 bg-[#FAF7F0] rounded-2xl border border-[#E2D9C7] text-center">
                      <div className="text-xs text-stone-600 font-medium">Modalities</div>
                      <div className="text-lg font-black text-stone-900 font-mono mt-0.5">{myEnrolledModalities.length}</div>
                    </div>
                    <div className="p-3.5 bg-[#FAF7F0] rounded-2xl border border-[#E2D9C7] text-center">
                      <div className="text-xs text-stone-600 font-medium">Live Sessions</div>
                      <div className="text-lg font-black text-stone-900 font-mono mt-0.5">{publishedLessons.length}</div>
                    </div>
                    <div className="p-3.5 bg-[#FAF7F0] rounded-2xl border border-[#E2D9C7] text-center">
                      <div className="text-xs text-stone-600 font-medium">Certificates</div>
                      <div className="text-lg font-black text-stone-900 font-mono mt-0.5">2</div>
                    </div>
                    <div className="p-3.5 bg-[#FAF7F0] rounded-2xl border border-[#E2D9C7] text-center">
                      <div className="text-xs text-stone-600 font-medium">Cohort</div>
                      <div className="text-lg font-black text-amber-800 font-mono mt-0.5">2026</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===================================================================== */}
            {/* VIEW 7: ⚙️ SETTINGS */}
            {/* ===================================================================== */}
            {activeTab === 'settings' && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-stone-900">Account & Preferences</h2>
                  <p className="text-xs sm:text-sm text-stone-600">
                    Manage your email notifications, compute cluster settings, and fellowship preferences.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#EBE4D8] space-y-4 shadow-lg shadow-stone-900/5">
                  <div className="flex items-center justify-between py-2 border-b border-[#EBE4D8]">
                    <div>
                      <div className="font-bold text-sm text-stone-900">Email Session Notifications</div>
                      <div className="text-xs text-stone-600">Receive email links when new live recordings are published</div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber-700 rounded" />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-bold text-sm text-stone-900">Google Colab GPU Pre-allocation</div>
                      <div className="text-xs text-stone-600">Automatically configure GPU runtime for interactive code labs</div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber-700 rounded" />
                  </div>
                </div>
              </div>
            )}

            {/* ===================================================================== */}
            {/* VIEW 8: ❓ HELP */}
            {/* ===================================================================== */}
            {activeTab === 'help' && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-stone-900">Help & Support</h2>
                  <p className="text-xs sm:text-sm text-stone-600">
                    Get assistance with computational notebook environments, datasets, or fellowship curricula.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#EBE4D8] space-y-4 shadow-lg shadow-stone-900/5">
                  <div className="space-y-3">
                    {[
                      { q: 'How do I access live Zoom recording passcodes?', a: 'Click "Watch Session" on any lesson card. If a passcode is required, it will be securely displayed inside the session launcher with a one-click copy button.' },
                      { q: 'How do I submit my fellowship capstone code?', a: 'Navigate to the Projects tab and submit your public or private GitHub repository link for faculty review.' },
                      { q: 'How do I schedule faculty office hours?', a: 'Office hour links and mentor schedules are announced in the weekly cohort updates.' },
                    ].map((faq, fIdx) => (
                      <div key={fIdx} className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#E2D9C7] space-y-1">
                        <h4 className="font-bold text-xs sm:text-sm text-stone-900">{faq.q}</h4>
                        <p className="text-xs text-stone-600 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>

        {/* MODALS */}
        <AssessmentModal
          isOpen={isAssessmentOpen}
          onClose={() => setIsAssessmentOpen(false)}
          title={activeAssessmentTitle}
        />

        <CertificateModal
          isOpen={isCertModalOpen}
          onClose={() => setIsCertModalOpen(false)}
          title={activeCertTitle}
          recipientName={displayName}
        />

        <LessonPlayerModal
          isOpen={isLessonModalOpen}
          onClose={() => {
            setIsLessonModalOpen(false);
            setActiveSelectedLesson(null);
            loadUserProgress();
          }}
          lesson={activeSelectedLesson}
          title={activeLessonTitle}
          onComplete={(lessonId) => {
            loadUserProgress();
            showToast('Great job! Session completed and recorded in your fellowship tracker.');
          }}
        />

        {/* NOTIFICATION TOAST */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-stone-900/95 border border-amber-500/40 text-amber-200 text-xs font-semibold shadow-2xl backdrop-blur-md flex items-center space-x-2.5"
            >
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}

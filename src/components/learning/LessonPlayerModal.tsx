import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  CheckCircle2,
  Code2,
  ExternalLink,
  BookOpen,
  Terminal,
  ArrowRight,
  Download,
  Lock,
  Copy,
  Check,
  Brain,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  Layers,
  FileCode2,
  FileText,
  Database,
  GitBranch,
  Presentation,
  FolderOpen,
  RefreshCw,
  Sparkles,
  Award
} from 'lucide-react';
import { 
  LessonWithVideoAccess, 
  VideoAccess, 
  getVideoAccess, 
  modalityConfigs,
  formatWeekEndingDisplay,
  fetchLessonGitHubMaterials,
  GitHubMaterialItem,
  DEFAULT_GITHUB_REPO,
  deriveDefaultGitHubPaths
} from '../../services/elearningService';
import { useAuth } from '../../context/AuthContext';
import { 
  recordLessonStarted, 
  recordLessonCompleted, 
  getLessonProgress 
} from '../../services/progressService';
import { recordEngagementEvent } from '../../services/elearningMetricsService';

interface LessonPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson?: LessonWithVideoAccess | null;
  title?: string;
  moduleName?: string;
  pathwayName?: string;
  onComplete?: (lessonId?: string) => void;
}

export default function LessonPlayerModal({
  isOpen,
  onClose,
  lesson,
  title,
  moduleName,
  pathwayName,
  onComplete,
}: LessonPlayerModalProps) {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'lecture' | 'materials' | 'notebook' | 'notes'>('lecture');
  const [isCompleted, setIsCompleted] = useState(false);
  const [videoAccess, setVideoAccess] = useState<VideoAccess | null>(null);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [copiedPasscode, setCopiedPasscode] = useState(false);
  const [copiedCloneCmd, setCopiedCloneCmd] = useState(false);

  // GitHub Materials state
  const [materials, setMaterials] = useState<GitHubMaterialItem[]>([]);
  const [loadingMaterials, setLoadingMaterials] = useState(false);
  const [materialsError, setMaterialsError] = useState<string | null>(null);

  // Derive display values from either lesson prop or fallback props
  const displayTitle = lesson?.title || title || 'Lab 4: Automated FreeSurfer Cortical Surface Reconstruction';
  const displayPathway = lesson?.modality || pathwayName || 'Structural MRI Analysis';
  const displayModule = lesson?.weekTitle 
    ? `${lesson.weekTitle} (${lesson.month})` 
    : moduleName || 'Module 3 · Structural Preprocessing';
  const contentId = lesson?.contentId || 'ABDN-FELLOWSHIP-SESSION';
  const instructor = lesson?.instructor || 'ABDN Faculty Specialist';
  const instructorTitle = lesson?.instructorTitle || 'Computational Neuroscience Faculty';
  const duration = lesson?.durationMinutes || videoAccess?.durationMinutes || 75;
  const topics = lesson?.topics || ['Neuroimaging Workflows', 'Pipelines', 'Quality Control'];

  // GitHub mapping values (Supports explicit lesson metadata contract with fallback to modality paths)
  const githubRepo = lesson?.github?.repository || lesson?.githubRepo || DEFAULT_GITHUB_REPO;
  const defaultPaths = lesson?.modality 
    ? deriveDefaultGitHubPaths(lesson.modality, lesson.weekNumber)
    : { materialsPath: 'lectures', assignmentPath: 'assignments' };
  const githubPath = lesson?.github?.path || lesson?.githubPath || defaultPaths.materialsPath;
  const assignmentPath = lesson?.github?.assignmentPath || lesson?.assignmentPath || defaultPaths.assignmentPath;

  // Load video access and progress for lesson when opened
  useEffect(() => {
    if (isOpen && lesson) {
      const lessonKey = lesson.id || lesson.contentId;
      
      // Check existing progress state
      getLessonProgress(currentUser?.uid, lessonKey).then((p) => {
        if (p?.status === 'completed') {
          setIsCompleted(true);
        } else {
          setIsCompleted(false);
          // Automatically mark in_progress upon opening
          recordLessonStarted(currentUser?.uid, lessonKey, lesson.contentId, lesson.modality);
          
          // Telemetry: Record video_start event to Firestore elearning_metrics
          recordEngagementEvent({
            type: 'video_start',
            userId: currentUser?.uid,
            userEmail: currentUser?.email,
            userName: currentUser?.displayName,
            modality: lesson.modality,
            lessonId: lessonKey,
            lessonTitle: lesson.title,
          });
        }
      });

      if (lesson.id) {
        setLoadingVideo(true);
        getVideoAccess(lesson.id)
          .then((va) => {
            setVideoAccess(va);
          })
          .finally(() => {
            setLoadingVideo(false);
          });
      } else if (lesson.videoAccess) {
        setVideoAccess(lesson.videoAccess);
      }

      // Fetch GitHub Materials
      loadMaterials();
    } else {
      setVideoAccess(null);
      setIsCompleted(false);
      setCopiedPasscode(false);
      setMaterials([]);
    }
  }, [isOpen, lesson, currentUser]);

  const loadMaterials = async () => {
    if (!githubPath) return;
    setLoadingMaterials(true);
    setMaterialsError(null);
    try {
      const items = await fetchLessonGitHubMaterials(githubRepo, githubPath);
      setMaterials(items);
      
      // Telemetry: Record view_materials event to Firestore elearning_metrics
      recordEngagementEvent({
        type: 'view_materials',
        userId: currentUser?.uid,
        userEmail: currentUser?.email,
        userName: currentUser?.displayName,
        modality: lesson?.modality,
        lessonId: lesson?.id || lesson?.contentId,
        lessonTitle: lesson?.title,
      });
    } catch (err: any) {
      setMaterialsError('Could not load live GitHub directory contents.');
    } finally {
      setLoadingMaterials(false);
    }
  };

  if (!isOpen) return null;

  const handleMarkComplete = async () => {
    setIsCompleted(true);
    const lessonKey = lesson?.id || lesson?.contentId;
    if (lessonKey) {
      await recordLessonCompleted(currentUser?.uid, lessonKey, lesson?.contentId, lesson?.modality);
      
      // Telemetry: Record video_complete event to Firestore elearning_metrics
      recordEngagementEvent({
        type: 'video_complete',
        userId: currentUser?.uid,
        userEmail: currentUser?.email,
        userName: currentUser?.displayName,
        modality: lesson?.modality,
        lessonId: lessonKey,
        lessonTitle: lesson?.title,
      });
      
      if (onComplete) onComplete(lessonKey);
    }
  };

  const handleCopyPasscode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedPasscode(true);
    setTimeout(() => setCopiedPasscode(false), 2500);
  };

  const handleCopyClone = () => {
    const cmd = `git clone https://github.com/${githubRepo}.git`;
    navigator.clipboard.writeText(cmd);
    setCopiedCloneCmd(true);
    setTimeout(() => setCopiedCloneCmd(false), 2500);
  };

  // Group materials by category
  const slidesMaterials = materials.filter((m) => m.category === 'slides');
  const notesMaterials = materials.filter((m) => m.category === 'notes');
  const codeMaterials = materials.filter((m) => m.category === 'code');
  const otherMaterials = materials.filter((m) => m.category === 'other' || m.category === 'data');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-stone-900 text-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-stone-800 my-4 flex flex-col max-h-[90vh]"
        >
          {/* Top Header Bar */}
          <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-bold border border-amber-500/20">
                  {contentId}
                </span>
                <span className="text-stone-500">•</span>
                <span className="text-amber-400 font-semibold">{displayPathway}</span>
                <span className="text-stone-500">•</span>
                <span className="text-stone-400">{displayModule}</span>
                {lesson?.weekEnding && (
                  <>
                    <span className="text-stone-500">•</span>
                    <span className="text-stone-400">Week Ending: {formatWeekEndingDisplay(lesson.weekEnding)}</span>
                  </>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight truncate">
                {displayTitle}
              </h3>
            </div>

            <div className="flex items-center space-x-3 flex-shrink-0">
              {lesson?.slidesUrl && (
                <a
                  href={lesson.slidesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-semibold text-xs transition-all shadow-sm"
                >
                  <Presentation className="w-3.5 h-3.5" />
                  <span>Slides Deck</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-75" />
                </a>
              )}

              <a
                href={lesson?.colabUrl || "https://colab.research.google.com/"}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-all shadow-sm"
              >
                <span>Open Colab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-bar */}
          <div className="px-5 py-2 bg-stone-900 border-b border-stone-800 flex items-center justify-between text-xs overflow-x-auto">
            <div className="flex items-center space-x-2">
              {[
                { id: 'lecture', label: 'Recorded Session & Video', icon: Play },
                { id: 'materials', label: 'Learning Materials (GitHub)', icon: Layers },
                { id: 'notebook', label: 'Interactive Code Lab', icon: Code2 },
                { id: 'notes', label: 'Session Notes & Topics', icon: BookOpen },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-amber-600 text-white font-semibold shadow-sm'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-stone-400 font-mono text-[11px] hidden sm:flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{duration} Mins Duration</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
            
            {/* TAB 1: RECORDED SESSION & ZOOM LAUNCHER */}
            {activeTab === 'lecture' && (
              <div className="space-y-6">
                
                {/* Session Hero Banner */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/40 border border-amber-900/40 shadow-xl space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                        {lesson?.videoProvider ? `${lesson.videoProvider.toUpperCase()} RECORDING` : 'ZOOM CLOUD RECORDING'}
                      </span>
                      <span className="text-xs text-stone-400">• {duration} mins</span>
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Authenticated Fellowship Access</span>
                    </div>
                  </div>

                  {/* Video Access State */}
                  {videoAccess?.recordingUrl ? (
                    <div className="space-y-4 pt-2">
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white">Fellowship Recording Available</h4>
                        <p className="text-stone-300 text-xs leading-relaxed">
                          This live session was recorded and archived for enrolled African Brain Data Network fellows. Click below to launch the recording in your browser.
                        </p>
                      </div>

                      {/* Primary Zoom Watch Button */}
                      <a
                        href={videoAccess.recordingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold rounded-2xl shadow-lg shadow-amber-900/30 transition-all text-sm group"
                      >
                        <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                        <span>Watch Session on {videoAccess.provider === 'zoom' ? 'Zoom' : 'Cloud Player'}</span>
                        <ExternalLink className="w-4 h-4 opacity-75 ml-1" />
                      </a>

                      {/* Secure Recording Passcode Box */}
                      {videoAccess.passcode ? (
                        <div className="bg-stone-900/90 backdrop-blur-md p-4 rounded-2xl border border-amber-500/30 flex items-center justify-between gap-4">
                          <div className="space-y-0.5">
                            <div className="text-[10px] uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                              <Lock className="w-3 h-3" />
                              <span>Recording Passcode</span>
                            </div>
                            <div className="font-mono font-bold text-base text-white tracking-widest">
                              {videoAccess.passcode}
                            </div>
                            <div className="text-[10px] text-stone-400">
                              Paste this passcode if prompted on Zoom
                            </div>
                          </div>

                          <button
                            onClick={() => handleCopyPasscode(videoAccess.passcode!)}
                            className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold text-xs transition-colors flex items-center space-x-1.5 border border-amber-500/40"
                          >
                            {copiedPasscode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedPasscode ? 'Copied!' : 'Copy Code'}</span>
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="py-10 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center mx-auto text-amber-400">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="font-bold text-white text-sm">Recording Coming Soon</div>
                        <p className="text-stone-400 text-xs max-w-md mx-auto">
                          The recording for this fellowship session is currently processing and will be available to all enrolled fellows shortly.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Faculty & Session Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold flex items-center space-x-1.5">
                      <User className="w-3 h-3" />
                      <span>Session Instructor</span>
                    </div>
                    <div className="font-bold text-white text-sm">{instructor}</div>
                    <div className="text-stone-400 text-xs">{instructorTitle}</div>
                  </div>

                  <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold flex items-center space-x-1.5">
                      <Calendar className="w-3 h-3" />
                      <span>Fellowship Schedule</span>
                    </div>
                    <div className="font-bold text-white text-sm">{displayPathway}</div>
                    <div className="text-stone-400 text-xs">
                      {lesson?.month || 'August'} • {lesson?.weekTitle || 'Week 2'}
                    </div>
                  </div>
                </div>

                {/* Session Description */}
                <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                  <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wider">
                    Session Description
                  </h4>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                    {lesson?.description || 'Foundational introduction to neuroimaging analysis, reproducible pipelines, and hands-on Python computational implementations.'}
                  </p>
                </div>

              </div>
            )}

            {/* TAB 2: LEARNING MATERIALS & GITHUB */}
            {activeTab === 'materials' && (
              <div className="space-y-6">
                
                {/* GitHub Repository Header Banner */}
                <div className="p-5 rounded-3xl bg-stone-950 border border-stone-800 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                        <GitBranch className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                          Central Fellowship Workspace
                        </div>
                        <div className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                          <span>{githubRepo}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={loadMaterials}
                        disabled={loadingMaterials}
                        className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 transition-colors"
                        title="Refresh GitHub Directory"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${loadingMaterials ? 'animate-spin text-amber-400' : ''}`} />
                      </button>

                      <a
                        href={`https://github.com/${githubRepo}/tree/main/${githubPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center space-x-1.5 transition-all shadow-sm"
                      >
                        <span>Open in GitHub</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-stone-400">
                    <div className="flex items-center space-x-2">
                      <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>Target Folder: <strong className="text-stone-200">/{githubPath}</strong></span>
                    </div>

                    <button
                      onClick={handleCopyClone}
                      className="text-[11px] text-stone-400 hover:text-amber-300 flex items-center space-x-1 bg-stone-900 px-2.5 py-1 rounded-lg border border-stone-800 w-fit"
                    >
                      <Terminal className="w-3 h-3 text-amber-400" />
                      <span>{copiedCloneCmd ? 'Copied clone command!' : 'Copy git clone command'}</span>
                    </button>
                  </div>
                </div>

                {/* Interactive Presentation Deck (Canva / Slides) */}
                {lesson?.slidesUrl && (
                  <div className="p-5 rounded-3xl bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/40 border border-amber-500/30 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                          Interactive Slides Deck
                        </span>
                        <span className="text-[11px] text-stone-400">Faculty Presentation</span>
                      </div>
                      <h4 className="text-base font-bold text-white">Curated Presentation & Keynotes</h4>
                      <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
                        Access high-resolution interactive slide decks, annotated diagrammatic workflows, and mathematical foundations for this session.
                      </p>
                    </div>

                    <a
                      href={lesson.slidesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold rounded-2xl text-xs flex items-center space-x-2 shadow-md shadow-amber-900/30 flex-shrink-0"
                    >
                      <Presentation className="w-4 h-4" />
                      <span>Launch Interactive Slides</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {/* Categorized Materials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Category 1: Slides & Lecture Assets */}
                  <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                        <Presentation className="w-4 h-4 text-amber-400" />
                        <span>Lecture Slides & Docs</span>
                      </h4>
                      <span className="text-[10px] font-mono text-stone-500">
                        {slidesMaterials.length > 0 ? `${slidesMaterials.length} file(s)` : 'Direct Sync'}
                      </span>
                    </div>

                    {slidesMaterials.length > 0 ? (
                      <div className="space-y-2">
                        {slidesMaterials.map((file, fIdx) => (
                          <div
                            key={fIdx}
                            className="p-3 bg-stone-900 rounded-xl border border-stone-800 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0">
                              <FileText className="w-4 h-4 text-amber-400 flex-shrink-0" />
                              <span className="text-stone-200 font-medium truncate">{file.name}</span>
                            </div>
                            <div className="flex items-center space-x-1.5 flex-shrink-0">
                              {file.downloadUrl && (
                                <a
                                  href={file.downloadUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
                                  title="Download Raw File"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </a>
                              )}
                              <a
                                href={file.htmlUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[11px] font-semibold flex items-center space-x-1 border border-amber-500/20"
                              >
                                <span>View</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 text-xs text-stone-400 space-y-1.5">
                        <div className="font-semibold text-stone-300">GitHub Lecture Folder</div>
                        <p className="text-[11px] text-stone-400 leading-relaxed">
                          Files pushed to <code className="text-amber-300">{githubPath}</code> appear here automatically for fellows.
                        </p>
                        <a
                          href={`https://github.com/${githubRepo}/tree/main/${githubPath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-[11px] text-amber-400 hover:underline pt-1"
                        >
                          <span>Explore lecture files on GitHub</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Category 2: Jupyter Notebooks & Code */}
                  <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center space-x-1.5">
                        <FileCode2 className="w-4 h-4 text-sky-400" />
                        <span>Code & Notebooks</span>
                      </h4>
                      <span className="text-[10px] font-mono text-stone-500">
                        {codeMaterials.length > 0 ? `${codeMaterials.length} file(s)` : 'Colab Ready'}
                      </span>
                    </div>

                    {codeMaterials.length > 0 ? (
                      <div className="space-y-2">
                        {codeMaterials.map((file, fIdx) => {
                          const isNotebook = file.name.endsWith('.ipynb');
                          const colabLink = `https://colab.research.google.com/github/${githubRepo}/blob/main/${file.path}`;
                          return (
                            <div
                              key={fIdx}
                              className="p-3 bg-stone-900 rounded-xl border border-stone-800 flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="flex items-center space-x-2.5 min-w-0">
                                <Code2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                                <span className="text-stone-200 font-medium truncate">{file.name}</span>
                              </div>
                              <div className="flex items-center space-x-1.5 flex-shrink-0">
                                {isNotebook && (
                                  <a
                                    href={colabLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-[11px] font-semibold flex items-center space-x-1 border border-sky-500/20"
                                  >
                                    <span>Colab</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                                <a
                                  href={file.htmlUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
                                  title="View on GitHub"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 text-xs text-stone-400 space-y-1.5">
                        <div className="font-semibold text-stone-300">Executable Python Notebooks</div>
                        <p className="text-[11px] text-stone-400 leading-relaxed">
                          Interactive pipelines and scripts for this module are hosted in the cohort GitHub repository.
                        </p>
                        <a
                          href={lesson?.colabUrl || "https://colab.research.google.com/"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-[11px] text-sky-400 hover:underline pt-1"
                        >
                          <span>Launch Google Colab workspace</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                </div>

                {/* Practical Weekly Assignment Banner */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/30 border border-amber-900/40 shadow-xl space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-[10px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                        <Award className="w-3.5 h-3.5" />
                        <span>Weekly Fellowship Assignment</span>
                      </div>
                      <h4 className="text-base font-bold text-white">Hands-on Modality Task & Submission</h4>
                      <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
                        Complete this week's analysis notebook and submit your work to your assigned participant folder in GitHub: <code className="text-amber-300">participants/your_name/{lesson?.modality ? lesson.modality.toLowerCase().replace('/', '_') : 'modality'}/week_0{lesson?.weekNumber || 2}</code>.
                      </p>
                    </div>

                    <a
                      href={`https://github.com/${githubRepo}/tree/main/${assignmentPath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-amber-950/50 flex-shrink-0 transition-all"
                    >
                      <span>Open Assignment on GitHub</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Submission Steps Helper */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-stone-800/80 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center space-x-2 text-stone-300">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-[10px]">1</span>
                      <span>Read weekly instructions</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center space-x-2 text-stone-300">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-[10px]">2</span>
                      <span>Run notebook in Colab / local</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center space-x-2 text-stone-300">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-[10px]">3</span>
                      <span>Push PR to cohort repository</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: INTERACTIVE CODE LAB */}
            {activeTab === 'notebook' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-400">
                    Dataset: <strong className="text-white">{lesson?.datasetName || 'ABDN African Cohort Preprocessing Workspace'}</strong>
                  </span>
                  <a
                    href={lesson?.colabUrl || "https://colab.research.google.com/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-sm"
                  >
                    <span>Launch in Colab</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 font-mono text-stone-300 space-y-3">
                  <div className="flex items-center justify-between text-stone-500 border-b border-stone-800/80 pb-2 text-xs">
                    <span>In [1]: import nibabel as nib; import nilearn as nl; import mne</span>
                    <span className="text-[10px] text-emerald-400">Python 3.10 · GPU Runtime</span>
                  </div>
                  <pre className="text-amber-300/90 text-xs overflow-x-auto whitespace-pre-wrap">
{lesson?.labCodeSnippet || `# ABDN Fellowship Session Code Lab
# Content ID: ${contentId}
import os
import numpy as np
import nibabel as nib

# 1. Initialize dataset environment
data_dir = './abdn_data'
print("Connecting to ABDN Neuroimaging Data Pipeline...")

# 2. Execute pipeline verification
def verify_pipeline():
    print("✓ Standardized BIDS structure validated.")
    print("✓ Compute cluster allocation confirmed.")

verify_pipeline()`}
                  </pre>
                </div>

                <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/60 space-y-2">
                  <h4 className="font-bold text-amber-300 text-sm">Lab Objectives</h4>
                  <ul className="list-disc list-inside space-y-1 text-stone-300 text-xs leading-relaxed">
                    {lesson?.labObjectives && lesson.labObjectives.length > 0 ? (
                      lesson.labObjectives.map((obj, oIdx) => (
                        <li key={oIdx}>{obj}</li>
                      ))
                    ) : (
                      <>
                        <li>Load and inspect standardized neuroimaging volumes and electrophysiology streams.</li>
                        <li>Execute reproducible preprocessing routines adhering to African Brain Data Network protocols.</li>
                        <li>Quantify signal-to-noise metrics and export analysis artifacts.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 4: SESSION NOTES & TOPICS */}
            {activeTab === 'notes' && (
              <div className="space-y-5 text-stone-300 leading-relaxed">
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-base">{displayTitle}</h4>
                  <p className="text-xs text-stone-400">
                    Comprehensive study notes, reference readings, and key theoretical takeaways.
                  </p>
                </div>

                {lesson?.studyNotes ? (
                  <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-3">
                    <h5 className="font-bold text-amber-300 text-xs uppercase tracking-wider">Faculty Study Notes</h5>
                    <div className="text-xs text-stone-300 leading-relaxed whitespace-pre-wrap font-sans">
                      {lesson.studyNotes}
                    </div>
                  </div>
                ) : null}

                {topics && topics.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                      Key Topics Covered:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {topics.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-3">
                  <h5 className="font-bold text-stone-200 text-sm">Recommended Next Steps</h5>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-stone-400">
                    <li>Review the Jupyter notebook and run the pipeline on your sample subject.</li>
                    <li>Participate in the fellow discussion channel for questions regarding artifact rejection.</li>
                    <li>Submit your lab checkpoint report once all cells execute cleanly.</li>
                  </ul>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Footer Actions */}
          <div className="p-4 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-xs text-stone-400">
              <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-stone-600'}`} />
              <span>{isCompleted ? 'Session marked completed' : 'Status: In Progress'}</span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              {!isCompleted ? (
                <button
                  onClick={handleMarkComplete}
                  className="flex-1 sm:flex-initial py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Session Complete</span>
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-initial py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <span>Close Viewer</span>
                </button>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

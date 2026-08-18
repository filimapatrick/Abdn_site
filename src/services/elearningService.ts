import { db } from '../firebase/config';
import { 
  collection, 
  getDocs, 
  getDoc,
  doc 
} from 'firebase/firestore';

export type ModalityType = 'MRI/fMRI' | 'fNIRS' | 'EEG' | 'Electrophysiology';

export type VideoProviderType = 'zoom' | 'youtube' | 'vimeo' | 'cloudinary' | 'other';

export type LessonStatus = 'published' | 'draft' | 'scheduled' | 'archived';

export type FellowshipMonth = 
  | 'January' | 'February' | 'March' | 'April' 
  | 'May' | 'June' | 'July' | 'August' 
  | 'September' | 'October' | 'November' | 'December';

export interface Fellowship {
  id: string;
  name: string;
  year: number;
  startDate: string;
  endDate: string;
  active: boolean;
  cohortName: string;
  description: string;
}

export interface Lesson {
  id?: string;
  contentId: string; // e.g. "MRI-AUG-W02-S01"
  fellowshipId: string; // e.g. "ABDN-2026"
  fellowshipName?: string;
  month: FellowshipMonth;
  weekNumber: number; // e.g. 1, 2, 3, 4
  weekTitle?: string; // e.g. "Week 2"
  weekEnding: string; // e.g. "2026-08-14" or "14 August 2026"
  modality: ModalityType;
  sessionNumber: number; // e.g. 1
  title: string; // e.g. "Intro. to f/MRI preprocessing"
  instructor?: string | null;
  instructorTitle?: string | null;
  description: string;
  videoProvider: VideoProviderType;
  hasRecording?: boolean;
  status: LessonStatus;
  displayOrder: number;
  durationMinutes?: number;
  topics?: string[];

  // GitHub Repository & Learning Materials (Explicit Lesson Contract)
  githubRepo?: string; // e.g. "African-Brain-Data-Network/ABDN_2026_FELLOWSHIP_COHORT"
  githubPath?: string; // e.g. "lectures/mri_fmri/week_02"
  assignmentPath?: string; // e.g. "assignments/mri_fmri"
  slidesUrl?: string; // e.g. "https://canva.link/0yy2dkweyjw3oqv"
  github?: {
    repository?: string;
    path?: string;
    assignmentPath?: string;
  };

  // Interactive Code Lab & Google Colab (Optional)
  colabUrl?: string; // e.g. "https://colab.research.google.com/drive/..."
  datasetName?: string; // e.g. "ABDN Nigerian Parkinson's T1w Dataset"
  labCodeSnippet?: string; // Python starter code
  labObjectives?: string[]; // Lab learning objectives

  // Study Notes & Takeaways (Optional)
  studyNotes?: string;

  resourcesCount?: number;
  createdAt?: any;
  updatedAt?: any;
}

export interface VideoAccess {
  id?: string;
  lessonId: string;
  provider: VideoProviderType;
  recordingUrl: string; // e.g. "https://zoom.us/rec/play/..."
  passcode?: string; // e.g. "Abdn2026!#"
  durationMinutes: number; // e.g. 75
  expiryDate?: string;
  hostName?: string;
  meetingId?: string;
  updatedAt?: any;
}

export interface LessonWithVideoAccess extends Lesson {
  videoAccess?: VideoAccess;
}

export interface ScheduleWeek {
  weekNumber: number;
  month: FellowshipMonth;
  weekEnding: string;
  label: string;
}

export interface ModalityConfig {
  name: ModalityType;
  shortCode: string;
  icon: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  description: string;
}

// Available Fellowships
export const defaultFellowships: Fellowship[] = [
  {
    id: 'ABDN-2026',
    name: '2026 ABDN Neuroimaging Fellowship',
    year: 2026,
    startDate: '2026-07-01',
    endDate: '2026-10-31',
    active: true,
    cohortName: 'Cohort 3 (Africa-Wide)',
    description: 'Premier multi-modality computational neuroscience and neuroimaging fellowship for emerging African researchers.'
  },
  {
    id: 'ABDN-2025',
    name: '2025 ABDN Neuroimaging Fellowship',
    year: 2025,
    startDate: '2025-07-01',
    endDate: '2025-10-31',
    active: false,
    cohortName: 'Cohort 2',
    description: 'Archived cohort on structural MRI analysis and electrophysiology.'
  }
];

// Modality Metadata & Styling
export const modalityConfigs: Record<ModalityType, ModalityConfig> = {
  'MRI/fMRI': {
    name: 'MRI/fMRI',
    shortCode: 'MRI',
    icon: 'Brain',
    color: '#d97706', // Amber 600
    badgeBg: 'bg-amber-500/10 border-amber-500/30',
    badgeText: 'text-amber-300',
    description: 'Structural MRI, functional connectivity, BIDS formatting, and fMRIPrep pipelines.'
  },
  'fNIRS': {
    name: 'fNIRS',
    shortCode: 'NIRS',
    icon: 'Activity',
    color: '#e11d48', // Rose 600
    badgeBg: 'bg-rose-500/10 border-rose-500/30',
    badgeText: 'text-rose-300',
    description: 'Functional near-infrared spectroscopy optode arrays, hemodynamics, and Homer3/MNE.'
  },
  'EEG': {
    name: 'EEG',
    shortCode: 'EEG',
    icon: 'Zap',
    color: '#f59e0b', // Amber/Yellow
    badgeBg: 'bg-yellow-500/10 border-yellow-500/30',
    badgeText: 'text-yellow-300',
    description: 'Event-related potentials (ERPs), artifact rejection, wavelets, and high-density EEG.'
  },
  'Electrophysiology': {
    name: 'Electrophysiology',
    shortCode: 'EPHYS',
    icon: 'TrendingUp',
    color: '#0284c7', // Sky 600
    badgeBg: 'bg-sky-500/10 border-sky-500/30',
    badgeText: 'text-sky-300',
    description: 'Extracellular spikes, local field potentials (LFPs), filtering, and Python electrophysiology.'
  }
};

// Helper: Calculate Friday Week-Ending Date for Month & Week #
export const calculateWeekEnding = (year: number = 2026, month: FellowshipMonth, weekNumber: number): string => {
  const monthMap: Record<FellowshipMonth, number> = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3,
    'May': 4, 'June': 5, 'July': 6, 'August': 7,
    'September': 8, 'October': 9, 'November': 10, 'December': 11
  };

  const monthIdx = monthMap[month] ?? 7;
  const fridays: number[] = [];
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, monthIdx, day);
    if (d.getDay() === 5) { // 5 is Friday
      fridays.push(day);
    }
  }

  const fridayDay = fridays[weekNumber - 1] || fridays[fridays.length - 1] || (weekNumber * 7);
  const formattedDay = fridayDay < 10 ? `0${fridayDay}` : `${fridayDay}`;
  const formattedMonth = (monthIdx + 1) < 10 ? `0${monthIdx + 1}` : `${monthIdx + 1}`;

  return `${year}-${formattedMonth}-${formattedDay}`;
};

// Helper: Format Week Ending for Display
export const formatWeekEndingDisplay = (isoDate: string): string => {
  try {
    const [year, month, day] = isoDate.split('-');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = monthNames[parseInt(month, 10) - 1] || 'August';
    return `${parseInt(day, 10)} ${monthName} ${year}`;
  } catch (e) {
    return isoDate;
  }
};

// Helper: Generate Standardized Content ID
export const generateContentId = (
  modality: ModalityType,
  month: FellowshipMonth,
  weekNumber: number,
  sessionNumber: number
): string => {
  const modCode = modalityConfigs[modality]?.shortCode || 'MOD';
  const monthCode = month.substring(0, 3).toUpperCase();
  const weekCode = `W${weekNumber < 10 ? `0${weekNumber}` : weekNumber}`;
  const sessionCode = `S${sessionNumber < 10 ? `0${sessionNumber}` : sessionNumber}`;
  return `${modCode}-${monthCode}-${weekCode}-${sessionCode}`;
};

export const DEFAULT_GITHUB_REPO = 'African-Brain-Data-Network/ABDN_2026_FELLOWSHIP_COHORT';

export type MaterialCategory = 'slides' | 'notes' | 'code' | 'data' | 'assignment' | 'other';

export interface GitHubMaterialItem {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size?: number;
  downloadUrl?: string | null;
  htmlUrl: string;
  category: MaterialCategory;
}

/**
 * Derives default GitHub lecture and assignment paths based on lesson modality & week
 */
export const deriveDefaultGitHubPaths = (
  modality: ModalityType,
  _weekNumber?: number
): { materialsPath: string; assignmentPath: string } => {
  switch (modality) {
    case 'MRI/fMRI':
      return { materialsPath: 'lectures/mri_fmri', assignmentPath: 'assignments/mri_fmri' };
    case 'EEG':
      return { materialsPath: 'lectures/eeg', assignmentPath: 'assignments/eeg' };
    case 'fNIRS':
      return { materialsPath: 'lectures/fnirs', assignmentPath: 'assignments/fnirs' };
    case 'Electrophysiology':
      return { materialsPath: 'lectures/electrophysiology', assignmentPath: 'assignments/electrophysiology' };
    default:
      return { materialsPath: 'lectures', assignmentPath: 'assignments' };
  }
};

/**
 * Categorize a file by extension
 */
export const categorizeMaterialFile = (fileName: string): MaterialCategory => {
  const lower = fileName.toLowerCase();
  if (lower.endsWith('.pdf') || lower.endsWith('.pptx') || lower.endsWith('.ppt') || lower.endsWith('.key')) {
    return 'slides';
  }
  if (lower.endsWith('.md') || lower.endsWith('.txt') || lower.endsWith('.docx') || lower.endsWith('.doc')) {
    return 'notes';
  }
  if (lower.endsWith('.ipynb') || lower.endsWith('.py') || lower.endsWith('.sh') || lower.endsWith('.m') || lower.endsWith('.r')) {
    return 'code';
  }
  if (lower.endsWith('.nii') || lower.endsWith('.nii.gz') || lower.endsWith('.edf') || lower.endsWith('.bids') || lower.endsWith('.csv') || lower.endsWith('.tsv') || lower.endsWith('.json')) {
    return 'data';
  }
  return 'other';
};

// In-memory cache for GitHub folder queries to respect rate limits
const githubMaterialsCache = new Map<string, { data: GitHubMaterialItem[]; timestamp: number }>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

/**
 * Fetch materials list from public GitHub repository Contents API
 */
export const fetchLessonGitHubMaterials = async (
  repo: string = DEFAULT_GITHUB_REPO,
  path: string
): Promise<GitHubMaterialItem[]> => {
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  const cacheKey = `${repo}:${cleanPath}`;
  const now = Date.now();

  const cached = githubMaterialsCache.get(cacheKey);
  if (cached && (now - cached.timestamp < CACHE_TTL_MS)) {
    return cached.data;
  }

  try {
    const url = `https://api.github.com/repos/${repo}/contents/${cleanPath}`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.info(`GitHub path '${cleanPath}' has no direct sub-files or is empty.`);
      } else {
        console.warn(`GitHub API request returned status ${response.status} for ${cleanPath}`);
      }
      return [];
    }

    const rawData = await response.json();
    if (!Array.isArray(rawData)) {
      return [];
    }

    const items: GitHubMaterialItem[] = rawData.map((item: any) => ({
      name: item.name,
      path: item.path,
      type: item.type === 'dir' ? 'dir' : 'file',
      size: item.size,
      downloadUrl: item.download_url || null,
      htmlUrl: item.html_url,
      category: item.type === 'dir' ? 'other' : categorizeMaterialFile(item.name)
    }));

    githubMaterialsCache.set(cacheKey, { data: items, timestamp: now });
    return items;
  } catch (err) {
    console.warn('Error fetching GitHub materials for path:', cleanPath, err);
    return [];
  }
};

// Default empty fallback for published lessons
export const defaultLessons: LessonWithVideoAccess[] = [];

/**
 * Fetch all published lessons from Firestore collection 'lessons'
 */
export const getPublishedLessons = async (
  fellowshipId: string = 'ABDN-2026'
): Promise<LessonWithVideoAccess[]> => {
  try {
    const lessonsRef = collection(db, 'lessons');
    const querySnapshot = await getDocs(lessonsRef);

    if (querySnapshot.empty) {
      return [];
    }

    const firestoreLessons: LessonWithVideoAccess[] = [];

    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data() as Lesson;
      const lessonId = docSnapshot.id;

      // Filter for published lessons (or unspecified status treated as published)
      if (data.status && data.status !== 'published') {
        continue;
      }

      // Filter by fellowshipId if specified
      if (fellowshipId && data.fellowshipId && data.fellowshipId !== fellowshipId) {
        continue;
      }

      firestoreLessons.push({
        ...data,
        id: lessonId,
        weekNumber: Number(data.weekNumber) || 1,
        weekTitle: data.weekTitle || `Week ${data.weekNumber || 1}`,
        weekEnding: data.weekEnding || calculateWeekEnding(2026, data.month || 'August', Number(data.weekNumber) || 1),
        displayOrder: Number(data.displayOrder) || Number(data.sessionNumber) || 1,
        modality: data.modality || 'MRI/fMRI',
        month: data.month || 'August',
      });
    }

    // Sort in memory by weekNumber asc, displayOrder asc
    firestoreLessons.sort((a, b) => {
      const weekDiff = (a.weekNumber || 1) - (b.weekNumber || 1);
      if (weekDiff !== 0) return weekDiff;
      return (a.displayOrder || 1) - (b.displayOrder || 1);
    });

    return firestoreLessons;
  } catch (error) {
    console.warn('Error fetching Firestore lessons:', error);
    return [];
  }
};

/**
 * Fetch video access details for a specific lesson from 'videoAccess/{lessonId}'
 */
export const getVideoAccess = async (lessonId: string): Promise<VideoAccess | null> => {
  try {
    const videoRef = doc(db, 'videoAccess', lessonId);
    const videoSnap = await getDoc(videoRef);
    if (videoSnap.exists()) {
      return videoSnap.data() as VideoAccess;
    }
  } catch (error) {
    console.warn('Error fetching video access from Firestore:', error);
  }

  return null;
};

export interface GroupedWeek {
  weekNumber: number;
  weekTitle: string;
  weekEnding: string;
  lessons: LessonWithVideoAccess[];
}

export interface GroupedMonth {
  month: FellowshipMonth;
  weeks: GroupedWeek[];
}

/**
 * Group lessons into hierarchical structure: Month -> Week -> Lessons
 */
export const groupLessonsByMonthAndWeek = (
  lessons: LessonWithVideoAccess[]
): GroupedMonth[] => {
  const monthMap = new Map<FellowshipMonth, Map<number, LessonWithVideoAccess[]>>();

  lessons.forEach((lesson) => {
    const month = lesson.month || 'August';
    const week = lesson.weekNumber || 1;

    if (!monthMap.has(month)) {
      monthMap.set(month, new Map());
    }

    const weekMap = monthMap.get(month)!;
    if (!weekMap.has(week)) {
      weekMap.set(week, []);
    }

    weekMap.get(week)!.push(lesson);
  });

  const result: GroupedMonth[] = [];

  monthMap.forEach((weekMap, month) => {
    const weeks: GroupedWeek[] = [];

    weekMap.forEach((weekLessons, weekNumber) => {
      const sortedLessons = [...weekLessons].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      const sampleLesson = sortedLessons[0];
      weeks.push({
        weekNumber,
        weekTitle: sampleLesson?.weekTitle || `Week ${weekNumber}`,
        weekEnding: sampleLesson?.weekEnding || '',
        lessons: sortedLessons,
      });
    });

    weeks.sort((a, b) => a.weekNumber - b.weekNumber);

    result.push({
      month,
      weeks,
    });
  });

  return result;
};

// ============================================================================
// ABDN TA FELLOWSHIP MASTER CURRICULUM SERVICE
// Source: https://github.com/African-Brain-Data-Network/ABDN_TA_Fellowship_Curriculum
// ============================================================================

export const DEFAULT_CURRICULUM_REPO = 'African-Brain-Data-Network/ABDN_TA_Fellowship_Curriculum';

export interface CurriculumTopic {
  weekNumber?: number;
  title: string;
  todo?: string;
  date?: string;
}

export interface ModalityCurriculumModule {
  number: number;
  title: string;
  monthName?: string;
  learningObjective?: string;
  topics: CurriculumTopic[];
  todos?: string[];
  lectureMaterials?: { label: string; url: string }[];
}

export interface ModalityCurriculumData {
  modalityId: string;
  modalityName: string;
  overview: string;
  objectives?: string[];
  modules: ModalityCurriculumModule[];
  rawMarkdown?: string;
  githubUrl: string;
  assessmentsDeliverables?: string[];
}

/**
 * Modality ID / Type to GitHub markdown file name mapping
 */
export const getCurriculumFileName = (modality: string): string => {
  const norm = modality.toLowerCase().trim();
  if (norm === 'eeg' || norm.includes('electroencephalography')) return 'eeg.md';
  if (norm === 'mri' || norm.includes('mri') || norm.includes('fmri')) return 'mri_fmri.md';
  if (norm === 'ephys' || norm.includes('electrophysiology')) return 'electrophysiology.md';
  if (norm === 'fnirs' || norm.includes('fnir') || norm.includes('optical')) return 'fnir.md';
  return 'eeg.md';
};

/**
 * Modality metadata descriptor
 */
const modalityMetadata: Record<string, { id: string; name: string; overview: string }> = {
  eeg: {
    id: 'eeg',
    name: 'EEG Data Science & Signal Processing',
    overview: 'Structured 5-month curriculum covering electroencephalography, from cellular signal generation to MNE-Python analysis, ERPs, and clinical paper writing.'
  },
  mri: {
    id: 'mri',
    name: 'Structural & Functional MRI Analysis',
    overview: 'Comprehensive curriculum from nuclear magnetic resonance physics to structural morphometry, BOLD fMRI preprocessing, and clinical disease pathology.'
  },
  ephys: {
    id: 'ephys',
    name: 'Cellular & Systems Electrophysiology',
    overview: 'Foundations and practical applications of electrophysiology, from cellular excitability to microelectrode array recording, spike sorting with SpikeInterface, and scientific publication.'
  },
  fnirs: {
    id: 'fnirs',
    name: 'fNIRS Optical Brain Imaging',
    overview: 'Structured 5-month curriculum covering functional near-infrared spectroscopy (fNIRS), from optical physics to Homer3/MNE-NIRS data processing and cognitive neuroimaging.'
  }
};

/**
 * In-memory cache for live GitHub raw curriculum requests
 */
const curriculumCache = new Map<string, { data: ModalityCurriculumData; timestamp: number }>();
const CURRICULUM_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

/**
 * Fetch and parse full modality curriculum from ABDN_TA_Fellowship_Curriculum GitHub repo
 */
export async function fetchModalityCurriculum(
  modalityTypeOrId: string
): Promise<ModalityCurriculumData> {
  const fileName = getCurriculumFileName(modalityTypeOrId);
  const cacheKey = fileName;
  const now = Date.now();

  const cached = curriculumCache.get(cacheKey);
  if (cached && now - cached.timestamp < CURRICULUM_CACHE_TTL) {
    return cached.data;
  }

  // Normalize key for metadata
  let modKey = 'eeg';
  if (fileName.includes('mri')) modKey = 'mri';
  else if (fileName.includes('electrophysiology')) modKey = 'ephys';
  else if (fileName.includes('fnir')) modKey = 'fnirs';

  const meta = modalityMetadata[modKey] || modalityMetadata.eeg;
  const githubUrl = `https://github.com/${DEFAULT_CURRICULUM_REPO}/blob/main/${fileName}`;

  try {
    const rawUrl = `https://raw.githubusercontent.com/${DEFAULT_CURRICULUM_REPO}/main/${fileName}`;
    const response = await fetch(rawUrl);

    if (response.ok) {
      const markdown = await response.text();
      const parsedData = parseCurriculumMarkdown(markdown, modKey, githubUrl);
      curriculumCache.set(cacheKey, { data: parsedData, timestamp: now });
      return parsedData;
    }
  } catch (error) {
    console.warn(`Error fetching live curriculum for ${fileName}:`, error);
  }

  return {
    modalityId: meta.id,
    modalityName: meta.name,
    overview: meta.overview,
    modules: [],
    githubUrl
  };
}

/**
 * Parse Markdown curriculum into structured modules and weekly topics
 */
export function parseCurriculumMarkdown(
  markdown: string,
  modalityId: string,
  githubUrl: string
): ModalityCurriculumData {
  const lines = markdown.split('\n');
  const modules: ModalityCurriculumModule[] = [];
  let currentModule: ModalityCurriculumModule | null = null;
  let moduleCount = 0;
  let overview = '';
  const objectives: string[] = [];
  const assessmentsDeliverables: string[] = [];

  let inOverview = false;
  let inObjectives = false;
  let inAssessments = false;
  let inLectureMaterials = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Headings
    if (line.startsWith('## ')) {
      const heading = line.replace(/^##\s+/, '').trim();

      if (heading.toLowerCase().includes('overview')) {
        inOverview = true;
        inObjectives = false;
        inAssessments = false;
        inLectureMaterials = false;
        continue;
      } else if (heading.toLowerCase().includes('objective')) {
        inOverview = false;
        inObjectives = true;
        inAssessments = false;
        inLectureMaterials = false;
        continue;
      } else if (heading.toLowerCase().includes('assessment') || heading.toLowerCase().includes('deliverable')) {
        inOverview = false;
        inObjectives = false;
        inAssessments = true;
        inLectureMaterials = false;
        continue;
      } else if (heading.toLowerCase().includes('lecture material')) {
        inOverview = false;
        inObjectives = false;
        inAssessments = false;
        inLectureMaterials = true;
        continue;
      } else if (heading.toLowerCase().startsWith('to do')) {
        inOverview = false;
        inObjectives = false;
        inAssessments = false;
        inLectureMaterials = false;
        continue;
      } else {
        // This is a Module heading (e.g. "June — Introductions", "Module 1 — Foundations...")
        inOverview = false;
        inObjectives = false;
        inAssessments = false;
        inLectureMaterials = false;

        moduleCount++;
        currentModule = {
          number: moduleCount,
          title: heading,
          monthName: heading.split('—')[0]?.trim() || `Module ${moduleCount}`,
          topics: [],
          todos: [],
          lectureMaterials: []
        };
        modules.push(currentModule);
        continue;
      }
    }

    if (inOverview && line && !line.startsWith('#')) {
      if (overview.length < 300) {
        overview += (overview ? ' ' : '') + line;
      }
    }

    if (inObjectives && line.startsWith('- ')) {
      objectives.push(line.replace(/^- \s*/, ''));
    }

    if (inAssessments && line.startsWith('- ')) {
      assessmentsDeliverables.push(line.replace(/^- \s*/, ''));
    }

    if (currentModule) {
      // Learning objective
      if (line.toLowerCase().includes('learning objective:')) {
        const objText = line.replace(/^[*\s_]*learning objective:\s*[*\s_]*/i, '').trim();
        currentModule.learningObjective = objText;
      }
      // Topic
      else if (line.startsWith('- Week') || line.startsWith('- week') || (line.startsWith('- ') && !inLectureMaterials)) {
        const raw = line.replace(/^- \s*/, '').trim();
        const weekMatch = raw.match(/Week\s*(\d+)/i);
        const weekNumber = weekMatch ? parseInt(weekMatch[1], 10) : undefined;
        
        currentModule.topics.push({
          weekNumber,
          title: raw
        });
      }
      // TO DO item
      else if (line.startsWith('_TO DO:') || line.startsWith('TO DO:')) {
        const todoText = line.replace(/^[_*\s]*TO DO:\s*[_*\s]*/i, '').replace(/[_*]/g, '').trim();
        if (currentModule.topics.length > 0) {
          const lastTopic = currentModule.topics[currentModule.topics.length - 1];
          lastTopic.todo = todoText;
        } else {
          currentModule.todos = currentModule.todos || [];
          currentModule.todos.push(todoText);
        }
      }
    }

    // Lecture materials link parsing
    if (inLectureMaterials && line.startsWith('- [')) {
      const match = line.match(/- \[(.*?)\]\((.*?)\)/);
      if (match && modules.length > 0) {
        const targetMod = modules[0];
        targetMod.lectureMaterials = targetMod.lectureMaterials || [];
        targetMod.lectureMaterials.push({ label: match[1], url: match[2] });
      }
    }
  }

  // Get metadata description
  let modKey = 'eeg';
  if (modalityId.includes('mri')) modKey = 'mri';
  else if (modalityId.includes('ephys') || modalityId.includes('electrophysiology')) modKey = 'ephys';
  else if (modalityId.includes('fnirs') || modalityId.includes('fnir')) modKey = 'fnirs';

  const meta = modalityMetadata[modKey] || modalityMetadata.eeg;

  return {
    modalityId,
    modalityName: meta.name,
    overview: overview || meta.overview,
    objectives: objectives.length > 0 ? objectives : undefined,
    assessmentsDeliverables: assessmentsDeliverables.length > 0 ? assessmentsDeliverables : undefined,
    modules,
    rawMarkdown: markdown,
    githubUrl
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  type: 'video' | 'material' | 'assessment' | 'cert' | 'announcement';
  lesson?: LessonWithVideoAccess;
  url?: string;
  timestamp?: number;
}

export interface GitHubActivityItem {
  id: string;
  message: string;
  date: string;
  url: string;
  author: string;
  modality?: string;
}

/**
 * Fetch and transform GitHub repository asset updates into learner-friendly notifications
 * Filters developer noise (typos, merges, gitignores) into meaningful educational events
 */
export async function fetchRecentGitHubActivity(
  repo: string = DEFAULT_GITHUB_REPO
): Promise<GitHubActivityItem[]> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=10`);
    if (!res.ok) return [];
    const commits = await res.json();
    if (!Array.isArray(commits)) return [];
    
    const seenModalities = new Set<string>();
    const learnerEvents: GitHubActivityItem[] = [];

    for (const c of commits) {
      const rawMessage = c.commit?.message?.split('\n')[0] || '';
      const msgLower = rawMessage.toLowerCase();

      // Filter developer noise: merges, minor git fixes, CI/CD, bot commits
      if (
        msgLower.startsWith('merge ') ||
        msgLower.includes('gitignore') ||
        msgLower.includes('fix typo') ||
        msgLower.includes('bump version') ||
        msgLower.includes('formatting')
      ) {
        continue;
      }

      let modality = 'Fellowship Cohort';
      let title = 'Lecture Assets & Study Materials Updated';

      if (msgLower.includes('mri') || msgLower.includes('fmri') || msgLower.includes('freesurfer') || msgLower.includes('bids')) {
        modality = 'MRI/fMRI';
        title = 'MRI/fMRI: Preprocessing Slides & Lab Notebooks Updated';
      } else if (msgLower.includes('eeg') || msgLower.includes('erp') || msgLower.includes('mne')) {
        modality = 'EEG';
        title = 'EEG: Signal Processing & ERP Lab Materials Updated';
      } else if (msgLower.includes('fnir') || msgLower.includes('homer') || msgLower.includes('snirf')) {
        modality = 'fNIRS';
        title = 'fNIRS: Optical Imaging & Montage Guide Updated';
      } else if (msgLower.includes('ephys') || msgLower.includes('spike') || msgLower.includes('electrophysiology')) {
        modality = 'Electrophysiology';
        title = 'Electrophysiology: Spike Sorting Code & Datasets Updated';
      } else if (msgLower.includes('slide') || msgLower.includes('lecture') || msgLower.includes('notes')) {
        title = 'New Lecture Slides & Course Materials Released';
      } else if (msgLower.includes('assignment') || msgLower.includes('homework') || msgLower.includes('lab')) {
        title = 'New Hands-on Coding Lab & Assignment Available';
      }

      // Deduplicate: produce 1 clean event per modality to prevent spam
      if (seenModalities.has(modality)) {
        continue;
      }
      seenModalities.add(modality);

      learnerEvents.push({
        id: `gh-asset-${modality.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        message: rawMessage.length > 5 ? rawMessage : title,
        date: c.commit?.author?.date || new Date().toISOString(),
        url: c.html_url || `https://github.com/${repo}`,
        author: c.commit?.author?.name || 'ABDN Faculty',
        modality
      });

      if (learnerEvents.length >= 3) break;
    }

    return learnerEvents;
  } catch (err) {
    console.warn('Error fetching GitHub repository activity:', err);
    return [];
  }
}

/**
 * Helper to compute friendly relative time string
 */
export function getRelativeTimeString(dateInput?: string | number | Date): string {
  if (!dateInput) return 'Recently';
  const now = Date.now();
  const time = new Date(dateInput).getTime();
  if (isNaN(time)) return 'Recently';
  const diffSec = Math.floor((now - time) / 1000);

  if (diffSec < 60) return 'Just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 172800) return 'Yesterday';
  if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;
  return new Date(time).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}


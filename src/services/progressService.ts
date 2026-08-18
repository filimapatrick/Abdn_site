import { db } from '../firebase/config';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { LessonWithVideoAccess, ModalityType } from './elearningService';

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

export interface UserLessonProgress {
  lessonId: string;
  userId: string;
  contentId?: string;
  modality?: string;
  status: ProgressStatus;
  progressPercent: number; // 0, 10, or 100
  startedAt?: any;
  completedAt?: any;
  lastAccessedAt?: any;
}

export interface ProgressMetrics {
  totalLessons: number;
  completedCount: number;
  inProgressCount: number;
  overallPercent: number;
  modalityBreakdown: Record<string, { total: number; completed: number; percent: number }>;
  continueLearningLesson: LessonWithVideoAccess | null;
}

const LOCAL_STORAGE_KEY_PREFIX = 'abdn_progress_';

/**
 * Fetch all progress records for a user from Firestore subcollection: users/{userId}/progress
 * Falls back to local storage cache if offline or unauthenticated
 */
export async function getUserProgressMap(userId?: string | null): Promise<Record<string, UserLessonProgress>> {
  const progressMap: Record<string, UserLessonProgress> = {};

  // Check local storage cache first
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}${userId || 'guest'}`);
      if (cached) {
        Object.assign(progressMap, JSON.parse(cached));
      }
    } catch (e) {
      console.warn('Could not read local progress cache:', e);
    }
  }

  if (!userId) return progressMap;

  try {
    const progressRef = collection(db, 'users', userId, 'progress');
    const snapshot = await getDocs(progressRef);

    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as UserLessonProgress;
      progressMap[docSnap.id] = {
        ...data,
        lessonId: docSnap.id
      };
    });

    // Update local storage cache
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${userId}`, JSON.stringify(progressMap));
      } catch (e) {}
    }
  } catch (error) {
    console.warn('Error querying Firestore user progress, using local cache:', error);
  }

  return progressMap;
}

/**
 * Record that a learner opened / started a lesson:
 * Sets status: 'in_progress' and progressPercent: 10
 */
export async function recordLessonStarted(
  userId: string | undefined | null,
  lessonId: string,
  contentId?: string,
  modality?: string
): Promise<UserLessonProgress> {
  const existingProgress = await getLessonProgress(userId, lessonId);

  // If already completed, do not revert to in_progress
  if (existingProgress?.status === 'completed') {
    return existingProgress;
  }

  const progressData: UserLessonProgress = {
    lessonId,
    userId: userId || 'guest',
    contentId: contentId || lessonId,
    modality: modality || 'MRI/fMRI',
    status: 'in_progress',
    progressPercent: 15,
    startedAt: existingProgress?.startedAt || new Date().toISOString(),
    lastAccessedAt: new Date().toISOString()
  };

  // Update local cache
  updateLocalCache(userId, lessonId, progressData);

  if (userId) {
    try {
      const docRef = doc(db, 'users', userId, 'progress', lessonId);
      await setDoc(docRef, {
        ...progressData,
        startedAt: existingProgress?.startedAt || serverTimestamp(),
        lastAccessedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.warn('Could not write lesson start to Firestore:', error);
    }
  }

  return progressData;
}

/**
 * Record that a learner explicitly marked a lesson as complete:
 * Sets status: 'completed' and progressPercent: 100
 */
export async function recordLessonCompleted(
  userId: string | undefined | null,
  lessonId: string,
  contentId?: string,
  modality?: string
): Promise<UserLessonProgress> {
  const existingProgress = await getLessonProgress(userId, lessonId);

  const progressData: UserLessonProgress = {
    lessonId,
    userId: userId || 'guest',
    contentId: contentId || lessonId,
    modality: modality || 'MRI/fMRI',
    status: 'completed',
    progressPercent: 100,
    startedAt: existingProgress?.startedAt || new Date().toISOString(),
    completedAt: new Date().toISOString(),
    lastAccessedAt: new Date().toISOString()
  };

  // Update local cache
  updateLocalCache(userId, lessonId, progressData);

  if (userId) {
    try {
      const docRef = doc(db, 'users', userId, 'progress', lessonId);
      await setDoc(docRef, {
        ...progressData,
        startedAt: existingProgress?.startedAt || serverTimestamp(),
        completedAt: serverTimestamp(),
        lastAccessedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.warn('Could not write lesson completion to Firestore:', error);
    }
  }

  return progressData;
}

/**
 * Helper to fetch progress for a single lesson
 */
export async function getLessonProgress(
  userId: string | undefined | null,
  lessonId: string
): Promise<UserLessonProgress | null> {
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}${userId || 'guest'}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed[lessonId]) return parsed[lessonId];
      }
    } catch (e) {}
  }

  if (!userId) return null;

  try {
    const docRef = doc(db, 'users', userId, 'progress', lessonId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as UserLessonProgress;
    }
  } catch (e) {}

  return null;
}

function updateLocalCache(userId: string | undefined | null, lessonId: string, data: UserLessonProgress) {
  if (typeof window === 'undefined') return;
  try {
    const key = `${LOCAL_STORAGE_KEY_PREFIX}${userId || 'guest'}`;
    const existing = localStorage.getItem(key);
    const map = existing ? JSON.parse(existing) : {};
    map[lessonId] = data;
    localStorage.setItem(key, JSON.stringify(map));
  } catch (e) {}
}

/**
 * Calculate full fellowship and modality metrics dynamically from source-of-truth progress records
 */
export function calculateProgressMetrics(
  lessons: LessonWithVideoAccess[],
  progressMap: Record<string, UserLessonProgress>
): ProgressMetrics {
  const totalLessons = lessons.length;
  let completedCount = 0;
  let inProgressCount = 0;

  const modalityMap: Record<string, { total: number; completed: number; percent: number }> = {
    'MRI/fMRI': { total: 0, completed: 0, percent: 0 },
    'EEG': { total: 0, completed: 0, percent: 0 },
    'fNIRS': { total: 0, completed: 0, percent: 0 },
    'Electrophysiology': { total: 0, completed: 0, percent: 0 }
  };

  let inProgressLesson: LessonWithVideoAccess | null = null;
  let firstUnstartedLesson: LessonWithVideoAccess | null = null;

  lessons.forEach((lesson) => {
    const lessonKey = lesson.id || lesson.contentId;
    const progress = progressMap[lessonKey] || (lesson.id ? progressMap[lesson.id] : null) || (lesson.contentId ? progressMap[lesson.contentId] : null);
    const modalityKey = lesson.modality || 'MRI/fMRI';

    if (!modalityMap[modalityKey]) {
      modalityMap[modalityKey] = { total: 0, completed: 0, percent: 0 };
    }
    modalityMap[modalityKey].total += 1;

    if (progress?.status === 'completed') {
      completedCount += 1;
      modalityMap[modalityKey].completed += 1;
    } else if (progress?.status === 'in_progress') {
      inProgressCount += 1;
      if (!inProgressLesson) {
        inProgressLesson = lesson;
      }
    } else {
      if (!firstUnstartedLesson) {
        firstUnstartedLesson = lesson;
      }
    }
  });

  // Compute percentage per modality
  Object.keys(modalityMap).forEach((m) => {
    const data = modalityMap[m];
    data.percent = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
  });

  const overallPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return {
    totalLessons,
    completedCount,
    inProgressCount,
    overallPercent,
    modalityBreakdown: modalityMap,
    continueLearningLesson: inProgressLesson || firstUnstartedLesson || lessons[0] || null
  };
}

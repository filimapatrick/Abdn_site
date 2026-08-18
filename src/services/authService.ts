import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';

export interface EnrolledPathway {
  pathwayId: string;
  pathwayName: string;
  enrolledAt: string;
  progress: number;
  currentLevel: string;
  completedLessons: string[];
}

export interface ElearningUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  role: string;
  selectedPathway?: string | null;
  enrolledPathways: EnrolledPathway[];
  completedExercises: string[];
  certificates: string[];
  authProvider: 'password' | 'google.com';
  onboardingCompleted?: boolean;
  experienceLevel?: 'beginner' | 'some_experience' | 'intermediate' | 'advanced' | string;
  learningGoals?: string[];
  institution?: string;
  country?: string;
  bio?: string;
  createdAt?: any;
  lastLoginAt?: any;
}

const USERS_COLLECTION = 'elearning_users';
const BACKUP_USERS_COLLECTION = 'users';

/**
 * Helper to write/update user documents across both elearning_users and users collections
 */
async function writeUserDocDual(uid: string, data: any, merge: boolean = true) {
  try {
    const primaryRef = doc(db, USERS_COLLECTION, uid);
    await setDoc(primaryRef, data, { merge });
  } catch (err) {
    console.warn(`Error writing to ${USERS_COLLECTION}:`, err);
  }

  try {
    const backupRef = doc(db, BACKUP_USERS_COLLECTION, uid);
    await setDoc(backupRef, data, { merge });
  } catch (err) {
    console.warn(`Error writing to ${BACKUP_USERS_COLLECTION}:`, err);
  }
}

/**
 * Creates or updates the user profile document in the `elearning_users` and `users` collections.
 */
export async function syncElearningUserDocument(
  user: FirebaseUser,
  extraData?: {
    displayName?: string;
    role?: string;
    selectedPathway?: string | null;
    authProvider?: 'password' | 'google.com';
  }
): Promise<ElearningUser> {
  const userDocRef = doc(db, USERS_COLLECTION, user.uid);
  let userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    // Check backup 'users' collection as fallback
    const backupRef = doc(db, BACKUP_USERS_COLLECTION, user.uid);
    const backupSnap = await getDoc(backupRef);
    if (backupSnap.exists()) {
      userSnapshot = backupSnap;
    }
  }

  const initialPathway = extraData?.selectedPathway;
  const initialEnrolled: EnrolledPathway[] = initialPathway
    ? [
        {
          pathwayId: initialPathway.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          pathwayName: initialPathway,
          enrolledAt: new Date().toISOString(),
          progress: 0,
          currentLevel: 'Level 1: Foundations',
          completedLessons: [],
        },
      ]
    : [];

  if (!userSnapshot.exists()) {
    // New user in Firestore
    const newUserData: ElearningUser = {
      uid: user.uid,
      email: user.email,
      displayName: extraData?.displayName || user.displayName || 'ABDN Scholar',
      photoURL: user.photoURL || null,
      role: extraData?.role || 'researcher',
      selectedPathway: initialPathway || null,
      enrolledPathways: initialEnrolled,
      completedExercises: [],
      certificates: [],
      authProvider: extraData?.authProvider || (user.providerData[0]?.providerId === 'google.com' ? 'google.com' : 'password'),
      onboardingCompleted: false,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    };

    await writeUserDocDual(user.uid, newUserData, true);
    return newUserData;
  } else {
    // Existing user: update last login and optionally add pathway if specified
    const existingData = userSnapshot.data() as ElearningUser;
    const updates: Partial<ElearningUser> & { lastLoginAt: any } = {
      lastLoginAt: serverTimestamp(),
    };

    if (extraData?.displayName && !existingData.displayName) {
      updates.displayName = extraData.displayName;
    }

    if (initialPathway) {
      const alreadyEnrolled = existingData.enrolledPathways?.some(
        (p) => p.pathwayName.toLowerCase() === initialPathway.toLowerCase()
      );
      if (!alreadyEnrolled) {
        const newEntry: EnrolledPathway = {
          pathwayId: initialPathway.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          pathwayName: initialPathway,
          enrolledAt: new Date().toISOString(),
          progress: 0,
          currentLevel: 'Level 1: Foundations',
          completedLessons: [],
        };
        const updatedEnrolled = [...(existingData.enrolledPathways || []), newEntry];
        await writeUserDocDual(user.uid, {
          ...updates,
          enrolledPathways: updatedEnrolled,
          selectedPathway: initialPathway,
        }, true);

        return {
          ...existingData,
          ...updates,
          selectedPathway: initialPathway,
          enrolledPathways: updatedEnrolled,
        };
      }
    }

    await writeUserDocDual(user.uid, updates, true);
    return { ...existingData, ...updates };
  }
}

/**
 * Register a new user with Email and Password
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  fullName: string,
  role: string = 'researcher',
  selectedPathway: string | null = null
): Promise<{ user: FirebaseUser; profile: ElearningUser }> {
  // 1. Create auth user
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // 2. Update Firebase Auth displayName
  if (fullName) {
    await updateProfile(user, { displayName: fullName });
  }

  // 3. Create document in `elearning_users` collection
  const profile = await syncElearningUserDocument(user, {
    displayName: fullName,
    role,
    selectedPathway,
    authProvider: 'password',
  });

  return { user, profile };
}

/**
 * Sign In existing user with Email and Password
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<{ user: FirebaseUser; profile: ElearningUser }> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Sync / update last login in Firestore
  const profile = await syncElearningUserDocument(user);

  return { user, profile };
}

/**
 * Sign In or Register with Google OAuth
 */
export async function signInWithGoogle(
  selectedPathway: string | null = null,
  role: string = 'researcher'
): Promise<{ user: FirebaseUser; profile: ElearningUser }> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  const profile = await syncElearningUserDocument(user, {
    displayName: user.displayName || 'ABDN Researcher',
    role,
    selectedPathway,
    authProvider: 'google.com',
  });

  return { user, profile };
}

/**
 * Send Password Reset Email
 */
export async function sendPasswordReset(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Sign out
 */
export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Get Elearning user profile by UID (checks primary and backup collections)
 */
export async function getElearningUserProfile(uid: string): Promise<ElearningUser | null> {
  try {
    const userDocRef = doc(db, USERS_COLLECTION, uid);
    let snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data() as ElearningUser;
    }
    
    // Check backup 'users' collection
    const backupRef = doc(db, BACKUP_USERS_COLLECTION, uid);
    const backupSnap = await getDoc(backupRef);
    if (backupSnap.exists()) {
      return backupSnap.data() as ElearningUser;
    }
    return null;
  } catch (error) {
    console.error('Error fetching elearning user profile:', error);
    return null;
  }
}

/**
 * Enroll a user into a learning pathway
 */
export async function enrollInPathway(
  uid: string,
  pathwayName: string
): Promise<void> {
  const profile = await getElearningUserProfile(uid);
  const currentList = profile?.enrolledPathways || [];
  const exists = currentList.some(
    (p) => p.pathwayName.toLowerCase() === pathwayName.toLowerCase()
  );

  if (!exists) {
    const newEntry: EnrolledPathway = {
      pathwayId: pathwayName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      pathwayName,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      currentLevel: 'Level 1: Foundations',
      completedLessons: [],
    };

    await writeUserDocDual(uid, {
      enrolledPathways: [...currentList, newEntry],
      selectedPathway: pathwayName,
      lastLoginAt: serverTimestamp(),
    }, true);
  }
}

/**
 * Unenroll a user from a learning pathway
 */
export async function unenrollFromPathway(
  uid: string,
  pathwayName: string
): Promise<void> {
  const profile = await getElearningUserProfile(uid);
  const currentList = profile?.enrolledPathways || [];
  
  // Filter out matching pathway
  const updatedList = currentList.filter(
    (p) =>
      !p.pathwayName.toLowerCase().includes(pathwayName.toLowerCase()) &&
      !pathwayName.toLowerCase().includes(p.pathwayName.toLowerCase())
  );

  // If active selected pathway was this one, pick another or fallback
  let updatedSelected = profile?.selectedPathway;
  if (
    updatedSelected &&
    (updatedSelected.toLowerCase().includes(pathwayName.toLowerCase()) ||
      pathwayName.toLowerCase().includes(updatedSelected.toLowerCase()))
  ) {
    updatedSelected = updatedList.length > 0 ? updatedList[0].pathwayName : 'Brain Data Science Foundations';
  }

  await writeUserDocDual(uid, {
    enrolledPathways: updatedList,
    selectedPathway: updatedSelected,
    lastLoginAt: serverTimestamp(),
  }, true);
}

/**
 * Update Elearning user profile fields
 */
export async function updateElearningUserProfile(
  uid: string,
  updates: Partial<ElearningUser>
): Promise<void> {
  await writeUserDocDual(uid, {
    ...updates,
    lastLoginAt: serverTimestamp(),
  }, true);
}

/**
 * Save user onboarding choices (modalities, experience, goals) and mark onboarding as complete
 */
export async function saveUserOnboarding(
  uid: string,
  data: {
    selectedModalities: string[];
    experienceLevel: string;
    learningGoals: string[];
  }
): Promise<void> {
  const profile = await getElearningUserProfile(uid);
  const existingEnrolled = profile?.enrolledPathways || [];

  // Construct enrolled pathways for all chosen modalities
  const newEnrolledList: EnrolledPathway[] = [...existingEnrolled];

  data.selectedModalities.forEach((modalityName) => {
    const alreadyExists = newEnrolledList.some(
      (p) => p.pathwayName.toLowerCase() === modalityName.toLowerCase()
    );
    if (!alreadyExists) {
      newEnrolledList.push({
        pathwayId: modalityName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        pathwayName: modalityName,
        enrolledAt: new Date().toISOString(),
        progress: 0,
        currentLevel: 'Level 1: Foundations',
        completedLessons: [],
      });
    }
  });

  const primaryPathway =
    data.selectedModalities.length > 0
      ? data.selectedModalities[0]
      : 'Brain Data Science Foundations';

  await writeUserDocDual(uid, {
    onboardingCompleted: true,
    experienceLevel: data.experienceLevel,
    learningGoals: data.learningGoals,
    enrolledPathways: newEnrolledList,
    selectedPathway: primaryPathway,
    lastLoginAt: serverTimestamp(),
  }, true);
}


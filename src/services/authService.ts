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
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';
import {
  normalizeEmail,
  isLocallyApprovedFellow,
  isSuperadminEmail,
} from '../config/approvedEmails';

/**
 * Details of an approved fellow from the Firestore `approved_fellows` whitelist
 */
export interface ApprovedFellowData {
  email: string;
  displayName?: string;
  role?: string;
  assignedModality?: string;
  gender?: string;
  institution?: string;
  country?: string;
  cohortYear?: string;
  program?: string;
  active?: boolean;
}

export interface WhitelistVerificationResult {
  approved: boolean;
  role?: string;
  data?: ApprovedFellowData;
}

/**
 * Maps raw or shorthand modality strings to formal ABDN Learning Pathway names
 */
export function mapModalityToPathwayName(modality?: string | null): string {
  if (!modality) return 'Structural MRI Analysis';
  const m = modality.trim().toLowerCase();
  if (m.includes('mri') || m.includes('fmri')) {
    return 'Structural MRI Analysis';
  }
  if (m.includes('eeg')) {
    return 'EEG Data Science';
  }
  if (m.includes('fnirs') || m.includes('optical')) {
    return 'fNIRS Optical Neuroimaging';
  }
  if (m.includes('electro') || m.includes('lfp') || m.includes('spike') || m.includes('ephys')) {
    return 'Electrophysiological Dynamics';
  }
  return modality;
}

/**
 * Utility helper to ensure Firestore promises don't block forever while allowing plenty of time for network/auth handshakes
 */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number = 12000, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), timeoutMs)),
  ]);
}

/**
 * Checks whether an email is approved for ABDN Fellowship platform access.
 * Checks against:
 * 1. Primary lookup in Firestore `approved_fellows` collection (doc ID = normalized email)
 * 1b. Fallback query where email == normalized
 * 2. Static Superadmin configuration fallback
 */
export async function isEmailApprovedFellow(
  email: string | null | undefined
): Promise<WhitelistVerificationResult> {
  const normalized = normalizeEmail(email);
  if (!normalized) return { approved: false };

  // 1. Primary Dynamic check in Firestore `approved_fellows` collection (doc ID = normalized email)
  try {
    const docRef = doc(db, "approved_fellows", normalized);
    const snap = await withTimeout(getDoc(docRef), 12000, null as any);
    if (snap && snap.exists()) {
      const data = snap.data() as ApprovedFellowData;
      if (data?.active !== false) {
        const rawRole = (data?.role || "fellow").toLowerCase();
        const isSuper = rawRole.includes("admin") || rawRole === "superadmin";
        const role = isSuper ? "superadmin" : (data?.role || "fellow");
        const assignedModality =
          data.assignedModality ||
          (data as any).modality ||
          (data as any).cohortTrack ||
          (data as any).track ||
          (data as any).pathway ||
          (data as any).selectedPathway ||
          '';

        return {
          approved: true,
          role,
          data: {
            ...data,
            email: normalized,
            role,
            assignedModality: assignedModality || undefined,
            cohortYear: data.cohortYear || '2026',
            program: data.program || 'ABDN Fellowship',
          },
        };
      }
    }

    // 1b. Fallback secondary query in case document ID is different from email
    const q = query(collection(db, "approved_fellows"), where("email", "==", normalized));
    const qSnap = await withTimeout(getDocs(q), 12000, null as any);
    if (qSnap && !qSnap.empty) {
      const docSnap = qSnap.docs[0];
      const data = docSnap.data() as ApprovedFellowData;
      if (data?.active !== false) {
        const rawRole = (data?.role || "fellow").toLowerCase();
        const isSuper = rawRole.includes("admin") || rawRole === "superadmin";
        const role = isSuper ? "superadmin" : (data?.role || "fellow");
        const assignedModality =
          data.assignedModality ||
          (data as any).modality ||
          (data as any).cohortTrack ||
          (data as any).track ||
          (data as any).pathway ||
          (data as any).selectedPathway ||
          '';

        return {
          approved: true,
          role,
          data: {
            ...data,
            email: normalized,
            role,
            assignedModality: assignedModality || undefined,
            cohortYear: data.cohortYear || '2026',
            program: data.program || 'ABDN Fellowship',
          },
        };
      }
    }
  } catch (err) {
    console.warn("Firestore approved_fellows lookup warning:", err);
  }

  // 2. Fallback check for static Superadmins
  if (isSuperadminEmail(normalized)) {
    return {
      approved: true,
      role: "superadmin",
      data: {
        email: normalized,
        role: "superadmin",
        assignedModality: "MRI/fMRI",
        cohortYear: "2026",
        program: "ABDN Fellowship",
      },
    };
  }

  return { approved: false };
}

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
  assignedModality?: string | null;
  gender?: string;
  cohortYear?: string;
  program?: string;
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
const JOIN_REQUESTS_COLLECTION = 'cohort_join_requests';

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
    const backupData = {
      role: 'user',
      ...data,
    };
    await setDoc(backupRef, backupData, { merge });
  } catch (err) {
    console.warn(`Error writing to ${BACKUP_USERS_COLLECTION}:`, err);
  }
}

/**
 * Creates or updates the user profile document in the `elearning_users` and `users` collections.
 * Automatically assigns whitelisted modality and completes onboarding when assignedModality is present.
 */
export async function syncElearningUserDocument(
  user: FirebaseUser,
  extraData?: {
    displayName?: string;
    role?: string;
    selectedPathway?: string | null;
    assignedModality?: string | null;
    gender?: string;
    cohortYear?: string;
    program?: string;
    institution?: string;
    country?: string;
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

  // Whitelist assigned modality from Dashboard ALWAYS takes top priority for approved fellows
  const effectivePathway = extraData?.assignedModality
    ? mapModalityToPathwayName(extraData.assignedModality)
    : (extraData?.selectedPathway ? mapModalityToPathwayName(extraData.selectedPathway) : 'Structural MRI Analysis');

  const initialEnrolled: EnrolledPathway[] = effectivePathway
    ? [
        {
          pathwayId: effectivePathway.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          pathwayName: effectivePathway,
          enrolledAt: new Date().toISOString(),
          progress: 0,
          currentLevel: 'Level 1: Foundations',
          completedLessons: [],
        },
      ]
    : [];

  if (!userSnapshot.exists()) {
    // New user in Firestore - automatically mark onboarding complete if assigned by whitelist
    const hasAssignedCohort = Boolean(extraData?.assignedModality || extraData?.selectedPathway);
    const newUserData: ElearningUser = {
      uid: user.uid,
      email: user.email,
      displayName: extraData?.displayName || user.displayName || 'ABDN Scholar',
      photoURL: user.photoURL || null,
      role: extraData?.role || 'fellow',
      selectedPathway: effectivePathway,
      assignedModality: extraData?.assignedModality || null,
      gender: extraData?.gender || '',
      cohortYear: extraData?.cohortYear || '2026',
      program: extraData?.program || 'ABDN Fellowship',
      institution: extraData?.institution || '',
      country: extraData?.country || '',
      enrolledPathways: initialEnrolled,
      completedExercises: [],
      certificates: [],
      authProvider: extraData?.authProvider || (user.providerData[0]?.providerId === 'google.com' ? 'google.com' : 'password'),
      onboardingCompleted: hasAssignedCohort,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    };

    await writeUserDocDual(user.uid, newUserData, true);
    return newUserData;
  } else {
    // Existing user: update last login and ensure assigned modality is enrolled
    const existingData = userSnapshot.data() as ElearningUser;
    const updates: Partial<ElearningUser> & { lastLoginAt: any } = {
      lastLoginAt: serverTimestamp(),
    };

    if (extraData?.displayName && !existingData.displayName) {
      updates.displayName = extraData.displayName;
    }

    if (extraData?.institution && !existingData.institution) {
      updates.institution = extraData.institution;
    }

    if (extraData?.country && !existingData.country) {
      updates.country = extraData.country;
    }

    if (extraData?.gender && !existingData.gender) {
      updates.gender = extraData.gender;
    }

    if (extraData?.assignedModality && existingData.assignedModality !== extraData.assignedModality) {
      updates.assignedModality = extraData.assignedModality;
      updates.selectedPathway = effectivePathway;
    }

    if (extraData?.role && existingData.role !== extraData.role) {
      updates.role = extraData.role;
    }

    if (effectivePathway) {
      const alreadyEnrolled = existingData.enrolledPathways?.some(
        (p) => p.pathwayName.toLowerCase() === effectivePathway.toLowerCase()
      );
      if (!alreadyEnrolled) {
        const newEntry: EnrolledPathway = {
          pathwayId: effectivePathway.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          pathwayName: effectivePathway,
          enrolledAt: new Date().toISOString(),
          progress: 0,
          currentLevel: 'Level 1: Foundations',
          completedLessons: [],
        };
        const updatedEnrolled = [...(existingData.enrolledPathways || []), newEntry];
        updates.enrolledPathways = updatedEnrolled;
        updates.selectedPathway = effectivePathway;
        updates.onboardingCompleted = true;

        await writeUserDocDual(user.uid, {
          ...updates,
          enrolledPathways: updatedEnrolled,
          selectedPathway: effectivePathway,
        }, true);

        return {
          ...existingData,
          ...updates,
          selectedPathway: effectivePathway,
          enrolledPathways: updatedEnrolled,
          onboardingCompleted: true,
        };
      } else if (existingData.selectedPathway !== effectivePathway) {
        updates.selectedPathway = effectivePathway;
      }
    }

    await writeUserDocDual(user.uid, updates, true);
    return { ...existingData, ...updates };
  }
}

/**
 * Payload for submitting a self-service cohort join request
 */
export interface CohortJoinRequestPayload {
  email: string;
  displayName?: string;
  gender?: string;
  country?: string;
  institution?: string;
  requestedPathway: string;
  experienceLevel?: string;
  learningGoals?: string[];
  notes?: string;
}

export interface ExistingCohortJoinRequest {
  id: string;
  email: string;
  displayName?: string;
  gender?: string;
  country?: string;
  institution?: string;
  requestedPathway?: string;
  status: 'pending' | 'approved' | 'rejected';
}

/**
 * Checks whether an active pending join request exists for the specified email
 */
export async function fetchPendingCohortJoinRequest(
  email: string | null | undefined
): Promise<ExistingCohortJoinRequest | null> {
  const normalized = normalizeEmail(email);
  if (!normalized) return null;

  try {
    const docId = normalized.replace(/[^a-z0-9]/g, '_');
    const docRef = doc(db, JOIN_REQUESTS_COLLECTION, docId);
    const snap = await withTimeout(getDoc(docRef), 4000, null as any);
    if (snap && snap.exists()) {
      const data = snap.data();
      if (data?.status === 'pending') {
        return {
          id: snap.id,
          email: data.email || normalized,
          displayName: data.displayName || '',
          gender: data.gender || '',
          country: data.country || '',
          institution: data.institution || '',
          requestedPathway: data.requestedPathway || 'Structural MRI Analysis',
          status: data.status || 'pending',
        };
      }
    }
  } catch (err) {
    console.warn('fetchPendingCohortJoinRequest warning:', err);
  }
  return null;
}

/**
 * Submit a cohort join request for candidate review
 */
export async function submitCohortJoinRequest(payload: CohortJoinRequestPayload): Promise<string> {
  const normalized = normalizeEmail(payload.email);
  if (!normalized) throw new Error('Valid email is required');

  const docId = normalized.replace(/[^a-z0-9]/g, '_');
  const docRef = doc(db, JOIN_REQUESTS_COLLECTION, docId);

  const requestData = {
    email: normalized,
    displayName: payload.displayName || 'Applicant',
    gender: payload.gender || 'Not specified',
    country: payload.country || 'Not specified',
    institution: payload.institution || 'Not specified',
    requestedPathway: payload.requestedPathway || 'Structural MRI Analysis',
    status: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    await withTimeout(setDoc(docRef, requestData, { merge: true }), 5000, undefined);
  } catch (err) {
    console.warn('Firestore submitCohortJoinRequest warning:', err);
  }
  return docId;
}

/**
 * Register a new user with Email and Password
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  fullName: string,
  role: string = 'researcher',
  selectedPathway: string | null = null,
  institution: string = '',
  country: string = ''
): Promise<{ user: FirebaseUser | null; profile: ElearningUser | null; isUnderReview?: boolean; pendingEmail?: string }> {
  // 0. Verify fellowship email eligibility before creation
  const verification = await isEmailApprovedFellow(email);
  if (!verification.approved) {
    // Submit join request so superadmin receives it in Abdn_dashboard
    try {
      await submitCohortJoinRequest({
        email,
        displayName: fullName,
        requestedPathway: selectedPathway || 'Structural MRI Analysis',
        institution,
        country,
      });
    } catch (e) {
      console.warn('Could not record pending join request:', e);
    }
    return { user: null, profile: null, isUnderReview: true, pendingEmail: email };
  }

  // 1. Create auth user
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // 2. Update Firebase Auth displayName
  if (fullName) {
    await updateProfile(user, { displayName: fullName });
  }

  // 3. Create document in `elearning_users` collection with auto-assigned pathway
  const assignedModality = verification.data?.assignedModality;
  const targetPathway = assignedModality
    ? mapModalityToPathwayName(assignedModality)
    : (selectedPathway ? mapModalityToPathwayName(selectedPathway) : 'Structural MRI Analysis');

  const profile = await syncElearningUserDocument(user, {
    displayName: fullName || verification.data?.displayName,
    role: verification.role || role,
    selectedPathway: targetPathway,
    assignedModality: assignedModality,
    cohortYear: verification.data?.cohortYear,
    program: verification.data?.program,
    institution: verification.data?.institution || institution,
    country: verification.data?.country || country,
    authProvider: 'password',
  });

  return { user, profile, isUnderReview: false };
}

/**
 * Sign In existing user with Email and Password
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<{ user: FirebaseUser | null; profile: ElearningUser | null; isUnderReview?: boolean; pendingEmail?: string }> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  const userEmail = user.email || email;

  // Verify fellowship email eligibility
  const verification = await isEmailApprovedFellow(userEmail);
  if (!verification.approved) {
    try {
      await submitCohortJoinRequest({
        email: userEmail,
        displayName: user.displayName || '',
        requestedPathway: 'Structural MRI Analysis',
      });
    } catch (e) {
      console.warn('Could not record pending join request:', e);
    }
    try {
      await signOut(auth);
    } catch {}
    return { user: null, profile: null, isUnderReview: true, pendingEmail: userEmail };
  }

  const assignedModality = verification.data?.assignedModality;
  const targetPathway = assignedModality ? mapModalityToPathwayName(assignedModality) : 'Structural MRI Analysis';

  // Sync / update last login in Firestore with auto-assigned modality
  const profile = await syncElearningUserDocument(user, {
    displayName: user.displayName || verification.data?.displayName,
    role: verification.role,
    assignedModality: assignedModality,
    selectedPathway: targetPathway,
    cohortYear: verification.data?.cohortYear,
    program: verification.data?.program,
    institution: verification.data?.institution,
    country: verification.data?.country,
  });

  return { user, profile, isUnderReview: false };
}

/**
 * Sign In or Register with Google OAuth
 */
export async function signInWithGoogle(
  selectedPathway: string | null = null,
  role: string = 'researcher'
): Promise<{
  user: FirebaseUser | null;
  profile: ElearningUser | null;
  isUnderReview?: boolean;
  needsProfileDetails?: boolean;
  pendingEmail?: string;
  pendingDisplayName?: string;
  requestedPathway?: string;
}> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  const userEmail = user.email || '';
  const userDisplayName = user.displayName || '';
  const targetPathway = selectedPathway || 'Structural MRI Analysis';

  // Verify fellowship email eligibility
  const verification = await isEmailApprovedFellow(userEmail);
  if (!verification.approved) {
    try {
      await signOut(auth);
    } catch (signOutErr) {
      console.warn('Sign out warning:', signOutErr);
    }

    // Check if candidate already has an active pending application
    const existingPending = await fetchPendingCohortJoinRequest(userEmail);

    if (existingPending) {
      return {
        user: null,
        profile: null,
        isUnderReview: true,
        needsProfileDetails: false,
        pendingEmail: userEmail || undefined,
        pendingDisplayName: existingPending.displayName || userDisplayName || undefined,
        requestedPathway: existingPending.requestedPathway || targetPathway,
      };
    }

    return {
      user: null,
      profile: null,
      isUnderReview: false,
      needsProfileDetails: true,
      pendingEmail: userEmail || undefined,
      pendingDisplayName: userDisplayName || undefined,
      requestedPathway: targetPathway,
    };
  }

  const assignedModality = verification.data?.assignedModality;
  // Whitelist assignedModality is authoritative for approved fellows!
  const effectivePathway = assignedModality
    ? mapModalityToPathwayName(assignedModality)
    : (selectedPathway ? mapModalityToPathwayName(selectedPathway) : 'Structural MRI Analysis');

  const profile = await syncElearningUserDocument(user, {
    displayName: userDisplayName || verification.data?.displayName || 'ABDN Researcher',
    role: verification.role || role,
    selectedPathway: effectivePathway,
    assignedModality: assignedModality || effectivePathway,
    gender: verification.data?.gender,
    cohortYear: verification.data?.cohortYear,
    program: verification.data?.program,
    institution: verification.data?.institution,
    country: verification.data?.country,
    authProvider: 'google.com',
  });

  return { user, profile, isUnderReview: false };
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
  const isSuperAdmin = profile?.role === 'superadmin' || profile?.role === 'admin' || isSuperadminEmail(profile?.email);
  const currentList = profile?.enrolledPathways || [];
  const exists = currentList.some(
    (p) => p.pathwayName.toLowerCase() === pathwayName.toLowerCase()
  );

  if (!exists) {
    if (!isSuperAdmin && currentList.length >= 1) {
      throw new Error(
        'Cohort Limit: ABDN Fellows are limited to enrolling in 1 cohort track. Please unenroll from your active track before joining another.'
      );
    }

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
  const isSuperAdmin = profile?.role === 'superadmin' || profile?.role === 'admin' || isSuperadminEmail(profile?.email);

  // Non-superadmins can only enroll in 1 modality track per cohort
  const modalitiesToSave = (!isSuperAdmin && data.selectedModalities.length > 1)
    ? data.selectedModalities.slice(0, 1)
    : data.selectedModalities;

  // Construct enrolled pathways for chosen modalities
  const newEnrolledList: EnrolledPathway[] = [];

  modalitiesToSave.forEach((modalityName) => {
    newEnrolledList.push({
      pathwayId: modalityName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      pathwayName: modalityName,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      currentLevel: 'Level 1: Foundations',
      completedLessons: [],
    });
  });

  const primaryPathway =
    modalitiesToSave.length > 0
      ? modalitiesToSave[0]
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


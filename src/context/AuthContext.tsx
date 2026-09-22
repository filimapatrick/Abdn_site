import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase/config';
import {
  ElearningUser,
  getElearningUserProfile,
  syncElearningUserDocument,
  signOutUser,
  isEmailApprovedFellow,
  submitCohortJoinRequest,
} from '../services/authService';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: ElearningUser | null;
  loading: boolean;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  loading: true,
  isLoggedIn: false,
  logout: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<ElearningUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (user: FirebaseUser) => {
    try {
      let profile = await getElearningUserProfile(user.uid);
      if (!profile) {
        profile = await syncElearningUserDocument(user);
      }
      setUserProfile(profile);
    } catch (err) {
      console.error('Error in fetchProfile:', err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const verification = await isEmailApprovedFellow(user.email);
          if (!verification.approved) {
            // Unapproved user session: clear state without interfering with active auth flows
            setCurrentUser(null);
            setUserProfile(null);
            setLoading(false);
            return;
          }

          setCurrentUser(user);
          await fetchProfile(user);
        } catch (err) {
          console.warn('AuthContext verification error:', err);
          setCurrentUser(null);
          setUserProfile(null);
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOutUser();
    setCurrentUser(null);
    setUserProfile(null);
  };

  const refreshProfile = async () => {
    if (currentUser) {
      await fetchProfile(currentUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        isLoggedIn: !!currentUser,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

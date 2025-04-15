import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface SupportFormData {
  name: string;
  email: string;
  organization: string;
  message: string;
  createdAt: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface MentorshipFormData {
  name: string;
  email: string;
  organization: string;
  position: string;
  expertise: string;
  experience: string;
  availability: string;
  message: string;
}

interface ABDNAcademyMember {
  fullName: string;
  email: string;
  institution: string;
  degree: string;
  researchInterests: string;
  motivation: string;
  contribution: string;
  futureGoals: string;
  timestamp: Date;
}

interface CollaborationProposal {
  name: string;
  institution: string;
  email: string;
  phone: string;
  type: string;
  projectIdea: string;
  timestamp: Date;
}

export const submitSupportForm = async (formData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'support_requests'), {
      ...formData,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting support form:', error);
    throw error;
  }
};

export const submitInfrastructureContribution = async (formData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'infrastructure_contribution'), {
      ...formData,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting infrastructure contribution:', error);
    throw error;
  }
};

export const submitContactForm = async (formData: ContactFormData) => {
  try {
    const docRef = await addDoc(collection(db, 'contact_messages'), {
      ...formData,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

export const submitMentorshipForm = async (formData: MentorshipFormData) => {
  try {
    const docRef = await addDoc(collection(db, 'mentorship_applications'), {
      ...formData,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting mentorship form:', error);
    throw error;
  }
};

export const submitABDNAcademyApplication = async (formData: Omit<ABDNAcademyMember, 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'abdn_academy_applications'), {
      ...formData,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting ABDN Academy application:', error);
    throw error;
  }
};

export const submitCollaborationProposal = async (formData: Omit<CollaborationProposal, 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'collaboration_proposals'), {
      ...formData,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting collaboration proposal:', error);
    throw error;
  }
}; 
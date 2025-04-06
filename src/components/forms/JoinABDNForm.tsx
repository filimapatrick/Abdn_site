import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Modal from '../academy/Modal';

interface FormData {
  fullName: string;
  email: string;
  institution: string;
  degree: string;
  researchInterests: string;
  motivation: string;
  contribution: string;
  futureGoals: string;
}

interface JoinABDNFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinABDNForm({ isOpen, onClose }: JoinABDNFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    institution: '',
    degree: '',
    researchInterests: '',
    motivation: '',
    contribution: '',
    futureGoals: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Application submitted successfully!');
    onClose();
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      institution: '',
      degree: '',
      researchInterests: '',
      motivation: '',
      contribution: '',
      futureGoals: ''
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-full max-h-[90vh] w-full max-w-4xl bg-gradient-to-br from-amber-50 to-white rounded-lg shadow-lg">
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-amber-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-amber-900">Join ABDN Academy</h2>
          <button
            onClick={onClose}
            className="text-amber-500 hover:text-amber-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="overflow-y-auto px-8 py-6 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Full Name */}
            <div className="w-full">
              <label htmlFor="fullName" className="block text-sm font-medium text-amber-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 bg-white/50"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Address */}
            <div className="w-full">
              <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 bg-white/50"
                placeholder="Enter your email address"
              />
            </div>

            {/* Institution */}
            <div className="w-full">
              <label htmlFor="institution" className="block text-sm font-medium text-amber-900 mb-2">
                Current Institution or Affiliation
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 bg-white/50"
                placeholder="Enter your institution"
              />
            </div>

            {/* Degree Program */}
            <div className="w-full">
              <label htmlFor="degree" className="block text-sm font-medium text-amber-900 mb-2">
                Degree Program (e.g., BSc Neuroscience, MSc Biology)
              </label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 bg-white/50"
                placeholder="Enter your degree program"
              />
            </div>

            {/* Research Interests */}
            <div className="w-full">
              <label htmlFor="researchInterests" className="block text-sm font-medium text-amber-900 mb-2">
                Research Interests in Neuroscience
              </label>
              <textarea
                id="researchInterests"
                name="researchInterests"
                value={formData.researchInterests}
                onChange={handleInputChange}
                rows={3}
                required
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 bg-white/50"
                placeholder="Share your key areas of interest in neuroscience, such as brain imaging, neurodegenerative diseases, computational neuroscience, etc."
              />
            </div>

            {/* Motivation */}
            <div className="w-full">
              <label htmlFor="motivation" className="block text-sm font-medium text-amber-900 mb-2">
                What motivates you to join the ABDN Academy?
              </label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                rows={4}
                required
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 bg-white/50"
                placeholder="Explain how joining the ABDN Academy aligns with your personal and professional goals."
              />
            </div>

            {/* Contribution */}
            <div className="w-full">
              <label htmlFor="contribution" className="block text-sm font-medium text-amber-900 mb-2">
                How can you contribute to the African Brain Data Network community?
              </label>
              <textarea
                id="contribution"
                name="contribution"
                value={formData.contribution}
                onChange={handleInputChange}
                rows={3}
                required
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 bg-white/50"
                placeholder="Describe your skills, experiences, or perspectives that you believe will benefit the community."
              />
            </div>

            {/* Future Goals */}
            <div className="w-full">
              <label htmlFor="futureGoals" className="block text-sm font-medium text-amber-900 mb-2">
                Where do you see yourself in 5 years within the field of neuroscience?
              </label>
              <textarea
                id="futureGoals"
                name="futureGoals"
                value={formData.futureGoals}
                onChange={handleInputChange}
                rows={3}
                required
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 bg-white/50"
                placeholder="Share your long-term aspirations in research, education, or industry."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-amber-100">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center text-lg font-semibold"
              >
                Submit Application
                <ArrowRight className="ml-2 h-6 w-6" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
} 
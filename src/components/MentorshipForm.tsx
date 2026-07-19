import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { submitMentorshipForm, MentorshipFormData } from '../services/supportService';

interface MentorshipFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const MentorshipForm: React.FC<MentorshipFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<MentorshipFormData>({
    name: '',
    email: '',
    organization: '',
    position: '',
    expertise: '',
    experience: '',
    availability: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    }
    
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    
    if (!formData.expertise.trim()) {
      newErrors.expertise = 'Expertise is required';
    }
    
    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience is required';
    }
    
    if (!formData.availability.trim()) {
      newErrors.availability = 'Availability is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await submitMentorshipForm(formData);
      if (result) {
        setFormData({
          name: '',
          email: '',
          organization: '',
          position: '',
          expertise: '',
          experience: '',
          availability: '',
          message: ''
        });
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0.5 : 0 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: isOpen ? 1 : 0.95, opacity: isOpen ? 1 : 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-amber-500 to-amber-600 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Become a Mentor</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-amber-100 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form Container */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-amber-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-md border border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-md border border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-amber-900 mb-2">
                Organization
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-md border border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
              {errors.organization && (
                <p className="mt-2 text-sm text-red-600">{errors.organization}</p>
              )}
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium text-amber-900 mb-2">
                Current Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-md border border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
              {errors.position && (
                <p className="mt-2 text-sm text-red-600">{errors.position}</p>
              )}
            </div>

            <div>
              <label htmlFor="expertise" className="block text-sm font-medium text-amber-900 mb-2">
                Areas of Expertise
              </label>
              <input
                type="text"
                id="expertise"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-md border border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                placeholder="e.g., Machine Learning, Data Analysis, Neuroscience"
              />
              {errors.expertise && (
                <p className="mt-2 text-sm text-red-600">{errors.expertise}</p>
              )}
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-amber-900 mb-2">
                Years of Experience
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-md border border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
              {errors.experience && (
                <p className="mt-2 text-sm text-red-600">{errors.experience}</p>
              )}
            </div>

            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-amber-900 mb-2">
                Availability
              </label>
              <input
                type="text"
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-md border border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                placeholder="e.g., 5 hours per week, Weekends only"
              />
              {errors.availability && (
                <p className="mt-2 text-sm text-red-600">{errors.availability}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-amber-900 mb-2">
                Why do you want to become a mentor?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-md border border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
              {errors.message && (
                <p className="mt-2 text-sm text-red-600">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
              <Send className="ml-2 h-5 w-5" />
            </button>
          </form>

          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center"
            >
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Thank you for your application! We'll review it and get back to you soon.
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MentorshipForm; 
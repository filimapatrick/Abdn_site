import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitInfrastructureContribution } from '../services/supportService';
import { CheckCircle, X } from 'lucide-react';

const InfrastructureContributionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    contributionType: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

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
    
    if (!formData.contributionType.trim()) {
      newErrors.contributionType = 'Please select a contribution type';
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
      const result = await submitInfrastructureContribution(formData);
      if (result) {
        setFormData({
          name: '',
          email: '',
          organization: '',
          contributionType: '',
          message: ''
        });
        setShowThankYou(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-8">
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
          <label htmlFor="contributionType" className="block text-sm font-medium text-amber-900 mb-2">
            Type of Contribution
          </label>
          <select
            id="contributionType"
            name="contributionType"
            value={formData.contributionType}
            onChange={handleChange}
            className="block w-full px-4 py-3 rounded-md border border-amber-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          >
            <option value="">Select a contribution type</option>
            <option value="equipment">Equipment Donation</option>
            <option value="funding">Funding</option>
            <option value="expertise">Expertise/Consultation</option>
            <option value="other">Other</option>
          </select>
          {errors.contributionType && (
            <p className="mt-2 text-sm text-red-600">{errors.contributionType}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-amber-900 mb-2">
            Message
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
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Make Contribution'}
        </button>
      </form>

      {/* Thank You Popup */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-md w-full bg-white rounded-xl overflow-hidden p-6"
            >
              <button
                onClick={() => setShowThankYou(false)}
                className="absolute top-4 right-4 p-2 bg-amber-50 rounded-full hover:bg-amber-100 transition-colors"
              >
                <X className="h-5 w-5 text-amber-900" />
              </button>
              
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="h-16 w-16 text-amber-500 mb-4" />
                <h3 className="text-2xl font-bold text-amber-900 mb-2">
                  Thank You!
                </h3>
                <p className="text-amber-700">
                  Your contribution to our research infrastructure has been received. We'll get back to you soon.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfrastructureContributionForm; 
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Twitter, Linkedin, Facebook } from 'lucide-react';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full bg-white z-50 w-full md:w-[40%] shadow-2xl"
          >
            <div className="h-full overflow-y-auto">
              {/* Header */}
              <div className="relative h-48 bg-gradient-to-r from-amber-800 to-amber-700 flex items-center justify-center">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                  aria-label="Close drawer"
                >
                  <X className="h-6 w-6" />
                </button>
                <div className="text-center text-white">
                  <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
                  <p className="text-amber-100">We'd love to hear from you</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Contact Form */}
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-amber-900">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your Full Name"
                      className="mt-1 block w-full rounded-lg border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500 py-3 px-4"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-amber-900">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your Email Address"
                      className="mt-1 block w-full rounded-lg border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500 py-3 px-4"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-amber-900">
                      Subject
                    </label>
                    <select
                      id="subject"
                      className="mt-1 block w-full rounded-lg border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500 py-3 px-4"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="collaboration">Collaboration Request</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-amber-900">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Your Message"
                      className="mt-1 block w-full rounded-lg border-amber-200 shadow-sm focus:border-amber-500 focus:ring-amber-500 py-3 px-4"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </form>

                {/* Contact Information */}
                <div className="space-y-6 pt-6 border-t border-amber-100">
                  <h3 className="text-lg font-semibold text-amber-900">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <a href="https://maps.google.com" className="flex items-center text-amber-700 hover:text-amber-800 group">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-600/10 flex items-center justify-center group-hover:from-amber-600/10 group-hover:to-amber-700/10 transition-colors">
                        <MapPin className="h-5 w-5 text-amber-700" />
                      </div>
                      <span className="ml-3">International Centre of Insect Physiology and Ecology, Nairobi, Kenya</span>
                    </a>
                    
                    <a href="tel:+254700123456" className="flex items-center text-amber-700 hover:text-amber-800 group">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-600/10 flex items-center justify-center group-hover:from-amber-600/10 group-hover:to-amber-700/10 transition-colors">
                        <Phone className="h-5 w-5 text-amber-700" />
                      </div>
                      <span className="ml-3">+254 700 123 456</span>
                    </a>
                    
                    <a href="mailto:contact@abdn.org" className="flex items-center text-amber-700 hover:text-amber-800 group">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-600/10 flex items-center justify-center group-hover:from-amber-600/10 group-hover:to-amber-700/10 transition-colors">
                        <Mail className="h-5 w-5 text-amber-700" />
                      </div>
                      <span className="ml-3">contact@abdn.org</span>
                    </a>
                  </div>

                  {/* Social Media Links */}
                  <div className="pt-6 border-t border-amber-100">
                    <h3 className="text-lg font-semibold text-amber-900 mb-4">Connect With Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="w-10 h-10 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-lg flex items-center justify-center hover:from-amber-600/10 hover:to-amber-700/10 transition-colors">
                        <Twitter className="h-5 w-5 text-amber-700" />
                      </a>
                      <a href="#" className="w-10 h-10 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-lg flex items-center justify-center hover:from-amber-600/10 hover:to-amber-700/10 transition-colors">
                        <Linkedin className="h-5 w-5 text-amber-700" />
                      </a>
                      <a href="#" className="w-10 h-10 bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-lg flex items-center justify-center hover:from-amber-600/10 hover:to-amber-700/10 transition-colors">
                        <Facebook className="h-5 w-5 text-amber-700" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
    // This is where you would initialize analytics
    console.log('Analytics cookies accepted');
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
    console.log('Analytics cookies declined');
  };

  const detailedCookieInfo = [
    {
      type: 'Analytics Cookies',
      description: 'We use analytics cookies to understand how you interact with our website. This helps us improve our services and provide a better user experience.',
      purpose: 'These cookies collect information about how visitors use our site, which pages they visited, and if they encounter error messages. All data is anonymized.',
    },
    {
      type: 'Form Submission Cookies',
      description: 'We use cookies to prevent duplicate form submissions when you interact with forms on our website.',
      purpose: 'These cookies help ensure that forms (like contact or support requests) aren\'t accidentally submitted multiple times and improve your experience when filling out forms.',
    }
  ];

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:bottom-6 md:max-w-md"
        >
          <div className="bg-white rounded-xl shadow-xl border border-amber-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start">
                <Cookie className="w-8 h-8 text-amber-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">Cookie Consent</h3>
                  <p className="text-amber-700 mb-3">
                    We use cookies to analyze site traffic, optimize your experience, and prevent duplicate form submissions.{' '}
                    <Link to="/cookie-policy" className="text-amber-600 hover:text-amber-800 underline">
                      Learn more in our Cookie Policy
                    </Link>.
                  </p>
                  
                  <button 
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center text-amber-600 hover:text-amber-800 text-sm mb-4"
                  >
                    <Info className="w-4 h-4 mr-1" />
                    {showDetails ? 'Hide details' : 'View cookie details'}
                  </button>
                  
                  <AnimatePresence>
                    {showDetails && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-4"
                      >
                        {detailedCookieInfo.map((cookie, index) => (
                          <div key={index} className="bg-amber-50 p-3 rounded-lg mb-2">
                            <h4 className="font-medium text-amber-900">{cookie.type}</h4>
                            <p className="text-sm text-amber-700 mt-1">{cookie.description}</p>
                            <p className="text-sm text-amber-700 mt-1">
                              <span className="font-medium">Purpose:</span> {cookie.purpose}
                            </p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={declineCookies}
                      className="px-5 py-2 rounded-lg border border-amber-300 text-amber-700 hover:bg-amber-50 transition-colors"
                    >
                      Decline
                    </button>
                    <button
                      onClick={acceptCookies}
                      className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-colors"
                    >
                      Accept Cookies
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={declineCookies}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-amber-50 transition-colors"
              aria-label="Close cookie consent banner"
            >
              <X className="w-5 h-5 text-amber-700" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 
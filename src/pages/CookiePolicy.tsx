import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

export default function CookiePolicy() {
  return (
    <Layout>
      <main className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-amber-900 mb-6">Cookie Policy</h1>
            <div className="prose prose-amber max-w-none">
              <p className="text-xl text-amber-700 mb-8">
                This Cookie Policy explains how the African Brain Data Network ("ABDN", "we", "us", or "our") uses cookies and similar technologies on our website.
              </p>

              <h2 className="text-2xl font-semibold text-amber-900 mt-10 mb-4">What are Cookies?</h2>
              <p className="text-amber-700 mb-4">
                Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>

              <h2 className="text-2xl font-semibold text-amber-900 mt-10 mb-4">How We Use Cookies</h2>
              <p className="text-amber-700 mb-4">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-6 text-amber-700 space-y-2">
                <li>
                  <strong>Analytics and Performance:</strong> We use analytics cookies to understand how visitors interact with our website, which pages are most popular, and how visitors move around the site. This helps us improve our website and your browsing experience.
                </li>
                <li>
                  <strong>Form Submissions:</strong> We use cookies to prevent duplicate form submissions. When you submit a form on our website (such as support requests, contact forms, or registration forms), we store a cookie to ensure the same form isn't accidentally submitted multiple times.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold text-amber-900 mt-10 mb-4">Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-amber-800 mt-6 mb-3">Analytics Cookies</h3>
              <p className="text-amber-700 mb-2">
                These cookies help us understand how visitors interact with our website. The information collected is used to improve our website and enhance the user experience.
              </p>
              <div className="bg-amber-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-amber-900 mb-2">Analytics Cookies Details:</h4>
                <ul className="list-disc pl-6 text-amber-700 space-y-1">
                  <li>Purpose: To collect information about how visitors use our site</li>
                  <li>Data Collected: Pages visited, time spent on site, navigation paths, and other similar information</li>
                  <li>Duration: Typically set to expire after 2 years</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-amber-800 mt-6 mb-3">Form Submission Cookies</h3>
              <p className="text-amber-700 mb-2">
                These cookies are used to improve user experience when submitting forms on our website and to prevent accidental duplicate submissions.
              </p>
              <div className="bg-amber-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-amber-900 mb-2">Form Submission Cookies Details:</h4>
                <ul className="list-disc pl-6 text-amber-700 space-y-1">
                  <li>Purpose: To prevent duplicate form submissions and improve form functionality</li>
                  <li>Data Collected: Form submission status and timestamps</li>
                  <li>Duration: Session-based or up to 24 hours</li>
                </ul>
              </div>

              <h2 className="text-2xl font-semibold text-amber-900 mt-10 mb-4">Your Cookie Choices</h2>
              <p className="text-amber-700 mb-4">
                When you first visit our website, you will be presented with a cookie consent banner where you can choose to accept or decline non-essential cookies. You can change your preferences at any time by clearing your browser cookies and reloading the page.
              </p>

              <h3 className="text-xl font-semibold text-amber-800 mt-6 mb-3">Managing Cookies in Your Browser</h3>
              <p className="text-amber-700 mb-4">
                Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, delete cookies, or to alert you when cookies are being sent. The methods for doing so vary from browser to browser, and from version to version.
              </p>

              <h2 className="text-2xl font-semibold text-amber-900 mt-10 mb-4">Updates to This Cookie Policy</h2>
              <p className="text-amber-700 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page, and if the changes are significant, we will provide a more prominent notice.
              </p>

              <h2 className="text-2xl font-semibold text-amber-900 mt-10 mb-4">Contact Us</h2>
              <p className="text-amber-700 mb-4">
                If you have any questions about our use of cookies, please contact us at:
              </p>
              <p className="text-amber-700">
                <strong>Email:</strong> privacy@africandatanetwork.org
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </Layout>
  );
} 
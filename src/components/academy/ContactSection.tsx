import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Get in Touch</h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Have questions about our programs? We're here to help you take the next step in your neuroscience journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 p-3 rounded-lg">
                <MapPin className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-900 mb-1">Visit Us</h3>
                <p className="text-amber-700/80">International Centre of Insect Physiology and Ecology, Nairobi, Kenya</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 p-3 rounded-lg">
                <Mail className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-900 mb-1">Email Us</h3>
                <a href="mailto:contact@abdn.org" className="text-amber-700 hover:text-amber-800">contact@abdn.org</a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 p-3 rounded-lg">
                <Phone className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-900 mb-1">Call Us</h3>
                <a href="tel:+254700123456" className="text-amber-700 hover:text-amber-800">+254 700 123 456</a>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-amber-900 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-white/50"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-white/50"
                placeholder="Your email"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-amber-900 mb-2">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-white/50"
                placeholder="Your message"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center text-lg font-semibold"
            >
              Send Message
              <ArrowRight className="ml-2 h-6 w-6" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const quickLinks = [
  { text: 'About Us', href: '#' },
  { text: 'Research', href: '#' },
  { text: 'Publications', href: '#' },
  { text: 'Training Programs', href: '#' },
  { text: 'Contact', href: '#' },
  { text: 'Cookie Policy', href: '/cookie-policy' },
];

const contactInfo = [
  { 
    icon: MapPin, 
    text: 'International Centre of Insect Physiology and Ecology, Nairobi, Kenya',
    href: 'https://goo.gl/maps/YOUR_LOCATION'
  },
  { 
    icon: Phone, 
    text: '+254 (0) 20 123 4567',
    href: 'tel:+254201234567'
  },
  { 
    icon: Mail, 
    text: 'info@abdn.org',
    href: 'mailto:info@abdn.org'
  },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-amber-900 to-amber-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-400">
              ABDN
            </h3>
            <p className="text-amber-200/80 leading-relaxed">
              Building capacity for neuroscience research and data science across Africa through training, mentorship, and collaboration.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="p-2 rounded-full bg-amber-800/30 hover:bg-amber-700/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="h-5 w-5 text-amber-200" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-amber-200">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.text}
                  whileHover={{ x: 5 }}
                >
                  <a 
                    href={link.href}
                    className="text-amber-200/80 hover:text-amber-200 transition-colors"
                  >
                    {link.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="space-y-6 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-amber-200">Contact Us</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.text}
                    href={info.href}
                    className="flex items-start space-x-3 text-amber-200/80 hover:text-amber-200 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <Icon className="h-5 w-5 mt-1 flex-shrink-0" />
                    <span>{info.text}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-amber-800/30">
          <div className="text-center text-amber-200/60 text-sm">
            © {new Date().getFullYear()} African Brain Data Network. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 
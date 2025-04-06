import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { motion } from 'framer-motion';
import JoinABDNForm from './forms/JoinABDNForm';

export default function CallToAction() {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <section className="py-32 bg-gradient-to-b from-amber-900 to-amber-950 relative overflow-hidden">
      {/* Background Pattern and Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5" 
          style={{
            backgroundBlendMode: 'multiply',
          }}
        />
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute h-64 w-64 bg-amber-500/10 rounded-full"
              initial={{
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                scale: 0.5,
                opacity: 0.3
              }}
              animate={{
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                scale: [0.5, 1.5, 0.5],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 10 + index * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="max-w-3xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <motion.span 
              className="inline-block text-amber-400 text-sm font-semibold tracking-wider uppercase"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Join Our Network
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Be Part of Africa's Leading Brain Research Network
            </motion.h2>
            <motion.p 
              className="text-xl text-amber-200/90 mt-6 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Join a growing community of researchers advancing neuroscience and data science across Africa. Together, we're shaping the future of brain research.
            </motion.p>
          </div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button 
              onClick={openModal}
              className="bg-white text-amber-900 px-8 py-4 rounded-full font-semibold hover:bg-amber-100 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Become a Member 
              <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
            </motion.button>
            <motion.a 
              href="/about"
              className="border-2 border-amber-400/30 text-amber-200 px-8 py-4 rounded-full font-semibold hover:bg-amber-400/10 transition-colors inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Join Form Modal */}
      <JoinABDNForm isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import JoinABDNForm from '../forms/JoinABDNForm';

export default function AcademyHero() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-amber-900 to-amber-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,transparent,black)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-5xl mx-auto"
          >
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-amber-100 mb-2">African Brain Data Science</span>
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-100 to-amber-50 font-extrabold tracking-tight">
                  Academy
                </span>
                <span className="block text-3xl sm:text-4xl md:text-5xl text-amber-300/80 font-medium mt-3 tracking-wide">
                  (ABDSA)
                </span>
              </h1>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 text-amber-100/90 leading-relaxed max-w-3xl mx-auto">
              Empowering the next generation of African neuroscientists with required data and digital skills
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl"
              onClick={openModal}
            >
              Join Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Join Form Modal */}
      <JoinABDNForm isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

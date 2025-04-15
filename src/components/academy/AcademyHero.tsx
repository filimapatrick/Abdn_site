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
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-100 to-amber-50">
              African Brain Data Science Academy (ABDSA)
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-amber-100/90">
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

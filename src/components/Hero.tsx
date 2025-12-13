import React, { useState, useEffect } from 'react';
import { Play, Star, Users, ChevronDown, X, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Globe from './magicui/Globe';
import OrbitingCircles from './magicui/OrbitingCircles';
import JoinABDNForm from './forms/JoinABDNForm';
import { useNavigate } from 'react-router-dom';
// import t from '../../Assets/lagos_group_picture.jpeg'

const africanCountries = [
  { name: 'Nigeria', icon: '🇳🇬' },
  { name: 'Kenya', icon: '🇰🇪' },
  { name: 'Ghana', icon: '🇬🇭' },
  { name: 'South Africa', icon: '🇿🇦' },
  { name: 'Egypt', icon: '🇪🇬' },
  { name: 'Ethiopia', icon: '🇪🇹' },
  { name: 'Tanzania', icon: '🇹🇿' },
  { name: 'Uganda', icon: '🇺🇬' },
];

export default function Hero() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Modal handlers
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="relative min-h-screen pt-32 pb-20 text-white overflow-hidden">
      {/* Background Image Layer */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ opacity }}
      >
        <img
          src="/Assets/lagos_group_picture.jpeg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/95 via-amber-800/95 to-amber-700/95">
          {/* Animated Particles */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-amber-100 rounded-full"
                animate={{
                  x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                  y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Globe and Orbiting Elements with enhanced animations */}
      <motion.div 
        className="absolute inset-0 z-10"
        style={{ opacity }}
      >
        <Globe className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20" />
        {africanCountries.map((country, index) => (
          <OrbitingCircles
            key={country.name}
            radius={250}
            duration={30}
            delay={index * (30 / africanCountries.length)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm flex items-center space-x-2 shadow-lg hover:bg-white/20 transition-all duration-300"
            >
              <span className="text-2xl">{country.icon}</span>
              <span className="text-sm font-medium">{country.name}</span>
            </motion.div>
          </OrbitingCircles>
        ))}
      </motion.div>

      {/* Enhanced Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-8"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100">
                African Brain Data Network
              </span>
            </motion.h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-amber-100 mb-12 max-w-3xl mx-auto"
          >
            Building capacity for neuroscience research and data science across Africa through
            training, mentorship, and collaboration.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={openModal}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              Join Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="border-2 border-amber-200 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition backdrop-blur-sm flex items-center justify-center"
            >
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </div>

        {/* Enhanced Stats with Animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8"
        >
          <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-amber-300" />
            </div>
            <h3 className="text-2xl font-bold mb-2">300+</h3>
            <p className="text-amber-100">Trained Researchers</p>
          </div>
          <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-amber-300" />
            </div>
            <h3 className="text-2xl font-bold mb-2">20+</h3>
            <p className="text-amber-100">African Countries</p>
          </div>
          <div className="text-center md:col-span-1 col-span-2 backdrop-blur-sm bg-white/5 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <Play className="h-8 w-8 text-amber-300" />
            </div>
            <h3 className="text-2xl font-bold mb-2">20+</h3>
            <p className="text-amber-100">Research Projects</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-amber-200 opacity-75" />
      </motion.div>

      {/* Join Form Modal */}
      <JoinABDNForm isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

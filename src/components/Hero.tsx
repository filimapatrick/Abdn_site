import React from 'react';
import { Play, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Globe from './magicui/Globe';
import OrbitingCircles from './magicui/OrbitingCircles';

const africanCountries = [
  { name: 'Nigeria', icon: '🇳🇬' },
  { name: 'Kenya', icon: '🇰🇪' },
  { name: 'Ghana', icon: '🇬🇭' },
  { name: 'South Africa', icon: '🇿🇦' },
  { name: 'Egypt', icon: '🇪🇬' },
  { name: 'Ethiopia', icon: '🇪🇹' },
  { name: 'Tanzania', icon: '🇹🇿' },
  { name: 'Uganda', icon: '🇺🇬' }
];

export default function Hero() {
  return (
    <div className="relative min-h-screen pt-32 pb-20 text-white overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/95 to-blue-700/95" />
        {/* Additional Texture */}
        <div className="absolute inset-0 bg-black/20" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` 
             }} 
        />
      </div>

      {/* Globe and Orbiting Elements */}
      <div className="absolute inset-0 z-10">
        <Globe className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20" />
        
        {/* Orbiting African Countries */}
        {africanCountries.map((country, index) => (
          <OrbitingCircles
            key={country.name}
            radius={250}
            duration={30}
            delay={index * (30 / africanCountries.length)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm flex items-center space-x-2 shadow-lg hover:bg-white/20 transition-all duration-300">
              <span className="text-2xl">{country.icon}</span>
              <span className="text-sm font-medium">{country.name}</span>
            </div>
          </OrbitingCircles>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                African Brain Data Network
              </span>
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto"
          >
            Building capacity for neuroscience research and data science across Africa through training, mentorship, and collaboration.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition flex items-center justify-center shadow-lg hover:shadow-xl">
              Get Started <Play className="ml-2 h-5 w-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition backdrop-blur-sm">
              Learn More
            </button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8"
        >
          <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold mb-2">100+</h3>
            <p className="text-blue-100">Active Researchers</p>
          </div>
          <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold mb-2">15+</h3>
            <p className="text-blue-100">African Countries</p>
          </div>
          <div className="text-center md:col-span-1 col-span-2 backdrop-blur-sm bg-white/5 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <Play className="h-8 w-8 text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold mb-2">50+</h3>
            <p className="text-blue-100">Research Projects</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
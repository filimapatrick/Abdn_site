import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Brain, GraduationCap, Star, Clock } from 'lucide-react';

const modules = [
  {
    title: "Foundations of Neuroscience",
    description: "Core concepts and principles of brain structure and function",
    duration: "12 weeks",
    topics: ["Neuroanatomy", "Cellular Neuroscience", "Synaptic Transmission"],
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80"
  },
  {
    title: "Research Methods",
    description: "Essential research methodologies and techniques",
    duration: "10 weeks",
    topics: ["Experimental Design", "Data Collection", "Statistical Analysis"],
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80"
  },
  {
    title: "Advanced Topics",
    description: "Specialized areas of neuroscience research",
    duration: "8 weeks",
    topics: ["Cognitive Neuroscience", "Neuroimaging", "Computational Methods"],
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80"
  }
];

export default function Curriculum() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 to-blue-700">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Curriculum Development
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto"
            >
              Innovative neuroscience education tailored for African institutions
            </motion.p>
          </div>
        </div>
      </section>

      {/* Curriculum Modules */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Core Modules</h2>
            <p className="mt-4 text-xl text-gray-600">Comprehensive learning pathways for neuroscience education</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={module.image}
                    alt={module.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  <div className="flex items-center text-gray-500 mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="space-y-2">
                    {module.topics.map((topic, i) => (
                      <div key={i} className="flex items-center text-gray-600">
                        <Star className="h-4 w-4 mr-2 text-blue-600" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Research-Based</h3>
              <p className="text-gray-600">Curriculum informed by latest research</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Collaborative</h3>
              <p className="text-gray-600">Developed with leading institutions</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Comprehensive</h3>
              <p className="text-gray-600">Covers all essential topics</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Accredited</h3>
              <p className="text-gray-600">Recognized qualifications</p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
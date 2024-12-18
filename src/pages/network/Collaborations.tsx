import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Target, Link as LinkIcon } from 'lucide-react';

const collaborations = [
  {
    title: "African Brain Mapping Initiative",
    partners: ["University of Nairobi", "ICIPE", "University of Cape Town"],
    duration: "2023-2025",
    focus: "Creating comprehensive brain atlases of African populations",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80"
  },
  {
    title: "Neurodegenerative Disease Network",
    partners: ["University of Ghana", "Makerere University", "Cairo University"],
    duration: "2024-2026",
    focus: "Studying genetic factors in neurodegenerative diseases",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80"
  },
  {
    title: "Data Science in Neuroscience",
    partners: ["AIMS", "University of Ibadan", "University of Rwanda"],
    duration: "2024-2025",
    focus: "Developing AI tools for neuroscience research",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80"
  }
];

export default function Collaborations() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-cyan-900 to-cyan-700">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Research Collaborations
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl text-cyan-100 max-w-3xl mx-auto"
            >
              Join groundbreaking research initiatives connecting institutions across Africa
            </motion.p>
          </div>
        </div>
      </section>

      {/* Collaborations Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collaborations.map((collab, index) => (
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
                    src={collab.image}
                    alt={collab.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{collab.title}</h3>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-cyan-600" />
                      <span>{collab.partners.join(", ")}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-cyan-600" />
                      <span>{collab.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-2 text-cyan-600" />
                      <span>{collab.focus}</span>
                    </div>
                  </div>
                  <button className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition-colors">
                    Join Project
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Network Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Join Our Network</h2>
              <p className="text-xl text-gray-600">
                Connect with researchers and institutions across Africa to advance neuroscience research
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-cyan-100 rounded-lg">
                    <LinkIcon className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Easy Collaboration</h3>
                    <p className="text-gray-600">Connect with researchers instantly</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-cyan-100 rounded-lg">
                    <Target className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Shared Resources</h3>
                    <p className="text-gray-600">Access tools and facilities</p>
                  </div>
                </div>
              </div>
              <button className="bg-cyan-600 text-white px-8 py-3 rounded-lg hover:bg-cyan-700 transition-colors">
                Start Collaborating
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                alt="Collaboration"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                <p className="text-gray-900 font-semibold">
                  "Join our growing network of researchers making an impact in African neuroscience."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
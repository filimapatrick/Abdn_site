import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Calendar, Award } from 'lucide-react';

const publications = [
  {
    title: "Neural Correlates of Cognitive Function in African Populations",
    authors: ["Sarah Mwangi", "Mohammed Ahmed", "Grace Okonjo"],
    journal: "African Journal of Neuroscience",
    date: "February 2024",
    citations: 45,
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80"
  },
  {
    title: "Machine Learning Approaches in African Brain Research",
    authors: ["John Kamau", "Fatima Hassan"],
    journal: "Computational Neuroscience Today",
    date: "January 2024",
    citations: 32,
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80"
  },
  {
    title: "Neurodegenerative Diseases in Sub-Saharan Africa",
    authors: ["Grace Okonjo", "Thomas Mensah"],
    journal: "Clinical Neuroscience Research",
    date: "December 2023",
    citations: 28,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80"
  }
];

export default function Publications() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-violet-900 to-violet-700">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Research Publications
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl text-violet-100 max-w-3xl mx-auto"
            >
              Discover groundbreaking neuroscience research from across Africa
            </motion.p>
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publications.map((pub, index) => (
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
                    src={pub.image}
                    alt={pub.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pub.title}</h3>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-violet-600" />
                      <span>{pub.authors. join(", ")}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-violet-600" />
                      <span>{pub.journal}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-violet-600" />
                      <span>{pub.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-violet-600" />
                      <span>{pub.citations} Citations</span>
                    </div>
                  </div>
                  <button className="w-full bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition-colors">
                    Read Paper
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Research Impact</h2>
            <p className="mt-4 text-xl text-gray-600">Making waves in the scientific community</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm text-center"
            >
              <div className="text-3xl font-bold text-violet-600 mb-2">200+</div>
              <div className="text-gray-600">Publications</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm text-center"
            >
              <div className="text-3xl font-bold text-violet-600 mb-2">5000+</div>
              <div className="text-gray-600">Citations</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm text-center"
            >
              <div className="text-3xl font-bold text-violet-600 mb-2">150+</div>
              <div className="text-gray-600">Researchers</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-sm text-center"
            >
              <div className="text-3xl font-bold text-violet-600 mb-2">12</div>
              <div className="text-gray-600">Countries</div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
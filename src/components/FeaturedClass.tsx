import React from 'react';
import { Clock, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturedClass() {
  return (
    <section className="py-24 bg-gradient-to-b from-amber-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B45309' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="text-amber-500 uppercase tracking-wider font-medium">Featured</span>
              <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-900 mt-2">Brain Research</h2>
              <h3 className="text-4xl font-bold text-amber-800 mt-2">Advancing Neuroscience in Africa</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg text-amber-700 font-medium">
                Research & Training Programs
              </p>
              <p className="text-amber-900/80 leading-relaxed">
                Our network brings together researchers, clinicians, and data scientists to advance brain research in Africa. Through collaboration and knowledge sharing, we're building capacity for world-class neuroscience research across the continent.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800 mb-1">20+</div>
                <div className="text-amber-700">African Countries</div>
              </motion.div>
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800 mb-1">10+</div>
                <div className="text-amber-700">Active Projects</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="relative grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src="/Assets/franco1.jpeg"
              alt="Brain research"
              className="rounded-lg shadow-lg transform translate-y-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.img
              src="/Assets/cross_s.jpeg"
              alt="Neuroscience research"
              className="rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.div 
              className="absolute -bottom-8 right-0 bg-white p-6 rounded-lg shadow-xl max-w-xs backdrop-blur-sm bg-white/90"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-amber-900/80 italic">
                "Building capacity for neuroscience research and data science across Africa through training, mentorship, and collaboration."
              </p>
              <p className="text-amber-900 font-semibold mt-2">- ABDN MISSION</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Research Excellence Section */}
        <div className="mt-32 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src="/Assets/project_report.jpeg"
              alt="Research excellence"
              className="rounded-2xl shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            
            <motion.div 
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-lg max-w-xs backdrop-blur-sm bg-white/90"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-amber-900 font-semibold">Research Network</p>
                  <p className="text-amber-700">20+ African Countries</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-amber-700">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Active Projects</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-amber-500 fill-current mr-1" />
                  <span>20+</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="text-amber-500 uppercase tracking-wider font-medium">featured</span>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-900 mt-2">Research Excellence</h2>
              <h3 className="text-3xl font-bold text-amber-800 mt-2">Collaborative Projects</h3>
            </div>

            <div className="space-y-6">
              <p className="text-amber-900/80 leading-relaxed">
                Our network facilitates groundbreaking research in neuroscience and data science across Africa. Through state-of-the-art facilities and international collaborations, we're advancing our understanding of the brain while building research capacity throughout the continent.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800 mb-1">10+</div>
                  <div className="text-amber-700">Active Researchers</div>
                </motion.div>
                <motion.div 
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-800 mb-1">10+</div>
                  <div className="text-amber-700">Publications</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { Network, Database, Brain } from 'lucide-react';

export default function Introduction() {
  return (
    <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-amber-900">About ABDN</h2>
            <div className="space-y-4">
              <p className="text-lg text-amber-800 leading-relaxed">
                The African Brain Data Network (ABDN) is a network of stakeholders from academia, industry, policy, and funding working together to facilitate the responsible generation, processing, sharing, and use of African brain data for research and innovation.
              </p>
              <p className="text-lg text-amber-700 leading-relaxed">
                The Network seeks to make African brain data FAIR and ensure that a sufficient number of experts are trained on the use of novel technical tools to collect, process, and apply these datasets. From neuroimages, electrophysiological and anatomical data to behavioral data, this network hopes to make different data modalities, and disease types from multiple animal and non-animal organisms available and lead the African neuroscience ecosystem into the era of big data analysis.
              </p>
            </div>
          </div>

          {/* Visual Elements */}
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="col-span-2 bg-white p-6 rounded-xl shadow-lg border border-amber-100"
            >
              <Network className="h-8 w-8 text-amber-600 mb-4" />
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Collaborative Network</h3>
              <p className="text-amber-700">Connecting stakeholders across academia, industry, and policy</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-amber-100"
            >
              <Database className="h-8 w-8 text-amber-600 mb-4" />
              <h3 className="text-lg font-semibold text-amber-900 mb-2">FAIR Data</h3>
              <p className="text-amber-700">Making African brain data findable, accessible, interoperable, and reusable</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-amber-100"
            >
              <Brain className="h-8 w-8 text-amber-600 mb-4" />
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Research Innovation</h3>
              <p className="text-amber-700">Advancing neuroscience through cutting-edge tools and methodologies</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
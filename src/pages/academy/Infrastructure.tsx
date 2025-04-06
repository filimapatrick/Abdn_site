import React from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Microscope, Beaker, Construction, ArrowRight } from 'lucide-react';
import Layout from '../../components/Layout';

export default function Infrastructure() {
  return (
    <Layout>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] py-20 bg-gradient-to-br from-amber-950 to-amber-800 flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-96 h-96 -top-48 -left-48 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-amber-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <Construction className="h-24 w-24 text-amber-300 mx-auto" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-amber-200 to-amber-100 bg-clip-text text-transparent">
                  Infrastructure
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl text-amber-100 max-w-3xl mx-auto mb-8"
              >
                Coming Soon
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg text-amber-200/80 max-w-3xl mx-auto mb-12"
              >
                We are currently developing our infrastructure section to showcase ABDN's state-of-the-art facilities and resources.
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center mx-auto"
              >
                Explore Other Sections
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section className="py-24 bg-amber-50">
          {/* ... rest of the section */}
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-amber-100/50">
          {/* ... rest of the section */}
        </section>
      </main>
    </Layout>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { Database, Shield, Share2, Download } from 'lucide-react';

const datasets = [
  {
    title: "African Brain Atlas",
    type: "Neuroimaging Data",
    size: "2.5 TB",
    samples: 1500,
    access: "Open Access",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80"
  },
  {
    title: "Cognitive Function Database",
    type: "Behavioral Data",
    size: "800 GB",
    samples: 2500,
    access: "Restricted Access",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80"
  },
  {
    title: "Neurodegenerative Studies",
    type: "Clinical Data",
    size: "1.2 TB",
    samples: 1800,
    access: "Consortium Access",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80"
  }
];

export default function DataSharing() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-sky-900 to-sky-700">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Data Sharing Platform
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl text-sky-100 max-w-3xl mx-auto"
            >
              Access and contribute to Africa's largest collection of neuroscience research data
            </motion.p>
          </div>
        </div>
      </section>

      {/* Datasets Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {datasets.map((dataset, index) => (
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
                    src={dataset.image}
                    alt={dataset.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{dataset.title}</h3>
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Database className="h-4 w-4 mr-2 text-sky-600" />
                      <span>{dataset.type} • {dataset.size}</span>
                    </div>
                    <div className="flex items-center">
                      <Share2 className="h-4 w-4 mr-2 text-sky-600" />
                      <span>{dataset.samples} Samples</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-sky-600" />
                      <span>{dataset.access}</span>
                    </div>
                  </div>
                  <button className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors">
                    Access Dataset
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Platform Features</h2>
            <p className="mt-4 text-xl text-gray-600">Everything you need for secure data sharing</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Storage</h3>
              <p className="text-gray-600">Enterprise-grade security for your research data</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-6">
                <Share2 className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Easy Sharing</h3>
              <p className="text-gray-600">Seamless collaboration with researchers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-6">
                <Database className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Version Control</h3>
              <p className="text-gray-600">Track changes and maintain data integrity</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-6">
                <Download className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fast Access</h3>
              <p className="text-gray-600">Quick downloads and API access</p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
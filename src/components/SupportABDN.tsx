import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Brain, Microscope, Calendar, Users } from 'lucide-react';
import SupportForm from './SupportForm';

const fundingCategories = [
  {
    id: 'annual',
    title: 'Annual ABDN Program',
    icon: Brain,
    description: 'Contribute to our core program supporting research, training, and collaboration in African neuroscience.'
  },
  {
    id: 'research',
    title: 'Research Projects',
    icon: Microscope,
    description: 'Support ongoing neuroscience research projects led by African researchers across the continent.'
  },
  {
    id: 'symposium',
    title: 'Research Symposium',
    icon: Calendar,
    description: 'Support our annual symposium bringing together neuroscience researchers from across Africa.'
  },
  {
    id: 'awareness',
    title: 'Awareness Programs',
    icon: Users,
    description: 'Fund outreach initiatives to promote neuroscience education and awareness in African communities.'
  }
];

export default function SupportABDN() {
  return (
    <section className="py-24 bg-gradient-to-br from-amber-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Coins className="w-8 h-8 text-amber-600 mr-2" />
            <h2 className="text-4xl font-bold text-amber-900">Support ABDN</h2>
          </div>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Join us in advancing neuroscience research and education across Africa through your generous support
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Funding Categories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-amber-900 mb-8">Funding Opportunities</h3>
            {fundingCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100"
                >
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-amber-900 mb-2">{category.title}</h4>
                      <p className="text-amber-700">{category.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-amber-100"
          >
            <h3 className="text-2xl font-bold text-amber-900 mb-6">Express Your Interest</h3>
            <SupportForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
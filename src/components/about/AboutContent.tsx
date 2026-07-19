import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Share2, GraduationCap, Users } from 'lucide-react';

const objectives = [
  {
    icon: Brain,
    title: "Advancing Neuroscience",
    description: "Leading cutting-edge brain research across Africa"
  },
  {
    icon: Share2,
    title: "Data Sharing",
    description: "Creating a unified platform for research collaboration"
  },
  {
    icon: GraduationCap,
    title: "Capacity Building",
    description: "Training the next generation of African neuroscientists"
  },
  {
    icon: Users,
    title: "Network Growth",
    description: "Expanding our research community across the continent"
  }
];

export default function AboutContent() {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Our Mission & Vision</h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            ABDN is dedicated to advancing neuroscience research in Africa through collaboration, 
            data sharing, and capacity building. We envision a future where African researchers 
            lead groundbreaking discoveries in brain science.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {objectives.map((objective, index) => {
            const Icon = objective.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-amber-100"
              >
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">{objective.title}</h3>
                <p className="text-amber-700">{objective.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
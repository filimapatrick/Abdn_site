import React from 'react';
import { motion } from 'framer-motion';

const timelineEvents = [
  {
    year: 2021,
    title: "ABDN Establishment",
    description: "Founded to foster collaboration among African neuroscience researchers"
  },
  {
    year: 2022,
    title: "Data Platform Launch",
    description: "Launched the first pan-African data-sharing platform connecting 15 countries"
  },
  {
    year: 2023,
    title: "Training Milestone",
    description: "Trained over 500 neuroscience students through workshops and conferences"
  },
  {
    year: 2024,
    title: "Network Expansion",
    description: "Expanded to 25+ African countries and introduced cutting-edge brain imaging tools"
  }
];

export default function Timeline() {
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
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Our Journey</h2>
          <p className="text-xl text-amber-700">Milestones in advancing African neuroscience research</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 transform -translate-y-1/2" />

          <div className="relative grid md:grid-cols-4 gap-8">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">{event.year}</span>
                    <h3 className="text-xl font-semibold text-amber-900 mt-2">{event.title}</h3>
                    <p className="text-amber-700 mt-2">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
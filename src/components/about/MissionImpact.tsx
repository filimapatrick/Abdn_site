import React from 'react';
import { motion } from 'framer-motion';
import { Target, Brain, Share2, Shield } from 'lucide-react';

const objectives = [
  {
    icon: Brain,
    title: "FAIR Brain Data",
    description: "Facilitating Findable, Accessible, Interoperable, and Reusable brain data across Africa"
  },
  {
    icon: Share2,
    title: "Education & Innovation",
    description: "Advancing data science in neuroscience through training, workshops, and curriculum improvement"
  },
  {
    icon: Target,
    title: "Equitable Distribution",
    description: "Ensuring brain data benefits reach all stakeholders across Africa"
  },
  {
    icon: Shield,
    title: "Ethical Framework",
    description: "Addressing ethical, legal, and socio-cultural concerns in data acquisition and use"
  }
];

export default function MissionImpact() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission & Impact</h2>
          <p className="text-xl text-amber-600 font-semibold mb-4">
            Advancing sustainable brain research, education and innovation in Africa through the responsible collection, 
            processing, sharing and use of big brain data.
          </p>
        </motion.div>

        {/* Background Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 bg-gradient-to-br from-amber-50 to-white p-8 rounded-xl shadow-sm"
          >
            <h3 className="text-2xl font-bold text-amber-900">The Challenge</h3>
            <p className="text-amber-800 leading-relaxed">
              Despite comprising 12.5 percent of the world's population, Africa still accounts for less than 1 percent 
              of global research output. The availability of FAIR biomedical data is crucial for driving neuroscience 
              research and innovation, yet there is a significant paucity of datasets representing populations in 
              Africa's low- and middle-income countries.
            </p>
            <p className="text-amber-800 leading-relaxed">
              Many clinical therapies and biotech tools/services in Africa are informed by research data extrapolated 
              from the Global North, leading to potential non-generalizability of global research in African contexts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 bg-gradient-to-br from-amber-50 to-white p-8 rounded-xl shadow-sm"
          >
            <h3 className="text-2xl font-bold text-amber-900">Our Beginning</h3>
            <p className="text-amber-800 leading-relaxed">
              In 2021, Dr. Damian Eke and Dr. Eberechi Wogu initiated the collection of neuroimaging datasets 
              from diagnostic centers in Nigeria. This process revealed various challenges including lack of technical 
              expertise, infrastructure limitations, and socio-cultural and legal challenges.
            </p>
            <p className="text-amber-800 leading-relaxed">
              Interactions with SONA and NSN highlighted a critical gap in FAIR capacity within the African 
              neuroscience research ecosystem, leading to the foundation of the African Brain Data Network (ABDN).
            </p>
          </motion.div>
        </div>

        {/* Objectives Grid */}
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
                <p className="text-amber-800">{objective.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
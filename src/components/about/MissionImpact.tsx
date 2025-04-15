import React from 'react';
import { motion } from 'framer-motion';
import { Target, Brain, Share2, Shield } from 'lucide-react';

const objectives = [
  {
    icon: Brain,
    title: "FAIR Brain Data",
    description: "Facilitation of FAIR brain data in Africa"
  },
  {
    icon: Share2,
    title: "Education & Innovation",
    description: (
      <div>
        <p>Advancement of the use of data science in neuroscience education, research and innovation via:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Training</li>
          <li>Workshops</li>
          <li>Curriculum Improvement</li>
          <li>Knowledge Transfer</li>
        </ul>
      </div>
    )
  },
  {
    icon: Target,
    title: "Equitable Distribution",
    description: "Equitable distribution of brain data benefits to all stakeholders in Africa"
  },
  {
    icon: Shield,
    title: "Ethical Framework",
    description: "Addressing ethical, legal and socio-cultural concerns in African brain data acquisition and use"
  }
];

export default function MissionImpact() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-amber-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6 relative inline-block">
            Our Mission
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></span>
          </h2>
          <p className="text-xl text-amber-600 font-semibold mb-4 max-w-3xl mx-auto leading-relaxed">
            Advancing sustainable brain research, education and innovation in Africa through the responsible collection, 
            processing, sharing and use of big brain data.
          </p>
        </motion.div>

        {/* Background Story */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-amber-100"
          >
            <h3 className="text-2xl font-bold text-amber-900 mb-6 relative inline-block">
              Our Story
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></span>
            </h3>
            
            <div className="space-y-8">
              <div className="relative pl-6 border-l-2 border-amber-200">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-amber-400"></div>
                <p className="text-amber-800 leading-relaxed">
                  The availability of Findable, Accessible Interoperable, and Reusable (FAIR) biomedical data is a critical factor that drives neuroscience research and innovation. Diversity or heterogeneity of datasets enables equitable and inclusive access to clinical and medical solutions and innovations. Lack of diversity of datasets (or when data does not represent some sections of society) can impact the accuracy and potency of outcomes.
                </p>
                <p className="text-amber-800 leading-relaxed mt-4">
                  FAIR representation in the datasets helps in the reduction of unfair bias and discrimination. Unfortunately, a recent analysis of the major brain data repositories reveals that there is paucity of datasets that represent populations in Africa's low- and middle-income countries. This lack of representation could lead to the non-generalizability of decades of global research and development in Africa. Despite comprising 12.5 percent of the world's population, Africa still accounts for less than 1 percent of global research output. Many clinical therapies and biotech tools/services in Africa are informed by research data extrapolated from the Global North.
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-amber-200">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-amber-400"></div>
                <p className="text-amber-800 leading-relaxed">
                  In 2021, Dr. Damian Eke (DMU) and Dr. Eberechi Wogu (NSN) started the process of collecting neuroimaging datasets from diagnostic centers with appropriate approvals from the University of Port Harcourt, Nigeria. This process showed a number of factors that contribute to the lack of datasets from Africa being part of global brain research. These include; lack of technical expertise, lack of infrastructure (including scanners for research) in addition to socio-cultural and legal challenges. The initial data collected have been made available through Brainlife.io and the data descriptor has been submitted to Nature.
                </p>
                <p className="text-amber-800 leading-relaxed mt-4">
                  Further interactions with the Society for Neuroscientist Africa (SONA) and the Neuroscience Society of Nigeria (NSN) showed that there is a lack of capacity for FAIR in the African neuroscience research and education ecosystem. The collection, processing, and analysis of brain data with appropriate technologies have not become an integral part of both academic and research activities in Africa. Whereas there is a strong appetite to integrate data science into the Neuroscience curriculum and research, few opportunities have been presented to both staff and students. In addition to this, there is almost a total lack of infrastructure for FAIR.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Objectives Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 relative inline-block">
            Objectives
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {objectives.map((objective, index) => {
            const Icon = objective.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-amber-100 hover:border-amber-200 hover:scale-[1.02]"
              >
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 transform hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">{objective.title}</h3>
                <div className="text-amber-800">{objective.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
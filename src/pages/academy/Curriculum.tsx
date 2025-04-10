import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Brain, GraduationCap, Star, Clock, ChevronRight, Award, Target, Beaker, FileCheck, Globe, ArrowRight } from 'lucide-react';
import Layout from '../../components/Layout';

// const modules = [
//   {
//     title: "Foundations of Neuroscience",
//     description: "Core concepts and principles of brain structure and function",
//     duration: "12 weeks",
//     topics: ["Neuroanatomy", "Cellular Neuroscience", "Synaptic Transmission", "Neural Development"],
//     image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80",
//     outcomes: ["Understanding of brain structure and function", "Knowledge of cellular mechanisms", "Grasp of neural communication"]
//   },
//   {
//     title: "Research Methods",
//     description: "Essential research methodologies and techniques",
//     duration: "10 weeks",
//     topics: ["Experimental Design", "Data Collection", "Statistical Analysis", "Research Ethics"],
//     image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80",
//     outcomes: ["Ability to design experiments", "Proficiency in data analysis", "Understanding of research ethics"]
//   },
//   {
//     title: "Advanced Topics",
//     description: "Specialized areas of neuroscience research",
//     duration: "8 weeks",
//     topics: ["Cognitive Neuroscience", "Neuroimaging", "Computational Methods", "Clinical Applications"],
//     image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80",
//     outcomes: ["Advanced research capabilities", "Specialized technical skills", "Clinical research understanding"]
//   }
// ];

const specializations = [
  {
    title: "Clinical Neuroscience",
    icon: Brain,
    description: "Focus on neurological disorders and therapeutic approaches",
    courses: ["Neurological Disorders", "Clinical Trial Design", "Therapeutic Interventions"]
  },
  {
    title: "Research & Academia",
    icon: Beaker,
    description: "Prepare for academic research and teaching careers",
    courses: ["Advanced Research Methods", "Grant Writing", "Academic Publishing"]
  },
  {
    title: "Computational Neuroscience",
    icon: Target,
    description: "Apply computational methods to understand brain function",
    courses: ["Neural Data Analysis", "Computational Modeling", "Machine Learning in Neuroscience"]
  },
  {
    title: "Global Health",
    icon: Globe,
    description: "Address neurological health challenges in African contexts",
    courses: ["Public Health Neuroscience", "Community Health", "Health Policy"]
  }
];

export default function Curriculum() {
  return (
    <Layout>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-48 bg-gradient-to-br from-amber-950 to-amber-800">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-96 h-96 -top-48 -left-48 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-amber-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-amber-200 to-amber-100 bg-clip-text text-transparent">
                  Curriculum Development
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl text-amber-100 max-w-3xl mx-auto mb-8"
              >
                Innovative neuroscience education tailored for African institutions and research needs
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center mx-auto"
              >
                Download Curriculum Guide
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* Core Modules */}
        {/* <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Core Modules</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Comprehensive learning pathways designed to build strong foundations in neuroscience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48">
                    <img
                      src={module.image}
                      alt={module.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-amber-900 mb-2">{module.title}</h3>
                    <p className="text-amber-700 mb-4">{module.description}</p>
                    <div className="flex items-center text-amber-600 mb-4">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      <h4 className="font-semibold text-amber-900">Key Topics:</h4>
                      {module.topics.map((topic, i) => (
                        <div key={i} className="flex items-center text-amber-700">
                          <ChevronRight className="h-4 w-4 mr-2 text-amber-500" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-amber-900">Learning Outcomes:</h4>
                      {module.outcomes.map((outcome, i) => (
                        <div key={i} className="flex items-center text-amber-700">
                          <Star className="h-4 w-4 mr-2 text-amber-500" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Data Science Integration */}
        <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-full min-h-[400px]">
                  <img
                    src="/Assets/Curricular_development/data_science.jpg"
                    alt="Data Science in Neuroscience"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-amber-900 mb-6">Data Science Integration</h2>
                  <p className="text-amber-700 mb-6">
                    Integrating data science/data analytics as a taught module in relevant disciplines (such as Neuroscience and Psychology) is critical to a sustainable FAIR brain data ecosystem in Africa. ABDN is committed to building capacities for robust integration of data science into necessary courses and modules in academia.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Target className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <span className="text-amber-600">Comprehensive data science modules integrated into neuroscience curriculum</span>
                    </div>
                    <div className="flex items-start">
                      <Brain className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <span className="text-amber-600">Practical applications in neuroimaging and behavioral data analysis</span>
                    </div>
                    <div className="flex items-start">
                      <Globe className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <span className="text-amber-600">Focus on FAIR principles and sustainable data practices</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Specialization Tracks */}
        <section className="py-24 bg-gradient-to-br from-white to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Specialization Tracks</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Choose your path and develop expertise in specific areas of neuroscience
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {specializations.map((track, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <track.icon className="w-8 h-8 text-amber-600 mr-4" />
                      <h3 className="text-2xl font-semibold text-amber-900">{track.title}</h3>
                    </div>
                    <p className="text-amber-700 mb-6">{track.description}</p>
                    <div className="space-y-3">
                      {track.courses.map((course, i) => (
                        <div key={i} className="flex items-center text-amber-700">
                          <ChevronRight className="w-5 h-5 text-amber-500 mr-2" />
                          <span>{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Program Features */}
        <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Program Features</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                What sets our curriculum apart
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: Brain,
                  title: "Research-Based",
                  description: "Curriculum informed by latest neuroscience research and African healthcare needs"
                },
                {
                  icon: Users,
                  title: "Collaborative",
                  description: "Developed with leading African institutions and international partners"
                },
                {
                  icon: FileCheck,
                  title: "Comprehensive",
                  description: "Covers fundamental to advanced topics with practical applications"
                },
                {
                  icon: Award,
                  title: "Accredited",
                  description: "Internationally recognized qualifications and certifications"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-block p-4 bg-amber-100 rounded-full mb-4">
                    <feature.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-900 mb-2">{feature.title}</h3>
                  <p className="text-amber-700">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
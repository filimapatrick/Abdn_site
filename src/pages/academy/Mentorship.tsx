import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, ArrowRight, Handshake, GraduationCap, Target, Brain, BookOpen, BrainCircuit, Lightbulb, ChevronRight } from 'lucide-react';
import Layout from '../../components/Layout';

const mentorshipTracks = [
  {
    title: "Research Track",
    icon: BookOpen,
    description: "For aspiring researchers and academics, focusing on research methodologies, paper writing, and grant applications.",
    benefits: ["Research methodology guidance", "Paper writing support", "Grant application assistance", "Academic career planning"]
  },
  {
    title: "Industry Track",
    icon: BrainCircuit,
    description: "For those pursuing industry careers, focusing on applied neuroscience and practical skills development.",
    benefits: ["Industry exposure", "Technical skill development", "Project management", "Professional networking"]
  },
  {
    title: "Leadership Track",
    icon: Target,
    description: "Developing future science leaders in Africa, focusing on leadership skills and program management.",
    benefits: ["Leadership development", "Strategic planning", "Team management", "Decision-making skills"]
  },
  {
    title: "Technical Track",
    icon: Lightbulb,
    description: "Specialized mentorship in technical skills like data analysis, neuroimaging, and computational neuroscience.",
    benefits: ["Technical skill mastery", "Hands-on projects", "Tool proficiency", "Problem-solving skills"]
  }
];

export default function Mentorship() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 bg-gradient-to-br from-amber-950 to-amber-800">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
            >
              Global Mentorship Program
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl md:text-2xl text-amber-100 max-w-4xl mx-auto px-4"
            >
              Connecting African researchers with global mentors for guidance and growth
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mentorship Overview */}
      <section className="py-24 bg-white">
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
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80"
                  alt="Mentorship Program"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-amber-900 mb-6">Global Mentorship Network</h2>
                <p className="text-amber-700 mb-6">
                  ABDN works to connect active African researchers with mentors from different parts of the world in relation to FAIR brain data. This is needed for fostering capacity development and research/career guidance beyond the webinar Series and workshops.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Globe className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                    <span className="text-amber-600">Connect with experienced mentors worldwide</span>
                  </div>
                  <div className="flex items-start">
                    <GraduationCap className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                    <span className="text-amber-600">Receive guidance on research and career development</span>
                  </div>
                  <div className="flex items-start">
                    <Target className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                    <span className="text-amber-600">Focus on FAIR brain data principles and practices</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="self-start bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center group"
                >
                  Volunteer to become a mentor
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-6">Program Benefits</h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Empowering the next generation of African neuroscience researchers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Network Growth",
                description: "Connect with leading researchers and expand your professional network"
              },
              {
                icon: Handshake,
                title: "Personalized Guidance",
                description: "Receive one-on-one mentorship tailored to your research interests"
              },
              {
                icon: GraduationCap,
                title: "Career Development",
                description: "Get support for your academic and research career progression"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-block p-4 bg-amber-100 rounded-full mb-4">
                  <benefit.icon className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">{benefit.title}</h3>
                <p className="text-amber-700">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship Tracks */}
      <section className="py-24 bg-gradient-to-br from-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-amber-900 mb-6">Mentorship Tracks</h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Choose the mentorship track that best aligns with your career goals and aspirations
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {mentorshipTracks.map((track, index) => (
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
                  <ul className="space-y-3">
                    {track.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-amber-700">
                        <ChevronRight className="w-5 h-5 text-amber-500 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
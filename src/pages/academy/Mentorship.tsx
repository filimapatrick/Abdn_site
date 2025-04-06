import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Calendar, MessageSquare, Award, BookOpen, ArrowRight, Target, Network, ChevronRight, BrainCircuit, Lightbulb, UserPlus, Plus, Minus } from 'lucide-react';
import Layout from '../../components/Layout';

const mentors = [
  {
    name: "Dr. Sarah Mwangi",
    role: "Senior Neuroscientist",
    institution: "University of Nairobi",
    expertise: ["Neuroimaging", "Brain Mapping", "Clinical Research"],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
    description: "Leading expert in advanced neuroimaging techniques with over 10 years of research experience in Africa."
  },
  {
    name: "Dr. Mohammed Ahmed",
    role: "Research Director",
    institution: "ICIPE",
    expertise: ["Data Science", "Computational Neuroscience", "AI in Healthcare"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    description: "Pioneering the application of AI and data science in African neuroscience research."
  },
  {
    name: "Dr. Grace Okonjo",
    role: "Principal Investigator",
    institution: "University of Ghana",
    expertise: ["Molecular Neuroscience", "Drug Development", "Neurodegenerative Diseases"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
    description: "Specializes in developing novel therapeutic approaches for neurodegenerative diseases."
  }
];

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

const faqs = [
  {
    question: "Who can apply for the mentorship program?",
    answer: "The program is open to African students, early-career researchers, and professionals in neuroscience and related fields. Both mentors and mentees from various backgrounds are welcome to apply."
  },
  {
    question: "How long does the mentorship program last?",
    answer: "The formal mentorship period typically lasts 12 months, with the possibility of extension based on mutual agreement between mentor and mentee."
  },
  {
    question: "What is the time commitment required?",
    answer: "Mentors and mentees are expected to meet virtually at least once a month, with additional communication through email or messaging. The typical time commitment is 2-4 hours per month."
  },
  {
    question: "Is there a cost to participate?",
    answer: "The ABDN mentorship program is provided free of charge to selected participants, as part of our commitment to developing neuroscience capacity in Africa."
  },
  {
    question: "Can I choose my mentor/mentee?",
    answer: "While we consider preferences, matches are made based on alignment of research interests, career goals, and availability. Our matching process ensures the best possible mentor-mentee fit."
  }
];

export default function Mentorship() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <Layout>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-amber-950 to-amber-800">
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
                  ABDN Mentorship Program
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl text-amber-100 max-w-3xl mx-auto mb-8"
              >
                Connect with leading African neuroscience experts for personalized guidance and support in your research journey
              </motion.p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center"
                >
                  Apply as Mentee
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 flex items-center backdrop-blur-sm"
                >
                  Become a Mentor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Mentors Section */}
        <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Meet Our Mentors</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Learn from experienced researchers and practitioners who are shaping the future of African neuroscience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mentors.map((mentor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-64">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-amber-900 mb-1">{mentor.name}</h3>
                    <p className="text-amber-600 font-medium mb-1">{mentor.role}</p>
                    <p className="text-amber-700 mb-4">{mentor.institution}</p>
                    <div className="space-y-2 mb-6">
                      {mentor.expertise.map((skill, i) => (
                        <div key={i} className="flex items-center text-amber-700">
                          <Star className="h-4 w-4 mr-2 text-amber-500" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-amber-600 text-sm mb-4">{mentor.description}</p>
                    <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center group">
                      Request Mentorship
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
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

        {/* Program Benefits */}
        <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Program Benefits</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Comprehensive support for your neuroscience career development
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: MessageSquare,
                  title: "1:1 Guidance",
                  description: "Regular one-on-one mentorship sessions tailored to your needs"
                },
                {
                  icon: Calendar,
                  title: "Flexible Schedule",
                  description: "Virtual meetings that fit your timezone and availability"
                },
                {
                  icon: BookOpen,
                  title: "Resources",
                  description: "Access to exclusive learning materials and research resources"
                },
                {
                  icon: Award,
                  title: "Recognition",
                  description: "Formal certification upon program completion"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
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

        {/* FAQ Section */}
        <section className="py-24 bg-gradient-to-br from-white to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Find answers to common questions about our mentorship program
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-amber-50 to-white rounded-xl overflow-hidden shadow-lg border border-amber-100"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-amber-50/50 transition-colors duration-300"
                  >
                    <span className="text-lg font-semibold text-amber-900">{faq.question}</span>
                    {openFaqIndex === index ? (
                      <Minus className="w-5 h-5 text-amber-600 flex-shrink-0 ml-4" />
                    ) : (
                      <Plus className="w-5 h-5 text-amber-600 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={openFaqIndex === index ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {openFaqIndex === index && (
                      <div className="px-8 pb-6 pt-2">
                        <p className="text-amber-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Target, BookOpen, Network, Calendar, ChevronRight, GraduationCap, BrainCircuit, Lightbulb, UserPlus, CheckCircle2, Clock, MessageSquare, Award, Plus, Minus } from 'lucide-react';

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

const featuredMentors = [
  {
    name: "Dr. Sarah Johnson",
    title: "Research Director",
    expertise: "Neuroimaging",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    description: "Specializes in advanced neuroimaging techniques with 15 years of research experience."
  },
  {
    name: "Prof. Michael Adebayo",
    title: "Principal Investigator",
    expertise: "Computational Neuroscience",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    description: "Leading expert in computational modeling of neural systems and brain data analysis."
  },
  {
    name: "Dr. Amina Osei",
    title: "Senior Researcher",
    expertise: "Clinical Neuroscience",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
    description: "Focuses on translational research and clinical applications in neuroscience."
  }
];

const successStories = [
  {
    name: "Dr. Emmanuel Kwesi",
    role: "Research Scientist",
    story: "The ABDN mentorship program connected me with leading experts who guided my research in computational neuroscience. Today, I lead a research team studying neural networks.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
  },
  {
    name: "Dr. Aisha Mohammed",
    role: "Neuroscience Professor",
    story: "Through the mentorship program, I gained invaluable research experience and networking opportunities. Now, I'm mentoring the next generation of African neuroscientists.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
  },
  {
    name: "Dr. Samuel Okonjo",
    role: "Clinical Researcher",
    story: "The technical skills and industry connections I gained through ABDN's mentorship were instrumental in establishing my research laboratory.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80"
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
  const [activeTrack, setActiveTrack] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-amber-950 to-amber-800 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-200 to-amber-100 bg-clip-text text-transparent">
                ABDN Mentorship Program
              </span>
            </h1>
            <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
              Connecting aspiring neuroscientists with experienced mentors to foster growth, innovation, and excellence in African neuroscience.
            </p>
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
          </motion.div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-amber-900 mb-6">Program Overview</h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Our mentorship program is designed to support the next generation of African neuroscientists through personalized guidance, skill development, and networking opportunities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Expert Guidance",
                description: "Learn from experienced professionals in neuroscience research and industry."
              },
              {
                icon: Target,
                title: "Focused Development",
                description: "Tailored mentorship paths aligned with your career goals and interests."
              },
              {
                icon: Network,
                title: "Network Growth",
                description: "Connect with peers and professionals in the neuroscience community."
              },
              {
                icon: Calendar,
                title: "Structured Program",
                description: "Regular sessions and milestones to ensure consistent progress."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-amber-600 mb-4" />
                <h3 className="text-xl font-semibold text-amber-900 mb-2">{feature.title}</h3>
                <p className="text-amber-700">{feature.description}</p>
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
              Choose the mentorship track that best aligns with your career goals and aspirations.
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

      {/* Featured Mentors */}
      <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-amber-900 mb-6">Featured Mentors</h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Learn from experienced professionals who are passionate about developing the next generation of neuroscientists.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMentors.map((mentor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-64">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent" />
                </div>
                <div className="p-6 relative">
                  <h3 className="text-xl font-semibold text-amber-900 mb-1">{mentor.name}</h3>
                  <p className="text-amber-700 font-medium mb-1">{mentor.title}</p>
                  <p className="text-amber-600 text-sm mb-4">Expertise: {mentor.expertise}</p>
                  <p className="text-amber-700">{mentor.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-amber-900 mb-6">How It Works</h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Our structured mentorship process ensures meaningful connections and measurable progress.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: UserPlus,
                title: "Apply",
                description: "Submit your application as either a mentor or mentee, detailing your background and goals."
              },
              {
                icon: Target,
                title: "Match",
                description: "Get matched with a mentor/mentee based on your interests and career objectives."
              },
              {
                icon: Calendar,
                title: "Connect",
                description: "Begin your mentorship journey with structured sessions and clear objectives."
              },
              {
                icon: Award,
                title: "Grow",
                description: "Develop your skills, expand your network, and achieve your career goals."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <step.icon className="w-12 h-12 text-amber-600 mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">{step.title}</h3>
                <p className="text-amber-700">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-amber-900 mb-6">Success Stories</h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Discover how our mentorship program has transformed careers and advanced neuroscience in Africa.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-1">{story.name}</h3>
                  <p className="text-amber-600 text-sm mb-4">{story.role}</p>
                  <p className="text-amber-700 italic">"{story.story}"</p>
                </div>
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
              Find answers to common questions about our mentorship program.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-amber-50 transition-colors duration-300"
                >
                  <span className="text-lg font-semibold text-amber-900">{faq.question}</span>
                  {openFaqIndex === index ? (
                    <Minus className="w-5 h-5 text-amber-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-amber-600" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-amber-700">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-amber-900 mb-6">Get Started</h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Ready to begin your mentorship journey? Contact us or apply now.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-amber-900 mb-4">Apply as a Mentee</h3>
              <p className="text-amber-700 mb-6">
                Take the first step towards advancing your career in neuroscience. Join our mentorship program as a mentee.
              </p>
              <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center">
                Start Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-amber-900 mb-4">Become a Mentor</h3>
              <p className="text-amber-700 mb-6">
                Share your expertise and help shape the future of neuroscience in Africa. Apply to become a mentor.
              </p>
              <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
} 
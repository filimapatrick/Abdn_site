import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, BookOpen, Database, Microscope, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const offerings = [
  {
    icon: GraduationCap,
    title: "Training Programs",
    description: "Build expertise in cutting-edge neuroscience techniques through workshops and online courses",
    path: "/academy/training",
    color: "bg-blue-100",
    textColor: "text-blue-600"
  },
  {
    icon: BookOpen,
    title: "Curricular Development",
    description: "Collaborate to create innovative neuroscience curricula tailored for African institutions",
    path: "/academy/curriculum",
    color: "bg-indigo-100",
    textColor: "text-indigo-600"
  },
  {
    icon: Users,
    title: "Mentorship",
    description: "Connect with leading neuroscientists for guidance on research and career development",
    path: "/academy/mentorship",
    color: "bg-purple-100",
    textColor: "text-purple-600"
  },
  {
    icon: Database,
    title: "Research Infrastructure",
    description: "Access state-of-the-art tools and facilities to advance your neuroscience projects",
    path: "/academy/infrastructure",
    color: "bg-pink-100",
    textColor: "text-pink-600"
  },
  {
    icon: Microscope,
    title: "Research Groups",
    description: "Join vibrant communities of researchers working on groundbreaking neuroscience topics",
    path: "/academy/research-groups",
    color: "bg-emerald-100",
    textColor: "text-emerald-600"
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Participate in workshops, conferences, and seminars that shape the future of neuroscience",
    path: "/academy/events",
    color: "bg-amber-100",
    textColor: "text-amber-600"
  }
];

export default function CoreOfferings() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Core Offerings</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive programs designed to advance neuroscience research and education across Africa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((offering, index) => {
            const Icon = offering.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  to={offering.path}
                  className="block bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className={`${offering.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6`}>
                    <Icon className={`h-6 w-6 ${offering.textColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{offering.title}</h3>
                  <p className="text-gray-600">{offering.description}</p>
                  <div className={`mt-6 inline-flex items-center ${offering.textColor} font-semibold`}>
                    Learn More
                    <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
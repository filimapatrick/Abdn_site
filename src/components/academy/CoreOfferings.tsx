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
    color: "bg-amber-100",
    textColor: "text-amber-700",
    gradient: "from-amber-500/10 to-amber-600/10"
  },
  {
    icon: BookOpen,
    title: "Curricular Development",
    description: "Collaborate to create innovative neuroscience curricula tailored for African institutions",
    path: "/academy/curriculum",
    color: "bg-amber-100",
    textColor: "text-amber-700",
    gradient: "from-amber-500/10 to-amber-600/10"
  },
  {
    icon: Users,
    title: "Mentorship",
    description: "Connect with leading neuroscientists for guidance on research and career development",
    path: "/academy/mentorship",
    color: "bg-amber-100",
    textColor: "text-amber-700",
    gradient: "from-amber-500/10 to-amber-600/10"
  },
  {
    icon: Database,
    title: "Research Infrastructure",
    description: "Access state-of-the-art tools and facilities to advance your neuroscience projects",
    path: "/academy/infrastructure",
    color: "bg-amber-100",
    textColor: "text-amber-700",
    gradient: "from-amber-500/10 to-amber-600/10"
  },
  {
    icon: Microscope,
    title: "Research Groups",
    description: "Join vibrant communities of researchers working on groundbreaking neuroscience topics",
    path: "/academy/research-groups",
    color: "bg-amber-100",
    textColor: "text-amber-700",
    gradient: "from-amber-500/10 to-amber-600/10"
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Participate in workshops, conferences, and seminars that shape the future of neuroscience",
    path: "/academy/events",
    color: "bg-amber-100",
    textColor: "text-amber-700",
    gradient: "from-amber-500/10 to-amber-600/10"
  }
];

export default function CoreOfferings() {
  return (
    <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Core Offerings</h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
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
                  className="group block bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-amber-100/50"
                >
                  <div className={`bg-gradient-to-br ${offering.gradient} w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${offering.textColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-4 group-hover:text-amber-700 transition-colors">{offering.title}</h3>
                  <p className="text-amber-700/80">{offering.description}</p>
                  <div className={`mt-6 inline-flex items-center ${offering.textColor} font-semibold group-hover:translate-x-1 transition-transform`}>
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
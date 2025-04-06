import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Database, Video, Download } from 'lucide-react';

const resources = [
  {
    icon: BookOpen,
    title: "Online Courses",
    description: "Access our comprehensive library of neuroscience courses and tutorials",
    link: "#",
    gradient: "from-amber-500/10 to-amber-600/10",
    textColor: "text-amber-700"
  },
  {
    icon: Database,
    title: "Data Repository",
    description: "Explore our collection of African brain research datasets",
    link: "#",
    gradient: "from-amber-500/10 to-amber-600/10",
    textColor: "text-amber-700"
  },
  {
    icon: Video,
    title: "Video Library",
    description: "Watch recorded lectures, workshops, and research presentations",
    link: "#",
    gradient: "from-amber-500/10 to-amber-600/10",
    textColor: "text-amber-700"
  },
  {
    icon: Download,
    title: "Research Tools",
    description: "Download software and tools for neuroscience research",
    link: "#",
    gradient: "from-amber-500/10 to-amber-600/10",
    textColor: "text-amber-700"
  }
];

export default function Resources() {
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
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Learning Resources</h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Access a wealth of educational materials and research tools to support your neuroscience journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group border border-amber-100/50"
              >
                <div className={`bg-gradient-to-br ${resource.gradient} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-6 w-6 ${resource.textColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">{resource.title}</h3>
                <p className="text-amber-700/80 mb-4">{resource.description}</p>
                <a
                  href={resource.link}
                  className={`inline-flex items-center ${resource.textColor} font-semibold group-hover:translate-x-1 transition-transform`}
                >
                  Access Now
                  <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Database, Video, Download } from 'lucide-react';

const resources = [
  {
    icon: BookOpen,
    title: "Online Courses",
    description: "Access our comprehensive library of neuroscience courses and tutorials",
    link: "#",
    color: "bg-blue-100",
    textColor: "text-blue-600"
  },
  {
    icon: Database,
    title: "Data Repository",
    description: "Explore our collection of African brain research datasets",
    link: "#",
    color: "bg-purple-100",
    textColor: "text-purple-600"
  },
  {
    icon: Video,
    title: "Video Library",
    description: "Watch recorded lectures, workshops, and research presentations",
    link: "#",
    color: "bg-emerald-100",
    textColor: "text-emerald-600"
  },
  {
    icon: Download,
    title: "Research Tools",
    description: "Download software and tools for neuroscience research",
    link: "#",
    color: "bg-amber-100",
    textColor: "text-amber-600"
  }
];

export default function Resources() {
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
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Learning Resources</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className={`${resource.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 ${resource.textColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <a
                  href={resource.link}
                  className={`inline-flex items-center ${resource.textColor} font-semibold hover:opacity-80`}
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
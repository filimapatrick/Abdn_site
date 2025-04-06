import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const stories = [
  {
    quote: "ABDN Academy's training programs have transformed my research capabilities and opened new opportunities for collaboration.",
    author: "Dr. Sarah Mwangi",
    role: "Research Fellow",
    institution: "University of Nairobi",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
  },
  {
    quote: "The mentorship program connected me with leading experts who have guided my research journey and career development.",
    author: "Dr. Mohammed Ahmed",
    role: "Neuroscience Researcher",
    institution: "University of Ghana",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
  }
];

export default function SuccessStories() {
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
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Success Stories</h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Hear from researchers who have benefited from ABDN Academy's programs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group border border-amber-100/50"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-amber-200" />
              <p className="text-lg text-amber-800 mb-6 relative z-10">"{story.quote}"</p>
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={story.image}
                    alt={story.author}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-200 group-hover:ring-amber-300 transition-all duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full p-1.5 ring-2 ring-white">
                    <Quote className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-amber-900 group-hover:text-amber-700 transition-colors">{story.author}</h4>
                  <p className="text-amber-700">{story.role}</p>
                  <p className="text-amber-600/80 text-sm">{story.institution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
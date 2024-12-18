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
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
              className="bg-white p-8 rounded-xl shadow-sm relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-blue-100" />
              <p className="text-lg text-gray-700 mb-6 relative z-10">"{story.quote}"</p>
              <div className="flex items-center">
                <img
                  src={story.image}
                  alt={story.author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{story.author}</h4>
                  <p className="text-gray-600">{story.role}</p>
                  <p className="text-gray-500 text-sm">{story.institution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
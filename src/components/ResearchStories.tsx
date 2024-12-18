import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const stories = [
  {
    quote: "ABDN's research infrastructure has revolutionized how we conduct neuroscience studies in Africa. The collaborative environment has enabled groundbreaking discoveries.",
    author: "Dr. Sarah Mwangi",
    role: "Principal Investigator",
    institution: "University of Nairobi",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
  },
  {
    quote: "The network's support has been instrumental in establishing state-of-the-art neuroimaging facilities and advancing our understanding of brain disorders.",
    author: "Dr. Mohammed Ahmed",
    role: "Research Director",
    institution: "ICIPE",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
  },
  {
    quote: "Through ABDN's mentorship program, we're developing the next generation of African neuroscientists and fostering innovation across the continent.",
    author: "Dr. Grace Okonjo",
    role: "Neuroscientist",
    institution: "University of Ghana",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80"
  }
];

export default function ResearchStories() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Voices from Our Network
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from leading researchers who are advancing neuroscience across Africa
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <div className="bg-gray-50 p-8 rounded-lg mb-8 relative">
                <Quote className="absolute text-blue-600/10 h-16 w-16 -top-2 -left-2" />
                <p className="text-gray-600 relative z-10 text-lg leading-relaxed">
                  "{story.quote}"
                </p>
              </div>
              
              <div className="flex items-center mt-auto">
                <img
                  src={story.image}
                  alt={story.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">{story.author}</h4>
                  <p className="text-blue-600">{story.role}</p>
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
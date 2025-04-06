import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "ABDN has revolutionized how we collaborate on neuroscience research across Africa.",
    author: "Dr. Sarah Mwangi",
    role: "Principal Investigator",
    institution: "University of Nairobi",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
  },
  {
    quote: "The network's support has been instrumental in advancing our research capabilities.",
    author: "Dr. Mohammed Ahmed",
    role: "Research Fellow",
    institution: "ICIPE",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
  }
];

export default function AboutTestimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Researcher Stories</h2>
          <p className="text-xl text-amber-700">Hear from our network members</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-xl relative border border-amber-100 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-amber-200" />
              <p className="text-lg text-amber-800 mb-6 relative z-10">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-amber-200"
                />
                <div>
                  <h4 className="font-semibold text-amber-900">{testimonial.author}</h4>
                  <p className="text-amber-700">{testimonial.role}</p>
                  <p className="text-amber-600 text-sm">{testimonial.institution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
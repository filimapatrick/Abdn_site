import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "It was a coincidence that I joined the ABDN school at the end of my first year as a PhD student, and it became a turning point in my journey. ABDN assigned a mentor to each student, and my mentor gave me insightful ideas, advice, and orientation for my PhD, as well as the opportunity to collaborate on a project that led to a joint publication. Beyond that, the network with faculty and peers has been invaluable, I can always reach out for guidance, and they have truly supported me along the way, with papers I need because of some limits here in Africa we have not full access, also with recommendation letter if needed.",
    author: "Oumayma Soula",
    role: "PhD Student",
    institution: "Faculty of medicine of Sax",
    image: "/Assets/NationalCordinators/Soula.jpg"
  },
  {
    quote: "ABDN was the first African network that provided me with solid training and hands-on experience. It sparked my journey into working with fMRI and EEG data, and their continuous support has been invaluable in shaping my growth as a researcher.",
    author: "Eman Khalil",
    role: "Assistant Professor",
    institution: "The American University in Cairo",
    image: "/Assets/NationalCordinators/Khalil.jpeg"
  }
];

export default function AboutTestimonials() {
  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(null);

  const truncateText = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

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
              className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-xl relative border border-amber-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setExpandedTestimonial(index)}
              onMouseLeave={() => setExpandedTestimonial(null)}
              onFocus={() => setExpandedTestimonial(index)}
              onBlur={() => setExpandedTestimonial(null)}
              tabIndex={0}
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-amber-200" />
              <p className="text-lg text-amber-800 mb-6 relative z-10 transition-all duration-300">
                "{expandedTestimonial === index ? testimonial.quote : truncateText(testimonial.quote)}"
              </p>
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
import React from 'react';
import { motion } from 'framer-motion';
import t from '../../../Assets/Partners/brain_wellness_initative.jpg'

const partners = [
  {
    name: "Society for Neuroscientist Africa (SONA)",
    logo: "../../../Assets/Partners/Sona.jpg",
    description: "Leading African neuroscience society promoting research excellence"
  },
  {
    name: "Neuroscience Society of Nigeria (NSN)",
    logo: "../../../Assets/Partners/nsn.jpg",
    description: "Advancing neuroscience research and education in Nigeria"
  },
  {
    name: "Brainlife",
    logo: "../../../Assets/Partners/brainlife.jpg",
    description: "World-class research center fostering scientific innovation"
  },
  {
    name: "University of Nothgham",
    logo: "../../../Assets/Partners/Nottingham.jpg",
    description: "Leading institution in neuroscience education and research"
  }
];

export default function Partners() {
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
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Partners</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Collaborating with leading institutions and organizations to advance neuroscience research in Africa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="h-24 flex items-center justify-center mb-6">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                {partner.name}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
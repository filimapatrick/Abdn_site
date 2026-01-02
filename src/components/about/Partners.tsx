import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  {
    name: "Sona",
    logo: "/assets/Partners/Sona.jpg",
    description: "Supporting research and innovation in neuroscience"
  },
  {
    name: "NSN",
    logo: "/assets/Partners/nsn.jpg",
    description: "Advancing neuroscience education and research in Nigeria"
  },
  {
    name: "Brainlife",
    logo: "/assets/Partners/brainlife.jpg",
    description: "Providing cutting-edge neuroimaging data processing tools"
  },
  {
    name: "University of Nottingham",
    logo: "/assets/Partners/Nottingham.jpg",
    description: "Fostering international collaboration in brain science"
  },
  {
    name: "Brain Wellness Initiative",
    logo: "/assets/Partners/brain_wellness_initative.jpg",
    description: "Promoting brain health and well-being"
  },
  {
    name: "De Montfort University",
    logo: "/assets/Partners/dmu-logo.png",
    description: "Fostering international collaboration in brain science"
  }
];

export default function Partners() {
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
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Our Partners</h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
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
              className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-amber-100"
            >
              <div className="h-24 flex items-center justify-center mb-6">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2 text-center">
                {partner.name}
              </h3>
              <p className="text-amber-700 text-center text-sm">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
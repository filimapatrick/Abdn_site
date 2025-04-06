import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Who can join ABDN Academy?",
    answer: "ABDN Academy welcomes researchers, students, and professionals in neuroscience and related fields across Africa. Whether you're a student, early-career researcher, or established scientist, our programs are designed to support your growth and development."
  },
  {
    question: "Are there any fees for the programs?",
    answer: "Most of our core programs are offered free of charge, thanks to our partnerships and funding support. Some specialized workshops or advanced training programs may have nominal fees, but we offer scholarships and financial assistance to ensure accessibility."
  },
  {
    question: "How can I apply for mentorship?",
    answer: "You can apply for mentorship through our online portal. The process includes submitting your CV, research interests, and a brief statement about your career goals. Applications are reviewed quarterly, and matches are made based on research alignment and career objectives."
  },
  {
    question: "What types of training programs are available?",
    answer: "We offer a diverse range of training programs including online courses, hands-on workshops, research methodology training, data analysis workshops, and specialized technical training in neuroscience techniques. Programs are available both virtually and in-person."
  },
  {
    question: "How can I access research infrastructure?",
    answer: "Research infrastructure access is available to ABDN members through our partner institutions. Submit a request through your ABDN account, detailing your research needs and timeline. Our team will connect you with the appropriate facilities and support."
  }
];

export default function AcademyFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Find answers to common questions about ABDN Academy's programs and opportunities
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-lg shadow-sm"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="text-lg font-semibold text-amber-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-amber-600 transform transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-amber-700">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
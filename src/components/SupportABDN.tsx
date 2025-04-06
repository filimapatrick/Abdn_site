import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Coins, Calendar, Users, Brain, Microscope } from 'lucide-react';

const fundingCategories = [
  {
    id: 'annual',
    title: 'Annual ABDN Program',
    icon: Brain,
    description: 'Contribute to our core program supporting research, training, and collaboration in African neuroscience.'
  },
  {
    id: 'research',
    title: 'Research Projects',
    icon: Microscope,
    description: 'Support ongoing neuroscience research projects led by African researchers across the continent.'
  },
  {
    id: 'symposium',
    title: 'Research Symposium',
    icon: Calendar,
    description: 'Support our annual symposium bringing together neuroscience researchers from across Africa.'
  },
  {
    id: 'awareness',
    title: 'Awareness Programs',
    icon: Users,
    description: 'Fund outreach initiatives to promote neuroscience education and awareness in African communities.'
  }
];

export default function SupportABDN() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    fundingCategory: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-amber-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Coins className="w-8 h-8 text-amber-600 mr-2" />
            <h2 className="text-4xl font-bold text-amber-900">Support ABDN</h2>
          </div>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Join us in advancing neuroscience research and education across Africa through your generous support
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Funding Categories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-amber-900 mb-8">Funding Opportunities</h3>
            {fundingCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100"
                >
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-amber-900 mb-2">{category.title}</h4>
                      <p className="text-amber-700">{category.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-amber-100"
          >
            <h3 className="text-2xl font-bold text-amber-900 mb-6">Express Your Interest</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-amber-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-amber-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-amber-700 mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="fundingCategory" className="block text-sm font-medium text-amber-700 mb-2">
                  Area of Interest
                </label>
                <select
                  id="fundingCategory"
                  name="fundingCategory"
                  value={formData.fundingCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Select a category</option>
                  {fundingCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-amber-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center group"
              >
                Submit Interest
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Calendar } from 'lucide-react';

const taData = [
  {
    src: '/Assets/participant4.jpeg',
    alt: 'John Doe',
    name: 'John Doe',
    university: 'University of Lagos',
    field: 'Data Science',
    category: 'Computational',
    year: 2024,
  },
  {
    src: '/Assets/participant5.jpeg',
    alt: 'Jane Smith',
    name: 'Jane Smith',
    university: 'University of Ibadan',
    field: 'Neuroscience',
    category: 'Biology',
    year: 2024,
  },
  {
    src: '/Assets/participant6.jpeg',
    alt: 'Michael Johnson',
    name: 'Michael Johnson',
    university: 'University of Ghana',
    field: 'Brain Imaging',
    category: 'Imaging',
    year: 2024,
  },
  {
    src: '/Assets/participant7.jpeg',
    alt: 'Sarah Williams',
    name: 'Sarah Williams',
    university: 'University of Nairobi',
    field: 'Neural Engineering',
    category: 'Engineering',
    year: 2024,
  },
  {
    src: '/Assets/participant8.jpeg',
    alt: 'David Brown',
    name: 'David Brown',
    university: 'University of Cape Town',
    field: 'Computational Neuroscience',
    category: 'Computational',
    year: 2024,
  },
  {
    src: '/Assets/participant9.jpeg',
    alt: 'Emily Davis',
    name: 'Emily Davis',
    university: 'Addis Ababa University',
    field: 'Molecular Biology',
    category: 'Biology',
    year: 2024,
  }
];

export default function TeachingAssistants() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Computational', 'Biology', 'Imaging', 'Engineering'];
  const filteredTAs = selectedCategory === 'All' 
    ? taData 
    : taData.filter(ta => ta.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Computational':
        return '💻';
      case 'Biology':
        return '🧬';
      case 'Imaging':
        return '🔬';
      case 'Engineering':
        return '⚡';
      default:
        return '👥';
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-amber-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Teaching Assistants</h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto mb-8">
            Meet our dedicated teaching assistants who support and guide our students through their learning journey.
          </p>

          {/* Category Filter */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-white shadow-lg scale-105'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
                whileHover={{ scale: selectedCategory === category ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{getCategoryIcon(category)}</span>
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredTAs.map((ta, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl shadow-lg group bg-gradient-to-br from-amber-50 to-white border border-amber-100"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="aspect-w-3 aspect-h-4">
                <img
                  src={ta.src}
                  alt={ta.alt}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <motion.div 
                  className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                  animate={hoveredIndex === index ? { y: 0 } : { y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{getCategoryIcon(ta.category)}</span>
                    <h3 className="text-xl font-bold text-white">{ta.name}</h3>
                  </div>
                  <p className="text-amber-200 text-sm mb-2">{ta.university}</p>
                  <p className="text-amber-100 text-sm mb-4">{ta.field}</p>
                  <div className="flex justify-between items-center">
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center text-amber-200 text-sm font-medium group/btn"
                    >
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </motion.button>
                    <span className="text-amber-200 text-sm">
                      <GraduationCap className="inline-block w-4 h-4 mr-1" />
                      {ta.year}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTAs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-amber-700 text-lg">
              No teaching assistants found in {selectedCategory === 'All' ? 'any category' : `the ${selectedCategory} category`}.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
} 
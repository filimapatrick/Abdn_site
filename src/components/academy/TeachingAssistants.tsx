import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Calendar } from 'lucide-react';

const taData = [
  {
    src: '/Assets/Teaching_Assistant/brad.png',
    alt: 'Bradley Caron PhD',
    name: 'Bradley Caron PhD',
    university: 'University of Texas, Austin, USA.',
    profile: 'https://liberalarts.utexas.edu/cps/gradstudents/bac4447',
    year: 2023,
  },
  {
    src: '/Assets/Teaching_Assistant/Azeezat.jpg',
    alt: 'Azeezat Azeez PhD', 
    name: 'Azeezat Azeez PhD',
    university: 'Stanford University, California, USA.',
    profile: 'https://profiles.stanford.edu/azeezat-azeez',
    year: 2023,
  },
  {
    src: '/Assets/Teaching_Assistant/Anibal.png',
    alt: 'Annibal Heinsfeld PhD ',
    name: 'Annibal Heinsfeld PhD ',
    university: 'University of Texas, Austin, USA.',
    profile: 'https://liberalarts.utexas.edu/cps/gradstudents/ash3454',
    year: 2023,
  },
  {
    src: '/Assets/participant7.jpeg',
    alt: 'Sarah Williams',
    name: 'Sarah Williams',
    university: 'University of Texas, Austin, USA.',
    profile: 'https://liberalarts.utexas.edu/cps/gradstudents/ash3454',
    year: 2023,
  },

  // 2024 teaching assistants
  {
    src: 'Assets/Teaching_Assistant/brad.png',
    alt: 'Bradley Caron PhD',
    name: 'Bradley Caron PhD',
    university: 'University of Texas, Austin, USA.',
    profile: 'https://liberalarts.utexas.edu/cps/gradstudents/bac4447',
    year: 2024,
  },
  {
    src: '/Assets/Teaching_Assistant/Azeezat.jpg',
    alt: 'Azeezat Azeez PhD', 
    name: 'Azeezat Azeez PhD',
    university: 'Stanford University, California, USA.',
    profile: 'https://profiles.stanford.edu/azeezat-azeez',
    year: 2024,
  },
  {
    src: '/Assets/Teaching_Assistant/Anibal.png',
    alt: 'Annibal Heinsfeld PhD ',
    name: 'Annibal Heinsfeld PhD ',
    university: 'University of Texas, Austin, USA.',
    profile: 'https://liberalarts.utexas.edu/cps/gradstudents/ash3454',
    year: 2024,
  },
  {
    src: '/Assets/Teaching_Assistants/Sarah.png',
    alt: 'Sarah Williams',
    name: 'Sarah Williams',
    university: 'University of Texas, Austin, USA.',
    profile: 'https://liberalarts.utexas.edu/cps/gradstudents/ash3454',
    year: 2024,
  },
];

export default function TeachingAssistants() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [visibleTAs, setVisibleTAs] = useState(6);
  const [showLessEnabled, setShowLessEnabled] = useState(false);

  const years = [2023, 2024];
  const filteredTAs = taData.filter(ta => ta.year === selectedYear);

  const handleLoadMore = () => {
    setVisibleTAs((prev) => prev + 6);
    setShowLessEnabled(true);
  };

  const handleShowLess = () => {
    setVisibleTAs(6);
    setShowLessEnabled(false);
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

          {/* Year Filter */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {years.map((year) => (
              <motion.button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedYear === year
                    ? 'bg-amber-500 text-white shadow-lg scale-105'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
                whileHover={{ scale: selectedYear === year ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calendar className="w-5 h-5" />
                {year}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredTAs.slice(0, visibleTAs).map((ta, index) => (
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
                  <h3 className="text-xl font-bold text-white mb-2">{ta.name}</h3>
                  <p className="text-amber-100 text-sm mb-4">{ta.university}</p>
                  <div className="flex justify-between items-center">
                    <motion.a
                      href={ta.profile}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className="flex items-center text-amber-200 text-sm font-medium group/btn"
                    >
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </motion.a>
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
              No teaching assistants found for {selectedYear}.
            </p>
          </motion.div>
        )}

        <div className="text-center mt-12 space-x-4">
          {visibleTAs < filteredTAs.length && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow-md hover:from-amber-600 hover:to-amber-700 transition-all duration-300 inline-flex items-center"
            >
              Load More
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          )}
          {showLessEnabled && filteredTAs.length > 6 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShowLess}
              className="px-6 py-3 border-2 border-amber-200 text-amber-700 rounded-lg shadow-md hover:bg-amber-50 transition-all duration-300"
            >
              Show Less
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
} 
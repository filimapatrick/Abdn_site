import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Calendar } from 'lucide-react';

const facultyData = [
  {
    src: '/Assets/Damian.jpeg',
    alt: 'Dr. Damian Oyaole',
    name: 'Dr. Damian Oyaole',
    title: 'Research Scientist',
    specialization: 'Computational Neuroscience',
    category: 'Computational',
    year: 2023,
  },
  {
    src: '/Assets/moses.jpeg',
    alt: 'Dr. Moses Akanbi',
    name: 'Dr. Moses Akanbi',
    title: 'Senior Research Fellow',
    specialization: 'Neural Engineering',
    category: 'Engineering',
    year: 2023,
  },
  {
    src: '/Assets/barisua.jpeg',
    alt: 'Dr. Barisua James',
    name: 'Dr. Barisua James',
    title: 'Research Associate',
    specialization: 'Brain Imaging',
    category: 'Imaging',
    year: 2023,
  },
  {
    src: '/Assets/Azeez.jpeg',
    alt: 'Dr. Azeez Adebimpe',
    name: 'Dr. Azeez Adebimpe',
    title: 'Research Scientist',
    specialization: 'Neuroinformatics',
    category: 'Computational',
    year: 2023,
  },
  {
    src: '/Assets/filima.jpeg',
    alt: 'Dr. Patrick Filima',
    name: 'Dr. Patrick Filima',
    title: 'Research Fellow',
    specialization: 'Data Science',
    category: 'Computational',
    year: 2024,
  },
  {
    src: '/Assets/franco1.jpeg',
    alt: 'Dr. Franco Cabeza',
    name: 'Dr. Franco Cabeza',
    title: 'Senior Researcher',
    specialization: 'Structural Biology',
    category: 'Biology',
    year: 2024,
  },
  {
    src: '/Assets/ben1.jpeg',
    alt: 'Dr. Ben Fulcher',
    name: 'Dr. Ben Fulcher',
    title: 'Senior Research Scientist',
    specialization: 'Complex Systems',
    category: 'Computational',
    year: 2024,
  },
  {
    src: '/Assets/sussane1.jpeg',
    alt: 'Dr. Sussane Raab',
    name: 'Dr. Sussane Raab',
    title: 'Research Fellow',
    specialization: 'Neuroscience',
    category: 'Biology',
    year: 2024,
  },
  {
    src: '/Assets/silke1.jpeg',
    alt: 'Dr. Silke Bollmann',
    name: 'Dr. Silke Bollmann',
    title: 'Senior Researcher',
    specialization: 'Brain Imaging',
    category: 'Imaging',
    year: 2024,
  },
  {
    src: '/Assets/ebere1.jpeg',
    alt: 'Dr. Ebere Onwuamaegbu',
    name: 'Dr. Ebere Onwuamaegbu',
    title: 'Research Associate',
    specialization: 'Neuroscience',
    category: 'Biology',
    year: 2024,
  },
  {
    src: '/Assets/james1.jpeg',
    alt: 'Dr. James Kolawole',
    name: 'Dr. James Kolawole',
    title: 'Research Fellow',
    specialization: 'Data Science',
    category: 'Computational',
    year: 2024,
  },
  {
    src: '/Assets/mattew1.jpeg',
    alt: 'Dr. Matthew Nwosu',
    name: 'Dr. Matthew Nwosu',
    title: 'Research Scientist',
    specialization: 'Computational Biology',
    category: 'Biology',
    year: 2024,
  }
];

export default function FacultyGallery() {
  const [visibleFaculty, setVisibleFaculty] = useState(6);
  const [showLessEnabled, setShowLessEnabled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  const categories = ['All', 'Computational', 'Biology', 'Imaging', 'Engineering'];
  const years = [2023, 2024];

  const filteredFaculty = facultyData
    .filter(faculty => selectedCategory === 'All' || faculty.category === selectedCategory)
    .filter(faculty => faculty.year === selectedYear);

  const handleLoadMore = () => {
    setVisibleFaculty((prev) => prev + 6);
    setShowLessEnabled(true);
  };

  const handleShowLess = () => {
    setVisibleFaculty(6);
    setShowLessEnabled(false);
  };

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
    <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Our Faculty</h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto mb-8">
            Meet the brilliant minds shaping the future of neuroscience and education.
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
          {filteredFaculty.slice(0, visibleFaculty).map((faculty, index) => (
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
                  src={faculty.src}
                  alt={faculty.alt}
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
                    <span>{getCategoryIcon(faculty.category)}</span>
                    <h3 className="text-xl font-bold text-white">{faculty.name}</h3>
                  </div>
                  <p className="text-amber-200 text-sm mb-2">{faculty.title}</p>
                  <p className="text-amber-100 text-sm mb-4">{faculty.specialization}</p>
                  <div className="flex justify-between items-center">
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center text-amber-200 text-sm font-medium group/btn"
                    >
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </motion.button>
                    <span className="text-amber-200 text-sm">Joined {faculty.year}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredFaculty.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-amber-700 text-lg">
              No faculty members found for {selectedYear} in {selectedCategory === 'All' ? 'any category' : `the ${selectedCategory} category`}.
            </p>
          </motion.div>
        )}

        <div className="text-center mt-12 space-x-4">
          {visibleFaculty < filteredFaculty.length && (
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
          {showLessEnabled && filteredFaculty.length > 6 && (
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

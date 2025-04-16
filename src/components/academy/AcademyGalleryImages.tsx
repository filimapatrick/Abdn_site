// src/components/Gallery.js

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, ZoomIn } from 'lucide-react';

const yearDescriptions = {
  '2023': `The year 2023 marked a significant milestone for the African Brain Data Network (ABDN) as we successfully launched our inaugural ABDS Academy. This pioneering initiative brought together 30 talented African scientists from diverse backgrounds, creating a vibrant community of neuroscience researchers.

The academy focused on building essential skills in neuroimaging, data science, and computational neuroscience, with a strong emphasis on FAIR (Findable, Accessible, Interoperable, and Reusable) data principles. Through hands-on workshops, expert-led sessions, and collaborative projects, participants gained practical experience in handling complex brain data and applying cutting-edge analytical techniques.

A highlight of 2023 was the establishment of our first cohort of African neuroscience researchers who are now equipped to lead brain data initiatives across the continent. The success of this program has laid a strong foundation for future capacity-building efforts in African neuroscience.`,
  '2024': `Building on the success of 2023, the ABDS Academy in 2024 expanded its reach and impact, welcoming an even larger cohort of 45 African scientists. This year's program introduced advanced topics in neuroimaging modalities, structural neuroscience, and social neuroscience, reflecting the growing sophistication of our curriculum.

The 2024 academy placed particular emphasis on practical applications of neuroimaging datasets and the integration of digital tools into teaching and research. Participants engaged in hands-on projects that addressed real-world challenges in African neuroscience research, fostering innovation and collaboration.

A significant achievement of 2024 was the establishment of stronger connections between African researchers and international neuroscience communities, creating new opportunities for collaboration and knowledge exchange. The program also saw the development of region-specific neuroimaging protocols tailored to African contexts, marking an important step towards more inclusive and representative brain research.`
};

const galleryImages = [
  // 2023 Images

  
    {
      "src": "/Assets/Academy_2023/lecture_with_pestilli_in_lagos.jpg",
      "alt": "Lecture session with Pestilli in Lagos",
      "title": "Lecture with Pestilli in Lagos",
      "description": "Insightful lecture on brain imaging research",
      "year": 2023
    },
    {
      "src": "/Assets/Academy_2023/mattew_exposing_participants_to_INCF.jpg",
      "alt": "Mattew introducing participants to INCF",
      "title": "Introducing INCF with Mattew",
      "description": "Introduction to INCF neuroscience frameworks",
      "year": 2023
    },
    {
      "src": "/Assets/Academy_2023/mri_with_pestilli.jpg",
      "alt": "Pestilli demonstrating MRI imaging techniques",
      "title": "MRI Imaging with Pestilli",
      "description": "Live MRI demonstration session with Pestilli",
      "year": 2023
    },
    {
      "src": "/Assets/Academy_2023/participant_at_Nigeria_researve.jpg",
      "alt": "Participant at Nigeria Reserve center",
      "title": "Interactive Session at Nigeria Reserve Center",
      "description": "Fun and learning at Nigeria reserve",
      "year": 2023
    },
    {
      "src": "/Assets/Academy_2023/participants_at_panel_discussion.jpg",
      "alt": "Panel discussion with session participants",
      "title": "Panel Discussion Insights",
      "description": "Engaging panel on brain data science",
      "year": 2023
    },
    {
      "src": "/Assets/Academy_2023/participants_at_the_art_gallery.jpg",
      "alt": "Participants visiting an art gallery",
      "title": "Exploring Art and Science",
      "description": "Gallery visit blending art and science",
      "year": 2023
    },
    {
      "src": "/Assets/Academy_2023/participants_at_the_beach.jpg",
      "alt": "Participants enjoying time at the beach",
      "title": "Beachside Networking",
      "description": "Networking session by the ocean breeze",
      "year": 2023
    },
    {
      "src": "/Assets/Academy_2023/participants_learning.jpg",
      "alt": "Participants actively engaged in learning",
      "title": "Active Learning Session",
      "description": "Hands-on training in neuroscience methods",
      "year": 2023
    },
    {
      "src": "/Assets/Academy_2023/participants_spare_time.jpg",
      "alt": "Participants enjoying their spare time",
      "title": "Relaxation and Interaction",
      "description": "Participants bonding during spare moments",
      "year": 2023
    },
    {
      "src": "/Assets/Academy_2023/participants_still_at_the_beach.jpg",
      "alt": "Participants still enjoying the beach",
      "title": "Extended Beach Time",
      "description": "Continued fun time by the beach",
      "year": 2023
    },
    {
      "src": "/Assets/Academy_2023/thank_speach_to_Kavli_foundation.jpg",
      "alt": "Thank you speech to the Kavli Foundation",
      "title": "Gratitude to Kavli Foundation",
      "description": "Appreciation speech to Kavli Foundation team",
      "year": 2023
    },
  
  
   // 2024 Images
  {
    src: '/Assets/cross_section.jpeg',
    alt: 'Cross Section Training',
    title: 'Cross Section Analysis',
    description: 'Training session on cross-sectional imaging analysis',
    year: 2024,
  },
  {
    src: '/Assets/franco_structural.jpeg',
    alt: 'Structural Analysis',
    title: 'Structural Biology Workshop',
    description: 'Advanced workshop on structural biology techniques',
    year: 2024,
  },
  {
    src: '/Assets/Damian_nairobi.jpeg',
    alt: 'Nairobi Workshop',
    title: 'Nairobi Training Session',
    description: 'Specialized training workshop in Nairobi',
    year: 2024,
  },
  {
    src: '/Assets/WhatsApp Image 2024-12-17 at 20.17.29 (5).jpeg',
    alt: 'Research Meeting',
    title: 'Research Planning',
    description: 'Strategic research planning session with team members',
    year: 2024,
  },
  {
    src: '/Assets/WhatsApp Image 2024-12-17 at 20.17.29 (4).jpeg',
    alt: 'Team Collaboration',
    title: 'Team Building',
    description: 'Collaborative session fostering team spirit',
    year: 2024,
  },
 
  {
    src: '/Assets/lagos_group_picture.jpeg',
    alt: 'ABDN Workshop Group',
    title: 'Kenya Workshop',
    description: 'Group photo of participants at the ABDN Workshop in Lagos',
    year: 2024,
  },
  {
    src: '/Assets/project_report.jpeg',
    alt: 'Project Presentation',
    title: 'Research Symposium',
    description: 'Researchers presenting their project findings',
    year: 2024,
  },
  {
    src: '/Assets/participant4.jpeg',
    alt: 'Laboratory Session',
    title: 'Advanced Training',
    description: 'Hands-on training session with researchers',
    year: 2024,
  },
  {
    src: '/Assets/participant5.jpeg',
    alt: 'Workshop Session',
    title: 'Collaborative Workshop',
    description: 'Interactive workshop session with participants',
    year: 2024,
  },
  {
    src: '/Assets/participant6.jpeg',
    alt: 'Group Discussion',
    title: 'Team Discussion',
    description: 'Research team engaged in collaborative discussion',
    year: 2024,
  },
  {
    src: '/Assets/participant7.jpeg',
    alt: 'Research Presentation',
    title: 'Scientific Presentation',
    description: 'Sharing research findings with the community',
    year: 2024,
  },
  {
    src: '/Assets/participant8.jpeg',
    alt: 'Group Work',
    title: 'Group Activity',
    description: 'Participants working together on research projects',
    year: 2024,
  }
];

export default function AcademyGalleryImages() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<'2023' | '2024'>('2024');

  const years = ['2023', '2024'] as const;
  const filteredImages = galleryImages.filter(image => image.year === Number(selectedYear));

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
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Gallery</h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto mb-8">
            Capturing moments of discovery, collaboration, and growth in our journey.
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            {years.map((year) => (
              <motion.button
                key={year}
                onClick={() => setSelectedYear(year as '2023' | '2024')}
                className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ${
                  selectedYear === year
                    ? 'bg-amber-500 text-white shadow-lg scale-105'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
                whileHover={{ scale: selectedYear === year ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {year}
              </motion.button>
            ))}
        </div>

          {/* Year Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-amber-900 mb-6">ABDN {selectedYear}</h3>
              <div className="prose prose-amber max-w-none">
                {yearDescriptions[selectedYear].split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="text-amber-700 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
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
              <div className="aspect-w-16 aspect-h-9">
              <img
                src={image.src}
                alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <motion.div 
                  className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                  animate={hoveredIndex === index ? { y: 0 } : { y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                  <p className="text-amber-200 text-sm mb-4">{image.description}</p>
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => setSelectedImage(index)}
                    className="flex items-center text-amber-200 text-sm font-medium group/btn"
                  >
                    View Full Image
                    <ZoomIn className="ml-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                  </motion.button>
                </motion.div>
            </div>
            </motion.div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-amber-700 text-lg">No images available for {selectedYear}.</p>
          </motion.div>
        )}

        {/* Modal for full-size image view */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-7xl max-h-[90vh] overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-amber-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

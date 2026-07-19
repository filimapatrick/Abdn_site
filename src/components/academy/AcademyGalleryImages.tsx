// src/components/Gallery.js

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn } from 'lucide-react';

const yearDescriptions = {
  '2023': `The year 2023 marked a significant milestone for the African Brain Data Network (ABDN) as we successfully launched our inaugural ABDS Academy. This pioneering initiative brought together 30 talented African scientists from diverse backgrounds, creating a vibrant community of neuroscience researchers.

The academy focused on building essential skills in neuroimaging, data science, and computational neuroscience, with a strong emphasis on FAIR (Findable, Accessible, Interoperable, and Reusable) data principles. Through hands-on workshops, expert-led sessions, and collaborative projects, participants gained practical experience in handling complex brain data and applying cutting-edge analytical techniques.

A highlight of 2023 was the establishment of our first cohort of African neuroscience researchers who are now equipped to lead brain data initiatives across the continent. The success of this program has laid a strong foundation for future capacity-building efforts in African neuroscience.`,
  '2024': `Building on the success of 2023, the ABDS Academy in 2024 expanded its reach and impact, welcoming an even larger cohort of 45 African scientists. This year's program introduced advanced topics in neuroimaging modalities, structural neuroscience, and social neuroscience, reflecting the growing sophistication of our curriculum.

The 2024 academy placed particular emphasis on practical applications of neuroimaging datasets and the integration of digital tools into teaching and research. Participants engaged in hands-on projects that addressed real-world challenges in African neuroscience research, fostering innovation and collaboration.

A significant achievement of 2024 was the establishment of stronger connections between African researchers and international neuroscience communities, creating new opportunities for collaboration and knowledge exchange. The program also saw the development of region-specific neuroimaging protocols tailored to African contexts, marking an important step towards more inclusive and representative brain research.`,
  '2025': `The 2025 ABDS Academy marked another successful chapter in our dedication to advancing neuroscience in Africa. We welcomed a vibrant new cohort of researchers, further expanding our curriculum with cutting-edge topics and collaborative opportunities.

This year's program deepened our focus on interdisciplinary research and the application of AI in neuroscience, successfully preparing our participants for the future of brain data science. The academy fostered a dynamic environment for learning and innovation.`
};

const galleryImages = [
  // 2023 Images
  {
    id: 1,
    src: "/assets/Academy_2023/lecture_with_pestilli_in_lagos.jpg",
    alt: "Lecture session with Pestilli in Lagos",
    title: "Lecture with Pestilli in Lagos",
    description: "Insightful lecture on brain imaging research",
    year: 2023
  },
  {
    id: 2,
    src: "/assets/Academy_2023/mattew_exposing_participants_to_INCF.jpg",
    alt: "Mattew introducing participants to INCF",
    title: "Introducing INCF with Mattew",
    description: "Introduction to INCF neuroscience frameworks",
    year: 2023
  },
  {
    id: 3,
    src: "/assets/Academy_2023/mri_with_pestilli.jpg",
    alt: "Pestilli demonstrating MRI imaging techniques",
    title: "MRI Imaging with Pestilli",
    description: "Live MRI demonstration session with Pestilli",
    year: 2023
  },
  {
    id: 4,
    src: "/assets/Academy_2023/participant_at_Nigeria_researve.jpg",
    alt: "Participant at Nigeria Reserve center",
    title: "Interactive Session at Nigeria Reserve Center",
    description: "Fun and learning at Nigeria reserve",
    year: 2023
  },
  {
    id: 5,
    src: "/assets/Academy_2023/participants_at_panel_discussion.jpg",
    alt: "Panel discussion with session participants",
    title: "Panel Discussion Insights",
    description: "Engaging panel on brain data science",
    year: 2023
  },
  {
    id: 6,
    src: "/assets/Academy_2023/participants_at_the_art_gallery.jpg",
    alt: "Participants visiting an art gallery",
    title: "Exploring Art and Science",
    description: "Gallery visit blending art and science",
    year: 2023
  },
  {
    id: 7,
    src: "/assets/Academy_2023/participants_at_the_beach.jpg",
    alt: "Participants enjoying time at the beach",
    title: "Beachside Networking",
    description: "Networking session by the ocean breeze",
    year: 2023
  },
  {
    id: 8,
    src: "/assets/Academy_2023/participants_learning.jpg",
    alt: "Participants actively engaged in learning",
    title: "Active Learning Session",
    description: "Hands-on training in neuroscience methods",
    year: 2023
  },
  {
    id: 9,
    src: "/assets/Academy_2023/participants_still_at_the_beach.jpg",
    alt: "Participants still enjoying the beach",
    title: "Extended Beach Time",
    description: "Continued fun time by the beach",
    year: 2023
  },
  {
    id: 10,
    src: "/assets/Academy_2023/participants_spare_time.jpg",
    alt: "Participants enjoying their spare time",
    title: "Relaxation and Interaction",
    description: "Participants bonding during spare moments",
    year: 2023
  },
  {
    id: 11,
    src: "/assets/Academy_2023/thank_speach_to_Kavli_foundation.jpg",
    alt: "Thank you speech to the Kavli Foundation",
    title: "Gratitude to Kavli Foundation",
    description: "Appreciation speech to Kavli Foundation team",
    year: 2023
  },

  // 2024 Images
  {
    id: 12,
    src: '/assets/cross_section.jpeg',
    alt: 'Cross Section Training',
    title: 'Cross Section Analysis',
    description: 'Training session on cross-sectional imaging analysis',
    year: 2024,
  },
  {
    id: 13,
    src: '/assets/franco_structural.jpeg',
    alt: 'Structural Analysis',
    title: 'Introduction to MRI Physics',
    description: 'Advanced workshop on MRI physics techniques',
    year: 2024,
  },
  {
    id: 14,
    src: '/assets/Damian_nairobi.jpeg',
    alt: 'NeuroEthics Training',
    title: 'Ethics and Data Governance Training Session',
    description: 'Comprehensive training on neuroethics and data governance by Damian Eke',
    year: 2024,
  },
  {
    id: 15,
    src: '/assets/WhatsApp Image 2024-12-17 at 20.17.29 (5).jpeg',
    alt: 'Group presentation',
    title: 'Research Presentation',
    description: 'Showcasing innovative research findings from the team',
    year: 2024,
  },
  {
    id: 16,
    src: '/assets/WhatsApp Image 2024-12-17 at 20.17.29 (4).jpeg',
    alt: 'Team Collaboration',
    title: 'Capacity Building among Participants',
    description: 'Team presentation session during the workshop',
    year: 2024,
  },
  {
    id: 17,
    src: '/assets/project_report.jpeg',
    alt: 'Project Presentation',
    title: 'Research Symposium',
    description: 'Participants presenting their project findings',
    year: 2024,
  },
  {
    id: 18,
    src: '/assets/WhatsApp Image 2024-12-17 at 20.17.29 (2).jpeg',
    alt: 'ABDN Workshop Group',
    title: 'Kenya Workshop',
    description: 'Introduction to python for neuroimaging analysis by Anita Esun',
    year: 2024,
  },
  {
    id: 19,
    src: '/assets/participant4.jpeg',
    alt: 'Laboratory Session',
    title: 'Participants’ Group Photo',
    description: 'A vibrant gathering of participants reflecting engagement, collaboration, and shared enthusiasm for learning',
    year: 2024,
  },
  {
    id: 20,
    src: '/assets/participant5.jpeg',
    alt: 'Workshop Session',
    title: 'Group Photo at Workshop',
    description: 'A vibrant gathering of participants reflecting engagement, collaboration, and shared enthusiasm for learning',
    year: 2024,
  },
  {
    id: 21,
    src: '/assets/participant6.jpeg',
    alt: 'Group Discussion',
    title: 'Team Discussion',
    description: 'Research team engaged in collaborative discussion',
    year: 2024,
  },
  {
    id: 22,
    src: '/assets/participant7.jpeg',
    alt: 'Research Presentation',
    title: 'Faculty Support & Guidance',
    description: 'Instructors providing hands-on assistance and expert guidance to participants',
    year: 2024,
  },
  {
    id: 23,
    src: '/assets/participant8.jpeg',
    alt: 'Group Work',
    title: 'Fmri lecture session',
    description: 'Participants engaging attentively throughout the session',
    year: 2024,
  },
  {
    id: 24,
    src: '/assets/Academy_2025/python_neuroimageing.JPG',
    alt: 'Introduction to python for neuroimaging analysis',
    title: 'Introduction to python for neuroimaging analysis',
    description: 'Introduction to python for neuroimaging analysis',
    year: 2025,
  },
  {
    id: 25,
    src: '/assets/Academy_2025/Anita_landscape.JPG',
    alt: 'A landscape photo of Anita',
    title: 'Cross section of students',
    description: 'Cross section of students',
    year: 2025,
  },
  {
    id: 26,
    src: '/assets/Academy_2025/fnir.jpg',
    alt: 'A section on Fnir',
    title: 'Introduction to Fnirs',
    description: 'An introduction to neuroimaging data  collection using research grade equipment(Mendi)',
    year: 2025,
  },
  {
    id: 27,
    src: '/assets/Academy_2025/franco_delogu2025.JPG',
    alt: 'A section on Fnir',
    title: 'Introduction to Fnirs',
    description: 'An introduction to neuroimaging data  collection using research grade equipment(Mendi)',
    year: 2025,
  },
  {
    id: 28,
    src: '/assets/Academy_2025/group_photo_2025.jpg',
    alt: 'Group photo of participants and Faculty at ABDSA',
    title: 'Group photo of participants and Faculty at ABDSA',
    description: 'Group photo of participants and Faculty at ABDSA',
    year: 2025,
  },
  {
    id: 29,
    src: '/assets/Academy_2025/kafi_landscape.HEIC',
    alt: 'Group photo of participants and Faculty at ABDSA',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 30,
    src: '/assets/Academy_2025/mustapha_fnir.jpg',
    alt: 'Mustapha fnir',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 31,
    src: '/assets/Academy_2025/pepita_fnir.jpg',
    alt: 'Mustapha fnir',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 32,
    src: '/assets/Academy_2025/silke_lecture.png',
    alt: 'Silke presentation',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 33,
    src: '/assets/Academy_2025/Silke_lecture1.png',
    alt: 'Silke presentation',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 34,
    src: '/assets/Academy_2025/mustapha_fnirs.jpg',
    alt: 'Mustapha fnirs',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 35,
    src: '/assets/Academy_2025/conservative_center.JPG',
    alt: 'Conservative center',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 36,
    src: '/assets/Academy_2025/suleiman_presentation.png',
    alt: 'Suleiman presentation',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 37,
    src: '/assets/Academy_2025/fnir_presentation.png',
    alt: 'Fnir presentation',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 38,
    src: '/assets/Academy_2025/pepita_snapshot.png',
    alt: 'Pepita snapshot',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 39,
    src: '/assets/Academy_2025/fnir_group_presentation.png',
    alt: 'Fnir group presentation',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 40,
    src: '/assets/Academy_2025/group_presentation2.png',
    alt: 'Group presentation',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 41,
    src: '/assets/Academy_2025/group3.png',
    alt: 'Group presentation',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 42,
    src: '/assets/Academy_2025/Chinyem_question.png',
    alt: 'Chinyem question',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 43,
    src: '/assets/Academy_2025/group_photo.png',
    alt: 'Group photo',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 44,
    src: '/assets/Academy_2025/moses_lecture.png',
    alt: 'Moses lecture',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 45,
    src: '/assets/Academy_2025/mendy_mustapha.jpg',
    alt: 'Mustapha lecture',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 46,
    src: '/assets/Academy_2025/mendy.jpg',
    alt: 'Mustapha lecture',
    title: '',
    description: '',
    year: 2025,
  },
    {
    id: 47,
    src: '/assets/Academy_2025/Azeez.png',
    alt: 'Azeezat',
    title: '',
    description: '',
    year: 2025,
  },
     {
    id: 48,
    src: '/assets/Academy_2025/Ebere_lecture.png',
    alt: 'Ebere lecture',
    title: '',
    description: '',
    year: 2025,
  },
     {
    id: 49,
    src: '/assets/Academy_2025/Damian_speech.png',
    alt: 'Damian lecture',
    title: '',
    description: '',
    year: 2025,
  },
  
     {
    id: 50,
    src: '/assets/Academy_2025/Ebere.png',
    alt: 'Group photo',
    title: '',
    description: '',
    year: 2025,
  },
      {
    id: 51,
    src: '/assets/Academy_2025/group_project2.jpg',
    alt: 'Group photo',
    title: '',
    description: '',
    year: 2025,
  },
  {
    id: 52,
    src: '/assets/Academy_2025/group4.png',
    alt: 'Group photo',
    title: '',
    description: '',
    year: 2025,
  },
    {
    id: 53,
    src: '/assets/Academy_2025/eko.jpg',
    alt: 'Group photo',
    title: '',
    description: '',
    year: 2025,
  },
      {
    id: 54,
    src: '/assets/Academy_2025/group3.JPG',
    alt: 'Group photo',
    title: '',
    description: '',
    year: 2025,
  },
  
     {
    id: 56,
    src: '/assets/Academy_2025/market.jpg',
    alt: 'Group photo',
    title: '',
    description: '',
    year: 2025,
  },
     {
    id: 57,
    src: '/assets/Academy_2025/group_project1.png',
    alt: 'Group photo',
    title: '',
    description: '',
    year: 2025,
  },
];

export default function AcademyGalleryImages() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<'2023' | '2024' | '2025'>('2024');

  const years = ['2023', '2024', '2025'] as const;
  const filteredImages = galleryImages.filter(image => image.year === Number(selectedYear));

  // Show a subset of cards initially and allow expanding
  const DEFAULT_VISIBLE = 6;
  const [visibleCount, setVisibleCount] = useState<number>(DEFAULT_VISIBLE);

  // Reset view when the year changes
  useEffect(() => {
    setVisibleCount(DEFAULT_VISIBLE);
    setSelectedImage(null);
    setHoveredIndex(null);
  }, [selectedYear]);

  const displayedImages = filteredImages.slice(0, visibleCount);

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
                onClick={() => setSelectedYear(year as '2023' | '2024' | '2025')}
                className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ${selectedYear === year
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
              <h3 className="text-2xl font-bold text-amber-900 mb-6">ABDSA {selectedYear}</h3>
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
          {displayedImages.map((image, index) => (
            <motion.div
              key={image.id}
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

        {/* View More / Show Less */}
        {filteredImages.length > 0 && (
          <div className="flex justify-center mt-10">
            {visibleCount < filteredImages.length ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setVisibleCount(prev => Math.min(prev + DEFAULT_VISIBLE, filteredImages.length))}
                className="px-6 py-3 rounded-full bg-amber-500 text-white font-medium shadow-md hover:bg-amber-600 transition-colors"
              >
                View More
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setVisibleCount(DEFAULT_VISIBLE)}
                className="px-6 py-3 rounded-full bg-amber-100 text-amber-800 font-medium shadow-md hover:bg-amber-200 transition-colors"
              >
                Show Less
              </motion.button>
            )}
          </div>
        )}

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
                src={displayedImages[selectedImage].src}
                alt={displayedImages[selectedImage].alt}
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

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';



// Combined data for faculty and teaching assistants
const combinedData = [
  // Faculty
  {
    id: 1,
    src: '/assets/Faculty/pestili.jpg',
    alt: 'Franco Pestilli PhD',
    name: 'Franco Pestilli PhD',
    role: 'Faculty',
    Affiliation: 'University of Texas at Austin, USA',
    profile: 'https://liberalarts.utexas.edu/psychology/faculty/fp4834/',
    year: 2023,
  },
  {
    id: 2,
    src: '/assets/Faculty/silke.jpg',
    alt: 'Silke Anders PhD',
    name: 'Silke Anders PhD',
    role: 'Faculty',
    Affiliation: 'University of Luberk, Germany',
    profile: 'https://www.neuro.uni-luebeck.de/mitarbeiter/anders-silke.html',
    year: 2023,
  },
  {
    id: 3,
    src: '/assets/Faculty/Melanie.jpg',
    alt: 'Melanie Ganz-Benjaminsen',
    name: 'Melanie Ganz-Benjaminsen',
    role: 'Faculty',
    Affiliation: 'University of Copenhagen, Denmark',
    profile: 'https://nru.dk/index.php/staff-list/post-docs/62-melanie-ganz-benjaminsen',
    year: 2023,
  },
  {
    id: 4,
    src: '/assets/Faculty/Ariel.jpg',
    alt: 'Ariel Rokem PhD',
    name: 'Ariel Rokem PhD',
    role: 'Faculty',
    Affiliation: 'University of Washington, Washington, USA.',
    profile: 'https://psych.uw.edu/people/8823/ariel-rokem',
    year: 2023,
  },
  {
    id: 5,
    src: '/assets/Faculty/lyuba.jpeg',
    alt: 'Lyuba Zehl PhD',
    name: 'Lyuba Zehl PhD',
    role: 'Faculty',
    Affiliation: 'Institute For Neuroscience & Medicine (INM-1) of the Julich Research Centre Germany',
    profile: 'https://www.fz-juelich.de/profile/zehl_l',
    year: 2023,
  },
  {
    id: 6,
    src: '/assets/Faculty/Matthew.jpg',
    alt: 'Matthew Abrams PhD',
    name: 'Matthew Abrams PhD',
    role: 'Faculty',
    Affiliation: 'International Neuroinformatics Coordinating Facility, Stockholm, Sweden',
    profile: 'https://www.incf.org/team/mathew-birdsall-abrams',
    year: 2023,
  },
  {
    id: 7,
    src: '/assets/Faculty/miller.jpg',
    alt: 'Karla L.Miller',
    name: 'Karla L.Miller',
    role: 'Faculty',
    Affiliation: 'University Of Oxford,USA',
    profile: 'https://www.ndcn.ox.ac.uk/team/karla-miller',
    year: 2023,
  },
  {
    id: 8,
    src: '/assets/Faculty/ben_ditcher.jpeg',
    alt: 'Ben Ditcher ',
    name: 'Ben Ditcher',
    role: 'Faculty',
    Affiliation: 'University Of Oxford,USA',
    profile: 'https://bendichter.com/',
    year: 2023,
  },
  {
    id: 9,
    src: '/assets/Faculty/petra.jpg',
    alt: 'Petra Ritter',
    name: 'Petra Ritter',
    role: 'Faculty',
    Affiliation: 'Charité Universitätsmedizin Berlin',
    profile: 'https://www.bdi.ox.ac.uk/Team/petra-ritter',
    year: 2023,
  },
  {
    id: 10,
    src: '/assets/Faculty/nicholas.webp',
    alt: 'Thomas Nicholas ',
    name: 'Thomas Nicholas',
    role: 'Faculty',
    Affiliation: 'University Of Oxford,UK',
    profile: 'https://www.bdi.ox.ac.uk/Team/t-e-nichols',
    year: 2023,
  },
  {
    id: 11,
    src: '/assets/Faculty/franco_delogu.jpg',
    alt: 'Prof. Franco Delogu PhD',
    name: 'Prof. Franco Delogu PhD',
    role: 'Faculty',
    Affiliation: 'Lawrence Technological University',
    profile: 'https://www.researchgate.net/profile/Franco-Delogu',
    year: 2023,
  },
  {
    id: 12,
    src: '/assets/Faculty/Russ.jpg',
    alt: 'Russ Poldrack PhD',
    name: 'Russ Poldrack PhD',
    role: 'Faculty',
    Affiliation: 'Julich Research Center, Julich, Germany',
    profile: 'https://profiles.stanford.edu/russell-poldrack',
    year: 2023,
  },
  {
    id: 13,
    src: '/assets/Faculty/Moses.jpg',
    alt: 'Moses Sokunbi PhD',
    name: 'Moses Sokunbi PhD',
    role: 'Faculty',
    Affiliation: 'De Montfort University, Leicester, UK',
    profile: 'https://www.researchgate.net/profile/Moses-Sokunbi',
    year: 2023,
  },

  // 2024 faculty
  {
    id: 14,
    src: '/assets/Faculty/pestili.jpg',
    alt: 'Franco Pestilli	PhD',
    name: 'Franco Pestilli	PhD',
    role: 'Faculty',
    Affiliation: 'University of Texas at Austin, USA',
    profile: 'https://liberalarts.utexas.edu/psychology/faculty/fp4834/',
    year: 2024,
  },
  {
    id: 15,
    src: '/assets/Faculty/silke.jpg',
    alt: 'Silke Anders PhD',
    name: 'Silke Anders PhD',
    role: 'Faculty',
    Affiliation: 'University of Luberk, Germany',
    profile: 'https://www.neuro.uni-luebeck.de/mitarbeiter/anders-silke.html',
    year: 2024,
  },
  {
    id: 16,
    src: '/assets/Faculty/Ariel.jpg',
    alt: 'Ariel Rokem PhD',
    name: 'Ariel Rokem PhD',
    role: 'Faculty',
    Affiliation: 'University of Washington, Washington, USA.',
    profile: 'https://psych.uw.edu/people/8823/ariel-rokem',
    year: 2024,
  },
  {
    id: 17,
    src: '/assets/Faculty/Matthew.jpg',
    alt: 'Matthew Abrams PhD',
    name: 'Matthew Abrams PhD',
    role: 'Faculty',
    Affiliation: 'International Neuroinformatics Coordinating Facility, Stockholm, Sweden',
    profile: 'https://www.incf.org/team/mathew-birdsall-abrams',
    year: 2024,
  },
  {
    id: 18,
    src: '/assets/Faculty/franco_delogu.jpg',
    alt: 'Prof. Franco Delogu PhD',
    name: 'Prof. Franco Delogu PhD',
    role: 'Faculty',
    Affiliation: 'Lawrence Technological University, USA',
    profile: 'https://www.researchgate.net/profile/Franco-Delogu',
    year: 2024,
  },
  {
    id: 19,
    src: '/assets/Faculty/susane.avif',
    alt: 'Susanne Ressl',
    name: 'Susanne Ressl',
    role: 'Faculty',
    Affiliation: 'University of Texas at Austin, USA',
    profile: 'https://neuroscience.utexas.edu/directory/susanne-ressl',
    year: 2024,
  },
  {
    id: 20,
    src: '/assets/Faculty/Moses.jpg',
    alt: 'Moses Sokunbi PhD',
    name: 'Moses Sokunbi PhD',
    role: 'Faculty',
    Affiliation: 'De Montfort University, Leicester, UK',
    profile: 'https://www.researchgate.net/profile/Moses-Sokunbi',
    year: 2024,
  },

  // Teaching Assistants 2023
  {
    id: 21,
    src: 'assets/Faculty/dheerajbhatia.jpeg',
    alt: 'Dheeraj Bhatia',
    name: 'Dheeraj Bhatia',
    role: 'Teaching Assistant',
    university: 'University of Texas, Austin, USA.',
    profile: 'https://liberalarts.utexas.edu/cps/gradstudents/bac4447',
    year: 2023,
  },
  {
    id: 22,
    src: 'assets/Faculty/Azeezat.jpg',
    alt: 'Azeezat Azeez PhD',
    name: 'Azeezat Azeez PhD',
    role: 'Teaching Assistant',
    university: 'Stanford University, California, USA.',
    profile: 'https://profiles.stanford.edu/azeezat-azeez',
    year: 2023,
  },
  {
    id: 23,
    src: 'assets/Faculty/Anibal.png',
    alt: 'Annibal Heinsfeld PhD',
    name: 'Annibal Heinsfeld PhD',
    role: 'Teaching Assistant',
    university: 'University of Texas, Austin, USA.',
    profile: 'https://liberalarts.utexas.edu/cps/gradstudents/ash3454',
    year: 2023,
  },

  // Teaching Assistants 2024
  {
    id: 24,
    src: 'assets/Faculty/stephen.jpg',
    alt: 'Stephen',
    name: 'Stephen',
    role: 'Teaching Assistant',
    university: 'University of Texas, Austin, USA.',
    profile: 'https://liberalarts.utexas.edu/cps/gradstudents/bac4447',
    year: 2024,
  },
  {
    id: 25,
    src: 'assets/Faculty/sunaguo.jpg',
    alt: 'Suna Guo',
    name: 'Suna Guo',
    role: 'Teaching Assistant',
    university: 'University of Texas, Austin, USA.',
    profile: 'https://liberalarts.utexas.edu/cps/events/suna-guo-neuroscience-brown-bag-talk',
    year: 2024,
  },
  {
    id: 26,
    src: 'assets/filima.jpeg',
    alt: 'Filima patrick',
    name: 'Filima patrick',
    role: 'Teaching Assistant',
    university: 'University of Port-Harcourt, Nigeria.',
    profile: 'https://www.filimapatrick.com',
    year: 2024,
  },
  {
    id: 27,
    src: 'assets/barisua.jpeg',
    alt: 'Barisua Nsaanee',
    name: 'Barisua Nsaanee',
    role: 'Teaching Assistant',
    university: 'University of Port-Harcourt, Nigeria.',
    profile: 'https://liberalarts.utexas.edu/cps/gradstudents/bac4447',
    year: 2024,
  },
  {
    id: 28,
    src: 'assets/Faculty/Azeezat.jpg',
    alt: 'Azeezat Azeez PhD',
    name: 'Azeezat Azeez PhD',
    role: 'Teaching Assistant',
    university: 'Stanford University, California, USA.',
    profile: 'https://profiles.stanford.edu/azeezat-azeez',
    year: 2024,
  },
  {
    id: 29,
    src: 'assets/Faculty/Anibal.png',
    alt: 'Annibal Heinsfeld PhD',
    name: 'Annibal Heinsfeld PhD',
    role: 'Teaching Assistant',
    university: 'University of Texas, Austin, USA.',
    profile: 'https://liberalarts.utexas.edu/cps/gradstudents/ash3454',
    year: 2024,
  },

  {
    id: 30,
    src: '/assets/Faculty/Horia.jpeg',
    alt: 'Horia Maior',
    name: 'Horia Maior',
    role: 'Faculty',
    university: 'University of Nottingham, UK.',
    profile: 'https://www.nottingham.ac.uk/computerscience/people/horia.maior',
    year: 2024,
  },
  {
    id: 31,
    src: '/assets/Faculty/James_kent.jpeg',
    alt: 'James Kent',
    name: 'James Kent',
    role: 'Faculty',
    university: 'University of Texas, Austin, USA.',
    profile: 'https://liberalarts.utexas.edu/psychology/researchers/jdk3232',
    year: 2024,
  },
  {
    id: 32,
    src: '/assets/Faculty/denisschluppeck.jpg',
    alt: 'Denis Schluppeck',
    name: 'Denis Schluppeck',
    role: 'Faculty',
    university: 'University of Nottingham, UK.',
    profile: 'https://www.nottingham.ac.uk/psychology/people/denis.schluppeck',
    year: 2024,
  },
  {
    id: 33,
    src: '/assets/Faculty/franco_delogu.jpg',
    alt: 'Prof. Franco Delogu PhD',
    name: 'Prof. Franco Delogu PhD',
    role: 'Faculty',
    Affiliation: 'Lawrence Technological University',
    profile: 'https://www.researchgate.net/profile/Franco-Delogu',
    year: 2025,
  },
  {
    id: 34,
    src: '/assets/Faculty/Moses3.jpeg',
    alt: 'Moses Sokunbi PhD',
    name: 'Moses Sokunbi PhD',
    role: 'Faculty',
    Affiliation: 'De Montfort University, Leicester, UK',
    profile: 'https://www.researchgate.net/profile/Moses-Sokunbi',
    year: 2025,
  },
  {
    id: 35,
    src: '/assets/Faculty/Azeezat.jpg',
    alt: 'Azeezat Azeez PhD',
    name: 'Azeezat Azeez PhD',
    role: 'Faculty',
    Affiliation: 'Stanford University, California, USA.',
    profile: 'https://profiles.stanford.edu/azeezat-azeez',
    year: 2025,
  },
  {
    id: 36,
    src: '/assets/Faculty/Horia.jpeg',
    alt: 'Horia Maior',
    name: 'Horia Maior',
    role: 'Faculty',
    Affiliation: 'University of Nottingham, UK.',
    profile: 'https://www.nottingham.ac.uk/computerscience/people/horia.maior',
    year: 2025,
  },
  {
    id: 37,
    src: '/assets/Academy_2025/pepita_faculty_pics.png',
    alt: 'Pepita Bernard',
    name: 'Pepita Bernard',
    role: 'Faculty',
    Affiliation: 'University of Nottingham, UK',
    profile: '',
    year: 2025,
  },
  {
    id: 38,
    src: '/assets/Faculty/silke.jpg',
    alt: 'Silke Anders PhD',
    name: 'Silke Anders PhD',
    role: 'Faculty',
    Affiliation: 'University of Luberk, Germany',
    profile: 'https://www.neuro.uni-luebeck.de/mitarbeiter/anders-silke.html',
    year: 2025,
  },

  {
    id: 39,
    src: '/assets/Faculty/Mustapha.png',
    alt: 'Mustafa S. Hamada',
    name: 'Mustafa S. Hamada',
    role: 'Faculty',
    Affiliation: 'University of Nottingham, UK',
    profile: 'https://www.linkedin.com/in/mustafashamada/',
    year: 2025,
  },
  {
    id: 40,
    src: '/assets/Faculty/Ore.jpeg',
    alt: 'Ore Ogundipe',
    name: 'Ore Ogundipe',
    role: 'Teaching Assistant',
    Affiliation: 'NEUROFUSION',
    profile: '',
    year: 2025,
  },
  {
    id: 41,
    src: '/assets/Faculty/Gilgal.jpeg',
    alt: 'Gilgal J. A.',
    name: 'Gilgal J. A.',
    role: 'Teaching Assistant',
    Affiliation: 'University of Pittsburgh',
    profile: 'https://www.linkedin.com/in/gilgaljusticeansah/',
    year: 2025,
  },
];

export default function FacultyGallery() {
  const [visibleMembers, setVisibleMembers] = useState(6);
  const [showLessEnabled, setShowLessEnabled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  const years = [2023, 2024, 2025];

  const filteredMembers = combinedData.filter(member => member.year === selectedYear);

  const handleLoadMore = () => {
    setVisibleMembers((prev) => prev + 6);
    setShowLessEnabled(true);
  };

  const handleShowLess = () => {
    setVisibleMembers(6);
    setShowLessEnabled(false);
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
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Our Faculty/Teaching Assistants</h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto mb-8">
            Meet the brilliant minds shaping the future of neuroscience and education.
          </p>

          {/* Year Filter */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {years.map((year) => (
              <motion.button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 flex items-center gap-2 ${selectedYear === year
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
          {filteredMembers.slice(0, visibleMembers).map((member, index) => (
            <motion.div
              key={member.id}
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
                  src={member.src}
                  alt={member.alt}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <motion.div
                  className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                  animate={hoveredIndex === index ? { y: 0 } : { y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-amber-100 text-sm mb-1">{member.role}</p>
                  <p className="text-amber-100 text-sm mb-4">{member.Affiliation || member.university}</p>
                  <div className="flex justify-between items-center">
                    <motion.a
                      href={member.profile}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className="flex items-center text-amber-200 text-sm font-medium group/btn"
                    >
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </motion.a>
                    <span className="text-amber-200 text-sm">{member.year}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-amber-700 text-lg">
              No members found for {selectedYear}.
            </p>
          </motion.div>
        )}

        <div className="text-center mt-12 space-x-4">
          {visibleMembers < filteredMembers.length && (
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
          {showLessEnabled && filteredMembers.length > 6 && (
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

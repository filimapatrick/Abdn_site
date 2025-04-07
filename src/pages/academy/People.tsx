import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Star, ArrowRight, Mail, Linkedin, Twitter, Link as LinkIcon, X } from 'lucide-react';
import Layout from '../../components/Layout';

interface PersonDetails {
  affiliations?: string[];
  interests?: string[];
  website?: string;
}

interface Person {
  name: string;
  title?: string;
  country?: string;
  institution: string;
  image: string;
  bio: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  details?: PersonDetails;
}

const Modal = ({ isOpen, onClose, person }: { isOpen: boolean; onClose: () => void; person: Person }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <div className="h-48 relative">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent" />
              </div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-amber-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-amber-900 mb-2">{person.name}</h3>
              <p className="text-amber-600 mb-4">{person.title}</p>
              
              <div className="flex items-center text-amber-700 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{person.country}</span>
              </div>
              
              <div className="flex items-center text-amber-700 mb-4">
                <Building2 className="h-4 w-4 mr-1" />
                <span>{person.institution}</span>
              </div>

              <p className="text-amber-700 mb-6">{person.bio}</p>

              {person.details?.affiliations && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-amber-900 mb-3">Affiliations/Portfolio</h4>
                  <ul className="space-y-2">
                    {person.details.affiliations.map((affiliation, index) => (
                      <li key={index} className="flex items-start text-amber-700">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-amber-500" />
                        <span>{affiliation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {person.details?.interests && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-amber-900 mb-3">Research Interests</h4>
                  <ul className="space-y-2">
                    {person.details.interests.map((interest, index) => (
                      <li key={index} className="flex items-start text-amber-700">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-amber-500" />
                        <span>{interest}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex space-x-4 pt-4 border-t border-amber-100">
                {person.email && (
                  <a href={`mailto:${person.email}`} className="text-amber-600 hover:text-amber-800">
                    <Mail className="h-5 w-5" />
                  </a>
                )}
                {person.linkedin && (
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {person.twitter && (
                  <a href={`https://twitter.com/${person.twitter}`} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {person.website && (
                  <a href={person.website} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">
                    <LinkIcon className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const stakeholders: Person[] = [
  {
    name: "Prof. Amadi O. Ihunwo",
    title: "Stakeholder Advisory Board Member",
    country: "South Africa",
    institution: "University of the Witwatersrand",
    image: "/Assets/stakeholders/Amadi.png",
    bio: "Distinguished Professor of Anatomy and expert in developmental neuroscience",
    linkedin: "https://linkedin.com/in/amadi-ihunwo",
    twitter: "@ProfIhunwo",
    details: {
      affiliations: [
        "Professor of Anatomy, University of the Witwatersrand",
        "Member of the Society of Neuroscientists of Africa (SONA)",
        "Research Director, Neuroscience Institute"
      ],
      interests: [
        "Developmental Neuroscience",
        "Neural Stem Cells",
        "Brain Development",
        "Neuroanatomy"
      ]
    }
  },
  {
    name: "Prof. Bamidele Victor Owoyele",
    title: "Stakeholder Advisory Board Member",
    country: "Nigeria",
    institution: "University of Ilorin",
    image: "/Assets/stakeholders/Bamidele.png",
    bio: "Leading researcher in neuropharmacology and pain mechanisms",
    linkedin: "https://linkedin.com/in/bamidele-owoyele",
    twitter: "@ProfOwoyele",
    details: {
      affiliations: [
        "Professor of Physiology, University of Ilorin",
        "Director of Research, Institute of Neuroscience",
        "Member of the Nigerian Academy of Science"
      ],
      interests: [
        "Neuropharmacology",
        "Pain Mechanisms",
        "Neuroinflammation",
        "Drug Development"
      ]
    }
  }
];

const nationalCoordinators: Person[] = [
  {
    name: "Dr. Theresa Chikopela Sikazwe",
    title: "National Coordinator",
    country: "Zambia",
    institution: "Lusaka Apex Medical University",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    bio: "Assistant Dean of Basic Sciences at Lusaka Apex Medical University with expertise in vascular physiology and neuroscience",
    email: "theresachikopela@yahoo.com",
    linkedin: "https://linkedin.com/in/theresa-chikopela",
    twitter: "@DrTheresa",
    details: {
      affiliations: [
        "Assistant Dean – Basic Sciences, Faculty of Medicine, Lusaka Apex Medical University",
        "Treasurer for the Zambia Neuroscience Society (ZANS)",
        "In charge of Research in the Physiological Society of Zambia (PSZ)",
        "Member of the Society of Neuroscientists of Africa (SONA)",
        "Member of the Physiology Society of Southern Africa (PSSA)"
      ],
      interests: [
        "Vascular physiology",
        "Arterial stiffness",
        "Endothelial dysfunction",
        "Relationship between vascular physiology and cognitive function"
      ]
    }
  },
  // Add other coordinators here with the same structure
];

export default function People() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  return (
    <Layout>
      <main className="pt-20">
        {/* ... existing hero section ... */}

        {/* Stakeholders Section */}
        <section className="py-24 bg-gradient-to-br from-white to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Stakeholder Advisory Board</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Distinguished leaders guiding our vision and strategy
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stakeholders.map((stakeholder: Person, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64">
                    <img
                      src={stakeholder.image}
                      alt={stakeholder.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-amber-900 mb-2">{stakeholder.name}</h3>
                    <div className="flex items-center text-amber-700 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{stakeholder.country}</span>
                    </div>
                    <div className="flex items-center text-amber-700 mb-4">
                      <Building2 className="h-4 w-4 mr-1" />
                      <span>{stakeholder.institution}</span>
                    </div>
                    <p className="text-amber-700 mb-6">{stakeholder.bio}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        <a href={stakeholder.linkedin} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">
                          <Linkedin className="h-5 w-5" />
                        </a>
                        <a href={`https://twitter.com/${stakeholder.twitter}`} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">
                          <Twitter className="h-5 w-5" />
                        </a>
                      </div>
                      <button
                        onClick={() => setSelectedPerson(stakeholder)}
                        className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg font-semibold transition-colors flex items-center gap-2"
                      >
                        More Info
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* National Coordinators Section */}
        <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">National Coordinators</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Our network of coordinators leading neuroscience initiatives across African nations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nationalCoordinators.map((coordinator: Person, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64">
                    <img
                      src={coordinator.image}
                      alt={coordinator.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-amber-900 mb-2">{coordinator.name}</h3>
                    <div className="flex items-center text-amber-700 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{coordinator.country}</span>
                    </div>
                    <div className="flex items-center text-amber-700 mb-4">
                      <Building2 className="h-4 w-4 mr-1" />
                      <span>{coordinator.institution}</span>
                    </div>
                    <p className="text-amber-700 mb-6">{coordinator.bio}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        <a href={`mailto:${coordinator.email}`} className="text-amber-600 hover:text-amber-800">
                          <Mail className="h-5 w-5" />
                        </a>
                        <a href={coordinator.linkedin} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">
                          <Linkedin className="h-5 w-5" />
                        </a>
                        <a href={`https://twitter.com/${coordinator.twitter}`} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">
                          <Twitter className="h-5 w-5" />
                        </a>
                      </div>
                      <button
                        onClick={() => setSelectedPerson(coordinator)}
                        className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg font-semibold transition-colors flex items-center gap-2"
                      >
                        More Info
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Modal
          isOpen={!!selectedPerson}
          onClose={() => setSelectedPerson(null)}
          person={selectedPerson!}
        />
      </main>
    </Layout>
  );
} 
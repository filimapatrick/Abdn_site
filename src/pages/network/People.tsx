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
  achievements?: string[];
}

const nationalCoordinators: Person[] = [
  {
    name: "Dr. Gams Massi Daniel",
    title: "National Coordinator",
    country: "Cameroon",
    institution: "University of Nairobi",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    bio: "Leading neuroscience research initiatives in East Africa with a focus on neurodegeneration",
    email: "sarah.mwangi@uon.ac.ke",
    linkedin: "https://linkedin.com/in/sarahmwangi",
    twitter: "@DrMwangi",
    details: {
      interests: [
        "Neurodegeneration",
        "Brain Development",
        "Cognitive Neuroscience"
      ],
      affiliations: [
        "African Neuroscience Society",
        "International Brain Research Organization",
        "Society for Neuroscience"
      ]
    }
  },
  {
    name: "Ronald Kamoga",
    title: "National Coordinator",
    country: "Uganda",
    institution: "University of Lagos",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    bio: "Pioneering computational neuroscience research in West Africa",
    email: "m.ahmed@unilag.edu.ng",
    linkedin: "https://linkedin.com/in/mohammedahmed",
    twitter: "@ProfMAhmed",
    details: {
      interests: [
        "Computational Neuroscience",
        "Neural Networks",
        "Brain-Computer Interfaces"
      ],
      affiliations: [
        "West African Neuroscience Association",
        "IEEE Brain Initiative",
        "African Academy of Sciences"
      ]
    }
  },
  {
    name: "Eberechi Wogu PhD",
    title: "National Coordinator",
    country: "Nigeria",
    institution: "University of Ghana",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
    bio: "Specializing in neuroimaging and brain development studies",
    email: "g.okonjo@ug.edu.gh",
    linkedin: "https://linkedin.com/in/graceokonjo",
    twitter: "@DrOkonjo",
    details: {
      interests: [
        "Neuroimaging",
        "Brain Development",
        "Pediatric Neuroscience"
      ],
      affiliations: [
        "Ghana Neuroscience Society",
        "Organization for Women in Science for the Developing World",
        "African Women in Neuroscience Network"
      ]
    }
  }
];

const stakeholders: Person[] = [
  {
    name: "Prof. Amadi O. Ihunwo",
    title: "Research Director",
    institution: "African Research Excellence Foundation",
    bio: "Supporting scientific excellence and innovation across Africa",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80",
    email: "a.ihunwo@aref.org",
    linkedin: "https://linkedin.com/in/amadiihunwo",
    website: "https://aref.org",
    details: {
      affiliations: [
        "African Research Excellence Foundation",
        "International Brain Research Organization",
        "Society for Neuroscience"
      ]
    }
  },
  {
    name: "Prof. Bamidele Victor Owoyele",
    title: "Advisory Board Chair",
    institution: "African Neuroscience Initiative",
    bio: "Advancing scientific research and development through policy and funding",
    image: "https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&q=80",
    email: "b.owoyele@ani.org",
    twitter: "@ProfOwoyele",
    website: "https://ani.org",
    details: {
      affiliations: [
        "African Neuroscience Initiative",
        "Pan-African Brain Research Council",
        "Global Neuroscience Forum"
      ]
    }
  }
];

const founders: Person[] = [
  {
    name: "Damian Eke",
    title: "Founding Director",
    institution: "African Brain Development Network",
    bio: "Pioneer in African neuroscience with over 20 years of research experience",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80",
    achievements: [
      "Established first neuroimaging center in West Africa",
      "Published over 100 research papers",
      "Recipient of the African Science Leadership Award"
    ]
  },
  {
    name: "Eberechi Wogu",
    title: "Co-Founder",
    institution: "African Brain Development Network",
    bio: "Leading expert in computational neuroscience and brain-computer interfaces",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
    achievements: [
      "Developed innovative neural network models",
      "Founded African Women in Neuroscience",
      "Awarded Gates Foundation Research Grant"
    ]
  }
];

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
              
              {person.country && (
                <div className="flex items-center text-amber-700 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{person.country}</span>
                </div>
              )}
              
              <div className="flex items-center text-amber-700 mb-4">
                <Building2 className="h-4 w-4 mr-1" />
                <span>{person.institution}</span>
              </div>

              <p className="text-amber-700 mb-6">{person.bio}</p>

              {person.achievements && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-amber-900 mb-3">Achievements</h4>
                  <ul className="space-y-2">
                    {person.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start text-amber-700">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-amber-500" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-amber-900 mb-3">Connect</h4>
                <div className="space-y-3">
                  {person.email && (
                    <a 
                      href={`mailto:${person.email}`} 
                      className="flex items-center text-amber-700 hover:text-amber-900 transition-colors"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      <span>{person.email}</span>
                    </a>
                  )}
                  {person.linkedin && (
                    <a 
                      href={person.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center text-amber-700 hover:text-amber-900 transition-colors"
                    >
                      <Linkedin className="h-5 w-5 mr-2" />
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                  {person.twitter && (
                    <a 
                      href={`https://twitter.com/${person.twitter}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center text-amber-700 hover:text-amber-900 transition-colors"
                    >
                      <Twitter className="h-5 w-5 mr-2" />
                      <span>{person.twitter}</span>
                    </a>
                  )}
                  {person.website && (
                    <a 
                      href={person.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center text-amber-700 hover:text-amber-900 transition-colors"
                    >
                      <LinkIcon className="h-5 w-5 mr-2" />
                      <span>Personal Website</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-amber-100">
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function People() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  return (
    <Layout>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-amber-950 to-amber-800">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-96 h-96 -top-48 -left-48 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-amber-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-amber-200 to-amber-100 bg-clip-text text-transparent">
                  Our People
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl text-amber-100 max-w-3xl mx-auto"
              >
                Meet the dedicated individuals and organizations driving neuroscience research and education across Africa
              </motion.p>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Our Founders</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Visionary leaders who established ABDN
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {founders.map((founder, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 h-64 md:h-auto md:w-64">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center mb-2">
                        <Star className="h-5 w-5 text-amber-500 mr-2" />
                        <h3 className="text-xl font-bold text-amber-900">{founder.name}</h3>
                      </div>
                      <p className="text-amber-600 mb-4">{founder.title}</p>
                      <p className="text-amber-700 mb-6">{founder.bio}</p>
                      <div className="space-y-2">
                        {founder.achievements?.map((achievement, i) => (
                          <div key={i} className="flex items-center text-amber-700">
                            <ArrowRight className="h-4 w-4 mr-2 text-amber-500" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setSelectedPerson(founder)}
                        className="mt-6 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg font-semibold transition-colors flex items-center gap-2"
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

        {/* Stakeholders Section */}
        <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Our Stakeholders</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Key persons and institutions supporting our mission
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stakeholders.map((stakeholder, index) => (
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
                    <p className="text-amber-600 mb-4">{stakeholder.title}</p>
                    <div className="flex items-center text-amber-700 mb-4">
                      <Building2 className="h-4 w-4 mr-1" />
                      <span>{stakeholder.institution}</span>
                    </div>
                    <p className="text-amber-700 mb-6">{stakeholder.bio}</p>
                    <button
                      onClick={() => setSelectedPerson(stakeholder)}
                      className="w-full px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      More Info
                      <ArrowRight className="h-4 w-4" />
                    </button>
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
              {nationalCoordinators.map((coordinator, index) => (
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
                    <button
                      onClick={() => setSelectedPerson(coordinator)}
                      className="w-full px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      More Info
                      <ArrowRight className="h-4 w-4" />
                    </button>
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
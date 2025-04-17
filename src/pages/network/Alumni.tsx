import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Globe, Mail, Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';
import Layout from '../../components/Layout';

interface Alumni {
  id: number;
  name: string;
  role: string;
  currentPosition: string;
  currentOrganization: string;
  location: string;
  cohort: number; // 2023, 2024, or 2025
  photo: string;
  bio: string;
  experience: string;
  socialLinks: {
    linkedin?: string;
    website?: string;
    email?: string;
  };
  skills: string[];
}

const alumniData: Alumni[] = [
  {
    id: 1,
    name: "Sarah Mwangi",
    role: "Neuroscience Researcher",
    currentPosition: "Senior Research Scientist",
    currentOrganization: "African Institute of Brain Research",
    location: "Nairobi, Kenya",
    cohort: 2023,
    photo: "/images/alumni/sarah-mwangi.jpg",
    bio: "Sarah completed her PhD in Neuroscience at ABDN, focusing on neurodevelopmental disorders in African populations. Her research has contributed significantly to understanding brain development patterns across different African regions.",
    experience: "After graduating from ABDN, Sarah joined the African Institute of Brain Research where she leads a team studying neurodevelopmental disorders. Her work has been published in several high-impact journals and has influenced healthcare policies in multiple African countries.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarah-mwangi",
      email: "sarah.mwangi@example.com"
    },
    skills: ["Neuroimaging", "Data Analysis", "Research Methodology", "Public Speaking"]
  },
  {
    id: 2,
    name: "Mohammed Ahmed",
    role: "Data Scientist",
    currentPosition: "Lead Data Scientist",
    currentOrganization: "African Health Data Initiative",
    location: "Lagos, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/mohammed-ahmed.jpg",
    bio: "Mohammed specialized in computational neuroscience during his time at ABDN. His work on machine learning applications in brain data analysis has been groundbreaking.",
    experience: "Currently leading the data science team at the African Health Data Initiative, Mohammed has developed innovative algorithms for analyzing large-scale neuroimaging datasets. His work has improved diagnostic accuracy for neurological disorders across Africa.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/mohammed-ahmed",
      website: "https://mohammedahmed.com",
      email: "mohammed.ahmed@example.com"
    },
    skills: ["Machine Learning", "Python", "Neuroinformatics", "Data Visualization"]
  },
  {
    id: 3,
    name: "Grace Okonjo",
    role: "Clinical Neuroscientist",
    currentPosition: "Head of Clinical Research",
    currentOrganization: "Pan-African Neuroscience Center",
    location: "Cape Town, South Africa",
    cohort: 2024,
    photo: "/images/alumni/grace-okonjo.jpg",
    bio: "Grace's research at ABDN focused on bridging the gap between clinical practice and neuroscience research in African healthcare settings.",
    experience: "As Head of Clinical Research at the Pan-African Neuroscience Center, Grace has implemented several community-based neuroscience programs that have improved access to neurological care in underserved areas.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/grace-okonjo",
      email: "grace.okonjo@example.com"
    },
    skills: ["Clinical Research", "Public Health", "Community Engagement", "Project Management"]
  },
  {
    id: 4,
    name: "David Okafor",
    role: "Computational Neuroscientist",
    currentPosition: "Research Fellow",
    currentOrganization: "University of Lagos",
    location: "Lagos, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/david-okafor.jpg",
    bio: "David's research focuses on developing computational models of brain function using machine learning techniques.",
    experience: "Currently working on developing novel algorithms for analyzing brain connectivity patterns in African populations.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/david-okafor",
      email: "david.okafor@example.com"
    },
    skills: ["Machine Learning", "Python", "Brain Connectivity", "Data Analysis"]
  },
  {
    id: 5,
    name: "Amina Diallo",
    role: "Neuropsychologist",
    currentPosition: "Clinical Researcher",
    currentOrganization: "Dakar Neuroscience Institute",
    location: "Dakar, Senegal",
    cohort: 2024,
    photo: "/images/alumni/amina-diallo.jpg",
    bio: "Amina specializes in cross-cultural neuropsychology and cognitive assessment in African contexts.",
    experience: "Leading a team developing culturally appropriate neuropsychological assessment tools for West African populations.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/amina-diallo",
      email: "amina.diallo@example.com"
    },
    skills: ["Neuropsychology", "Cognitive Assessment", "Cross-cultural Research", "Clinical Research"]
  },
  {
    id: 6,
    name: "Kwame Mensah",
    role: "Neuroimaging Specialist",
    currentPosition: "Senior Researcher",
    currentOrganization: "Ghana Neuroscience Center",
    location: "Accra, Ghana",
    cohort: 2023,
    photo: "/images/alumni/kwame-mensah.jpg",
    bio: "Kwame's expertise lies in advanced neuroimaging techniques and their application in studying brain development.",
    experience: "Pioneering the use of advanced neuroimaging techniques in studying brain development patterns in African children.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/kwame-mensah",
      email: "kwame.mensah@example.com"
    },
    skills: ["MRI", "fMRI", "Neuroimaging Analysis", "Brain Development"]
  }
];

export default function Alumni() {
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [selectedCohort, setSelectedCohort] = useState<number | null>(null);

  const filteredAlumni = filter === 'all' 
    ? alumniData 
    : alumniData.filter(alumni => 
        alumni.skills.some(skill => skill.toLowerCase().includes(filter.toLowerCase())) ||
        alumni.role.toLowerCase().includes(filter.toLowerCase())
      );

  const cohortFilteredAlumni = selectedCohort
    ? filteredAlumni.filter(alumni => alumni.cohort === selectedCohort)
    : filteredAlumni;

  return (
    <Layout>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-48 bg-gradient-to-br from-amber-950 to-amber-800">
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
                  ABDN Alumni Network
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl text-amber-100 max-w-3xl mx-auto"
              >
                Discover the impact of our alumni across Africa and beyond, shaping the future of neuroscience and brain research
              </motion.p>
            </div>
          </div>
        </section>

        {/* Program Timeline Section */}
        <section className="py-12 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-amber-900 mb-4">Program Timeline</h2>
              <p className="text-amber-700 max-w-2xl mx-auto">
                Our program has been running since 2023, with new cohorts of 25 researchers joining each year
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 text-amber-600 mb-4">
                  <Calendar className="h-5 w-5" />
                  <span className="text-lg font-semibold">2023 Cohort</span>
                </div>
                <p className="text-amber-700">
                  Our inaugural cohort of 25 researchers who completed the program and are now making significant contributions to neuroscience research across Africa.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 text-amber-600 mb-4">
                  <Calendar className="h-5 w-5" />
                  <span className="text-lg font-semibold">2024 Cohort</span>
                </div>
                <p className="text-amber-700">
                  The current cohort of 25 researchers who are actively engaged in the program, working on innovative neuroscience projects across the continent.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 text-amber-600 mb-4">
                  <Calendar className="h-5 w-5" />
                  <span className="text-lg font-semibold">2025 Cohort</span>
                </div>
                <p className="text-amber-700">
                  Applications are now open for our 2025 cohort of 25 researchers. Join us to be part of the next generation of neuroscience leaders in Africa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center mb-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full transition-all ${
                  filter === 'all'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-600 hover:bg-amber-100'
                }`}
              >
                All Alumni
              </button>
              <button
                onClick={() => setFilter('research')}
                className={`px-6 py-2 rounded-full transition-all ${
                  filter === 'research'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-600 hover:bg-amber-100'
                }`}
              >
                Researchers
              </button>
              <button
                onClick={() => setFilter('data')}
                className={`px-6 py-2 rounded-full transition-all ${
                  filter === 'data'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-600 hover:bg-amber-100'
                }`}
              >
                Data Scientists
              </button>
              <button
                onClick={() => setFilter('clinical')}
                className={`px-6 py-2 rounded-full transition-all ${
                  filter === 'clinical'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-600 hover:bg-amber-100'
                }`}
              >
                Clinical Specialists
              </button>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setSelectedCohort(null)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCohort === null
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-600 hover:bg-amber-100'
                }`}
              >
                All Cohorts
              </button>
              <button
                onClick={() => setSelectedCohort(2023)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCohort === 2023
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-600 hover:bg-amber-100'
                }`}
              >
                2023 Cohort
              </button>
              <button
                onClick={() => setSelectedCohort(2024)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCohort === 2024
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-600 hover:bg-amber-100'
                }`}
              >
                2024 Cohort
              </button>
            </div>
          </div>
        </section>

        {/* Alumni Grid */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cohortFilteredAlumni.map((alumni) => (
                <motion.div
                  key={alumni.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 bg-amber-100">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-900/50" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-2xl font-bold text-white">{alumni.name}</h3>
                      <p className="text-amber-200">{alumni.role}</p>
                    </div>
                    <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm">
                      {alumni.cohort} Cohort
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-amber-600 mb-4">
                      <Briefcase className="h-5 w-5" />
                      <span>{alumni.currentPosition}</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-600 mb-4">
                      <MapPin className="h-5 w-5" />
                      <span>{alumni.location}</span>
                    </div>
                    <p className="text-amber-700 mb-4 line-clamp-3">{alumni.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {alumni.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-sm bg-amber-50 text-amber-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {alumni.socialLinks.linkedin && (
                        <a
                          href={alumni.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-800 transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {alumni.socialLinks.website && (
                        <a
                          href={alumni.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-800 transition-colors"
                        >
                          <Globe className="h-5 w-5" />
                        </a>
                      )}
                      {alumni.socialLinks.email && (
                        <a
                          href={`mailto:${alumni.socialLinks.email}`}
                          className="text-amber-600 hover:text-amber-800 transition-colors"
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Alumni Impact Section */}
        <section className="py-16 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-amber-900 mb-4">
                Alumni Impact
              </h2>
              <p className="text-amber-700 max-w-2xl mx-auto">
                Our alumni are making significant contributions to neuroscience research and healthcare across Africa
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Research Excellence</h3>
                <p className="text-amber-700">
                  Alumni have published  research papers in high-impact journals, advancing our understanding of brain development and disorders in African populations.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Community Impact</h3>
                <p className="text-amber-700">
                  Through various initiatives, our alumni have reached over 100 individuals with neuroscience education and awareness programs across Africa.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Leadership</h3>
                <p className="text-amber-700">
                  Many alumni now hold leadership positions in research institutions, healthcare organizations, and policy-making bodies across the continent.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
} 
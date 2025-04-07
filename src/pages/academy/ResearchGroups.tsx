import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Brain, 
  Network, 
  Microscope, 
  Code, 
  LineChart, 
  GraduationCap,
  BookOpen,
  Target,
  Lightbulb
} from 'lucide-react';
import Layout from '../../components/Layout';

interface ResearchGroup {
  id: string;
  name: string;
  description: string;
  image: string;
  leader: string;
  members: number;
  focus: string[];
  projects: {
    title: string;
    description: string;
  }[];
  publications?: number;
}

const researchGroups: ResearchGroup[] = [
  {
    id: "brain-development",
    name: "Brain Development & Aging",
    description: "Investigating structural and functional brain development across the lifespan in African populations, with a focus on early life and aging trajectories.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80",
    leader: "Dr. Sarah Johnson",
    members: 8,
    focus: [
      "Early Brain Development",
      "Aging Patterns",
      "Longitudinal Studies",
      "Population Neuroscience"
    ],
    projects: [
      {
        title: "ABDN-1K Development Cohort",
        description: "Large-scale study of brain development in African children aged 0-18 years."
      },
      {
        title: "Healthy Aging Initiative",
        description: "Investigating factors influencing healthy brain aging in African populations."
      }
    ],
    publications: 12
  },
  {
    id: "clinical-applications",
    name: "Clinical Neuroimaging",
    description: "Applying advanced neuroimaging techniques to understand neurological and psychiatric conditions prevalent in African populations.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80",
    leader: "Dr. Michael Okonkwo",
    members: 6,
    focus: [
      "Diagnostic Imaging",
      "Treatment Monitoring",
      "Clinical Trials",
      "Biomarker Development"
    ],
    projects: [
      {
        title: "Neurological Disorders Registry",
        description: "Building a comprehensive database of neurological conditions in Africa."
      },
      {
        title: "Treatment Response Mapping",
        description: "Using imaging to track treatment effectiveness in neurological conditions."
      }
    ],
    publications: 8
  },
  {
    id: "ai-methods",
    name: "AI & Methods Development",
    description: "Developing and adapting artificial intelligence and machine learning methods for neuroimaging analysis specific to African populations.",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80",
    leader: "Dr. Amina Hassan",
    members: 7,
    focus: [
      "Machine Learning",
      "Image Processing",
      "Quality Control",
      "Pipeline Development"
    ],
    projects: [
      {
        title: "AutoQC Pipeline",
        description: "Automated quality control system for neuroimaging data."
      },
      {
        title: "African Brain Atlas",
        description: "Population-specific brain atlas using deep learning methods."
      }
    ],
    publications: 15
  }
];

export default function ResearchGroups() {
  return (
    <Layout>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-48 bg-gradient-to-br from-amber-950 to-amber-800">
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,transparent,black)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Research Groups
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl text-amber-100 max-w-3xl mx-auto"
              >
                Leading teams advancing neuroimaging research in Africa
              </motion.p>
            </div>
          </div>
        </section>

        {/* Research Groups Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 mb-16"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-full min-h-[300px]">
                  <img
                    src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80"
                    alt="Brain Research"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-amber-900 mb-6">Our Research Focus</h2>
                  <p className="text-lg text-amber-700 leading-relaxed">
                    ABDN research groups are engaged in brain data collection, curation, and analysis of Africans (both diseased and healthy) for clinical inquiries, population studies, and Neuroimaging analytics studies. Data being collected ranges from brain MRI data, Demographic data, EEG data, and other behavioral data.
                  </p>
                </div>
              </div>
            </motion.div>
{/* 
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {researchGroups.map((group, index) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-2">{group.name}</h3>
                      <div className="flex items-center text-amber-100">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-sm">{group.members} Members</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center text-amber-600 mb-2">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Led by {group.leader}</span>
                      </div>
                      <p className="text-amber-700">{group.description}</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold text-amber-900 mb-2">Research Focus:</h4>
                      <div className="flex flex-wrap gap-2">
                        {group.focus.map((area, i) => (
                          <span
                            key={i}
                            className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold text-amber-900 mb-2">Current Projects:</h4>
                      <div className="space-y-2">
                        {group.projects.map((project, i) => (
                          <div key={i} className="bg-amber-50 p-3 rounded-lg">
                            <h5 className="font-medium text-amber-900">{project.title}</h5>
                            <p className="text-sm text-amber-600">{project.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {group.publications && (
                      <div className="flex items-center text-amber-600">
                        <BookOpen className="h-4 w-4 mr-2" />
                        <span className="text-sm">{group.publications} Recent Publications</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div> */}
          </div>
        </section>

        {/* Research Impact Section */}
        <section className="py-24 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-amber-900">Research Impact</h2>
              <p className="mt-2 text-lg text-amber-700">Advancing neuroscience knowledge and clinical applications</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <Brain className="h-8 w-8 text-amber-600 mb-4" />
                <div className="text-2xl font-bold text-amber-900 mb-2">3+</div>
                <div className="text-amber-700">Research Groups</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <Target className="h-8 w-8 text-amber-600 mb-4" />
                <div className="text-2xl font-bold text-amber-900 mb-2">6+</div>
                <div className="text-amber-700">Active Projects</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <BookOpen className="h-8 w-8 text-amber-600 mb-4" />
                <div className="text-2xl font-bold text-amber-900 mb-2">35+</div>
                <div className="text-amber-700">Publications</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <Lightbulb className="h-8 w-8 text-amber-600 mb-4" />
                <div className="text-2xl font-bold text-amber-900 mb-2">20+</div>
                <div className="text-amber-700">Innovations</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Join Research Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-amber-900">Join Our Research Teams</h2>
                <p className="text-xl text-amber-700">
                  We're always looking for talented researchers to join our mission
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-amber-100 rounded-lg">
                      <GraduationCap className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-900">PhD Opportunities</h3>
                      <p className="text-amber-700">Join our doctoral research program</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-amber-100 rounded-lg">
                      <Users className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-900">Research Positions</h3>
                      <p className="text-amber-700">Opportunities for researchers at all levels</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-amber-100 rounded-lg">
                      <Network className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-900">Collaborations</h3>
                      <p className="text-amber-700">Partner with our research groups</p>
                    </div>
                  </div>
                </div>
                <button className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors">
                  View Opportunities
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                  alt="Research Team"
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                  <p className="text-amber-900 font-semibold">
                    "Join our mission to advance African neuroscience through cutting-edge research."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
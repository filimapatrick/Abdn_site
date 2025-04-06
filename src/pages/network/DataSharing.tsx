import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Lock,
  Users,
  FileText,
  Download,
  Search,
  Shield,
  BookOpen,
  Server,
  Share2,
  ChevronDown,
  ExternalLink,
  BarChart
} from 'lucide-react';
import Layout from '../../components/Layout';

interface Dataset {
  id: string;
  name: string;
  description: string;
  size: string;
  participants: number;
  type: 'structural' | 'functional' | 'diffusion' | 'multimodal';
  access: 'open' | 'restricted' | 'controlled';
  dateUpdated: string;
  citations: number;
  tags: string[];
  image: string;
  tools?: {
    name: string;
    description: string;
    link: string;
  }[];
  documentation: string;
  requirements?: string[];
}

const datasets: Dataset[] = [
  {
    id: "ABDN-1K",
    name: "ABDN-1K Brain Development Dataset",
    description: "Comprehensive neuroimaging dataset comprising structural and functional MRI scans from over 1000 participants across 12 African countries, including cognitive assessments and demographic information.",
    size: "2.5 TB",
    participants: 1000,
    type: "multimodal",
    access: "controlled",
    dateUpdated: "2024-02-15",
    citations: 45,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80",
    tags: ["T1w", "fMRI", "DTI", "resting-state"],
    tools: [
      {
        name: "ABDN Data Explorer",
        description: "Interactive web tool for exploring and visualizing the ABDN-1K dataset",
        link: "/tools/explorer"
      },
      {
        name: "Analysis Pipeline",
        description: "Standardized preprocessing and analysis pipeline for ABDN data",
        link: "/tools/pipeline"
      }
    ],
    documentation: "/docs/abdn-1k",
    requirements: [
      "Institutional Review Board (IRB) approval",
      "Data Usage Agreement",
      "ABDN membership"
    ]
  },
  {
    id: "ABDN-STRUCT",
    name: "African Structural Brain Atlas",
    description: "High-resolution structural MRI dataset focused on creating population-specific brain atlases for African populations.",
    size: "800 GB",
    participants: 1500,
    type: "structural",
    access: "restricted",
    dateUpdated: "2024-01-20",
    citations: 28,
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80",
    tags: ["T1w", "T2w", "brain atlas", "morphometry"],
    tools: [
      {
        name: "Atlas Viewer",
        description: "Interactive tool for exploring the structural brain atlas",
        link: "/tools/atlas"
      }
    ],
    documentation: "/docs/abdn-struct"
  },
  {
    id: "ABDN-FUNC",
    name: "African Task fMRI Repository",
    description: "Functional MRI dataset containing task-based and resting-state scans from multiple research sites across Africa.",
    size: "1.2 TB",
    participants: 800,
    type: "functional",
    access: "controlled",
    dateUpdated: "2024-03-01",
    citations: 32,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80",
    tags: ["fMRI", "task-based", "resting-state", "BOLD"],
    documentation: "/docs/abdn-func",
    requirements: [
      "Research Protocol Approval",
      "Data Usage Agreement",
      "fMRI Analysis Experience"
    ]
  }
];

export default function DataSharing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedAccess, setSelectedAccess] = useState<string | null>(null);
  const [expandedDataset, setExpandedDataset] = useState<string | null>(null);

  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = searchTerm === '' || 
      dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = !selectedType || dataset.type === selectedType;
    const matchesAccess = !selectedAccess || dataset.access === selectedAccess;

    return matchesSearch && matchesType && matchesAccess;
  });

  return (
    <Layout>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-amber-950 to-amber-800">
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,transparent,black)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-amber-200 to-amber-100 bg-clip-text text-transparent">
                  African Brain Imaging Data Network
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl text-amber-100 max-w-3xl mx-auto"
              >
                Access and contribute to Africa's premier collection of brain imaging and neuroscience research data
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-8 flex flex-wrap justify-center gap-4"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <span className="text-amber-100">Primary Focus:</span>
                  <span className="ml-2 font-semibold text-white">Neuroimaging Data</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <span className="text-amber-100">Including:</span>
                  <span className="ml-2 font-semibold text-white">MRI, fMRI, DTI, EEG</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-amber-900">Comprehensive Neuroimaging Resources</h2>
              <p className="mt-2 text-amber-700">Advancing African neuroscience through data-driven research</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <Database className="h-8 w-8 text-amber-600 mb-4" />
                <div className="text-2xl font-bold text-amber-900 mb-2">3+</div>
                <div className="text-amber-600">Major Datasets</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <Users className="h-8 w-8 text-amber-600 mb-4" />
                <div className="text-2xl font-bold text-amber-900 mb-2">5,000+</div>
                <div className="text-amber-600">Research Participants</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <Server className="h-8 w-8 text-amber-600 mb-4" />
                <div className="text-2xl font-bold text-amber-900 mb-2">3.8 TB</div>
                <div className="text-amber-600">Total Data Volume</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <BarChart className="h-8 w-8 text-amber-600 mb-4" />
                <div className="text-2xl font-bold text-amber-900 mb-2">100+</div>
                <div className="text-amber-600">Citations</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-amber-900">Explore Our Datasets</h2>
              <p className="mt-2 text-amber-700">From brain imaging to clinical assessments</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500" />
                <input
                  type="text"
                  placeholder="Search datasets by name, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedType || ''}
                  onChange={(e) => setSelectedType(e.target.value || null)}
                  className="px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-amber-900"
                >
                  <option value="">All Modalities</option>
                  <option value="structural">Structural MRI</option>
                  <option value="functional">Functional MRI</option>
                  <option value="diffusion">Diffusion MRI</option>
                  <option value="multimodal">Multimodal</option>
                </select>
                <select
                  value={selectedAccess || ''}
                  onChange={(e) => setSelectedAccess(e.target.value || null)}
                  className="px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-amber-900"
                >
                  <option value="">All Access Levels</option>
                  <option value="open">Open Access</option>
                  <option value="restricted">Restricted</option>
                  <option value="controlled">Controlled</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Datasets Section */}
        <section className="py-12 bg-gradient-to-b from-white to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDatasets.map((dataset) => (
                <motion.div
                  key={dataset.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={dataset.image}
                      alt={dataset.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          {dataset.type.charAt(0).toUpperCase() + dataset.type.slice(1)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          dataset.access === 'open' 
                            ? 'bg-green-100 text-green-800'
                            : dataset.access === 'restricted'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {dataset.access.charAt(0).toUpperCase() + dataset.access.slice(1)} Access
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center text-amber-600 text-sm">
                        <BarChart className="h-4 w-4 mr-1" />
                        {dataset.citations} citations
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-amber-900 mb-2">
                      {dataset.name}
                    </h3>
                    <p className="text-amber-700 mb-4 line-clamp-2">
                      {dataset.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dataset.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-full text-xs bg-amber-50 text-amber-700 border border-amber-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-amber-700">
                        <Database className="h-4 w-4" />
                        <span>{dataset.size}</span>
                      </div>
                      <div className="flex items-center gap-2 text-amber-700">
                        <Users className="h-4 w-4" />
                        <span>{dataset.participants}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedDataset(expandedDataset === dataset.id ? null : dataset.id)}
                      className="flex items-center text-amber-600 hover:text-amber-800 transition-colors"
                    >
                      <span className="text-sm font-medium">View Details</span>
                      <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${
                        expandedDataset === dataset.id ? 'rotate-180' : ''
                      }`} />
                    </button>
                    {expandedDataset === dataset.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-amber-100"
                      >
                        {dataset.tools && (
                          <div className="mb-4">
                            <h4 className="text-lg font-semibold text-amber-900 mb-2">Available Tools</h4>
                            <div className="space-y-2">
                              {dataset.tools.map((tool, index) => (
                                <a
                                  key={index}
                                  href={tool.link}
                                  className="flex items-start p-3 rounded-lg border border-amber-200 hover:bg-amber-50 transition-colors group"
                                >
                                  <div>
                                    <h5 className="font-medium text-amber-900 group-hover:text-amber-700 transition-colors">
                                      {tool.name}
                                    </h5>
                                    <p className="text-sm text-amber-600">
                                      {tool.description}
                                    </p>
                                  </div>
                                  <ExternalLink className="h-4 w-4 ml-2 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                        {dataset.requirements && (
                          <div className="mb-4">
                            <h4 className="text-lg font-semibold text-amber-900 mb-2">Access Requirements</h4>
                            <ul className="space-y-2">
                              {dataset.requirements.map((req, index) => (
                                <li key={index} className="flex items-center gap-2 text-amber-700">
                                  <Shield className="h-4 w-4 text-amber-500" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="flex gap-4">
                          <a
                            href={dataset.documentation}
                            className="flex items-center px-4 py-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
                          >
                            <BookOpen className="h-4 w-4 mr-2" />
                            <span>Documentation</span>
                          </a>
                          <button className="flex items-center px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors">
                            <Download className="h-4 w-4 mr-2" />
                            <span>Request Access</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Sharing Policy Section */}
        <section className="py-16 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-amber-900 mb-4">Data Sharing Policy</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Our commitment to advancing African neuroimaging research through open science
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <Lock className="h-8 w-8 text-amber-600 mb-4" />
                <h3 className="text-lg font-semibold text-amber-900 mb-2">Data Security</h3>
                <p className="text-amber-700">
                  Enterprise-grade security for sensitive neuroimaging data, with strict access controls and regular audits.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <Shield className="h-8 w-8 text-amber-600 mb-4" />
                <h3 className="text-lg font-semibold text-amber-900 mb-2">Ethics & Privacy</h3>
                <p className="text-amber-700">
                  GDPR-compliant data handling with comprehensive participant privacy protection and ethical guidelines.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <Share2 className="h-8 w-8 text-amber-600 mb-4" />
                <h3 className="text-lg font-semibold text-amber-900 mb-2">Collaboration</h3>
                <p className="text-amber-700">
                  Foster international collaboration while ensuring proper attribution and standardized data formats.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
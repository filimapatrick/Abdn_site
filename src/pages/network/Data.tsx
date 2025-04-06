import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Lock,
  Users,
  FileText,
  Download,
  ArrowRight,
  Search,
  Filter,
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
  type: 'neuroimaging' | 'behavioral' | 'clinical' | 'genetic';
  access: 'open' | 'restricted' | 'controlled';
  dateUpdated: string;
  citations: number;
  tags: string[];
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
    type: "neuroimaging",
    access: "controlled",
    dateUpdated: "2024-02-15",
    citations: 45,
    tags: ["MRI", "fMRI", "cognitive assessment", "demographics"],
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
    id: "ABDN-COG",
    name: "African Cognitive Assessment Database",
    description: "Standardized cognitive assessment data from various African populations, including measures of executive function, memory, and language processing.",
    size: "500 GB",
    participants: 2500,
    type: "behavioral",
    access: "restricted",
    dateUpdated: "2024-01-20",
    citations: 28,
    tags: ["cognitive assessment", "behavioral", "longitudinal"],
    tools: [
      {
        name: "Cognitive Score Calculator",
        description: "Tool for standardizing and comparing cognitive scores",
        link: "/tools/cog-calc"
      }
    ],
    documentation: "/docs/abdn-cog"
  },
  {
    id: "ABDN-CLIN",
    name: "Clinical Neuroscience Repository",
    description: "Clinical data repository containing anonymized patient records, treatment outcomes, and longitudinal assessments for various neurological conditions.",
    size: "800 GB",
    participants: 1500,
    type: "clinical",
    access: "controlled",
    dateUpdated: "2024-03-01",
    citations: 32,
    tags: ["clinical", "treatment outcomes", "longitudinal"],
    documentation: "/docs/abdn-clin",
    requirements: [
      "Clinical Research Certification",
      "Data Usage Agreement",
      "Patient Privacy Training"
    ]
  }
];

export default function Data() {
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
                Data Sharing Platform
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl text-amber-100 max-w-3xl mx-auto"
            >
              Access and contribute to our growing collection of African neuroscience datasets
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <option value="">All Types</option>
                <option value="neuroimaging">Neuroimaging</option>
                <option value="behavioral">Behavioral</option>
                <option value="clinical">Clinical</option>
                <option value="genetic">Genetic</option>
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
          <div className="space-y-8">
            {filteredDatasets.map((dataset) => (
              <motion.div
                key={dataset.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
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
                        <span className="flex items-center text-amber-600 text-sm">
                          <BarChart className="h-4 w-4 mr-1" />
                          {dataset.citations} citations
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-amber-900 mb-2">
                        {dataset.name}
                      </h3>
                      <p className="text-amber-700 mb-4">
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
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-amber-700">
                          <Database className="h-4 w-4" />
                          <span>{dataset.size}</span>
                        </div>
                        <div className="flex items-center gap-2 text-amber-700">
                          <Users className="h-4 w-4" />
                          <span>{dataset.participants} participants</span>
                        </div>
                        <div className="flex items-center gap-2 text-amber-700">
                          <FileText className="h-4 w-4" />
                          <span>Updated {dataset.dateUpdated}</span>
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
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>
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
              Our commitment to open science and responsible data sharing
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
                All data is stored securely and encrypted, with strict access controls and regular security audits.
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
                We maintain strict ethical standards and protect participant privacy in accordance with international regulations.
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
                We encourage collaboration and data sharing while ensuring proper attribution and responsible use.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  BarChart,
  X,
  Check
} from 'lucide-react';
import Layout from '../../components/Layout';

interface Dataset {
  id: string;
  name: string;
  description: string;
  type: 'structural' | 'functional' | 'diffusion' | 'multimodal';
  access: 'open' | 'restricted' | 'controlled';
  dateUpdated: string;
  tags: string[];
  image: string;
  documentation: string;
  requirements?: string[];
}

const datasets: Dataset[] = [
  {
    id: "ABDN-PD",
    name: "Nigerian Parkinson's Disease Dataset",
    description: "Comprehensive neuroimaging dataset of Parkinson's Disease patients from Nigeria, including structural and functional MRI scans.",
    type: "multimodal",
    access: "controlled",
    dateUpdated: "2024",
    tags: ["Parkinson's Disease", "T1w", "fMRI", "DTI", "Nigeria"],
    image: "/assets/Academy_2023/data.png",
    documentation: "/docs/parkinsons",
    requirements: [
      "Institutional Review Board (IRB) approval",
      "Data Usage Agreement",
      "ABDN membership"
    ]
  },
  {
    id: "ABDN-CTRL",
    name: "Nigerian Healthy Controls Dataset",
    description: "Reference dataset of healthy subjects from Nigeria, providing baseline neuroimaging data for comparative studies.",
    type: "multimodal",
    access: "controlled",
    dateUpdated: "2024",
    tags: ["Healthy Controls", "T1w", "fMRI", "DTI", "Nigeria"],
    image: "/assets/Academy_2023/data.png",
    documentation: "/docs/controls",
    requirements: [
      "Institutional Review Board (IRB) approval",
      "Data Usage Agreement",
      "ABDN membership"
    ]
  },
  {
    id: "ABDN-DEM",
    name: "Nigerian Dementia Dataset",
    description: "Neuroimaging data from dementia patients in Nigeria, including structural and functional scans for research purposes.",
    type: "multimodal",
    access: "controlled",
    dateUpdated: "2024",
    tags: ["Dementia", "T1w", "fMRI", "DTI", "Nigeria"],
    image: "/assets/Academy_2023/data.png",
    documentation: "/docs/dementia",
    requirements: [
      "Institutional Review Board (IRB) approval",
      "Data Usage Agreement",
      "ABDN membership"
    ]
  },
  {
    id: "ABDN-HYD",
    name: "Nigerian Hydrocephalus Dataset",
    description: "Specialized neuroimaging collection focusing on hydrocephalus cases from Nigerian medical centers.",
    type: "multimodal",
    access: "controlled",
    dateUpdated: "2024",
    tags: ["Hydrocephalus", "T1w", "T2w", "Nigeria"],
    image: "/assets/Academy_2023/data.png",
    documentation: "/docs/hydrocephalus",
    requirements: [
      "Institutional Review Board (IRB) approval",
      "Data Usage Agreement",
      "ABDN membership"
    ]
  },
  {
    id: "ABDN-STROKE",
    name: "Nigerian Stroke Dataset",
    description: "Comprehensive collection of stroke cases from Nigeria, including acute and follow-up imaging data.",
    type: "multimodal",
    access: "controlled",
    dateUpdated: "2024",
    tags: ["Stroke", "T1w", "DWI", "PWI", "Nigeria"],
    image: "/assets/Academy_2023/data.png",
    documentation: "/docs/stroke",
    requirements: [
      "Institutional Review Board (IRB) approval",
      "Data Usage Agreement",
      "ABDN membership"
    ]
  },
  {
    id: "ABDN-TUM",
    name: "Nigerian Brain Tumor Dataset",
    description: "Neuroimaging collection of various brain tumor cases from Nigerian hospitals.",
    type: "multimodal",
    access: "controlled",
    dateUpdated: "2024",
    tags: ["Tumor", "T1w", "T2w", "FLAIR", "Nigeria"],
    image: "/assets/Academy_2023/data.png",
    documentation: "/docs/tumor",
    requirements: [
      "Institutional Review Board (IRB) approval",
      "Data Usage Agreement",
      "ABDN membership"
    ]
  },
  {
    id: "ABDN-EPI",
    name: "Nigerian Epilepsy Dataset",
    description: "Specialized collection of neuroimaging data from epilepsy patients in Nigeria.",
    type: "multimodal",
    access: "controlled",
    dateUpdated: "2024",
    tags: ["Epilepsy", "T1w", "fMRI", "EEG", "Nigeria"],
    image: "/assets/Academy_2023/data.png",
    documentation: "/docs/epilepsy",
    requirements: [
      "Institutional Review Board (IRB) approval",
      "Data Usage Agreement",
      "ABDN membership"
    ]
  },
  {
    id: "ABDN-MS",
    name: "Nigerian Multiple Sclerosis Dataset",
    description: "Neuroimaging data collection focusing on Multiple Sclerosis cases from Nigerian medical centers.",
    type: "multimodal",
    access: "controlled",
    dateUpdated: "2024",
    tags: ["Multiple Sclerosis", "T1w", "T2w", "FLAIR", "Nigeria"],
    image: "/assets/Academy_2023/data.png",
    documentation: "/docs/ms",
    requirements: [
      "Institutional Review Board (IRB) approval",
      "Data Usage Agreement",
      "ABDN membership"
    ]
  },
  {
    id: "ABDN-ALZ",
    name: "Nigerian Alzheimer's Dataset",
    description: "Comprehensive neuroimaging collection of Alzheimer's Disease cases from Nigeria.",
    type: "multimodal",
    access: "controlled",
    dateUpdated: "2024",
    tags: ["Alzheimer's Disease", "T1w", "fMRI", "PET", "Nigeria"],
    image: "/assets/Academy_2023/data.png",
    documentation: "/docs/alzheimers",
    requirements: [
      "Institutional Review Board (IRB) approval",
      "Data Usage Agreement",
      "ABDN membership"
    ]
  },
  {
    id: "ABDN-1K",
    name: "ABDN-1K Brain Development Dataset",
    description: "Comprehensive neuroimaging dataset comprising structural and functional MRI scans from over 1000 participants across 12 African countries, including cognitive assessments and demographic information.",
    type: "multimodal",
    access: "controlled",
    dateUpdated: "2024-02-15",
    tags: ["T1w", "fMRI", "DTI", "resting-state"],
    image: "/assets/Academy_2023/data.png",
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
    type: "structural",
    access: "restricted",
    dateUpdated: "2024-01-20",
    tags: ["T1w", "T2w", "brain atlas", "morphometry"],
    image: "/assets/Academy_2023/data.png",
    documentation: "/docs/abdn-struct"
  },
  {
    id: "ABDN-FUNC",
    name: "African Task fMRI Repository",
    description: "Functional MRI dataset containing task-based and resting-state scans from multiple research sites across Africa.",
    type: "functional",
    access: "controlled",
    dateUpdated: "2024-03-01",
    tags: ["fMRI", "task-based", "resting-state", "BOLD"],
    image: "/assets/Academy_2023/data.png",
    documentation: "/docs/abdn-func",
    requirements: [
      "Research Protocol Approval",
      "Data Usage Agreement",
      "fMRI Analysis Experience"
    ]
  }
];

interface AccessRequestFormProps {
  dataset: Dataset;
  isOpen: boolean;
  onClose: () => void;
}

const AccessRequestForm: React.FC<AccessRequestFormProps> = ({ dataset, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    position: '',
    purpose: '',
    irbApproval: false,
    agreeToDua: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // For now, just close the form
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-amber-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-amber-900">Request Access</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-amber-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-amber-900" />
            </button>
          </div>
          <p className="mt-2 text-amber-700">Dataset: {dataset.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Institution</label>
              <input
                type="text"
                required
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Position</label>
              <input
                type="text"
                required
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">Research Purpose</label>
              <textarea
                required
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  required
                  checked={formData.irbApproval}
                  onChange={(e) => setFormData({ ...formData, irbApproval: e.target.checked })}
                  className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm text-amber-900">
                  I confirm that I have or will obtain IRB approval for this research
                </span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeToDua}
                  onChange={(e) => setFormData({ ...formData, agreeToDua: e.target.checked })}
                  className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm text-amber-900">
                  I agree to the Data Usage Agreement and ABDN's terms of use
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              Submit Request
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default function DataSharing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedAccess, setSelectedAccess] = useState<string | null>(null);
  const seo = seoConfig.data;
  const [expandedDataset, setExpandedDataset] = useState<string | null>(null);
  const [selectedDatasetForAccess, setSelectedDatasetForAccess] = useState<Dataset | null>(null);

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
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        url={seo.url}
      />
      <Layout>
    <main className="pt-20">
      {/* Hero Section */}
        <section className="relative py-48 bg-gradient-to-br from-amber-950 to-amber-800">
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
                Contribute to Africa's premier collection of brain imaging and neuroscience research data
            </motion.p>
              {/* <motion.div
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
              </motion.div> */}
          </div>
        </div>
      </section>

        {/* Stats Section */}
        {/* <section className="py-12 bg-amber-50">
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
                <div className="text-2xl font-bold text-amber-900 mb-2">9</div>
                <div className="text-amber-600">Nigerian Datasets</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <Users className="h-8 w-8 text-amber-600 mb-4" />
                <div className="text-2xl font-bold text-amber-900 mb-2">Multiple</div>
                <div className="text-amber-600">Research Categories</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <Server className="h-8 w-8 text-amber-600 mb-4" />
                <div className="text-2xl font-bold text-amber-900 mb-2">Secure</div>
                <div className="text-amber-600">Data Storage</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <BarChart className="h-8 w-8 text-amber-600 mb-4" />
                <div className="text-2xl font-bold text-amber-900 mb-2">Active</div>
                <div className="text-amber-600">Research Use</div>
              </motion.div>
            </div>
          </div>
        </section> */}

        {/* Search and Filter Section */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-amber-900">Datasets in development</h2>
              {/* <p className="mt-2 text-amber-700">From brain imaging to clinical assessments</p> */}
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
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-duration-300"
                >
                  <div className="relative h-48 bg-amber-50">
                  <img
                    src={dataset.image}
                      alt={dataset.name}
                      className="w-full h-full object-contain p-4"
                  />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent" />
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-amber-900 mb-2">{dataset.name}</h3>
                    <p className="text-amber-700 mb-4">{dataset.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dataset.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-amber-100 text-amber-800 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-amber-600 text-sm">
                        Updated: {dataset.dateUpdated}
                      </span>
                      <button
                        onClick={() => setExpandedDataset(expandedDataset === dataset.id ? null : dataset.id)}
                        className={`text-sm font-medium flex items-center gap-1 ${
                          dataset.access === 'open' ? 'text-green-600' :
                          dataset.access === 'restricted' ? 'text-amber-600' :
                          'text-red-600'
                        }`}
                      >
                        {/* {dataset.access.charAt(0).toUpperCase() + dataset.access.slice(1)} Access
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          expandedDataset === dataset.id ? 'rotate-180' : ''
                        }`} /> */}
                      </button>
                    </div>

                    {expandedDataset === dataset.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-amber-100"
                      >
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
                        <div className="flex justify-end">
                          <button 
                            className="flex items-center px-6 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors"
                            onClick={() => setSelectedDatasetForAccess(dataset)}
                          >
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

        {/* Add the AccessRequestForm */}
        <AnimatePresence>
          {selectedDatasetForAccess && (
            <AccessRequestForm
              dataset={selectedDatasetForAccess}
              isOpen={true}
              onClose={() => setSelectedDatasetForAccess(null)}
            />
          )}
        </AnimatePresence>
    </main>
    </Layout>
    </>
  );
}
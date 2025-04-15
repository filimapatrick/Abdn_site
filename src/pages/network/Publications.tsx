import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookText, Calendar, User2, ArrowUpRight, Filter, X, Database, FileText } from 'lucide-react';
import Layout from '../../components/Layout';

interface Publication {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  abstract: string;
  keywords: string[];
  category: 'journal' | 'conference' | 'book' | 'thesis';
  type: 'abdn' | 'network';
  dataset?: {
    name: string;
    description: string;
    link?: string;
  };
}

const publications: Publication[] = [
  {
    title: "The African Brain Development Dataset: A Comprehensive Neuroimaging Resource",
    authors: ["Damian Eke", "Sarah Mwangi", "Mohammed Ahmed", "ABDN Research Team"],
    journal: "Scientific Data",
    year: 2023,
    doi: "10.1038/s41597-023-12345-6",
    abstract: "We present the first comprehensive African brain development dataset, comprising neuroimaging data from 1000+ participants across 12 African countries. This dataset includes structural and functional MRI, cognitive assessments, and demographic information.",
    keywords: ["neuroimaging", "dataset", "brain development", "Africa", "MRI"],
    category: "journal",
    type: "abdn",
    dataset: {
      name: "ABDN-1K Dataset",
      description: "Comprehensive neuroimaging dataset from 1000+ African participants",
      link: "https://data.abdn.org/datasets/abdn1k"
    }
  },
 
  {
    title: "Standardization of Neuroscience Research Protocols Across African Institutions",
    authors: ["ABDN Standardization Committee", "Eberechi Wogu", "Gams Massi Daniel"],
    journal: "Nature Protocols",
    year: 2023,
    doi: "10.1038/nprot.2023.789",
    abstract: "This paper outlines standardized protocols for neuroscience research across African institutions, developed by the ABDN consortium to ensure data compatibility and research reproducibility.",
    keywords: ["standardization", "protocols", "methodology", "reproducibility"],
    category: "journal",
    type: "abdn",
    dataset: {
      name: "ABDN Protocols Database",
      description: "Standardized research protocols and methodologies",
      link: "https://protocols.abdn.org"
    }
  },
  {
    title: "Neural correlates of cognitive development in African children: A longitudinal fMRI study",
    authors: ["Damian Eke", "Sarah Mwangi", "Mohammed Ahmed"],
    journal: "Developmental Cognitive Neuroscience",
    year: 2023,
    doi: "10.1016/j.dcn.2023.12345",
    abstract: "This longitudinal study investigates the neural basis of cognitive development in African children aged 6-12 years, revealing distinct patterns of brain activation during executive function tasks.",
    keywords: ["neurodevelopment", "fMRI", "cognitive development", "longitudinal study"],
    category: "journal",
    type: "network"
  },
  {
    title: "Brain-Computer Interface Applications in African Healthcare Settings",
    authors: ["Eberechi Wogu", "Grace Okonjo", "Ronald Kamoga"],
    journal: "Frontiers in Neural Engineering",
    year: 2023,
    doi: "10.3389/fneur.2023.67890",
    abstract: "A comprehensive review of brain-computer interface applications in African healthcare settings, highlighting challenges and opportunities for implementation.",
    keywords: ["BCI", "healthcare", "neural engineering", "Africa"],
    category: "journal",
    type: "network"
  },
  {
    title: "Analysis of Brain Development Patterns Using the ABDN-1K Dataset",
    authors: ["Research Group A", "ABDN Data Science Team"],
    journal: "NeuroImage",
    year: 2023,
    doi: "10.1016/j.neuroimage.2023.56789",
    abstract: "Using the ABDN-1K dataset, this study reveals unique patterns of brain development in African populations, with implications for understanding neurodevelopmental disorders.",
    keywords: ["brain development", "neuroimaging", "data analysis", "ABDN dataset"],
    category: "journal",
    type: "abdn",
    dataset: {
      name: "ABDN-1K Dataset",
      description: "Analysis subset focusing on developmental patterns",
      link: "https://data.abdn.org/datasets/abdn1k/developmental"
    }
  }
];

export default function Publications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'abdn' | 'network'>('all');

  const filteredPublications = publications.filter(pub => {
    const matchesSearch = searchTerm === '' || 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.authors.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || pub.category === selectedCategory;
    const matchesYear = !selectedYear || pub.year === selectedYear;
    const matchesType = selectedType === 'all' || pub.type === selectedType;

    return matchesSearch && matchesCategory && matchesYear && matchesType;
  });

  const years = Array.from(new Set(publications.map(p => p.year))).sort((a, b) => b - a);
  const categories = Array.from(new Set(publications.map(p => p.category)));

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
              Research Publications
                </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl text-amber-100 max-w-3xl mx-auto"
            >
                Explore groundbreaking neuroscience research from ABDN and our network members
            </motion.p>
          </div>
        </div>
      </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500" />
                <input
                  type="text"
                  placeholder="Search publications by title, author, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as 'all' | 'abdn' | 'network')}
                  className="px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-amber-900"
                >
                  <option value="all">All Publications</option>
                  <option value="abdn">ABDN Publications</option>
                  <option value="network">Network Publications</option>
                </select>
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-amber-900"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedYear || ''}
                  onChange={(e) => setSelectedYear(Number(e.target.value) || null)}
                  className="px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-amber-900"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Publications List */}
        <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {filteredPublications.map((publication, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            publication.type === 'abdn' 
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-amber-50 text-amber-700'
                          }`}>
                            {publication.type === 'abdn' ? 'ABDN Publication' : 'Network Publication'}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            {publication.category.charAt(0).toUpperCase() + publication.category.slice(1)}
                          </span>
                          <span className="flex items-center text-amber-600 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            {publication.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-amber-900 mb-2">
                          {publication.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                          <User2 className="h-4 w-4 text-amber-600" />
                          <p className="text-amber-600">
                            {publication.authors.join(', ')}
                          </p>
                </div>
                        <p className="text-amber-700 mb-4">
                          {publication.abstract}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {publication.keywords.map((keyword, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 rounded-full text-xs bg-amber-50 text-amber-700 border border-amber-200"
                            >
                              {keyword}
                            </span>
                          ))}
                    </div>
                        <div className="flex items-center gap-4 flex-wrap">
                          <p className="text-amber-600 italic">
                            {publication.journal}
                          </p>
                          {publication.doi && (
                            <a
                              href={`https://doi.org/${publication.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-amber-600 hover:text-amber-800 transition-colors"
                            >
                              <BookText className="h-4 w-4 mr-1" />
                              <span className="text-sm">DOI</span>
                              <ArrowUpRight className="h-4 w-4 ml-1" />
                            </a>
                          )}
                          {publication.dataset && (
                            <a
                              href={publication.dataset.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-amber-600 hover:text-amber-800 transition-colors group"
                            >
                              <Database className="h-4 w-4 mr-1" />
                              <span className="text-sm">{publication.dataset.name}</span>
                              <ArrowUpRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          )}
                    </div>
                    </div>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
    </Layout>
  );
}
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { seoConfig } from '../config/seo';
import { Megaphone, Calendar, Award, Database, Search, ArrowRight, BookOpen, Globe, FileText, Activity } from 'lucide-react';

interface Announcement {
  id: string;
  category: 'Opportunities' | 'News';
  title: string;
  date: string;
  summary: string;
  content: string;
  icon: React.ComponentType<any>;
  badgeColor: string;
  link?: string;
  linkText?: string;
}

const announcementsData: Announcement[] = [
  {
    id: '1',
    category: 'Opportunities',
    title: '2026 ABDN Research Fellowships (Call Closed)',
    date: 'December 2026',
    summary: 'The application call is now closed. The selected cohort fellowship event will take place this December.',
    content: 'Applications for the 2026 African Brain Data Network (ABDN) Research Fellowships are now closed. We want to thank all applicants for their outstanding submissions. The selection panel is currently reviewing proposals, and details will be shared soon. The core cohort program and fellowship event will launch this December 2026.',
    icon: Award,
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  },
  {
    id: '3',
    category: 'Opportunities',
    title: 'fNIRS Device Access Initiative',
    date: 'Ongoing',
    summary: 'African researchers and institutions can request to borrow portable fNIRS (Mendi) neurofeedback devices for scientific and clinical research projects.',
    content: 'As part of our commitment to supporting neuroscience research infrastructure across Africa, ABDN is offering an equipment loan program for portable Mendi fNIRS (functional Near-Infrared Spectroscopy) devices. Approved member researchers and partner institutions can borrow these portable devices to collect real-time brain activity data. To learn more about the technical specifications, eligibility, and terms, explore our Research Infrastructure portal.',
    icon: Activity,
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    link: '/academy/infrastructure',
    linkText: 'Explore & Borrow Device'
  },
  {
    id: '2',
    category: 'News',
    title: 'Policy Brief Published: Who Owns African Brain Data?',
    date: 'July 2, 2026',
    summary: 'ABDN has published a new Policy Brief synthesising insights and actionable recommendations on brain data governance, ownership, and equity in Africa.',
    content: 'Developed following a high-level webinar convened by the African Brain Data Network (ABDN), this outcome-oriented policy brief translates multidisciplinary perspectives into clear, actionable recommendations for policymakers, research institutions, funders, and international partners. It outlines key governance frameworks needed to ensure African brain data initiatives benefit the continent\'s scientific community.',
    icon: FileText,
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    link: 'https://osf.io/8fqvp/files/r9mg4',
    linkText: 'Read Policy Brief (OSF)'
  },
  // {
  //   id: '4',
  //   category: 'News',
  //   title: 'ABDN Academy Launches Interactive Online Portal',
  //   date: 'April 10, 2026',
  //   summary: 'Our educational wing, ABDS Academy, has launched an interactive e-learning platform with curated neuroimaging curricula.',
  //   content: 'ABDS Academy is proud to announce the soft launch of our new online learning portal. African students and researchers can now access structured courses in MRI, EEG, fNIRS, and neuroinformatics, complete with interactive coding notebooks and video lectures.',
  //   icon: BookOpen,
  //   badgeColor: 'bg-purple-100 text-purple-800 border-purple-200'
  // }
];

export default function Announcements() {
  const seo = seoConfig.announcements;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['All', 'Opportunities', 'News'];

  const filteredAnnouncements = announcementsData.filter(ann => {
    const matchesCategory = selectedCategory === 'All' || ann.category === selectedCategory;
    const matchesSearch = ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        url={seo.url}
      />
      <Layout>
        <main className="pt-28 pb-24 min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-amber-100/60 border border-amber-200/50 px-4 py-1.5 rounded-full text-amber-800 font-semibold text-sm mb-4 shadow-sm"
              >
                <Megaphone className="w-4 h-4 text-amber-700 animate-pulse" />
                <span>Stay Updated</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl font-extrabold text-amber-950 tracking-tight mb-4"
              >
                Announcements & Updates
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-amber-800/80"
              >
                Discover current fellowships, upcoming academic events, dataset releases, and core updates from our African neuroscience network.
              </motion.p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-amber-100/50 shadow-sm">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedCategory === category
                        ? 'bg-amber-900 text-white shadow-md shadow-amber-900/10'
                        : 'bg-amber-50/50 hover:bg-amber-100/50 text-amber-900 border border-amber-100/30'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search announcements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-amber-50/30 border border-amber-100/60 rounded-xl py-2.5 pl-10 pr-4 text-sm text-amber-950 placeholder-amber-700/50 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-600 transition-all duration-200"
                />
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-amber-700/50" />
              </div>
            </div>

            {/* Announcements List */}
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredAnnouncements.length > 0 ? (
                  filteredAnnouncements.map((ann, index) => {
                    const Icon = ann.icon;
                    const isExpanded = expandedId === ann.id;

                    return (
                      <motion.div
                        key={ann.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="bg-white rounded-2xl border border-amber-100/50 hover:border-amber-200/60 p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl text-amber-800 shadow-sm">
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${ann.badgeColor}`}>
                                {ann.category}
                              </span>
                              <div className="flex items-center text-xs text-amber-700/60 mt-1">
                                <Calendar className="w-3.5 h-3.5 mr-1" />
                                {ann.date}
                              </div>
                            </div>
                          </div>
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold text-amber-950 mb-3 hover:text-amber-700 transition-colors">
                          {ann.title}
                        </h2>

                        <p className="text-amber-800/80 mb-4 leading-relaxed">
                          {ann.summary}
                        </p>

                        {/* Collapsible Content */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-2 pb-4 border-t border-amber-100/50 mt-4 text-amber-900/80 leading-relaxed text-sm md:text-base">
                                <p>{ann.content}</p>
                                {ann.link && (
                                  <div className="mt-4">
                                    {ann.link.startsWith('http') ? (
                                      <a
                                        href={ann.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center space-x-1.5 px-4 py-2 bg-amber-900 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors duration-200"
                                      >
                                        <span>{ann.linkText || 'Read More'}</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                      </a>
                                    ) : (
                                      <Link
                                        to={ann.link}
                                        className="inline-flex items-center space-x-1.5 px-4 py-2 bg-amber-900 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors duration-200"
                                      >
                                        <span>{ann.linkText || 'Read More'}</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                      </Link>
                                    )}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <button
                          onClick={() => toggleExpand(ann.id)}
                          className="flex items-center text-sm font-semibold text-amber-800 hover:text-amber-600 transition-colors group mt-2"
                        >
                          <span>{isExpanded ? 'Show Less' : 'Read Full Announcement'}</span>
                          <ArrowRight className={`w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1 ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div
                    layout
                    className="text-center py-16 bg-white rounded-2xl border border-amber-100/30"
                  >
                    <Megaphone className="w-12 h-12 text-amber-200 mx-auto mb-4" />
                    <p className="text-amber-850 font-semibold text-lg">No announcements found</p>
                    <p className="text-amber-700/60 text-sm mt-1">Try resetting the filters or modifying your search query.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subscription Box */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16 bg-gradient-to-br from-amber-900 to-amber-950 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),transparent_50%)]" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <Megaphone className="w-10 h-10 text-amber-400 mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Never Miss an Update</h3>
                <p className="text-amber-200/80 mb-6 text-sm md:text-base">
                  Subscribe to our mailing list to receive notification alerts about new fellowship programs, events, and data repository announcements.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-grow px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
                  />
                  <button className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold px-6 py-3 rounded-xl transition-colors duration-200 shadow-lg text-sm shrink-0">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </main>
      </Layout>
    </>
  );
}

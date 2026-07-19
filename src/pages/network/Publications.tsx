import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookText, Calendar, User2, ArrowUpRight, Filter, X, Database, FileText } from 'lucide-react';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import { seoConfig } from '../../config/seo';

interface Publication {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  abstract: string;
  keywords: string[];
  category: 'journal' | 'conference' | 'book' | 'thesis';
  type: 'abdn' | 'network';
  link?: string;
  dataset?: {
    name: string;
    description: string;
    link?: string;
  };
}

const publications: Publication[] = [

  {
    title: "Who Owns African Brain Data? (Policy Brief)",
    authors: [
      "Damian Eke",
      "Olivia P. Matshabane",
      "Patrick Filima",
      "Alfred K. Njamnshi",
      "Barisua Nsaanee",
      "Eman Khalil",
      "Chinyem Nkemjika Ighodaro",
      "Teketel Eristu Kediso",
      "Eberechi Wogu",
      "Ahmed Unshur",
      "Amadi Ogonda Ihunwo"
    ],
    journal: "ABDN Policy Brief",
    year: 2025,
    abstract: "This policy brief was developed following a high-level webinar convened by the African Brain Data Network (ABDN) titled “Who Owns African Brain Data?”. The webinar brought together a diverse group of actors, including neuroscientists, data scientists, ethicists, policymakers, legal scholars, and representatives from Africa-based and international research collaborations, to critically examine questions of brain data ownership, governance, and equity in the African context.\n\nThis brief synthesises key insights, debates, and recommendations that emerged during these discussions, complemented by targeted engagement with key partners in Africa and ongoing initiatives in brain data science and governance. Developed as an outcome-oriented document, this policy brief aims to translate multidisciplinary perspectives into clear, actionable recommendations for policymakers, research institutions, funders, and international partners. It reflects ABDN's commitment to advancing responsible, inclusive, and context-sensitive approaches to brain data governance that prioritises African leadership, interests, and long-term scientific development.",
    keywords: ["policy brief", "brain data ownership", "governance", "equity", "Africa"],
    category: "journal",
    type: "abdn",
    link: "https://osf.io/8fqvp/files/r9mg4"
  },
 

  {
    title: "A labeled Clinical-MRI dataset of Nigerian brains",
    authors: ["Eberechi Wogu", "Patrick Leo Filima", "Brad Caron", "Franco Pestilli"],
    journal: "Scientific Data",
    year: 2023,
    abstract: "There is currently a paucity of neuroimaging data from the African continent, limiting the diversity of data from a significant proportion of the global population. This in turn diminishes global health research and innovation. To address this issue, we present and describe the first Magnetic Resonance Imaging (MRI) dataset from individuals in the African nation of Nigeria. This dataset contains pseudonymized structural MRI (T1w, T2w, FLAIR) data of clinical quality, with 35 images from healthy control subjects, 31 images from individuals diagnosed with age-related dementia, and 22 from individuals with Parkinson's Disease. Given the potential for Africa to contribute to the global neuroscience community, this unique MRI dataset represents both an opportunity and benchmark for future studies to share data from the African continent.",
    keywords: ["neuroimaging", "dataset", "MRI", "Nigeria", "clinical data"],
    category: "journal",
    type: "abdn",
    dataset: {
      name: "Nigerian Brain Dataset",
      description: "Clinical MRI dataset from Nigerian participants",
      link: "https://data.abdn.org/datasets/nigerian-brains"
    },
    link:'https://pubmed.ncbi.nlm.nih.gov/37986723/',
  },

  {
    title: "Trustworthy AI in Healthcare: Exploring Ethics in Digital Health Technologies in Nigeria",
    authors: ["Ayomide J. Owoyemi", "Eugeniah Arthur", "Temitope Wunmi Ladi-Akinyemi", "Damian Eke"],
    journal: "Book Chapter",
    year: 2024,
    abstract: "The rapid expansion of digital health solutions in Africa, encompassing telemedicine, AI, and other technologies, aligns with WHO's Goals for Sustainable Development and Universal Health Coverage. Despite its benefits, this growth raises ethical concerns regarding deploying these technologies. A cross-sectional survey targeting executives of Nigerian digital health startups was conducted using Google Forms. The survey focused on startup characteristics, data management, ethical/legal governance, and user engagement. Data analysis employed descriptive statistics and cross-tabulation in R. The survey included 16 startups, primarily focusing on care provision (56%) and health data analytics (31%). Most store data internationally, with 18% integrating AI/ML in their products. Ethical concerns varied, with half of the startups having ethics/legal governance units and 56% showing high ethical concerns. Findings indicate a preference for international data storage, highlighting data sovereignty and privacy issues. While over half of the startups use anonymisation methods, challenges like non-consensual data collection remain. The study reveals a gap between ethical concerns and the practical implementation of ethical governance. This study sheds light on the operational and ethical dynamics of digital health startups in Nigeria. It underscores the need for policies and frameworks to cultivate a responsible digital health ecosystem, emphasising user-centric approaches and ethical considerations.",
    keywords: ["AI", "healthcare", "ethics", "digital health", "Nigeria"],
    category: "book",
    type: "abdn",
    link:"https://link.springer.com/chapter/10.1007/978-3-031-75674-0_9"
  },

  {
    title: "FAIR African brain data: challenges and opportunities",
    authors: ["Eberechi Wogu", "George Inyila Ogoh", "Patrick Leo Filima", "Damian Eke"],
    journal: "Frontiers in Neuroinformatics",
    year: 2024,
    abstract: "Introduction The effectiveness of research and innovation often relies on the diversity or heterogeneity of datasets that are Findable, Accessible, Interoperable and Reusable (FAIR). However, the global landscape of brain data is yet to achieve desired levels of diversity that can facilitate generalisable outputs. Brain datasets from low-and middle-income countries of Africa are still missing in the global open science ecosystem. This can mean that decades of brain research and innovation may not be generalisable to populations in Africa. Methods This research combined experiential learning or experiential research with a survey questionnaire. The experiential research involved deriving insights from direct, hands-on experiences of collecting African Brain data in view of making it FAIR. This was a critical process of action, reflection, and learning from doing data collection. A questionnaire was then used to validate the findings from the experiential research and provide wider contexts for these findings. Results The experiential research revealed major challenges to FAIR African brain data that can be categorised as socio-cultural, economic, technical, ethical and legal challenges. It also highlighted opportunities for growth that include capacity development, development of technical infrastructure, funding as well as policy and regulatory changes. The questionnaire then showed that the wider African neuroscience community believes that these challenges can be ranked in order of priority as follows: Technical, economic, socio-cultural and ethical and legal challenges. Conclusion We conclude that African researchers need to work together as a community to address these challenges in a way to maximise efforts and to build a thriving FAIR brain data ecosystem that is socially acceptable, ethically responsible, technically robust and legally compliant.",
    keywords: ["FAIR data", "neuroinformatics", "data sharing", "Africa"],
    category: "journal",
    type: "abdn",
    link: "https://www.frontiersin.org/journals/neuroinformatics/articles/10.3389/fninf.2025.1530445/full"
  },
  {
    title: "Trustworthy AI-African Perspectives",
    authors: ["Damian Eke", "Kutoma Wakunuma", "Simisola Akintoye", "George Inyila Ogoh"],
    journal: "Book",
    year: 2024,
    abstract: "This book is an Open Access Publication. The Guidelines for Trustworthy AI developed by the European Commission High-Level Expert Group on AI is a framework that has been developed to promote and achieve the trustworthiness of AI systems. It provides seven ethical principles that can be operationalised in socio-technical systems to realise responsible AI design and deployment. The content of this book is shaped around these principles. In chapter one, the concept of Human Agency and oversight will be described from the lens of a social-cultural understanding of Agency, Autonomy, and oversight including a debate on the place of human rights and power dynamics. Beyond the Trustworthy AI discourse, this book will appeal to the wider AI developers community, civil society, policymakers, ICT and the RRI community. It will also appeal to other subject areas within the Social Sciences and Humanities including; Law and Technology and Digital Culture.",
    keywords: ["AI", "trustworthy AI", "ethics", "governance"],
    category: "book",
    type: "abdn",
    link:"https://www.researchgate.net/publication/389414020_African_Perspectives_of_Trustworthy_AI_An_Introduction"
  },
  {
    title: "Ethics and Governance of Neurotechnology in Africa: Lessons From AI",
    authors: ["Damian Eke"],
    journal: "JMIR Neurotechnology",
    year: 2024,
    abstract: "As a novel technology frontier, neurotechnology is revolutionizing our perceptions of the brain and nervous system. With growing private and public investments, a thriving ecosystem of direct-to-consumer neurotechnologies has also emerged. These technologies are increasingly being introduced in many parts of the world, including Africa. However, as the use of this technology expands, neuroethics and ethics of emerging technology scholars are bringing attention to the critical concerns it raises. These concerns are largely not new but are uniquely amplified by the novelty of technology. They include ethical and legal issues such as privacy, human rights, human identity, bias, autonomy, and safety, which are part of the artificial intelligence ethics discourse. Most importantly, there is an obvious lack of regulatory oversight and a dearth of literature on the consideration of contextual ethical principles in the design and application of neurotechnology in Africa. This paper highlights lessons African stakeholders need to learn from the ethics and governance of artificial intelligence to ensure the design of ethically responsible and socially acceptable neurotechnology in and for Africa.",
    keywords: ["neurotechnology", "ethics", "governance", "AI"],
    category: "journal",
    type: "abdn",
    link:"https://neuro.jmir.org/2024/1/e56665",
  },
  {
    title: "Responsible Neurotechnology",
    authors: ["Damian Eke", "Eberechi Wogu", "Eman Khalil", "Barisua Nsaane"],
    journal: "Article",
    year: 2024,
    abstract: "This is the African Brain Data Network's (ABDN) response to the Global consultation on the first draft of the UNESCO Recommendation on the Ethics of Neurotechnology. It covers the provisions or points we agree with and those we believe need to be strengthened or modified to ensure that the Recommendation is inclusive and representative of the diverse perspectives and needs of different regions, particularly Africa.",
    keywords: ["neurotechnology", "ethics", "governance", "UNESCO"],
    category: "journal",
    type: "abdn",
    link:"https://www.researchgate.net/publication/382878725_Responsible_Neurotechnology_1_1"
  }
];

export default function Publications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const seo = seoConfig.publications;
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
              <div className="flex gap-4">
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
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
                  onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
                  className="px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as 'all' | 'abdn' | 'network')}
                  className="px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  <option value="all">All Types</option>
                  <option value="abdn">ABDN Publications</option>
                  <option value="network">Network Publications</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Publications List */}
        <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {selectedType === 'network' && (
              <div className="mb-8 p-4 bg-amber-100 rounded-lg">
                <p className="text-amber-800 text-center">
                  Network publications are coming soon. Stay tuned for updates from our partner institutions.
                </p>
              </div>
            )}
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
                         
                          {publication.link && (
                            <a
                              href={publication.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-amber-600 hover:text-amber-800 transition-colors group"
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              <span className="text-sm">Read Article</span>
                              <ArrowUpRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
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
    </>
  );
}
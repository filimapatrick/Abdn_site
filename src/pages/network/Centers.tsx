import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Microscope, Globe, Building2, Network, GraduationCap, Brain } from 'lucide-react';
import Layout from '../../components/Layout';

interface Center {
  name: string;
  location: string;
  specialization: string;
  researchers: number;
  image: string;
  description: string;
  facilities?: string[];
}

interface Coordinator {
  country: string;
  institution: string;
  region: 'West' | 'East' | 'North' | 'South' | 'Central';
  flag: string;
}

const centers: Center[] = [
  {
    name: "ABDN Neuroimaging Hub",
    location: "Port Harcourt, Nigeria",
    specialization: "Advanced Brain Imaging",
    researchers: 25,
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80",
    description: "Our primary neuroimaging facility equipped with state-of-the-art MRI technology and data processing capabilities.",
    facilities: [
      "3T MRI Scanner",
      "High-Performance Computing Cluster",
      "Data Analysis Laboratory",
      "Training Center"
    ]
  },
  {
    name: "Rivers State Neuroscience Center",
    location: "Port Harcourt, Nigeria",
    specialization: "Clinical Neuroscience Research",
    researchers: 18,
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80",
    description: "Specialized center focusing on clinical applications of neuroimaging research and biomarker development.",
    facilities: [
      "Clinical Research Unit",
      "Biospecimen Repository",
      "Neuropsychology Lab",
      "Patient Assessment Facilities"
    ]
  },
  {
    name: "ABDN Data Science Center",
    location: "Port Harcourt, Nigeria",
    specialization: "Neuroinformatics",
    researchers: 15,
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80",
    description: "Advanced computing facility dedicated to neuroimaging data analysis and machine learning applications.",
    facilities: [
      "GPU Computing Cluster",
      "Secure Data Storage",
      "Virtual Reality Lab",
      "Collaborative Workspace"
    ]
  }
];

const coordinators: Coordinator[] = [
  { country: "Nigeria", institution: "University of Port Harcourt", region: "West", flag: "🇳🇬" },
  { country: "Ghana", institution: "University of Ghana", region: "West", flag: "🇬🇭" },
  { country: "Kenya", institution: "University of Nairobi", region: "East", flag: "🇰🇪" },
  { country: "South Africa", institution: "University of Cape Town", region: "South", flag: "🇿🇦" },
  { country: "Egypt", institution: "Cairo University", region: "North", flag: "🇪🇬" },
  { country: "Ethiopia", institution: "Addis Ababa University", region: "East", flag: "🇪🇹" },
  { country: "Senegal", institution: "Cheikh Anta Diop University", region: "West", flag: "🇸🇳" },
  { country: "Tanzania", institution: "University of Dar es Salaam", region: "East", flag: "🇹🇿" },
  { country: "Uganda", institution: "Makerere University", region: "East", flag: "🇺🇬" },
  { country: "Morocco", institution: "Mohammed V University", region: "North", flag: "🇲🇦" },
  { country: "Cameroon", institution: "University of Yaoundé", region: "Central", flag: "🇨🇲" },
  { country: "Zimbabwe", institution: "University of Zimbabwe", region: "South", flag: "🇿🇼" },
  { country: "Sudan", institution: "University of Khartoum", region: "North", flag: "🇸🇩" },
  { country: "Rwanda", institution: "University of Rwanda", region: "East", flag: "🇷🇼" },
  { country: "Tunisia", institution: "University of Tunis", region: "North", flag: "🇹🇳" },
  { country: "Democratic Republic of Congo", institution: "University of Kinshasa", region: "Central", flag: "🇨🇩" },
  { country: "Mali", institution: "University of Bamako", region: "West", flag: "🇲🇱" },
  { country: "Zambia", institution: "University of Zambia", region: "South", flag: "🇿🇲" },
];

export default function Centers() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-amber-950 to-amber-800">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Our Research Network
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl text-amber-100 max-w-3xl mx-auto"
            >
              Connecting leading neuroscience facilities in Port Harcourt with research partners across Africa
            </motion.p>
          </div>
        </div>
      </section>

      {/* Port Harcourt Centers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900">Port Harcourt Research Centers</h2>
            <p className="mt-2 text-lg text-amber-700">Our state-of-the-art facilities advancing African neuroscience</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {centers.map((center, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={center.image}
                    alt={center.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-2">{center.name}</h3>
                  <div className="space-y-2 text-sm text-amber-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-amber-500" />
                      <span>{center.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Microscope className="h-4 w-4 mr-2 text-amber-500" />
                      <span>{center.specialization}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-amber-500" />
                      <span>{center.researchers} Researchers</span>
                    </div>
                  </div>
                  <p className="text-amber-700 mb-4">{center.description}</p>
                  {center.facilities && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-amber-900">Key Facilities:</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {center.facilities.map((facility, i) => (
                          <li key={i} className="flex items-center text-sm text-amber-600">
                            <Building2 className="h-3 w-3 mr-1 text-amber-500" />
                            {facility}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* National Coordinators Section */}
      <section className="py-24 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900">National Coordinators</h2>
            <p className="mt-2 text-lg text-amber-700">Our network spans across 15 African countries</p>
          </div>
          
          {/* Region Tabs */}
          <div className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {(['All', 'West', 'East', 'North', 'South', 'Central'] as const).map((region) => (
                <button
                  key={region}
                  className="px-4 py-2 rounded-lg bg-white shadow-sm hover:bg-amber-100 text-amber-900 transition-colors"
                >
                  {region} Africa
                </button>
              ))}
            </div>
          </div>

          {/* Coordinators Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {coordinators.map((coordinator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-2">{coordinator.flag}</div>
                <h3 className="font-semibold text-amber-900">{coordinator.country}</h3>
                <p className="text-sm text-amber-600">{coordinator.institution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-amber-50 p-6 rounded-xl"
            >
              <Building2 className="h-8 w-8 text-amber-600 mb-4" />
              <div className="text-2xl font-bold text-amber-900 mb-2">3</div>
              <div className="text-amber-700">Research Centers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-amber-50 p-6 rounded-xl"
            >
              <Network className="h-8 w-8 text-amber-600 mb-4" />
              <div className="text-2xl font-bold text-amber-900 mb-2">15+</div>
              <div className="text-amber-700">Partner Countries</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-amber-50 p-6 rounded-xl"
            >
              <GraduationCap className="h-8 w-8 text-amber-600 mb-4" />
              <div className="text-2xl font-bold text-amber-900 mb-2">50+</div>
              <div className="text-amber-700">Researchers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-amber-50 p-6 rounded-xl"
            >
              <Brain className="h-8 w-8 text-amber-600 mb-4" />
              <div className="text-2xl font-bold text-amber-900 mb-2">20+</div>
              <div className="text-amber-700">Active Projects</div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
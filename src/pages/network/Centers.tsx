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
    name: "ABDN Neuroimaging Center",
    location: "Port Harcourt, Nigeria",
    specialization: "Advanced Brain Imaging",
    researchers: 8,
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80",
    description: "Our emerging  facility, currently in its initial phase of development. We are establishing a foundation for advanced brain research in West Africa, with plans to expand our capabilities and research scope in the coming years.",
    facilities: [
      "MRI Research",
      "Initial Computing Infrastructure",
      "Training Space",
      "Research Planning Center"
    ]
  },

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
      <section className="relative py-32 md:py-40 bg-gradient-to-br from-amber-950 to-amber-800">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
            >
              Our Research Network
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl md:text-2xl text-amber-100 max-w-4xl mx-auto px-4"
            >
              Connecting leading neuroscience facilities in Port Harcourt with research partners across Africa
            </motion.p>
          </div>
        </div>
      </section>

      {/* Port Harcourt Center */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900">Port Harcourt Research Center</h2>
            <p className="mt-2 text-lg text-amber-700">Building the foundation for advanced neuroscience research in West Africa</p>
          </div>
          
          {centers.map((center, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-full min-h-[300px]">
                  <img
                    src={center.image}
                    alt={center.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-amber-900 mb-4">{center.name}</h3>
                    <div className="space-y-3 text-sm text-amber-600 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-amber-500" />
                        <span>{center.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Microscope className="h-5 w-5 mr-2 text-amber-500" />
                        <span>{center.specialization}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-amber-500" />
                        <span>{center.researchers} Core Researchers</span>
                      </div>
                    </div>
                    <p className="text-amber-700 mb-6">{center.description}</p>
                    {center.facilities && (
                      <div>
                        <h4 className="font-semibold text-amber-900 mb-3">Initial Facilities:</h4>
                        <ul className="list-disc list-inside space-y-2 text-sm text-amber-600">
                          {center.facilities.map((facility, idx) => (
                            <li key={idx}>{facility}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

       {/* Student Research Opportunities */}
       <section className="py-24 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-full min-h-[400px]">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80"
                  alt="Students conducting research"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-amber-900 mb-4">Empowering Young Researchers</h3>
                <p className="text-amber-700 mb-6">
                  We are committed to nurturing the next generation of African neuroscientists. Our center provides unique opportunities for undergraduate students to engage in cutting-edge brain research, offering:
                </p>
                <ul className="space-y-4 text-amber-600">
                  <li className="flex items-start">
                    <GraduationCap className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                    <span>Hands-on research experience in neuroimaging and data analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                    <span>Mentorship from experienced researchers and faculty members</span>
                  </li>
                  <li className="flex items-start">
                    <Brain className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                    <span>Participation in ongoing research projects and publications</span>
                  </li>
                  <li className="flex items-start">
                    <Globe className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                    <span>Connection to a network of African neuroscience institutions</span>
                  </li>
                </ul>
                <button className="mt-8 self-start bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300">
                  Join Our Research Program
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* National Coordinators Section */}
      <section className="py-24 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900">National Coordinators</h2>
            <p className="mt-2 text-lg text-amber-700">Our network spans across 20+ African countries</p>
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
              <div className="text-2xl font-bold text-amber-900 mb-2">1</div>
              <div className="text-amber-700">Research Center</div>
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
              <div className="text-2xl font-bold text-amber-900 mb-2">8</div>
              <div className="text-amber-700">Core Researchers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-amber-50 p-6 rounded-xl"
            >
              <Brain className="h-8 w-8 text-amber-600 mb-4" />
              <div className="text-2xl font-bold text-amber-900 mb-2">5+</div>
              <div className="text-amber-700">Initial Projects</div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
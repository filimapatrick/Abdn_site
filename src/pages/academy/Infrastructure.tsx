import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Server, 
  Shield, 
  Users, 
  Heart,
  Building,
  Globe,
  ChevronRight,
  Mail,
  Phone,
  CheckCircle2
} from 'lucide-react';
import Layout from '../../components/Layout';
import InfrastructureContributionForm from '../../components/InfrastructureContributionForm';

export default function Infrastructure() {
  return (
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
                className="text-4xl md:text-6xl font-bold mb-6 text-white"
              >
                Research Infrastructure
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl text-amber-100 max-w-3xl mx-auto"
              >
                Building the foundation for African neuroscience data sharing and research
              </motion.p>
            </div>
          </div>
        </section>

        {/* Current Infrastructure Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-lg overflow-hidden p-8 mb-16"
            >
              <h2 className="text-3xl font-bold text-amber-900 mb-6">Local Research Databases & Infrastructure</h2>
              <p className="text-lg text-amber-700 leading-relaxed mb-8">
                The ultimate goal of ABDN is to facilitate the establishment of relevant technical infrastructure for harmonised and responsible sharing of data. ABDN is seeking collaborations with funders, and organisations to establish culturally sensitive, ethically responsible, socially acceptable and legally compliant data repository in and for Africa. This will help in overcoming the emerging data protection ecosystem that often prevents some forms of data sharing.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Shield className="h-12 w-12 text-amber-600 mb-4" />
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">Data Protection</h3>
                  <p className="text-amber-700">Ensuring secure and compliant data storage and sharing practices</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Globe className="h-12 w-12 text-amber-600 mb-4" />
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">Cultural Sensitivity</h3>
                  <p className="text-amber-700">Respecting and incorporating African cultural values in data management</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Database className="h-12 w-12 text-amber-600 mb-4" />
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">Data Repository</h3>
                  <p className="text-amber-700">Working towards establishing an Africa-centric data repository</p>
                </div>
              </div>
            </motion.div>
          </div>
      </section>

        {/* Support Our Mission Section */}
      <section className="py-24 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-amber-900">Support Our Mission</h2>
                <p className="text-xl text-amber-700">
                  Help us build the infrastructure needed to advance African neuroscience research
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-amber-100 rounded-lg mt-1">
                      <Building className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-900">Infrastructure Support</h3>
                      <p className="text-amber-700">Contribute to establishing research facilities and data centers</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-amber-100 rounded-lg mt-1">
                      <Server className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-900">Equipment Donations</h3>
                      <p className="text-amber-700">Provide essential research equipment and computing resources</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-amber-900 mb-6">Make a Contribution</h3>
                <InfrastructureContributionForm />
              </motion.div>
            </div>
          </div>
      </section>

        {/* Contact Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-amber-900">Get in Touch</h2>
              <p className="mt-4 text-xl text-amber-700">
                Have questions about supporting ABDN? Contact our team directly.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-center space-x-4 justify-center">
                <Mail className="h-6 w-6 text-amber-600" />
                <a href="mailto:africanbraindatanetwork@gmail.com" className="text-amber-700 hover:text-amber-900">
                  africanbraindatanetwork@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-4 justify-center">
                <Phone className="h-6 w-6 text-amber-600" />
                <a href="tel:+1234567890" className="text-amber-700 hover:text-amber-900">
                  +123 456 7890
                </a>
              </div>
            </div>
          </div>
      </section>
    </main>
    </Layout>
  );
}
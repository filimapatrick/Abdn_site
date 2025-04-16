import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Target, 
  Link as LinkIcon, 
  Globe, 
  GraduationCap, 
  Brain,
  Building2,
  X,
  Mail,
  Phone,
  FileText,
  Send,
  CheckCircle2
} from 'lucide-react';
import Layout from '../../components/Layout';
import { submitCollaborationProposal } from '../../services/supportService';

interface Collaborator {
  name: string;
  type: 'academic' | 'society' | 'platform' | 'initiative';
  description: string;
  logo: string;
  website?: string;
  focus: string[];
}



export default function Collaborations() {
  const [showForm, setShowForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    projectIdea: '',
    type: 'research'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await submitCollaborationProposal(formData);
      setShowForm(false);
      setShowThankYou(true);
      // Reset form
      setFormData({
        name: '',
        institution: '',
        email: '',
        phone: '',
        projectIdea: '',
        type: 'research'
      });
    } catch (error) {
      setError('Failed to submit proposal. Please try again.');
      console.error('Error submitting proposal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                Our Collaborators
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl text-amber-100 max-w-3xl mx-auto"
              >
                Building strong partnerships to advance African neuroimaging research
              </motion.p>
             
            </div>
          </div>
        </section>


        {/* Institutional Collaborators Section */}
        <section className="py-24 bg-gradient-to-br from-white to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Institutional Collaborators</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Our network of collaborating institutions and organizations
              </p>
            </motion.div>

            {/* Technology Partners */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-amber-900 mb-8 text-center">Technology Partners</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img
                        src="/Assets/Partners/incf.jpeg"
                        alt="INCF"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-900 text-center">INCF</h3>
                      <p className="text-amber-700">International Neuroinformatics Coordinating Facility, supporting global neuroscience data sharing and analysis.</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-amber-900">Focus Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Data Standards</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Open Science</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Training</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Infrastructure</div>
                        </div>
                      </div>
                      <a
                        href="https://www.incf.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-600 hover:text-amber-800"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img
                        src="/Assets/Partners/CatalystNeuro.png"
                        alt="Catalyst Neuro"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-900 text-center">Catalyst Neuro</h3>
                      <p className="text-amber-700">A platform for neuroscience data sharing and collaboration, enabling researchers to work together effectively.</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-amber-900">Focus Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Data Sharing</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Collaboration</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Tools</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Community</div>
                        </div>
                      </div>
                      <a
                        href="https://www.catalystneuro.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-600 hover:text-amber-800"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img
                        src="/Assets/Partners/BrainLife.png"
                        alt="Brain Life"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-900 text-center">Brain Life</h3>
                      <p className="text-amber-700">A cloud platform for neuroscience data analysis and sharing, supporting ABDN's data processing needs.</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-amber-900">Focus Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Data Processing</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Cloud Computing</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Analysis Pipeline</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Open Science</div>
                        </div>
                      </div>
                      <a
                        href="https://brainlife.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-600 hover:text-amber-800"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img
                        src="/Assets/Partners/math.jpeg"
                        alt="MathWorks"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-900 text-center">MathWorks</h3>
                      <p className="text-amber-700">Provider of MATLAB and Simulink software, supporting computational neuroscience research and education.</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-amber-900">Focus Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Software Tools</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Training</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Research</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Education</div>
                        </div>
                      </div>
                      <a
                        href="https://www.mathworks.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-600 hover:text-amber-800"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Imaging Centers */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-amber-900 mb-8 text-center">Imaging Centers</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img
                        src="/Assets/Partners/LifeBridge.png"
                        alt="Life Bridge Diagnostics"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-900 text-center">Life Bridge Diagnostics</h3>
                      <p className="text-amber-700">A leading diagnostic imaging center providing advanced neuroimaging services and research support.</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-amber-900">Focus Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Clinical Imaging</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Research Support</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Training</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Technology</div>
                        </div>
                      </div>
                      <a
                        href="https://www.lifebridgediagnostics.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-600 hover:text-amber-800"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Universities */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-amber-900 mb-8 text-center">Universities</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img
                        src="/Assets/Partners/uniport.jpeg"
                        alt="University of Port Harcourt"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-900 text-center">University of Port Harcourt</h3>
                      <p className="text-amber-700">A leading Nigerian university collaborating on neuroscience research and education initiatives.</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-amber-900">Focus Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Research</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Education</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Training</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Outreach</div>
                        </div>
                      </div>
                      <a
                        href="https://www.uniport.edu.ng"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-600 hover:text-amber-800"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img
                        src="/Assets/Partners/luberk.png"
                        alt="University of Lübeck"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-900 text-center">University of Lübeck</h3>
                      <p className="text-amber-700">A German university known for its excellence in medical research and neuroimaging studies.</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-amber-900">Focus Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Medical Research</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Neuroimaging</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Training</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Collaboration</div>
                        </div>
                      </div>
                      <a
                        href="https://www.uni-luebeck.de"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-600 hover:text-amber-800"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img
                        src="/Assets/Partners/University_of_Texas_at_Austin_seal.svg.png"
                        alt="University of Texas"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-900 text-center">University of Texas</h3>
                      <p className="text-amber-700">A leading US university collaborating on neuroscience research and educational programs.</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-amber-900">Focus Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Research</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Education</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Technology</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Innovation</div>
                        </div>
                      </div>
                      <a
                        href="https://www.utexas.edu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-600 hover:text-amber-800"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img
                        src="/Assets/Partners/Nottingham-Logo.jpg"
                        alt="University of Nottingham"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-900 text-center">University of Nottingham</h3>
                      <p className="text-amber-700">A UK university known for its excellence in neuroscience research and medical imaging.</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-amber-900">Focus Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Neuroscience</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Medical Imaging</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Research</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Training</div>
                        </div>
                      </div>
                      <a
                        href="https://www.nottingham.ac.uk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-600 hover:text-amber-800"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img
                        src="/Assets/Partners/De_Montfort_University.png"
                        alt="De Montfort University"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-900 text-center">De Montfort University</h3>
                      <p className="text-amber-700">A UK university collaborating on neuroimaging research and educational initiatives.</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-amber-900">Focus Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Research</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Education</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Technology</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Innovation</div>
                        </div>
                      </div>
                      <a
                        href="https://www.dmu.ac.uk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-600 hover:text-amber-800"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img
                        src="/Assets/Partners/Lawrence-Technological-University.jpg"
                        alt="Lawrence Technological University"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-900 text-center">Lawrence Technological University</h3>
                      <p className="text-amber-700">A US university known for its expertise in technology and engineering, collaborating on neuroimaging research.</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-amber-900">Focus Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Technology</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Engineering</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Research</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Innovation</div>
                        </div>
                      </div>
                      <a
                        href="https://www.ltu.edu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-600 hover:text-amber-800"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img
                        src="/Assets/Partners/Radboud_University.avif"
                        alt="Radboud University"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-900 text-center">Radboud University</h3>
                      <p className="text-amber-700">A Dutch university known for its excellence in neuroscience and medical research.</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-amber-900">Focus Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Neuroscience</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Medical Research</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Education</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Collaboration</div>
                        </div>
                      </div>
                      <a
                        href="https://www.ru.nl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-600 hover:text-amber-800"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Organizations */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-amber-900 mb-8 text-center">Organizations</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img
                        src="/Assets/Partners/NSN.jpeg"
                        alt="NSN"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-900 text-center">NSN</h3>
                      <p className="text-amber-700">Neuroscience Society of Nigeria, promoting neuroscience research and education in Nigeria.</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-amber-900">Focus Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Research</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Education</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Advocacy</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Community</div>
                        </div>
                      </div>
                      <a
                        href="https://www.nsn.org.ng"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-600 hover:text-amber-800"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img
                        src="/Assets/Partners/SONA.jpeg"
                        alt="SONA"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-900 text-center">SONA</h3>
                      <p className="text-amber-700">Society of Neuroscientists of Africa, promoting neuroscience research and education across the continent.</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-amber-900">Focus Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Research</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Education</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Advocacy</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Community</div>
                        </div>
                      </div>
                      <a
                        href="https://www.sona.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-600 hover:text-amber-800"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Funders */}
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-8 text-center">Funders</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img
                        src="/Assets/Partners/the_kavli_logo.jpg"
                        alt="Kavli Foundation"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-900 text-center">Kavli Foundation</h3>
                      <p className="text-amber-700">A foundation supporting scientific research, particularly in neuroscience and astrophysics.</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-amber-900">Focus Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Research Funding</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Science Advocacy</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Education</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Innovation</div>
                        </div>
                      </div>
                      <a
                        href="https://www.kavlifoundation.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-600 hover:text-amber-800"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img
                        src="/Assets/Partners/IBRO_logo_main.svg"
                        alt="IBRO"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-900 text-center">IBRO</h3>
                      <p className="text-amber-700">International Brain Research Organization, supporting neuroscience research and education worldwide.</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-amber-900">Focus Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Research Funding</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Education</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Advocacy</div>
                          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Global Network</div>
                        </div>
                      </div>
                      <a
                        href="https://www.ibro.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-amber-600 hover:text-amber-800"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration Benefits */}
        <section className="py-24 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-amber-900">Why Collaborate with ABDN?</h2>
                <p className="text-xl text-amber-700">
                  Join our network to contribute to groundbreaking neuroimaging research in Africa
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-amber-100 rounded-lg">
                      <Brain className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-900">Access to Resources</h3>
                      <p className="text-amber-700">Access to Active and willing researchers all over Africa</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-amber-100 rounded-lg">
                      <Users className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-900">Expert Network</h3>
                      <p className="text-amber-700">Connect with leading researchers across Africa</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-amber-100 rounded-lg">
                      <GraduationCap className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-amber-900">Training Opportunities</h3>
                      <p className="text-amber-700">Access to workshops and skill development programs</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Start Collaboration
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="/Assets/Academy_2023/mri_with_pestilli.jpg"
                  alt="Collaboration"
                  className="rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                  <p className="text-amber-900 font-semibold">
                    "Join our mission to advance neuroscience research and training in Africa."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Collaboration Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-amber-900">Start a Collaboration</h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-amber-500 hover:text-amber-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-1">
                        Institution
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500" />
                        <input
                          type="text"
                          value={formData.institution}
                          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Enter your institution"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-1">
                        Phone (optional)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-1">
                        Collaboration Type
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="research">Research Collaboration</option>
                        <option value="training">Training Partnership</option>
                        <option value="data">Data Sharing</option>
                        <option value="technology">Technology Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-1">
                        Project Idea
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 h-5 w-5 text-amber-500" />
                        <textarea
                          value={formData.projectIdea}
                          onChange={(e) => setFormData({ ...formData, projectIdea: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Describe your collaboration idea"
                          rows={4}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm mt-2">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Submit Proposal
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {/* Thank You Popup */}
        <AnimatePresence>
          {showThankYou && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-8 text-center"
              >
                <div className="flex justify-center mb-6">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-amber-900 mb-4">
                  Thank You for Your Proposal!
                </h3>
                <p className="text-amber-700 mb-6">
                  Your collaboration proposal has been submitted successfully. 
                  Our team will review your proposal and get back to you soon.
                </p>
                <button
                  onClick={() => setShowThankYou(false)}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center text-lg font-semibold"
                >
                  Close
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </Layout>
  );
}
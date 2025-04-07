import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Send
} from 'lucide-react';
import Layout from '../../components/Layout';

interface Collaborator {
  name: string;
  type: 'academic' | 'society' | 'platform' | 'initiative';
  description: string;
  logo: string;
  website?: string;
  focus: string[];
}

const collaborators: Collaborator[] = [
  {
    name: "De Montfort University",
    type: "academic",
    description: "A leading UK university partnering with ABDN to advance neuroimaging research and training in Africa.",
    logo: "/Assets/Partners/dmu-logo.png",
    website: "https://www.dmu.ac.uk",
    focus: [
      "Research Methodology",
      "Training Programs",
      "Knowledge Exchange",
      "Joint Publications"
    ]
  },
  {
    name: "Neuroscience Society of Nigeria (NSN)",
    type: "society",
    description: "Nigeria's premier neuroscience organization collaborating on research initiatives and professional development.",
    logo: "/Assets/Partners/nsn.jpg",
    website: "https://www.nsn.org.ng",
    focus: [
      "Local Research Network",
      "Scientific Meetings",
      "Policy Advocacy",
      "Capacity Building"
    ]
  },
  {
    name: "Brainlife.io",
    type: "platform",
    description: "A cloud platform for neuroscience data analysis and sharing, supporting ABDN's data processing needs.",
    logo: "/Assets/Partners/brainlife.jpg",
    website: "https://brainlife.io",
    focus: [
      "Data Processing",
      "Cloud Computing",
      "Analysis Pipeline",
      "Open Science"
    ]
  },
  {
    name: "Brain Wellness Initiative",
    type: "initiative",
    description: "A collaborative program focused on brain health awareness and research in African communities.",
    logo: "/Assets/Partners/brain_wellness_initative.jpg",
    website: "https://brainwellness.org",
    focus: [
      "Community Engagement",
      "Health Education",
      "Research Translation",
      "Public Outreach"
    ]
  },
  {
    name: "SONA",
    type: "society",
    description: "Society of Neuroscientists of Africa, partnering to promote neuroscience research across the continent.",
    logo: "/Assets/Partners/Sona.jpg",
    website: "https://www.sona.org",
    focus: [
      "Pan-African Network",
      "Research Collaboration",
      "Training Workshops",
      "Resource Sharing"
    ]
  },
  {
    name: "Nottingham University",
    type: "academic",
    description: "A leading UK university partnering with ABDN to advance neuroimaging research and training in Africa.",
    logo: "/Assets/Partners/Nottingham.jpg",
    website: "https://www.nottingham.ac.uk",
    focus: [
      "Research Methodology",
      "Training Programs",
      "Knowledge Exchange",
      "Joint Publications"
    ]
  }
];

export default function Collaborations() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    projectIdea: '',
    type: 'research'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setShowForm(false);
    // Reset form
    setFormData({
      name: '',
      institution: '',
      email: '',
      phone: '',
      projectIdea: '',
      type: 'research'
    });
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

        {/* Current Collaborators */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-amber-900">Current Partners</h2>
              <p className="mt-2 text-lg text-amber-700">Working together to advance neuroscience in Africa</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collaborators.map((collaborator, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="h-24 flex items-center justify-center mb-6">
                      <img
                        src={collaborator.logo}
                        alt={collaborator.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-amber-900 text-center">{collaborator.name}</h3>
                      <p className="text-amber-700">{collaborator.description}</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-amber-900">Focus Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {collaborator.focus.map((area, i) => (
                            <div
                              key={i}
                              className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full"
                            >
                              {area}
                            </div>
                          ))}
                        </div>
                      </div>
                      {collaborator.website && (
                        <a
                          href={collaborator.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-amber-600 hover:text-amber-800"
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
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
                      <p className="text-amber-700">State-of-the-art neuroimaging facilities and data</p>
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
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
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
                  <button
                    type="submit"
                    className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Submit Proposal
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </Layout>
  );
}
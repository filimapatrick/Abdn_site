import React from 'react';
import { BookOpen, Globe, Users, Award, Clock, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const features = [
  {
    icon: BookOpen,
    title: "Research Excellence",
    description: "Access cutting-edge neuroscience research and methodologies",
    gradient: "from-amber-500 to-amber-600"
  },
  {
    icon: Globe,
    title: "Pan-African Network",
    description: "Connect with researchers across 15+ African countries",
    gradient: "from-amber-600 to-amber-700"
  },
  {
    icon: Users,
    title: "Collaborative Community",
    description: "Join a vibrant community of neuroscience researchers",
    gradient: "from-amber-700 to-amber-800"
  },
  {
    icon: Award,
    title: "Training Programs",
    description: "Access specialized training in neuroscience and data science",
    gradient: "from-amber-800 to-amber-900"
  },
  {
    icon: Clock,
    title: "Continuous Support",
    description: "Receive ongoing mentorship and research guidance",
    gradient: "from-amber-700 to-amber-800"
  },
  {
    icon: Video,
    title: "Knowledge Sharing",
    description: "Participate in workshops, seminars, and conferences",
    gradient: "from-amber-600 to-amber-700"
  }
];

export default function Features() {
  return (
    <div className="py-24 bg-gradient-to-b from-amber-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B45309' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-900 mb-4">
              Why Choose ABDN?
            </h2>
            <p className="text-xl text-amber-900/80 max-w-2xl mx-auto">
              Join Africa's premier network for neuroscience research and data science excellence
            </p>
          </motion.div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal 
                key={index} 
                direction="up" 
                delay={index * 0.1}
              >
                <motion.div 
                  className="group relative bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  whileHover={{ y: -5 }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${feature.gradient}`} />
                  
                  {/* Icon with animated background */}
                  <div className="relative">
                    <motion.div 
                      className={`inline-block p-3 rounded-lg mb-4 bg-gradient-to-br ${feature.gradient}`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-semibold text-amber-900 mb-2 group-hover:text-amber-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-amber-800/80">
                    {feature.description}
                  </p>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-10 transform translate-x-8 -translate-y-8">
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${feature.gradient}`} />
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { BookOpen, Globe, Users, Award, Clock, Video } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const features = [
  {
    icon: BookOpen,
    title: "Research Excellence",
    description: "Access cutting-edge neuroscience research and methodologies"
  },
  {
    icon: Globe,
    title: "Pan-African Network",
    description: "Connect with researchers across 15+ African countries"
  },
  {
    icon: Users,
    title: "Collaborative Community",
    description: "Join a vibrant community of neuroscience researchers"
  },
  {
    icon: Award,
    title: "Training Programs",
    description: "Access specialized training in neuroscience and data science"
  },
  {
    icon: Clock,
    title: "Continuous Support",
    description: "Receive ongoing mentorship and research guidance"
  },
  {
    icon: Video,
    title: "Knowledge Sharing",
    description: "Participate in workshops, seminars, and conferences"
  }
];

export default function Features() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ABDN?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join Africa's premier network for neuroscience research and data science excellence
            </p>
          </div>
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
                <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="inline-block p-3 bg-blue-100 rounded-lg text-blue-600 mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
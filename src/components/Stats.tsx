import React from 'react';
import { Users, BookOpen, Globe, Award } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const stats = [
  {
    icon: Users,
    value: "100+",
    label: "Active Researchers",
    color: "text-blue-600"
  },
  {
    icon: BookOpen,
    value: "200+",
    label: "Publications",
    color: "text-indigo-600"
  },
  {
    icon: Globe,
    value: "15+",
    label: "African Countries",
    color: "text-purple-600"
  },
  {
    icon: Award,
    value: "50+",
    label: "Research Projects",
    color: "text-pink-600"
  }
];

export default function Stats() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal 
                key={index} 
                direction="up" 
                delay={index * 0.1}
              >
                <div className="text-center">
                  <div className={`inline-block p-4 rounded-full ${stat.color} bg-opacity-10 mb-4`}>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
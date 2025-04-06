import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Globe } from 'lucide-react';


const coreTeam = [
  {
    name: "Dr. Damian Eke",
    role: "Co-founder",
    institution: "De Montfort University",
    image: "/Assets/Damian.jpeg",
    bio: "Leading expert in bioethics and responsible data sharing"
  },
  {
    name: "Dr. Eberechi Wogu",
    role: "Co-founder",
    institution: "Neuroscience Society of Nigeria",
    image: "/Assets/ebere1.jpeg",
    bio: "Pioneer in neuroimaging research in Nigeria"
  },
  {
    name: "Filima Patrick",
    role: "Technical Lead & Developer",
    institution: "University of Port-Harcourt",
    image: "/Assets/filima.jpeg",
    bio: "Tech-savvy developer integrating digital solutions in neuroscience"
  },
  {
    name: "Barisua Nsanee",
    role: "Community Manager",
    institution: "University of Port-Harcourt",
    image: "/Assets/barisua.jpeg",
    bio: "Specialist in capacity building and community Building"
  }
];

export default function CoreTeam() {
  return (
    <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Our Core Team</h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Meet the dedicated professionals leading ABDN's mission to advance neuroscience research in Africa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreTeam.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-amber-50 to-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100"
            >
              <div className="relative group">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex space-x-4">
                    <a href="#" className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-amber-500/30 transition-colors">
                      <Linkedin className="h-5 w-5 text-white" />
                    </a>
                    <a href="#" className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-amber-500/30 transition-colors">
                      <Mail className="h-5 w-5 text-white" />
                    </a>
                    <a href="#" className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-amber-500/30 transition-colors">
                      <Globe className="h-5 w-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-amber-900 mb-1">{member.name}</h3>
                <p className="text-amber-600 font-medium mb-2">{member.role}</p>
                <p className="text-amber-700 text-sm mb-3">{member.institution}</p>
                <p className="text-amber-800 text-sm">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
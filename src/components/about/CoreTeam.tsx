import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Globe } from 'lucide-react';


const coreTeam = [
  {
    name: "Dr. Damian Eke",
    role: "Director",
    institution: "University of Nottingham",
    image: "/Assets/Damian.jpeg",
    bio: "Leading expert in bioethics and responsible data sharing",
    socials: {
      linkedin: "#",
      email: "#",
      website: ""
    }
  },
  {
    name: "Dr. Eberechi Wogu",
    role: "Deputy Director",
    institution: "Neuroscience Society of Nigeria",
    image: "/Assets/ebere1.jpeg",
    bio: "Pioneer in neuroimaging research in Nigeria",
    socials: {
      linkedin: "#",
      email: "#",
      website: ""
    }
  },
  {
    name: "Filima Patrick",
    role: "Technical Lead & Developer",
    institution: "University of Port-Harcourt",
    image: "/Assets/filima.jpeg",
    bio: "Tech-savvy developer integrating digital solutions in neuroscience",
    socials: {
      linkedin: "https://www.linkedin.com/in/patrick-filima-91450817b/",
      email: "filimapatrick@gmail.com",
      website: "https://www.filimapatrick.com"
    }
  },
  {
    name: "Barisua Nsaanee",
    role: "Community & Communications Lead",
    institution: "University of Port-Harcourt",
    image: "/Assets/barisua.jpeg",
    bio: "Specialist in capacity building and community Building",
    socials: {
      linkedin: "https://www.linkedin.com/in/barisua-nsaanee",
      email: "bsaanee7@gmail.com",
      website: ""
    }
  },
  {
    name: "Chinyem Nkemjika Ighodaro",
    role: "Research Director",
    institution: " University of Benin",
    image: "/Assets/Team/Chinyem.jpg",
    bio: "African neuroimaging, EEG datasets, and physiological mechanisms of neurodegenerative diseases",
    socials: {
      linkedin: "https://www.linkedin.com/in/chinyem-ighodaro-427768a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "Chinyem.ighodaro@uniben.edu",
      website: ""
    }
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
                  className="w-full h-64 object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex space-x-4">
                    {member.socials.linkedin && (
                      <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-amber-500/30 transition-colors">
                        <Linkedin className="h-5 w-5 text-white" />
                      </a>
                    )}
                    {member.socials.email && (
                      <a href={`mailto:${member.socials.email}`} className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-amber-500/30 transition-colors">
                        <Mail className="h-5 w-5 text-white" />
                      </a>
                    )}
                    {member.socials.website && (
                      <a href={member.socials.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-amber-500/30 transition-colors">
                        <Globe className="h-5 w-5 text-white" />
                      </a>
                    )}
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
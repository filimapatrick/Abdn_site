import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const stories = [
  {
    quote: "Since joining ABDN in 2023 as a faculty member, I’ve had the privilege of connecting with exceptional students and colleagues. Mentoring students, co-authoring research papers, and collaborating on grant proposals have not only enriched my academic journey but also highlighted the vibrant, collaborative spirit of ABDN.",
    author: "Dr Moses Sokunbi",
    role: "Senior Lecturer",
    institution: "University of Nottingham",
    image: "/assets/moses.png"
  },
  {
    quote: "ABDN is a wonderful resource for young, vibrant,talented scientists from  across the continent. The workshop fosters and encourages an environment of collaboration and the development of new ideas. I truly believe that the  future of African neuroimaging is bright. I look forward to seeing what is to come from these brilliant scientists.",
    author: "Azeezat Azeez, PhD",
    role: "Imaging Research Scientist",
    institution: "Stanford School of Medicine",
    image: "/assets/Faculty/Azeezat.jpg"
  },
  {
    quote: "I have been collaborating with the African Brain Data Network since the Brain Data Academy in Kenya in 2024, and it has been a truly fascinating and rewarding experience. The network has created an exceptional space for connecting with researchers across many African countries, and facilitating meaningful exchanges of ideas and perspectives. Beyond the high-quality events organised by ABDN, these interactions have sparked new collaborations and important conversations around open, ethical, and more representative neuroscience datasets. Equally memorable have been the experiences surrounding the events themselves, working and learning in Kenya, Nigeria, and Rwanda has been both professionally inspiring and personally enriching. ABDN is not only advancing brain data science in Africa, but also building a vibrant, collaborative, and welcoming research community.",
    author: "Dr Horia Maior",
    role: "Neuroscientist",
    institution: "University of Nothingham",
    image: "/assets/Faculty/Horia.jpeg"
  }
];

export default function ResearchStories() {
  const [expandedStory, setExpandedStory] = useState<number | null>(null);

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <section className="py-24 bg-gradient-to-b from-amber-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B45309' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-900 mb-4">
            Voices from Our Network
          </h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Hear from leading researchers who are advancing neuroscience across Africa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col group"
            >
              <div
                className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative cursor-pointer"
                onMouseEnter={() => setExpandedStory(index)}
                onMouseLeave={() => setExpandedStory(null)}
                onFocus={() => setExpandedStory(index)}
                onBlur={() => setExpandedStory(null)}
                tabIndex={0}
              >
                <Quote className="absolute text-amber-500/10 h-16 w-16 -top-2 -left-2" />
                <p className="text-amber-900/80 relative z-10 text-lg leading-relaxed transition-all duration-300">
                  "{expandedStory === index ? story.quote : truncateText(story.quote)}"
                </p>
              </div>

              <motion.div
                className="flex items-center mt-6 transform transition-transform duration-300 group-hover:translate-x-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-amber-500/20">
                    <img
                      src={story.image}
                      alt={story.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                    <Quote className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-amber-900">{story.author}</h4>
                  <p className="text-amber-600 font-medium">{story.role}</p>
                  <p className="text-amber-500/80 text-sm">{story.institution}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
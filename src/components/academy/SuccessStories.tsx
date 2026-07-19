import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const stories = [
  {
    quote: "My life has not been the same after ABDSN. The things I learnt coupled with the connections I made have propagated my career growth. Through ABDSN, I now have a wonderful mentor (my first since the beginning of my career) whom I've been working with for some time now. I have been featured as a co-author in a paper which will be published very soon. My project colleague and I are also continuing with the project we started in other to publish it. Much is there to be said, but let me just keep that for another day",
    author: "Anita Esi Esun",
    role: "Research Fellow",
    institution: "Kumasi Centre for Collaborative Research in Tropical Medicine",
    image: "/assets/Anita_Esun.JPG"
  },
  {
    quote: "My story with ABDN is short and inspiring. I was among the lucky few selected to join the inaugural ABDN school in Nigeria in November 2023. I remember being surrounded by people from diverse backgrounds -- medicine, neuroscience, biology, and computer science - - and at first feeling a little lost. Then, the organizers asked me to give a 30-minute presentation about my career journey and what inspires me in neuroscience. That moment turned out to be the presentation that opened doors I never imagined would exist. I began discussing with professors and researchers how my skills in machine learning could be applied in neuroimaging. One professor whose work particularly interested me was Franco Pestilli. His lab applies computational methods to study the human brain, and I immediately felt that my skills and interests aligned with his research. After a highly competitive process, I was fortunate to be accepted into his lab at The University of Texas at Austin in the Department of Psychology. Through ABDN, I am now conducting research in areas I am truly passionate about, applying machine learning methods to better understand the brain. In 2024, I had the privilege of returning as a TA for the second edition of ABDN in Nairobi. In one word, ABDN connects African talent to global opportunities.",
    author: "Stephen Kiilu",
    role: "PhD Student",
    institution: "University of Texas at Austin",
    image: "/assets/stephen_kiilu.JPG"
  }
];

export default function SuccessStories() {
  const [expandedStory, setExpandedStory] = useState<number | null>(null);

  const truncateText = (text: string, maxLength: number = 240) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

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
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Success Stories</h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Hear from researchers who have benefited from ABDN Academy's programs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group border border-amber-100/50 cursor-pointer"
              onMouseEnter={() => setExpandedStory(index)}
              onMouseLeave={() => setExpandedStory(null)}
              onFocus={() => setExpandedStory(index)}
              onBlur={() => setExpandedStory(null)}
              tabIndex={0}
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-amber-200" />
              <p className="text-lg text-amber-800 mb-6 relative z-10 transition-all duration-300">
                "{expandedStory === index ? story.quote : truncateText(story.quote)}"
              </p>
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={story.image}
                    alt={story.author}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-200 group-hover:ring-amber-300 transition-all duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full p-1.5 ring-2 ring-white">
                    <Quote className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-amber-900 group-hover:text-amber-700 transition-colors">{story.author}</h4>
                  <p className="text-amber-700">{story.role}</p>
                  <p className="text-amber-600/80 text-sm">{story.institution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
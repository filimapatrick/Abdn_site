import React, { useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { Linkedin, Globe, MapPin, Calendar, Star } from 'lucide-react';
import Layout from '../../components/Layout';

interface Alumni {
  id: number;
  name: string;
  location: string;
  cohort: number; // 2023, 2024, or 2025
  photo: string;
  socialLinks: {
    linkedin?: string;
    website?: string;
  };
}

interface Testimonial {
  id: number;
  name: string;

  organization: string;
  image: string;
  quote: string;
  rating: number;
}

// Add back the interface definition
interface InfiniteScrollProps {
  children: React.ReactNode;
  direction?: number;
}

const alumniData: Alumni[] = [
  {
    id: 1,
    name: "Abdulhafiz Umar",
    location: "Nigeria",
    cohort: 2025,
    photo: "/Assets/Alumni/Abdulhafiz.jpg",
    socialLinks: { linkedin: "https://www.linkedin.com/in/abdulrazaq-zubair-226746168?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" }
  },
  {
    id: 2,
    name: "Abdulrahman Abdullahi Dalhatu",
    location: "Nigeria",
    cohort: 2025,
    photo: "",
    socialLinks: { linkedin: "" }
  },
  {
    id: 3,
    name: "Abdulrahman Adesola Belo",
    location: "Ogun State, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/abdulrahman-adesola-belo.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/abdulrahman-belo-a049781b1",
    },
  },
  {
    id: 4,
    name: "Abdulrahman Sadiq Sadiq",
    location: "Nigeria",
    cohort: 2025,
    photo: "",
    socialLinks: { linkedin: "" }
  },
  {
    id: 5,
    name: "Abdulrazaq Abdulraheem Ganiyu",
    location: "Nigeria",
    cohort: 2025,
    photo: "/Assets/Alumni/Zubair.png",
    socialLinks: { linkedin: "https://www.linkedin.com/in/abdulrazaq-zubair-226746168?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" }
  },
  {
    id: 6,
    name: "Adebola Matthew Adebayo",
    location: "Nigeria",
    cohort: 2025,
    photo: "",
    socialLinks: { linkedin: "" }
  },
  {
    id: 7,
    name: "SOLADOYE Afeez Adekunle ",
    location: "Nigeria",
    cohort: 2025,
    photo: "/Assets/Alumni/SOLADOYE.jpg",
    socialLinks: { linkedin: "https://www.linkedin.com/in/afeez-soladoye-b918ab6b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" }
  },
  {
    id: 8,
    name: "Anita Esi Eshun",
    location: "Greater Accra, Ghana",
    cohort: 2024,
    photo: "",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/anita-esi-eshun-4968141b1",
    },
  },
  {
    id: 9,
    name: "Asuquo Olaitan Ruth",
    location: "Calabar, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/asuquo-olaitan-ruth.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/asuquo-olaitan-ruth",
    },
  },
  {
    id: 10,
    name: "Bala Mairiga Abduljalil",
    location: "Nigeria",
    cohort: 2025,
    photo: "/Assets/Alumni/Bala_Mairiga_Abduljalil.jpg",
    socialLinks: { linkedin: "https://www.linkedin.com/in/balaabduljalil" }
  },
  {
    id: 11,
    name: "Blessing Oyinlola Ajibade",
    location: "Nigeria",
    cohort: 2025,
    photo: "",
    socialLinks: { linkedin: "" }
  },
  {
    id: 12,
    name: "Chalachew Kassaw Demoze",
    location: "Dilla, Ethiopia",
    cohort: 2024,
    photo: "",
    socialLinks: {
      linkedin: "",
    },
  },
  {
    id: 13,
    name: "Chidi Ukamaka Betrand",
    location: "Imo State, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/chidi-betrand.jpg",
    socialLinks: {
      linkedin: "",
    },
  },
  {
    id: 14,
    name: "Cynthia Kahari",
    location: "Zimbabwe",
    cohort: 2025,
    photo: "/Assets/Alumni/Cynthia_Kahari.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/cynthia-kahari-phd-a7b33b37",
    },
  },
  {
    id: 15,
    name: "Daisy Chelangat",
    location: "Nairobi, Kenya",
    cohort: 2024,
    photo: "",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/daisy-chelangat",
    },
  },
  {
    id: 16,
    name: "Dorcas Khasowa",
    location: "Nairobi, Kenya",
    cohort: 2024,
    photo: "",
    socialLinks: {
      linkedin: "",
    },
  },
  {
    id: 17,
    name: "Eman Khalil",
    location: "Cairo, Egypt",
    cohort: 2023,
    photo: "/images/alumni/eman-khalil.jpg",
    socialLinks: {
      linkedin: "https://www.researchgate.net/profile/Eman_Khalil10",
    },
  },
  {
    id: 18,
    name: "Erica Azechum Akanko",
    location: "Accra, Ghana",
    cohort: 2023,
    photo: "/images/alumni/erica-azechum-akanko.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/erica-akanko",
    },
  },
  {
    id: 19,
    name: "Ezra Kipngetich Too",
    location: "Nairobi, Kenya",
    cohort: 2024,
    photo: "",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/ezratoo/",
    },
  },
  {
    id: 20,
    name: "Fadiji Olatundun Oluwapelumi",
    location: "Lagos, Nigeria",
    cohort: 2024,
    photo: "",
    socialLinks: {
      linkedin: "",
    },
  },
  {
    id: 21,
    name: "Falonne Tiffany NIAKAM MBOULEUP",
    location: "Sicap Baobab, Senegal",
    cohort: 2023,
    photo: "/images/alumni/falonne-tiffany-niakam-mbouleup.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/tiffany-falonne-niakam-847171264",
    },
  },
  {
    id: 22,
    name: "Felix Chege Ng'ang'a",
    location: "10203 Kigumo, Kenya",
    cohort: 2023,
    photo: "/images/alumni/felix-chege-nganga.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/chege-nganga",
    },
  },
  {
    id: 23,
    name: "Felix Mburu Njoroge",
    location: "Nairobi, Kenya",
    cohort: 2023,
    photo: "/images/alumni/felix-mburu.jpg",
    socialLinks: {
      linkedin: "https://shorturl.at/OYjub",
      website: "https://github.com/FelixMburu",
    },
  },
  {
    id: 24,
    name: "Francis Agbaraolorunpo",
    location: "Nigeria",
    cohort: 2025,
    photo: "/Assets/Alumni/France - Francis Agbaraolorunpo.png",
    socialLinks: { linkedin: "https://www.linkedin.com/in/francis-agbaraolorunpo-b-sc-mb-bs-ph-d-437a83188/?originalSubdomain=ng" }
  },

  {
    id: 25,
    name: "Dr Isa Hassan Muhammad ",
    location: "Nigeria",
    cohort: 2025,
    photo: "/Assets/Alumni/Isa.jpg",
    socialLinks: { linkedin: "https://www.linkedin.com/in/dr-isa-hassan-muhammad-773981125?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B0k63pGf2Q%2FCeZHDQ%2BtYptQ%3D%3D" }
  },
  {
    id: 26,
    name: "Happiness Inyang",
    location: "Nigeria",
    cohort: 2025,
    photo: "/Assets/Alumni/Happiness_Inyang.jpg",
    socialLinks: { linkedin: "https://www.linkedin.com/in/happiness-inyang-a2a085254/" }
  },
  {
    id: 27,
    name: "IBEACHU CHINAGOROM",
    location: "Port-Harcourt, Rivers State, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/ibeachu-chinagorom.jpg",
    socialLinks: {},
  },
  {
    id: 28,
    name: "Ibrahim Aliyu Lawal",
    location: "Nigeria",
    cohort: 2025,
    photo: "",
    socialLinks: { linkedin: "" }
  },
  {
    id: 29,
    name: "Jacob Apibilla Ayembilla",
    location: "Ghana",
    cohort: 2025,
    photo: "",
    socialLinks: { linkedin: "" }
  },
  {
    id: 30,
    name: "Jane Uchechi Obiako",
    location: "Ibadan, Oyo State, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/jane-obiako.jpg",
    socialLinks: {
      website: "https://orcid.org/0000-0002-6388-5083"
    },
  },
  {
    id: 31,
    name: "Joan Mutahi",
    location: "Nairobi, Kenya",
    cohort: 2024,
    photo: "",
    socialLinks: {
      linkedin: "",
    },
  },
  {
    id: 32,
    name: "Joshua Ayodele Yusuf",
    location: "Ogbomoso, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/joshua-ayodele-yusuf.jpg",
    socialLinks: {},
  },
  {
    id: 33,
    name: "Kojo Nketia",
    location: "Ayawaso West, Botanical Gardens Road, G4489, Ghana",
    cohort: 2023,
    photo: "/images/alumni/kojo-nketia.jpg",
    socialLinks: {},
  },
  {
    id: 34,
    name: "Maryam Abubakar Mohammed",
    location: "Nigeria",
    cohort: 2025,
    photo: "",
    socialLinks: { linkedin: "" }
  },
  {
    id: 35,
    name: "Mercy Nathaniel",
    location: "Nigeria",
    cohort: 2025,
    photo: "/Assets/Alumni/Mercy_Nathaniel.jpg",
    socialLinks: { linkedin: "https://www.linkedin.com/in/nathaniel-mercy" }
  },
  {
    id: 36,
    name: "Moses Ayodele Ogunlade",
    location: "Nigeria",
    cohort: 2025,
    photo: "",
    socialLinks: { linkedin: "" }
  },
  {
    id: 37,
    name: "Mustapha Abdullahi Muhammad",
    location: "Nigeria",
    cohort: 2025,
    photo: "",
    socialLinks: { linkedin: "" }
  },
  {
    id: 38,
    name: "Naabiae B. Goodness",
    location: "Choba Exe Rd, Obi-nkitaSt, PH, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/naabiae-goodness.jpg",
    socialLinks: {},
  },
  {
    id: 39,
    name: "Ogunmiluyi Oluwafunmbi Ebenezer",
    location: "Ondo, Nigeria",
    cohort: 2024,
    photo: "",
    socialLinks: {
      linkedin: "",
    },
  },
  {
    id: 40,
    name: "Olubunmi Abimbola Akinwale",
    location: "Nigeria",
    cohort: 2025,
    photo: "",
    socialLinks: { linkedin: "" }
  },
  {
    id: 41,
    name: "Oumayma SOULA",
    location: "Sfax, Tunisia",
    cohort: 2024,
    photo: "",
    socialLinks: {
      linkedin: "https://linkedin.com/in/oumaïma-soula",
    },
  },
  {
    id: 42,
    name: "Ridwan Abdulfatai Ibrahim",
    location: "Nigeria",
    cohort: 2025,
    photo: "",
    socialLinks: { linkedin: "" }
  },
  {
    id: 43,
    name: "Rosemary Nwosu",
    location: "Port Harcourt, Rivers State, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/rosemary-nwosu.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/rosemary-nwosu",
    },
  },
  {
    id: 44,
    name: "Sadiya Abubakar Danjuma",
    location: "Nigeria",
    cohort: 2025,
    photo: "",
    socialLinks: { linkedin: "" }
  },
  {
    id: 45,
    name: "Samson Ehindero Olorunnado",
    location: "Rwanda",
    cohort: 2024,
    photo: "",
    socialLinks: {
      linkedin: "",
    },
  },
  {
    id: 46,
    name: "Samuel Adebola Adeyemi",
    location: "Nigeria",
    cohort: 2025,
    photo: "",
    socialLinks: { linkedin: "" }
  },
  {
    id: 47,
    name: "Smart Chidi Oparaugo",
    location: "Port Harcourt, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/smart-chidi-oparaugo.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/smart-chidi-oparaugo-275439144",
    },
  },
  {
    id: 48,
    name: "Stephen Kiilu",
    location: "Nairobi, Kenya",
    cohort: 2022,
    photo: "/images/alumni/stephen-kiilu.jpg",
    socialLinks: {
      website: "https://orcid.org/401000118"
    },
  },
  {
    id: 49,
    name: "Sulaiman Adebayo Adebisi",
    location: "Nigeria",
    cohort: 2025,
    photo: "",
    socialLinks: { linkedin: "" }
  },
  {
    id: 50,
    name: "TSEMO YIMTA GRACE MAIVA",
    location: "Dakar, Senegal",
    cohort: 2023,
    photo: "/images/alumni/tesemo-grace-maiva.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/tesemo-yimta-grace-maiva",
    },
  },
  {
    id: 51,
    name: "Unshur Ahmed",
    location: "Mogadishu, Somalia",
    cohort: 2024,
    photo: "/images/alumni/unshur-amhadi.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/unshur-amhadi",
    },
  },
  {
    id: 52,
    name: "Vicent Balitema",
    location: "Mbarara, Uganda",
    cohort: 2023,
    photo: "/images/alumni/vicent-balitema.jpg",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/vicent-balitema",
    },
  },
  {
    id: 53,
    name: "Zainab Ashimiyu-Abdusalam",
    location: "Lagos, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/zainab-ashimiyu.jpg",
    socialLinks: {
      linkedin: "",
    },
  },
  {
    id: 54,
    name: "Zainab Musa Sulaiman",
    location: "Nigeria",
    cohort: 2025,
    photo: "",
    socialLinks: { linkedin: "" }
  },
  {
    id: 55,
    name: "Mundih Noelar Njohjam",
    location: "Cameroon",
    cohort: 2025,
    photo: "/Assets/Alumni/Mundih.jpg",
    socialLinks: { linkedin: "https://www.linkedin.com/in/mundih-noelar-njohjam-md-msc-5a110a47?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" }
  },
  {
    id: 56,
    name: "Zainab Saleh Sambo",
    location: "Nigeria",
    cohort: 2025,
    photo: "/Assets/Alumni/zainab_sambo.jpeg",
    socialLinks: { linkedin: "http://www.linkedin.com/in/zainab-saleh-sambo-769a9813b" }
  },
];

// Add testimonials data
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Bala Mairiga Abduljalil",
    organization: "HausaNLP Research Lab.",
    image: "/Assets/Alumni/Bala_Mairiga_Abduljalil.jpg",
    quote: "My experience at the African Brain Data Science Academy was exceptional and far beyond my expectations. The program provided intensive, hands-on training in brain data science, covering modalities such as EEG, fNIRS, MRI, and fMRI, guided by world-class experts from University of Nottingham, Lawrence University and we are fortunate to explored first neurosight devices before market by Mendi company, sweden. The mentorship, collaborative environment, and focus on FAIR African brain data strengthened my technical skills, research capacity, and interdisciplinary thinking. The Academy has greatly enhanced my confidence to apply advanced computational approaches to address neuroscience challenges relevant to Africa.",
    rating: 5
  },
  {
    id: 2,
    name: "SOLADOYE Afeez Adekunle ",
    organization: "Adeleke university Ede and Federal University Oye-Ekiti ",
    image: "/Assets/Alumni/SOLADOYE.jpg",
    quote: "I have gained a lot of experience on Brain data. This has also provided me room to network and experience multidisciplinary research as demonstrated in our research on fNIRS where a team of Medical doctor, anatomist, physiologist and ML engineer analysed the brain data and it's relationship on activation of PFC with go/no-go task. Moreover, it provided me the room to understand different brain data formats like EEH, MRI, fMRI and fNIRS as I'm already looking how to apply my computing skills to expand Africa brain data.",
    rating: 5
  },
  {
    id: 3,
    name: "Dr Isa Hassan Muhammad ",
    organization: "Yobe State University Damaturu/BioRTC",
    image: "/Assets/Alumni/Isa.jpg",
    quote: "From beginning to end, the organizers performed an outstanding job.  The workshop was extremely well-organized, offering a smooth and interesting educational experience.  The event was a huge success because of their commitment to making sure everything ran smoothly and creating a cooperative atmosphere.  Thanks to their outstanding organizational efforts, we are departing with invaluable new skills and connections.",
    rating: 5
  },
  {
    id: 4,
    name: "Mundih Noelar Njohjam ",
    organization: "",
    image: "/Assets/Alumni/Mundih.jpg",
    quote: "The two weeks of training have been an invaluable experience that will continue to save me a lifetime. From learning about  brain data collection techniques like fNIRS to collecting real-time data, the experience has been greatly rewarding. I have learned how to leverage data analysis tools and platforms to analyze and interpret complex and large datasets. These skills and knowledge will greatly inform further training and projects in neuroscience. The sessions were empowering and engaging, facilitators were really good. Thank you for the opportunity to be part of this great network.",
    rating: 5
  },
  {
    id: 5,
    name: "Abdulrazaq Zubair",
    organization: "Federal University of Health Sciences, Azare",
    image: "/Assets/Alumni/Zubair.png",
    quote: "Participating in the ABDSA Workshop in Lagos has been a truly transformative experience for me. The workshop has completely reshaped my perception of neuroscience and has significantly deepened my understanding of how to generate, manage, and share data in line with FAIR (Findable, Accessible, Interoperable, and Reusable) principles. Beyond the rich academic and technical training, one of the most rewarding aspects of this workshop has been the opportunity to connect with an incredible community of people. I have met outstanding faculty members and participant colleagues from different countries, all of whom are passionate, supportive, and inspiring. The diversity of perspectives and the spirit of collaboration created a highly enriching learning environment. This workshop has been an unforgettable experience, both professionally and personally. I am deeply grateful for the knowledge gained, the friendships formed, and the networks built. I am committed to sustaining these relationships and fostering meaningful collaborations that will extend well beyond the ABDSA Workshop Lagos, Nigeria 2025.",
    rating: 5
  },
  {
    id: 6,
    name: "Zainab Saleh Sambo",
    organization: "Ahmadu Bello University, Zaria",
    image: "/Assets/Alumni/zainab_sambo.jpeg",
    quote: "ABDSA has been one of the best experiences of my life. I have learnt, laughed, and networked with peers. I am grateful for the opportunity to attend.",
    rating: 5
  },
  {
    id: 7,
    name: "Abdulhafiz Umar Dabo",
    organization: "Nigerian Defence Academy",
    image: "/Assets/Alumni/abdulhafiz.jpg",
    quote: "It was an incredible experience being a part of the ABDSA 2025. My profound appreciation goes to the entire organizing team, for their professionalism in putting this together. To all the participants, it is my honor to share the space with you for two weeks, considering we all came from different cultural and academic backgrounds. I look forward to leveraging the relationship we have built, and collaboratively producing high quality research.",
    rating: 5
  },
  {
    id: 8,
    name: "Cynthia Kahari",
    organization: "University of Zimbabwe",
    image: "/Assets/Alumni/Cynthia_Kahari.jpg",
    quote: "The African Brain Data Science Academy has been eye opening and packed with useful lessons on brain MRI, fMRI, fNIRS, python etc. I am grateful for the opportunity to have spent these 2 weeks learning from experienced neuroimaging and neuroscience researchers, discussing the importance of building FAIR brain datasets in Africa and meeting new potential research collaborators. This is surely one of the awesome things that have happened to me this year and I am excited for the future of neuroimaging beyond this academy.",
    rating: 5
  },
  {
    id: 9,
    name: "Mercy Nathaniel",
    organization: "Ahmadu Bello University, Zaria",
    image: "/Assets/Alumni/Mercy_Nathaniel.jpg",
    quote: "Attending ABDSA feels like a full circle moment, starting from the first cohort in 2023 where I first came across Neuroimaging techniques and now in 2025 ,I'm sitting in a room I once dreamed about. It's been an intensive and life transforming experience. I like the fact that I'm leaving this academy empowereded with skills and techniques to answer the numerous research questions I've been curious about. Aside the learning experience, the investment made to ensure that every participant is comfortable enough to learn, assimilate lectures and hands-on technical sessions is commendable. The opportunity to meet and collolabrate on projects with participants from interdisciplinary background was really enriching. I'm motivated to drive research and the generation of African brain data forward. Thank you ABDN for this incredible opportunity.",
    rating: 5
  },
  {
    id: 10,
    name: "Anikobs Anita",
    organization: "African Institute of Brain Research",
    image: "/Assets/Anita_Esun.JPG",
    quote: "My life has not been the same after ABDSN. The things I learnt coupled with the connections I made have propagated my career growth. Through ABDSN, I now have a wonderful mentor (my first since the beginning of my career) whom I've been working with for some time now. I have been featured as a co-author in a paper which will be published very soon. My project colleague and I are also continuing with the project we started in other to publish it. Much is there to be said, but let me just keep that for another day.",
    rating: 5
  },
  {
    id: 11,
    name: "Dr Francis Agbaraolorunpo",
    organization: "University of Lagos",
    image: "/Assets/Alumni/France - Francis Agbaraolorunpo.png",
    quote: "ABDSA was a unique opportunity to learn, upscale,exploy, network and collaborate.New technologies and techniques in acquiring and analysing brain dataset were learned from  our amazing  scholars and Falculties from the global north. from  different tech companies  inluding Mendi, Brainlife.i.o,MathWorks and  University of Nottingham. Amazing  Neuroscience group Projects with FNIRS and BrainLife  were conducted. On the whole, the entire experience was rewarding, uplifting,  inspiring, impactful, insightful,l memorable and rhapsodious. Extremely thankful and grateful to the sponsors ABDN  and IBRO, and their amazing collaborators ; Mendi, BrainLife, University of Nottingham, Kavli foundation. The hospitality at BWC Hotel  was superlative, tantalizing  and refreshing. It was indeed an amazing experience connecting with Medical doctors, Biomedical Engineers, Biomedical Scientist, Data Scientist, Clinical Radiographers and other experts from all parts of Nigeria and Africa countries- Cameroun, Kenyan, Tanzania, Uganda ,Ghana .What an unforgetable sweet experience",
    rating: 5
  },
  {
    id: 11,
    name: "Happiness Inyang",
    organization: "University of Medical Sciences, Ondo, Nigeria",
    image: "/Assets/Alumni/Happiness_Inyang.jpg",
    quote: "ABDSA has been a highly impactful and enriching experience. Through this program, I gained solid knowledge and practical skills in neuroimaging and neurodata analysis. Most importantly, it has brought about a significant and positive shift in my career trajectory as a neuroscience researcher.",
    rating: 5
  },
];

// Update TestimonialCard component
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="w-[600px] flex-shrink-0 mx-6 bg-gradient-to-br from-white to-amber-50/30 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-amber-100/50"
    >
      <div className="p-8 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/20 rounded-full blur-2xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-100/20 rounded-full blur-2xl -ml-16 -mb-16" />
        <div className="relative">
          <div className="flex items-center gap-6 mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200 shadow-lg"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div>
              <h4 className="text-xl font-semibold text-amber-900 mb-1">{testimonial.name}</h4>
              <p className="text-sm text-amber-500">{testimonial.organization}</p>
            </div>
          </div>
          <div className="flex gap-1.5 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </motion.div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute -left-6 -top-4 text-6xl text-amber-200/50">"</div>
            <p className="text-amber-700 text-lg leading-relaxed relative z-10 pl-4">
              {testimonial.quote}
            </p>
            <div className="absolute -right-4 -bottom-4 text-6xl text-amber-200/50 rotate-180">"</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Update InfiniteScroll component
const InfiniteScroll = ({ children, direction = 1 }: InfiniteScrollProps) => {
  const [loopCount, setLoopCount] = useState(0);
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);

  useAnimationFrame((time) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scrollWidth = scroller.scrollWidth;
    const viewWidth = scroller.offsetWidth;

    if (scrollWidth > viewWidth) {
      if (loopCount === 0) {
        scroller.scrollLeft += direction * 0.5; // Slower scroll speed
        if (
          (direction > 0 && scroller.scrollLeft >= scrollWidth - viewWidth) ||
          (direction < 0 && scroller.scrollLeft <= 0)
        ) {
          setLoopCount(1);
        }
      } else {
        scroller.scrollLeft = direction > 0 ? 0 : scrollWidth - viewWidth;
        setLoopCount(0);
      }
    }
  });

  return (
    <div
      ref={scrollerRef}
      className="flex overflow-x-hidden w-full py-8 relative group"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
      }}
    >
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-amber-50 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-amber-50 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {children}
    </div>
  );
};

export default function Alumni() {
  const [selectedCohort, setSelectedCohort] = useState<number | null>(null);

  // Apply the cohort filter
  const filteredAlumni = React.useMemo(() => {
    if (selectedCohort === null) return alumniData;
    return alumniData.filter((alumni: Alumni) => alumni.cohort === selectedCohort);
  }, [selectedCohort]);

  return (
    <Layout>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-48 bg-gradient-to-br from-amber-950 to-amber-800">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-96 h-96 -top-48 -left-48 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-amber-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-amber-200 to-amber-100 bg-clip-text text-transparent">
                  ABDN Alumni Network
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl text-amber-100 max-w-3xl mx-auto"
              >
                Discover the impact of our alumni across Africa and beyond, shaping the future of neuroscience and brain research
              </motion.p>
            </div>
          </div>
        </section>

        {/* Program Timeline Section */}
        <section className="py-12 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-amber-900 mb-4">Program Timeline</h2>
              <p className="text-amber-700 max-w-2xl mx-auto">
                Our program has been running since 2023, with new cohorts of 25 researchers joining each year
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 text-amber-600 mb-4">
                  <Calendar className="h-5 w-5" />
                  <span className="text-lg font-semibold">2023 Cohort</span>
                </div>
                <p className="text-amber-700">
                  Our inaugural cohort of 25 researchers who completed the program and are now making significant contributions to neuroscience research across Africa.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 text-amber-600 mb-4">
                  <Calendar className="h-5 w-5" />
                  <span className="text-lg font-semibold">2024 Cohort</span>
                </div>
                <p className="text-amber-700">
                  The current cohort of 25 researchers who are actively engaged in the program, working on innovative neuroscience projects across the continent.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-2 text-amber-600 mb-4">
                  <Calendar className="h-5 w-5" />
                  <span className="text-lg font-semibold">2025 Cohort</span>
                </div>
                <p className="text-amber-700">
                  Applications are now open for our 2025 cohort of 25 researchers. Join us to be part of the next generation of neuroscience leaders in Africa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setSelectedCohort(null)}
                className={`px-6 py-2 rounded-full transition-all ${selectedCohort === null
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-amber-600 hover:bg-amber-100'
                  }`}
              >
                All Cohorts
              </button>
              <button
                onClick={() => setSelectedCohort(2023)}
                className={`px-6 py-2 rounded-full transition-all ${selectedCohort === 2023
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-amber-600 hover:bg-amber-100'
                  }`}
              >
                2023 Cohort
              </button>
              <button
                onClick={() => setSelectedCohort(2024)}
                className={`px-6 py-2 rounded-full transition-all ${selectedCohort === 2024
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-amber-600 hover:bg-amber-100'
                  }`}
              >
                2024 Cohort
              </button>
              <button
                onClick={() => setSelectedCohort(2025)}
                className={`px-6 py-2 rounded-full transition-all ${selectedCohort === 2025
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-amber-600 hover:bg-amber-100'
                  }`}
              >
                2025 Cohort
              </button>
            </div>
          </div>
        </section>

        {/* Alumni Grid */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAlumni.map((alumni) => (
                <motion.div
                  key={alumni.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-40 bg-amber-100">
                    {/* {alumni.photo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={alumni.photo}
                          alt={alumni.name}
                          className="w-1/2 aspect-square object-contain rounded-full"
                        />
                      </div>
                    )} */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-900/50" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-2xl font-bold text-white">{alumni.name}</h3>
                    </div>
                    <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm">
                      {alumni.cohort} Cohort
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-amber-600 mb-4">
                      <MapPin className="h-5 w-5" />
                      <span>{alumni.location}</span>
                    </div>
                    <div className="flex gap-4">
                      {alumni.socialLinks.linkedin && (
                        <a
                          href={alumni.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-800 transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {alumni.socialLinks.website && (
                        <a
                          href={alumni.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-800 transition-colors"
                        >
                          <Globe className="h-5 w-5" />
                        </a>
                      )}

                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Update Testimonials Section */}
        <section className="py-24 bg-gradient-to-br from-amber-50 via-white to-amber-50/30 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_transparent_65%,_#fffbeb_100%)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-amber-900 mb-6 bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent"
              >
                What Our Alumni Say
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-amber-700 max-w-2xl mx-auto"
              >
                Hear from our alumni about their experiences and achievements after completing the ABDN program
              </motion.p>
            </div>

            <div className="space-y-12">
              <InfiniteScroll direction={1}>
                {testimonials.slice(0, 3).map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </InfiniteScroll>

              <InfiniteScroll direction={-1}>
                {testimonials.slice(3).map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </section>

        {/* Alumni Impact Section */}
        <section className="py-16 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-amber-900 mb-4">
                Alumni Impact
              </h2>
              <p className="text-amber-700 max-w-2xl mx-auto">
                Our alumni are making significant contributions to neuroscience research and healthcare across Africa
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Research Excellence</h3>
                <p className="text-amber-700">
                  Alumni have published  research papers in high-impact journals, advancing our understanding of brain development and disorders in African populations.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Community Impact</h3>
                <p className="text-amber-700">
                  Through various initiatives, our alumni have reached over 100 individuals with neuroscience education and awareness programs across Africa.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Leadership</h3>
                <p className="text-amber-700">
                  Many alumni now hold leadership positions in research institutions, healthcare organizations, and policy-making bodies across the continent.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
} 
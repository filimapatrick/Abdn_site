import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Star, ArrowRight, Mail, Linkedin, Twitter, Link as LinkIcon, X } from 'lucide-react';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import { seoConfig } from '../../config/seo';

interface PersonDetails {
  affiliations?: string[];
  interests?: string[];
  website?: string;
}

interface Person {
  name: string;
  title?: string;
  country?: string;
  institution: string;
  image: string;
  bio: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  details?: PersonDetails;
  achievements?: string[];
}

const nationalCoordinators: Person[] = [

  {
    name: "Dr. Gams Massi Daniel",
    title: "National Coordinator",
    country: "Cameroon",
    institution: "University of Buea",
    email: "danny.gamsmassi@gmail.com",
    image: "/assets/NationalCordinators/Gamsi.jpg",
    twitter: "@DrGamsMassi",
    linkedin: "https://linkedin.com/in/gamsmassidaniel",
    bio: "Lecturer and consultant neurologist specializing in cerebrovascular diseases, epilepsy, and movement disorders.",
    details: {
      interests: [
        "Stroke/Cerebrovascular diseases",
        "Neuroinfections",
        "Epilepsy",
        "Movement disorders"
      ],
      affiliations: [
        "Lecturer, Neurology Department, Faculty of Health Sciences, University of Buea, Cameroon",
        "Consultant neurologist, Douala General Hospital, Cameroon",
        "Secretary General, Cameroon Academy of Neurology"
      ]
    }
  },
  {
    name: "Ronald Kamoga",
    title: "National Coordinator",
    country: "Uganda",
    institution: "Mbarara University of Science and Technology",
    email: "rkamoga@must.ac.ug",
    image: "/assets/NationalCordinators/Ronald.jpg",
    twitter: "@RonaldKamoga",
    linkedin: "https://linkedin.com/in/ronaldkamoga",
    bio: "Lecturer and dementia research fellow advancing neuroscience in East Africa.",
    details: {
      interests: [
        "Alzheimer's Disease",
        "Dementia related disorders"
      ],
      affiliations: [
        "Lecturer, Anatomy Department, Faculty of Medicine, Mbarara University of Science and Technology, Uganda",
        "SONA representative for East Africa",
        "Treasurer, Neuroscience Society of Uganda",
        "Fellow, Mbarara Alzheimer's Disease and related Dementias Research Initiative (MADRI)"
      ]
    }
  },
  {
    name: "Eberechi Wogu PhD",
    title: "National Coordinator",
    country: "Nigeria",
    institution: "University of Port Harcourt",
    email: "eberechi.wogu@uniport.edu.ng",
    image: "/assets/NationalCordinators/Ebere.png",
    twitter: "@DrEberechiWogu",
    linkedin: "https://linkedin.com/in/eberechiwogu",
    bio: "Global scholar and lecturer focusing on brain imaging and neurodegenerative diseases in Africa.",
    details: {
      interests: [
        "African Human brain Imaging",
        "Open science",
        "African Neuroanthropology",
        "Biological mechanisms of neurodegenerative diseases"
      ],
      affiliations: [
        "Lecturer, Anatomy Department, University of Port Harcourt, Rivers State, Nigeria",
        "Secretary, Neuroscience Society of Nigeria",
        "Treasurer, Women in Neuroscience, Nigeria",
        "Global Scholar, Wellcome Center for Integrative Neuroimaging (WIN), University of Oxford, UK"
      ]
    }
  },
  {
    name: "Dr. Francis Djankpa",
    title: "National Coordinator",
    country: "Ghana",
    institution: "University of Cape Coast",
    email: "fdjankpa@ucc.edu.gh",
    image: "/assets/NationalCordinators/Francis.png",
    twitter: "@DrDjankpa",
    linkedin: "https://linkedin.com/in/francisdjankpa",
    bio: "Head of Physiology Department and advocate for medical science research in Ghana.",
    details: {
      interests: [
        "Neurophysiology"
      ],
      affiliations: [
        "Founder and Director at Nterm-Ghana (NGO)",
        "Head, Department of Physiology, University of Cape Coast",
        "Chairman, School of Medical Sciences Research Committee"
      ]
    }
  },
  {
    name: "Grace Mashala Bilungula MD",
    title: "National Coordinator",
    country: "Democratic Republic of Congo",
    institution: "University of Kinshasa",
    email: "gracebilungula@gmail.com",
    image: "/assets/NationalCordinators/GraceMashala.jpg",
    twitter: "@DrGraceBilungula",
    linkedin: "https://linkedin.com/in/gracebilungula",
    bio: "Researcher in neurodevelopment and neuropsychology at the University of Kinshasa.",
    details: {
      interests: [
        "Neurodevelopment",
        "Neuropsychology"
      ],
      affiliations: [
        "Centre Neuropsychopathologique de Kinshasa, University of Kinshasa (CNPP/UNIKIN)"
      ]
    }
  },
  {
    name: "Zeinab Koné MD",
    title: "National Coordinator",
    country: "Mali",
    institution: "Point G Teaching Hospital",
    email: "zeinab.kone@pointg.ml",
    image: "/assets/NationalCordinators/Zeinab.png",
    twitter: "@DrZeinabKone",
    linkedin: "https://linkedin.com/in/zeinabkone",
    bio: "Specialist in epilepsy and neuropediatrics with a strong clinical and academic background.",
    details: {
      interests: [
        "Epilepsy",
        "Clinical Neurophysiology",
        "Neuropediatrics",
        "Language, learning and behavioral disorders",
        "Brain development in health and disease",
        "Brain plasticity"
      ],
      affiliations: [
        "Neurology Department, Point G Teaching Hospital, Bamako, Mali",
        "MD, Neurologist",
        "MSc Neurobiology, Neuroscience",
        "PGD in Clinical Paediatric Electrophysiology and Epilepsy"
      ]
    }
  },
  {
    name: "Dr. Teketel Eristu Kediso",
    title: "National Coordinator",
    country: "Ethiopia",
    institution: "Arbaminch University",
    email: "tkeristu@gmail.com",
    image: "/assets/NationalCordinators/Teketel.jpg",
    twitter: "@DrTeketel",
    linkedin: "https://linkedin.com/in/teketelkediso",
    bio: "Physiology professor with a focus on neural networks and neurodegeneration.",
    details: {
      interests: [
        "Neurophysiology",
        "Neural networks",
        "In vitro and in vivo electrophysiology",
        "Neurodegeneration"
      ],
      affiliations: [
        "Assistant Professor of Physiology, Arbaminch University",
        "President, Ethiopian Physiological Society (EPS)",
        "Vice President, Ethiopian Neuroscience Society (ENS)"
      ]
    }
  },
  {
    name: "Dr. Olaitan Ruth Asuquo",
    title: "National Coordinator",
    country: "Tanzania",
    institution: "University of Dar es Salaam",
    email: "olaitan.asuquo@udsm.tz",
    image: "/assets/NationalCordinators/Olaitan.jpeg",
    twitter: "@DrOlaitanAsuquo",
    linkedin: "https://linkedin.com/in/olaitanasuquo",
    bio: "Expert in reproductive neuroendocrinology and herbal neurotoxicology.",
    details: {
      interests: [
        "Herbal contraceptives",
        "Neurotoxicity",
        "Neuroscience"
      ],
      affiliations: [
        "BSc Human Anatomy",
        "MSc Histochemistry",
        "PhD Reproductive Neuroendocrinology"
      ]
    }
  },
  {
    name: "Oumayma Soula",
    title: "National Coordinator",
    country: "Tunisia",
    institution: "Faculty of Medicine, Sfax",
    email: "oumayma.soula@gmail.com",
    image: "/assets/NationalCordinators/Oumayma.jpg",
    twitter: "@OumaymaSoula",
    linkedin: "https://linkedin.com/in/oumaymaSoula",
    bio: "Ph.D. candidate specializing in computational neuroscience and functional connectivity in neurodegenerative disorders.",
    details: {
      interests: [
        "Fusion of biology and technology within computational neuroscience",
        "Investigation of functional connectivity changes in neurodegenerative dementia"
      ],
      affiliations: [
        "Teaching Assistant for Computational Neuroscience",
        "Ph.D. candidate in the Faculty of Medicine, Sfax"
      ]
    }
  },
  {
    name: "Nadia El Kadmiri",
    title: "National Coordinator",
    country: "Morocco",
    institution: "IBN ZOHR University",
    email: "n.elkadmiri@uiz.ac.ma",
    image: "/assets/NationalCordinators/Nadia.jpg",
    twitter: "@NadiaElKadmiri",
    linkedin: "https://linkedin.com/in/nadiaelkadmiri",
    bio: "Associate Professor focusing on research ethics and responsible conduct of research.",
    details: {
      interests: [
        "Responsible Conduct of Research",
        "Research Ethics"
      ],
      affiliations: [
        "Associate Professor at the Polydisciplinary Faculty of Taroudant, IBN ZOHR University",
        "Regional Secretary of North Africa SONA_IBRO",
        "Fellow in Responsible Conduct research at San Diego California University",
        "Founder/President of Moroccan Association for Research and Ethics (MARE) www.association-mare.org",
        "Founder/President of Research Ethics Committee (REC)",
        "Editor in Chief of International Journal for Research and Ethics (IJRE)"
      ]
    }
  },
  {
    name: "Dr. Olivia Matshabane",
    title: "National Coordinator",
    country: "South Africa",
    institution: "Stellenbosch University",
    email: "preciousmatshabane@gmail.com",
    image: "/assets/NationalCordinators/OliviaMatshabane.jpg",
    twitter: "@DrMatshabane",
    linkedin: "https://linkedin.com/in/oliviamatshabane",
    bio: "Faculty member specializing in neuroethics and implications of neuropsychiatric genomics.",
    details: {
      interests: [
        "Neuroethics",
        "Ethical, legal, social, and cultural implications of neuropsychiatric genomics",
        "Neuroethical implications of new and emerging neurotechnologies"
      ],
      affiliations: [
        "Faculty member in the Department of Psychiatry at Stellenbosch University, South Africa",
        "Member of the Psychiatric Genomics Consortium (PGC) Africa Ethics Working Group",
        "Member of the International Brain Initiative (IBI) Cross-Cultural Neuroscience Working Group",
        "Former Secretary and Chair of the Fellows Committee of the Human Heredity and Health in Africa (H3Africa) Consortium",
        "Former Chair of the student-postdoc committee of the International Neuroethics Society",
        "Participant in roundtable discussions held by the United Nations (UN) on neurotechnologies",
        "Panellist for the BRAINshare: Sharing Data in BRAIN Initiative Studies project led by scientists at Baylor College of Medicine in the US"
      ]
    }
  },
  {
    name: "Dr. George Wanderi",
    title: "National Coordinator",
    country: "Kenya",
    institution: "University of Nairobi",
    email: "gmwanderi@yahoo.com",
    image: "/assets/NationalCordinators/George.jpg",
    twitter: "@DrWanderi",
    linkedin: "https://linkedin.com/in/georgewanderi",
    bio: "Medical doctor with expertise in neuroscience and healthcare entrepreneurship.",
    details: {
      interests: [
        "Neuroscience",
        "Regenerative Medicine",
        "Healthcare Rights"
      ],
      affiliations: [
        "Registered medical doctor based in Nairobi",
        "Alumnus of the University of Nairobi and Strathmore University",
        "Co-founder of three successful healthcare and allied brands in Nairobi, Kenya"
      ]
    }
  },
  {
    name: "Olorunnado Samson Ehindero (PhD.)",
    title: "National Coordinator",
    country: "Rwanda",
    institution: "University of Rwanda",
    email: "olorunnados@gmail.com",
    image: "/assets/NationalCordinators/Olorunnado.jpg",
    twitter: "@DrEhindero",
    linkedin: "https://linkedin.com/in/olorunnadoehindero",
    bio: "Lecturer in Human Anatomy with specialization in computational neuroscience and metabolic syndrome.",
    details: {
      interests: [
        "Computational neuroscience",
        "Metabolic syndrome",
        "Medical education"
      ],
      affiliations: [
        "Lecturer in the Department of Human Anatomy, School of Medicine and Pharmacy, University of Rwanda",
        "Bachelor of Science degree in Human Anatomy from Ahmadu Bello University, Zaria, Nigeria",
        "Master's and PhD degrees in Anatomy from the University of Ilorin, Nigeria"
      ]
    }
  },
  {
    name: "Dr. Theresa Chikopela Sikazwe",
    title: "National Coordinator",
    country: "Zambia",
    institution: "Lusaka Apex Medical University",
    email: "theresachikopela@yahoo.com",
    image: "/assets/NationalCordinators/Theresa.jpg",
    twitter: "@DrSikazwe",
    linkedin: "https://linkedin.com/in/theresasikazwe",
    bio: "Assistant Dean specializing in vascular physiology and cognitive function research.",
    details: {
      interests: [
        "Vascular physiology",
        "Arterial stiffness",
        "Endothelial dysfunction",
        "Relationship between vascular physiology and cognitive function"
      ],
      affiliations: [
        "Assistant Dean – Basic Sciences, Faculty of Medicine, Lusaka Apex Medical University",
        "Treasurer for the Zambia Neuroscience Society (ZANS)",
        "In charge of Research in the Physiological Society of Zambia (PSZ)",
        "Member of the Society of Neuroscientists of Africa (SONA)",
        "Member of the Physiology Society of Southern Africa (PSSA)"
      ]
    }
  },
  {
    name: "Tsemo Yimta Grace Maiva",
    title: "National Coordinator",
    country: "Senegal",
    institution: "Cheikh Anta Diop University",
    email: "gracetsemo@gmail.com",
    image: "/assets/NationalCordinators/Tsemo.jpeg",
    twitter: "@GraceTsemo",
    linkedin: "https://linkedin.com/in/gracetsemo",
    bio: "Neurologist and neurophysiologist specializing in nerve conduction mechanisms and neurodegenerative disease.",
    details: {
      interests: [
        "African Human Brain Imaging",
        "Neurophysiological mechanisms of nerve conduction",
        "Electrogenesis and epileptogenesis",
        "Neurodegenerative disease"
      ],
      affiliations: [
        "Neurologist and Neurophysiologist",
        "National Coordinator of African Brain Data Network in Senegal",
        "Member of the Movement Disorders Society (MDS)",
        "Member of the International League Against Epilepsy (ILAE)",
        "Member of the Cameroon Neurology Academy (CAN)",
        "Member of the Senegal Neurology Society (ASN)"
      ]
    }
  }


];

const stakeholders: Person[] = [
  {
    name: "Prof. Amadi O. Ihunwo",
    title: "Advisory Board",
    institution: "University of the Witwatersrand, South Africa",
    bio: "Head of Anatomical Sciences and SONA President",
    image: "/assets/stakeholders/Amadi.png",
    email: "amadi.Ihunwo@wits.ac.za",
    linkedin: "https://linkedin.com", // placeholder, replace with actual if available
    website: "https://www.wits.ac.za", // placeholder, replace with actual if available
    twitter: "https://twitter.com", // placeholder, replace with actual if available
    details: {
      affiliations: [
        "President, Society for Neuroscientists of Africa (SONA)",
        "Head, School of Anatomical Sciences, University of the Witwatersrand",
        "Secretary General, Society of Neuroscientists of Africa (SONA)"
      ]
    }
  },
  {
    name: "Prof. Bamidele Victor Owoyele",
    title: "Advisory Board",
    institution: "University of Ilorin, Nigeria",
    bio: "Professor of Physiology with focus on pain and neuroinflammation",
    image: "/assets/stakeholders/Bamidele.png",
    email: "deleyele@yahoo.com",
    twitter: "https://twitter.com", // placeholder, replace with actual if available
    linkedin: "https://linkedin.com", // placeholder, replace with actual if available
    website: "https://www.unilorin.edu.ng", // placeholder, replace with actual if available
    details: {
      affiliations: [
        "President, Neuroscience Society of Nigeria",
        "Department of Physiology, University of Ilorin",
        "Professor of Physiology (Neuroscience)"
      ]
    }
  }

];

const founders: Person[] = [
  {
    name: "Damian Eke PhD",
    title: "Director",
    institution: "University of Nottingham, UK",
    bio: "Damian Eke is a researcher and thought leader in ethics and governance of data and emerging technologies, with a particular focus on decolonial and global perspectives on artificial intelligence. His work critically examines how historical, social, and political power asymmetries shape data practices and AI systems, especially in African and other Global Majority contexts. He has particular expertise in brain data governance, and leads the International Brain Initiative (IBI) Working Group on Data, Tools and Technology Sharing, where he contributes to shaping globally inclusive and ethically grounded approaches to neuroscience data sharing. His scholarship spans data justice, algorithmic governance, and the ethics of emerging technologies, and he is actively involved in interdisciplinary and international research initiatives aimed at making AI development more equitable, accountable, and socially grounded.",
    image: "/assets/Founders/Damian.jpeg",
    email: "Damian.Eke@nottingham.ac.uk ",
    linkedin: "https://www.linkedin.com/in/damian-eke-80742290/",
    twitter: "",
    achievements: []
  },
  {
    name: "Eberechi Wogu PhD",
    title: "Deputy Director",
    institution: "University of Port Harcourt, Nigeria",
    bio: "Dr. Eberechi Wogu is a Neuroscientist and Lecturer in the Department of Anatomy at UNIPORT. She is the secretary of the Neuroscience Society of Nigeria and treasurer of Women in Neuroscience Nigeria. With a background in Human Anatomy (BSc and MSc) and a Ph.D. in Neurobiology from the University of Calabar, her interests include African human brain imaging, open science, African neuroanthropology, and biological mechanisms of neurodegenerative diseases.",
    image: "/assets/Founders/ebere1.jpeg",
    email: "eberechi.wogu@uniport.edu.ng",
    linkedin: "https://www.linkedin.com/in/eberechi-wogu-55293819a/",
    twitter: "",
    achievements: []
  },
  {
    name: "Filima Patrick",
    title: "Member",
    institution: "ABDN Secretariat",
    bio: "Filima Patrick is a key member of the African Brain Data Network (ABDN) Secretariat, where he contributes as a developer supporting the technical backbone of the organization’s research activities. He is involved in building and maintaining data-driven tools, research platforms, and workflows that enable efficient management, analysis, and dissemination of neuroscience data. His work supports the scalability and technical sustainability of ABDN’s initiatives across Africa.",
    image: "/assets/Team/filima.jpeg",
    email: "filimapatrick@gmail.com",
    linkedin: "https://linkedin.com/in/patrickfilima",
    twitter: "",
    achievements: []
  },
  {
    name: "Barisua Nsaanee",
    title: "Member",
    institution: "ABDN Secretariat",
    bio: "Barisua Nsaanee serves as an Administrative Officer in the ABDN Secretariat, providing crucial support in managing the organization's day-to-day operations. Her role involves coordinating various administrative tasks and ensuring effective communication within the network.",
    image: "/assets/Team/barisua2.jpeg",
    email: "bnsaanee7@gmail.com",
    linkedin: "https://linkedin.com/in/barisua-nsaanee",
    twitter: "",
    achievements: []
  },
  {
    name: "Chinyem Nkemjika Ighodaro",
    title: "Member",
    institution: "University of Benin",
    bio: "Chinyem Nkemjika Ighodaro is a Lecturer in the Department of Physiology at the University of Benin and serves as the Research Director for the African Brain Data Network (ABDN). Her work focuses on African neuroimaging, EEG datasets, and elucidating the physiological mechanisms of neurodegenerative diseases. She is dedicated to making African brain data FAIR (Findable, Accessible, Interoperable, and Reusable) to advance neuroscience research across the continent. Additionally, she advocates for diversity in science as the State Coordinator for Women in Neuroscience Nigeria.",
    image: "/assets/Team/Chinyem.jpg",
    email: "Chinyem.ighodaro@uniben.edu",
    linkedin: "https://www.linkedin.com/in/chinyem-ighodaro-427768a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    achievements: []
  }
];

const Modal = ({ isOpen, onClose, person }: { isOpen: boolean; onClose: () => void; person: Person }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <div className="h-48 relative">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent" />
              </div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-amber-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-amber-900 mb-2">{person.name}</h3>
              <p className="text-amber-600 mb-4">{person.title}</p>

              {person.country && (
                <div className="flex items-center text-amber-700 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{person.country}</span>
                </div>
              )}

              <div className="flex items-center text-amber-700 mb-4">
                <Building2 className="h-4 w-4 mr-1" />
                <span>{person.institution}</span>
              </div>

              <p className="text-amber-700 mb-6">{person.bio}</p>

              {person.achievements && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-amber-900 mb-3">Achievements</h4>
                  <ul className="space-y-2">
                    {person.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start text-amber-700">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-amber-500" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {person.details?.affiliations && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-amber-900 mb-3">Affiliations/Portfolio</h4>
                  <ul className="space-y-2">
                    {person.details.affiliations.map((affiliation, index) => (
                      <li key={index} className="flex items-start text-amber-700">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-amber-500" />
                        <span>{affiliation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {person.details?.interests && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-amber-900 mb-3">Research Interests</h4>
                  <ul className="space-y-2">
                    {person.details.interests.map((interest, index) => (
                      <li key={index} className="flex items-start text-amber-700">
                        <ArrowRight className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-amber-500" />
                        <span>{interest}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-amber-900 mb-3">Connect</h4>
                <div className="space-y-3">
                  {person.email && (
                    <a
                      href={`mailto:${person.email}`}
                      className="flex items-center text-amber-700 hover:text-amber-900 transition-colors"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      <span>{person.email}</span>
                    </a>
                  )}
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-amber-700 hover:text-amber-900 transition-colors"
                    >
                      <Linkedin className="h-5 w-5 mr-2" />
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                  {person.twitter && (
                    <a
                      href={`https://twitter.com/${person.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-amber-700 hover:text-amber-900 transition-colors"
                    >
                      <Twitter className="h-5 w-5 mr-2" />
                      <span>{person.twitter}</span>
                    </a>
                  )}
                  {person.website && (
                    <a
                      href={person.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-amber-700 hover:text-amber-900 transition-colors"
                    >
                      <LinkIcon className="h-5 w-5 mr-2" />
                      <span>Personal Website</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-amber-100">
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function People() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [showAllCoordinators, setShowAllCoordinators] = useState(false);
  const seo = seoConfig.people;

  // Display initial 6 coordinators or all when showAllCoordinators is true
  const displayedCoordinators = showAllCoordinators
    ? nationalCoordinators
    : nationalCoordinators.slice(0, 6);

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        url={seo.url}
      />
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
                  Our People
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl text-amber-100 max-w-3xl mx-auto"
              >
                Meet the dedicated individuals and organizations driving neuroscience research and education across Africa
              </motion.p>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">ABDN Secretariat</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                The dedicated team managing ABDN's operations and initiatives
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {founders.map((founder, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-48 relative bg-amber-100">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-amber-900 mb-2">{founder.name}</h3>
                    <p className="text-amber-600 mb-4">{founder.title}</p>
                    <div className="flex items-center text-amber-700 mb-4">
                      <Building2 className="h-4 w-4 mr-1" />
                      <span>{founder.institution}</span>
                    </div>
                    <p className="text-amber-700 mb-6 line-clamp-3">{founder.bio}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        {founder.email && (
                          <a href={`mailto:${founder.email}`} className="text-amber-600 hover:text-amber-800">
                            <Mail className="h-5 w-5" />
                          </a>
                        )}
                        {founder.linkedin && (
                          <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">
                            <Linkedin className="h-5 w-5" />
                          </a>
                        )}
                        {founder.twitter && (
                          <a href={`https://twitter.com/${founder.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800">
                            <Twitter className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => setSelectedPerson(founder)}
                        className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg font-semibold transition-colors flex items-center gap-2"
                      >
                        More Info
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stakeholders Section */}
        <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Our Stakeholders</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Key persons and institutions supporting our mission
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stakeholders.map((stakeholder, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 bg-amber-100">
                    <img
                      src={stakeholder.image}
                      alt={stakeholder.name}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-amber-900 mb-2">{stakeholder.name}</h3>
                    <p className="text-amber-600 mb-4">{stakeholder.title}</p>
                    <div className="flex items-center text-amber-700 mb-4">
                      <Building2 className="h-4 w-4 mr-1" />
                      <span>{stakeholder.institution}</span>
                    </div>
                    <p className="text-amber-700 mb-6">{stakeholder.bio}</p>
                    <button
                      onClick={() => setSelectedPerson(stakeholder)}
                      className="w-full px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      More Info
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* National Coordinators Section */}
        <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">National Coordinators</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Our network of coordinators leading neuroscience initiatives across African nations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedCoordinators.map((coordinator, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 bg-amber-100">
                    <img
                      src={coordinator.image}
                      alt={coordinator.name}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-amber-900 mb-2">{coordinator.name}</h3>
                    <div className="flex items-center text-amber-700 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{coordinator.country}</span>
                    </div>
                    {/* <div className="flex items-center text-amber-700 mb-4">
                      <Building2 className="h-4 w-4 mr-1" />
                      <span>{coordinator.institution}</span>
                    </div> */}
                    <p className="text-amber-700 mb-6">{coordinator.bio}</p>
                    <button
                      onClick={() => setSelectedPerson(coordinator)}
                      className="w-full px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      More Info
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {nationalCoordinators.length > 6 && (
              <div className="flex justify-center mt-12">
                <motion.button
                  onClick={() => setShowAllCoordinators(!showAllCoordinators)}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow-md hover:from-amber-600 hover:to-amber-700 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showAllCoordinators ? (
                    <>
                      Show Less
                      <ArrowRight className="h-5 w-5 rotate-90" />
                    </>
                  ) : (
                    <>
                      Show More ({nationalCoordinators.length - 6} more)
                      <ArrowRight className="h-5 w-5 -rotate-90" />
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </div>
        </section>

        <Modal
          isOpen={!!selectedPerson}
          onClose={() => setSelectedPerson(null)}
          person={selectedPerson!}
        />
      </main>
    </Layout>
    </>
  );
} 
import React, { useState } from 'react';
import { motion, useScroll, useTransform, useAnimationFrame } from 'framer-motion';
import { Linkedin, Globe, Mail, Briefcase, GraduationCap, MapPin, Calendar, Star } from 'lucide-react';
import Layout from '../../components/Layout';

interface Alumni {
  id: number;
  name: string;
  role: string;
  currentPosition: string;
  currentOrganization: string;
  location: string;
  cohort: number; // 2023, 2024, or 2025
  photo: string;
  bio: string;
  experience: string;
  socialLinks: {
    linkedin?: string;
    website?: string;
    email?: string;
  };
  skills: string[];
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  organization: string;
  image: string;
  quote: string;
  rating: number;
}

// Add back the interface definition
interface InfiniteScrollProps {
  children: React.ReactNode;
  direction?: number;
  speed?: number;
}

const alumniData: Alumni[] = [
  {
    id: 1,
    name: "Asuquo Olaitan Ruth",
    role: "Lecturer and Neuroscience Researcher",
    currentPosition: "Associate Professor and Head of Department",
    currentOrganization: "University of Calabar",
    location: "Calabar, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/asuquo-olaitan-ruth.jpg",
    bio: "Asuquo Olaitan Ruth is a dedicated academic with expertise in Reproductive Neuroendocrinology and Neuroanatomy. Her research focuses on the neuroendocrine regulation of reproductive health and its impact on the hypothalamic-pituitary-gonadal axis. She is passionate about advancing knowledge in neuroscience and anatomical sciences, with a particular emphasis on improving healthcare outcomes in Nigeria.",
    experience: "Asuquo is currently serving as an Associate Professor and Head of the Department of Anatomical Sciences at the University of Calabar, where she has contributed extensively to teaching, research, and departmental leadership. Her work in neuroendocrinology and reproductive health involves studying the effects of various compounds on the hypothalamic-pituitary-gonadal axis using animal models.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/asuquo-olaitan-ruth",
      email: "olaasuquo@unical.edu.ng"
    },
    skills: [
      "Neuroendocrinology",
      "Neuroanatomy",
      "Histology",
      "Medical Research",
      "Data Analysis",
      "Research Supervision",
      "Lecturing"
    ]
  },
  {
    id: 2,
    name: "Abdulrahman Adesola Belo",
    role: "Graduate Assistant and Neuroscience Researcher",
    currentPosition: "Graduate Assistant",
    currentOrganization: "Olabisi Onabanjo University",
    location: "Ogun State, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/abdulrahman-adesola-belo.jpg",
    bio: "Abdulrahman Adesola Belo is a passionate Graduate Assistant and emerging neuroscience researcher with a strong background in human anatomy. He is actively seeking opportunities to enhance his research skills and grow in a mission-oriented environment that fosters professional development.",
    experience: "Abdulrahman currently serves as a Graduate Assistant at Olabisi Onabanjo University, where he assists in gross anatomy demonstrations and postgraduate research in histology. Previously, he worked as a Research Assistant at the Neuro-Phytotherapy Research Unit, conducting data analysis and laboratory experiments, and contributing to peer-reviewed publications.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/abdulrahman-belo-a049781b1",
      email: "adesholabaylow@gmail.com"
    },
    skills: [
      "Microsoft PowerPoint and Word",
      "Excel Spreadsheet",
      "GraphPad Prism",
      "SPSS",
      "Laboratory Experiments (mice and drosophila models)",
      "Analytical Thinking",
      "Interpersonal and Teamwork",
      "Written and Verbal Communication",
      "Scientific Documentation"
    ]
  },
  {
    id: 3,
    name: "Vicent Balitema",
    role: "IT Officer and Data Science Enthusiast",
    currentPosition: "Project Coordinator & IT Officer",
    currentOrganization: "Mbarara University Data Science Research Hub (MUDSReH)",
    location: "Mbarara, Uganda",
    cohort: 2023,
    photo: "/images/alumni/vicent-balitema.jpg",
    bio: "Vicent Balitema is a dedicated IT Officer and Data Science enthusiast with a strong background in information technology, software development, and project coordination. He is passionate about leveraging technology and data-driven approaches to solve problems in health, research, and education domains across Africa.",
    experience: "Vicent currently serves as Project Coordinator and IT Officer at the Mbarara University Data Science Research Hub (MUDSReH), where he oversees project implementation, supports AI services, manages infrastructure, and leads technical operations. He also contributes to teaching and mentoring students in programming and database technologies.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/vicent-balitema",
      email: "BalitemaVicent@gmail.com"
    },
    skills: [
      "Project Coordination",
      "Software Development",
      "Network Infrastructure",
      "Data Management",
      "Teaching and Mentorship"
    ]
  },
  {
    id: 4,
    name: "IBEACHU CHINAGOROM",
    role: "Senior Lecturer",
    currentPosition: "Senior Lecturer",
    currentOrganization: "University of Port-Harcourt",
    location: "Port-Harcourt, Rivers State, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/ibeachu-chinagorom.jpg",
    bio: "Senior Lecturer at the Department of Human Anatomy, University of Port-Harcourt, with expertise in rodent models and neurobehavioral testing.",
    experience: "Extensive experience in tissue preparation, staining, and rodent brain dissection at the Department of Anatomy, College of Health Sciences.",
    socialLinks: {
      email: "chinagorom.ibeachu@uniport.edu.ng"
    },
    skills: [
      "Rodent models",
      "Tissue preparation and staining",
      "Neurobehavioral test",
      "Passive avoidance test",
      "Morris water maze",
      "Elevated plus maze",
      "Histology",
      "Immunohistochemistry",
      "Rodent brain dissection",
      "Rodent stereotaxic surgery",
      "Microscopy"
    ]
  },
  {
    id: 5,
    name: "Oumayma SOULA",
    role: "PhD Student in Neuroscience",
    currentPosition: "PhD Candidate",
    currentOrganization: "Faculty of Medicine of Sfax, University of Sfax",
    location: "Sfax, Tunisia",
    cohort: 2024,
    photo: "",
    bio: "PhD candidate researching functional connectivity and early biomarkers in neurodegenerative diseases using fMRI and machine learning.",
    experience: "Currently working on fMRI preprocessing, connectivity matrix construction, and analysis to uncover functional alterations in neurodegenerative disease.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/oumaïma-soula",
      email: "oumayma.soula@gmail.com"
    },
    skills: [
      "Neuroscience Research",
      "fMRI preprocessing",
      "Functional connectivity analysis",
      "Machine learning",
      "Python"
    ]
  },
  {
    id: 6,
    name: "Smart Chidi Oparaugo",
    role: "Medical Doctor and Neuroscience Researcher",
    currentPosition: "Research Assistant",
    currentOrganization: "University of Port Harcourt",
    location: "Port Harcourt, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/smart-chidi-oparaugo.jpg",
    bio: "Smart Chidi Oparaugo is a dedicated Medical Doctor and Neuroscience researcher with a keen interest in computational neuroscience and the application of artificial intelligence in healthcare. His work focuses on leveraging advanced computational tools to enhance diagnostic and therapeutic approaches in neurological disorders, aiming to improve healthcare outcomes in Nigeria and beyond.",
    experience: "Smart is currently a Research Assistant at the University of Port Harcourt, where he contributes to projects exploring the intersection of computational neuroscience and AI-driven healthcare solutions. His research involves analyzing neural data to develop innovative models for understanding brain functions and disorders.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/smart-chidi-oparaugo-275439144",
      email: "soparaugo108@uniport.edu.ng"
    },
    skills: ["Computational Neuroscience", "Artificial Intelligence", "Data Analysis", "Medical Research"]
  },
  {
    id: 7,
    name: "Falonne Tiffany NIAKAM MBOULEUP",
    role: "Aspiring Neurologist and Neurovascular Specialist",
    currentPosition: "General Practitioner",
    currentOrganization: "Douala Clinic",
    location: "Sicap Baobab, Senegal",
    cohort: 2023,
    photo: "/images/alumni/falonne-tiffany-niakam-mbouleup.jpg", 
    bio: "Aspiring neurologist and neurovascular specialist, my mission is to raise awareness about stroke and improve the quality of life of stroke survivors.",
    experience: "General practitioner at Douala Clinic and Mambanda Subdivision Medical Center, managing in-patients and out-patients with general medicine and neurology disorders.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/tiffany-falonne-niakam-847171264",
      email: "falonneniakam@yahoo.com"
    },
    skills: [
      "Neurology",
      "General Medicine",
      "Stroke Awareness",
      "Neurovascular Specialization"
    ]
  },
  {
    id: 8,
    name: "Felix Chege Ng'ang'a",
    role: "Computer Scientist",
    currentPosition: "Freelancer",
    currentOrganization: "Self-Employed",
    location: "10203 Kigumo, Kenya",
    cohort: 2023,
    photo: "/images/alumni/felix-chege-nganga.jpg",
    bio: "A motivated, adaptable, and responsible Computer Scientist seeking an IT position that utilizes the professional and technical skills developed through freelancing and education. Known for methodical, customer-focused approach and a strong drive to complete projects successfully.",
    experience: "Freelanced as a computer scientist, successfully launching and migrating two major IT systems on time and within budget. Completed 7 data analysis projects during a Data Analytics Nanodegree with Udacity.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/chege-nganga",
      email: "chegenganga08@gmail.com"
    },
    skills: [
      "Python",
      "Java",
      "C++",
      "C",
      "JavaScript",
      "React",
      "PHP",
      "SQL",
      "Artificial Intelligence",
      "Machine Learning",
      "Networking Fault Diagnostics",
      "Huawei Routers",
      "Software Testing",
      "Code Debugging",
      "API Development"
    ]
  },
  {
    id: 9,
    name: "Rosemary Nwosu",
    role: "Undergraduate Student and Neuroscience Enthusiast",
    currentPosition: "Neuroscience Vice President",
    currentOrganization: "University of Port Harcourt",
    location: "Port Harcourt, Rivers State, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/rosemary-nwosu.jpg",
    bio: "Rosemary Nwosu is an undergraduate student in Human Anatomy at the University of Port Harcourt, with a growing passion for neuroscience. She has served as the Vice President of the Neuroscience Club (2021-2022) and has gained valuable experience in leadership roles. Rosemary is also passionate about using social media to promote neuroscience and its impact on society.",
    experience: "Rosemary has gained diverse experience as a computer operator, graphic designer, and teacher. She worked at Globatechs World Computer Institute and taught at Bristo International School in Lagos. In addition, she was the Social Media Manager for Women in Neuroscience (University of Port Harcourt) from 2019 to 2022, where she grew and maintained the organization's social media presence. She also worked as a marketer with Silverbird TV/Rhythm FM and other agencies, handling affiliate marketing and real estate consulting.",
    socialLinks: {
      "linkedin": "https://www.linkedin.com/in/rosemary-nwosu",
      "email": "rossyharmless15@gmail.com"
    },
    skills: [
      "Data Science",
      "Graphic Designing",
      "Tie and Dye",
      "Web Design",
      "Copywriting",
      "Social Media Management"
    ]
  },
  {
    id: 10,
    name: "Erica Azechum Akanko",
    role: "Biomedical Engineer and Researcher",
    currentPosition: "Research Assistant",
    currentOrganization: "Noguchi Memorial Institute for Medical Research",
    location: "Accra, Ghana",
    cohort: 2023,
    photo: "/images/alumni/erica-azechum-akanko.jpg",
    bio: "Erica Azechum Akanko is a Biomedical Engineer with a focus on bioinformatics and machine learning applications in healthcare. She is currently working as a Research Assistant at the Noguchi Memorial Institute for Medical Research, Accra, Ghana, and has a deep interest in developing diagnostic tools for diseases and predicting therapeutic agents for health conditions such as breast cancer.",
    experience: "Erica has contributed to several research projects, including developing a rapid diagnostic kit for Buruli Ulcer in the northern regions of Ghana, utilizing antigen capture detection. She also worked on a machine learning model to predict inhibitors for Aromatase as a potential breast cancer therapy. Additionally, Erica developed an orthopedic wearable to stimulate bone healing using infrared light during her time at Worcester Polytechnic Institute.",
    socialLinks: {
      "linkedin": "https://www.linkedin.com/in/erica-akanko",
      "email": "eakanko001@st.ug.edu.gh"
    },
    skills: [
      "Bioinformatics",
      "Machine Learning",
      "Bioinstrumentation",
      "Molecular Docking",
      "Molecular Dynamics Simulation",
      "Circuit Design",
      "CAD Design"
    ]
  },
  {
    id: 11,
    name: "Eman Khalil",
    role: "Cell Biologist and Researcher",
    currentPosition: "Research Assistant & Teaching Assistant",
    currentOrganization: "American University in Cairo",
    location: "Cairo, Egypt",
    cohort: 2023,
    photo: "/images/alumni/eman-khalil.jpg",
    bio: "Eman Khalil is a passionate Cell Biologist with expertise in neurotoxicity, chronic wound healing, and novel therapeutics for CNS trauma. Her work at the American University in Cairo combines her research experience with teaching in fields such as neuroscience, ecology, and animal behavior. She is dedicated to advancing medical research and finding innovative solutions to pressing health issues, particularly in neurotoxicity and wound healing.",
    experience: "Eman currently serves as a Research Assistant and Teaching Assistant at the American University in Cairo, where she contributes to several groundbreaking projects in neurotoxicity and wound healing, including studying marine extracts and natural materials for therapeutic uses. She has also worked as an Assistant Lecturer at Ain Shams University and has extensive experience in clinical chemistry and HR development.",
    socialLinks: {
      "linkedin": "https://www.researchgate.net/profile/Eman_Khalil10",
      "email": "eman.a.khalil@gmail.com"
    },
    skills: [
      "Neurotoxicity",
      "Chronic Wound Healing",
      "Marine Extracts Research",
      "Nanomaterial Development",
      "Cell Biology",
      "Histology",
      "Medical Research"
    ]
  },
  {
    id: 12,
    name: "Felix Mburu Njoroge",
    role: "Medical Student and Entrepreneur",
    currentPosition: "5th Year MBChB Student",
    currentOrganization: "University of Nairobi (UoN)",
    location: "Nairobi, Kenya",
    cohort: 2023,
    photo: "/images/alumni/felix-mburu.jpg",
    bio: "Felix Mburu Njoroge is a dedicated 5th-year MBChB student at the University of Nairobi, passionate about neuroscience, health informatics, and medical education. With a background in human anatomy and data science, Felix is involved in various initiatives including medical illustration, research, and entrepreneurship, striving to bridge the gap between technology and healthcare. He is also the founder of the XYZediZedi Medical Education Platform and a committed leader in various cultural and academic committees.",
    experience: "Felix serves as the Editorial Assistant and Managing Editor for the East African Journal of Neurological Sciences, and has founded multiple ventures including MTG Branding and Printing Services. He is also deeply engaged in academia as a Teaching Assistant in the Department of Human Anatomy and Physiology and an active contributor to student leadership as the Chair of AMSUN Art Club and FHS Cultural Week Committee.",
    socialLinks: {
      linkedin: "https://shorturl.at/OYjub",
      website: "https://github.com/FelixMburu",
      email: "felixnjoroge6@gmail.com"
    },
    skills: [
      "Data Science (Python, SQL, Tableau)",
      "Medical Illustration",
      "Medical Education",
      "Research Methodologies",
      "Leadership",
      "Neuroscience",
      "Health Informatics",
      "Public Health",
      "Art",
      "Education",
      "Entrepreneurship"
    ]
  },
  {
    id: 13,
    name: "Naabiae B. Goodness",
    role: "Neuroscience Advocate",
    currentPosition: "BSc, Human Anatomy Student",
    currentOrganization: "University of Port Harcourt",
    location: "Choba Exe Rd, Obi-nkitaSt, PH, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/naabiae-goodness.jpg",
    bio: "Naabiae B. Goodness is a passionate neuroscience advocate with a fervent interest in self-development and promoting health through service. She is eager to contribute her knowledge and enthusiasm to make meaningful contributions to neuroscience, particularly in neuroimaging research and data analysis. Naabiae is currently pursuing a BSc in Human Anatomy at the University of Port Harcourt, with ongoing research focusing on the influence of gender and age on anatomical parameters from imaging datasets.",
    experience: "Naabiae has volunteered with the Nigeria Red Cross Society as a first-person responder, participated in health insurance excess internships, and managed social media for Brain Health Awareness programs. She also served at the registration desk for the 2021 Neuroscience Society of Nigeria conference and is currently the Vice President of the Youth Neuroscience Association of Nigeria, where she actively participates in research workshops and studies related to animal behavior and brain perfusion fixation.",
    socialLinks: {
      "email": "goodynaab@gmail.com"
    },
    skills: [
      "Neuroimaging Research",
      "Data Analysis",
      "Medical Education",
      "Communication",
      "Research Writing",
      "Health and Safety Protocols",
      "Microsoft Office"
    ]
  },
  {
    id: 14,
    name: "Joshua Ayodele Yusuf",
    role: "Bachelor of Technology in Human Anatomy",
    currentPosition: "Research Intern",
    currentOrganization: "Gen'Omics Bioinformatics Research Hub",
    location: "Ogbomoso, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/joshua-ayodele-yusuf.jpg",
    bio: "Joshua Ayodele Yusuf is a Bachelor of Technology in Human Anatomy student with a keen interest in neuroimaging, machine learning, and computational neuroscience. He has gained valuable experience through internships and research, including working with fMRI recordings as part of the Human Connectome Project and conducting research on the neurotoxic effects of caffeine and alcohol. Joshua is dedicated to advancing his knowledge in neurotoxicology and bioinformatics.",
    experience: "Joshua has been involved in several significant projects, including the Human Connectome Project (fMRI recordings from brain regions), SIWES at Bowen University Teaching Hospital (exposure to surgical and anatomic pathology), and a research internship at the Gen'Omics Bioinformatics Research Hub. He has also participated in research at Eagles' Research Lab at Ladoke Akintola University of Technology.",
    socialLinks: {
      "email": "yusufjoshuaayodele@gmail.com"
    },
    skills: [
      "SPSS",
      "GraphPad Prism",
      "Photomicrography",
      "Machine Learning",
      "Google Colab",
      "GitHub",
      "Python",
      "Google Analytics",
      "MS Suite",
      "Data Analytics"
    ]
  },
  {
    id: 15,
    name: "Kojo Nketia",
    role: "Research Assistant in Mathematical Modelling and Data Analysis",
    currentPosition: "Research Assistant",
    currentOrganization: "Noguchi Memorial Institute for Medical Research (NMIMR)",
    location: "Ayawaso West, Botanical Gardens Road, G4489, Ghana",
    cohort: 2023,
    photo: "/images/alumni/kojo-nketia.jpg",
    bio: "Kojo Nketia is a passionate researcher with a strong background in mathematical modelling, data analysis, and computational neuroscience. His experience as a Research Assistant at the Noguchi Memorial Institute for Medical Research in Ghana has allowed him to contribute to projects involving DNA extractions, PCRs, and ELISA techniques. He has also developed skills in programming and machine learning, which he applies to his research projects.",
    experience: "Kojo currently serves as a Research Assistant in Mathematical Modelling and Data Analysis at the Noguchi Memorial Institute for Medical Research. He has also participated in a variety of academic and extracurricular activities, such as presenting talks on stability of linear differential equations and collaborating on projects involving the Lorenz Equation and image derivatives.",
    socialLinks: {
      email: "knketia001@st.ug.edu.gh"
    },
    skills: [
      "Python",
      "C++",
      "LATEX",
      "R Programming",
      "Machine Learning",
      "Git",
      "Github"
    ]
  },
  {
    id: 16,
    name: "Jane Uchechi Obiako",
    role: "Research Assistant in Anatomy",
    currentPosition: "Research Assistant",
    currentOrganization: "University of Ibadan",
    location: "Ibadan, Oyo State, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/jane-obiako.jpg",
    bio: "Jane Uchechi Obiako is a researcher focused on the neurobiology of learning and memory, neurodegenerative disorders, and neuropharmacology. She completed her M.Sc. in Anatomy at the University of Ibadan, where she researched the dose-dependent effects of Vanadium on the hippocampus of juvenile hydrocephalic mice. She has a strong background in data analysis and data science, contributing to multiple research projects in neurobiology and pharmacology.",
    experience: "Jane currently works as a Research Assistant at the University of Ibadan's Department of Anatomy, focusing on developmental neurobiology and neuropharmacology. She has extensive experience in lab protocol optimization, histological tissue processing, immunohistochemistry, and manuscript writing. Jane also served as a Research Intern and Anatomy Practical Demonstrator, contributing to teaching and research efforts in both neurobiology and anatomy.",
    socialLinks: {
      email: "janeobiako87@gmail.com",
      website: "https://orcid.org/0000-0002-6388-5083"
    },
    skills: [
      "Neurobiology of Learning and Memory",
      "Neurodegenerative Disorders",
      "Neuropharmacology",
      "Data Analysis",
      "Data Science",
      "Histological Tissue Processing",
      "Immunohistochemistry",
      "Manuscript Writing"
    ]
  },
  {
    id: 17,
    name: "Stephen Kiilu",
    role: "Machine Translation Expert & AI Researcher",
    currentPosition: "Machine Translation Expert",
    currentOrganization: "VoxCroft Analytics, Cape Town, South Africa (Remote)",
    location: "Nairobi, Kenya",
    cohort: 2022,
    photo: "/images/alumni/stephen-kiilu.jpg",
    bio: "Stephen Kiilu is an AI and machine learning researcher with a strong focus on computational neuroscience and artificial intelligence. He holds a Master's degree in Mathematical Sciences from the African Institute for Mathematical Sciences (AIMS), Rwanda, and is currently specializing in machine translation, particularly in adapting language models to low-resource languages. He has been involved in a number of research projects, including those related to time series analysis, AI-based disease classification, and machine translation systems.",
    experience: "Stephen is a Machine Translation (MT) expert at VoxCroft Analytics, where he focuses on training AI models for English-to-Swahili translation. He has also worked as an Environment and Sustainability Advisor at Crossroads International, supporting gender equality, women empowerment, and climate change programs in Ghana. Previously, Stephen worked as a Data Analyst at Glacier Products Limited and as a Content Supervisor at the Kenya National Bureau of Statistics (KNBS), overseeing large-scale data collection projects.",
    socialLinks: {
      email: "skiilu@aimsammi.org",
      website: "https://orcid.org/401000118"
    },
    skills: [
      "Machine Translation",
      "AI Research",
      "Computational Neuroscience",
      "Python and R",
      "PyTorch, HF Transformers, JAX, and Scikit-Learn",
      "STATA, SPSS, SQL, Tableau",
      "Bash/Zsh, Linux, LATEX, macOS, Microsoft Office",
      "Swahili (native), English (fluent)"
    ]
  },
  {
    id: 18,
    name: "TSEMO YIMTA GRACE MAIVA",
    role: "Physician specializing in Neurology",
    currentPosition: "Consultant and Hospitalist Physician",
    currentOrganization: "Fann University Hospital, Neurology Department",
    location: "Dakar, Senegal",
    cohort: 2023,
    photo: "/images/alumni/tesemo-grace-maiva.jpg",
    bio: "TSEMO YIMTA GRACE MAIVA is a passionate physician specializing in neurology with a particular interest in abnormal movements and epileptology. She is currently completing her residency in neurology at Cheikh Anta Diop University, Senegal. Dr. Maiva has demonstrated exceptional patient care and management skills and thrives in both team-based and independent work environments.",
    experience: "Dr. Maiva has worked as a general emergency practitioner at Yaoundé University Hospital Center (CHUY), Cameroon (2019–2021), and has been a consultant and hospitalist physician at the neurology department of Fann University Hospital in Dakar, Senegal, since January 2021. She also has extensive training in treating Parkinson's disease, eye movement disorders, urinary dysfunction in movement disorders, and cervical dystonia using botulinum toxin.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/tesemo-yimta-grace-maiva",
      email: "gracetsemo@gmail.com"
    },
    skills: [
      "Abnormal Movements",
      "Epileptology",
      "Neurovascular and Inflammatory Pathologies",
      "Patient Care",
      "Botulinum Toxin Treatment",
      "Speech Disorders in Parkinson's Disease",
      "Teamwork",
      "Rigor"
    ]
  },
  {
    id: 19,
    name: "Unshur Ahmed",
    role: "Graduate Researcher in Neuroscience",
    currentPosition: "Graduate Researcher",
    currentOrganization: "International University of Africa (IUA)",
    location: "Mogadishu, Somalia",
    cohort: 2024,
    photo: "/images/alumni/unshur-amhadi.jpg",
    bio: "Unshur Amhadi is a dedicated graduate researcher with a focus on psychology and neuroscience. With a strong academic background, he is keen on advancing his research in understanding human behavior and mental health within diverse populations.",
    experience: "Unshur is currently a graduate researcher at the International University of Africa, where he is involved in research in psychology and neuroscience. He previously served as an adjunct lecturer at City University of Mogadishu, facilitating courses in psychology and human behavior.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/unshur-amhadi",
      email: "unshuramh@gmail.com"
    },
    skills: [
      "Psychological Research Methods",
      "Neuroscience Data Analysis",
      "SPSS",
      "Cognitive Psychology",
      "Human Behavior Analysis",
      "Teaching and Mentoring",
      "Public Speaking",
      "Academic Writing"
    ]
  },
  {
    id: 20,
    name: "Chidi Ukamaka Betrand",
    role: "Lecturer in Computer Science",
    currentPosition: "Lecturer",
    currentOrganization: "Federal University of Technology Owerri",
    location: "Imo State, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/chidi-betrand.jpg",
    bio: "Chidi Ukamaka Betrand is a committed academic with expertise in computer science. With over a decade of teaching and research experience, she brings innovation and a passion for excellence to her role as a lecturer.",
    experience: "Chidi is currently a lecturer at the Federal University of Technology Owerri since 2019. She previously served at Teacher College Dikwa (N.Y.S.C), Alpha Comprehensive Training College in Port Harcourt, and Convecomputers in Lagos.",
    socialLinks: {
      linkedin: "",
      email: "chidi.betrand@futo.edu.ng"
    },
    skills: [
      "Excellent Writing and Communication",
      "Interpersonal Skills",
      "Innovation",
      "Goal-Oriented",
      "Result-Oriented",
      "Research"
    ]
  },
  {
    id: 21,
    name: "Zainab Ashimiyu-Abdusalam",
    role: "Research Assistant & Bioinformatician",
    currentPosition: "Graduate Research Assistant",
    currentOrganization: "Nigeria Institute of Medical Research",
    location: "Lagos, Nigeria",
    cohort: 2023,
    photo: "/images/alumni/zainab-ashimiyu.jpg",
    bio: "Zainab Ashimiyu-Abdusalam is a pharmacologist and computational biologist with experience in computer-aided drug design, bioinformatics, and vaccine research. With a passion for simplifying complex biological data through technology, she bridges science and innovation.",
    experience: "Zainab is a Graduate Research Assistant at the Nigeria Institute of Medical Research, where she works on qPCR, PCR, and peptide vaccine design. She has previously worked as a Research Assistant at the College of Medicine, University of Lagos; a Drug Development Intern at Hackbio; a Computational Biology Intern at Pine Biotech; and a Research & Lab Assistant at NAFDAC. She also contributed to bioengineering projects as a Summer Intern at Rice360 and Design Studio.",
    socialLinks: {
      linkedin: "",
      email: "ziabdusalam@gmail.com",
     
    },
    skills: [
      "Computer-aided Drug Design",
      "Bioinformatics",
      "Molecular Docking",
      "PCR & qPCR",
      "Python Programming",
      "Data Analysis",
      "Discovery Studio",
      "Chemmine Workbench",
      "Gene Expression Analysis",
      "ELISA",
      "Gel Electrophoresis",
      "Ubuntu/Linux OS"
    ]
  },
  {
    id: 22,
    name: "Samson Ehindero Olorunnado",
    role: "Lecturer in Anatomy",
    currentPosition: "Lecturer",
    currentOrganization: "University of Rwanda",
    location: "Rwanda",
    cohort: 2024,
    photo: "",
    bio: "Lecturer and researcher in neuroanatomy, focusing on neuroprotection, hippocampal histomorphology, and behavioral neuroscience in insulin resistance models.",
    experience: "Currently lectures at the University of Rwanda and conducts research on neuroprotective agents like trans-cinnamaldehyde using rodent models. Extensive background in anatomical and behavioral neuroscience studies.",
    socialLinks: {
      linkedin: "",
      email: "olorunnados@gmail.com"
    },
    skills: [
      "Electrophysiological techniques",
      "Python programming and statistical analysis",
      "Scientific writing/manuscript preparation",
      "Rodent behavioral tests",
      "Microscopy and immunohistochemistry"
    ]
  },
  {
    id: 23,
    name: "Anita Esi Eshun",
    role: "Data Scientist & Instructor",
    currentPosition: "Data Science Instructor",
    currentOrganization: "Blossom Academy",
    location: "Greater Accra, Ghana",
    cohort: 2024,
    photo: "",
    bio: "Data Scientist with a background in Statistics and a passion for using AI to solve Africa’s health-related challenges. Experienced in research, machine learning, and data visualization.",
    experience: "Currently instructing a GIZ-sponsored cohort at Blossom Academy on Excel, SQL, Power BI, Python, and ML. Former Research Assistant at LISA-KNUST. Has conducted statistical consulting for medical and social science clients as a freelancer.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/anita-esi-eshun-4968141b1",
      email: "anitaeshun5@gmail.com"
    },
    skills: [
      "Statistics",
      "Machine Learning",
      "Python",
      "R",
      "SPSS",
      "Big Data Analysis",
      "Database Management",
      "Front-End Web Development",
      "Data Visualization",
      "Responsible AI and Ethics"
    ]
  },
  {
    id: 24,
    name: "Fadiji Olatundun Oluwapelumi",
    role: "Graduate Research Assistant in Biochemistry",
    currentPosition: "Graduate Research Assistant",
    currentOrganization: "Nigerian Institute of Medical Research (NIMR)",
    location: "Lagos, Nigeria",
    cohort: 2024,
    photo: "",
    bio: "First-class Biochemistry graduate with hands-on research experience in molecular biology, toxicology, and vaccine development. Passionate about translational science and mental health research.",
    experience: "Currently assisting in vaccine development research at NIMR, Lagos. Previously involved in molecular neurology research at FUTA and conducted in-vitro biochemical studies as an undergraduate researcher. Skilled in PCR, Western Blotting, DNA extraction, and data analysis using GraphPad Prism.",
    socialLinks: {
      linkedin: "",
      email: "olatundunoluwapelumi3@gmail.com"
    },
    skills: [
      "Molecular biology techniques",
      "PCR and qPCR",
      "Spectrophotometry",
      "SDS-PAGE and Western Blotting",
      "Python programming",
      "GraphPad Prism",
      "Scientific writing",
      "Leadership and coordination",
      "Critical thinking",
      "Microsoft Office"
    ]
  },
  {
    id: 25,
    name: "Ogunmiluyi Oluwafunmbi Ebenezer",
    role: "Graduate Assistant in Neurophysiology",
    currentPosition: "Graduate Assistant",
    currentOrganization: "University of Medical Sciences, Ondo",
    location: "Ondo, Nigeria",
    cohort: 2024,
    photo: "",
    bio: "Masters student in Neurophysiology with hands-on experience in EEG and behavioral neuroscience. Interested in neurotoxicity research and applying data science tools for neuroimaging and brain data analysis.",
    experience: "Currently working as a Graduate Assistant at the University of Medical Sciences, Ondo. Past experience includes EEG lab internship at Federal Teaching Hospital, Ido-Ekiti. Has contributed to multiple experimental projects involving stress, epilepsy, inflammation, and neurotoxicity in animal models.",
    socialLinks: {
      linkedin: "",
      email: "oogunmiluyi@unimed.edu.ng"
    },
    skills: [
      "EEG acquisition and analysis",
      "Computational neuroscience",
      "Python and R",
      "GraphPad and SPSS",
      "Neurobehavioral studies",
      "Scientific writing",
      "Team collaboration",
      "Statistical analysis",
      "Signal processing",
      "Problem-solving"
    ]
  },
  {
    id: 26,
    name: "Joan Mutahi",
    role: "PhD Fellow and Clinical Psychologist",
    currentPosition: "PhD Fellow",
    currentOrganization: "Aga Khan University, ALMA Consortium",
    location: "Nairobi, Kenya",
    cohort: 2024,
    photo: "",
    bio: "Clinical Psychologist and early career researcher with 6 years of experience in clinical work, outreach, education, and research. Focused on empowering vulnerable children and youth in adversity settings across Sub-Saharan Africa through scalable cognitive and mental health interventions.",
    experience: "Currently pursuing a PhD in Neuroscience at Aga Khan University under the ALMA Consortium, researching neurocognitive and behavioral outcomes in adolescents with Sickle Cell Disease. Former Study Coordinator at UW GAP-K, and Clinical Psychologist at Kenyatta University Hospital. Consultant for mental health projects with the Population Council, World Bank, and Ministry of Health.",
    socialLinks: {
      linkedin: "",
      email: ""
    },
    skills: [
      "Clinical Psychology",
      "Mental health implementation",
      "Psychological assessment",
      "Research coordination",
      "SPSS",
      "ATLAS.ti",
      "Curriculum development",
      "Supervision and training",
      "Focus group facilitation",
      "Adolescent mental health"
    ]
  },
  {
    id: 27,
    name: "Ezra Kipngetich Too",
    role: "PhD Student in Neuroscience",
    currentPosition: "PhD Student",
    currentOrganization: "Aga Khan University",
    location: "Nairobi, Kenya",
    cohort: 2024,
    photo: "",
    bio: "Aspiring health research scientist with a strong background in adolescent mental health. Skilled in systematic reviews, data analysis, and evidence synthesis. Passionate about advancing global health research and promoting adolescent mental well-being in sub-Saharan Africa.",
    experience: "Currently a PhD student in Neuroscience at Aga Khan University. Former Research Assistant at Aga Khan University’s Institute for Human Development, focusing on adolescent mental health during the COVID-19 pandemic. Previous Research Intern at KEMRI-Wellcome Trust and Nursing Officer Intern at Nakuru Level 5 Hospital.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/ezratoo/",
      email: "tooezra06@gmail.com"
    },
    skills: [
      "Systematic and Scoping Reviews",
      "Quantitative Analysis (R, Stata, SPSS)",
      "Qualitative Analysis (NVivo)",
      "Scientific Writing",
      "Evidence Synthesis",
      "Data Collection and Management",
      "Manuscript Preparation",
      "Community Engagement",
      "Stakeholder Coordination",
      "Research Dissemination"
    ]
  },
  {
    id: 28,
    name: "Dorcas Khasowa",
    role: "Mental Health Specialist",
    currentPosition: "Organization Development Consultant",
    currentOrganization: "Independent Consultant",
    location: "Nairobi, Kenya",
    cohort: 2024,
    photo: "",
    bio: "Health and Development Specialist with over 10 years of experience in mental health and psychosocial support (MHPSS) programming, disability inclusion, gender-based violence, and youth empowerment across humanitarian and development contexts. Strong leadership in advocacy, policy, and program management.",
    experience: "Currently consulting on mental health and disability inclusion with organizations across Kenya. Previously served as MHPSS and Protection Specialist at Kenya Red Cross Society, Technical Advisor at NOPE, and Mental Health Consultant at Population Council. Extensive experience with policy development, stakeholder engagement, and program integration in health and protection sectors.",
    socialLinks: {
      linkedin: "",
      email: "dkhasowa@gmail.com"
    },
    skills: [
      "Mental Health & Psychosocial Support (MHPSS)",
      "Disability Inclusion",
      "Gender-Based Violence Response",
      "Safeguarding & Protection",
      "Policy Development",
      "Stakeholder Engagement",
      "Training & Capacity Building",
      "Program Management",
      "Advocacy & Strategic Planning",
      "Scientific Writing & Research"
    ]
  },
  {
    id: 29,
    name: "Daisy Chelangat",
    role: "Research Fellow & Data Scientist",
    currentPosition: "Research Associate",
    currentOrganization: "Aga Khan University",
    location: "Nairobi, Kenya",
    cohort: 2024,
    photo: "",
    bio: "Research Fellow with 6 years of experience in health research, statistical data analysis, machine learning, protocol development, and scientific writing. Passionate about using data science to inform healthcare policies and improve health outcomes.",
    experience: "Currently working as a Research Associate at Aga Khan University. Previously held roles at KEMRI-Wellcome Trust, IOM-UN Migration, and AMREC AFRICA. Experienced in designing studies, data management, statistical modeling, and dissemination of findings in conferences and peer-reviewed journals.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/daisy-chelangat",
      email: "daisy.chelangat@aku.edu"
    },
    skills: [
      "Data Analysis",
      "Machine Learning",
      "Time Series Analysis",
      "Statistical Modelling",
      "Data Visualization",
      "R, Python, STATA, SPSS",
      "Scientific Writing",
      "Protocol Development",
      "Big Data",
      "Global Health Research"
    ]
  },
  {
    id: 30,
    name: "Chalachew Kassaw Demoze",
    role: "Lecturer and Mental Health Researcher",
    currentPosition: "Lecturer",
    currentOrganization: "Dilla University",
    location: "Dilla, Ethiopia",
    cohort: 2024,
    photo: "",
    bio: "Lecturer in psychiatry and neuroscience with extensive academic, clinical, and research experience. Passionate about mental health in Ethiopia, Chalachew has published widely on psychiatric conditions, stigma, maternal mental health, and the psychological impacts of COVID-19.",
    experience: "Currently serving as Lecturer at Dilla University, providing instruction in psychiatry, neuroscience, and related fields. Active member of curriculum, ethics, and promotion committees. Previously worked as Assistant Lecturer and clinician. Leads and co-investigates various mental health studies and has contributed to more than 20 peer-reviewed publications.",
    socialLinks: {
      linkedin: "",
      email: "1234berekassa@gmail.com"
    },
    skills: [
      "Psychiatric Education",
      "Mental Health Research",
      "Quantitative & Qualitative Analysis",
      "SPSS, STATA, SAS, R",
      "Grant Writing",
      "Manuscript Review",
      "Curriculum Development",
      "Neuroscience",
      "Community Psychiatry",
      "Scientific Publishing"
    ]
  }
  
  
];

// Add testimonials data
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Sarah Mwangi",
    role: "Senior Research Scientist",
    organization: "African Institute of Brain Research",
    image: "/images/alumni/sarah-mwangi.jpg",
    quote: "The ABDN program provided me with invaluable skills and connections that have been crucial in advancing neuroscience research in Kenya.",
    rating: 5
  },
  {
    id: 2,
    name: "Dr. John Doe",
    role: "Research Scientist",
    organization: "African Institute of Brain Research",
    image: "/images/alumni/john-doe.jpg",
    quote: "The ABDN program provided me with invaluable skills and connections that have been crucial in advancing neuroscience research in Kenya.",
    rating: 5
  },
  {
    id: 3,
    name: "Dr. John Doe",
    role: "Research Scientist",
    organization: "African Institute of Brain Research",
    image: "/images/alumni/john-doe.jpg",
    quote: "The ABDN program provided me with invaluable skills and connections that have been crucial in advancing neuroscience research in Kenya.",
    rating: 5
  },
  {
    id: 4,
    name: "Dr. John Doe",
    role: "Research Scientist",
    organization: "African Institute of Brain Research",
    image: "/images/alumni/john-doe.jpg",
    quote: "The ABDN program provided me with invaluable skills and connections that have been crucial in advancing neuroscience research in Kenya.",
    rating: 5
  },
  {
    id: 5,
    name: "Dr. John Doe",
    role: "Research Scientist",
    organization: "African Institute of Brain Research",
    image: "/images/alumni/john-doe.jpg",
    quote: "The ABDN program provided me with invaluable skills and connections that have been crucial in advancing neuroscience research in Kenya.",
    rating: 5
  },
  {
    id: 6,
    name: "Dr. John Doe",
    role: "Research Scientist",
    organization: "African Institute of Brain Research",
    image: "/images/alumni/john-doe.jpg",
    quote: "The ABDN program provided me with invaluable skills and connections that have been crucial in advancing neuroscience research in Kenya.",
    rating: 5
  },
  {
    id: 7,
    name: "Dr. John Doe",
    role: "Research Scientist",
    organization: "African Institute of Brain Research",
    image: "/images/alumni/john-doe.jpg",
    quote: "The ABDN program provided me with invaluable skills and connections that have been crucial in advancing neuroscience research in Kenya.",
    rating: 5
  },
  {
    id: 8,
    name: "Dr. John Doe",
    role: "Research Scientist",
    organization: "African Institute of Brain Research",
    image: "/images/alumni/john-doe.jpg",
    quote: "The ABDN program provided me with invaluable skills and connections that have been crucial in advancing neuroscience research in Kenya.",
    rating: 5
  },
  {
    id: 9,
    name: "Dr. John Doe",
    role: "Research Scientist",
    organization: "African Institute of Brain Research",
    image: "/images/alumni/john-doe.jpg",
    quote: "The ABDN program provided me with invaluable skills and connections that have been crucial in advancing neuroscience research in Kenya.",
    rating: 5
  },
  {
    id: 10,
    name: "Anikobs Anita",
    role: "Research Scientist",
    organization: "African Institute of Brain Research",
    image: "/images/alumni/john-doe.jpg",
    quote: "My life has not been the same after ABDSN. The things I learnt coupled with the connections I made have propagated my career growth. Through ABDSN, I now have a wonderful mentor (my first since the beginning of my career) whom I've been working with for some time now. I have been featured as a co-author in a paper which will be published very soon. My project colleague and I are also continuing with the project we started in other to publish it. Much is there to be said, but let me just keep that for another day.",
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
              <p className="text-base text-amber-600 mb-0.5">{testimonial.role}</p>
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
const InfiniteScroll = ({ children, direction = 1, speed = 25 }: InfiniteScrollProps) => {
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
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [selectedCohort, setSelectedCohort] = useState<number | null>(null);

  // First apply the category filter
  const filteredByCategory = React.useMemo(() => {
    if (filter === 'all') return alumniData;
    
    const searchTerm = filter.toLowerCase();
    return alumniData.filter(alumni => {
      return alumni.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
             alumni.role.toLowerCase().includes(searchTerm) ||
             alumni.currentPosition.toLowerCase().includes(searchTerm);
    });
  }, [filter]);

  // Then apply the cohort filter
  const filteredAlumni = React.useMemo(() => {
    if (selectedCohort === null) return filteredByCategory;
    return filteredByCategory.filter(alumni => alumni.cohort === selectedCohort);
  }, [filteredByCategory, selectedCohort]);

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
            <div className="flex flex-wrap gap-4 justify-center mb-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full transition-all ${
                  filter === 'all'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-600 hover:bg-amber-100'
                }`}
              >
                All Alumni
              </button>
              <button
                onClick={() => setFilter('research')}
                className={`px-6 py-2 rounded-full transition-all ${
                  filter === 'research'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-600 hover:bg-amber-100'
                }`}
              >
                Researchers
              </button>
              <button
                onClick={() => setFilter('data')}
                className={`px-6 py-2 rounded-full transition-all ${
                  filter === 'data'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-600 hover:bg-amber-100'
                }`}
              >
                Data Scientists
              </button>
              <button
                onClick={() => setFilter('clinical')}
                className={`px-6 py-2 rounded-full transition-all ${
                  filter === 'clinical'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-600 hover:bg-amber-100'
                }`}
              >
                Clinical Specialists
              </button>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setSelectedCohort(null)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCohort === null
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-600 hover:bg-amber-100'
                }`}
              >
                All Cohorts
              </button>
              <button
                onClick={() => setSelectedCohort(2023)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCohort === 2023
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-600 hover:bg-amber-100'
                }`}
              >
                2023 Cohort
              </button>
              <button
                onClick={() => setSelectedCohort(2024)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCohort === 2024
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-600 hover:bg-amber-100'
                }`}
              >
                2024 Cohort
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
                  <div className="relative h-48 bg-amber-100">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-900/50" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-2xl font-bold text-white">{alumni.name}</h3>
                      <p className="text-amber-200">{alumni.role}</p>
                    </div>
                    <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm">
                      {alumni.cohort} Cohort
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-amber-600 mb-4">
                      <Briefcase className="h-5 w-5" />
                      <span>{alumni.currentPosition}</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-600 mb-4">
                      <MapPin className="h-5 w-5" />
                      <span>{alumni.location}</span>
                    </div>
                    <p className="text-amber-700 mb-4 line-clamp-3">{alumni.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {alumni.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-sm bg-amber-50 text-amber-700"
                        >
                          {skill}
                        </span>
                      ))}
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
                      {alumni.socialLinks.email && (
                        <a
                          href={`mailto:${alumni.socialLinks.email}`}
                          className="text-amber-600 hover:text-amber-800 transition-colors"
                        >
                          <Mail className="h-5 w-5" />
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
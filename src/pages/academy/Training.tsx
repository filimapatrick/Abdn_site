import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Clock, Award, Brain, Star, ChevronRight, ArrowRight, Target, Beaker, Globe, Video, Laptop, MessageSquare, Calendar, GraduationCap } from 'lucide-react';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import { seoConfig } from '../../config/seo';

const courses = [
  {
    title: "Neuroimaging Fundamentals",
    instructor: "Dr. Sarah Mwangi",
    duration: "8 weeks",
    students: 120,
    rating: 4.8,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80",
    description: "Master the fundamentals of neuroimaging techniques and analysis methods.",
    topics: ["MRI Basics", "fMRI Analysis", "Brain Mapping", "Data Processing"]
  },
  {
    title: "Data Science in Neuroscience",
    instructor: "Dr. Mohammed Ahmed",
    duration: "10 weeks",
    students: 85,
    rating: 4.9,
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80",
    description: "Apply advanced data science techniques to neuroscience research.",
    topics: ["Neural Data Analysis", "Machine Learning", "Statistical Methods", "Python Programming"]
  },
  {
    title: "Clinical Neuroscience",
    instructor: "Dr. Grace Okonjo",
    duration: "12 weeks",
    students: 150,
    rating: 4.7,
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80",
    description: "Understand the clinical aspects of neuroscience and neurological disorders.",
    topics: ["Neurological Disorders", "Clinical Assessment", "Treatment Approaches", "Case Studies"]
  }
];

const upcomingWorkshops: Array<{
  title: string;
  date: string;
  location: string;
  instructor: string;
  icon: React.ComponentType<any>;
  imageUrl: string;
  description: string;
  cohorts?: string[];
}> = [
  {
    title: "African Brain Data Science Fellowship",
    date: "Starting July 2026 (Applications Closed)",
    location: "Virtual / Online (5-Month Program)",
    instructor: "Mentorship from Field Experts",
    icon: GraduationCap,
    imageUrl: "/assets/Academy_2024/fellowship.png",
    description: "Applications are now closed for the African Brain Data Science Fellowship - a 5-month virtual fellowship designed to equip emerging researchers, students, and professionals across Africa with practical and research-oriented skills in neuroscience and brain data analysis.\n\nThe fellowship combines foundational training, hands-on learning, collaborative research, and mentorship from experts across the field, creating an engaging environment for interdisciplinary learning and scientific growth. Through weekly virtual sessions and project-based learning, fellows will gain experience working with brain datasets, analysis pipelines, and real-world research applications while contributing to a growing African neuroscience ecosystem.",
    cohorts: ["MRI/fMRI", "EEG", "fNIRS", "Electrophysiology"]
  }
];

const trainingFeatures = [
  {
    title: "Expert-Led Sessions",
    description: "Learn directly from leading African neuroscience researchers and practitioners",
    icon: Brain
  },
  {
    title: "",
    description: "Engage in hands-on exercises and real-world case studies",
    icon: Users
  },
  {
    title: "Flexible Learning",
    description: "Access course materials anytime, anywhere with our hybrid learning approach",
    icon: Clock
  },
  {
    title: "Professional Certification",
    description: "Earn recognized certificates upon successful course completion",
    icon: Award
  },
  {
    title: "Online Resources",
    description: "Access comprehensive digital learning materials and resources",
    icon: BookOpen
  },
  {
    title: "Live Sessions",
    description: "Participate in regular live sessions with instructors and peers",
    icon: Video
  }
];

export default function Training() {
  const seo = seoConfig.training;

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        url={seo.url}
      />
      <Layout>
        {/* Hero Section */}
        <section className="relative py-32 md:py-40 bg-gradient-to-br from-amber-950 to-amber-800">
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,transparent,black)]" />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center text-white">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
              >
                Training & Development
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl text-amber-100 max-w-4xl mx-auto px-4"
              >
                Building capacity in neuroscience research across Africa
              </motion.p>
            </div>
          </div>
        </section>



        {/* Initiatives Section */}
        <section className="py-24 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 flex flex-col justify-center order-2 md:order-1">
                  <h2 className="text-3xl font-bold text-amber-900 mb-6">Current Initiatives</h2>
                  <p className="text-amber-700 mb-6">
                    ABDN initiatives and activities so far have included the organisation of workshops and webinars to identify FAIR data challenges and possible solutions.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <GraduationCap className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Kavli Foundation has kindly provided funds to ABDN to organise the first ABDN Academy – two-week workshop for capacity development on data science and neuroimaging data.
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Regular workshops and webinars focusing on FAIR data principles and neuroimaging techniques
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Building a community of skilled researchers across Africa
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative h-full min-h-[400px] order-1 md:order-2">
                  <img
                    src="/assets/Training/kenya_group.jpg"
                    alt="ABDN Workshop Session"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Upcoming Workshops */}
        <section className="py-24 bg-gradient-to-br from-white to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Upcoming Workshops</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Join our intensive hands-on workshops led by industry experts
              </p>
            </div>

            {upcomingWorkshops.length > 0 ? (
              <div className="space-y-12">
                {upcomingWorkshops.map((workshop, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className={`p-8 flex flex-col justify-center order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                        <div className="flex items-center mb-6">
                          <workshop.icon className="w-8 h-8 text-amber-600 mr-4" />
                          <h3 className="text-2xl font-bold text-amber-900">{workshop.title}</h3>
                        </div>
                        <div className="text-amber-700 mb-6 space-y-4">
                          {workshop.description.split('\n\n').map((para, pIdx) => (
                            <p key={pIdx}>{para}</p>
                          ))}
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <Calendar className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                            <p className="text-amber-600">{workshop.date}</p>
                          </div>
                          <div className="flex items-start">
                            <Globe className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                            <p className="text-amber-600">{workshop.location}</p>
                          </div>
                          <div className="flex items-start">
                            <Users className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                            <p className="text-amber-600">{workshop.instructor}</p>
                          </div>
                          {workshop.cohorts && (
                            <div className="flex items-start">
                              <BookOpen className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                              <div className="text-amber-600">
                                <span className="font-semibold text-amber-900">Specialized Cohorts:</span>
                                <ul className="list-disc list-inside mt-1 ml-2 text-amber-700">
                                  {workshop.cohorts.map((cohort, cIdx) => (
                                    <li key={cIdx}>{cohort}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={`relative h-full min-h-[400px] order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} bg-amber-50/40 flex items-center justify-center p-6`}>
                        <img
                          src={workshop.imageUrl}
                          alt={workshop.title}
                          className="max-w-full max-h-[480px] object-contain rounded-lg shadow-lg hover:scale-[1.02] transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center bg-white rounded-xl shadow-md p-12 max-w-2xl mx-auto border border-amber-100">
                <Calendar className="h-12 w-12 text-amber-500 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-bold text-amber-900 mb-2">No Upcoming Workshops Scheduled</h3>
                <p className="text-amber-700">
                  We are currently planning our upcoming training sessions and workshops for the next academic year. Please check back soon or contact us to stay updated.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Previous Events Section */}
        <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Previous Events</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Our past workshops, webinars, and events
              </p>
            </div>

            {/* ABDS Academy 2025 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 mb-12"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 flex flex-col justify-center order-2 md:order-1">
                  <div className="flex items-center mb-6">
                    <GraduationCap className="w-8 h-8 text-amber-600 mr-4" />
                    <h3 className="text-2xl font-bold text-amber-900">ABDS Academy 2025</h3>
                  </div>
                  <p className="text-amber-700 mb-6">
                    The third edition of the African Brain Data Science Academy was a comprehensive, two-week training program focusing on multi-modal brain data science for African researchers.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Held in Lagos, Nigeria (December 8-21, 2025)
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Led by Multiple Experts, offering hands-on training and mentorship
                      </p>
                    </div>
                    <div className="flex items-start">
                      <BookOpen className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Curriculum included MRI, fMRI, MEG, EEG, and fNIRS modalities
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative h-full min-h-[400px] order-1 md:order-2">
                  <img
                    src="/assets/Academy_2025/group_photo_2025.jpg"
                    alt="ABDS Academy 2025 Workshop"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60" />
                </div>
              </div>
            </motion.div>

            {/* Brain Awareness Week */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 mb-12"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-full min-h-[400px] order-1">
                  <img
                    src="/assets/Training/WhatsApp Image 2025-03-21 at 20.03.21 (1).jpeg"
                    alt="Brain Awareness Week"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/60" />
                </div>
                <div className="p-8 flex flex-col justify-center order-2">
                  <div className="flex items-center mb-6">
                    <Brain className="w-8 h-8 text-amber-600 mr-4" />
                    <h3 className="text-2xl font-bold text-amber-900">Brain Awareness Week</h3>
                  </div>
                  <p className="text-amber-700 mb-6">
                    Our annual Brain Awareness Week events bring neuroscience to the public through engaging activities and educational programs.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        2024: "Understanding the Brain: From Cells to Behavior"
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        2025: "The Future of Neuroscience in Africa"
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Public lectures, school visits, and community outreach programs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ABDS Academy 2024 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 mb-12"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 flex flex-col justify-center order-2 md:order-1">
                  <div className="flex items-center mb-6">
                    <GraduationCap className="w-8 h-8 text-amber-600 mr-4" />
                    <h3 className="text-2xl font-bold text-amber-900">ABDS Academy 2024</h3>
                  </div>
                  <p className="text-amber-700 mb-6">
                    Building on the success of 2023, the second ABDS Academy workshop expanded its curriculum and reach.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Advanced training in neuroimaging techniques and data analysis
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Expanded participant base with researchers from more African countries
                      </p>
                    </div>
                    <div className="flex items-start">
                      <BookOpen className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Focused on practical applications and real-world case studies
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative h-full min-h-[400px] order-1 md:order-2">
                  <img
                    src="/assets/Training/kenya_group.jpg"
                    alt="ABDS Academy 2024 Workshop"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60" />
                </div>
              </div>
            </motion.div>

            {/* fMRI Analysis Workshop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 mb-12"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-full min-h-[400px] order-1">
                  <img
                    src="/assets/Events/fmri_analytic_method.png"
                    alt="fMRI Analysis Workshop"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/60" />
                </div>
                <div className="p-8 flex flex-col justify-center order-2">
                  <div className="flex items-center mb-6">
                    <Target className="w-8 h-8 text-amber-600 mr-4" />
                    <h3 className="text-2xl font-bold text-amber-900">fMRI Analysis Workshop</h3>
                  </div>
                  <p className="text-amber-700 mb-6">
                    An advanced workshop focusing on functional MRI data analysis pipelines, software tools, and scientific interpretation.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Held in Port Harcourt, Nigeria (March 18-20, 2024)
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Led by Dr. Silke Ander, featuring practical sessions and case studies
                      </p>
                    </div>
                    <div className="flex items-start">
                      <BookOpen className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Covered experimental design, preprocessing, and statistical modeling
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* EEG Training Workshop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 mb-12"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 flex flex-col justify-center order-2 md:order-1">
                  <div className="flex items-center mb-6">
                    <Brain className="w-8 h-8 text-amber-600 mr-4" />
                    <h3 className="text-2xl font-bold text-amber-900">EEG Training Workshop</h3>
                  </div>
                  <p className="text-amber-700 mb-6">
                    An intensive workshop focused on hands-on training in electroencephalography (EEG) data acquisition, processing, and analysis techniques.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Held in Port Harcourt, Nigeria (March 15-17, 2024)
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Led by Dr. Robert, featuring live demonstration and data acquisition sessions
                      </p>
                    </div>
                    <div className="flex items-start">
                      <BookOpen className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Covered artifact rejection, power spectrum analysis, and event-related potentials (ERPs)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative h-full min-h-[400px] order-1 md:order-2">
                  <img
                    src="/assets/Events/eeg_workshop.jpeg"
                    alt="EEG Training Workshop"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60" />
                </div>
              </div>
            </motion.div>

            {/* ABDS Academy 2023 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 mb-12"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-full min-h-[400px] order-1">
                  <img
                    src="/assets/Training/Training_lagos.jpg"
                    alt="ABDS Academy 2023 Workshop"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/60" />
                </div>
                <div className="p-8 flex flex-col justify-center order-2">
                  <div className="flex items-center mb-6">
                    <GraduationCap className="w-8 h-8 text-amber-600 mr-4" />
                    <h3 className="text-2xl font-bold text-amber-900">ABDS Academy 2023</h3>
                  </div>
                  <p className="text-amber-700 mb-6">
                    The first ABDS Academy workshop was a two-week intensive program focused on capacity development in data science and neuroimaging data analysis.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Held in Lagos, Nigeria, bringing together researchers from across Africa
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Featured hands-on training in neuroimaging data analysis and FAIR data principles
                      </p>
                    </div>
                    <div className="flex items-start">
                      <BookOpen className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Covered topics including MRI basics, data processing, and statistical analysis
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Webinars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 flex flex-col justify-center order-2 md:order-1">
                  <div className="flex items-center mb-6">
                    <Video className="w-8 h-8 text-amber-600 mr-4" />
                    <h3 className="text-2xl font-bold text-amber-900">Webinar Series</h3>
                  </div>
                  <p className="text-amber-700 mb-6">
                    Our regular webinar series brings together experts and researchers to discuss cutting-edge topics in neuroscience and data science.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Webinar A: "FAIR Data Principles in Neuroscience Research"
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Webinar B: "Decision Neuroscience: Imaging Brain Dopamine Systems"
                      </p>
                    </div>
                    <div className="flex items-start">
                      <Users className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                      <p className="text-amber-600">
                        Interactive sessions with Q&A and practical demonstrations
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative h-full min-h-[400px] order-1 md:order-2">
                  <img
                    src="/assets/Events/decision_neuroscience.jpeg"
                    alt="ABDN Webinar Series"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Training Features */}
        <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">Training Features</h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                What makes our training programs unique and effective
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainingFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-block p-4 bg-amber-100 rounded-full mb-4">
                    <feature.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-900 mb-2">{feature.title}</h3>
                  <p className="text-amber-700">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
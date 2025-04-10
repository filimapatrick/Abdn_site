import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Clock, Award, Brain, Star, ChevronRight, ArrowRight, Target, Beaker, Globe, Video, Laptop, MessageSquare, Calendar, GraduationCap } from 'lucide-react';
import Layout from '../../components/Layout';

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

const upcomingWorkshops = [
  {
    title: "EEG Training Workshop",
    date: "March 15-17, 2024",
    location: "Port Harcourt, Nigeria",
    instructor: "Dr. Sarah Mwangi",
    icon: Brain,
    description: "Hands-on training in EEG data acquisition, processing, and analysis techniques."
  },
  {
    title: "fMRI Analysis Workshop",
    date: "March 18-20, 2024",
    location: "Port Harcourt, Nigeria",
    instructor: "Dr. Mohammed Ahmed",
    icon: Target,
    description: "Advanced techniques in functional MRI data analysis and interpretation."
  },
  {
    title: "MRI Fundamentals Workshop",
    date: "March 21-23, 2024",
    location: "Port Harcourt, Nigeria",
    instructor: "Dr. Grace Okonjo",
    icon: Beaker,
    description: "Essential principles and practices of MRI in neuroscience research."
  }
];

const trainingFeatures = [
  {
    title: "Expert-Led Sessions",
    description: "Learn directly from leading African neuroscience researchers and practitioners",
    icon: Brain
  },
  {
    title: "Interactive Learning",
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
  return (
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

      {/* Overview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-full min-h-[400px]">
                <img
                  src="/Assets/Training/Training_lagos.jpg"
                  alt="ABDN Training Session"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-amber-900 mb-6">Our Mission</h2>
                <p className="text-amber-700 mb-6">
                  The African Brain Data Network projects seeks to improve the landscape of brain research and innovation in Africa through responsible generation, application and use through a number of projects or workstreams.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Brain className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                    <p className="text-amber-600">
                      The ABDN Network seeks to ensure that a sufficient number of experts are trained in the use of novel technical tools to collect, process and apply brain datasets.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Globe className="h-6 w-6 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                    <p className="text-amber-600">
                      From neuroimages to behavioural datasets, this network hopes to cover the length and breadth of Africa and lead the African neuroscience ecosystem into the era of big data analytics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
                  src="/Assets/Training/kenya_group.jpg"
                  alt="ABDN Workshop Session"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Courses */}
      {/* <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-6">Featured Courses</h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Learn from leading experts in neuroscience through our specialized courses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-amber-600">
                    {course.level}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-2">{course.title}</h3>
                  <p className="text-amber-600 mb-2">by {course.instructor}</p>
                  <p className="text-amber-700 mb-4">{course.description}</p>
                  <div className="space-y-2 mb-4">
                    {course.topics.map((topic, i) => (
                      <div key={i} className="flex items-center text-amber-700">
                        <ChevronRight className="h-4 w-4 mr-2 text-amber-500" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-amber-400 fill-current" />
                      <span className="font-semibold text-amber-900">{course.rating}</span>
                    </div>
                    <div className="flex items-center text-amber-600 space-x-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center group">
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Upcoming Workshops */}
      <section className="py-24 bg-gradient-to-br from-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-6">Upcoming Workshops</h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Join our intensive hands-on workshops led by industry experts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingWorkshops.map((workshop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-amber-100 rounded-lg">
                    <workshop.icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-900 ml-4">{workshop.title}</h3>
                </div>
                <p className="text-amber-700 mb-4">{workshop.description}</p>
                <div className="space-y-2 text-amber-700">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-amber-500" />
                    <span>{workshop.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-amber-500" />
                    <span>{workshop.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-amber-500" />
                    <span>{workshop.instructor}</span>
                  </div>
                </div>
                <button className="mt-4 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center group">
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
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
  );
}
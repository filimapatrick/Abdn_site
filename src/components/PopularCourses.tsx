import React from 'react';
import { Star, Clock, Users, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const courses = [
  {
    title: "Neuroimaging Analysis",
    instructor: "Dr. Sarah Mwangi",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80",
    rating: 4.9,
    students: 234,
    duration: "8 weeks",
    price: "Free"
  },
  {
    title: "Data Science for Neuroscience",
    instructor: "Dr. Mohammed Ahmed",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80",
    rating: 4.8,
    students: 189,
    duration: "10 weeks",
    price: "Free"
  },
  {
    title: "Brain Research Methods",
    instructor: "Dr. Grace Okonjo",
    image: "https://images.unsplash.com/photo-1600443299762-7a743123645d?auto=format&fit=crop&q=80",
    rating: 4.9,
    students: 312,
    duration: "12 weeks",
    price: "Free"
  }
];

export default function PopularCourses() {
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
          className="flex justify-between items-end mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-900 mb-4">
              Featured Training Programs
            </h2>
            <p className="text-xl text-amber-700">
              Enhance your research skills with our specialized courses
            </p>
          </div>
          <motion.button 
            className="flex items-center text-amber-600 hover:text-amber-700 font-semibold group"
            whileHover={{ x: 5 }}
          >
            View All Programs 
            <ChevronRight className="h-5 w-5 ml-1 transform transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-48 overflow-hidden group">
                <motion.img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110" 
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-1 rounded-full">
                  <span className="text-white font-semibold text-sm">{course.price}</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-amber-900">{course.title}</h3>
                <p className="text-amber-700">by {course.instructor}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-amber-500 fill-current" />
                    <span className="font-semibold text-amber-900">{course.rating}</span>
                  </div>
                  <div className="flex items-center text-amber-700 space-x-4">
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
                <motion.button 
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enroll Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
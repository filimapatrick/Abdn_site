import React from 'react';
import { Star, Clock, Users, ChevronRight } from 'lucide-react';

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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Training Programs</h2>
            <p className="text-xl text-gray-600">Enhance your research skills with our specialized courses</p>
          </div>
          <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold">
            View All Programs <ChevronRight className="h-5 w-5 ml-1" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full font-semibold text-blue-600">
                  {course.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">by {course.instructor}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                  <div className="flex items-center text-gray-500 space-x-4">
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
                <button className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-100 transition">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
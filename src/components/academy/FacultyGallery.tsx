// src/components/FacultyGallery.js

import React, { useState } from 'react';

const facultyData = [
  {
    src: '/path/to/faculty1.jpg',
    alt: 'Faculty Member 1',
    name: 'Dr. Jane Doe',
    title: 'Professor of Neuroscience',
  },
  {
    src: '/path/to/faculty2.jpg',
    alt: 'Faculty Member 2',
    name: 'Dr. John Smith',
    title: 'Assistant Professor of Cognitive Science',
  },
  {
    src: '/path/to/faculty3.jpg',
    alt: 'Faculty Member 3',
    name: 'Dr. Alice Johnson',
    title: 'Senior Research Scientist',
  },
  {
    src: '/path/to/faculty4.jpg',
    alt: 'Faculty Member 4',
    name: 'Dr. Robert Brown',
    title: 'Lecturer in Neuropsychology',
  },
  {
    src: '/path/to/faculty5.jpg',
    alt: 'Faculty Member 5',
    name: 'Dr. Maria Garcia',
    title: 'Postdoctoral Fellow',
  },
  {
    src: '/path/to/faculty6.jpg',
    alt: 'Faculty Member 6',
    name: 'Dr. William Lee',
    title: 'Research Associate',
  },
  // Additional faculty members...
];

export default function FacultyGallery() {
  const [visibleFaculty, setVisibleFaculty] = useState(6);

  const handleLoadMore = () => {
    setVisibleFaculty((prev) => prev + 6); // Load 6 more faculty members
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Faculty</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the brilliant minds shaping the future of neuroscience and education.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {facultyData.slice(0, visibleFaculty).map((faculty, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
            >
              <img
                src={faculty.src}
                alt={faculty.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white">
                <h3 className="text-xl font-bold">{faculty.name}</h3>
                <p className="text-sm">{faculty.title}</p>
              </div>
            </div>
          ))}
        </div>

        {visibleFaculty < facultyData.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

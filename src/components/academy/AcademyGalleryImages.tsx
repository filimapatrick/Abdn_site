// src/components/Gallery.js

import React from 'react';
import t from '../../../Assets/partcipants1.jpeg'
import b from '../../../Assets/participant5.jpeg'


const galleryImages = [
  {
    src: '../../../Assets/partcipants1.jpeg',
    alt: 'Gallery Image 1',
  },
  {
    src: '../../../Assets/participant2.jpeg',
    alt: 'Gallery Image 2',
  },
  {
    src: '../../../Assets/participant4.jpeg',
    alt: 'Gallery Image 3',
  },
  {
    src: '../../../Assets/participant5.jpeg',
    alt: 'Gallery Image 4',
  },
  {
    src: '../../../Assets/participant6.jpeg',
    alt: 'Gallery Image 5',
  },
  {
    src: '../../../Assets/participant7.jpeg',
    alt: 'Gallery Image 6',
  },
  {
    src: '../../../Assets/participant8.jpeg',
    alt: 'Gallery Image 6',
  },
  {
    src: '../../../Assets/participant9.jpeg',
    alt: 'Gallery Image 6',
  },
  {
    src: '../../../Assets/participant10.jpeg',
    alt: 'Gallery Image 6',
  },
];

export default function Gallery() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Gallery</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore moments from our events, training programs, and workshops.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

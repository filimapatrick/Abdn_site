import React from 'react';
import { MapPin } from 'lucide-react';


export default function LocationHighlight() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="../../Assets/cross_section.jpeg"
              alt="Research Laboratory"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Main Hub</p>
                  <p className="font-semibold text-gray-900">Nairobi, Kenya</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-full">
              <p className="text-gray-600 font-medium">International Centre of Insect Physiology and Ecology</p>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              ABDN Research Hub
            </h2>
            <p className="text-xl text-gray-600">
              Our state-of-the-art facilities in Nairobi serve as a central hub for neuroscience research and collaboration across Africa, fostering innovation and scientific excellence.
            </p>
            <button className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
              Explore our facilities
              <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
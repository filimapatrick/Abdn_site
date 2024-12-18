import React from 'react';
import { Clock, Users, Star } from 'lucide-react';

export default function FeaturedClass() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-gray-400 uppercase tracking-wider">Featured</span>
              <h2 className="text-5xl font-bold text-gray-900 mt-2">Brain Research</h2>
              <h3 className="text-4xl font-bold text-gray-800 mt-2">Advancing Neuroscience in Africa</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg text-gray-600">
                Research & Training Programs
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our network brings together researchers, clinicians, and data scientists to advance brain research in Africa. Through collaboration and knowledge sharing, we're building capacity for world-class neuroscience research across the continent.
              </p>
            </div>

            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
              Join Our Network
            </button>
          </div>

          <div className="relative grid grid-cols-2 gap-4">
            <img
              src="../../Assets/franco1.jpeg"
              alt="Brain research"
              className="rounded-lg shadow-lg transform translate-y-8"
            />
            <img
              src="../../Assets/cross_s.jpeg"
              alt="Neuroscience research"
              className="rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-8 right-0 bg-white p-6 rounded-lg shadow-xl max-w-xs">
              <p className="text-gray-600 italic">
                "Building capacity for neuroscience research and data science across Africa through training, mentorship, and collaboration."
              </p>
              <p className="text-gray-800 font-semibold mt-2">- ABDN MISSION</p>
            </div>
          </div>
        </div>

        {/* Research Excellence Section */}
        <div className="mt-32 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="../../Assets/project_report.jpeg"
              alt="Research excellence"
              className="rounded-2xl shadow-xl"
            />
            
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-lg max-w-xs">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">Research Network</p>
                  <p className="text-gray-500">15+ African Countries</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Active Projects</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span>50+</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <span className="text-gray-400 uppercase tracking-wider">featured</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">Research Excellence</h2>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">Collaborative Projects</h3>
            </div>

            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Our network facilitates groundbreaking research in neuroscience and data science across Africa. Through state-of-the-art facilities and international collaborations, we're advancing our understanding of the brain while building research capacity throughout the continent.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-1">100+</div>
                  <div className="text-gray-600">Active Researchers</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-1">200+</div>
                  <div className="text-gray-600">Publications</div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
                  View Research Projects
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
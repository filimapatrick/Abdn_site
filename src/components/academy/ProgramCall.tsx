import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Users, GraduationCap } from 'lucide-react';

export default function ProgramCall() {
  return (
    <section className="py-24 bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-amber-900 mb-6">ABDS Academy 2025</h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto mb-8">
            The African Brain Data Science Academy (ABDSA) 2025 event is currently ongoing!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Overview and Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-amber-900 mb-6">Overview</h3>
            <p className="text-amber-700 mb-8">
              The aim of the Academy is to provide young neuroscience researchers in Africa to both theoretical knowledge and practical skills in brain data science. It will introduce participants to the use of different brain modalities such as MRI, fMRI, MEG, EEG and fNIRS to answer unique neuroscience questions for Africa and Africans.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-lg mr-4">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Key Dates</h4>
                  <p className="text-amber-700">Applications: Closed</p>
                  <p className="text-amber-700">Event dates: 8 Dec 2025 - 21 Dec 2025</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-lg mr-4">
                  <MapPin className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Location</h4>
                  <p className="text-amber-700">Lagos, Nigeria (In-Person)</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Open to</h4>
                  <p className="text-amber-700">Africa</p>
                </div>
              </div>
            </div>

            <motion.a
              href="https://ibro.org/training-opportunity/african-brain-data-science-academy-2025/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center w-fit mx-auto"
            >
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.a>
          </motion.div>

          {/* About and Eligibility */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-amber-900 mb-6">About the school</h3>
              <div className="space-y-4 text-amber-700">
                <p>
                  ABDSA is a intensive two-week training program, designed to enhance capacity in brain data science in Africa. The Academy provides a unique opportunity for researchers in Africa, including those from neuroscience, psychology, computer science, biomedical science, and related fields, to gain a comprehensive understanding of critical computational approaches for processing and managing large-scale brain datasets.
                </p>
                <p>
                  Participants will be trained by world-leading experts on novel techniques for brain data collection, processing, analysis, and sharing. The Academy emphasises hands-on training, mentorship, and offers valuable networking and collaboration opportunities to support FAIR (Findable, Accessible, Interoperable, and Reusable) African brain data.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-amber-900 mb-6">Who can apply to this school?</h3>
              <ul className="space-y-4">
                {[
                  "Lecturers",
                  "Postdoctoral Fellows",
                  "PhD Students",
                  "Master Students",
                  "Medical Doctors (MD)",
                  "Practitioners like Clinical Psychologists"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-amber-700">
                    <GraduationCap className="h-5 w-5 mr-3 text-amber-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-amber-700 font-semibold">
                Only students residing in the Africa region are eligible to apply for this school.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-amber-900 mb-6">What costs are covered for participants?</h3>
              <ul className="space-y-4">
                {["Travel", "Accommodation", "Meals"].map((item, index) => (
                  <li key={index} className="flex items-center text-amber-700">
                    <ArrowRight className="h-5 w-5 mr-3 text-amber-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
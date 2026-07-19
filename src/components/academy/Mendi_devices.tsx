import { motion } from 'framer-motion';
import { Brain, Zap, Users, Database } from 'lucide-react';

export default function MendiDevices() {
  return (
    <section className="py-24 bg-gradient-to-br from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-amber-900 mb-6">Tools & Technologies</h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Our network supports access to modern neuroscience tools that enhance research, training, and data collection across Africa. From portable devices to advanced software, we invest in technologies that bring world-class capabilities to African researchers.
          </p>
        </motion.div>

        {/* Featured Technology: Mendi */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-amber-900 mb-12 text-center">Featured Technology</h3>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left Column: Visual Focus */}
            <div className="space-y-6">
              {/* Main Device Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src="/assets/Infrastructure/Mendi_2.png"
                  alt="Mendi Neurofeedback Device"
                  className="w-full h-auto object-cover"
                />
              </motion.div>

              {/* Supporting Images */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src="/assets/Infrastructure/Mockup_2.png"
                    alt="Device Interface and Application"
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src="/assets/Infrastructure/Neurosight Website.png"
                    alt="Neuroscience Platform Interface"
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Right Column: Content Focus */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-8"
            >
              {/* Heading */}
              <div>
                <h4 className="text-3xl font-bold text-amber-900 mb-4">
                  Mendi Neurofeedback Device
                </h4>
                
                {/* Short Description */}
                <p className="text-lg text-amber-700 leading-relaxed">
                  A portable neurofeedback device designed to measure and train brain activity using functional near-infrared spectroscopy (fNIRS). It enables real-time monitoring of cognitive states, making it a valuable tool for research, training, and applied neuroscience across diverse settings.
                </p>
              </div>

              {/* Key Use Cases */}
              <div>
                <h5 className="text-lg font-semibold text-amber-900 mb-4">Key Use Cases</h5>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="p-2 bg-amber-100 rounded-lg mt-1">
                      <Brain className="h-5 w-5 text-amber-600" />
                    </div>
                    <span className="text-amber-700">Cognitive training and attention improvement</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="p-2 bg-amber-100 rounded-lg mt-1">
                      <Zap className="h-5 w-5 text-amber-600" />
                    </div>
                    <span className="text-amber-700">Neurofeedback experiments and behavioral studies</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="p-2 bg-amber-100 rounded-lg mt-1">
                      <Users className="h-5 w-5 text-amber-600" />
                    </div>
                    <span className="text-amber-700">Student training in brain monitoring techniques</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="p-2 bg-amber-100 rounded-lg mt-1">
                      <Database className="h-5 w-5 text-amber-600" />
                    </div>
                    <span className="text-amber-700">Field-friendly neuroscience data collection</span>
                  </li>
                </ul>
              </div>

              {/* Relevance to the Network */}
              <div className="pt-4 border-t border-amber-200">
                <p className="text-amber-700">
                  <span className="font-semibold text-amber-900">Relevance to Our Network:</span> This technology supports our goal of expanding access to practical neuroscience tools across African institutions, enabling researchers and students to conduct cutting-edge brain research without the constraints of traditional laboratory setups.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Access & Integration Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-amber-50 rounded-xl p-8 border border-amber-200"
        >
          <h4 className="text-xl font-semibold text-amber-900 mb-4">Access & Integration</h4>
          <div className="space-y-4 text-amber-700 leading-relaxed">
            <p>
              ABDN members and academy participants have access to the Mendi device through our collaborative partnerships and training programs. The device is integrated into our hands-on workshops, mentorship initiatives, and research infrastructure support.
            </p>
            <p>
              Researchers and institutions interested in utilizing the device for scientific studies can request access through the network. Approved users may be able to borrow the device for research purposes, subject to established terms and conditions that ensure responsible use and proper handling.
            </p>
            <p>
              Organizations interested in equipment partnerships and technology integration are encouraged to reach out to learn how to collaborate with our network and expand access to these tools within their institutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Brain, Zap, Users, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturedTools() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            Advanced Tools & Technologies
          </h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Access to modern neuroscience equipment and technologies that advance research, training, and data collection across the continent
          </p>
        </motion.div>

        {/* Featured Tool: Mendi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-16"
        >
          {/* Image */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="/assets/Infrastructure/Mendi_2.png"
              alt="Mendi Neurofeedback Device"
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-amber-900 mb-3">
                Mendi Neurofeedback Device
              </h3>
              <p className="text-lg text-amber-700 leading-relaxed">
                A portable fNIRS-based neurofeedback system enabling real-time brain activity monitoring. This cutting-edge technology is integrated into our training programs and available to network members for research and education.
              </p>
            </div>

            {/* Quick Use Cases */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Brain className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-amber-700">Brain monitoring</span>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-amber-700">Cognitive training</span>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-amber-700">Student training</span>
              </div>
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-amber-700">Research studies</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/academy/infrastructure"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              <span>Explore Infrastructure</span>
              <span>→</span>
            </Link>
          </div>
        </motion.div>

        {/* Additional context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-8 border border-amber-200"
        >
          <p className="text-amber-900 leading-relaxed">
            <span className="font-semibold">Member Access:</span> ABDN members and academy participants can access the Mendi device through our collaborative partnerships, hands-on workshops, and mentorship initiatives. Researchers interested in utilizing equipment for studies can request access through the network. Learn more about our infrastructure partnerships and how to collaborate with us.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

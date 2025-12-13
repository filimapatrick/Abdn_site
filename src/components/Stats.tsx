import React, { useEffect, useRef } from 'react';
import { Users, BookOpen, Globe, Award } from 'lucide-react';
import { motion, useInView, useAnimation } from 'framer-motion';

const stats = [
  {
    icon: Users,
    value: "300+",
    label: "Trained Researchers",
    gradient: "from-amber-500 to-amber-600",
    shadowColor: "shadow-amber-500/20"
  },
  {
    icon: BookOpen,
    value: "10+",
    label: "Publications",
    gradient: "from-amber-600 to-amber-700",
    shadowColor: "shadow-amber-600/20"
  },
  {
    icon: Globe,
    value: "20+",
    label: "African Countries",
    gradient: "from-amber-700 to-amber-800",
    shadowColor: "shadow-amber-700/20"
  },
  {
    icon: Award,
    value: "20+",
    label: "Research Projects",
    gradient: "from-amber-800 to-amber-900",
    shadowColor: "shadow-amber-800/20"
  }
];

const CountUp = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = React.useState(0);
  const countRef = useRef(null);
  const inView = useInView(countRef, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return <span ref={countRef}>{count}</span>;
};

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B45309' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-900 mb-4">
            ABDN Impact
          </h2>
          <p className="text-xl text-amber-900/80 max-w-2xl mx-auto">
            Our network's reach and influence in advancing neuroscience research across Africa
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.1
                    }
                  }
                }}
                className="relative group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`text-center p-6 bg-white rounded-2xl shadow-lg ${stat.shadowColor} hover:shadow-xl transition-all duration-300`}>
                  <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient} mb-2`}>
                    <CountUp end={parseInt(stat.value)} />
                    {stat.value.includes('+') && '+'}
                  </div>
                  <div className="text-amber-900/80 font-medium">{stat.label}</div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 opacity-10">
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${stat.gradient}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
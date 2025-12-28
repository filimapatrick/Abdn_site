
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, BookOpen, Users } from 'lucide-react';

export default function NotFound() {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const floatingAnimation = {
        y: [0, -20, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const quickLinks = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Academy', path: '/academy', icon: BookOpen },
        { name: 'People', path: '/network/people', icon: Users },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden py-[8rem]">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-amber-300/20 rounded-full"
                        animate={{
                            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                        }}
                        transition={{
                            duration: Math.random() * 20 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl w-full text-center relative z-10"
            >
                {/* 404 Number with Animation */}
                <motion.div
                    variants={itemVariants}
                    animate={floatingAnimation}
                    className="mb-8"
                >
                    <h1 className="text-[150px] md:text-[200px] font-bold leading-none">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 drop-shadow-2xl">
                            404
                        </span>
                    </h1>
                </motion.div>

                {/* Error Message */}
                <motion.div variants={itemVariants} className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Oops! The page you're looking for seems to have wandered off the network.
                        Let's get you back on track.
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                >
                    <motion.button
                        onClick={() => navigate(-1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition flex items-center justify-center shadow-lg hover:shadow-xl"
                    >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Go Back
                    </motion.button>
                    <motion.button
                        onClick={() => navigate('/')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="border-2 border-amber-600 text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition flex items-center justify-center"
                    >
                        <Home className="mr-2 h-5 w-5" />
                        Go Home
                    </motion.button>
                </motion.div>

                {/* Quick Links */}
                <motion.div variants={itemVariants} className="mt-12">
                    <h3 className="text-lg font-semibold text-gray-700 mb-6">
                        Or explore these sections:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                        {quickLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <motion.button
                                    key={link.name}
                                    onClick={() => navigate(link.path)}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white/80 backdrop-blur-sm border-2 border-amber-200 rounded-xl p-6 hover:border-amber-400 hover:shadow-lg transition-all duration-300"
                                >
                                    <Icon className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                                    <span className="text-gray-800 font-semibold">{link.name}</span>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Decorative Element */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 text-gray-400 text-sm"
                >
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>Error Code: 404 - Resource Not Found</p>
                </motion.div>
            </motion.div>

            {/* Gradient Orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
    );
}

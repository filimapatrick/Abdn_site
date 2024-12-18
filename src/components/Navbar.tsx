import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const academyItems = [
  {
    title: "Training",
    description: "Build expertise in cutting-edge neuroscience techniques through workshops and online courses",
    buttonText: "Explore Training",
    path: "/academy/training",
    color: "bg-blue-400",
    hoverColor: "hover:bg-blue-500",
    textColor: "text-blue-900"
  },
  {
    title: "Curricular Development",
    description: "Collaborate to create innovative neuroscience curricula tailored for African institutions",
    buttonText: "View Programs",
    path: "/academy/curriculum",
    color: "bg-indigo-500",
    hoverColor: "hover:bg-indigo-600",
    textColor: "text-indigo-50"
  },
  {
    title: "Mentorship",
    description: "Connect with leading neuroscientists for guidance on research and career development",
    buttonText: "Find Mentors",
    path: "/academy/mentorship",
    color: "bg-purple-400",
    hoverColor: "hover:bg-purple-500",
    textColor: "text-purple-900"
  },
  {
    title: "Research Infrastructure",
    description: "Access state-of-the-art tools and facilities to advance your neuroscience projects",
    buttonText: "View Resources",
    path: "/academy/infrastructure",
    color: "bg-pink-400",
    hoverColor: "hover:bg-pink-500",
    textColor: "text-pink-900"
  },
  {
    title: "Research Group",
    description: "Join vibrant communities of researchers working on groundbreaking neuroscience topics",
    buttonText: "Join Groups",
    path: "/academy/research-groups",
    color: "bg-emerald-400",
    hoverColor: "hover:bg-emerald-500",
    textColor: "text-emerald-900"
  },
  {
    title: "Events",
    description: "Participate in workshops, conferences, and seminars that shape the future of neuroscience",
    buttonText: "View Calendar",
    path: "/academy/events",
    color: "bg-amber-400",
    hoverColor: "hover:bg-amber-500",
    textColor: "text-amber-900"
  }
];

const networkItems = [
  {
    title: "Research Centers",
    description: "Explore our network of neuroscience research centers across Africa",
    buttonText: "View Centers",
    path: "/network/centers",
    color: "bg-teal-400",
    hoverColor: "hover:bg-teal-500",
    textColor: "text-teal-900"
  },
  {
    title: "Collaborations",
    description: "Discover ongoing research collaborations and partnership opportunities",
    buttonText: "Join Projects",
    path: "/network/collaborations",
    color: "bg-cyan-400",
    hoverColor: "hover:bg-cyan-500",
    textColor: "text-cyan-900"
  },
  {
    title: "Data Sharing",
    description: "Access and contribute to our shared neuroscience data repositories",
    buttonText: "Access Data",
    path: "/network/data",
    color: "bg-sky-400",
    hoverColor: "hover:bg-sky-500",
    textColor: "text-sky-900"
  },
  {
    title: "Publications",
    description: "Browse research publications from our network members",
    buttonText: "Read Papers",
    path: "/network/publications",
    color: "bg-violet-400",
    hoverColor: "hover:bg-violet-500",
    textColor: "text-violet-900"
  }
];

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveMobileDropdown(null);
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
            <img
              src="../../Assets/abdn_logo.png"
              alt="ABDN Logo"
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="flex-1 hidden md:flex items-center space-x-8 ml-8">
            <Link to="/academy" className="text-gray-700 hover:text-blue-600">
              Academy
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('academy')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <span>Programs</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'academy' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white rounded-2xl shadow-xl mt-2 p-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {academyItems.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className="flex flex-col space-y-3 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <h3 className="text-xl font-semibold">{item.title}</h3>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                          <button
                            className={`${item.color} ${item.hoverColor} ${item.textColor} px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-between mt-auto`}
                          >
                            {item.buttonText}
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('network')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <span>Network</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'network' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white rounded-2xl shadow-xl mt-2 p-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {networkItems.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className="flex flex-col space-y-3 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <h3 className="text-xl font-semibold">{item.title}</h3>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                          <button
                            className={`${item.color} ${item.hoverColor} ${item.textColor} px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-between mt-auto`}
                          >
                            {item.buttonText}
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
          </div>

          {/* Desktop Contact Button */}
          <div className="hidden md:flex">
            <button
              onClick={onContactClick}
              className="text-gray-700 hover:text-blue-600 ml-auto"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full bg-white shadow-xl md:hidden overflow-y-auto"
            style={{ top: "5rem" }}
          >
            <div className="px-4 py-6 space-y-6">
              <Link 
                to="/academy" 
                className="block text-lg font-medium text-gray-700 hover:text-blue-600"
                onClick={closeMobileMenu}
              >
                Academy
              </Link>

              <div>
                <button
                  className="flex items-center justify-between w-full text-lg font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'programs' ? null : 'programs')}
                >
                  <span>Programs</span>
                  <ChevronDown className={`h-5 w-5 transform transition-transform ${activeMobileDropdown === 'programs' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeMobileDropdown === 'programs' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-4 pl-4"
                    >
                      {academyItems.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className="block text-gray-600 hover:text-blue-600"
                          onClick={closeMobileMenu}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <button
                  className="flex items-center justify-between w-full text-lg font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => setActiveMobileDropdown(activeMobileDropdown === 'network' ? null : 'network')}
                >
                  <span>Network</span>
                  <ChevronDown className={`h-5 w-5 transform transition-transform ${activeMobileDropdown === 'network' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeMobileDropdown === 'network' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-4 pl-4"
                    >
                      {networkItems.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className="block text-gray-600 hover:text-blue-600"
                          onClick={closeMobileMenu}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                to="/about" 
                className="block text-lg font-medium text-gray-700 hover:text-blue-600"
                onClick={closeMobileMenu}
              >
                About
              </Link>

              <button
                onClick={() => {
                  onContactClick();
                  closeMobileMenu();
                }}
                className="block w-full text-left text-lg font-medium text-gray-700 hover:text-blue-600"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  ArrowRight, 
  Menu, 
  X, 
  GraduationCap, 
  BookOpen, 
  Users, 
  Microscope, 
  Users2, 
  Calendar,
  Building2,
  Network,
  Database,
  BookText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const academyItems = [
  {
    title: "Training",
    description: "Build expertise in cutting-edge neuroscience techniques through workshops and online courses",
    buttonText: "Explore Training",
    path: "/academy/training",
    icon: GraduationCap,
    gradient: "from-amber-500/10 to-amber-600/10"
  },
  {
    title: "Curricular Development",
    description: "Collaborate to create innovative neuroscience curricula tailored for African institutions",
    buttonText: "View Programs",
    path: "/academy/curriculum",
    icon: BookOpen,
    gradient: "from-amber-500/10 to-amber-600/10"
  },
  {
    title: "Mentorship",
    description: "Connect with leading neuroscientists for guidance on research and career development",
    buttonText: "Find Mentors",
    path: "/academy/mentorship",
    icon: Users,
    gradient: "from-amber-500/10 to-amber-600/10"
  },
  {
    title: "Research Infrastructure",
    description: "Access state-of-the-art tools and facilities to advance your neuroscience projects",
    buttonText: "View Resources",
    path: "/academy/infrastructure",
    icon: Microscope,
    gradient: "from-amber-500/10 to-amber-600/10"
  },
  {
    title: "Research Group",
    description: "Join vibrant communities of researchers working on groundbreaking neuroscience topics",
    buttonText: "Join Groups",
    path: "/academy/research-groups",
    icon: Users2,
    gradient: "from-amber-500/10 to-amber-600/10"
  },
  {
    title: "Events",
    description: "Participate in workshops, conferences, and seminars that shape the future of neuroscience",
    buttonText: "View Calendar",
    path: "/academy/events",
    icon: Calendar,
    gradient: "from-amber-500/10 to-amber-600/10"
  }
];

const networkItems = [
  {
    title: "People",
    description: "Meet our national coordinators, stakeholders, and founding members",
    buttonText: "Meet the Team",
    path: "/network/people",
    icon: Users2,
    gradient: "from-amber-500/10 to-amber-600/10"
  },
  {
    title: "Alumni",
    description: "Discover the achievements and current work of our alumni network",
    buttonText: "View Alumni",
    path: "/network/alumni",
    icon: GraduationCap,
    gradient: "from-amber-500/10 to-amber-600/10"
  },
  {
    title: "Collaborations",
    description: "Discover ongoing research collaborations and partnership opportunities",
    buttonText: "Join Projects",
    path: "/network/collaborations",
    icon: Network,
    gradient: "from-amber-500/10 to-amber-600/10"
  },
  {
    title: "Data Sharing",
    description: "Access and contribute to our shared neuroscience data repositories",
    buttonText: "Access Data",
    path: "/network/data",
    icon: Database,
    gradient: "from-amber-500/10 to-amber-600/10"
  },
  {
    title: "Publications",
    description: "Browse research publications from our network members",
    buttonText: "Read Papers",
    path: "/network/publications",
    icon: BookText,
    gradient: "from-amber-500/10 to-amber-600/10"
  },
    {
    title: "learning",
    description: "Browse research publications from our network members",
    buttonText: "Read Papers",
    path: "/network/learning",
    icon: BookText,
    gradient: "from-amber-500/10 to-amber-600/10"
  },
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
      <div className="mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex h-24">
          {/* Left side: Logo and Navigation */}
          <div className="flex-none flex items-center">
            {/* Logo */}
            <Link to="/" onClick={closeMobileMenu}>
              <img
                src="/assets/abdn_logo.png"
                alt="ABDN Logo"
                className="h-20 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="flex-none hidden md:flex items-center ml-10 space-x-10">
            <Link to="/academy" className="text-lg font-medium text-amber-900 hover:text-amber-600 transition-colors">
              ABDS Academy
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('academy')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1.5 text-lg font-medium text-amber-900 hover:text-amber-600 transition-colors">
                <span>Programs</span>
                <ChevronDown className="h-5 w-5" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'academy' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[1000px] bg-white rounded-2xl shadow-xl mt-2 overflow-hidden border border-amber-100/50"
                  >
                    <div className="p-6 bg-gradient-to-br from-amber-50 to-white border-b border-amber-100/50">
                      <h2 className="text-2xl font-bold text-amber-900 mb-2">Our Programs</h2>
                      <p className="text-amber-700">Discover our comprehensive range of neuroscience programs and resources</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-br from-white to-amber-50/30">
                      {academyItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={index}
                            to={item.path}
                            className="group flex items-start space-x-3 p-3 rounded-xl transition-all duration-200 hover:bg-gradient-to-br hover:from-amber-50 hover:to-white hover:shadow-lg hover:-translate-y-0.5"
                          >
                            <div className="flex-shrink-0 p-2.5 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg group-hover:scale-110 transition-transform duration-200 shadow-sm">
                              <Icon className="w-5 h-5 text-amber-700" />
                            </div>
                            <div className="flex-1 space-y-1.5">
                              <h3 className="text-base font-semibold text-amber-900 group-hover:text-amber-700 transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-xs text-amber-700/80 group-hover:text-amber-900/80 transition-colors line-clamp-2">
                                {item.description}
                              </p>
                              <div className="flex items-center space-x-1.5 text-amber-600 group-hover:text-amber-800 transition-colors">
                                <span className="text-xs font-medium">{item.buttonText}</span>
                                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </Link>
                        );
                      })}
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
              <button className="flex items-center space-x-1.5 text-lg font-medium text-amber-900 hover:text-amber-600 transition-colors">
                <span>Network</span>
                <ChevronDown className="h-5 w-5" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'network' && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[1000px] bg-white rounded-2xl shadow-xl mt-2 overflow-hidden border border-amber-100/50 ml-[-10rem]"
                  >
                    <div className="p-6 bg-gradient-to-br from-amber-50 to-white border-b border-amber-100/50 ">
                      <h2 className="text-2xl font-bold text-amber-900 mb-2">Our Network</h2>
                      <p className="text-amber-700">Connect with research centers and access shared resources across Africa</p>
                    </div>
                    <div className="grid grid-cols-3 gap-6 p-6 bg-gradient-to-br from-white to-amber-50/30">
                      {networkItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={index}
                            to={item.path}
                            className="group flex items-start space-x-4 p-4 rounded-xl transition-all duration-200 hover:bg-gradient-to-br hover:from-amber-50 hover:to-white hover:shadow-lg hover:-translate-y-0.5"
                          >
                            <div className="flex-shrink-0 p-3 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg group-hover:scale-110 transition-transform duration-200 shadow-sm">
                              <Icon className="w-6 h-6 text-amber-700" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <h3 className="text-lg font-semibold text-amber-900 group-hover:text-amber-700 transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-sm text-amber-700/80 group-hover:text-amber-900/80 transition-colors">
                                {item.description}
                              </p>
                              <div className="flex items-center space-x-2 text-amber-600 group-hover:text-amber-800 transition-colors">
                                <span className="text-sm font-medium">{item.buttonText}</span>
                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/announcements" className="text-lg font-medium text-amber-900 hover:text-amber-600 transition-colors">
              Announcement
            </Link>

            <Link to="/about" className="text-lg font-medium text-amber-900 hover:text-amber-600 transition-colors">
              About
            </Link>
          </div>

          {/* Right side: Contact and Mobile Menu */}
          <div className="flex-1 flex items-center justify-end space-x-4">
            {/* Desktop Contact Button */}
            <button
              onClick={onContactClick}
              className="hidden md:block text-lg font-medium text-amber-900 hover:text-amber-600 transition-colors"
            >
              Contact
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-md text-amber-900 hover:text-amber-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
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
                className="block text-lg font-medium text-amber-900 hover:text-amber-600"
                onClick={closeMobileMenu}
              >
                ABDS Academy
              </Link>

              <div>
                <button
                  className="flex items-center justify-between w-full text-lg font-medium text-amber-900 hover:text-amber-600"
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
                          className="block text-amber-700 hover:text-amber-600"
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
                  className="flex items-center justify-between w-full text-lg font-medium text-amber-900 hover:text-amber-600"
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
                          className="block text-amber-700 hover:text-amber-600"
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
                to="/announcements" 
                className="block text-lg font-medium text-amber-900 hover:text-amber-600"
                onClick={closeMobileMenu}
              >
                Announcement
              </Link>

              <Link 
                to="/about" 
                className="block text-lg font-medium text-amber-900 hover:text-amber-600"
                onClick={closeMobileMenu}
              >
                About
              </Link>

              <button
                onClick={() => {
                  onContactClick();
                  closeMobileMenu();
                }}
                className="block w-full text-left text-lg font-medium text-amber-900 hover:text-amber-600"
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
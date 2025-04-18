import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaCode, FaGraduationCap, FaBriefcase, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Apply theme to document and save preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Handle scroll events (for mobile view)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <FaHome size={20} /> },
    { name: 'About', path: '/about', icon: <FaUser size={20} /> },
    { name: 'Skills', path: '/skills', icon: <FaCode size={20} /> },
    { name: 'Education', path: '/education', icon: <FaGraduationCap size={20} /> },
    { name: 'Projects', path: '/projects', icon: <FaBriefcase size={20} /> },
    { name: 'Contact', path: '/contact', icon: <FaEnvelope size={20} /> },
  ];

  // Desktop Sidebar
  const SidebarNav = () => (
    <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 shadow-lg flex flex-col z-50">
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <span className="text-teal-500 dark:text-teal-400">Sumiya</span>
          <span className="text-slate-800 dark:text-white">.dev</span>
        </Link>
      </div>
      
      {/* Nav Links */}
      <div className="flex-1 flex flex-col justify-center space-y-2 px-4">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 ${
              location.pathname === link.path
                ? 'bg-teal-50 dark:bg-slate-800 text-teal-600 dark:text-teal-400 font-semibold'
                : 'text-slate-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400'
            }`}
          >
            <span>{link.icon}</span>
            <span>{link.name}</span>
          </Link>
        ))}
      </div>
      
      {/* Bottom Section */}
      <div className="p-6 space-y-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
        
        {/* Resume Button */}
        <Link 
          to="/resume"
          className="w-full flex items-center justify-center p-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-all duration-300"
        >
          Resume
        </Link>
      </div>
    </div>
  );

  // Mobile Navbar
  const MobileNav = () => (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white dark:bg-slate-900 shadow-lg' 
        : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="mr-2 text-teal-500 dark:text-teal-400">Sumiya</span>
            <span className="text-slate-800 dark:text-white">.dev</span>
          </Link>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-gray-300"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            
            <button
              onClick={toggleMenu}
              className="text-slate-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 focus:outline-none transition-colors duration-300"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 px-2 pb-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`flex items-center space-x-3 p-2 rounded-lg ${
                  location.pathname === link.path
                    ? 'bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400 font-semibold'
                    : 'text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
            <Link
              to="/resume"
              className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-lg text-center transition-all duration-300"
            >
              Resume
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:block">
        <SidebarNav />
      </div>

      {/* Mobile Navbar (hidden on desktop) */}
      <div className="md:hidden">
        <MobileNav />
      </div>
    </>
  );
};

export default Navbar;
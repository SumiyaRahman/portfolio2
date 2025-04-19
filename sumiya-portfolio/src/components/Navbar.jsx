import { useState, useEffect } from 'react';
import { FaHome, FaUser, FaCode, FaGraduationCap, FaBriefcase, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or user preference on initial load
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    if (sectionId === 'home') {
      navigate('/');
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
    setIsOpen(false);
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

  // Handle scroll events
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

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => ({
        id: link.sectionId,
        element: document.getElementById(link.sectionId)
      }));

      const currentSection = sections.find(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', sectionId: 'home', icon: <FaHome /> },
    { name: 'About', sectionId: 'about', icon: <FaUser /> },
    { name: 'Skills', sectionId: 'skills', icon: <FaCode /> },
    { name: 'Education', sectionId: 'education', icon: <FaGraduationCap /> },
    { name: 'Projects', sectionId: 'projects', icon: <FaBriefcase /> },
    { name: 'Contact', sectionId: 'contact', icon: <FaEnvelope /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white dark:bg-slate-900 shadow-lg' 
        : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')} 
            className="text-2xl font-bold flex items-center cursor-pointer"
          >
            <span className="mr-2 text-teal-500 dark:text-teal-400">Sumiya</span>
            <span className="text-slate-800 dark:text-white">.dev</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.sectionId)}
                className={`flex items-center space-x-1 ${
                  activeSection === link.sectionId
                    ? 'text-teal-600 dark:text-teal-400 font-semibold'
                    : 'text-slate-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300'
                }`}
              >
                <span className="text-sm">{link.icon}</span>
                <span>{link.name}</span>
              </button>
            ))}
          </div>

          {/* Theme Toggle and Resume Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-300"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            
            <a 
              href="https://drive.google.com/file/d/1i05Yz9kkwWg_vuV2FvrQkFINGEDeLvxq/view?usp=sharing" 
              target="_blank"
              className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-gray-300"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            
            <button
              onClick={toggleMenu}
              className="text-slate-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 px-2 pb-4">
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.sectionId)}
                className={`flex items-center space-x-3 p-2 rounded-lg ${
                  activeSection === link.sectionId
                    ? 'bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400 font-semibold'
                    : 'text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </button>
            ))}
            <a
              href="https://drive.google.com/file/d/1i05Yz9kkwWg_vuV2FvrQkFINGEDeLvxq/view?usp=sharing"
              target="_blank"
              className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-lg text-center transition-all duration-300"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
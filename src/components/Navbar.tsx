
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-scroll';
import DownloadBrochureForm from './DownloadBrochureForm';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleServices = () => setIsServicesOpen(!isServicesOpen);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-serif font-bold text-abofield-blue">
            ABOFIELD
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link 
            to="about" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={700}
            className="text-abofield-dark-text hover:text-abofield-blue cursor-pointer transition-colors duration-300"
          >
            À propos
          </Link>
          
          <div className="relative group">
            <button 
              className="flex items-center text-abofield-dark-text hover:text-abofield-blue transition-colors duration-300"
              onClick={toggleServices}
            >
              Services <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="py-1 rounded-md bg-white">
                <Link 
                  to="playgrounds" 
                  spy={true} 
                  smooth={true} 
                  offset={-70} 
                  duration={700}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-abofield-lightgreen/20 hover:text-abofield-blue cursor-pointer"
                >
                  Pleines de jeux
                </Link>
                <Link 
                  to="sports" 
                  spy={true} 
                  smooth={true} 
                  offset={-70} 
                  duration={700}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-abofield-lightgreen/20 hover:text-abofield-blue cursor-pointer"
                >
                  Terrains de sports
                </Link>
                <Link 
                  to="maintenance" 
                  spy={true} 
                  smooth={true} 
                  offset={-70} 
                  duration={700}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-abofield-lightgreen/20 hover:text-abofield-blue cursor-pointer"
                >
                  Entretien
                </Link>
              </div>
            </div>
          </div>
          
          <Link 
            to="references" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={700}
            className="text-abofield-dark-text hover:text-abofield-blue cursor-pointer transition-colors duration-300"
          >
            Références
          </Link>
          
          <Link 
            to="contact" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={700}
            className="text-abofield-dark-text hover:text-abofield-blue cursor-pointer transition-colors duration-300"
          >
            Contact
          </Link>
          
          <DownloadBrochureForm 
            buttonText="Brochure"
            pdfUrl="/brochure.pdf"
            className="flex items-center space-x-2 btn-primary"
            showIcon={true}
          />
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          className="lg:hidden text-abofield-dark-text focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-md overflow-hidden animate-slide-down">
          <div className="container-custom py-4 space-y-4">
            <Link 
              to="about" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={700}
              className="block py-2 text-abofield-dark-text hover:text-abofield-blue cursor-pointer"
              onClick={closeMenu}
            >
              À propos
            </Link>
            
            <div>
              <button 
                onClick={toggleServices}
                className="flex items-center justify-between w-full py-2 text-abofield-dark-text hover:text-abofield-blue"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div className="pl-4 space-y-2 mt-2 border-l-2 border-abofield-lightgreen">
                  <Link 
                    to="playgrounds" 
                    spy={true} 
                    smooth={true} 
                    offset={-70} 
                    duration={700}
                    className="block py-2 text-abofield-dark-text hover:text-abofield-blue cursor-pointer"
                    onClick={closeMenu}
                  >
                    Pleines de jeux
                  </Link>
                  <Link 
                    to="sports" 
                    spy={true} 
                    smooth={true} 
                    offset={-70} 
                    duration={700}
                    className="block py-2 text-abofield-dark-text hover:text-abofield-blue cursor-pointer"
                    onClick={closeMenu}
                  >
                    Terrains de sports
                  </Link>
                  <Link 
                    to="maintenance" 
                    spy={true} 
                    smooth={true} 
                    offset={-70} 
                    duration={700}
                    className="block py-2 text-abofield-dark-text hover:text-abofield-blue cursor-pointer"
                    onClick={closeMenu}
                  >
                    Entretien
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              to="references" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={700}
              className="block py-2 text-abofield-dark-text hover:text-abofield-blue cursor-pointer"
              onClick={closeMenu}
            >
              Références
            </Link>
            
            <Link 
              to="contact" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={700}
              className="block py-2 text-abofield-dark-text hover:text-abofield-blue cursor-pointer"
              onClick={closeMenu}
            >
              Contact
            </Link>
            
            <DownloadBrochureForm 
              buttonText="Brochure"
              pdfUrl="/brochure.pdf"
              className="flex items-center space-x-2 btn-primary w-full justify-center"
              showIcon={true}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

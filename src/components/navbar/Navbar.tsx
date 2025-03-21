
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import NavDesktopMenu from './NavDesktopMenu';
import NavMobileMenu from './NavMobileMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
          <a href="/" className="flex items-center">
            <div className={`flex items-center bg-white rounded-full shadow-md transition-all duration-300 ${
              isScrolled ? 'px-3 py-1' : 'px-4 py-2'
            }`}>
              <img 
                src="/logo_abofield.jpeg" 
                alt="Abofield Logo" 
                className={`transition-all duration-300 rounded-full ${
                  isScrolled ? 'h-10 w-10' : 'h-12 w-12'
                } object-cover`}
              />
              <span className="ml-2 font-serif font-bold text-abofield-blue transition-all duration-300 ${
                isScrolled ? 'text-lg' : 'text-xl'
              }">
                ABOFIELD
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Menu */}
        <NavDesktopMenu />

        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          className="lg:hidden text-abofield-dark-text focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <NavMobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </nav>
  );
};

export default Navbar;

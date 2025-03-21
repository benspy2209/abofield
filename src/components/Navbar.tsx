
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import UserMenu from './UserMenu';
import { Button } from "@/components/ui/button";
import { PhoneCall, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between px-4">
          <RouterLink to="/" className="flex items-center space-x-2">
            <img 
              src="/logo_abofield.jpeg" 
              alt="Abofield" 
              className="h-10 w-auto rounded" 
            />
            <h1 className="text-2xl font-serif font-bold hidden sm:block text-abofield-dark-text">
              Abofield
            </h1>
          </RouterLink>
          
          <div className="hidden md:flex items-center space-x-6">
            <ScrollLink 
              to="services" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={700}
              className="text-abofield-dark-text hover:text-abofield-blue cursor-pointer transition-colors font-semibold"
            >
              Services
            </ScrollLink>
            <ScrollLink 
              to="about" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={700}
              className="text-abofield-dark-text hover:text-abofield-blue cursor-pointer transition-colors font-semibold"
            >
              À propos
            </ScrollLink>
            <ScrollLink 
              to="contact" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={700}
              className="text-abofield-dark-text hover:text-abofield-blue cursor-pointer transition-colors font-semibold"
            >
              Contact
            </ScrollLink>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-abofield-green hover:text-abofield-green/80 hover:bg-transparent px-0"
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                <span className="font-medium">+33 1 23 45 67 89</span>
              </Button>
              
              <UserMenu />
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <UserMenu />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 ml-3 text-abofield-dark-text focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div 
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-screen py-4' : 'max-h-0 py-0'
          }`}
        >
          <div className="flex flex-col space-y-4 px-4">
            <ScrollLink 
              to="services" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={700}
              className="text-abofield-dark-text py-2 hover:text-abofield-blue cursor-pointer transition-colors font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Services
            </ScrollLink>
            <ScrollLink 
              to="about" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={700}
              className="text-abofield-dark-text py-2 hover:text-abofield-blue cursor-pointer transition-colors font-semibold"
              onClick={() => setIsOpen(false)}
            >
              À propos
            </ScrollLink>
            <ScrollLink 
              to="contact" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={700}
              className="text-abofield-dark-text py-2 hover:text-abofield-blue cursor-pointer transition-colors font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </ScrollLink>
            <Button 
              variant="ghost" 
              size="sm"
              className="justify-start text-abofield-green hover:text-abofield-green/80 hover:bg-transparent px-0 py-2"
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              <span className="font-medium">+33 1 23 45 67 89</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

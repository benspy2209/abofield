
import { useState } from 'react';
import { Link } from 'react-scroll';
import { ChevronDown } from 'lucide-react';
import DownloadBrochureForm from '../DownloadBrochureForm';

interface NavMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavMobileMenu = ({ isOpen, onClose }: NavMobileMenuProps) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  
  const toggleServices = () => setIsServicesOpen(!isServicesOpen);

  if (!isOpen) return null;

  return (
    <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-md overflow-hidden animate-slide-down">
      <div className="container-custom py-4 space-y-4">
        <Link 
          to="about" 
          spy={true} 
          smooth={true} 
          offset={-70} 
          duration={700}
          className="block py-2 text-abofield-dark-text hover:text-abofield-blue cursor-pointer"
          onClick={onClose}
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
                onClick={onClose}
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
                onClick={onClose}
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
                onClick={onClose}
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
          onClick={onClose}
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
          onClick={onClose}
        >
          Contact
        </Link>
        
        <DownloadBrochureForm 
          buttonText="Brochure"
          pdfUrl="/Brochure_Abofield_fr.pdf"
          className="flex items-center space-x-2 btn-primary w-full justify-center"
          showIcon={true}
        />
      </div>
    </div>
  );
};

export default NavMobileMenu;

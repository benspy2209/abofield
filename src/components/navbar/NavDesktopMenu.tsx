
import { Link } from 'react-scroll';
import { ChevronDown } from 'lucide-react';
import DownloadBrochureForm from '../DownloadBrochureForm';

const NavDesktopMenu = () => {
  return (
    <div className="flex items-center space-x-8">
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
        pdfUrl="/Brochure_Abofield_fr.pdf"
        className="flex items-center space-x-2 btn-primary"
        showIcon={true}
      />
    </div>
  );
};

export default NavDesktopMenu;

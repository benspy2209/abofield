
import React from 'react';
import { Link } from 'react-scroll';
import { Facebook, Instagram, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-abofield-blue text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-serif font-semibold mb-6 text-white">ABOFIELD</h3>
            <p className="text-white/80 mb-6">
              Spécialiste des revêtements de sol amortissant pour les besoins sportifs et récréatifs.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="mailto:info@abofield.be" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="about" 
                  spy={true} 
                  smooth={true} 
                  offset={-70} 
                  duration={700}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link 
                  to="playgrounds" 
                  spy={true} 
                  smooth={true} 
                  offset={-70} 
                  duration={700}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  Pleines de jeux
                </Link>
              </li>
              <li>
                <Link 
                  to="sports" 
                  spy={true} 
                  smooth={true} 
                  offset={-70} 
                  duration={700}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  Terrains de sports
                </Link>
              </li>
              <li>
                <Link 
                  to="maintenance" 
                  spy={true} 
                  smooth={true} 
                  offset={-70} 
                  duration={700}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  Entretien
                </Link>
              </li>
              <li>
                <Link 
                  to="references" 
                  spy={true} 
                  smooth={true} 
                  offset={-70} 
                  duration={700}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  Références
                </Link>
              </li>
              <li>
                <Link 
                  to="contact" 
                  spy={true} 
                  smooth={true} 
                  offset={-70} 
                  duration={700}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Gazon synthétique
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Pistes d'athlétisme
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Aires de jeux
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Multisports
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Sol souple
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Entretien et maintenance
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-white/80">Adresse:</span>
                <span className="ml-2 text-white/80">123 Avenue des Revêtements, 1000 Bruxelles, Belgique</span>
              </li>
              <li className="flex items-center">
                <span className="text-white/80">Téléphone:</span>
                <a href="tel:+32123456789" className="ml-2 text-white/80 hover:text-white transition-colors">
                  +32 123 456 789
                </a>
              </li>
              <li className="flex items-center">
                <span className="text-white/80">Email:</span>
                <a href="mailto:info@abofield.be" className="ml-2 text-white/80 hover:text-white transition-colors">
                  info@abofield.be
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10">
        <div className="container-custom py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} ABOFIELD. Tous droits réservés.
          </p>
          
          <div className="flex space-x-4 items-center">
            <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">
              Politique de confidentialité
            </a>
            <span className="text-white/40">|</span>
            <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">
              Conditions d'utilisation
            </a>
            <span className="text-white/40">|</span>
            <button 
              onClick={scrollToTop}
              className="ml-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Retour en haut"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

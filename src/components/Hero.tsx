
import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-scroll';
import DownloadBrochureForm from './DownloadBrochureForm';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607461184224-8c7da2cfc383?q=80&w=1920&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-abofield-blue/80 to-abofield-green/70"></div>
      </div>

      {/* Hero content */}
      <div className="container-custom relative z-10 flex flex-col items-center justify-center text-white text-center pt-20">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            <span className="block">Revêtements de sol amortissant</span>
            <span className="block mt-2">pour besoins sportifs et récréatifs</span>
          </h1>
          
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
            ABOFIELD est spécialisé dans l'aménagement et la maintenance des revêtements de sol amortissant pour les aires de jeux, espaces sportifs et sols de sécurité.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="services"
              spy={true}
              smooth={true}
              offset={-70}
              duration={700}
              className="btn-secondary hover:scale-105"
            >
              Découvrir nos services
            </Link>
            
            <DownloadBrochureForm 
              buttonText="Télécharger la brochure"
              pdfUrl="/brochure.pdf"
              className="flex items-center justify-center space-x-2 bg-white text-abofield-blue px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
            />
          </div>
        </div>
        
        {/* Scroll down indicator */}
        <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Link
            to="services"
            spy={true}
            smooth={true}
            offset={-70}
            duration={700}
            className="cursor-pointer flex flex-col items-center"
          >
            <span className="text-sm mb-2 font-light">Découvrir</span>
            <ArrowDown className="text-white" size={24} />
          </Link>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-0"></div>
    </div>
  );
};

export default Hero;

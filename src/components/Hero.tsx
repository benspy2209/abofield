
import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620366392312-a882ba99461c?q=80&w=1920&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-abofield-blue/80 to-abofield-green/70"></div>
      </div>

      {/* Hero content */}
      <div className="container-custom relative z-10 flex flex-col items-center justify-center text-white text-center pt-20">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            <span className="block">Plaines de jeux</span>
            <span className="block mt-2">et terrains de sports</span>
          </h1>
          
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
            ABOFIELD vous accompagne dans l'aménagement et l'installation de vos plaines de jeux et terrains de sports, avec des solutions drainantes performantes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              asChild
              className="bg-abofield-blue hover:bg-abofield-blue/90 text-white"
            >
              <Link to="/services">
                Découvrir nos services
              </Link>
            </Button>
            
            <Button 
              asChild
              className="bg-white text-abofield-blue hover:bg-white/90"
            >
              <Link to="/contact">
                Demander un devis
              </Link>
            </Button>
          </div>
          
          {/* Scroll down indicator - moved below the buttons with margin */}
          <div className={`mt-12 animate-bounce transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <ScrollLink
              to="services"
              spy={true}
              smooth={true}
              offset={-70}
              duration={700}
              className="cursor-pointer flex flex-col items-center"
            >
              <span className="text-sm mb-2 font-light">Découvrir</span>
              <ArrowDown className="text-white" size={24} />
            </ScrollLink>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-0"></div>
    </div>
  );
};

export default Hero;

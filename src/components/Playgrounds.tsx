
import React, { useEffect, useRef } from 'react';
import { Check, Shield, Palette, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  color: string;
  size?: number;
}

const Feature = ({ icon, title, color, size = 24 }: FeatureProps) => (
  <div className="flex items-center space-x-4">
    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <span className="font-medium text-lg">{title}</span>
  </div>
);

const Playgrounds = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('.fade-in-view');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="playgrounds" className="py-16 bg-white" ref={sectionRef}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex flex-col items-center">
            <span className="section-subtitle fade-in-view">Aménagement de plaines de jeux</span>
            <h2 className="section-title mx-auto after:left-1/4 after:right-1/4 after:w-1/2 fade-in-view mt-1">
              Des solutions complètes pour vos espaces de jeux
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6 fade-in-view">
            <div className="bg-white rounded-xl p-6 border border-abofield-gray shadow-sm">
              <h3 className="text-xl font-semibold text-abofield-blue mb-4">Systèmes drainants performants</h3>
              <p className="text-gray-700">
                Nos solutions de drainage garantissent l'évacuation efficace des eaux de pluie, permettant 
                une utilisation de vos plaines de jeux en toutes circonstances et prolongeant leur durée de vie.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-abofield-gray shadow-sm">
              <h3 className="text-xl font-semibold text-abofield-green mb-4">Aménagement sur mesure</h3>
              <p className="text-gray-700">
                Nous concevons des espaces adaptés à vos besoins spécifiques, avec une attention particulière 
                portée aux matériaux durables et à l'esthétique de votre projet.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-abofield-gray shadow-sm">
              <h3 className="text-xl font-semibold text-abofield-lightblue mb-4">Travaux de préparation</h3>
              <p className="text-gray-700">
                Nous préparons soigneusement le terrain avant l'installation de votre plaine de jeux pour 
                garantir des fondations solides et durables.
              </p>
            </div>
            
            <div className="mt-8 text-center md:text-left">
              <Button asChild className="bg-abofield-blue hover:bg-abofield-blue/90 text-white">
                <Link to="/contact">
                  Demander un devis personnalisé
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="space-y-6 fade-in-view">
            <img 
              src="/jeux.jpg" 
              alt="Plaine de jeux avec sol amortissant coloré" 
              className="rounded-xl shadow-md w-full h-auto"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Feature 
                icon={<Shield className="text-white" size={24} />}
                title="Sécurité"
                color="bg-abofield-blue"
              />
              
              <Feature 
                icon={<Droplets className="text-white" size={24} />}
                title="Drainage"
                color="bg-abofield-green"
              />
              
              <Feature 
                icon={<Palette className="text-white" size={24} />}
                title="Design"
                color="bg-abofield-lightblue"
              />
              
              <Feature 
                icon={<Check className="text-white" size={24} />}
                title="Certification"
                color="bg-abofield-blue"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playgrounds;

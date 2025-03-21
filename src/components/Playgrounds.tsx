
import React, { useEffect, useRef } from 'react';
import { Check, Shield, Palette, Droplets } from 'lucide-react';
import DownloadBrochureForm from './DownloadBrochureForm';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  color: string;
}

const Feature = ({ icon, title, color }: FeatureProps) => (
  <div className="flex items-center space-x-3">
    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <span className="font-medium">{title}</span>
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
    <section id="playgrounds" className="section-padding bg-abofield-gray/50" ref={sectionRef}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex flex-col items-center">
            <span className="section-subtitle fade-in-view">Pleines de jeux</span>
            <h2 className="section-title mx-auto after:left-1/4 after:right-1/4 after:w-1/2 fade-in-view mt-1">
              Jeu et sécurité avec le bon sentiment du divertissement
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-gray-700 mb-6 fade-in-view">
              ABOFILED garantit la sécurité des aires de jeux, des zones de gymnastique et des espaces de fitness – que ce soit à l'extérieur ou à l'intérieur, – quel que soit la météo. Notre produit offre non seulement une surface agréablement douce, mais aussi une excellente protection contre les chocs et la résistance au glissement nécessaire.
            </p>
            
            <p className="text-gray-700 mb-8 fade-in-view">
              Vous disposez d'une infinité de possibilités de conception pour des univers de couleurs et de thèmes créatifs. Nous pouvons concevoir des motifs personnalisés. Et selon les exigences et l'environnement, nous utilisons différentes variantes de matériaux pour la sous-structure, la rendant drainante ou même imperméable. Le tout dans une qualité testée et certifiée.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 fade-in-view">
              <Feature 
                icon={<Shield className="text-white" size={20} />}
                title="Sécurité maximale"
                color="bg-abofield-blue"
              />
              
              <Feature 
                icon={<Palette className="text-white" size={20} />}
                title="Designs créatifs"
                color="bg-abofield-green"
              />
              
              <Feature 
                icon={<Check className="text-white" size={20} />}
                title="Normes certifiées"
                color="bg-abofield-lightblue"
              />
              
              <Feature 
                icon={<Droplets className="text-white" size={20} />}
                title="Drainage optimal"
                color="bg-abofield-blue"
              />
            </div>
            
            <div className="mt-8 fade-in-view">
              <DownloadBrochureForm 
                buttonText="Télécharger notre documentation"
                pdfUrl="/Brochure_Abofield_fr.pdf"
                buttonVariant="default"
                className="bg-abofield-blue hover:bg-abofield-blue/90 text-white"
              />
            </div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-4 fade-in-view">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1568712795966-50e59650ce39?q=80&w=600&auto=format&fit=crop" 
                  alt="Aire de jeux colorée" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1519331582073-283f1a211a3e?q=80&w=600&auto=format&fit=crop" 
                  alt="Enfants jouant sur une aire de jeux" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1581622558634-0492d1e3d92e?q=80&w=800&auto=format&fit=crop" 
                alt="Vue d'ensemble d'une aire de jeux" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playgrounds;

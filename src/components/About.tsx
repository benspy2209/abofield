
import React, { useEffect, useRef } from 'react';
import { Shield, Award, Leaf, Clock } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => (
  <div className="flex flex-col items-center md:items-start text-center md:text-left p-6 rounded-lg hover:bg-white/50 transition-all duration-300">
    <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-abofield-green/10 text-abofield-blue mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const About = () => {
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
    <section id="about" className="section-padding bg-white" ref={sectionRef}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="section-subtitle fade-in-view">À propos d'ABOFIELD</span>
            <h2 className="section-title fade-in-view">
              Une expertise reconnue dans les revêtements de sol
            </h2>
            
            <div className="space-y-6 mt-8">
              <p className="text-gray-700 fade-in-view">
                ABOFIELD a été fondé pour devenir un acteur majeur dans l'aménagement et la maintenance des revêtements de sol amortissant pour les aires de jeux, d'espaces sportifs et de sols de sécurité (sol souple, gazon synthétique, sable, copeaux de bois…).
              </p>
              
              <p className="text-gray-700 fade-in-view">
                Nos systèmes de sous-couches en caoutchouc, absorbant les chocs, sont conçus pour offrir la meilleure expérience possible aux joueurs d'une part, qu'il s'agisse de gazon artificiel ou de pistes d'athlétisme et d'autre part pour les pleines de jeux.
              </p>
              
              <p className="text-gray-700 fade-in-view">
                Chaque système répond aux normes les plus strictes établies par les fédérations sportives, garantissant un minimum de gaspillage, une installation facile et des performances homogènes.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl fade-in-view">
              <img 
                src="https://images.unsplash.com/photo-1621607149449-280006f46376?q=80&w=800&auto=format&fit=crop" 
                alt="Installation de revêtement de sol sportif" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 w-32 h-32 flex flex-col items-center justify-center text-center fade-in-view">
              <span className="text-4xl font-bold text-abofield-blue">15+</span>
              <span className="text-sm text-gray-600">Années d'expérience</span>
            </div>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Feature 
            icon={<Shield size={24} />}
            title="Sécurité certifiée"
            description="Tous nos revêtements répondent aux normes de sécurité les plus strictes."
          />
          
          <Feature 
            icon={<Award size={24} />}
            title="Qualité premium"
            description="Des matériaux durables pour une longue durée de vie et des performances optimales."
          />
          
          <Feature 
            icon={<Leaf size={24} />}
            title="Éco-responsable"
            description="Solutions durables avec utilisation de matériaux recyclés et recyclables."
          />
          
          <Feature 
            icon={<Clock size={24} />}
            title="Installation rapide"
            description="Mise en œuvre efficace pour minimiser les temps d'indisponibilité des espaces."
          />
        </div>
      </div>
    </section>
  );
};

export default About;


import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getImageUrl } from '@/integrations/supabase/client';

const ServiceCard = ({ 
  title, 
  description, 
  image, 
  linkTo 
}: { 
  title: string; 
  description: string; 
  image: string; 
  linkTo: string; 
}) => {
  // Utiliser la fonction getImageUrl pour obtenir l'URL correcte
  const imageUrl = image.startsWith('/') || image.startsWith('http') 
    ? getImageUrl(image) 
    : image;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group">
      <div className="h-56 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            console.error(`Erreur de chargement d'image: ${imageUrl}`);
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-abofield-dark-text">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          to={linkTo}
          className="inline-flex items-center text-abofield-blue hover:text-abofield-lightblue transition-colors cursor-pointer font-medium"
        >
          En savoir plus <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

const ServicesSummary = () => {
  return (
    <section id="services" className="section-padding bg-abofield-gray">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex flex-col items-center">
            <span className="section-subtitle">Nos services</span>
            <h2 className="section-title mx-auto after:left-1/4 after:right-1/4 after:w-1/2 mt-1">
              Des solutions adaptées à vos besoins
            </h2>
          </div>
          <p className="text-gray-600 mt-4">
            ABOFIELD vous accompagne dans l'aménagement et l'installation de tous types de plaines de jeux et terrains de sports.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            title="Plaines de jeux" 
            description="Aménagement complet avec revêtements sécurisés pour aires de jeux, zones de gymnastique et espaces de fitness extérieurs et intérieurs."
            image="/jeux.jpg"
            linkTo="/playgrounds"
          />
          
          <ServiceCard 
            title="Terrains de sports" 
            description="Installation de surfaces adaptées pour terrains de football, courts de tennis, padel, multisports et pistes d'athlétisme avec système drainant."
            image="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&auto=format&fit=crop"
            linkTo="/sports"
          />
          
          <ServiceCard 
            title="Entretien" 
            description="Contrôles réguliers, entretien préventif et réparations pour maintenir la qualité et la sécurité de vos installations sportives et récréatives."
            image="/entretien.jpg"
            linkTo="/maintenance"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSummary;

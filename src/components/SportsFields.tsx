
import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle } from 'lucide-react';
import DownloadBrochureForm from './DownloadBrochureForm';

interface SportCategory {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

const sportsCategories: SportCategory[] = [
  {
    id: "multisport",
    title: "Multisport",
    description: "Nos revêtements multisports sont conçus pour accueillir une variété d'activités sportives sur une même surface. Durables et polyvalents, ils s'adaptent aux besoins des écoles, municipalités et complexes sportifs.",
    features: [
      "Compatible avec plusieurs sports",
      "Haute résistance à l'usure",
      "Absorption des chocs optimale",
      "Maintenance facile"
    ],
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "synthetic",
    title: "Gazon synthétique",
    description: "Notre gazon synthétique offre une alternative durable et performante au gazon naturel. Idéal pour les terrains de football, de hockey et d'autres sports, il garantit une surface de jeu constante toute l'année.",
    features: [
      "Aspect et sensation naturels",
      "Utilisable par tous les temps",
      "Drainage efficace",
      "Faible besoin en entretien"
    ],
    image: "https://images.unsplash.com/photo-1555403884-a55261b15001?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "track",
    title: "Piste d'athlétisme",
    description: "Nos pistes d'athlétisme sont développées pour offrir performance et sécurité aux athlètes. Avec des propriétés d'élasticité optimales, elles réduisent les risques de blessures et favorisent de meilleures performances.",
    features: [
      "Excellente absorption des chocs",
      "Résistant aux intempéries",
      "Propriétés antidérapantes",
      "Conforme aux normes IAAF"
    ],
    image: "https://images.unsplash.com/photo-1557803056-a45cda8b323b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "etlayer",
    title: "ET layer",
    description: "Notre sous-couche ET layer est spécialement conçue pour améliorer les performances des revêtements sportifs. Elle offre une absorption des chocs supplémentaire et une meilleure stabilité à la surface de jeu.",
    features: [
      "Amélioration de l'absorption des chocs",
      "Durabilité accrue du revêtement",
      "Installation sur diverses surfaces",
      "Performances constantes"
    ],
    image: "https://images.unsplash.com/photo-1615731449720-7598ec95fe91?q=80&w=800&auto=format&fit=crop"
  }
];

const SportsFields = () => {
  const [selectedTab, setSelectedTab] = useState("multisport");
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
    <section id="sports" className="section-padding bg-white" ref={sectionRef}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 fade-in-view">
          <div className="flex flex-col items-center">
            <span className="section-subtitle">Terrains de sports</span>
            <h2 className="section-title mx-auto after:left-1/4 after:right-1/4 after:w-1/2 mt-1">
              La bonne surface pour chaque sport
            </h2>
          </div>
          <p className="text-gray-600 mt-4">
            ABOFIELD veille à ce que les terrains de football, les courts de tennis, les espaces multisports, les pistes d'athlétisme disposent des revêtements appropriés, à l'extérieur comme à l'intérieur, qu'il pleuve ou qu'il fasse beau.
          </p>
        </div>

        <div className="fade-in-view">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-abofield-gray">
                {sportsCategories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="px-4 py-2 data-[state=active]:bg-abofield-blue data-[state=active]:text-white"
                  >
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {sportsCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-serif font-semibold mb-4 text-abofield-dark-text">
                      {category.title}
                    </h3>
                    
                    <p className="text-gray-700 mb-6">
                      {category.description}
                    </p>
                    
                    <div className="space-y-3 mt-6">
                      {category.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="text-abofield-green mr-2 flex-shrink-0" size={20} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <DownloadBrochureForm 
                        buttonText="Voir les spécifications techniques"
                        pdfUrl="/Brochure_Abofield_fr.pdf"
                        buttonVariant="secondary"
                        className="bg-abofield-blue/10 hover:bg-abofield-blue/20 text-abofield-blue"
                      />
                    </div>
                  </div>
                  
                  <div className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                    <img 
                      src={category.image}
                      alt={category.title} 
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default SportsFields;


import React, { useState, useEffect, useRef } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MapPin, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Project {
  id: number;
  title: string;
  location: string;
  category: string;
  description: string;
  image: string;
  testimonial?: {
    name: string;
    role: string;
    quote: string;
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: "Parc Municipal Saint-Michel",
    location: "Bruxelles",
    category: "playground",
    description: "Rénovation complète de l'aire de jeux avec installation d'un revêtement amortissant coloré et thématique.",
    image: "https://images.unsplash.com/photo-1519331582073-283f1a211a3e?q=80&w=800&auto=format&fit=crop",
    testimonial: {
      name: "Marie Dubois",
      role: "Directrice des espaces verts",
      quote: "La transformation de notre aire de jeux a été spectaculaire. Les enfants adorent les nouvelles surfaces colorées et les parents apprécient la sécurité améliorée."
    }
  },
  {
    id: 2,
    title: "Terrain de football FC Étoile",
    location: "Liège",
    category: "sports",
    description: "Installation d'un gazon synthétique de dernière génération avec sous-couche amortissante ET layer.",
    image: "/lovable-uploads/da1703eb-7404-4995-b64d-fa43580588eb.png",
    testimonial: {
      name: "Thomas Leroy",
      role: "Président du club",
      quote: "Depuis l'installation de notre nouveau terrain, nous avons constaté une réduction significative des blessures et nos joueurs apprécient le confort de jeu."
    }
  },
  {
    id: 3,
    title: "École fondamentale Les Moineaux",
    location: "Namur",
    category: "playground",
    description: "Création d'une aire de jeux éducative avec différentes zones thématiques et revêtements adaptés.",
    image: "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Centre sportif municipal",
    location: "Charleroi",
    category: "sports",
    description: "Aménagement d'un espace multisport avec revêtement polyvalent pour différentes pratiques sportives.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop",
    testimonial: {
      name: "Philippe Martin",
      role: "Directeur du centre sportif",
      quote: "Le nouveau revêtement multisport nous permet d'accueillir une grande variété d'activités sur un même espace, avec une excellente durabilité."
    }
  },
  {
    id: 5,
    title: "Complexe sportif Royal",
    location: "Anvers",
    category: "sports",
    description: "Rénovation de la piste d'athlétisme et installation d'un revêtement haute performance.",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Parc d'attractions MiniWorld",
    location: "Gand",
    category: "playground",
    description: "Installation de sols amortissants personnalisés pour différentes zones thématiques du parc.",
    image: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?q=80&w=800&auto=format&fit=crop"
  }
];

const References = () => {
  const [filter, setFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (filter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => project.category === filter));
    }
  }, [filter]);

  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

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
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="references" className="section-padding bg-abofield-gray/30" ref={sectionRef}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 fade-in-view">
          <div className="flex flex-col items-center">
            <span className="section-subtitle">Références</span>
            <h2 className="section-title mx-auto after:left-1/4 after:right-1/4 after:w-1/2 mt-1">
              Nos réalisations
            </h2>
          </div>
          <p className="text-gray-600 mt-4">
            Découvrez nos projets récents et l'expertise que nous apportons à chaque réalisation.
          </p>
        </div>

        <div className="mb-10 flex justify-center fade-in-view">
          <Tabs value={filter} onValueChange={setFilter} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto bg-abofield-gray">
              <TabsTrigger 
                value="all"
                className="data-[state=active]:bg-abofield-blue data-[state=active]:text-white"
              >
                Tous
              </TabsTrigger>
              <TabsTrigger 
                value="playground"
                className="data-[state=active]:bg-abofield-blue data-[state=active]:text-white"
              >
                Aires de jeux
              </TabsTrigger>
              <TabsTrigger 
                value="sports"
                className="data-[state=active]:bg-abofield-blue data-[state=active]:text-white"
              >
                Terrains sportifs
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-view">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group bg-white rounded-xl">
              <div className="h-56 overflow-hidden relative">
                {loading ? (
                  <Skeleton className="w-full h-full absolute" />
                ) : (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-abofield-lightblue mb-2">
                  <MapPin size={16} className="mr-2" />
                  <span>{project.location}</span>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-2 text-abofield-dark-text">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                {project.testimonial && (
                  <div className="mt-6 p-4 bg-abofield-gray/50 rounded-lg border-l-2 border-abofield-green">
                    <p className="text-gray-700 italic mb-2">"{project.testimonial.quote}"</p>
                    <div className="flex items-center">
                      <User size={18} className="text-abofield-blue mr-2" />
                      <div>
                        <p className="font-medium text-sm">{project.testimonial.name}</p>
                        <p className="text-xs text-gray-500">{project.testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default References;

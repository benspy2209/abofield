
import React, { useEffect, useRef } from 'react';
import { ClipboardCheck, RotateCcw, ShieldCheck, CalendarCheck } from 'lucide-react';

interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Service = ({ icon, title, description }: ServiceProps) => (
  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
    <div className="w-14 h-14 bg-abofield-lightgreen/20 rounded-full flex items-center justify-center text-abofield-blue mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Maintenance = () => {
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
    <section id="maintenance" className="section-padding bg-gradient-to-b from-abofield-gray/50 to-white" ref={sectionRef}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 fade-in-view">
          <span className="section-subtitle">Entretien</span>
          <h2 className="section-title mx-auto after:left-1/4 after:right-1/4 after:w-1/2">
            Prolongez la durée de vie de vos revêtements
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in-view">
            <p className="text-gray-700 mb-6">
              Nous réalisons le contrôle des aires de jeux en détectant les signes d'usure et les situations d'insécurité. Le risque d'accident est fortement réduit et nous évitons ainsi de fermer un site pendant plusieurs jours voire semaines en planifiant les réparations préventives.
            </p>
            
            <p className="text-gray-700 mb-8">
              Un entretien régulier est essentiel pour maintenir la qualité, la sécurité et prolonger la durée de vie de vos revêtements. Notre programme d'entretien complet comprend des inspections périodiques, des nettoyages spécifiques et des interventions rapides en cas de besoin.
            </p>
            
            <div className="bg-abofield-blue/10 p-6 rounded-lg border-l-4 border-abofield-blue mt-8">
              <h3 className="text-lg font-semibold mb-2">Programme d'entretien personnalisé</h3>
              <p>
                Nous développons des programmes d'entretien adaptés à chaque type de revêtement et à son usage, en tenant compte des conditions environnementales et de la fréquentation. Contactez-nous pour établir votre plan d'entretien sur mesure.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 fade-in-view">
            <Service 
              icon={<ClipboardCheck size={24} />}
              title="Inspection régulière"
              description="Vérification complète de vos revêtements pour détecter les signes d'usure prématurée."
            />
            
            <Service 
              icon={<RotateCcw size={24} />}
              title="Nettoyage professionnel"
              description="Techniques de nettoyage spécifiques pour chaque type de revêtement afin de préserver ses propriétés."
            />
            
            <Service 
              icon={<ShieldCheck size={24} />}
              title="Réparations"
              description="Interventions rapides pour réparer les zones endommagées et éviter leur dégradation."
            />
            
            <Service 
              icon={<CalendarCheck size={24} />}
              title="Maintenance préventive"
              description="Actions planifiées pour prévenir les problèmes avant qu'ils ne surviennent."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Maintenance;

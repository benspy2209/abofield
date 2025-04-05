
import React, { useEffect } from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/Hero';
import ServicesSummary from '../components/ServicesSummary';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  useEffect(() => {
    // Add intersection observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll('.fade-in-view');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ServicesSummary />
      
      <section className="section-padding bg-abofield-gray">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12 fade-in-view">
            <div className="flex flex-col items-center">
              <span className="section-subtitle">Expertise</span>
              <h2 className="section-title mx-auto after:left-1/4 after:right-1/4 after:w-1/2 mt-1">
                Aménagement complet de vos espaces
              </h2>
            </div>
            <p className="text-gray-600 mt-4">
              ABOFIELD vous accompagne dans l'aménagement et l'installation complète de vos
              plaines de jeux et terrains de sports. Notre expertise couvre les travaux de préparation,
              le terrassement, les supports drainants et toutes les solutions adaptées à vos besoins.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in-view">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-abofield-blue mb-4">Travaux de préparation</h3>
              <p className="mb-4">Nous préparons soigneusement votre terrain avant toute installation pour garantir des fondations solides et durables.</p>
              <Link to="/services" className="text-abofield-green hover:text-abofield-blue flex items-center font-medium">
                En savoir plus <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-abofield-blue mb-4">Solutions drainantes</h3>
              <p className="mb-4">Nos systèmes de drainage performants assurent la longévité et la fonctionnalité de vos installations par tous les temps.</p>
              <Link to="/sports" className="text-abofield-green hover:text-abofield-blue flex items-center font-medium">
                En savoir plus <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-abofield-blue hover:bg-abofield-blue/90">
              <Link to="/contact">
                Demander un devis
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;

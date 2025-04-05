
import React, { useEffect } from 'react';
import Navbar from '../components/navbar';
import SportsFields from '../components/SportsFields';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SportsPage = () => {
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
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 pb-8 bg-abofield-gray/30">
        <div className="container-custom">
          <Link to="/" className="inline-flex items-center text-abofield-blue hover:text-abofield-green mb-4">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Retour à l'accueil
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-abofield-dark-text mb-6">
            Terrains de sports
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl">
            Abofield vous propose une gamme complète de solutions pour l'aménagement et 
            l'installation de terrains de sports. Nos systèmes drainants performants et nos 
            revêtements de qualité garantissent des surfaces de jeu optimales quelles que soient 
            les conditions météorologiques.
          </p>
        </div>
      </div>
      
      <SportsFields />
      
      <Footer />
    </div>
  );
};

export default SportsPage;

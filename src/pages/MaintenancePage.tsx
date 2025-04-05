
import React, { useEffect } from 'react';
import Navbar from '../components/navbar';
import Maintenance from '../components/Maintenance';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MaintenancePage = () => {
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
            Entretien
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl">
            Un entretien régulier est essentiel pour maintenir la qualité, la sécurité et la durabilité 
            de vos installations. ABOFIELD vous propose des services complets d'entretien et de maintenance 
            pour prolonger la durée de vie de vos équipements.
          </p>
        </div>
      </div>
      
      <Maintenance />
      
      <Footer />
    </div>
  );
};

export default MaintenancePage;

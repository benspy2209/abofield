
import React, { useEffect } from 'react';
import Navbar from '../components/navbar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ContactPage = () => {
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
            Contact
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl">
            Vous avez un projet d'aménagement de plaine de jeux ou de terrain de sport? 
            N'hésitez pas à nous contacter pour discuter de vos besoins et obtenir un devis personnalisé.
          </p>
        </div>
      </div>
      
      <Contact />
      
      <Footer />
    </div>
  );
};

export default ContactPage;

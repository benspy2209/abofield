
import React, { useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, Shovel, Droplets, CheckCircle } from 'lucide-react';

const ServicesPage = () => {
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
            Nos services
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl">
            ABOFIELD vous accompagne dans l'aménagement complet de vos espaces sportifs et récréatifs. 
            Nous prenons en charge l'ensemble du projet, des travaux préparatoires à l'installation finale, 
            en passant par le terrassement et les systèmes de drainage.
          </p>
        </div>
      </div>
      
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center fade-in-view">
            <div>
              <h2 className="text-2xl font-serif font-semibold text-abofield-dark-text mb-6">
                Aménagement complet
              </h2>
              <p className="text-gray-700 mb-6">
                Notre expertise ne se limite pas à la simple installation de revêtements. Nous concevons et 
                réalisons l'ensemble de votre projet d'aménagement pour garantir un résultat final cohérent, 
                fonctionnel et durable.
              </p>
              <div className="space-y-4 mt-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-abofield-green mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-abofield-dark-text">Conception sur mesure</h4>
                    <p className="text-gray-600">Solutions adaptées à vos besoins spécifiques et à votre environnement</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-abofield-green mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-abofield-dark-text">Gestion de projet intégrale</h4>
                    <p className="text-gray-600">Un interlocuteur unique pour l'ensemble de votre projet</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-abofield-green mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-abofield-dark-text">Respect des normes</h4>
                    <p className="text-gray-600">Installations conformes aux standards de sécurité en vigueur</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="/Gazon artificiel vert luxuriant couvrant une surface lisse.jpg" 
                alt="Aménagement complet" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-abofield-gray/30">
        <div className="container-custom">
          <h2 className="text-2xl font-serif font-semibold text-abofield-dark-text text-center mb-12">
            Notre expertise technique
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-view">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
              <div className="bg-abofield-blue/10 p-4 rounded-full mb-6">
                <BarChart3 className="text-abofield-blue" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-abofield-blue mb-3">Étude et planification</h3>
              <p className="text-gray-600">
                Analyse de votre terrain, conception adaptée à vos besoins et planification précise de chaque étape 
                du projet pour une réalisation optimale.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
              <div className="bg-abofield-green/10 p-4 rounded-full mb-6">
                <Shovel className="text-abofield-green" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-abofield-green mb-3">Terrassement</h3>
              <p className="text-gray-600">
                Préparation professionnelle du terrain avec travaux de terrassement adaptés 
                pour assurer des fondations solides et durables à vos installations.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
              <div className="bg-abofield-lightblue/10 p-4 rounded-full mb-6">
                <Droplets className="text-abofield-lightblue" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-abofield-lightblue mb-3">Systèmes drainants</h3>
              <p className="text-gray-600">
                Installation de solutions de drainage performantes pour assurer l'évacuation efficace 
                de l'eau et garantir l'utilisation de vos terrains par tous les temps.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;

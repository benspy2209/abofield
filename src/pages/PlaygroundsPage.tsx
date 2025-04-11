
import React, { useEffect } from 'react';
import Navbar from '../components/navbar';
import Playgrounds from '../components/Playgrounds';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, Palette, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PlaygroundsPage = () => {
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
      
      <div className="pt-24 pb-8 bg-white">
        <div className="container-custom">
          <Link to="/" className="inline-flex items-center text-abofield-blue hover:text-abofield-green mb-4">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Retour à l'accueil
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-abofield-dark-text mb-6">
            Plaines de jeux
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl">
            Des solutions complètes pour l'aménagement de plaines de jeux sécurisées et attrayantes. 
            De la conception à l'installation, nous créons des espaces de jeux avec des surfaces amortissantes 
            de haute qualité et des systèmes drainants performants.
          </p>
        </div>
      </div>
      
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-abofield-dark-text mb-6">
                Jeu et sécurité avec le bon sentiment du divertissement
              </h2>
              
              <p className="text-gray-700 mb-6 fade-in-view">
                ABOFIELD garantit la sécurité des aires de jeux, des zones de gymnastique et des espaces de fitness. Notre produit offre non seulement une surface agréablement douce, mais aussi une excellente protection contre les chocs et la résistance au glissement nécessaire.
              </p>
              
              <p className="text-gray-700 mb-8 fade-in-view">
                Vous disposez d'une infinité de possibilités de conception pour des univers de couleurs et de thèmes créatifs. Nous pouvons concevoir des motifs personnalisés. Et selon les exigences et l'environnement, nous utilisons différentes variantes de matériaux pour la sous-structure, la rendant drainante. Le tout dans une qualité testée et certifiée.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 fade-in-view">
                <div className="flex items-center space-x-4">
                  <div className="h-14 w-14 rounded-full flex items-center justify-center bg-abofield-blue">
                    <Shield className="text-white" size={28} />
                  </div>
                  <span className="font-medium text-lg">Sécurité maximale</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="h-14 w-14 rounded-full flex items-center justify-center bg-abofield-green">
                    <Palette className="text-white" size={28} />
                  </div>
                  <span className="font-medium text-lg">Designs créatifs</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="h-14 w-14 rounded-full flex items-center justify-center bg-abofield-lightblue">
                    <CheckCircle className="text-white" size={28} />
                  </div>
                  <span className="font-medium text-lg">Normes certifiées</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="h-14 w-14 rounded-full flex items-center justify-center bg-abofield-blue">
                    <Droplets className="text-white" size={28} />
                  </div>
                  <span className="font-medium text-lg">Drainage optimal</span>
                </div>
              </div>
              
              <div className="mt-10 fade-in-view">
                <Button asChild className="bg-abofield-blue hover:bg-abofield-blue/90 text-white">
                  <Link to="/contact">
                    Demander un devis
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="space-y-4 fade-in-view">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="/jeux.jpg" 
                  alt="Aire de jeux colorée" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-abofield-gray/10">
        <div className="container-custom">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-serif font-semibold text-abofield-dark-text mb-6">
              Sols amortissants de qualité supérieure
            </h3>
            <p className="mb-6 text-gray-700">
              Nos sols amortissants sont spécialement conçus pour offrir une sécurité optimale aux enfants 
              tout en garantissant une excellente durabilité. La structure drainante de nos installations 
              permet une utilisation optimale et prolonge la durée de vie de vos équipements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div className="bg-abofield-gray/10 p-6 rounded-lg">
                <h4 className="text-xl font-medium text-abofield-blue mb-3">Travaux préparatoires</h4>
                <p className="text-gray-700">
                  Nous préparons soigneusement le support avec un système drainant performant, assurant 
                  l'évacuation efficace des eaux de pluie et prolongeant la durée de vie de votre installation.
                </p>
              </div>
              <div className="bg-abofield-gray/10 p-6 rounded-lg">
                <h4 className="text-xl font-medium text-abofield-green mb-3">Aménagement complet</h4>
                <p className="text-gray-700">
                  De la conception à la réalisation, nous prenons en charge l'ensemble du projet d'aménagement
                  de votre plaine de jeux avec des matériaux de qualité supérieure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PlaygroundsPage;


import React, { useEffect } from 'react';
import Navbar from '../components/navbar';
import Playgrounds from '../components/Playgrounds';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

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
      
      <div className="pt-24 pb-8 bg-abofield-gray/30">
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
      
      <Playgrounds />
      
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-abofield-gray/30 rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-serif font-semibold text-abofield-dark-text mb-6">
              Sols amortissants de qualité supérieure
            </h3>
            <p className="mb-4">
              Nos sols amortissants sont spécialement conçus pour offrir une sécurité optimale aux enfants 
              tout en garantissant une excellente durabilité. La structure drainante de nos installations 
              permet une utilisation par tous les temps, évitant les accumulations d'eau et prolongeant 
              la durée de vie de vos équipements.
            </p>
            <p>
              Nous proposons différentes épaisseurs et densités selon les hauteurs de chute et les exigences 
              de votre projet, toujours dans le respect des normes de sécurité en vigueur.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PlaygroundsPage;

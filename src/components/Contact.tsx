
import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ContactInfo = ({ icon, title, details }: { icon: React.ReactNode; title: string; details: React.ReactNode }) => (
  <div className="flex items-start">
    <div className="w-10 h-10 rounded-full bg-abofield-green/10 flex items-center justify-center text-abofield-blue mr-4 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-medium mb-1">{title}</h3>
      <div className="text-gray-600">{details}</div>
    </div>
  </div>
);

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically handle the form submission
    // For now, we'll just show a success toast
    toast({
      title: "Formulaire envoyé",
      description: "Nous vous contacterons dans les plus brefs délais.",
      duration: 5000,
    });
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-subtitle">Contact</span>
          <h2 className="section-title mx-auto after:left-1/4 after:right-1/4 after:w-1/2">
            Contactez-nous
          </h2>
          <p className="text-gray-600 mt-4">
            Nous sommes à votre disposition pour répondre à vos questions et vous conseiller sur vos projets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="card-glass p-8">
            <h3 className="text-2xl font-serif mb-6">Envoyez-nous un message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Nom
                  </label>
                  <Input 
                    id="name" 
                    placeholder="Votre nom" 
                    required 
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="votre@email.com" 
                    required 
                    className="w-full"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium">
                  Sujet
                </label>
                <Input 
                  id="subject" 
                  placeholder="Sujet de votre message" 
                  required 
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Votre message" 
                  rows={5} 
                  required 
                  className="w-full resize-none"
                />
              </div>
              
              <Button type="submit" className="flex items-center bg-abofield-blue hover:bg-abofield-blue/90 text-white">
                <Send className="mr-2 h-4 w-4" /> Envoyer
              </Button>
            </form>
          </div>
          
          <div className="flex flex-col">
            <div className="card-glass p-8 mb-8">
              <h3 className="text-2xl font-serif mb-6">Nos coordonnées</h3>
              
              <div className="space-y-6">
                <ContactInfo 
                  icon={<MapPin size={20} />}
                  title="Adresse"
                  details={
                    <div>
                      <p>123 Avenue des Revêtements</p>
                      <p>1000 Bruxelles, Belgique</p>
                    </div>
                  }
                />
                
                <ContactInfo 
                  icon={<Phone size={20} />}
                  title="Téléphone"
                  details={
                    <a href="tel:+32123456789" className="hover:text-abofield-blue transition-colors">
                      +32 123 456 789
                    </a>
                  }
                />
                
                <ContactInfo 
                  icon={<Mail size={20} />}
                  title="Email"
                  details={
                    <a href="mailto:info@abofield.be" className="hover:text-abofield-blue transition-colors">
                      info@abofield.be
                    </a>
                  }
                />
                
                <ContactInfo 
                  icon={<Clock size={20} />}
                  title="Horaires d'ouverture"
                  details={
                    <div>
                      <p>Lundi - Vendredi: 8h30 - 17h30</p>
                      <p>Samedi - Dimanche: Fermé</p>
                    </div>
                  }
                />
              </div>
            </div>
            
            <div className="card-glass p-8 flex-1">
              <h3 className="text-2xl font-serif mb-6">Notre emplacement</h3>
              <div className="rounded-lg overflow-hidden h-64 bg-gray-200">
                {/* Here you would typically embed a Google Maps iframe */}
                <div className="w-full h-full flex items-center justify-center bg-abofield-gray/50 text-abofield-blue">
                  <MapPin size={40} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

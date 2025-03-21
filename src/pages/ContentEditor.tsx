
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from 'lucide-react';

const ContentEditor = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <Link to="/admin-dashboard" className="flex items-center text-abofield-blue hover:text-abofield-lightblue">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au tableau de bord
          </Link>
          <h1 className="text-3xl font-serif font-bold text-abofield-dark-text">Éditeur de contenu</h1>
        </div>
        
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Fonctionnalité en développement</AlertTitle>
          <AlertDescription>
            L'éditeur de contenu est actuellement en cours de développement et sera disponible prochainement.
          </AlertDescription>
        </Alert>
        
        <div className="mt-6">
          <p className="text-lg text-gray-700">
            Cette page vous permettra de modifier facilement les textes et contenus des différentes sections du site web.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;

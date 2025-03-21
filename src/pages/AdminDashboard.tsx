
import { Link } from 'react-router-dom';
import { ArrowLeft, Images, FileText, PencilRuler, LucideIcon, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AdminCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  linkTo: string;
  status?: 'wip' | 'ready';
}

const AdminCard = ({ title, description, icon: Icon, linkTo, status }: AdminCardProps) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-xl font-bold">{title}</CardTitle>
      <Icon className="h-6 w-6 text-abofield-blue" />
    </CardHeader>
    <CardContent>
      <CardDescription className="mb-4">{description}</CardDescription>
      <Link to={linkTo}>
        <Button className="w-full bg-abofield-blue hover:bg-abofield-lightblue">
          Accéder
        </Button>
      </Link>
    </CardContent>
    {status === 'wip' && (
      <CardFooter className="pt-0 pb-3 px-6">
        <p className="text-xs text-amber-600 flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1" /> En développement
        </p>
      </CardFooter>
    )}
  </Card>
);

const AdminDashboard = () => {
  const { isAdmin, user } = useAuth();

  const adminModules = [
    {
      title: "Gestionnaire d'images",
      description: "Télécharger, organiser et gérer les images utilisées sur le site.",
      icon: Images,
      linkTo: "/image-manager",
      status: 'wip' as const
    },
    {
      title: "Éditeur de contenu",
      description: "Modifier les textes et le contenu des différentes sections du site.",
      icon: FileText,
      linkTo: "/content-editor",
      status: 'wip' as const
    },
    {
      title: "Paramètres du site",
      description: "Configurer les informations générales, les couleurs et les fonctionnalités du site.",
      icon: PencilRuler,
      linkTo: "/site-settings",
      status: 'wip' as const
    }
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Accès refusé</h2>
          <p className="mb-4">Vous n'avez pas les droits d'administration nécessaires pour accéder à cette page.</p>
          <Link to="/">
            <Button variant="outline">Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <Link to="/" className="flex items-center text-abofield-blue hover:text-abofield-lightblue">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au site
          </Link>
          <h1 className="text-3xl font-serif font-bold text-abofield-dark-text">Tableau de bord d'administration</h1>
        </div>
        
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <AlertTriangle className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Mode développement</AlertTitle>
          <AlertDescription className="text-blue-700">
            Vous êtes en mode développement. Certaines fonctionnalités peuvent ne pas être entièrement opérationnelles.
            <br />
            Utilisateur connecté: {user?.email}
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminModules.map((module, index) => (
            <AdminCard
              key={index}
              title={module.title}
              description={module.description}
              icon={module.icon}
              linkTo={module.linkTo}
              status={module.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

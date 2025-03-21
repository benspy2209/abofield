
import { ReactNode, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const [emailConfirmationError, setEmailConfirmationError] = useState(false);

  useEffect(() => {
    // Vérifie si l'URL contient un paramètre d'erreur indiquant un problème de confirmation d'email
    const urlParams = new URLSearchParams(location.search);
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');
    
    if (error === 'email_not_confirmed' || (errorDescription && errorDescription.includes('Email not confirmed'))) {
      setEmailConfirmationError(true);
      toast({
        title: "Email non confirmé",
        description: "Votre email n'a pas été confirmé. Pour les besoins du développement, vous pouvez désactiver la vérification d'email dans les paramètres Supabase.",
        variant: "destructive",
      });
    }
  }, [location, toast]);

  // Log protected route status for debugging
  console.log("ProtectedRoute - Path:", location.pathname);
  console.log("ProtectedRoute - User:", !!user);
  console.log("ProtectedRoute - IsAdmin:", isAdmin);
  console.log("ProtectedRoute - RequireAdmin:", requireAdmin);
  console.log("ProtectedRoute - IsLoading:", isLoading);

  // Si nous sommes en train de charger l'authentification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-abofield-blue"></div>
      </div>
    );
  }

  // Affiche un message spécial si l'erreur de confirmation d'email est détectée
  if (emailConfirmationError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Email non confirmé</AlertTitle>
            <AlertDescription>
              Votre email n'a pas été confirmé. Pour les besoins du développement, vous pouvez désactiver la vérification d'email dans les paramètres Supabase.
            </AlertDescription>
          </Alert>
          <div className="text-center">
            <a 
              href="/auth" 
              className="text-abofield-blue hover:text-abofield-lightblue underline"
            >
              Retourner à la page de connexion
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
  if (!user) {
    console.log("Utilisateur non connecté, redirection vers /auth");
    return <Navigate to={`/auth?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // En mode développement, on considère tout utilisateur authentifié comme admin
  if (requireAdmin) {
    if (!isAdmin) {
      console.log("Mode développement: considérer l'utilisateur comme admin");
      // Pas de redirection, on considère l'utilisateur comme admin en dev
      // Cependant, cette vérification est gardée pour une utilisation future en production
    } else {
      console.log("Utilisateur est admin, accès autorisé");
    }
  }

  console.log("Accès autorisé à la route protégée");
  // L'utilisateur est connecté et a les permissions nécessaires (ou mode dev actif)
  return <>{children}</>;
};

export default ProtectedRoute;


import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  // Pendant le chargement, on affiche un indicateur de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-abofield-blue"></div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
  if (!user) {
    return <Navigate to={`/auth?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Si un rôle d'administrateur est requis et que l'utilisateur n'est pas admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // L'utilisateur est connecté et a les permissions nécessaires
  return <>{children}</>;
};

export default ProtectedRoute;

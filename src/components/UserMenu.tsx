
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Images, Settings, Lock, LayoutDashboard, FileText, PencilRuler } from 'lucide-react';

const UserMenu = () => {
  const { user, profile, isAdmin, signOut } = useAuth();

  // Si l'utilisateur n'est pas connecté, afficher le bouton de connexion
  if (!user) {
    return (
      <Link to="/auth">
        <Button variant="outline" size="sm" className="gap-2 bg-white">
          <Lock className="h-4 w-4" />
          <span className="hidden md:inline">Admin</span>
        </Button>
      </Link>
    );
  }

  // Si l'utilisateur est connecté, afficher le menu déroulant
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-white">
          <User className="h-4 w-4" />
          <span className="hidden md:inline">
            {profile?.full_name || user.email?.split('@')[0]}
          </span>
          {isAdmin && <span className="ml-1 text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">Admin</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          {isAdmin ? 'Administration' : 'Mon compte'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {isAdmin && (
          <Fragment>
            <DropdownMenuItem asChild>
              <Link to="/admin-dashboard" className="flex items-center cursor-pointer">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Tableau de bord</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link to="/image-manager" className="flex items-center cursor-pointer">
                <Images className="mr-2 h-4 w-4" />
                <span>Gestionnaire d'images</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link to="/content-editor" className="flex items-center cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                <span>Éditeur de contenu</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link to="/site-settings" className="flex items-center cursor-pointer">
                <PencilRuler className="mr-2 h-4 w-4" />
                <span>Paramètres du site</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
          </Fragment>
        )}
        
        <DropdownMenuItem asChild>
          <button
            onClick={() => signOut()}
            className="flex w-full items-center cursor-pointer text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Déconnexion</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;

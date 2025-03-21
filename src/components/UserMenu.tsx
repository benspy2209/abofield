
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
import { User, LogOut, Images, Settings, Lock } from 'lucide-react';

const UserMenu = () => {
  const { user, profile, isAdmin, signOut } = useAuth();

  // Si l'utilisateur n'est pas connecté, afficher le bouton de connexion
  if (!user) {
    return (
      <Link to="/auth">
        <Button variant="outline" size="sm" className="gap-2">
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
        <Button variant="outline" size="sm" className="gap-2">
          <User className="h-4 w-4" />
          <span className="hidden md:inline">
            {profile?.full_name || user.email?.split('@')[0]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {isAdmin && (
          <Fragment>
            <DropdownMenuItem asChild>
              <Link to="/image-manager" className="flex items-center cursor-pointer">
                <Images className="mr-2 h-4 w-4" />
                <span>Gestionnaire d'images</span>
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

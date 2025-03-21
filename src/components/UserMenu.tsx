
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
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
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      console.log("Déconnexion initiée...");
      await signOut();
      
      // Force navigate after logout - signOut already handles page reload
      // but we'll add this as a fallback
      setTimeout(() => {
        navigate('/');
      }, 200);
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Erreur de déconnexion",
        description: "Une erreur s'est produite lors de la déconnexion. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  // Si l'utilisateur n'est pas connecté, afficher le bouton de connexion
  if (!user) {
    return (
      <Link to="/auth">
        <Button variant="outline" size="sm" className="gap-2 bg-white hover:bg-gray-100">
          <Lock className="h-4 w-4" />
          <span className="hidden md:inline">Admin</span>
        </Button>
      </Link>
    );
  }

  console.log('UserMenu - isAdmin:', isAdmin);
  console.log('UserMenu - profile:', profile);
  console.log('UserMenu - user:', user);

  // Si l'utilisateur est connecté, afficher le menu déroulant
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-white hover:bg-gray-100">
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
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to="/admin-dashboard" className="flex items-center w-full">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Tableau de bord</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to="/image-manager" className="flex items-center w-full">
                <Images className="mr-2 h-4 w-4" />
                <span>Gestionnaire d'images</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to="/content-editor" className="flex items-center w-full">
                <FileText className="mr-2 h-4 w-4" />
                <span>Éditeur de contenu</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to="/site-settings" className="flex items-center w-full">
                <PencilRuler className="mr-2 h-4 w-4" />
                <span>Paramètres du site</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
          </Fragment>
        )}
        
        <DropdownMenuItem 
          className="cursor-pointer text-destructive focus:bg-destructive/10"
          onSelect={(e) => {
            e.preventDefault();
            handleSignOut(e as unknown as React.MouseEvent);
          }}
        >
          <div className="flex w-full items-center">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Déconnexion</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;

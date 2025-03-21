
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: ProfileType | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

interface ProfileType {
  id: string;
  email: string;
  full_name: string | null;
  is_admin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      try {
        // Récupérer la session initiale
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        console.log('Initial session:', initialSession);
        
        if (initialSession) {
          setSession(initialSession);
          setUser(initialSession.user);
          
          if (initialSession.user) {
            await fetchUserProfile(initialSession.user.id);
          }
        }
        
        // Configurer le gestionnaire d'événements d'authentification
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (_event, newSession) => {
            console.log('Auth state changed:', _event, newSession);
            
            setSession(newSession);
            setUser(newSession?.user ?? null);
            
            if (newSession?.user) {
              await fetchUserProfile(newSession.user.id);
            } else {
              setProfile(null);
              setIsAdmin(false);
            }
          }
        );
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing auth:', error);
        toast({
          title: "Erreur d'authentification",
          description: "Une erreur s'est produite lors de l'initialisation de l'authentification",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    initAuth();
  }, [toast]);
  
  const fetchUserProfile = async (userId: string) => {
    console.log('Fetching user profile for:', userId);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        console.log('Mode développement: définir isAdmin=true malgré l\'erreur');
        setProfile(null);
        setIsAdmin(true); // Pour développement, considérer tous les utilisateurs comme admin
        return;
      }
      
      console.log('Profile data retrieved:', data);
      setProfile(data as ProfileType);
      
      // Pour le développement, considérer tous les utilisateurs comme admin
      // En production, nous utiliserions: setIsAdmin(data.is_admin === true);
      setIsAdmin(true);
    } catch (error) {
      console.error('Exception in fetchUserProfile:', error);
      setProfile(null);
      setIsAdmin(true); // Pour développement
    }
  };
  
  const signIn = async (email: string, password: string) => {
    console.log('Signing in with:', email);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Error signing in:', error);
        toast({
          title: "Erreur de connexion",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Connecté avec succès",
          description: "Vous êtes maintenant connecté",
        });
      }
      
      return { error };
    } catch (error) {
      console.error('Error in signIn function:', error);
      toast({
        title: "Erreur de connexion",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
      return { error };
    }
  };
  
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      
      if (!error) {
        toast({
          title: "Inscription réussie",
          description: "Veuillez vérifier votre email pour confirmer votre compte",
        });
      } else {
        toast({
          title: "Erreur d'inscription",
          description: error.message,
          variant: "destructive",
        });
      }
      
      return { error };
    } catch (error) {
      console.error('Error in signUp function:', error);
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
      return { error: error };
    }
  };
  
  const signOut = async () => {
    console.log('Signing out...');
    try {
      // Nettoyer d'abord l'état local
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsAdmin(false);
      
      // Puis se déconnecter de Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out from Supabase:', error);
        throw error;
      }
      
      console.log('Sign out successful, state cleared');
      
      // Nettoyer le local storage pour s'assurer que toutes les données d'authentification sont supprimées
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('sb-') || key.startsWith('supabase-'))) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès",
      });
      
      // Attendre un court instant pour permettre à tout de se terminer
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Recharger la page pour garantir un état propre
      window.location.href = '/';
    } catch (error) {
      console.error('Error in signOut function:', error);
      toast({
        title: "Erreur de déconnexion",
        description: "Une erreur s'est produite lors de la déconnexion",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  const value = {
    session,
    user,
    profile,
    isAdmin,
    isLoading,
    signIn,
    signUp,
    signOut,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

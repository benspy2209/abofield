
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

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

  useEffect(() => {
    // Initialisation du contexte d'authentification
    const initAuth = async () => {
      setIsLoading(true);
      
      // Configurer l'écouteur d'événements d'authentification
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
      
      // Vérifier s'il existe déjà une session
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      console.log('Initial session:', initialSession);
      
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      
      if (initialSession?.user) {
        await fetchUserProfile(initialSession.user.id);
      } else {
        setProfile(null);
        setIsAdmin(false);
      }
      
      setIsLoading(false);
      
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initAuth();
  }, []);
  
  const fetchUserProfile = async (userId: string) => {
    console.log('Fetching user profile for:', userId);
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      setProfile(null);
      setIsAdmin(false);
      return;
    }
    
    console.log('Profile data:', data);
    setProfile(data as ProfileType);
    
    // Assurez-vous que le statut d'admin est correctement défini
    const adminStatus = !!data?.is_admin;
    console.log('Setting isAdmin to:', adminStatus);
    setIsAdmin(adminStatus);
  };
  
  const signIn = async (email: string, password: string) => {
    console.log('Signing in with:', email);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };
  
  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    return { error };
  };
  
  const signOut = async () => {
    console.log('Signing out...');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
      
      // Force clear local state to ensure UI updates
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsAdmin(false);
      
      console.log('Sign out successful, state cleared');
      
      // Force refresh du localStorage pour assurer que la session est bien nettoyée
      localStorage.removeItem('sb-piufckgtnbcrwvlavqll-auth-token');
      
      // Petite pause pour laisser le temps à Supabase de finaliser la déconnexion
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error('Error in signOut function:', error);
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

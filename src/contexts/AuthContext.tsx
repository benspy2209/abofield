
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
    
    try {
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
      
      console.log('Profile data retrieved:', data);
      setProfile(data as ProfileType);
      
      // Ensure admin status is correctly set
      const adminStatus = data?.is_admin === true;
      console.log('Setting isAdmin to:', adminStatus);
      setIsAdmin(adminStatus);
    } catch (error) {
      console.error('Exception in fetchUserProfile:', error);
      setProfile(null);
      setIsAdmin(false);
    }
  };
  
  const signIn = async (email: string, password: string) => {
    console.log('Signing in with:', email);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      console.error('Error in signIn function:', error);
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
      return { error };
    } catch (error) {
      console.error('Error in signUp function:', error);
      return { error: error };
    }
  };
  
  const signOut = async () => {
    console.log('Signing out...');
    try {
      // First clear the local state
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsAdmin(false);
      
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out from Supabase:', error);
        throw error;
      }
      
      console.log('Sign out successful, state cleared');
      
      // Force clear all auth-related local storage
      localStorage.removeItem('sb-piufckgtnbcrwvlavqll-auth-token');
      
      // Petite pause pour laisser le temps à Supabase de finaliser la déconnexion
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Force a reload to ensure a clean state
      window.location.reload();
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

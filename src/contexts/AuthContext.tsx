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
  const [isAdmin, setIsAdmin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
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
      
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      console.log('Initial session:', initialSession);
      
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      
      if (initialSession?.user) {
        await fetchUserProfile(initialSession.user.id);
      } else {
        setProfile(null);
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
        console.log('Développement: définir isAdmin=true malgré l\'erreur');
        setProfile(null);
        setIsAdmin(true);
        return;
      }
      
      console.log('Profile data retrieved:', data);
      setProfile(data as ProfileType);
      
      console.log('Développement: définir isAdmin=true');
      setIsAdmin(true);
    } catch (error) {
      console.error('Exception in fetchUserProfile:', error);
      setProfile(null);
      setIsAdmin(true);
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
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsAdmin(false);
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out from Supabase:', error);
        throw error;
      }
      
      console.log('Sign out successful, state cleared');
      
      localStorage.removeItem('sb-piufckgtnbcrwvlavqll-auth-token');
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
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

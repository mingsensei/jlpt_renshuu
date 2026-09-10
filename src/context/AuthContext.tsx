import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AuthUser {
  id: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (email: string, password?: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password?: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  isGuest: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_USER_KEY = 'jlpt_current_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. If Supabase is configured, listen to Supabase auth state
    if (isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'user@jlpt.app'
          });
        } else {
          // Check local fallback
          checkLocalSession();
        }
        setIsLoading(false);
      }).catch(() => {
        checkLocalSession();
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'user@jlpt.app'
          });
          localStorage.removeItem(LOCAL_USER_KEY);
        } else {
          checkLocalSession();
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      checkLocalSession();
      setIsLoading(false);
    }
  }, []);

  const checkLocalSession = () => {
    try {
      const stored = localStorage.getItem(LOCAL_USER_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  const signIn = async (email: string, password?: string): Promise<{ error: string | null }> => {
    if (isSupabaseConfigured() && password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) {
          // If Supabase auth error, allow demo login fallback for testing
          console.warn('Supabase signIn failed, trying local fallback:', error.message);
          return { error: error.message };
        }
        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email || email
          });
          return { error: null };
        }
      } catch (err: any) {
        return { error: err.message || 'Lỗi đăng nhập' };
      }
    }

    // Local / Demo Login fallback
    const localUser: AuthUser = {
      id: `user-${Date.now()}`,
      email,
      role: 'creator'
    };
    setUser(localUser);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(localUser));
    return { error: null };
  };

  const signUp = async (email: string, password?: string): Promise<{ error: string | null }> => {
    if (isSupabaseConfigured() && password) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        });
        if (error) {
          return { error: error.message };
        }
        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email || email
          });
          return { error: null };
        }
      } catch (err: any) {
        return { error: err.message || 'Lỗi đăng ký' };
      }
    }

    // Local / Demo Signup fallback
    const localUser: AuthUser = {
      id: `user-${Date.now()}`,
      email,
      role: 'creator'
    };
    setUser(localUser);
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(localUser));
    return { error: null };
  };

  const signOut = async () => {
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Sign out error:', err);
      }
    }
    setUser(null);
    localStorage.removeItem(LOCAL_USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        isGuest: !user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

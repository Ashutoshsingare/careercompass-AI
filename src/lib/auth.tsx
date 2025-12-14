"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/lib/types';
import { mockUser } from '@/lib/mock-data';
import { sleep } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = () => {
      try {
        const storedUser = localStorage.getItem('career-compass-user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('career-compass-user');
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    await sleep(1000); // Simulate network delay
    if (email === mockUser.email) { // No password check for mock
      localStorage.setItem('career-compass-user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast({ title: "Login Successful", description: "Welcome back!" });
      router.push('/dashboard');
    } else {
      toast({ variant: "destructive", title: "Login Failed", description: "Invalid email or password." });
    }
    setLoading(false);
  };

  const signup = async (name: string, email: string, pass: string) => {
    setLoading(true);
    await sleep(1000);
    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      createdAt: new Date().toISOString(),
      careerGoal: "Not set yet"
    };
    localStorage.setItem('career-compass-user', JSON.stringify(newUser));
    setUser(newUser);
    toast({ title: "Signup Successful", description: "Your account has been created." });
    router.push('/dashboard');
    setLoading(false);
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    await sleep(1000); // Simulate Google popup and auth
    const googleUser: User = {
        ...mockUser,
        name: "Alex Doe",
        email: "student@example.com"
    };
    localStorage.setItem('career-compass-user', JSON.stringify(googleUser));
    setUser(googleUser);
    toast({ title: "Signed in with Google", description: "Welcome to CareerCompass AI!" });
    router.push('/dashboard');
    setLoading(false);
  }

  const logout = () => {
    localStorage.removeItem('career-compass-user');
    setUser(null);
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    router.push('/login');
  };

  const value = { user, loading, login, signup, logout, loginWithGoogle };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

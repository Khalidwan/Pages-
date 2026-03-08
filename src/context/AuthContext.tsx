import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, storage } from '@/lib/storage';
import { generateId } from '@/lib/utils';

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string) => boolean;
  signup: (email: string, name: string) => boolean;
  logout: () => void;
  upgradeToPro: () => void;
  addCredits: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = storage.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (email: string, name: string) => {
    // Check if user exists
    const existingUser = storage.findUserByEmail(email);
    
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem('adrocket_user', JSON.stringify(existingUser));
      return true;
    }
    return false;
  };

  const signup = (email: string, name: string) => {
    // Check if user already exists
    if (storage.findUserByEmail(email)) {
      return false;
    }

    // Check for referral code
    const referralCode = localStorage.getItem('adrocket_referral_code');
    let initialCredits = 10;

    if (referralCode) {
      const referrer = storage.findUserByReferralCode(referralCode);
      if (referrer) {
        // Bonus for new user
        initialCredits += 50;
        
        // Bonus for referrer
        const updatedReferrer = { ...referrer, credits: referrer.credits + 50 };
        storage.saveUserToDatabase(updatedReferrer);
      }
      // Clear referral code
      localStorage.removeItem('adrocket_referral_code');
    }

    const newUser: User = {
      id: generateId(),
      email,
      name,
      isPro: false,
      credits: initialCredits,
      referralCode: generateId(),
    };
    
    setUser(newUser);
    storage.setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    storage.clearUser();
  };

  const upgradeToPro = () => {
    if (user) {
      const updatedUser = { ...user, isPro: true };
      setUser(updatedUser);
      storage.setUser(updatedUser);
    }
  };

  const addCredits = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, credits: user.credits + amount };
      setUser(updatedUser);
      storage.setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, upgradeToPro, addCredits }}>
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

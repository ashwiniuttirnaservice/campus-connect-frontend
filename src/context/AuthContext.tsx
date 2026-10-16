"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Student {
  _id: string;
  fullName: string;
  email: string;
  mobileNo: string;
  motherName: string;
  prnNo: string;
  profileImage?: string;
  gender?: string;
  dob?: string;
  age?: number;
  address?: string;
  city?: string;
  pincode?: string;
  currentAddress?: string;
}

interface AuthContextType {
  user: Student | null;
  isLoggedIn: boolean;
  login: (userData: Student) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Student | null>(null);

  const login = (userData: Student) => {
    setUser(userData);
    console.log("Logged in user:", userData);
  };

  const logout = () => {
    setUser(null);
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

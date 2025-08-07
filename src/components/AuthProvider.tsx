import { useState, useEffect, ReactNode, createContext } from "react";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role?: string
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Tworzymy AuthContext jako named export
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      if (!email || !password) throw new Error("Email i hasło są wymagane");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      let role: "student" | "teacher" | "admin" = "student";
      if (email.includes("admin")) role = "admin";
      else if (email.includes("teacher")) role = "teacher";

      const [first, last] = email.split("@")[0].split(".");
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        firstName: first || "User",
        lastName: last || "Name",
        role,
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch {
      throw new Error("Błąd logowania");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string = "student"
  ) => {
    setIsLoading(true);
    try {
      if (!email || !password || !firstName || !lastName)
        throw new Error("Wszystkie pola są wymagane");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        firstName,
        lastName,
        role: role as "student" | "teacher" | "admin",
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } catch {
      throw new Error("Błąd rejestracji");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

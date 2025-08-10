import { useState, useEffect, ReactNode, createContext } from "react";
import { User } from "../types";
import { apiService } from "../services/api";

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
    const token = localStorage.getItem("token");
    if (token) {
      apiService.setToken(token);
      // Verify token and get user data
      apiService.getProfile()
        .then(response => {
          setUser(response.user);
        })
        .catch(() => {
          // Token is invalid, clear it
          apiService.logout();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiService.login({ email, password });
      setUser(response.user);
    } catch (error: any) {
      throw new Error(error.message || "Błąd logowania");
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
      const response = await apiService.register({
        email,
        password,
        firstName,
        lastName,
        role
      });
      setUser(response.user);
    } catch (error: any) {
      throw new Error(error.message || "Błąd rejestracji");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

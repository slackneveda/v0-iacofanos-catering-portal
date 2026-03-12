'use client';

import React, { createContext, useState, useCallback, useEffect } from 'react';

interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, first_name: string, last_name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const USE_MOCK_AUTH = !process.env.NEXT_PUBLIC_API_URL;

// Generate a simple mock JWT token
const generateMockToken = () => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ 
    sub: '1', 
    email: 'preview@example.com',
    iat: Math.floor(Date.now() / 1000)
  }));
  return `${header}.${payload}.signature`;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      setToken(savedToken);
      fetchUser(savedToken);
    }
  }, []);

  const fetchUser = useCallback(async (authToken: string) => {
    try {
      if (USE_MOCK_AUTH) {
        const email = localStorage.getItem('user_email') || 'preview@example.com';
        setUser({
          id: 1,
          email,
          first_name: 'Preview',
          last_name: 'User',
        });
        return;
      }

      const res = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        localStorage.removeItem('auth_token');
        setToken(null);
      }
    } catch (err) {
      console.error('Failed to fetch user:', err);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (USE_MOCK_AUTH) {
        const mockToken = generateMockToken();
        setToken(mockToken);
        setUser({
          id: 1,
          email,
          first_name: 'Preview',
          last_name: 'User',
        });
        localStorage.setItem('auth_token', mockToken);
        localStorage.setItem('user_email', email);
        return;
      }

      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('auth_token', data.token);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string, first_name: string, last_name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (USE_MOCK_AUTH) {
        const mockToken = generateMockToken();
        setToken(mockToken);
        setUser({
          id: 1,
          email,
          first_name,
          last_name,
        });
        localStorage.setItem('auth_token', mockToken);
        localStorage.setItem('user_email', email);
        return;
      }

      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, first_name, last_name }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('auth_token', data.token);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

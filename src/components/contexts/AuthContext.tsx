'use client'
import React, { createContext, useState, useEffect , ReactNode} from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useRouter } from 'next/navigation';

interface User {
    email: string;
    name: string
}
interface AuthContextType{
    user: User | null,
    login: (email: string , password: string) => Promise<void>,
    logOut: ()=>void,
    loading: boolean
}
const AuthContext = createContext<AuthContextType | undefined>( undefined);

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: User = jwtDecode(token);
      setUser(decoded);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      const decoded: User = jwtDecode(token);
      setUser(decoded);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      router.push('/');
    } catch (error) {
      console.error('Login error', error);
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

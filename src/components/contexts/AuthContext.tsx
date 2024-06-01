"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import AxiosInstance from "../hooks/AxiosInstance";
import { toast } from "react-toastify";
interface User {
  email: string;
  name: string;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  registerUser: (
    email: string,
    password: string,
    name: string
  ) => Promise<void>;
  logOut: () => void;
  loading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decode = jwtDecode<User>(token);
        setUser(decode);
        console.log("user decode", decode);
      } catch (error) {
        localStorage.removeItem("access_token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await AxiosInstance.post("/login", {
        email,
        password,
      });
      console.log("login response", response);

      const { access_token, user } = response.data;
      localStorage.setItem("access_token", access_token);
      setUser(user);
      console.log(user);

      toast.success("Login Successful");
      router.push("/");
    } catch (error) {
      console.log(error);

      toast.error("Login Failed. Please try again.");
    }
  };
  const registerUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await AxiosInstance.post("/register", {
        name,
        email,
        password,
      });
      if (response.data.access_token) {
        toast.success("Registration Successful! Redirecting to Login");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };
  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logOut, registerUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

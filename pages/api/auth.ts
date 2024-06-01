import { Login, Register } from "@/lib/type";
import api from "./api";
import { jwtDecode } from "jwt-decode";

export const register = async (userData: Register) => {
  const response = await api.post("/register", userData);
  console.log(" register", response);

  return response.data;
};
export const login = async (credentials: Login) => {
  const response = await api.post("/login", credentials);
  console.log(" login", response);

  const { access_token } = response.data;
  localStorage.setItem("token", access_token);
  return jwtDecode(access_token);
};

export const logOut = () => {
  localStorage.removeItem("token");
};
export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

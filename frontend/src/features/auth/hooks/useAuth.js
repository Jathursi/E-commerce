import { useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/auth.api";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Helper function to check if token is expired (handle base64url)
  const isTokenExpired = (token) => {
    try {
      const base64Url = token.split(".")[1];
      if (!base64Url) return false;
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
      const payload = JSON.parse(atob(padded));
      if (!payload?.exp) return false; // if no exp, assume not expired
      const expiryTime = payload.exp * 1000; // Convert to ms
      return Date.now() >= expiryTime;
    } catch (e) {
      // If parsing fails, do not aggressively log the user out
      return false;
    }
  };

  // Helper function to clear auth data
  const clearAuthData = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
  };

  // Initialize user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    
    if (token && role) {
      // Check if token is expired
      if (isTokenExpired(token)) {
        console.log("Token expired, clearing auth data");
        clearAuthData();
      } else {
        setUser({ role, name, token });
      }
    }
    setLoading(false);
  }, []);

  // Listen for storage changes (e.g., when cleared from DevTools)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const name = localStorage.getItem("name");
      
      if (token && role) {
        // Check if token is expired
        if (isTokenExpired(token)) {
          clearAuthData();
        } else {
          setUser({ role, name, token });
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      setUser({ role: data.role, name: data.name, token: data.token });
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      clearAuthData();
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await registerUser(userData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      setUser({ role: data.role, name: data.name, token: data.token });
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      clearAuthData();
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
  };

  return { login, logout, register, user, loading, error };
};

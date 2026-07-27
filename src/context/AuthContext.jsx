import { createContext, useContext, useState } from "react";

const AUTH_STORAGE_KEY = "gbu_admin_auth";


const DUMMY_ADMIN = {
  email: "admin@gbu.ac.in",
  password: "admin123",
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
 
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(AUTH_STORAGE_KEY) === "true"
  );

  const login = (email, password) => {
    const isValid = email === DUMMY_ADMIN.email && password === DUMMY_ADMIN.password;
    if (isValid) {
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      setIsAuthenticated(true);
    }
    return isValid;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
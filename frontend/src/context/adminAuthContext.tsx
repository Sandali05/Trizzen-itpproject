import axios from "axios";
import { createContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AdminAuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  token: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    axios.post(`${import.meta.env.VITE_API_URL}/api/auth/admin-login`, {
      email: email,
      password: password,
    }).then((response) => {
      setIsLoggedIn(true);
      localStorage.setItem("adminToken", response.data.token);
      setToken(response.data.token);
      navigate("/admindashboard");
    }).catch((error) => {
      console.error("Login failed:", error);
      alert("Invalid email or password");
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem("adminToken");
    navigate("/adminlogin");
  };

  useEffect(() => {
    console.log("Auth Context", isLoggedIn);
 
    if(localStorage.getItem("adminToken")){
      setIsLoggedIn(true);
      setToken(localStorage.getItem("adminToken"));
    }

  }, [isLoggedIn, navigate, token]);

  return (
    <AdminAuthContext.Provider value={{ isLoggedIn, login, logout, token }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export { AdminAuthContext };

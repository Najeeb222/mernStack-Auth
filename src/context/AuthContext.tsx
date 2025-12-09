import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import api from "../libs/api";
import { UserType, AuthContextType } from "../types/auth";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { ROUTES } from "constant";

const AuthUserContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps { children: ReactNode; }

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      try {
        const decoded = jwtDecode<UserType>(storedToken);
        setUser(decoded);
        setToken(storedToken);
      } catch {
        localStorage.removeItem("accessToken");
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = useCallback((accessToken: string, userData: UserType) => {
    localStorage.setItem("accessToken", accessToken);
    setToken(accessToken);
    setUser(userData); // Store full user info
  }, []);


// const logout = useCallback(() => {
//   localStorage.removeItem("accessToken");
//   setToken(null);
//   setUser(null);

 
  

//   api.post("/auth/logout", {}, { withCredentials: true });
// }, []);


const logout = useCallback(async () => {
  try {
   
    await api.post("/auth/logout", {}, { withCredentials: true });
  } catch (error) {
    console.error("Logout error:", error);
  }


  localStorage.removeItem("accessToken");
navigate(ROUTES.LOGIN);
  setToken(null);
  setUser(null);
}, []);

  // Refresh access token
  const refreshToken = useCallback(async () => {
    try {
      const res = await api.get("/auth/refresh-token", { withCredentials: true });
      login(res.data.data.accessToken, res.data.data.user);
    } catch (err) {
      logout();
    }
  }, [login, logout]);

  return (
    <AuthUserContext.Provider value={{ user, token, login, logout, refreshToken, loading }}>
      {children}
    </AuthUserContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthUserContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

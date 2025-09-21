import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import api from '../services/api'; // 1. Usar nossa instância centralizada do Axios

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Este estado é crucial

  // Usamos useCallback para evitar recriar a função em cada renderização
  const checkUserLoggedIn = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // O interceptor no `api.js` adiciona o token automaticamente
        const { data } = await api.get('/auth/me');
        setUser(data.user);
      } catch (error) {
        console.error("Falha na verificação de autenticação, limpando token.");
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkUserLoggedIn();
  }, [checkUserLoggedIn]);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      router.push('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Falha no login.";
      throw new Error(errorMsg);
    }
  };

  const register = async (name, email, password) => {
    try {
      // 2. A API de registro agora retorna o token e o usuário
      const { data } = await api.post('/auth/register', { name, email, password });
      // 3. Autentica o usuário imediatamente após o registro
      localStorage.setItem('token', data.token);
      setUser(data.user);
      router.push('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Falha no cadastro.";
      throw new Error(errorMsg);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  const value = {
    user,
    isAuthenticated: !!user, // 4. Adicionamos um booleano `isAuthenticated`
    loading,
    login,
    register,
    logout
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
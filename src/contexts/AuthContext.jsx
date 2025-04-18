import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when component mounts
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await axios.get('/api/auth/me', { withCredentials: true });
        if (res.data.success) {
          setCurrentUser(res.data.user);
        }
      } catch (error) {
        console.error('Not authenticated', error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register a new user
  const register = async (userData) => {
    const res = await axios.post('/api/auth/register', userData, { withCredentials: true });
    if (res.data.success) {
      setCurrentUser(res.data.user);
    }
    return res.data;
  };

  // Login user
  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
    if (res.data.success) {
      setCurrentUser(res.data.user);
    }
    return res.data;
  };

  // Logout user
  const logout = async () => {
    await axios.post('/api/auth/logout', {}, { withCredentials: true });
    setCurrentUser(null);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    const res = await axios.put('/api/auth/profile', userData, { withCredentials: true });
    if (res.data.success) {
      setCurrentUser({
        ...currentUser,
        ...res.data.user
      });
    }
    return res.data;
  };

  // Handle forgot password
  const forgotPassword = async (email) => {
    const res = await axios.post('/api/auth/forgot-password', { email });
    return res.data;
  };

  // Reset password
  const resetPassword = async (token, newPassword) => {
    const res = await axios.post('/api/auth/reset-password', { token, newPassword });
    return res.data;
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout,
    updateProfile,
    forgotPassword,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
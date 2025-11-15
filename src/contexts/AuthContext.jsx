// import { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const Backend_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Check if user is logged in when component mounts
//   useEffect(() => {
//     const checkLoggedIn = async () => {
//       try {
//         const res = await axios.get(`${Backend_URL}/api/auth/me`, { withCredentials: true });
//         if (res.data.success) {
//           setCurrentUser(res.data.user);
//         }
//       } catch (error) {
//         console.error('Not authenticated', error);
//         setCurrentUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkLoggedIn();
//   }, []);

//   // Register a new user
//   const register = async (userData) => {
//     const res = await axios.post(`${Backend_URL}/api/auth/register`, userData, { withCredentials: true });
//     if (res.data.success) {
//       setCurrentUser(res.data.user);
//     }
//     return res.data;
//   };

//   // Login user
//   const login = async (email, password) => {
//     const res = await axios.post(`${Backend_URL}/api/auth/login`, { email, password }, { withCredentials: true });
//     if (res.data.success) {
//       setCurrentUser(res.data.user);
//       toast.success(`Welcome back, ${res.data.user.name}!`);
//     }
//     return res.data;
//   };

//   // Logout user
//   const logout = async () => {
//     await axios.post(`${Backend_URL}/api/auth/logout`, {}, { withCredentials: true });
//     setCurrentUser(null);
//     toast.success('Logged out successfully!');
//   };

//   // Update user profile
//   const updateProfile = async (userData) => {
//     const res = await axios.put(`${Backend_URL}/api/auth/profile`, userData, { withCredentials: true });
//     if (res.data.success) {
//       setCurrentUser({
//         ...currentUser,
//         ...res.data.user
//       });
//     }
//     return res.data;
//   };

//   // Handle forgot password
//   const forgotPassword = async (email) => {
//     const res = await axios.post(`${Backend_URL}/api/auth/forgot-password`, { email });
//     return res.data;
//   };

//   // Reset password
//   const resetPassword = async (token, newPassword) => {
//     const res = await axios.post(`${Backend_URL}/api/auth/reset-password`, { token, newPassword });
//     return res.data;
//   };

//   const value = {
//     currentUser,
//     loading,
//     register,
//     login,
//     logout,
//     updateProfile,
//     forgotPassword,
//     resetPassword
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;


import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Backend_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// 🔁 Generic retry wrapper
const retryRequest = async (fn, retries = 3, delay = 1000) => {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay)); // wait before retry
      }
    }
  }
  throw lastError;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when component mounts
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await retryRequest(() =>
          axios.get(`${Backend_URL}/api/auth/me`, { withCredentials: true })
        );
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
    try {
      const res = await retryRequest(() =>
        axios.post(`${Backend_URL}/api/auth/register`, userData, { withCredentials: true })
      );
      if (res.data.success) {
        setCurrentUser(res.data.user);
      }
      return res.data;
    } catch (error) {
      toast.error('Server error. Please try again later.');
      throw error;
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const res = await retryRequest(() =>
        axios.post(`${Backend_URL}/api/auth/login`, { email, password }, { withCredentials: true })
      );
      if (res.data.success) {
        setCurrentUser(res.data.user);
        toast.success(`Welcome back, ${res.data.user.name}!`);
      }
      return res.data;
    } catch (error) {
      toast.error('Server error. Please try again later.');
      throw error;
    }
  };

  // Logout user
  const logout = async () => {
    await axios.post(`${Backend_URL}/api/auth/logout`, {}, { withCredentials: true });
    setCurrentUser(null);
    toast.success('Logged out successfully!');
  };

  // Update user profile
  const updateProfile = async (userData) => {
    const res = await retryRequest(() =>
      axios.put(`${Backend_URL}/api/auth/profile`, userData, { withCredentials: true })
    );
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
    const res = await retryRequest(() =>
      axios.post(`${Backend_URL}/api/auth/forgot-password`, { email })
    );
    return res.data;
  };

  // Reset password
  const resetPassword = async (token, newPassword) => {
    const res = await retryRequest(() =>
      axios.post(`${Backend_URL}/api/auth/reset-password`, { token, newPassword })
    );
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
1
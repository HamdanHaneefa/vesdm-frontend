import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch current user from backend on mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('vesdm_token');
        if (!token) {
          setLoading(false);
          return;
        }

        // Check if this is a student token
        if (token.startsWith('student_')) {
          // For student tokens, check if we already have user data stored
          const storedUser = localStorage.getItem('vesdm_user');
          if (storedUser) {
            try {
              const userData = JSON.parse(storedUser);
              setUser(userData);
            } catch (e) {
              // If stored data is invalid, create minimal student user
              const studentId = token.split('_')[1];
              const studentUser = {
                id: studentId,
                _id: studentId,
                role: 'student',
              };
              setUser(studentUser);
            }
          } else {
            // No stored user data, create minimal student user
            const studentId = token.split('_')[1];
            const studentUser = {
              id: studentId,
              _id: studentId,
              role: 'student',
            };
            setUser(studentUser);
          }
        } else {
          // Regular user token - verify with backend
          const response = await apiClient.get('/auth/me');
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        // Invalid token, clear it
        localStorage.removeItem('vesdm_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Periodically verify user with backend (every 5 minutes)
  useEffect(() => {
    if (!user) return;

    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('vesdm_token');
        
        // Skip verification for student tokens
        if (token && token.startsWith('student_')) {
          return; // Student tokens don't need periodic verification
        }

        const response = await apiClient.get('/auth/me');
        const backendUser = response.data.user;
        
        // Check if role changed in backend
        if (backendUser.role !== user.role) {
          console.warn('User role changed in backend. Logging out...');
          // Role changed - force logout with message
          setUser(null);
          localStorage.removeItem('vesdm_token');
          localStorage.setItem('vesdm_role_changed', 'true');
          navigate('/login', { replace: true });
          return;
        }
        
        // Update user data (in case name/email changed)
        setUser(backendUser);
      } catch (error) {
        console.error('Token verification failed:', error);
        // Token invalid, logout - but only for non-student tokens
        const token = localStorage.getItem('vesdm_token');
        if (!token || !token.startsWith('student_')) {
          logout();
        }
      }
    };

    // Check every 5 minutes
    const interval = setInterval(verifyUser, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user, navigate]);

  const login = (token, userData) => {
    // Store ONLY the token in localStorage
    localStorage.setItem('vesdm_token', token);
    
    // For student tokens, also store user data in localStorage
    if (token.startsWith('student_')) {
      localStorage.setItem('vesdm_user', JSON.stringify(userData));
    }
    
    // Store user data in memory (React state)
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vesdm_token');
    localStorage.removeItem('vesdm_user'); // Also remove stored user data
    navigate('/login', { replace: true });
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const hasRole = (allowedRoles) => {
    if (!user) return false;
    if (Array.isArray(allowedRoles)) {
      return allowedRoles.includes(user.role);
    }
    return user.role === allowedRoles;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

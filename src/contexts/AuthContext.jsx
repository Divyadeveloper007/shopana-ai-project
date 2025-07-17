// import React, { createContext, useContext, useEffect, useState } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate checking for existing session
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setLoading(false);
//   }, []);

//   const signup = async (email, password, name, businessData) => {
//     // Simulate API call
//     const userData = {
//       id: Date.now(),
//       email,
//       displayName: name,
//       businessName: businessData?.businessName,
//       businessType: businessData?.businessType,
//       photoURL: null
//     };
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//     return userData;
//   };

//   const login = async (email, password) => {
//     // Simulate API call
//     const userData = {
//       id: Date.now(),
//       email,
//       displayName: 'Demo User',
//       photoURL: null
//     };
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//     return userData;
//   };

//   const loginWithGoogle = async () => {
//     // Simulate Google OAuth
//     const userData = {
//       id: Date.now(),
//       email: 'demo@google.com',
//       displayName: 'Google User',
//       photoURL: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
//     };
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//     return userData;
//   };

//   const logout = async () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   const value = {
//     user,
//     signup,
//     login,
//     loginWithGoogle,
//     logout,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
// contexts/AuthContext.jsx
// contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('user_email');
    const user_id = localStorage.getItem('user_id');
    const role = localStorage.getItem('role');
    const verified = localStorage.getItem('verified');

    if (token) {
      setCurrentUser({ token, email, user_id, role, verified });
    } else {
      const mockUser = JSON.parse(localStorage.getItem('mockUser'));
      if (mockUser) {
        setCurrentUser(mockUser);
      }
    }
  }, []);

  // Login using existing userData (your existing method)
  const login = (userData) => {
    setCurrentUser(userData);
    // Optional: Save to localStorage
    if (userData?.email) {
      localStorage.setItem('mockUser', JSON.stringify(userData));
    }
  };

  // Login with email/password like in reference
  const loginWithCredentials = async (email, password) => {
    const stored = JSON.parse(localStorage.getItem('mockUser'));
    if (stored?.email === email) {
      setCurrentUser(stored);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (email, password, name) => {
    const user = { email, name };
    localStorage.setItem('mockUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  const loginWithGoogle = async () => {
    const user = { email: 'google@example.com', name: 'Google User' };
    localStorage.setItem('mockUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        signup,
        loginWithCredentials,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

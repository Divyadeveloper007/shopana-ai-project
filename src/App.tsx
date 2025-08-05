import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./authforms/AuthPage";
import Dashboard from "./layout/Dashboard";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/dashboard/post" /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={<AuthPage onLoginSuccess={() => setIsLoggedIn(true)} />} 
        />
        <Route 
          path="/dashboard/*" 
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};
export default App;
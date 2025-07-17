import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BrandProvider } from './contexts/BrandContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { ChatProvider } from './contexts/ChatContext';
import AuthPage from './authforms/AuthPage';
import Dashboard from './components/Dashboard';
import BrandSetup from './components/BrandSetup';
import CreateProject from './components/CreateProject';
import AssetManager from './components/AssetManager';
import Templates from './components/templates/Templates';
import Integrations from './components/Integrations';
import ProtectedRoute from './components/ProtectedRoute';
import PromptGenerator from './components/prompt/PromptGenerator'
import AIImageGeneration from './components/prompt/AIImageGeneration'
import ProfilePage from '../src/user/ProfilePage'

function App() {
  return (
    <AuthProvider>
      <ChatProvider>

      <BrandProvider>
        <ProjectProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/brand-setup" element={
                  <ProtectedRoute>
                    <BrandSetup />
                  </ProtectedRoute>
                } />
                <Route path="/create" element={
                  <ProtectedRoute>
                    <CreateProject />
                  </ProtectedRoute>
                } />
                <Route path="/assets" element={
                  <ProtectedRoute>
                    <AssetManager />
                  </ProtectedRoute>
                } />
                <Route path="/templates" element={
                  <ProtectedRoute>
                    <Templates />
                  </ProtectedRoute>
                } />
                <Route path="/integrations" element={
                  <ProtectedRoute>
                    <Integrations />
                  </ProtectedRoute>
                } />
                <Route path="/create-prompt" element={
                  <ProtectedRoute>
                    <PromptGenerator />
                 </ProtectedRoute>
                } />
                <Route path="/image-gererate" element={
                  <ProtectedRoute>
                    <AIImageGeneration />
                  </ProtectedRoute>
                } />
             
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </Router>
        </ProjectProvider>
      </BrandProvider>
     </ChatProvider>
    </AuthProvider>
  );
}

export default App;
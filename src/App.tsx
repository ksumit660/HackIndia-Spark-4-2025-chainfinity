// Import necessary dependencies from React and other libraries
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Menu, X, Home, Settings, Users, HelpCircle, LogIn } from 'lucide-react';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { VideoBackground } from './components/VideoBackground';

/**
 * Main Application Component
 * Handles routing, authentication, and main layout structure
 */
function App() {
  // State management for sidebar, user authentication, and loading
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /**
   * Toggle sidebar visibility
   */
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  /**
   * Navigate to home page and close sidebar
   */
  const handleHomeClick = () => {
    navigate('/');
    setIsSidebarOpen(false);
  };

  /**
   * Navigate to login page and close sidebar
   */
  const handleLoginClick = () => {
    navigate('/login');
    setIsSidebarOpen(false);
  };

  /**
   * Handle user sign out
   * Logs out user and redirects to login page
   */
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/login');
      setIsSidebarOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  /**
   * Effect hook to handle authentication state changes
   * Sets up and cleans up auth state listener
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Loading state display
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex relative">
      {/* Sidebar Component
          Contains navigation links and auth actions
          Uses glass effect styling */}
      <div className={`sidebar fixed h-full w-64 glass-effect z-50 flex flex-col ${isSidebarOpen ? '' : 'closed'}`}>
        {/* Close button */}
        <button 
          onClick={toggleSidebar}
          className="absolute right-4 top-4 text-white hover:text-gray-300"
        >
          <X size={24} />
        </button>
        
        {/* Sidebar navigation items */}
        <div className="p-6 flex flex-col h-full">
          {/* Navigation menu items */}
          <div className="space-y-8 mt-12">
            {/* Individual menu items */}
            <div 
              onClick={handleHomeClick}
              className="flex items-center space-x-3 text-white hover:text-gray-300 cursor-pointer"
            >
              <Home size={20} />
              <span>Home</span>
            </div>
            <div className="flex items-center space-x-3 text-white hover:text-gray-300 cursor-pointer">
              <Users size={20} />
              <span>About Us</span>
            </div>
            <div className="flex items-center space-x-3 text-white hover:text-gray-300 cursor-pointer">
              <Settings size={20} />
              <span>Services</span>
            </div>
            <div className="flex items-center space-x-3 text-white hover:text-gray-300 cursor-pointer">
              <HelpCircle size={20} />
              <span>Help</span>
            </div>
          </div>
          
          {/* Authentication button (Login/Logout) */}
          <button 
            onClick={user ? handleSignOut : handleLoginClick}
            className="mt-auto mb-6 glass-effect py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-white/10 transition-colors"
          >
            <LogIn size={20} />
            <span>{user ? 'Logout' : 'Login'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Sidebar toggle button */}
        <button 
          onClick={toggleSidebar}
          className="fixed top-6 left-6 z-40 glass-effect p-3 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Application Routes
            Handles authentication-based routing and redirects */}
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          
          {/* Landing Page Route */}
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
              {/* Video Background Component */}
              <VideoBackground />
              
              {/* Landing Page Content */}
              <div className="max-w-2xl mx-auto relative z-10">
                {/* App Title */}
                <h1 className="text-7xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-3d">
                  DocuAI
                </h1>
                
                {/* App Description */}
                <p className="text-xl text-gray-300 mb-8">
                  Smart Document Search & Retrieval
                </p>
              
                {/* Call-to-Action Buttons */}
                <div className="flex space-x-4 justify-center mt-12">
                  <button className="glass-effect px-8 py-3 rounded-lg text-lg button-3d bg-gradient-to-r from-blue-400/20 to-purple-500/20">
                    Explore
                  </button>
                  <button 
                    onClick={() => navigate('/register')}
                    className="glass-effect px-8 py-3 rounded-lg text-lg button-3d bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
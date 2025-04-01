// Import necessary dependencies from React and other libraries
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Menu, X, Home, Settings, Users, HelpCircle, LogIn } from 'lucide-react';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { VideoBackground } from './components/VideoBackground';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Help } from './pages/Help';

// Separate AppContent component to handle navigation
const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Move all the handlers and effects here
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleHomeClick = () => {
    navigate('/');
    setIsSidebarOpen(false);
  };
  const handleLoginClick = () => {
    navigate('/login');
    setIsSidebarOpen(false);
  };
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/login');
      setIsSidebarOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAboutClick = () => {
    navigate('/about');
    setIsSidebarOpen(false);
  };

  const handleServicesClick = () => {
    navigate('/services');
    setIsSidebarOpen(false);
  };

  const handleHelpClick = () => {
    navigate('/help');
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full">
      <div className={`sidebar fixed h-full w-64 glass-effect z-50 flex flex-col ${isSidebarOpen ? '' : 'translate-x-[-100%]'}`}>
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
            <div 
              onClick={handleAboutClick}
              className="flex items-center space-x-3 text-white hover:text-gray-300 cursor-pointer"
            >
              <Users size={20} />
              <span>About Us</span>
            </div>
            <div 
              onClick={handleServicesClick}
              className="flex items-center space-x-3 text-white hover:text-gray-300 cursor-pointer"
            >
              <Settings size={20} />
              <span>Services</span>
            </div>
            <div 
              onClick={handleHelpClick}
              className="flex items-center space-x-3 text-white hover:text-gray-300 cursor-pointer"
            >
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

      <main className="w-full min-h-screen relative">
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
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/help" element={<Help />} />
          
          {/* Landing Page Route */}
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center relative">
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
      </main>
    </div>
  );
};

// Simplified App component
function App() {
  return <AppContent />;
}

export default App;
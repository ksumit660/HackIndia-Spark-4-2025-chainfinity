/**
 * Register Page Component
 * Renders the registration form with video background
 * Uses AuthForm component for user registration
 */
import React from 'react';
import { AuthForm } from '../components/AuthForm';
import { VideoBackground } from '../components/VideoBackground';

export const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <VideoBackground />
      <div className="backdrop-blur-lg bg-white/10 p-8 rounded-xl shadow-lg border border-white/20 w-full max-w-md">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-3d">
            Create Account
          </h2>
          <AuthForm isLogin={false} />
        </div>
      </div>
    </div>
  );
};
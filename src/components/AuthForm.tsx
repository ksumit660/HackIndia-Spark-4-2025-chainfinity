import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Chrome } from 'lucide-react';

interface AuthFormProps {
  isLogin?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin = true }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getErrorMessage = (error: any): string => {
    const errorCode = error?.code || '';
    const errorMessage = error?.message || '';
    console.log('Auth Error Details:', { errorCode, errorMessage });

    switch (errorCode) {
      case 'auth/operation-not-allowed':
        return 'Email/password sign-in is not enabled. Please contact support.';
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please try logging in.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/user-not-found':
        return 'No account found with this email. Please sign up.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-credential':
      case 'auth/invalid-login-credentials':
        return 'Invalid email or password. Please check your credentials.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        if (errorMessage.includes('auth/')) {
          return 'Authentication failed. Please check your credentials.';
        }
        console.error('Firebase auth error:', errorCode);
        return 'An error occurred. Please try again.';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (result.user) {
          await updateProfile(result.user, {
            displayName: name.trim()
          });
        }
      }
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(getErrorMessage(err));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      if (!isLogin && !name) {
        setError('Please enter your name before continuing with Google');
        return;
      }
      const result = await signInWithPopup(auth, googleProvider);
      if (!isLogin) {
        await updateProfile(result.user, {
          displayName: name
        });
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(getErrorMessage(err.code));
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg glass-effect text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Full Name"
              required={!isLogin}
            />
          </div>
        )}
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg glass-effect text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Email address"
              required
            />
          </div>
        </div>
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg glass-effect text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Password"
              required
            />
          </div>
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full glass-effect px-8 py-3 rounded-lg text-lg button-3d bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 flex items-center justify-center gap-2"
        >
          {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={20} />
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between">
        <hr className="w-full border-gray-600" />
        <span className="px-4 text-gray-400">or</span>
        <hr className="w-full border-gray-600" />
      </div>

      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="mt-6 w-full glass-effect px-8 py-3 rounded-lg text-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
      >
        <Chrome size={20} />
        Continue with Google
      </button>

      <p className="mt-4 text-center text-gray-400">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => navigate(isLogin ? '/register' : '/login')}
          className="text-purple-400 hover:text-purple-300"
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </div>
  );
};
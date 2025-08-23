'use client';

import { useState, useEffect, useRef } from 'react';
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle, ChevronDown, MousePointer2, ArrowDown } from 'lucide-react';

interface SignUpViewPageProps {
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export default function SignUpViewPage({
  isDark = false,
  onToggleTheme
}: SignUpViewPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Check if content needs scrolling
  useEffect(() => {
    const checkScrollNeeded = () => {
      if (contentRef.current) {
        const { scrollHeight, clientHeight } = contentRef.current;
        const needsScroll = scrollHeight > clientHeight;
        setShowScrollArrow(needsScroll);
        
        // Also check initial scroll position
        if (contentRef.current.scrollTop === 0) {
          setIsAtBottom(false);
        }
      }
    };

    checkScrollNeeded();
    window.addEventListener('resize', checkScrollNeeded);
    
    // Check again after a short delay to ensure content is fully rendered
    const timer = setTimeout(checkScrollNeeded, 100);
    
    return () => {
      window.removeEventListener('resize', checkScrollNeeded);
      clearTimeout(timer);
    };
  }, []);

  // Handle scroll events
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    
    // Check if at bottom (with a small threshold for better UX)
    const threshold = 5;
    const atBottom = scrollTop + clientHeight >= scrollHeight - threshold;
    setIsAtBottom(atBottom);
    
    // Show scroll arrow when not at bottom
    setShowScrollArrow(!atBottom);
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      const clientHeight = contentRef.current.clientHeight;
      
      contentRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
      
      // Update state after scrolling
      setTimeout(() => {
        setIsAtBottom(true);
        setShowScrollArrow(false);
      }, 500);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect or show success as needed
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = [
    { text: 'At least 6 characters', met: password.length >= 6 },
    { text: 'Contains letters and numbers', met: /[a-zA-Z]/.test(password) && /[0-9]/.test(password) },
    { text: 'Strong password', met: password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password) }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Left side - Brand & Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex-col justify-between p-8 lg:p-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(232,132,12),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgb(232,132,12),transparent_50%)]"></div>
        </div>
        
        {/* Logo */}
        <div className="relative z-10">
          <Image
            src="/assets/sheetswaylogo.png"
            alt="SheetSway Logo"
            width={200}
            height={50}
            priority
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Join <span className="text-[rgb(232,132,12)]">SheetSway</span> Reseller Portal
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Become a trusted partner and unlock exclusive reseller benefits with our comprehensive platform.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-[rgb(232,132,12)]" />
              <span className="text-gray-300">Exclusive reseller pricing</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-[rgb(232,132,12)]" />
              <span className="text-gray-300">Dedicated support team</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-[rgb(232,132,12)]" />
              <span className="text-gray-300">Marketing materials & tools</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-[rgb(232,132,12)]" />
              <span className="text-gray-300">Performance-based commissions</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-[rgb(232,132,12)]" />
              <span className="text-gray-300">Early access to new features</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-sm text-gray-400">
          © 2024 SheetSway. All rights reserved.
        </div>
      </div>

      {/* Right side - Sign Up Form with Scrollable Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
        <div 
          ref={contentRef}
          className="w-full max-w-md space-y-8 max-h-[90vh] pr-2 relative overflow-y-auto scrollbar-hide"
          onScroll={handleScroll}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Image
              src="/assets/sheetswaylogo.png"
              alt="SheetSway Logo"
              width={180}
              height={45}
              priority
              className="object-contain"
            />
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Reseller Registration</h1>
            <p className="text-gray-600">Join our network of trusted reseller partners</p>
          </div>

  

          {/* Form */}
          <form onSubmit={handleSignUp} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Business Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your business email"
                  className="pl-10 h-12 border-gray-300 focus:border-[rgb(232,132,12)] focus:ring-[rgb(232,132,12)] focus:ring-2 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-[rgb(232,132,12)] focus:ring-[rgb(232,132,12)] focus:ring-2 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Requirements */}
              <div className="space-y-2 mt-3">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${req.met ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={`text-xs ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-[rgb(232,132,12)] focus:ring-[rgb(232,132,12)] focus:ring-2 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-1 text-[rgb(232,132,12)] border-gray-300 rounded focus:ring-[rgb(232,132,12)] focus:ring-2"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <Link
                  href="/terms"
                  className="text-[rgb(232,132,12)] hover:text-[rgb(200,100,8)] font-medium"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="text-[rgb(232,132,12)] hover:text-[rgb(200,100,8)] font-medium"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Reseller Agreement */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="reseller"
                className="w-4 h-4 mt-1 text-[rgb(232,132,12)] border-gray-300 rounded focus:ring-[rgb(232,132,12)] focus:ring-2"
                required
              />
              <label htmlFor="reseller" className="text-sm text-gray-600">
                I agree to the{' '}
                <Link
                  href="/reseller-agreement"
                  className="text-[rgb(232,132,12)] hover:text-[rgb(200,100,8)] font-medium"
                >
                  Reseller Agreement
                </Link>{' '}
                and understand the terms of partnership
              </label>
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[rgb(232,132,12)] hover:bg-[rgb(200,100,8)] text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-[rgb(232,132,12)] focus:ring-opacity-20"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Create Reseller Account</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Sign Up */}
          <Button
            onClick={handleGoogleSignUp}
            disabled={loading}
            variant="outline"
            className="w-full h-12 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have a reseller account?{' '}
              <Link
                href="/auth/sign-in"
                className="text-[rgb(232,132,12)] hover:text-[rgb(200,100,8)] font-semibold transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

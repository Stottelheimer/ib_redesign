'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const bgImage = '/36e215215297baf56b28a632dceb399ed20e4528.png';
const logoImage = '/ee7803bdce1fac320f359215c1cab9d7ea0d079e.png';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Login attempt:', { email, password, rememberMe });
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Section - Image and Text (Hidden on Mobile) */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Dark overlay for text visibility */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Logo */}
        <div className="absolute top-8 left-8 z-10">
          <div className="w-24 h-16 bg-blue-900 rounded flex items-center justify-center">
            <img src={logoImage} alt="idealo business" className="w-full h-full object-contain p-2" />
          </div>
        </div>

        {/* Bottom Text - Fixed positioning with flexbox container */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-8 h-1/3">
          <div className="space-y-4">
            <blockquote className="text-2xl font-semibold text-white leading-tight">
              <p>"Everything we need to run</p>
              <p>our business"</p>
            </blockquote>
            <div className="text-white/90">
              <p className="font-medium">Sabine Musterfrau</p>
              <p className="text-sm">Head of sales at idealo-store.de</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-12">
        <div className="max-w-sm mx-auto w-full space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-slate-900">Welcome back to idealo business</h1>
            <p className="text-base text-slate-600">Bitte geben Sie Ihre Anmeldedaten ein</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <Input
                type="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Forgot Password Link */}
            <button
              type="button"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Forgot password?
            </button>

            {/* Remember Me */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-slate-700 cursor-pointer">
                Remember Log in details?
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-full transition-colors"
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-slate-600">Don't have an account?</span>
            <button className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

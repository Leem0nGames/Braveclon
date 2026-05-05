'use client';

import { useState } from 'react';
import { signUp, signIn, signOut, getCurrentUser, AuthUser } from '@/lib/auth';
import { Button } from '@/components/ui/Button';

interface AuthScreenProps {
  onLogin: (userId: string) => void;
  onSkip: () => void;
}

export default function AuthScreen({ onLogin, onSkip }: AuthScreenProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'register') {
        if (!username.trim()) {
          setError('Username is required');
          setLoading(false);
          return;
        }
        const result = await signUp(email, password, username);
        if (result.error) {
          setError(result.error);
        } else {
          onLogin(result.user!.id);
        }
      } else {
        const result = await signIn(email, password);
        if (result.error) {
          setError(result.error);
        } else {
          onLogin(result.user!.id);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }

    setLoading(false);
  };

  const handleGuest = async () => {
    const user = await getCurrentUser();
    if (user) {
      onLogin(user.id);
    } else {
      onSkip();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl font-black italic mb-2">⚔️</div>
          <h1 className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-amber-300 to-orange-600">
            BRAVE<br/>FRONTIER
          </h1>
          <p className="text-zinc-400 mt-2">Cloud Save</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label htmlFor="username" className="block text-xs text-zinc-400 mb-1">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-xs text-zinc-400 mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs text-zinc-400 mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:border-amber-500 focus:outline-none"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
            className="w-full py-3 rounded-xl"
          >
            {mode === 'register' ? 'Create Account' : 'Sign In'}
          </Button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-zinc-400 hover:text-amber-400 text-sm"
            aria-label={mode === 'login' ? "Switch to registration" : "Switch to login"}
          >
            {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        {/* Skip */}
        <div className="mt-8 text-center">
          <button
            onClick={onSkip}
            className="text-zinc-500 hover:text-zinc-300 text-sm"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
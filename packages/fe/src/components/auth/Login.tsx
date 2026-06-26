import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { login, register, storeUser } from '../../api/auth';

export default function Login() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'register') {
        await register(username, email, password);
      }
      const user = await login(email, password);
      storeUser(user);
      setCurrentUser(user);
      navigate('/');
    } catch {
      setError(mode === 'register' ? 'Registration failed. Email may already exist.' : 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden" style={{
      backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(77,142,255,0.03) 0%, transparent 60%), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
      backgroundSize: '100% 100%, 40px 40px, 40px 40px',
    }}>
      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter h-[60px] bg-surface/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="text-headline-md font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          WatchDog
        </div>
        <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-mono text-label-caps flex items-center gap-2">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>help</span>
          Support
        </a>
      </header>

      {/* Main card */}
      <main className="flex-grow flex items-center justify-center p-gutter mt-[60px] relative z-10">
        <div className="relative w-full max-w-md rounded-xl p-stack-lg overflow-hidden" style={{
          background: 'rgba(42,42,42,0.6)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(66,71,84,0.2)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        }}>
          {/* Gradient orb */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary-container rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center mb-stack-lg">
              <h1 className="text-headline-lg font-semibold text-on-surface mb-stack-xs">
                {mode === 'login' ? 'Access Mission Control' : 'Initialize New Node'}
              </h1>
              <p className="text-body-md text-on-surface-variant">
                {mode === 'login' ? 'Log in to monitor your API infrastructure.' : 'Create your WatchDog account.'}
              </p>
            </div>

            {error && (
              <div className="mb-stack-md px-3 py-2 rounded-lg bg-error-container/20 border border-error/30 text-error font-mono text-code-md">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-stack-md">
              {mode === 'register' && (
                <div className="space-y-1">
                  <label className="font-mono text-label-caps text-on-surface-variant ml-1" htmlFor="username">Username</label>
                  <div className="flex items-center px-3 py-2 rounded-lg" style={{ background: '#1b1c1c', border: '1px solid rgba(66,71,84,0.3)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}>
                    <span className="material-symbols-outlined text-outline mr-2" style={{ fontSize: 18 }}>badge</span>
                    <input
                      id="username" type="text" value={username} onChange={e => setUsername(e.target.value)}
                      placeholder="dev_operator" required
                      className="bg-transparent border-none outline-none text-on-surface font-mono text-code-md w-full placeholder:text-outline-variant/50"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="font-mono text-label-caps text-on-surface-variant ml-1" htmlFor="email">Work Email</label>
                <div className="flex items-center px-3 py-2 rounded-lg" style={{ background: '#1b1c1c', border: '1px solid rgba(66,71,84,0.3)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}>
                  <span className="material-symbols-outlined text-outline mr-2" style={{ fontSize: 18 }}>mail</span>
                  <input
                    id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="sysadmin@company.com" required
                    className="bg-transparent border-none outline-none text-on-surface font-mono text-code-md w-full placeholder:text-outline-variant/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center ml-1">
                  <label className="font-mono text-label-caps text-on-surface-variant" htmlFor="password">Password</label>
                  {mode === 'login' && (
                    <a href="#" className="font-mono text-label-caps text-primary hover:text-primary-fixed transition-colors">Forgot?</a>
                  )}
                </div>
                <div className="flex items-center px-3 py-2 rounded-lg" style={{ background: '#1b1c1c', border: '1px solid rgba(66,71,84,0.3)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}>
                  <span className="material-symbols-outlined text-outline mr-2" style={{ fontSize: 18 }}>key</span>
                  <input
                    id="password" type={showPassword ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••" required minLength={4}
                    className="bg-transparent border-none outline-none text-on-surface font-mono text-code-md w-full placeholder:text-outline-variant/50"
                  />
                  <button type="button" onClick={() => setShowPassword(p => !p)} className="text-outline-variant hover:text-on-surface transition-colors ml-2">
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full py-3 rounded-lg text-white font-mono text-label-caps flex items-center justify-center gap-2 shadow-lg transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                style={{ background: 'linear-gradient(90deg, #4d8eff, #571bc1)' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                  {mode === 'login' ? 'login' : 'person_add'}
                </span>
                {loading ? 'Processing...' : mode === 'login' ? 'Secure Login' : 'Create Account'}
              </button>
            </form>

            <div className="mt-stack-lg text-center">
              <p className="text-body-sm text-on-surface-variant">
                {mode === 'login' ? 'Need an account? ' : 'Already deployed? '}
                <button
                  type="button" onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError(''); }}
                  className="text-primary hover:text-primary-fixed font-bold transition-colors"
                >
                  {mode === 'login' ? 'Register Node' : 'Login Here'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

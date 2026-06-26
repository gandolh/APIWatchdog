import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { clearUser } from '../../api/auth';
import AddAppModal from './AddAppModal';
import SettingsModal from './SettingsModal';

interface NavItem {
  label: string;
  icon: string;
  to: string;
}

const publicItems: NavItem[] = [
  { label: 'All Apps', icon: 'dashboard', to: '/' },
];

const authItems: NavItem[] = [
  { label: 'My Apps', icon: 'monitor_heart', to: '/devdash' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [addAppOpen, setAddAppOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const navItems = currentUser ? [...publicItems, ...authItems] : publicItems;

  const handleLogout = () => {
    clearUser();
    setCurrentUser(null);
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-stack-md px-stack-sm">
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 mb-8">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #adc6ff, #d0bcff)' }}>
          <span className="material-symbols-outlined text-surface" style={{ fontSize: 18 }}>visibility</span>
        </div>
        <div>
          <div className="font-bold text-headline-md bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary leading-none">
            WatchDog
          </div>
          <p className="font-mono text-label-caps text-on-surface-variant mt-0.5 leading-none tracking-widest uppercase">
            API Monitoring
          </p>
        </div>
      </div>

      {/* Add App button */}
      {currentUser && (
        <button
          onClick={() => { setAddAppOpen(true); setMobileOpen(false); }}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-mono text-label-caps hover:opacity-90 transition-opacity mb-6"
          style={{ background: 'linear-gradient(90deg, #4d8eff, #571bc1)', color: '#00285d' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
          Add New App
        </button>
      )}

      {/* Nav links */}
      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map(item => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-mono text-label-caps transition-all duration-150 ${
                active
                  ? 'bg-secondary-container text-on-secondary-container font-bold'
                  : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-primary'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${active ? 'icon-fill' : ''}`}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div className="mt-auto flex flex-col gap-1 pt-4 border-t border-outline-variant/10">
        <button
          onClick={() => { setSettingsOpen(true); setMobileOpen(false); }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-mono text-label-caps text-on-surface-variant hover:bg-surface-variant/50 hover:text-primary transition-all duration-150 w-full"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span>Settings</span>
        </button>

        {currentUser ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-mono text-label-caps text-on-surface-variant hover:bg-surface-variant/50 hover:text-error transition-all duration-150 w-full"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Logout</span>
          </button>
        ) : (
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-mono text-label-caps text-primary hover:bg-surface-variant/50 transition-all duration-150"
          >
            <span className="material-symbols-outlined text-[20px]">login</span>
            <span>Login</span>
          </Link>
        )}

        {currentUser && (
          <div className="px-3 py-2 mt-1">
            <p className="font-mono text-label-caps text-on-surface-variant truncate">{currentUser.email}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="fixed left-0 top-0 h-full w-[240px] hidden md:flex flex-col bg-surface-container-lowest border-r border-outline-variant/10 z-40">
        <SidebarContent />
      </nav>

      {/* Mobile top bar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter h-[60px] bg-surface border-b border-outline-variant/10 md:hidden">
        <div className="font-bold text-headline-md bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          WatchDog
        </div>
        <div className="flex items-center gap-3">
          {currentUser ? (
            <button onClick={() => setAddAppOpen(true)} className="font-mono text-label-caps text-tertiary-container">
              <span className="material-symbols-outlined">add</span>
            </button>
          ) : (
            <Link to="/login" className="font-mono text-label-caps text-primary">Login</Link>
          )}
          <button onClick={() => setMobileOpen(true)} className="text-on-surface-variant">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/60 md:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-[280px] z-50 bg-surface-container-lowest md:hidden">
            <div className="flex justify-end p-3">
              <button onClick={() => setMobileOpen(false)} className="text-on-surface-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <SidebarContent />
          </div>
        </>
      )}

      <AddAppModal open={addAppOpen} onClose={() => setAddAppOpen(false)} />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}

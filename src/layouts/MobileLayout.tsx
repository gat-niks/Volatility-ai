import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, Activity, Calculator, User, Settings, ShieldAlert } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const MobileLayout: React.FC = () => {
  const { user, isAdmin } = useAppContext();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/signals', icon: Activity, label: 'Signals' },
    { path: '/calculator', icon: Calculator, label: 'Calculator' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  if (isAdmin) {
    navItems.push({ path: '/admin', icon: ShieldAlert, label: 'Admin' });
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-zinc-100 font-sans pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-900/50 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <h1 className="font-bold text-lg tracking-tight">Volatility AI</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Balance</span>
            <span className="text-sm font-mono font-bold text-emerald-400">${user.balance.toLocaleString()}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <User className="w-5 h-5 text-zinc-400" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-zinc-900/50 px-6 py-3 flex justify-between items-center md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                isActive ? 'text-blue-500' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-blue-500/20' : ''}`} />
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

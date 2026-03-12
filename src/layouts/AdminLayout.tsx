import React from 'react';
import { Outlet, NavLink, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, Send, Users, Activity, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const AdminLayout: React.FC = () => {
  const { isAdmin } = useAppContext();
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/send-signal', icon: Send, label: 'Send Signal' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/performance', icon: Activity, label: 'Performance' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-zinc-800">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <Activity className="w-5 h-5 text-black" />
          </div>
          <h1 className="font-bold text-lg tracking-tight text-white">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 font-medium'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to App
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-50 bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Activity className="w-5 h-5 text-black" />
            </div>
            <h1 className="font-bold text-lg tracking-tight text-white">Admin Panel</h1>
          </div>
          <NavLink to="/" className="text-zinc-400 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </NavLink>
        </header>
        
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

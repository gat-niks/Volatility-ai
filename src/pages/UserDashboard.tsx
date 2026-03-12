import React from 'react';
import { useAppContext } from '../context/AppContext';
import { SignalCard } from '../components/SignalCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const data = [
  { name: 'Mon', winRate: 65, profit: 120 },
  { name: 'Tue', winRate: 68, profit: 150 },
  { name: 'Wed', winRate: 72, profit: 210 },
  { name: 'Thu', winRate: 70, profit: 180 },
  { name: 'Fri', winRate: 75, profit: 250 },
  { name: 'Sat', winRate: 78, profit: 300 },
  { name: 'Sun', winRate: 82, profit: 350 },
];

export const UserDashboard: React.FC = () => {
  const { signals, user } = useAppContext();
  const activeSignals = signals.filter(s => s.status === 'ACTIVE');

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-white">Welcome back, {user.name}</h2>
        <p className="text-zinc-400 text-sm">Here's your trading overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-medium uppercase tracking-wider">Active Signals</span>
          </div>
          <span className="text-2xl font-bold text-white">{activeSignals.length}</span>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <Target className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium uppercase tracking-wider">Win Rate</span>
          </div>
          <span className="text-2xl font-bold text-white">{user.winRate}%</span>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium uppercase tracking-wider">Total Profit</span>
          </div>
          <span className="text-2xl font-bold text-emerald-400">+$1,560</span>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-medium uppercase tracking-wider">Current Plan</span>
          </div>
          <span className="text-2xl font-bold text-amber-400">{user.plan}</span>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">Performance</h3>
          <select className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
          </select>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Signals */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Live Signals
          </h3>
          <Link to="/signals" className="text-sm text-blue-400 hover:text-blue-300 font-medium">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeSignals.length > 0 ? (
            activeSignals.map(signal => (
              <SignalCard key={signal.id} signal={signal} userPlan={user.plan} />
            ))
          ) : (
            <div className="col-span-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
              <Activity className="w-12 h-12 text-zinc-700 mb-3" />
              <p className="text-zinc-400 font-medium">No active signals at the moment.</p>
              <p className="text-zinc-500 text-sm mt-1">We'll notify you when our AI detects a new opportunity.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Users, Activity, Target, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', users: 4000, revenue: 2400 },
  { name: 'Feb', users: 6000, revenue: 3800 },
  { name: 'Mar', users: 8000, revenue: 4500 },
  { name: 'Apr', users: 12000, revenue: 7200 },
  { name: 'May', users: 18000, revenue: 11000 },
  { name: 'Jun', users: 25000, revenue: 15500 },
  { name: 'Jul', users: 32000, revenue: 21000 },
];

export const AdminDashboard: React.FC = () => {
  const { signals } = useAppContext();
  
  const activeSignals = signals.filter(s => s.status === 'ACTIVE').length;
  const wonSignals = signals.filter(s => s.status === 'WON').length;
  const lostSignals = signals.filter(s => s.status === 'LOST').length;
  const totalCompleted = wonSignals + lostSignals;
  const winRate = totalCompleted > 0 ? Math.round((wonSignals / totalCompleted) * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Dashboard Overview</h2>
        <p className="text-zinc-400 text-sm">Monitor your app's performance and user growth.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
          <p className="text-sm text-zinc-400 font-medium mb-1">Total Users</p>
          <h3 className="text-3xl font-bold text-white">32,450</h3>
        </div>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +8%
            </span>
          </div>
          <p className="text-sm text-zinc-400 font-medium mb-1">Monthly Revenue</p>
          <h3 className="text-3xl font-bold text-white">$21,050</h3>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-xs font-medium text-zinc-500">All Time</span>
          </div>
          <p className="text-sm text-zinc-400 font-medium mb-1">Signal Win Rate</p>
          <h3 className="text-3xl font-bold text-white">{winRate}%</h3>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Activity className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-xs font-medium text-zinc-500">Live Now</span>
          </div>
          <p className="text-sm text-zinc-400 font-medium mb-1">Active Signals</p>
          <h3 className="text-3xl font-bold text-white">{activeSignals}</h3>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">User Growth to 50k Goal</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-zinc-400">Users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs text-zinc-400">Revenue</span>
            </div>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
              />
              <Area yAxisId="left" type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
              <Area yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Launch Plan */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">50k Users Launch Plan</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h4 className="text-white font-bold mb-1">Influencer Partnerships (Months 1-2)</h4>
              <p className="text-zinc-400 text-sm">Partner with 10 mid-tier Forex & Crypto TikTok/YouTube creators. Provide them free VIP access to showcase live results.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h4 className="text-white font-bold mb-1">Freemium Viral Loop (Months 2-4)</h4>
              <p className="text-zinc-400 text-sm">Users get 1 week of Premium for every friend they refer who signs up. Implement push notifications for "Your friend just won a trade".</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h4 className="text-white font-bold mb-1">Performance Marketing (Months 4-6)</h4>
              <p className="text-zinc-400 text-sm">Scale Facebook and Google Ads targeting keywords like "synthetic indices signals" and "forex AI predictor". Retarget users who downloaded but didn't subscribe.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

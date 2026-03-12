import React, { useState } from 'react';
import { useAppContext, MarketType } from '../context/AppContext';
import { SignalCard } from '../components/SignalCard';
import { Filter, Search } from 'lucide-react';

export const SignalsPage: React.FC = () => {
  const { signals, user } = useAppContext();
  const [filter, setFilter] = useState<MarketType | 'All'>('All');
  const [search, setSearch] = useState('');

  const markets: (MarketType | 'All')[] = ['All', 'Forex', 'Volatility', 'Boom/Crash', 'Over/Under'];

  const filteredSignals = signals.filter((signal) => {
    const matchesFilter = filter === 'All' || signal.market === filter;
    const matchesSearch = signal.asset.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-white">Trading Signals</h2>
        <p className="text-zinc-400 text-sm">Real-time AI-powered trading opportunities.</p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search asset (e.g., EUR/USD, V75)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {markets.map((m) => (
            <button
              key={m}
              onClick={() => setFilter(m)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                filter === m
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Signals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSignals.length > 0 ? (
          filteredSignals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} userPlan={user.plan} />
          ))
        ) : (
          <div className="col-span-full bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
            <Filter className="w-12 h-12 text-zinc-700 mb-4" />
            <p className="text-zinc-300 font-medium text-lg">No signals found</p>
            <p className="text-zinc-500 text-sm mt-2">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
};

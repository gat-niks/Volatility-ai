import React, { useState } from 'react';
import { useAppContext, MarketType, SignalType } from '../context/AppContext';
import { Send, AlertCircle, CheckCircle } from 'lucide-react';

export const AdminSendSignal: React.FC = () => {
  const { addSignal } = useAppContext();
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    market: 'Forex' as MarketType,
    asset: '',
    type: 'BUY' as SignalType,
    entry: '',
    sl: '',
    tp: '',
    winProbability: '80',
    isPremium: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addSignal({
      market: formData.market,
      asset: formData.asset.toUpperCase(),
      type: formData.type,
      entry: Number(formData.entry),
      sl: Number(formData.sl),
      tp: Number(formData.tp),
      winProbability: Number(formData.winProbability),
      status: 'ACTIVE',
      isPremium: formData.isPremium,
    });

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    
    // Reset form
    setFormData({
      ...formData,
      asset: '',
      entry: '',
      sl: '',
      tp: '',
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Send New Signal</h2>
        <p className="text-zinc-400 text-sm">Broadcast a trading signal to your users instantly.</p>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5" />
          <p className="font-medium">Signal broadcasted successfully to all users!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Market</label>
            <select
              value={formData.market}
              onChange={(e) => setFormData({ ...formData, market: e.target.value as MarketType })}
              className="w-full bg-black border border-zinc-800 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="Forex">Forex</option>
              <option value="Volatility">Volatility Indices</option>
              <option value="Boom/Crash">Boom/Crash</option>
              <option value="Over/Under">Over/Under</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Asset Pair</label>
            <input
              type="text"
              required
              placeholder="e.g. EUR/USD, V75"
              value={formData.asset}
              onChange={(e) => setFormData({ ...formData, asset: e.target.value })}
              className="w-full bg-black border border-zinc-800 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 uppercase"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Signal Type</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'BUY' })}
              className={`py-3 rounded-xl font-bold text-sm transition-all ${
                formData.type === 'BUY'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              BUY
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'SELL' })}
              className={`py-3 rounded-xl font-bold text-sm transition-all ${
                formData.type === 'SELL'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              SELL
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Entry Price</label>
            <input
              type="number"
              step="any"
              required
              value={formData.entry}
              onChange={(e) => setFormData({ ...formData, entry: e.target.value })}
              className="w-full bg-black border border-zinc-800 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Stop Loss</label>
            <input
              type="number"
              step="any"
              required
              value={formData.sl}
              onChange={(e) => setFormData({ ...formData, sl: e.target.value })}
              className="w-full bg-black border border-zinc-800 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500/50 font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Take Profit</label>
            <input
              type="number"
              step="any"
              required
              value={formData.tp}
              onChange={(e) => setFormData({ ...formData, tp: e.target.value })}
              className="w-full bg-black border border-zinc-800 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">AI Win Probability (%)</label>
            <input
              type="number"
              min="1"
              max="99"
              required
              value={formData.winProbability}
              onChange={(e) => setFormData({ ...formData, winProbability: e.target.value })}
              className="w-full bg-black border border-zinc-800 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Access Level</label>
            <select
              value={formData.isPremium ? 'premium' : 'free'}
              onChange={(e) => setFormData({ ...formData, isPremium: e.target.value === 'premium' })}
              className="w-full bg-black border border-zinc-800 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="free">Free (All Users)</option>
              <option value="premium">Premium / VIP Only</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Broadcast Signal Now
          </button>
          <p className="text-center text-xs text-zinc-500 mt-3 flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3" />
            This will send a push notification to {formData.isPremium ? 'Premium' : 'All'} users.
          </p>
        </div>
      </form>
    </div>
  );
};

import React from 'react';
import { Signal } from '../context/AppContext';
import { ArrowUpRight, ArrowDownRight, Lock, Clock, CheckCircle, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SignalCardProps {
  signal: Signal;
  userPlan: string;
}

export const SignalCard: React.FC<SignalCardProps> = ({ signal, userPlan }) => {
  const isLocked = signal.isPremium && userPlan === 'FREE';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-blue-400 bg-blue-400/10';
      case 'WON': return 'text-emerald-400 bg-emerald-400/10';
      case 'LOST': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <Clock className="w-4 h-4" />;
      case 'WON': return <CheckCircle className="w-4 h-4" />;
      case 'LOST': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg transition-all hover:border-zinc-700">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${signal.type === 'BUY' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
            {signal.type === 'BUY' ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">{signal.asset}</h3>
            <p className="text-xs text-zinc-400 font-medium">{signal.market}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(signal.status)}`}>
          {getStatusIcon(signal.status)}
          {signal.status}
        </div>
      </div>

      {isLocked ? (
        <div className="absolute inset-0 z-10 backdrop-blur-md bg-zinc-950/60 flex flex-col items-center justify-center rounded-2xl">
          <div className="bg-amber-500/20 p-3 rounded-full mb-3">
            <Lock className="w-6 h-6 text-amber-500" />
          </div>
          <p className="text-white font-semibold mb-1">Premium Signal</p>
          <p className="text-zinc-400 text-xs text-center px-6">Upgrade your plan to unlock entry, stop loss, and take profit levels.</p>
        </div>
      ) : null}

      {/* Details */}
      <div className={`grid grid-cols-3 gap-4 mb-4 ${isLocked ? 'opacity-20 blur-sm' : ''}`}>
        <div className="bg-zinc-950/50 rounded-xl p-3 border border-zinc-800/50">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-1">Entry</p>
          <p className="text-sm font-mono text-white">{signal.entry}</p>
        </div>
        <div className="bg-zinc-950/50 rounded-xl p-3 border border-zinc-800/50">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-1">Stop Loss</p>
          <p className="text-sm font-mono text-rose-400">{signal.sl}</p>
        </div>
        <div className="bg-zinc-950/50 rounded-xl p-3 border border-zinc-800/50">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold mb-1">Take Profit</p>
          <p className="text-sm font-mono text-emerald-400">{signal.tp}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-3 border-t border-zinc-800/50">
        <div className="flex items-center gap-2">
          <div className="w-full bg-zinc-800 rounded-full h-1.5 w-16 overflow-hidden">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${signal.winProbability}%` }}></div>
          </div>
          <span className="text-xs text-zinc-400 font-medium">{signal.winProbability}% AI Confidence</span>
        </div>
        <span className="text-[10px] text-zinc-500">{formatDistanceToNow(signal.timestamp, { addSuffix: true })}</span>
      </div>
    </div>
  );
};

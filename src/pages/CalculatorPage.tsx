import React, { useState } from 'react';
import { Calculator, Percent, DollarSign, AlertTriangle } from 'lucide-react';

export const CalculatorPage: React.FC = () => {
  const [balance, setBalance] = useState<number>(1000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [stopLossPips, setStopLossPips] = useState<number>(20);
  const [pipValue, setPipValue] = useState<number>(10); // Standard lot pip value

  const calculateRisk = () => {
    const riskAmount = (balance * riskPercent) / 100;
    const lotSize = riskAmount / (stopLossPips * pipValue);
    return { riskAmount, lotSize: lotSize.toFixed(2) };
  };

  const { riskAmount, lotSize } = calculateRisk();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-white">Risk Calculator</h2>
        <p className="text-zinc-400 text-sm">Calculate your position size before entering a trade.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="space-y-5">
          {/* Account Balance */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Account Balance</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full bg-black border border-zinc-800 text-white text-lg rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono"
              />
            </div>
          </div>

          {/* Risk Percentage */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Risk Percentage</label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="number"
                value={riskPercent}
                onChange={(e) => setRiskPercent(Number(e.target.value))}
                className="w-full bg-black border border-zinc-800 text-white text-lg rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono"
              />
            </div>
          </div>

          {/* Stop Loss Pips */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Stop Loss (Pips/Points)</label>
            <div className="relative">
              <AlertTriangle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="number"
                value={stopLossPips}
                onChange={(e) => setStopLossPips(Number(e.target.value))}
                className="w-full bg-black border border-zinc-800 text-white text-lg rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono"
              />
            </div>
          </div>

          {/* Pip Value */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Value per Pip/Point ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="number"
                value={pipValue}
                onChange={(e) => setPipValue(Number(e.target.value))}
                className="w-full bg-black border border-zinc-800 text-white text-lg rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800/50">
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Amount at Risk</p>
              <p className="text-2xl font-mono text-rose-400 font-bold">${riskAmount.toFixed(2)}</p>
            </div>
            <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800/50">
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">Recommended Lot Size</p>
              <p className="text-2xl font-mono text-emerald-400 font-bold">{lotSize}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

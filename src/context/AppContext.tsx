import React, { createContext, useContext, useState, ReactNode } from 'react';

export type SignalType = 'BUY' | 'SELL';
export type MarketType = 'Forex' | 'Volatility' | 'Boom/Crash' | 'Over/Under';
export type SignalStatus = 'ACTIVE' | 'WON' | 'LOST' | 'CLOSED';
export type SubscriptionPlan = 'FREE' | 'PREMIUM' | 'VIP';

export interface Signal {
  id: string;
  market: MarketType;
  asset: string;
  type: SignalType;
  entry: number;
  sl: number;
  tp: number;
  winProbability: number;
  status: SignalStatus;
  timestamp: Date;
  isPremium: boolean;
}

interface User {
  id: string;
  name: string;
  plan: SubscriptionPlan;
  balance: number;
  winRate: number;
}

interface AppContextType {
  signals: Signal[];
  addSignal: (signal: Omit<Signal, 'id' | 'timestamp'>) => void;
  updateSignalStatus: (id: string, status: SignalStatus) => void;
  user: User;
  upgradePlan: (plan: SubscriptionPlan) => void;
  isAdmin: boolean;
  toggleAdmin: () => void;
}

const initialSignals: Signal[] = [
  {
    id: '1',
    market: 'Volatility',
    asset: 'V75 Index',
    type: 'BUY',
    entry: 345000.5,
    sl: 340000.0,
    tp: 355000.0,
    winProbability: 85,
    status: 'ACTIVE',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
    isPremium: false,
  },
  {
    id: '2',
    market: 'Forex',
    asset: 'EUR/USD',
    type: 'SELL',
    entry: 1.0850,
    sl: 1.0900,
    tp: 1.0750,
    winProbability: 72,
    status: 'WON',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isPremium: true,
  },
  {
    id: '3',
    market: 'Boom/Crash',
    asset: 'Boom 1000',
    type: 'BUY',
    entry: 10500.0,
    sl: 10450.0,
    tp: 10600.0,
    winProbability: 90,
    status: 'ACTIVE',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    isPremium: true,
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [signals, setSignals] = useState<Signal[]>(initialSignals);
  const [user, setUser] = useState<User>({
    id: 'u1',
    name: 'Trader Joe',
    plan: 'FREE',
    balance: 1500,
    winRate: 68,
  });
  const [isAdmin, setIsAdmin] = useState(false);

  const addSignal = (signalData: Omit<Signal, 'id' | 'timestamp'>) => {
    const newSignal: Signal = {
      ...signalData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    setSignals((prev) => [newSignal, ...prev]);
  };

  const updateSignalStatus = (id: string, status: SignalStatus) => {
    setSignals((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const upgradePlan = (plan: SubscriptionPlan) => {
    setUser((prev) => ({ ...prev, plan }));
  };

  const toggleAdmin = () => setIsAdmin((prev) => !prev);

  return (
    <AppContext.Provider
      value={{
        signals,
        addSignal,
        updateSignalStatus,
        user,
        upgradePlan,
        isAdmin,
        toggleAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

import React from 'react';
import { useAppContext, SubscriptionPlan } from '../context/AppContext';
import { Crown, Check, ShieldAlert, LogOut, Settings, CreditCard, Bell } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, upgradePlan, isAdmin, toggleAdmin } = useAppContext();

  const plans = [
    {
      id: 'FREE',
      name: 'Free',
      price: '$0',
      features: ['Basic Forex Signals', 'Delayed Notifications', 'Standard Support'],
    },
    {
      id: 'PREMIUM',
      name: 'Premium',
      price: '$49/mo',
      features: ['All Market Signals', 'Instant Push Notifications', 'Entry & Exit Prices', 'Priority Support'],
    },
    {
      id: 'VIP',
      name: 'VIP',
      price: '$99/mo',
      features: ['Everything in Premium', '1-on-1 Mentorship', 'Private Telegram Group', 'Custom Risk Plans'],
    },
  ];

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-3xl rounded-full"></div>
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-blue-500/20 z-10 border-4 border-black">
          {user.name.charAt(0)}
        </div>
        <div className="z-10">
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs font-semibold uppercase tracking-wider border border-zinc-700">
              {user.plan} PLAN
            </span>
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Crown className="w-5 h-5 text-amber-400" />
          Subscription Plans
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col p-6 rounded-2xl border transition-all ${
                user.plan === plan.id
                  ? 'bg-blue-600/10 border-blue-500'
                  : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {user.plan === plan.id && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Current Plan
                </div>
              )}
              <h4 className="text-lg font-bold text-white">{plan.name}</h4>
              <p className="text-3xl font-bold text-white mt-2 mb-6">{plan.price}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => upgradePlan(plan.id as SubscriptionPlan)}
                disabled={user.plan === plan.id}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                  user.plan === plan.id
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-zinc-200'
                }`}
              >
                {user.plan === plan.id ? 'Active' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Settings & Admin Toggle */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3 hover:bg-zinc-800/50 cursor-pointer transition-colors">
          <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400"><Settings className="w-5 h-5" /></div>
          <div className="flex-1">
            <h4 className="text-white font-medium text-sm">Account Settings</h4>
            <p className="text-zinc-500 text-xs">Update your personal information</p>
          </div>
        </div>
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3 hover:bg-zinc-800/50 cursor-pointer transition-colors">
          <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400"><Bell className="w-5 h-5" /></div>
          <div className="flex-1">
            <h4 className="text-white font-medium text-sm">Notifications</h4>
            <p className="text-zinc-500 text-xs">Manage push alerts and emails</p>
          </div>
        </div>
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3 hover:bg-zinc-800/50 cursor-pointer transition-colors">
          <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400"><CreditCard className="w-5 h-5" /></div>
          <div className="flex-1">
            <h4 className="text-white font-medium text-sm">Billing</h4>
            <p className="text-zinc-500 text-xs">Manage payment methods</p>
          </div>
        </div>
        <div
          onClick={toggleAdmin}
          className="p-4 border-b border-zinc-800 flex items-center gap-3 hover:bg-zinc-800/50 cursor-pointer transition-colors"
        >
          <div className={`p-2 rounded-lg ${isAdmin ? 'bg-emerald-500/20 text-emerald-500' : 'bg-zinc-800 text-zinc-400'}`}>
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-medium text-sm">Admin Mode</h4>
            <p className="text-zinc-500 text-xs">{isAdmin ? 'Enabled - You have admin access' : 'Disabled - Tap to enable for demo'}</p>
          </div>
        </div>
        <div className="p-4 flex items-center gap-3 hover:bg-rose-500/10 cursor-pointer transition-colors text-rose-500">
          <div className="p-2 bg-rose-500/10 rounded-lg"><LogOut className="w-5 h-5" /></div>
          <div className="flex-1">
            <h4 className="font-medium text-sm">Log Out</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { MobileLayout } from './layouts/MobileLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { UserDashboard } from './pages/UserDashboard';
import { SignalsPage } from './pages/SignalsPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminSendSignal } from './pages/AdminSendSignal';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<MobileLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="signals" element={<SignalsPage />} />
            <Route path="calculator" element={<CalculatorPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="send-signal" element={<AdminSendSignal />} />
            <Route path="users" element={<div className="text-white p-8">Users Management (Coming Soon)</div>} />
            <Route path="performance" element={<div className="text-white p-8">Performance Analytics (Coming Soon)</div>} />
            <Route path="settings" element={<div className="text-white p-8">Admin Settings (Coming Soon)</div>} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Layout from '@/components/Layout';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import CreateLandingPage from '@/pages/CreateLandingPage';
import SmartGenerator from '@/pages/SmartGenerator';
import MyPages from '@/pages/MyPages';
import AdGenerator from '@/pages/tools/AdGenerator';
import HookGenerator from '@/pages/tools/HookGenerator';
import ProductIdeas from '@/pages/tools/ProductIdeas';
import AdsLibrary from '@/pages/tools/AdsLibrary';
import AdAnalyzer from '@/pages/tools/AdAnalyzer';
import Analytics from '@/pages/Analytics';
import Upgrade from '@/pages/Upgrade';
import PublicLandingPage from '@/pages/PublicLandingPage';
import LandingPage from '@/pages/LandingPage';
import PageBuilder from '@/pages/PageBuilder';
import ReferralHandler from '@/pages/ReferralHandler';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/p/:id" element={<PublicLandingPage />} />
          <Route path="/ref/:code" element={<ReferralHandler />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/create-page" element={<Layout><CreateLandingPage /></Layout>} />
          <Route path="/smart-gen" element={<Layout><SmartGenerator /></Layout>} />
          <Route path="/builder/:id" element={<PageBuilder />} />
          <Route path="/pages" element={<Layout><MyPages /></Layout>} />
          <Route path="/tools/ads" element={<Layout><AdGenerator /></Layout>} />
          <Route path="/tools/hooks" element={<Layout><HookGenerator /></Layout>} />
          <Route path="/tools/ideas" element={<Layout><ProductIdeas /></Layout>} />
          <Route path="/tools/library" element={<Layout><AdsLibrary /></Layout>} />
          <Route path="/tools/analyzer" element={<Layout><AdAnalyzer /></Layout>} />
          <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
          <Route path="/upgrade" element={<Layout><Upgrade /></Layout>} />
        </Routes>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

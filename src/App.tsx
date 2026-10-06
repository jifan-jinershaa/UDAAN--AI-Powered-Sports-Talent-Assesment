/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { FeaturesPage } from './components/FeaturesPage';
import { AssessmentCenter } from './components/AssessmentCenter';
import { TalentDiscovery } from './components/TalentDiscovery';
import { AdminDashboard } from './components/AdminDashboard';
import { AthleteDashboard } from './components/AthleteDashboard';
import { Leaderboard } from './components/Leaderboard';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { LoginPage } from './components/LoginPage';
import { AadhaarVerificationModal } from './components/AadhaarVerificationModal';
import { AIReportModal } from './components/AIReportModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { store } from './services/storage';
import { User, AssessmentResult, Athlete } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(() => store.getCurrentUser());
  // Login page first if not logged in
  const [currentTab, setCurrentTab] = useState<string>(() => {
    const user = store.getCurrentUser();
    return user.isLoggedIn ? 'home' : 'login';
  });
  const [notifications, setNotifications] = useState(store.getNotifications());
  const [activeReportModal, setActiveReportModal] = useState<AssessmentResult | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [aadhaarModalOpen, setAadhaarModalOpen] = useState(false);

  const refreshData = () => {
    setCurrentUser({ ...store.getCurrentUser() });
    setNotifications([...store.getNotifications()]);
  };

  const handleSwitchRole = (newRole: 'athlete' | 'admin') => {
    if (newRole === 'athlete') {
      const athleteUser: User = {
        id: 'user-01',
        email: 'arjun.kumar@talent.udaan.in',
        fullName: 'Arjun Kumar',
        role: 'athlete',
        athleteId: 'IND-2025-ATH-01',
        isLoggedIn: true,
        aadhaarVerified: true,
        aadhaarDetails: {
          aadhaarNumberMasked: 'XXXX XXXX 4829',
          fullName: 'Arjun Kumar',
          gender: 'Male',
          dateOfBirth: '2006-04-18',
          state: 'Tamil Nadu',
          district: 'Salem',
          verificationMethod: 'UIDAI Biometric e-KYC (Verhoeff Verified)',
          verifiedAt: '2025-01-10T10:00:00Z',
          status: 'Verified',
          fraudCheckPassed: true,
          securityHash: 'UIDAI-IND-SHA256-4829-VERIFIED',
        },
      };
      store.loginUser(athleteUser);
      setCurrentUser(athleteUser);
      setCurrentTab('athlete-dashboard');
    } else {
      const adminUser: User = {
        id: 'admin-01',
        email: 'scout.sundaram@sai.gov.in',
        fullName: 'Dr. Ramesh Sundaram',
        role: 'admin',
        isLoggedIn: true,
        aadhaarVerified: true,
      };
      store.loginUser(adminUser);
      setCurrentUser(adminUser);
      setCurrentTab('admin-dashboard');
    }
  };

  const handleLogout = () => {
    store.logoutUser();
    setCurrentUser(store.getCurrentUser());
    setCurrentTab('login');
  };

  const handleSelectAthleteDossier = (athlete: Athlete) => {
    if (currentUser.role === 'admin') {
      setCurrentTab('admin-dashboard');
    } else {
      setCurrentTab('athlete-dashboard');
    }
  };

  const handleStartAssessmentNav = () => {
    if (!currentUser.isLoggedIn) {
      setCurrentTab('login');
    } else if (currentUser.role === 'athlete' && !currentUser.aadhaarVerified) {
      setCurrentTab('assessment');
      setAadhaarModalOpen(true);
    } else {
      setCurrentTab('assessment');
    }
  };

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation - shown across the site, with quick links and authentication controls */}
      {currentTab !== 'login' && (
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          currentUser={currentUser}
          onSwitchRole={handleSwitchRole}
          onOpenAuth={() => {
            if (!currentUser.isLoggedIn) setCurrentTab('login');
            else setAuthModalOpen(true);
          }}
          onOpenAadhaarVerification={() => setAadhaarModalOpen(true)}
          onLogout={handleLogout}
          notifications={notifications}
          onRefreshData={refreshData}
        />
      )}

      {/* Main Distinct Content Pages */}
      <main className="flex-1">
        {/* FIRST PAGE: Login & Registration Gate */}
        {currentTab === 'login' && (
          <LoginPage
            onLoginSuccess={(user, needsAadhaarVerification) => {
              setCurrentUser({ ...user });
              refreshData();
              if (user.role === 'athlete') {
                if (needsAadhaarVerification || !user.aadhaarVerified) {
                  setAadhaarModalOpen(true);
                  setCurrentTab('athlete-dashboard');
                } else {
                  setCurrentTab('athlete-dashboard');
                }
              } else {
                setCurrentTab('admin-dashboard');
              }
            }}
            onExploreGuest={() => setCurrentTab('home')}
          />
        )}

        {currentTab === 'home' && (
          <LandingPage
            onStartAssessment={handleStartAssessmentNav}
            onExploreAthletes={() => setCurrentTab('discovery')}
            onViewFeatures={() => setCurrentTab('features')}
          />
        )}

        {currentTab === 'features' && (
          <FeaturesPage
            onStartAssessment={handleStartAssessmentNav}
            onExploreTalent={() => setCurrentTab('discovery')}
          />
        )}

        {/* AI Assessment Center - Video upload & live camera locked until login + Aadhaar verification */}
        {currentTab === 'assessment' && (
          <AssessmentCenter
            currentUser={currentUser}
            onViewReport={(result) => setActiveReportModal(result)}
            onRequireAadhaarVerification={() => {
              if (!currentUser.isLoggedIn) {
                setCurrentTab('login');
              } else {
                setAadhaarModalOpen(true);
              }
            }}
          />
        )}

        {currentTab === 'discovery' && (
          <TalentDiscovery
            onSelectAthlete={handleSelectAthleteDossier}
            onRefreshData={refreshData}
          />
        )}

        {currentTab === 'athlete-dashboard' && (
          <AthleteDashboard
            currentUser={currentUser}
            onStartAssessment={handleStartAssessmentNav}
            onViewReport={(result) => setActiveReportModal(result)}
            onRequireAadhaarVerification={() => setAadhaarModalOpen(true)}
            onRefreshData={refreshData}
          />
        )}

        {currentTab === 'admin-dashboard' && (
          <AdminDashboard
            onRefreshData={refreshData}
            onViewAthlete={handleSelectAthleteDossier}
          />
        )}

        {currentTab === 'leaderboard' && (
          <Leaderboard
            onSelectAthlete={handleSelectAthleteDossier}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onStartAssessment={handleStartAssessmentNav}
            onExploreTalent={() => setCurrentTab('discovery')}
          />
        )}

        {currentTab === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Global Indian Citizen Aadhaar e-KYC Verification Modal & Fraud Detection */}
      <AadhaarVerificationModal
        isOpen={aadhaarModalOpen}
        onClose={() => setAadhaarModalOpen(false)}
        onSuccess={(record) => {
          refreshData();
          setAadhaarModalOpen(false);
          // Once Aadhaar is verified, unlock video uploads and guide athlete directly to Assessment Center!
          setCurrentTab('assessment');
        }}
        currentUser={currentUser}
      />

      {/* Global AI Biomechanical Report Modal */}
      <AIReportModal
        result={activeReportModal}
        onClose={() => setActiveReportModal(null)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          refreshData();
          if (user.role === 'athlete') {
            if (!user.aadhaarVerified) {
              setAadhaarModalOpen(true);
              setCurrentTab('athlete-dashboard');
            } else {
              setCurrentTab('athlete-dashboard');
            }
          } else {
            setCurrentTab('admin-dashboard');
          }
        }}
      />

      {/* Minimal Clean Footer */}
      {currentTab !== 'login' && <Footer onNavigate={(tab) => setCurrentTab(tab)} />}
    </div>
  );
}

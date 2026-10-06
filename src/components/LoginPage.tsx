import React, { useState } from 'react';
import {
  Trophy,
  Shield,
  Lock,
  Mail,
  User as UserIcon,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { INDIAN_STATES, SPORTS_LIST, store } from '../services/storage';
import { User } from '../types';

interface LoginPageProps {
  onLoginSuccess: (user: User, needsAadhaarVerification?: boolean) => void;
  onExploreGuest: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onExploreGuest,
}) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Registration state
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('2006-04-18');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [selectedSport, setSelectedSport] = useState<string>('Athletics');
  const [selectedState, setSelectedState] = useState<string>('Tamil Nadu');
  const [district, setDistrict] = useState('Salem');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      id: 'user-01',
      email: email || 'arjun.kumar@talent.udaan.in',
      fullName: fullName || 'Arjun Kumar',
      role: 'athlete',
      athleteId: 'IND-2025-ATH-01',
      isLoggedIn: true,
      aadhaarVerified: true,
    };
    store.loginUser(user);
    onLoginSuccess(user, false);
  };

  const handleQuickDemoLogin = (type: 'verified_athlete' | 'unverified_athlete' | 'scout') => {
    if (type === 'verified_athlete') {
      const user: User = {
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
      store.loginUser(user);
      onLoginSuccess(user, false);
    } else if (type === 'unverified_athlete') {
      // Create or select unverified candidate to test the exact Aadhaar verification flow!
      const user: User = {
        id: `user-${Date.now()}`,
        email: 'new.athlete@talent.udaan.in',
        fullName: 'Rohan Sharma',
        role: 'athlete',
        athleteId: 'IND-2025-ATH-99',
        isLoggedIn: true,
        aadhaarVerified: false,
      };

      store.updateAthlete({
        id: 'IND-2025-ATH-99',
        userId: user.id,
        fullName: 'Rohan Sharma',
        dateOfBirth: '2007-08-14',
        age: 18,
        gender: 'Male',
        state: 'Haryana',
        district: 'Rohtak',
        city: 'Rohtak',
        phone: '+91 98120 00000',
        email: user.email,
        primarySport: 'Athletics',
        heightCm: 176,
        weightKg: 66,
        fitnessLevel: 'Junior State',
        profilePhotoUrl:
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&auto=format&fit=crop&q=80',
        overallScore: 76,
        fitnessScore: 78,
        techniqueScore: 74,
        consistencyScore: 79,
        aiConfidence: 94,
        scoutingStatus: 'Profile Created',
        profileCompletion: 70,
        bio: 'Grassroots sprint contender from Rohtak. Awaiting Indian citizenship Aadhaar verification to submit official trial assessments.',
        aadhaarVerified: false,
        createdAt: new Date().toISOString(),
      });

      store.loginUser(user);
      onLoginSuccess(user, true); // explicitly trigger Aadhaar verification!
    } else {
      const scoutUser: User = {
        id: 'admin-01',
        email: 'scout.sundaram@sai.gov.in',
        fullName: 'Dr. Ramesh Sundaram',
        role: 'admin',
        isLoggedIn: true,
        aadhaarVerified: true,
      };
      store.loginUser(scoutUser);
      onLoginSuccess(scoutUser, false);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newAthleteId = `IND-2025-ATH-${Math.floor(100 + Math.random() * 900)}`;
    const newAthlete = {
      id: newAthleteId,
      userId: `user-${Date.now()}`,
      fullName: fullName || 'New Athlete',
      dateOfBirth: dob,
      age: 19,
      gender,
      state: selectedState,
      district: district || 'Salem',
      city: district || 'District Capital',
      phone: '+91 98451 00000',
      email: email || 'athlete@talent.udaan.in',
      primarySport: selectedSport,
      heightCm: 175,
      weightKg: 65,
      reachCm: 178,
      fitnessLevel: 'State Junior',
      profilePhotoUrl:
        gender === 'Female'
          ? 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&auto=format&fit=crop&q=80',
      overallScore: 75,
      fitnessScore: 78,
      techniqueScore: 72,
      consistencyScore: 76,
      aiConfidence: 93,
      scoutingStatus: 'Profile Created' as const,
      profileCompletion: 75,
      bio: `Aspiring ${selectedSport} athlete from ${district}, ${selectedState}. Registered on UDAAN for national talent identification.`,
      shortlisted: false,
      aadhaarVerified: false,
      createdAt: new Date().toISOString(),
    };

    store.updateAthlete(newAthlete);

    const user: User = {
      id: newAthlete.userId,
      email: newAthlete.email,
      fullName: newAthlete.fullName,
      role: 'athlete',
      athleteId: newAthlete.id,
      isLoggedIn: true,
      aadhaarVerified: false,
    };

    store.loginUser(user);
    // Directly guide to Aadhaar verification!
    onLoginSuccess(user, true);
  };

  return (
    <div className="min-h-screen bg-[#060B1A] text-slate-100 flex flex-col justify-center py-12 px-6 sm:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-amber-500/8 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-xl mx-auto w-full relative z-10 space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 shadow-xl shadow-amber-500/15 mb-2">
            <Trophy className="w-7 h-7 stroke-[2.2]" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            UDAAN
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            National Sports Talent Assessment Platform • Indian Citizen Identification & Biomechanics Gateway
          </p>
        </div>

        {/* 1-Click Fast Demonstration Panel */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              1-Click Demo Evaluation Profiles
            </span>
            <span className="text-[10px] text-slate-400">Choose persona</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <button
              onClick={() => handleQuickDemoLogin('unverified_athlete')}
              className="p-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-amber-500/30 text-amber-300 font-semibold text-left transition cursor-pointer space-y-1"
            >
              <span className="font-bold block text-white text-xs">1. Test Aadhaar KYC</span>
              <span className="text-[10px] text-amber-400/90 block">Unverified Athlete (Rohan)</span>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('verified_athlete')}
              className="p-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-200 font-semibold text-left transition cursor-pointer space-y-1"
            >
              <span className="font-bold block text-white text-xs">2. Verified Athlete</span>
              <span className="text-[10px] text-emerald-400 block">Arjun Kumar (KYC Passed)</span>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('scout')}
              className="p-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-200 font-semibold text-left transition cursor-pointer space-y-1"
            >
              <span className="font-bold block text-white text-xs">3. National Scout</span>
              <span className="text-[10px] text-sky-400 block">Dr. Ramesh Sundaram</span>
            </button>
          </div>
        </div>

        {/* Main Auth Form Container */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
          {/* Tab Switcher */}
          <div className="grid grid-cols-2 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('signin')}
              className={`py-2 rounded-lg transition cursor-pointer ${
                activeTab === 'signin'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In to Account
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`py-2 rounded-lg transition cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register as New Athlete
            </button>
          </div>

          {/* SIGN IN FORM */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="athlete@talent.udaan.in"
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-300 font-medium">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-500/15"
              >
                Sign In & Open Portal <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* REGISTER NEW ATHLETE FORM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4 text-xs max-h-[62vh] overflow-y-auto pr-1">
              <div className="space-y-1.5">
                <label className="block text-slate-300 font-medium">Full Name (As per Aadhaar)</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sumanth Kumar"
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-slate-300 font-medium">Primary Sport</label>
                  <select
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  >
                    {SPORTS_LIST.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-300 font-medium">State / UT</label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-slate-300 font-medium">District</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Salem"
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-300 font-medium">Date of Birth</label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-300 font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="athlete@gmail.com"
                  className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-300 font-medium">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Informational notice about next step */}
              <div className="p-3 bg-amber-950/20 border border-amber-500/25 rounded-xl text-[11px] text-amber-200/90 space-y-1">
                <strong>Next Step: Indian Citizen Aadhaar e-KYC Verification</strong>
                <p>
                  You will be prompted to verify your 12-digit Aadhaar number to confirm your identity before assessment video uploads are unlocked.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-500/15"
              >
                Register & Proceed to Aadhaar Verification <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Guest Explore link */}
          <div className="pt-2 text-center border-t border-slate-800/80">
            <button
              onClick={onExploreGuest}
              className="text-xs text-slate-400 hover:text-white transition cursor-pointer"
            >
              Explore Platform Overview as Guest →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

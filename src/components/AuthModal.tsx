import React, { useState } from 'react';
import { X, Lock, Mail, User, MapPin, Trophy, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { INDIAN_STATES, SPORTS_LIST, store } from '../services/storage';
import { User as UserType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserType) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedSport, setSelectedSport] = useState<string>('Athletics');
  const [selectedState, setSelectedState] = useState<string>('Tamil Nadu');
  const [district, setDistrict] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [dob, setDob] = useState('2006-05-15');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserType = {
      id: 'user-01',
      email: email || 'arjun.kumar@talent.udaan.in',
      fullName: fullName || 'Arjun Kumar',
      role: 'athlete',
      athleteId: 'IND-2025-ATH-01',
    };
    store.setCurrentUser(user);
    onLoginSuccess(user);
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newAthleteId = `IND-2025-ATH-${Math.floor(10 + Math.random() * 90)}`;
    const newAthlete = {
      id: newAthleteId,
      userId: `user-${Date.now()}`,
      fullName: fullName || 'New Athlete',
      dateOfBirth: dob,
      age: 19,
      gender,
      state: selectedState,
      district: district || 'Salem',
      city: 'District Headquarters',
      phone: '+91 98451 00000',
      email: email || 'athlete@udaan.in',
      primarySport: selectedSport,
      heightCm: 175,
      weightKg: 65,
      reachCm: 178,
      fitnessLevel: 'State Junior',
      profilePhotoUrl:
        gender === 'Female'
          ? 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&auto=format&fit=crop&q=80',
      overallScore: 78,
      fitnessScore: 80,
      techniqueScore: 76,
      consistencyScore: 82,
      aiConfidence: 94,
      scoutingStatus: 'Profile Created' as const,
      profileCompletion: 80,
      bio: `Aspiring ${selectedSport} athlete from ${district || selectedState}. Registered on UDAAN for national talent identification.`,
      shortlisted: false,
      createdAt: new Date().toISOString(),
    };

    store.updateAthlete(newAthlete);

    const user: UserType = {
      id: newAthlete.userId,
      email: newAthlete.email,
      fullName: newAthlete.fullName,
      role: 'athlete',
      athleteId: newAthlete.id,
    };
    store.setCurrentUser(user);
    onLoginSuccess(user);
    onClose();
  };

  const handleQuickDemoLogin = (role: 'athlete' | 'admin') => {
    if (role === 'athlete') {
      const user: UserType = {
        id: 'user-01',
        email: 'arjun.kumar@talent.udaan.in',
        fullName: 'Arjun Kumar',
        role: 'athlete',
        athleteId: 'IND-2025-ATH-01',
      };
      store.setCurrentUser(user);
      onLoginSuccess(user);
    } else {
      const user: UserType = {
        id: 'admin-01',
        email: 'scout.sundaram@sai.gov.in',
        fullName: 'Dr. Ramesh Sundaram',
        role: 'admin',
      };
      store.setCurrentUser(user);
      onLoginSuccess(user);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white">
              {mode === 'login' ? 'Sign In to UDAAN' : mode === 'register' ? 'Register Athlete Profile' : 'Reset Password'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              National Sports Talent Assessment Platform
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Demo Login Shortcuts */}
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
            Quick Demonstration Access
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickDemoLogin('athlete')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Demo Athlete
            </button>
            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              Demo Scout
            </button>
          </div>
        </div>

        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="athlete@talent.udaan.in"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
            >
              Sign In
            </button>

            <div className="flex justify-between text-[11px] text-slate-400 pt-2">
              <button
                type="button"
                onClick={() => setMode('register')}
                className="hover:text-amber-400 cursor-pointer"
              >
                New athlete? Create profile
              </button>
              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="hover:text-slate-300 cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3 text-xs max-h-[60vh] overflow-y-auto pr-1">
            <div>
              <label className="block text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Aniket Verma"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 mb-1">Primary Sport</label>
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-white"
                >
                  {SPORTS_LIST.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-300 mb-1">State / UT</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-white"
                >
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 mb-1">District</label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Salem"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'Male' | 'Female' | 'Other')}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@gmail.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
            >
              Complete Registration & Create Profile
            </button>

            <button
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-center text-[11px] text-slate-400 hover:text-white pt-1"
            >
              Already have an account? Sign in
            </button>
          </form>
        )}

        {mode === 'forgot' && (
          <div className="space-y-3 text-xs">
            <p className="text-slate-400">
              Enter your registered email address to receive password reset instructions.
            </p>
            <input
              type="email"
              placeholder="athlete@talent.udaan.in"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
            />
            <button
              onClick={() => {
                alert('Password reset link sent to email (simulated).');
                setMode('login');
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold"
            >
              Send Reset Link
            </button>
            <button
              onClick={() => setMode('login')}
              className="w-full text-center text-slate-400 hover:text-white pt-1"
            >
              Back to sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Trophy,
  Shield,
  Activity,
  Users,
  Award,
  Bell,
  CheckCircle,
  AlertCircle,
  Menu,
  X,
  UserCheck,
  ChevronDown,
  ShieldCheck,
  LogOut,
} from 'lucide-react';
import { User, NotificationItem } from '../types';
import { store } from '../services/storage';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUser: User;
  onSwitchRole: (role: 'athlete' | 'admin') => void;
  onOpenAuth: () => void;
  onOpenAadhaarVerification?: () => void;
  onLogout?: () => void;
  notifications: NotificationItem[];
  onRefreshData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onSwitchRole,
  onOpenAuth,
  onOpenAadhaarVerification,
  onLogout,
  notifications,
  onRefreshData,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    store.markNotificationsAsRead();
    onRefreshData();
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'assessment', label: 'Assessment' },
    { id: currentUser.role === 'athlete' ? 'athlete-dashboard' : 'admin-dashboard', label: 'Dashboard' },
    { id: 'discovery', label: 'Talent Pool' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070D1E]/90 backdrop-blur-xl border-b border-slate-800/80 text-white transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3.5 cursor-pointer group select-none"
            onClick={() => setCurrentTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/10 group-hover:scale-105 transition duration-200">
              <Trophy className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition">
                  UDAAN
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60">
                  Sports AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5 font-normal tracking-normal hidden sm:block">
                National Talent Assessment
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive =
                currentTab === link.id ||
                (link.id.includes('dashboard') && (currentTab === 'athlete-dashboard' || currentTab === 'admin-dashboard'));
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentTab(link.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-amber-400 bg-slate-850/80 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            {/* Minimal Role Selector */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-1 flex items-center text-xs">
              <button
                onClick={() => onSwitchRole('athlete')}
                className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                  currentUser.role === 'athlete'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Athlete
              </button>
              <button
                onClick={() => onSwitchRole('admin')}
                className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                  currentUser.role === 'admin'
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Scout
              </button>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800 transition cursor-pointer relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full" />
                )}
              </button>

              {/* Notification Popup */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50">
                  <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-xs text-amber-400 hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/80">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-500">
                        No recent notifications.
                      </div>
                    ) : (
                      notifications.slice(0, 4).map((n) => (
                        <div
                          key={n.id}
                          className={`p-4 hover:bg-slate-850/50 transition flex items-start gap-3 ${
                            !n.read ? 'bg-slate-850/30' : ''
                          }`}
                        >
                          <div className="mt-0.5">
                            {n.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                            {n.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400" />}
                            {n.type === 'info' && <Bell className="w-4 h-4 text-sky-400" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-white">{n.title}</p>
                            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{n.message}</p>
                            <span className="text-[10px] text-slate-500 mt-1.5 block">{n.timestamp}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Aadhaar Verification Status Pill for Athlete */}
            {currentUser.isLoggedIn && currentUser.role === 'athlete' && (
              currentUser.aadhaarVerified ? (
                <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>🇮🇳 Aadhaar Verified</span>
                </div>
              ) : (
                <button
                  onClick={onOpenAadhaarVerification}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition cursor-pointer animate-pulse"
                  title="Aadhaar verification required to unlock video uploads"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verify Aadhaar</span>
                </button>
              )
            )}

            {/* User Profile Action / Login Button */}
            {currentUser.isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 transition text-xs font-medium text-slate-200 cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-bold text-xs">
                    {currentUser.fullName ? currentUser.fullName.charAt(0) : 'U'}
                  </div>
                  <span className="hidden sm:inline max-w-[90px] truncate">{currentUser.fullName}</span>
                </button>

                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 transition cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setCurrentTab('login')}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-sm shadow-amber-500/15"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070D1E] border-b border-slate-800 px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentTab(link.id);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-850 transition"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

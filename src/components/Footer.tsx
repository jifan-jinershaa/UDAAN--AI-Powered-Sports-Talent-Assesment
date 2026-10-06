import React from 'react';
import { Trophy, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#050A18] border-t border-slate-800 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Vision */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <Trophy className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-base font-extrabold text-white tracking-wider">UDAAN</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              "Discover Talent. Measure Potential. Represent India."
            </p>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Standardized digital movement intelligence democratizing sports talent identification across Indian districts.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Pages</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('features')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Features & Technology
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('assessment')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Assessment Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('discovery')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Talent Discovery Pool
                </button>
              </li>
            </ul>
          </div>

          {/* About & Support Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Organization</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  About UDAAN
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('leaderboard')}
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Performance Standings
                </button>
              </li>
            </ul>
          </div>

          {/* Advisory Box */}
          <div className="space-y-3 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Assessment Notice</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed font-normal">
              AI-assisted biomechanics provides objective screening data to support certified coaches, sports academies, and national federation trial committees.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 UDAAN — National Sports Talent Assessment Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for Indian Sports
          </div>
        </div>
      </div>
    </footer>
  );
};

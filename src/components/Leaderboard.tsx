import React, { useState } from 'react';
import { Award, Trophy, TrendingUp, MapPin, Filter, Search } from 'lucide-react';
import { store, SPORTS_LIST, INDIAN_STATES } from '../services/storage';
import { Athlete } from '../types';

interface LeaderboardProps {
  onSelectAthlete: (athlete: Athlete) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ onSelectAthlete }) => {
  const [selectedSport, setSelectedSport] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');

  const athletes = store.getAthletes();

  const filtered = athletes
    .filter((a) => {
      if (selectedSport !== 'All' && a.primarySport !== selectedSport) return false;
      if (selectedState !== 'All' && a.state !== selectedState) return false;
      return true;
    })
    .sort((a, b) => b.overallScore - a.overallScore);

  return (
    <div className="bg-[#070D1E] text-slate-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-amber-400 mb-1">
              <Trophy className="w-3.5 h-3.5" />
              Standardized Performance Standings
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              National Performance Leaderboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Athletic rankings compiled from verified biomechanical assessments, movement symmetry, and tournament credentials.
            </p>
          </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2"
          >
            <option value="All">All Sports</option>
            {SPORTS_LIST.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2"
          >
            <option value="All">All States</option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Leaderboard Table Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-medium">
              <tr>
                <th className="py-3 px-5 text-center w-16">Rank</th>
                <th className="py-3 px-5">Athlete Dossier</th>
                <th className="py-3 px-5">Sport & Position</th>
                <th className="py-3 px-5">State & District</th>
                <th className="py-3 px-5 text-center">Fitness</th>
                <th className="py-3 px-5 text-center">Technique</th>
                <th className="py-3 px-5 text-right font-bold text-amber-400">Overall Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-300">
              {filtered.map((athlete, idx) => {
                const rank = idx + 1;
                const isTop3 = rank <= 3;
                return (
                  <tr
                    key={athlete.id}
                    onClick={() => onSelectAthlete(athlete)}
                    className="hover:bg-slate-800/60 transition cursor-pointer"
                  >
                    <td className="py-4 px-5 text-center font-mono">
                      {rank === 1 ? (
                        <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black inline-flex items-center justify-center text-xs shadow-md">
                          1
                        </span>
                      ) : rank === 2 ? (
                        <span className="w-7 h-7 rounded-full bg-slate-300 text-slate-950 font-black inline-flex items-center justify-center text-xs shadow-md">
                          2
                        </span>
                      ) : rank === 3 ? (
                        <span className="w-7 h-7 rounded-full bg-amber-700 text-white font-black inline-flex items-center justify-center text-xs shadow-md">
                          3
                        </span>
                      ) : (
                        <span className="text-slate-400 font-bold">{rank}</span>
                      )}
                    </td>

                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={athlete.profilePhotoUrl}
                          alt=""
                          className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-700"
                        />
                        <div>
                          <div className="font-bold text-white text-sm">{athlete.fullName}</div>
                          <span className="text-[10px] font-mono text-slate-400">{athlete.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <span className="font-semibold text-sky-400">{athlete.primarySport}</span>
                      <div className="text-[11px] text-slate-400">{athlete.playingPosition || 'Competitor'}</div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="text-slate-200">{athlete.state}</div>
                      <div className="text-[11px] text-slate-400">{athlete.district}</div>
                    </td>

                    <td className="py-4 px-5 text-center font-mono font-bold text-emerald-400">
                      {athlete.fitnessScore}
                    </td>

                    <td className="py-4 px-5 text-center font-mono font-bold text-sky-400">
                      {athlete.techniqueScore}
                    </td>

                    <td className="py-4 px-5 text-right font-mono font-black text-amber-400 text-base">
                      {athlete.overallScore}
                      <span className="text-[10px] font-sans text-slate-500 font-normal"> / 100</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

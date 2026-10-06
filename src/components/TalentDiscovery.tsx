import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  Star,
  Activity,
  Award,
  ChevronRight,
  ArrowUpDown,
  Check,
  X,
  Layers,
  MapPin,
  Shield,
  Eye,
} from 'lucide-react';
import { Athlete } from '../types';
import { store, INDIAN_STATES, SPORTS_LIST } from '../services/storage';

interface TalentDiscoveryProps {
  onSelectAthlete: (athlete: Athlete) => void;
  onRefreshData: () => void;
}

export const TalentDiscovery: React.FC<TalentDiscoveryProps> = ({
  onSelectAthlete,
  onRefreshData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [minScore, setMinScore] = useState<number>(0);
  const [shortlistedOnly, setShortlistedOnly] = useState<boolean>(false);

  // Athlete Comparison Tray (up to 3 athletes)
  const [comparedAthleteIds, setComparedAthleteIds] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  const athletes = store.getAthletes();

  const filteredAthletes = useMemo(() => {
    return athletes.filter((a) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match =
          a.fullName.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q) ||
          a.district.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (selectedSport !== 'All' && a.primarySport !== selectedSport) return false;
      if (selectedState !== 'All' && a.state !== selectedState) return false;
      if (selectedGender !== 'All' && a.gender !== selectedGender) return false;
      if (a.overallScore < minScore) return false;
      if (shortlistedOnly && !a.shortlisted) return false;
      return true;
    });
  }, [athletes, searchQuery, selectedSport, selectedState, selectedGender, minScore, shortlistedOnly]);

  const toggleCompare = (id: string) => {
    if (comparedAthleteIds.includes(id)) {
      setComparedAthleteIds(comparedAthleteIds.filter((item) => item !== id));
    } else {
      if (comparedAthleteIds.length >= 3) {
        alert('You can compare a maximum of 3 athletes simultaneously.');
        return;
      }
      setComparedAthleteIds([...comparedAthleteIds, id]);
    }
  };

  const handleToggleShortlist = (athleteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    store.toggleShortlist(athleteId);
    onRefreshData();
  };

  const comparedAthletes = useMemo(() => {
    return comparedAthleteIds
      .map((id) => store.getAthlete(id))
      .filter((a): a is Athlete => !!a);
  }, [comparedAthleteIds, athletes]);

  return (
    <div className="bg-[#070D1E] text-slate-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400 mb-2">
            <Users className="w-3.5 h-3.5" />
            National Talent Pool Database
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Talent Discovery & Scouting Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Search, filter, and compare promising athletes across all 28 Indian States with AI biomechanical metrics.
          </p>
        </div>

        {/* Comparison Tray Button */}
        {comparedAthleteIds.length > 0 && (
          <button
            onClick={() => setShowComparisonModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-orange-500/20 flex items-center gap-2 transition cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            Compare {comparedAthleteIds.length} Athletes
          </button>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Text search */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, ID, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Sport Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
            >
              <option value="All">All Sports</option>
              {SPORTS_LIST.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>

          {/* State Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
            >
              <option value="All">All States / UTs</option>
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        {/* Secondary Row: Min score slider & Shortlist toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/60 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-300">
              <span>Min Score:</span>
              <input
                type="range"
                min="0"
                max="95"
                step="5"
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-28 accent-amber-500 cursor-pointer"
              />
              <span className="font-mono text-amber-400 font-bold">{minScore}+</span>
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={shortlistedOnly}
                onChange={(e) => setShortlistedOnly(e.target.checked)}
                className="rounded accent-amber-500"
              />
              <span>Shortlisted Only</span>
            </label>
          </div>

          <span className="text-slate-400 font-mono text-[11px]">
            Showing <strong>{filteredAthletes.length}</strong> of {athletes.length} Athletes
          </span>
        </div>
      </div>

      {/* Athletes Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAthletes.map((athlete) => {
          const isCompared = comparedAthleteIds.includes(athlete.id);
          const certs = store.getCertificates(athlete.id);
          const achs = store.getAchievements(athlete.id);

          return (
            <div
              key={athlete.id}
              onClick={() => onSelectAthlete(athlete)}
              className="bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition-all space-y-4 group cursor-pointer relative"
            >
              {/* Top Row: Photo, Name, State, Shortlist Toggle */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={athlete.profilePhotoUrl}
                    alt={athlete.fullName}
                    className="w-14 h-14 rounded-xl object-cover ring-1 ring-slate-700"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition">
                      {athlete.fullName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                      <span className="text-sky-300 font-semibold">{athlete.primarySport}</span>
                      <span>•</span>
                      <span>{athlete.playingPosition || 'Competitor'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{athlete.district}, {athlete.state}</span>
                    </div>
                  </div>
                </div>

                {/* Shortlist star */}
                <button
                  onClick={(e) => handleToggleShortlist(athlete.id, e)}
                  className={`p-2 rounded-xl border transition cursor-pointer ${
                    athlete.shortlisted
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-sm'
                      : 'bg-slate-800/80 text-slate-500 hover:text-slate-300 border-slate-700'
                  }`}
                  title={athlete.shortlisted ? 'Shortlisted' : 'Shortlist Athlete'}
                >
                  <Star className={`w-4 h-4 ${athlete.shortlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Performance Score Grid */}
              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-center">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Overall</span>
                  <div className="text-base font-black font-mono text-amber-400 mt-0.5">
                    {athlete.overallScore}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Fitness</span>
                  <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">
                    {athlete.fitnessScore}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">CV Conf.</span>
                  <div className="text-base font-bold font-mono text-sky-400 mt-0.5">
                    {athlete.aiConfidence}%
                  </div>
                </div>
              </div>

              {/* Status and Proof badges */}
              <div className="flex items-center justify-between text-[11px]">
                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium">
                  {athlete.scoutingStatus}
                </span>

                <div className="flex items-center gap-2 text-slate-400">
                  <span>{achs.length} Medals</span>
                  <span>•</span>
                  <span>{certs.length} Certs</span>
                </div>
              </div>

              {/* Card Bottom: Compare button & View profile */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCompare(athlete.id);
                  }}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition flex items-center gap-1 cursor-pointer ${
                    isCompared
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white border-slate-700'
                  }`}
                >
                  {isCompared ? <Check className="w-3.5 h-3.5" /> : null}
                  {isCompared ? 'Added to Compare' : '+ Compare'}
                </button>

                <span className="text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition flex items-center gap-0.5">
                  Dossier <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Athlete Comparison Modal */}
      {showComparisonModal && comparedAthletes.length > 0 && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-8 space-y-6 p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  Side-by-Side Athlete Comparison
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Comparative biomechanics & credentials across selected candidates
                </p>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto border border-slate-800 rounded-2xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 w-44">Attribute</th>
                    {comparedAthletes.map((a) => (
                      <th key={a.id} className="py-3 px-4 text-center">
                        <div className="font-bold text-white text-sm">{a.fullName}</div>
                        <span className="text-[10px] text-amber-400">{a.primarySport}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-mono text-slate-300">
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-white font-medium">Overall Score</td>
                    {comparedAthletes.map((a) => (
                      <td key={a.id} className="py-2.5 px-4 text-center text-amber-400 font-bold text-sm">
                        {a.overallScore} / 100
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-white font-medium">Fitness Score</td>
                    {comparedAthletes.map((a) => (
                      <td key={a.id} className="py-2.5 px-4 text-center text-emerald-400 font-bold">
                        {a.fitnessScore}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-white font-medium">Technique Score</td>
                    {comparedAthletes.map((a) => (
                      <td key={a.id} className="py-2.5 px-4 text-center text-sky-400 font-bold">
                        {a.techniqueScore}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-white font-medium">Consistency Score</td>
                    {comparedAthletes.map((a) => (
                      <td key={a.id} className="py-2.5 px-4 text-center text-purple-400 font-bold">
                        {a.consistencyScore}%
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-white font-medium">State / Region</td>
                    {comparedAthletes.map((a) => (
                      <td key={a.id} className="py-2.5 px-4 text-center font-sans text-slate-300">
                        {a.district}, {a.state}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-white font-medium">Height & Weight</td>
                    {comparedAthletes.map((a) => (
                      <td key={a.id} className="py-2.5 px-4 text-center font-sans text-slate-300">
                        {a.heightCm}cm • {a.weightKg}kg
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-white font-medium">Scouting Status</td>
                    {comparedAthletes.map((a) => (
                      <td key={a.id} className="py-2.5 px-4 text-center font-sans">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 text-[10px] font-bold">
                          {a.scoutingStatus}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setComparedAthleteIds([])}
                className="text-xs text-slate-400 hover:text-white"
              >
                Clear Comparison Tray
              </button>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

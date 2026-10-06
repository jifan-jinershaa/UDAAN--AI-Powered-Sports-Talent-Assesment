import React, { useState } from 'react';
import {
  Shield,
  Users,
  Activity,
  Award,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  TrendingUp,
  FileCheck,
  Star,
  Search,
  MessageSquare,
  Plus,
  Eye,
  AlertTriangle,
} from 'lucide-react';
import { Athlete, Certificate, ScoutNote, ScoutingStatus } from '../types';
import { store, INDIAN_STATES } from '../services/storage';

interface AdminDashboardProps {
  onRefreshData: () => void;
  onViewAthlete: (athlete: Athlete) => void;
}

const SCOUTING_STATUSES: ScoutingStatus[] = [
  'Profile Incomplete',
  'Profile Created',
  'Assessment Completed',
  'Under Review',
  'Shortlisted',
  'Regional Selection',
  'National Scouting',
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onRefreshData,
  onViewAthlete,
}) => {
  const athletes = store.getAthletes();
  const certificates = store.getCertificates();
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>(athletes[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'overview' | 'verification' | 'scouting' | 'analytics'>('overview');

  // Scout note form
  const [scoutNoteText, setScoutNoteText] = useState('');
  const [scoutRating, setScoutRating] = useState(5);
  const [scoutRec, setScoutRec] = useState<ScoutNote['recommendation']>('Fast-Track National Camp');

  const selectedAthlete = athletes.find((a) => a.id === selectedAthleteId) || athletes[0];
  const pendingCertificates = certificates.filter((c) => c.verificationStatus === 'Pending');

  const handleUpdateStatus = (status: ScoutingStatus) => {
    if (!selectedAthlete) return;
    store.updateScoutingStatus(selectedAthlete.id, status);
    onRefreshData();
  };

  const handleVerifyCertificate = (certId: string, status: 'Verified' | 'Rejected') => {
    store.updateCertificateStatus(
      certId,
      status,
      status === 'Verified' ? 'Verified against state federation records.' : 'Incomplete documentation.',
      'National Scrutiny Cell'
    );
    onRefreshData();
  };

  const handleAddScoutNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAthlete || !scoutNoteText.trim()) return;

    store.addScoutNote({
      athleteId: selectedAthlete.id,
      scoutName: 'Dr. Ramesh Sundaram',
      scoutRole: 'Senior National Talent Scout',
      note: scoutNoteText.trim(),
      rating: scoutRating,
      recommendation: scoutRec,
    });

    setScoutNoteText('');
    onRefreshData();
  };

  // State distribution data
  const stateStats = [
    { state: 'Tamil Nadu', athletes: 38, avgScore: 86.4, topSport: 'Athletics' },
    { state: 'Kerala', athletes: 31, avgScore: 84.8, topSport: 'Badminton' },
    { state: 'Haryana', athletes: 44, avgScore: 88.2, topSport: 'Boxing / Wrestling' },
    { state: 'Maharashtra', athletes: 40, avgScore: 85.6, topSport: 'Basketball' },
    { state: 'Karnataka', athletes: 29, avgScore: 83.9, topSport: 'Football' },
    { state: 'Gujarat', athletes: 22, avgScore: 82.5, topSport: 'Swimming' },
    { state: 'Jharkhand', athletes: 19, avgScore: 87.1, topSport: 'Archery' },
    { state: 'Punjab', athletes: 27, avgScore: 84.0, topSport: 'Athletics' },
  ];

  return (
    <div className="bg-[#070D1E] text-slate-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 mb-1">
              <Shield className="w-3.5 h-3.5" />
              National Talent Scrutiny Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Scout & Federation Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Review candidate dossiers, verify federated tournament certificates, and advance promising grassroots talent along the national pipeline.
            </p>
          </div>

          {/* View Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'verification', label: `Certificates (${pendingCertificates.length})` },
              { id: 'scouting', label: 'Dossier Review' },
              { id: 'analytics', label: 'Regional Analytics' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3.5 py-2 rounded-xl font-medium transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { title: 'Total Registered', val: '8,420+', sub: 'Verified Athlete Pool', color: 'text-white' },
            { title: 'AI Assessments', val: '12,480', sub: 'Biomechanical Audits', color: 'text-amber-400' },
            { title: 'Pending Scrutiny', val: `${pendingCertificates.length}`, sub: 'Awaiting Verification', color: 'text-rose-400' },
            { title: 'Shortlisted Talent', val: '142', sub: 'Regional Academies', color: 'text-emerald-400' },
            { title: 'States Covered', val: '28 / 28', sub: 'Pan-India Reach', color: 'text-sky-400' },
          ].map((k, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-2 hover:border-slate-700 transition">
              <span className="text-xs uppercase font-medium text-slate-400 tracking-wider">{k.title}</span>
              <div className={`text-3xl font-black font-mono ${k.color}`}>{k.val}</div>
              <span className="text-[11px] text-slate-500 block pt-1">{k.sub}</span>
            </div>
          ))}
        </div>

      {/* TAB 1: Overview & Recent Activity */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky-400" />
                  Recent Registered Athletes
                </h3>
                <span className="text-xs text-slate-400 font-mono">Real-time sync</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Athlete</th>
                      <th className="py-2.5 px-3">Sport</th>
                      <th className="py-2.5 px-3">State</th>
                      <th className="py-2.5 px-3">AI Score</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-300">
                    {athletes.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-800/50 transition">
                        <td className="py-2.5 px-3 font-semibold text-white flex items-center gap-2">
                          <img
                            src={a.profilePhotoUrl}
                            alt=""
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span>{a.fullName}</span>
                        </td>
                        <td className="py-2.5 px-3 text-sky-400">{a.primarySport}</td>
                        <td className="py-2.5 px-3 text-slate-400">{a.state}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-400">
                          {a.overallScore}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {a.scoutingStatus}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedAthleteId(a.id);
                              setActiveTab('scouting');
                            }}
                            className="text-amber-400 hover:underline font-bold text-xs cursor-pointer"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                Certificate Verification Queue
              </h3>

              {pendingCertificates.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">
                  All submitted certificates have been audited!
                </p>
              ) : (
                <div className="space-y-3">
                  {pendingCertificates.slice(0, 3).map((c) => (
                    <div key={c.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-white">{c.title}</div>
                      <div className="text-[11px] text-slate-400">{c.issuingOrganization}</div>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => handleVerifyCertificate(c.id, 'Verified')}
                          className="px-2.5 py-1 rounded bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-500"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleVerifyCertificate(c.id, 'Rejected')}
                          className="px-2.5 py-1 rounded bg-rose-600 text-white font-bold text-[10px] hover:bg-rose-500"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Certificate Verification Detail */}
      {activeTab === 'verification' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Tournament Certificates Scrutiny</h3>
              <p className="text-xs text-slate-400">
                Cross-verify state and district championship certificates with official state sports council registrars.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400">
              {pendingCertificates.length} Pending Actions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert) => {
              const ath = store.getAthlete(cert.athleteId);
              return (
                <div
                  key={cert.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        {cert.category}
                      </span>
                      <h4 className="text-xs font-bold text-white mt-0.5">{cert.title}</h4>
                      <p className="text-[11px] text-slate-400">{cert.issuingOrganization}</p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        cert.verificationStatus === 'Verified'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : cert.verificationStatus === 'Rejected'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {cert.verificationStatus}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 flex items-center justify-between">
                    <span>Athlete: <strong className="text-white">{ath?.fullName || 'Candidate'}</strong></span>
                    <span>Date: {cert.issueDate}</span>
                  </div>

                  {cert.verificationStatus === 'Pending' ? (
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleVerifyCertificate(cert.id, 'Verified')}
                        className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
                      >
                        Verify & Approve
                      </button>
                      <button
                        onClick={() => handleVerifyCertificate(cert.id, 'Rejected')}
                        className="flex-1 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="text-[10px] text-slate-400 italic bg-slate-900 p-2 rounded-lg">
                      Audited by: {cert.verifiedBy || 'National Scrutiny Cell'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Dossier Review & Scouting Timeline Manager */}
      {activeTab === 'scouting' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Athlete Selector */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
              <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                Select Candidate
              </span>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {athletes.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => setSelectedAthleteId(a.id)}
                    className={`p-3 rounded-xl border transition cursor-pointer flex items-center gap-3 ${
                      selectedAthlete.id === a.id
                        ? 'bg-amber-500/15 border-amber-500/40 text-white'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <img
                      src={a.profilePhotoUrl}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{a.fullName}</div>
                      <div className="text-[10px] text-slate-400">
                        {a.primarySport} • {a.state}
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {a.overallScore}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Dossier Detail & Actions */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedAthlete.profilePhotoUrl}
                    alt=""
                    className="w-14 h-14 rounded-xl object-cover ring-1 ring-slate-700"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedAthlete.fullName}</h3>
                    <div className="text-xs text-slate-400">
                      {selectedAthlete.primarySport} • {selectedAthlete.district}, {selectedAthlete.state}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">
                    Current Scouting Stage
                  </span>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">
                    {selectedAthlete.scoutingStatus}
                  </div>
                </div>
              </div>

              {/* Advance Scouting Pipeline Buttons */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                  Advance Candidate Pipeline Status:
                </span>
                <div className="flex flex-wrap gap-2">
                  {SCOUTING_STATUSES.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        selectedAthlete.scoutingStatus === status
                          ? 'bg-amber-500 text-slate-950 shadow-md'
                          : 'bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Official Scout Note */}
              <form onSubmit={handleAddScoutNote} className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold text-sky-400 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Add Confidential Scout Note
                  </span>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-slate-400">Rating:</span>
                    <select
                      value={scoutRating}
                      onChange={(e) => setScoutRating(Number(e.target.value))}
                      className="bg-slate-950 text-amber-400 font-bold border border-slate-800 rounded px-2 py-0.5"
                    >
                      <option value={5}>5 ★ Elite Talent</option>
                      <option value={4}>4 ★ Strong Potential</option>
                      <option value={3}>3 ★ Developing</option>
                    </select>
                  </div>
                </div>

                <textarea
                  rows={3}
                  value={scoutNoteText}
                  onChange={(e) => setScoutNoteText(e.target.value)}
                  placeholder="Record observations regarding explosive power, sprint cadence, joint symmetry, mental composure..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                />

                <div className="flex items-center justify-between">
                  <select
                    value={scoutRec}
                    onChange={(e) => setScoutRec(e.target.value as typeof scoutRec)}
                    className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-3 py-1.5 text-xs"
                  >
                    <option value="Fast-Track National Camp">Fast-Track National Camp</option>
                    <option value="Regional Development">Regional Development</option>
                    <option value="Monitor Progress">Monitor Progress</option>
                    <option value="Needs Technical Refinement">Needs Technical Refinement</option>
                  </select>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition cursor-pointer"
                  >
                    Save Scout Note
                  </button>
                </div>
              </form>

              {/* Existing Scout Notes */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <span className="text-xs uppercase font-bold text-slate-400">Recorded Scout Notes:</span>
                {store.getScoutNotes(selectedAthlete.id).length === 0 ? (
                  <p className="text-xs text-slate-500">No notes recorded yet for this athlete.</p>
                ) : (
                  store.getScoutNotes(selectedAthlete.id).map((n) => (
                    <div key={n.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{n.scoutName} ({n.scoutRole})</span>
                        <span className="text-amber-400 font-bold">{n.rating} ★</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">{n.note}</p>
                      <div className="text-[10px] text-emerald-400 font-semibold pt-1">
                        Recommendation: {n.recommendation}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Regional Analytics */}
      {activeTab === 'analytics' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                National Grassroots Talent Distribution (Pan-India)
              </h3>
              <p className="text-xs text-slate-400">
                Aggregated performance metrics and scouting density across Indian States
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stateStats.map((item) => (
              <div key={item.state} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{item.state}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono">
                    {item.athletes} Talents
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black font-mono text-emerald-400">{item.avgScore}</span>
                  <span className="text-[10px] text-slate-500">avg score</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Leading Sport: <strong className="text-sky-300">{item.topSport}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

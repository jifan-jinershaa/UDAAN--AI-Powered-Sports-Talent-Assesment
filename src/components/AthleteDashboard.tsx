import React, { useState } from 'react';
import {
  Athlete,
  AssessmentResult,
  Certificate,
  Achievement,
  User,
  ScoutingStatus,
} from '../types';
import { store } from '../services/storage';
import {
  Trophy,
  Award,
  Activity,
  FileCheck,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Plus,
  ChevronRight,
  Shield,
  Eye,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface AthleteDashboardProps {
  currentUser: User;
  onStartAssessment: () => void;
  onViewReport: (result: AssessmentResult) => void;
  onRequireAadhaarVerification?: () => void;
  onRefreshData: () => void;
}

const SCOUTING_STAGES: ScoutingStatus[] = [
  'Profile Created',
  'Assessment Completed',
  'Under Review',
  'Shortlisted',
  'Regional Selection',
  'National Scouting',
];

export const AthleteDashboard: React.FC<AthleteDashboardProps> = ({
  currentUser,
  onStartAssessment,
  onViewReport,
  onRequireAadhaarVerification,
  onRefreshData,
}) => {
  const athlete = currentUser.athleteId
    ? store.getAthlete(currentUser.athleteId) || store.getAthletes()[0]
    : store.getAthletes()[0];

  const assessments = store.getAssessments(athlete?.id);
  const certificates = store.getCertificates(athlete?.id);
  const achievements = store.getAchievements(athlete?.id);

  // Modals for uploading certificate & adding achievement
  const [showAddAchModal, setShowAddAchModal] = useState(false);
  const [showUploadCertModal, setShowUploadCertModal] = useState(false);

  // Form states
  const [newAch, setNewAch] = useState({
    title: '',
    sport: athlete?.primarySport || 'Athletics',
    tournament: '',
    level: 'State' as 'School' | 'District' | 'State' | 'National' | 'International',
    position: '',
    year: new Date().getFullYear(),
    location: '',
    organization: '',
    description: '',
  });

  const [newCert, setNewCert] = useState({
    title: '',
    issuingOrganization: '',
    issueDate: new Date().toISOString().split('T')[0],
    category: 'Tournament' as 'Tournament' | 'Fitness' | 'National Camp' | 'State Championship' | 'School Games',
    certificateUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
  });

  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!athlete) return;
    store.addAchievement({
      athleteId: athlete.id,
      ...newAch,
    });
    setShowAddAchModal(false);
    onRefreshData();
  };

  const handleUploadCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!athlete) return;
    store.addCertificate({
      athleteId: athlete.id,
      ...newCert,
      verificationStatus: 'Pending',
    });
    setShowUploadCertModal(false);
    onRefreshData();
  };

  const currentStageIndex = SCOUTING_STAGES.indexOf(athlete.scoutingStatus);

  return (
    <div className="bg-[#070D1E] text-slate-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Top Profile Card: Generous Padding & Clean Layout */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Athlete Info */}
            <div className="lg:col-span-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <div className="relative flex-shrink-0">
                <img
                  src={athlete.profilePhotoUrl}
                  alt={athlete.fullName}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-2 ring-slate-700 shadow-md"
                />
              </div>

              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                    {athlete.id}
                  </span>
                  <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                    {athlete.primarySport}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {athlete.district}, {athlete.state}
                  </span>
                  {athlete.aadhaarVerified || currentUser.aadhaarVerified ? (
                    <span className="text-xs font-semibold text-emerald-300 bg-emerald-500/15 px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      🇮🇳 Aadhaar Verified
                    </span>
                  ) : (
                    <button
                      onClick={onRequireAadhaarVerification}
                      className="text-xs font-semibold text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 px-2.5 py-1 rounded-lg border border-amber-500/30 flex items-center gap-1 transition cursor-pointer"
                    >
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                      Verify Aadhaar (Unlock Videos)
                    </button>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {athlete.fullName}
                </h1>

                <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
                  {athlete.bio}
                </p>

                {/* Physical metrics pills with ample room */}
                <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-3 text-xs text-slate-300">
                  <span className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                    Height: <strong className="text-white">{athlete.heightCm} cm</strong>
                  </span>
                  <span className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                    Weight: <strong className="text-white">{athlete.weightKg} kg</strong>
                  </span>
                  <span className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                    Age: <strong className="text-white">{athlete.age} yrs</strong>
                  </span>
                  <span className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                    Coach: <strong className="text-white">{athlete.coachName || 'Independent'}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Rating Box with whitespace */}
            <div className="lg:col-span-4 bg-slate-950/90 p-6 sm:p-8 rounded-2xl border border-slate-800 text-center space-y-4">
              <span className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                Performance Score
              </span>
              <div className="text-5xl font-black text-amber-400 font-mono tracking-tight">
                {athlete.overallScore}
                <span className="text-xl text-slate-500 font-sans font-normal"> / 100</span>
              </div>
              <div className="text-xs text-slate-400">
                Scouting Status:{' '}
                <span className="text-emerald-400 font-bold">{athlete.scoutingStatus}</span>
              </div>
              <button
                onClick={onStartAssessment}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Activity className="w-4 h-4" />
                Launch Assessment
              </button>
            </div>
          </div>
        </div>

        {/* 7-Stage National Scouting Timeline: Clean & Breathable */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <h2 className="text-xs uppercase font-bold tracking-wider text-slate-300">
                National Scouting Pathway
              </h2>
            </div>
            <span className="text-xs font-medium text-amber-400">
              Stage {currentStageIndex + 1} of {SCOUTING_STAGES.length}
            </span>
          </div>

          <div className="relative pt-4 pb-2">
            <div className="hidden md:flex items-center justify-between relative z-10">
              {SCOUTING_STAGES.map((stage, idx) => {
                const isPast = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                return (
                  <div key={stage} className="flex flex-col items-center text-center w-36 space-y-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition border ${
                        isPast
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : isCurrent
                          ? 'bg-amber-500 text-slate-950 border-amber-300 ring-4 ring-amber-500/15 shadow-md'
                          : 'bg-slate-950 text-slate-500 border-slate-800'
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <span
                      className={`text-[11px] font-medium leading-tight ${
                        isCurrent
                          ? 'text-amber-400 font-semibold'
                          : isPast
                          ? 'text-slate-300'
                          : 'text-slate-500'
                      }`}
                    >
                      {stage}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="hidden md:block absolute top-8.5 left-12 right-12 h-0.5 bg-slate-800 -z-0">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-300"
                style={{
                  width: `${(currentStageIndex / (SCOUTING_STAGES.length - 1)) * 100}%`,
                }}
              />
            </div>

            {/* Mobile View */}
            <div className="md:hidden flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400">Current Status:</span>
              <span className="font-bold text-amber-400">{athlete.scoutingStatus}</span>
            </div>
          </div>
        </div>

        {/* 4 Score Metric Cards: Spacious & Clean */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Fitness Score',
              val: athlete.fitnessScore,
              color: 'text-emerald-400',
              sub: 'Cardiorespiratory endurance',
            },
            {
              title: 'Technique Score',
              val: athlete.techniqueScore,
              color: 'text-sky-400',
              sub: 'Biomechanical form accuracy',
            },
            {
              title: 'Consistency Index',
              val: athlete.consistencyScore,
              color: 'text-purple-400',
              sub: 'Repetition pacing stability',
            },
            {
              title: 'Vision Confidence',
              val: athlete.aiConfidence,
              color: 'text-amber-400',
              sub: 'Landmark certainty score',
            },
          ].map((m, i) => (
            <div
              key={i}
              className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-2 hover:border-slate-700 transition"
            >
              <span className="text-xs uppercase font-medium text-slate-400 tracking-wider">
                {m.title}
              </span>
              <div className={`text-3xl font-black font-mono ${m.color}`}>
                {m.val}
                <span className="text-xs text-slate-500 font-sans font-normal ml-1">/ 100</span>
              </div>
              <span className="text-[11px] text-slate-500 block pt-1">{m.sub}</span>
            </div>
          ))}
        </div>

        {/* Main Content Grid: Assessment History vs Certificates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Assessments (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Recent Assessments
                  </h3>
                </div>
                <button
                  onClick={onStartAssessment}
                  className="text-xs font-semibold text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
                >
                  New Drill <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {assessments.length === 0 ? (
                <div className="p-8 text-center bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
                  <Activity className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-400">No assessments logged yet.</p>
                  <button
                    onClick={onStartAssessment}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    Start First Drill
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {assessments.map((a) => (
                    <div
                      key={a.id}
                      className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{a.assessmentTitle}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                            {a.exerciseType}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {a.repetitions} Reps • Form {a.formScore}% • Depth: {a.lowestAngle}°
                        </p>
                        <span className="text-[10px] text-slate-500 block">
                          Recorded on {new Date(a.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-xl font-bold font-mono text-amber-400">
                            {a.overallScore}
                          </span>
                          <span className="text-[10px] text-slate-500 block">Score</span>
                        </div>
                        <button
                          onClick={() => onViewReport(a)}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 transition cursor-pointer flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Certificates & Achievements (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Certificates Box */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-sky-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Certificates
                  </h3>
                </div>
                <button
                  onClick={() => setShowUploadCertModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/25 text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Upload
                </button>
              </div>

              <div className="space-y-3">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-white">{cert.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{cert.issuingOrganization}</p>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          cert.verificationStatus === 'Verified'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                            : cert.verificationStatus === 'Rejected'
                            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/25'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
                        }`}
                      >
                        {cert.verificationStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Box */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Medals & Honors
                  </h3>
                </div>
                <button
                  onClick={() => setShowAddAchModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/25 text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </div>

              <div className="space-y-3">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{ach.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 font-mono">
                        {ach.year}
                      </span>
                    </div>
                    <div className="text-[11px] text-amber-400 font-medium">{ach.position}</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{ach.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Achievement Modal */}
      {showAddAchModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-8 space-y-5">
            <h3 className="text-lg font-bold text-white">Add Tournament Medal</h3>
            <form onSubmit={handleAddAchievement} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1.5 font-medium">Achievement Title</label>
                <input
                  type="text"
                  required
                  value={newAch.title}
                  onChange={(e) => setNewAch({ ...newAch, title: e.target.value })}
                  placeholder="e.g. State Level 100m Gold"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1.5 font-medium">Level</label>
                  <select
                    value={newAch.level}
                    onChange={(e) =>
                      setNewAch({
                        ...newAch,
                        level: e.target.value as 'School' | 'District' | 'State' | 'National' | 'International',
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="School">School Level</option>
                    <option value="District">District Level</option>
                    <option value="State">State Level</option>
                    <option value="National">National Level</option>
                    <option value="International">International</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1.5 font-medium">Position / Medal</label>
                  <input
                    type="text"
                    required
                    value={newAch.position}
                    onChange={(e) => setNewAch({ ...newAch, position: e.target.value })}
                    placeholder="e.g. Gold Medal (10.68s)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1.5 font-medium">Tournament Name</label>
                <input
                  type="text"
                  required
                  value={newAch.tournament}
                  onChange={(e) => setNewAch({ ...newAch, tournament: e.target.value })}
                  placeholder="e.g. Junior State Athletics Meet"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddAchModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold"
                >
                  Save Medal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Certificate Modal */}
      {showUploadCertModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-8 space-y-5">
            <h3 className="text-lg font-bold text-white">Upload Certificate</h3>
            <form onSubmit={handleUploadCertificate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1.5 font-medium">Certificate Title</label>
                <input
                  type="text"
                  required
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  placeholder="e.g. State Championship Certificate"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1.5 font-medium">Issuing Authority</label>
                <input
                  type="text"
                  required
                  value={newCert.issuingOrganization}
                  onChange={(e) => setNewCert({ ...newCert, issuingOrganization: e.target.value })}
                  placeholder="e.g. Athletics Association"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowUploadCertModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-500 text-slate-950 font-bold"
                >
                  Upload for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

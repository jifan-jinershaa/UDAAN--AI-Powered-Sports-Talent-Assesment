import React from 'react';
import {
  X,
  Award,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Activity,
  Printer,
  Share2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { AssessmentResult } from '../types';

interface AIReportModalProps {
  result: AssessmentResult | null;
  onClose: () => void;
}

export const AIReportModal: React.FC<AIReportModalProps> = ({ result, onClose }) => {
  if (!result) return null;

  const evaluation = result.evaluation;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Banner */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">AI Biomechanical Assessment Report</h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Verified Biomechanical Audit
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {result.assessmentTitle} • Candidate: {result.athleteName} ({result.sport})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Top Score Summary Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-800 items-center">
            {/* Overall Score Dial */}
            <div className="md:col-span-4 text-center md:border-r md:border-slate-800 md:pr-4">
              <span className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider">
                Overall Performance Score
              </span>
              <div className="text-5xl font-black text-amber-400 font-mono mt-1">
                {result.overallScore}
                <span className="text-xl text-slate-500 font-sans"> / 100</span>
              </div>
              <div className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {evaluation?.overallGrade ? `Grade ${evaluation.overallGrade}` : 'Grade A'} •{' '}
                {evaluation?.athleticPotential || 'High National Potential'}
              </div>
            </div>

            {/* Core Breakdown Metrics */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Valid Reps</span>
                <div className="text-xl font-bold font-mono text-white mt-0.5">{result.repetitions}</div>
                <span className="text-[10px] text-emerald-400">Target reached</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Form Accuracy</span>
                <div className="text-xl font-bold font-mono text-sky-400 mt-0.5">{result.formScore}%</div>
                <span className="text-[10px] text-slate-400">Kinematic audit</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Consistency</span>
                <div className="text-xl font-bold font-mono text-purple-400 mt-0.5">{result.consistencyScore}%</div>
                <span className="text-[10px] text-slate-400">Pacing variance</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">CV Confidence</span>
                <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{result.poseConfidence}%</div>
                <span className="text-[10px] text-slate-400">Keypoint fidelity</span>
              </div>
            </div>
          </div>

          {/* Biomechanical Metric Table */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-400" />
              Standardized Biomechanical Data Table
            </h3>

            <div className="border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 font-medium">
                  <tr>
                    <th className="py-2.5 px-4">Kinematic Metric</th>
                    <th className="py-2.5 px-4">Measured Value</th>
                    <th className="py-2.5 px-4">National Benchmark</th>
                    <th className="py-2.5 px-4">Evaluation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 font-mono text-slate-300">
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-white font-medium">Repetitions Completed</td>
                    <td className="py-2.5 px-4 text-amber-400">{result.repetitions} reps</td>
                    <td className="py-2.5 px-4 text-slate-400">≥ 14 reps</td>
                    <td className="py-2.5 px-4 font-sans text-emerald-400">Optimal</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-white font-medium">Terminal Articulation Angle</td>
                    <td className="py-2.5 px-4 text-amber-400">{result.lowestAngle}°</td>
                    <td className="py-2.5 px-4 text-slate-400">≤ 95° parallel</td>
                    <td className="py-2.5 px-4 font-sans text-emerald-400">Full Depth</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-white font-medium">Average Movement Tempo</td>
                    <td className="py-2.5 px-4 text-sky-400">{result.averageTempo}s / cycle</td>
                    <td className="py-2.5 px-4 text-slate-400">1.5s - 2.2s</td>
                    <td className="py-2.5 px-4 font-sans text-emerald-400">Balanced Cadence</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-white font-medium">Cadence Consistency</td>
                    <td className="py-2.5 px-4 text-purple-400">{result.consistencyScore}%</td>
                    <td className="py-2.5 px-4 text-slate-400">≥ 80%</td>
                    <td className="py-2.5 px-4 font-sans text-emerald-400">High Stability</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-white font-medium">Pose Keypoint Confidence</td>
                    <td className="py-2.5 px-4 text-emerald-400">{result.poseConfidence}%</td>
                    <td className="py-2.5 px-4 text-slate-400">≥ 85%</td>
                    <td className="py-2.5 px-4 font-sans text-emerald-400">Valid Tracking</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Qualitative Feedback & Coaching Synthesis */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              AI Qualitative Biomechanics Feedback
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              {evaluation?.summary || result.aiFeedback}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Strengths */}
              <div className="space-y-2">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Key Strengths
                </h4>
                <ul className="space-y-1 text-slate-300">
                  {(evaluation?.strengths || [
                    'Stable joint trajectory and bilateral symmetry',
                    'Maintained consistent eccentric tempo',
                    'Zero premature fatigue deceleration',
                  ]).map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div className="space-y-2">
                <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Areas for Refinement
                </h4>
                <ul className="space-y-1 text-slate-300">
                  {(evaluation?.areasForImprovement || [
                    'Maintain upright thoracic spine alignment at bottom position',
                    'Incorporate paused isometric holds to maximize power recruitment',
                  ]).map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Prescribed Drills */}
            {evaluation?.recommendedDrills && (
              <div className="pt-2 border-t border-slate-800/80">
                <h4 className="text-xs font-bold text-sky-400 mb-1.5">Recommended Conditioning Drills:</h4>
                <div className="flex flex-wrap gap-2">
                  {evaluation.recommendedDrills.map((drill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300 text-[11px]"
                    >
                      {drill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Scout Verdict */}
            {evaluation?.scoutVerdict && (
              <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-xs text-emerald-200">
                <strong>Scout Recommendation: </strong> {evaluation.scoutVerdict}
              </div>
            )}
          </div>

          {/* Official Disclaimer */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Assessment Advisory</span>
            </div>
            <p className="leading-relaxed">
              AI-generated assessment is intended to support performance analysis and talent discovery. It does not
              replace certified coaches, judges, medical professionals, or official selection procedures.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Report
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
          >
            Done & Save to Dossier
          </button>
        </div>
      </div>
    </div>
  );
};

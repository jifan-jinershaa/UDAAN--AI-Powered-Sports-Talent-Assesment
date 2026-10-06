import React from 'react';
import {
  Cpu,
  Activity,
  CheckCircle2,
  TrendingUp,
  Award,
  ShieldCheck,
  Zap,
  ArrowRight,
  Eye,
  Layers,
} from 'lucide-react';

interface FeaturesPageProps {
  onStartAssessment: () => void;
  onExploreTalent: () => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({
  onStartAssessment,
  onExploreTalent,
}) => {
  return (
    <div className="bg-[#070D1E] text-slate-100 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-24">
        {/* Header Hero */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-amber-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>Biomechanical Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Scientific Movement Analysis
          </h1>

          <p className="text-base text-slate-400 leading-relaxed font-normal">
            How UDAAN converts standard smartphone video into verifiable biomechanical performance metrics for athletes and scouts.
          </p>
        </div>

        {/* Feature Grid: 4 Spacious Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Feature 1 */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Eye className="w-6 h-6 stroke-[2]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                01 • Pose Estimation
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                13-Point Kinematic Landmark Tracking
              </h2>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Real-time computer vision isolates key anatomical landmarks across the head, shoulders, elbows, wrists, hips, knees, and ankles at 60 FPS without external hardware.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-slate-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Runs smoothly inside any modern mobile web browser</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Adaptive aspect-ratio scaling for optimal processing throughput</span>
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Activity className="w-6 h-6 stroke-[2]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                02 • Angular Math
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Trigonometric Joint Articulation
              </h2>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Calculates exact interior joint angles (e.g. knee flexion angle in squats or elbow articulation in push-ups) using vector dot products to ensure full range of motion.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-slate-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Sub-pixel precision calculation: θ = arccos(u · v / |u||v|)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Real-time color-coded visual feedback arcs on joints</span>
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                03 • Integrity
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Finite State Machine Repetition Counting
              </h2>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Eliminates false counts. A repetition is only credited when the athlete completes the entire 4-phase kinetic cycle: Upright Lockout → Descent → Terminal Depth → Concentric Ascent.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-slate-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Audits shallow repetitions and incomplete extensions</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Instant audio feedback cues upon reaching valid depth</span>
              </li>
            </ul>
          </div>

          {/* Feature 4 */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6 hover:border-slate-700 transition">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Award className="w-6 h-6 stroke-[2]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                04 • Talent Reports
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                AI Biomechanical Synthesis
              </h2>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Transforms numerical angles into comprehensive qualitative coaching reports. Analyzes cadence consistency, identifies movement flaws, and recommends periodized training drills.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-slate-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Objective performance score out of 100</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Directly visible to verified national coaches & federation scouts</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to action section */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Test Your Biomechanical Form?
          </h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Choose between standard squat and push-up drills using your device camera or an instant benchmark video demonstration.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={onStartAssessment}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              Launch Assessment Center
            </button>
            <button
              onClick={onExploreTalent}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-medium text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Browse Talent Pool
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Shield, Target, Trophy, Users, CheckCircle, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onStartAssessment: () => void;
  onExploreTalent: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onStartAssessment,
  onExploreTalent,
}) => {
  return (
    <div className="bg-[#070D1E] text-slate-100 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-24">
        {/* Header Hero */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-amber-400">
            <Trophy className="w-3.5 h-3.5" />
            <span>National Vision</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            About UDAAN
          </h1>

          <p className="text-base text-slate-400 leading-relaxed font-normal">
            Building an open, objective, and data-driven sports talent ecosystem for every aspiring athlete in India.
          </p>
        </div>

        {/* Narrative Grid: Two Spacious Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Card 1: The Challenge */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Target className="w-6 h-6 stroke-[2]" />
            </div>

            <h2 className="text-2xl font-bold text-white">The Grassroots Challenge</h2>

            <p className="text-sm text-slate-400 leading-relaxed">
              India possesses immense athletic talent across its 700+ districts. However, traditional scouting relies heavily on physical presence at centralized trials, often inaccessible to athletes from rural and tier-2/3 towns due to travel costs and lack of infrastructure.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Talented runners, jumpers, and players often train on mud tracks and community fields without verifiable evidence of their physical potential.
            </p>
          </div>

          {/* Card 2: The Digital Solution */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Shield className="w-6 h-6 stroke-[2]" />
            </div>

            <h2 className="text-2xl font-bold text-white">The Biomechanical Bridge</h2>

            <p className="text-sm text-slate-400 leading-relaxed">
              UDAAN leverages advanced computer vision to turn any smartphone into a biomechanical motion lab. Athletes record standardized fitness protocols that are mathematically analyzed for joint angles, form depth, and cadence consistency.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              The verified data feeds directly into a national scouting dashboard, giving certified observers objective performance metrics to identify future champions.
            </p>
          </div>
        </div>

        {/* Core Principles: 3 Minimalist Pillars */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Our Core Commitments</h3>
            <p className="text-sm text-slate-400">Principles that guide our technological and athletic framework.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Radical Accessibility',
                desc: 'Zero costly sensors or wearable hardware required. Works on accessible mobile web browsers with standard cameras.',
              },
              {
                title: 'Mathematical Objectivity',
                desc: 'Standardized angles and algorithmic state machines eliminate subjective bias and geographic favoritism.',
              },
              {
                title: 'Empowered Athletes',
                desc: 'Athletes own their verified digital dossiers, tournament certificate logs, and progression history.',
              },
            ].map((p, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 space-y-3">
                <span className="text-xs font-mono font-bold text-amber-400">0{idx + 1}</span>
                <h4 className="text-base font-bold text-white">{p.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action strip */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-5 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white">Join the Talent Movement</h3>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            Whether you are an athlete seeking assessment or a scout discovering potential, UDAAN is designed for you.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={onStartAssessment}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Start Assessment
            </button>
            <button
              onClick={onExploreTalent}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-white font-medium text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Explore Talent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

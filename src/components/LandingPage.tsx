import React, { useEffect, useRef } from 'react';
import {
  Activity,
  ArrowRight,
  Shield,
  Target,
  Sparkles,
  Users,
  Cpu,
  Award,
} from 'lucide-react';
import { SPORTS_LIST } from '../services/storage';

interface LandingPageProps {
  onStartAssessment: () => void;
  onExploreAthletes: () => void;
  onViewFeatures: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onExploreAthletes,
  onViewFeatures,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Minimalist animated Computer Vision Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Soft minimal grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Smooth squat cycle phase
      const phase = 0.5 - 0.5 * Math.cos(t);
      const kneeFlex = 175 - phase * 85;

      const centerX = w * 0.5;
      const headY = h * 0.22 + phase * 45;
      const shoulderY = h * 0.32 + phase * 45;
      const hipY = h * 0.52 + phase * 55;
      const kneeY = h * 0.68 + phase * 20;
      const ankleY = h * 0.86;

      const landmarks = [
        { id: 'Head', x: centerX, y: headY },
        { id: 'L-Shoulder', x: centerX - 40, y: shoulderY },
        { id: 'R-Shoulder', x: centerX + 40, y: shoulderY },
        { id: 'L-Elbow', x: centerX - 54, y: shoulderY + 34 },
        { id: 'R-Elbow', x: centerX + 54, y: shoulderY + 34 },
        { id: 'L-Wrist', x: centerX - 42, y: shoulderY + 68 },
        { id: 'R-Wrist', x: centerX + 42, y: shoulderY + 68 },
        { id: 'L-Hip', x: centerX - 30, y: hipY },
        { id: 'R-Hip', x: centerX + 30, y: hipY },
        { id: 'L-Knee', x: centerX - (36 + phase * 14), y: kneeY },
        { id: 'R-Knee', x: centerX + (36 + phase * 14), y: kneeY },
        { id: 'L-Ankle', x: centerX - 34, y: ankleY },
        { id: 'R-Ankle', x: centerX + 34, y: ankleY },
      ];

      // Kinematic connections
      const bones: [number, number][] = [
        [0, 1], [0, 2], [1, 2],
        [1, 3], [3, 5],
        [2, 4], [4, 6],
        [1, 7], [2, 8], [7, 8],
        [7, 9], [9, 11],
        [8, 10], [10, 12],
      ];

      // Clean lines
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#38bdf8';
      bones.forEach(([i1, i2]) => {
        const p1 = landmarks[i1];
        const p2 = landmarks[i2];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Keypoints
      landmarks.forEach((pt, idx) => {
        const isKnee = idx === 9 || idx === 10;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isKnee ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isKnee ? '#f59e0b' : '#38bdf8';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Joint Angle Tag
      const kneePt = landmarks[9];
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.beginPath();
      ctx.roundRect(kneePt.x - 66, kneePt.y - 12, 54, 24, 6);
      ctx.fill();
      ctx.strokeStyle = kneeFlex <= 95 ? '#10b981' : '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(`${Math.round(kneeFlex)}°`, kneePt.x - 52, kneePt.y + 4);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="bg-[#070D1E] text-slate-100 min-h-screen">
      {/* Hero Section: Clean & Essential Above the Fold */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Soft Background Radial Light */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[340px] bg-sky-500/8 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Next-Generation Sports Biomechanics</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                  Discover Talent.{' '}
                  <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                    Measure Potential.
                  </span>{' '}
                  Represent India.
                </h1>

                <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  Democratizing athletic talent scouting. Computer vision assesses biomechanical form, joint angles, and movement quality directly from any camera.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onStartAssessment}
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/15 transition duration-150 flex items-center gap-2.5 cursor-pointer"
                >
                  <Activity className="w-4 h-4 stroke-[2.4]" />
                  Start Assessment
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onExploreAthletes}
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-semibold text-sm transition duration-150 flex items-center gap-2 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-sky-400" />
                  Explore Talent Pool
                </button>

                <button
                  onClick={onViewFeatures}
                  className="px-5 py-3.5 rounded-xl text-slate-400 hover:text-white font-medium text-xs transition duration-150 cursor-pointer"
                >
                  Learn How It Works →
                </button>
              </div>

              {/* Minimal Numbers Strip */}
              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-2xl font-bold text-white font-mono">13</div>
                  <div className="text-xs text-slate-500 mt-0.5">Olympic Sports</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400 font-mono">13-Pt</div>
                  <div className="text-xs text-slate-500 mt-0.5">Pose Kinematics</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-400 font-mono">Real-Time</div>
                  <div className="text-xs text-slate-500 mt-0.5">Angle Analysis</div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Interactive Pose Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[420px] rounded-3xl bg-slate-900/70 border border-slate-800 p-3 shadow-2xl backdrop-blur-md">
                <div className="px-4 py-2.5 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-medium text-slate-300">Live Pose Kinematics</span>
                  </div>
                  <span className="font-mono text-[11px] text-sky-400">FPS: 60</span>
                </div>

                <div className="relative bg-[#050A18] rounded-2xl overflow-hidden my-2 flex items-center justify-center">
                  <canvas
                    ref={canvasRef}
                    width={380}
                    height={380}
                    className="w-full h-[340px] sm:h-[360px] object-contain"
                  />
                </div>

                <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-400">
                  <span>Trigonometric Joint Articulation</span>
                  <span className="text-amber-400 font-medium">Standardized Drills</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars: Clean, Spacious, No Text Walls */}
      <section className="py-24 border-t border-slate-800/80 bg-[#060B1A]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Modern Sports Technology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A Direct Pathway from Grassroots to National Camps
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Standardized physical testing delivered via smartphone cameras, removing geographic barriers for every athlete.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: 'Computer Vision Analysis',
                desc: 'Sub-pixel landmark tracking detects body joints and calculates precise angles without costly hardware.',
                accent: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
              },
              {
                icon: Activity,
                title: 'Objective Movement Metrics',
                desc: 'Finite state machines track repetition stages, depth compliance, cadence rhythm, and bilateral symmetry.',
                accent: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
              },
              {
                icon: Award,
                title: 'Federation Scouting Dossier',
                desc: 'Certified profiles with video evidence, medal logs, and AI performance reports connect directly with scouts.',
                accent: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-5 hover:border-slate-700 transition"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${card.accent}`}>
                  <card.icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-lg font-bold text-white">{card.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-normal">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Disciplines Strip */}
      <section className="py-20 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Disciplines
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Supported Olympic & National Sports
              </h2>
            </div>
            <button
              onClick={onExploreAthletes}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition flex items-center gap-1 cursor-pointer"
            >
              Browse all categories →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {SPORTS_LIST.slice(0, 6).map((sport) => (
              <div
                key={sport}
                onClick={onExploreAthletes}
                className="bg-slate-900/40 hover:bg-slate-850 border border-slate-800 rounded-2xl p-5 text-center transition group cursor-pointer space-y-3"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-slate-800 group-hover:bg-amber-500/20 text-slate-300 group-hover:text-amber-400 flex items-center justify-center transition">
                  <Target className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition block">
                  {sport}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

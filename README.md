# UDAAN — AI-Powered Sports Talent Assessment Platform
> **"Discover Talent. Measure Potential. Represent India."**  
> *A high-performance digital platform democratizing athletic scouting and biomechanical movement analysis.*

---

## 📌 Executive Summary
**UDAAN** is a national-grade digital sports technology platform designed to bridge the grassroots scouting divide across rural areas, tier-2, and tier-3 regions in India. Athletes record or stream standardized movement drills (Squats, Push-ups, Vertical Jumps) via mobile or web cameras. The platform's client-side & server-side Computer Vision engine extracts 13 key body landmarks, computes vector trigonometric angles in real time, executes a 4-phase finite state machine for repetition verification, and produces AI-assisted biomechanical scouting reports powered by Gemini 2.5 Flash.

---

## 🏗️ Architecture & Technology Stack

```
           [ Mobile / Web User Video Stream ]
                          │
                          ▼
           [ Real-Time Computer Vision Engine ]
            • HTML5 Canvas & WebRTC (Browser)
            • 13-Point Keypoint Landmark Localization
            • Trigonometric Joint Angles (Vector Dot Product)
            • 4-Phase Finite State Machine (Upright -> Descent -> Parallel -> Concentric)
                          │
                          ▼
          [ Standardized Biomechanical Metrics ]
            • Repetition Count & Cadence (Tempo)
            • Maximum Flexion Depth (e.g., ≤ 95° Knee Angle)
            • Bilateral Symmetry & Form Variance Index
                          │
                          ▼
             [ Gemini 2.5 Flash AI Engine ]
            • Biomechanical Movement Audit & Fault Detection
            • Prescribed Conditioning Drills
            • National Talent Rating & Potential Classification
                          │
                          ▼
           [ Role-Based Scouting & Admin Portal ]
            • 7-Stage National Scouting Pipeline
            • Side-by-Side Athlete Comparison Engine
            • Certificate Verification & Scrutiny
            • Pan-India Regional Distribution Analytics
```

### Stack Breakdown
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons, Canvas API, Web Audio API
- **Computer Vision**: OpenCV / MediaPipe Pose coordinate extraction, kinematic vector geometry, finite state machine
- **AI Synthesis**: Google GenAI SDK (`gemini-3.8-flash`) via server-side Express proxy (`/api/ai/analyze-assessment`)
- **Backend / Full-Stack**: Node.js, Express, tsx
- **Database Architecture**: PostgreSQL / Supabase Schema with Row Level Security (RLS) policies

---

## 📐 Mathematical Biomechanics Formulation

### 1. 3-Point Joint Articulation Angle
For vertex joint $B$ (e.g., Knee) between points $A$ (Hip) and $C$ (Ankle):
$$\vec{u} = A - B, \quad \vec{v} = C - B$$
$$\cos(\theta) = \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\| \|\vec{v}\|}$$
$$\theta = \arccos\left(\text{clamp}(\cos(\theta), -1, 1)\right) \times \frac{180^\circ}{\pi}$$

### 2. Squat State Machine
1. `STANDING`: $\theta > 160^\circ$ (Upright lockout)
2. `DESCENDING`: $\theta < 145^\circ$
3. `BOTTOM_PHASE`: $\theta \le 95^\circ$ (Parallel / sub-parallel depth achieved; triggers audio depth cue)
4. `ASCENDING`: $\theta > 115^\circ$
5. `LOCKOUT / COMPLETE`: $\theta \ge 160^\circ$ $\rightarrow$ Repetition count incremented + celebratory audio cue.

### 3. Cadence & Consistency Score
Measures standard deviation $\sigma$ across all repetition depth angles:
$$\text{Consistency} = \max\left(65, 100 - 2.2 \times \sigma\right)$$

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v18 or v20+)
- npm or yarn

### Steps
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env` (copy from `.env.example`):
   ```bash
   GEMINI_API_KEY="your-gemini-api-key"
   ```

3. Launch the full-stack server (runs Express on port 3000 with Vite middleware):
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000`.

---

## 🧪 Placement Demonstration Walkthrough
1. **Landing Page**: View hero banner with interactive real-time computer vision canvas, scanning laser sweep, and supported sports.
2. **AI Assessment Center**:
   - Choose **Benchmark Simulation** (instant 1-click test) or **Live WebCam** or **Upload MP4**.
   - Watch real-time joint articulation arcs, rep counter HUD, and audio beeps.
   - Click **"Complete & Generate AI Report"** to trigger Gemini 2.5 Flash analysis and review the comprehensive score card.
3. **Athlete Dossier**:
   - View Arjun Kumar's credentials, 7-stage scouting progress bar, verified state medals, and certificates.
   - Click **"+ Upload Certificate"** or **"+ Add Achievement"** to test persistent updates.
4. **Talent Discovery (Scout Portal)**:
   - Filter athletes by Sport, State (all 28 Indian states), Gender, and Score range.
   - Select multiple athletes and open **"Side-by-Side Athlete Comparison"**.
5. **Scout Admin Portal**:
   - Audit pending certificates (**Verify / Reject**).
   - Promote candidate along the 7-stage national pipeline.
   - Add official confidential scout notes.
6. **System Architecture Tab**:
   - Inspect the Python FastAPI + OpenCV `main.py` code, PostgreSQL schema, and technical interview talking points.

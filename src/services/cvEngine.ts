/**
 * UDAAN AI Biomechanics & Computer Vision Engine
 * National Sports Talent Assessment Platform
 */

export interface Point2D {
  x: number;
  y: number;
  score?: number;
}

export interface SkeletonLandmarks {
  nose: Point2D;
  leftShoulder: Point2D;
  rightShoulder: Point2D;
  leftElbow: Point2D;
  rightElbow: Point2D;
  leftWrist: Point2D;
  rightWrist: Point2D;
  leftHip: Point2D;
  rightHip: Point2D;
  leftKnee: Point2D;
  rightKnee: Point2D;
  leftAnkle: Point2D;
  rightAnkle: Point2D;
}

/**
 * Calculates the interior angle (in degrees) between three 2D points A -> B -> C,
 * where B is the vertex joint.
 */
export function calculateJointAngle(a: Point2D, b: Point2D, c: Point2D): number {
  const baX = a.x - b.x;
  const baY = a.y - b.y;
  const bcX = c.x - b.x;
  const bcY = c.y - b.y;

  const dot = baX * bcX + baY * bcY;
  const magBA = Math.sqrt(baX * baX + baY * baY);
  const magBC = Math.sqrt(bcX * bcX + bcY * bcY);

  if (magBA === 0 || magBC === 0) return 180;

  let cosAngle = dot / (magBA * magBC);
  // Numerical clamp between -1 and 1
  cosAngle = Math.max(-1, Math.min(1, cosAngle));

  const radians = Math.acos(cosAngle);
  return Math.round((radians * 180) / Math.PI);
}

/**
 * Audio cue synthesizer for rep counts and feedback
 */
class BiomechanicsAudioFeedback {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playRepBeep(frequency = 880, duration = 0.12) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay blocked or unsupported
    }
  }

  playDepthCue() {
    this.playRepBeep(520, 0.08);
  }
}

export const audioFeedback = new BiomechanicsAudioFeedback();

/**
 * Squat Assessment Tracker
 */
export class SquatBiomechanicsTracker {
  private state: 'STANDING' | 'DESCENDING' | 'BOTTOM' | 'ASCENDING' = 'STANDING';
  public reps = 0;
  public lowestAngleInCurrentRep = 180;
  public repAngles: number[] = [];
  public repDurations: number[] = [];
  public allKneeAngles: number[] = [];
  private repStartTime = 0;
  private depthCueTriggered = false;

  reset() {
    this.state = 'STANDING';
    this.reps = 0;
    this.lowestAngleInCurrentRep = 180;
    this.repAngles = [];
    this.repDurations = [];
    this.allKneeAngles = [];
    this.repStartTime = 0;
    this.depthCueTriggered = false;
  }

  update(landmarks: SkeletonLandmarks, timestampMs: number) {
    // Knee angle using Left Hip -> Left Knee -> Left Ankle or average of both
    const leftAngle = calculateJointAngle(landmarks.leftHip, landmarks.leftKnee, landmarks.leftAnkle);
    const rightAngle = calculateJointAngle(landmarks.rightHip, landmarks.rightKnee, landmarks.rightAnkle);
    const kneeAngle = Math.round((leftAngle + rightAngle) / 2);

    this.allKneeAngles.push(kneeAngle);

    let stateChanged = false;

    switch (this.state) {
      case 'STANDING':
        if (kneeAngle < 155) {
          this.state = 'DESCENDING';
          this.repStartTime = timestampMs;
          this.lowestAngleInCurrentRep = kneeAngle;
          this.depthCueTriggered = false;
          stateChanged = true;
        }
        break;

      case 'DESCENDING':
        if (kneeAngle < this.lowestAngleInCurrentRep) {
          this.lowestAngleInCurrentRep = kneeAngle;
        }

        // Parallel or below parallel depth achieved
        if (kneeAngle <= 98) {
          this.state = 'BOTTOM';
          if (!this.depthCueTriggered) {
            audioFeedback.playDepthCue();
            this.depthCueTriggered = true;
          }
          stateChanged = true;
        } else if (kneeAngle > 160) {
          // Aborted rep
          this.state = 'STANDING';
          stateChanged = true;
        }
        break;

      case 'BOTTOM':
        if (kneeAngle < this.lowestAngleInCurrentRep) {
          this.lowestAngleInCurrentRep = kneeAngle;
        }
        if (kneeAngle > 105) {
          this.state = 'ASCENDING';
          stateChanged = true;
        }
        break;

      case 'ASCENDING':
        if (kneeAngle >= 160) {
          // Completed repetition!
          this.reps++;
          const duration = Math.max(0.5, (timestampMs - this.repStartTime) / 1000);
          this.repDurations.push(duration);
          this.repAngles.push(this.lowestAngleInCurrentRep);
          audioFeedback.playRepBeep(920, 0.15);

          this.state = 'STANDING';
          this.lowestAngleInCurrentRep = 180;
          this.depthCueTriggered = false;
          stateChanged = true;
        }
        break;
    }

    return {
      reps: this.reps,
      currentAngle: kneeAngle,
      state: this.state,
      lowestAngle: this.lowestAngleInCurrentRep === 180 ? kneeAngle : this.lowestAngleInCurrentRep,
      stateChanged,
    };
  }

  getMetrics() {
    const totalReps = this.reps;
    const avgDepthAngle = this.repAngles.length > 0
      ? Math.round(this.repAngles.reduce((a, b) => a + b, 0) / this.repAngles.length)
      : (this.allKneeAngles.length ? Math.min(...this.allKneeAngles) : 95);

    const lowestAngleOverall = this.repAngles.length > 0
      ? Math.min(...this.repAngles)
      : avgDepthAngle;

    // Tempo consistency
    const avgTempo = this.repDurations.length > 0
      ? Number((this.repDurations.reduce((a, b) => a + b, 0) / this.repDurations.length).toFixed(1))
      : 1.8;

    // Consistency score (variance of rep depth)
    let consistency = 88;
    if (this.repAngles.length > 1) {
      const mean = avgDepthAngle;
      const variance = this.repAngles.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / this.repAngles.length;
      const stdDev = Math.sqrt(variance);
      consistency = Math.max(65, Math.min(98, Math.round(100 - stdDev * 2.2)));
    }

    // Form score: penalize shallow squats (> 100°), reward parallel/deep (85°-95°)
    let depthScore = 85;
    if (avgDepthAngle <= 90) depthScore = 95;
    else if (avgDepthAngle <= 100) depthScore = 88;
    else if (avgDepthAngle <= 110) depthScore = 78;
    else depthScore = 65;

    const formScore = Math.round((depthScore * 0.6) + (consistency * 0.4));
    const overallScore = Math.min(98, Math.round((formScore * 0.5) + (Math.min(totalReps, 20) / 20 * 45) + 5));

    return {
      reps: totalReps,
      formScore,
      lowestAngle: lowestAngleOverall,
      averageAngle: avgDepthAngle,
      consistencyScore: consistency,
      averageTempo: avgTempo,
      overallScore,
      maxDepthPercent: Math.min(100, Math.round((180 - avgDepthAngle) / 90 * 100)),
    };
  }
}

/**
 * Push-up Assessment Tracker
 */
export class PushupBiomechanicsTracker {
  private state: 'PLANK' | 'DESCENDING' | 'BOTTOM' | 'ASCENDING' = 'PLANK';
  public reps = 0;
  public lowestAngleInCurrentRep = 180;
  public repAngles: number[] = [];
  public repDurations: number[] = [];
  public allElbowAngles: number[] = [];
  private repStartTime = 0;
  private depthCueTriggered = false;

  reset() {
    this.state = 'PLANK';
    this.reps = 0;
    this.lowestAngleInCurrentRep = 180;
    this.repAngles = [];
    this.repDurations = [];
    this.allElbowAngles = [];
    this.repStartTime = 0;
    this.depthCueTriggered = false;
  }

  update(landmarks: SkeletonLandmarks, timestampMs: number) {
    const leftElbowAngle = calculateJointAngle(landmarks.leftShoulder, landmarks.leftElbow, landmarks.leftWrist);
    const rightElbowAngle = calculateJointAngle(landmarks.rightShoulder, landmarks.rightElbow, landmarks.rightWrist);
    const elbowAngle = Math.round((leftElbowAngle + rightElbowAngle) / 2);

    this.allElbowAngles.push(elbowAngle);

    let stateChanged = false;

    switch (this.state) {
      case 'PLANK':
        if (elbowAngle < 150) {
          this.state = 'DESCENDING';
          this.repStartTime = timestampMs;
          this.lowestAngleInCurrentRep = elbowAngle;
          this.depthCueTriggered = false;
          stateChanged = true;
        }
        break;

      case 'DESCENDING':
        if (elbowAngle < this.lowestAngleInCurrentRep) {
          this.lowestAngleInCurrentRep = elbowAngle;
        }
        if (elbowAngle <= 92) {
          this.state = 'BOTTOM';
          if (!this.depthCueTriggered) {
            audioFeedback.playDepthCue();
            this.depthCueTriggered = true;
          }
          stateChanged = true;
        } else if (elbowAngle > 160) {
          this.state = 'PLANK';
          stateChanged = true;
        }
        break;

      case 'BOTTOM':
        if (elbowAngle < this.lowestAngleInCurrentRep) {
          this.lowestAngleInCurrentRep = elbowAngle;
        }
        if (elbowAngle > 105) {
          this.state = 'ASCENDING';
          stateChanged = true;
        }
        break;

      case 'ASCENDING':
        if (elbowAngle >= 155) {
          this.reps++;
          const duration = Math.max(0.4, (timestampMs - this.repStartTime) / 1000);
          this.repDurations.push(duration);
          this.repAngles.push(this.lowestAngleInCurrentRep);
          audioFeedback.playRepBeep(920, 0.15);

          this.state = 'PLANK';
          this.lowestAngleInCurrentRep = 180;
          this.depthCueTriggered = false;
          stateChanged = true;
        }
        break;
    }

    return {
      reps: this.reps,
      currentAngle: elbowAngle,
      state: this.state,
      lowestAngle: this.lowestAngleInCurrentRep === 180 ? elbowAngle : this.lowestAngleInCurrentRep,
      stateChanged,
    };
  }

  getMetrics() {
    const totalReps = this.reps;
    const avgDepthAngle = this.repAngles.length > 0
      ? Math.round(this.repAngles.reduce((a, b) => a + b, 0) / this.repAngles.length)
      : 88;

    const lowestAngleOverall = this.repAngles.length > 0
      ? Math.min(...this.repAngles)
      : avgDepthAngle;

    const avgTempo = this.repDurations.length > 0
      ? Number((this.repDurations.reduce((a, b) => a + b, 0) / this.repDurations.length).toFixed(1))
      : 1.6;

    let consistency = 89;
    if (this.repAngles.length > 1) {
      const mean = avgDepthAngle;
      const variance = this.repAngles.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / this.repAngles.length;
      consistency = Math.max(68, Math.min(97, Math.round(100 - Math.sqrt(variance) * 2.1)));
    }

    const formScore = avgDepthAngle <= 90 ? 91 : avgDepthAngle <= 100 ? 84 : 72;
    const overallScore = Math.min(97, Math.round((formScore * 0.5) + (Math.min(totalReps, 25) / 25 * 45) + 5));

    return {
      reps: totalReps,
      formScore,
      lowestAngle: lowestAngleOverall,
      averageAngle: avgDepthAngle,
      consistencyScore: consistency,
      averageTempo: avgTempo,
      overallScore,
      maxDepthPercent: Math.min(100, Math.round((180 - avgDepthAngle) / 95 * 100)),
    };
  }
}

/**
 * Draws HUD and Skeleton Overlay onto an HTML5 Canvas
 */
export function renderBiomechanicsHUD(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  landmarks: SkeletonLandmarks,
  exerciseType: 'Squat' | 'Push-up' | 'Vertical Jump' | 'Agility',
  metrics: {
    reps: number;
    currentAngle: number;
    state: string;
    formScore?: number;
    confidence: number;
  }
) {
  // Clear or transparent overlay
  ctx.save();

  // Draw bounding box
  const allX = Object.values(landmarks).map((p) => p.x * width);
  const allY = Object.values(landmarks).map((p) => p.y * height);
  const minX = Math.max(10, Math.min(...allX) - 30);
  const maxX = Math.min(width - 10, Math.max(...allX) + 30);
  const minY = Math.max(10, Math.min(...allY) - 30);
  const maxY = Math.min(height - 10, Math.max(...allY) + 30);

  // High-tech HUD bounding box
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([8, 6]);
  ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
  ctx.setLineDash([]);

  // Corner brackets
  const bracketLen = 16;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  // Top-left
  ctx.beginPath();
  ctx.moveTo(minX, minY + bracketLen);
  ctx.lineTo(minX, minY);
  ctx.lineTo(minX + bracketLen, minY);
  ctx.stroke();
  // Top-right
  ctx.beginPath();
  ctx.moveTo(maxX - bracketLen, minY);
  ctx.lineTo(maxX, minY);
  ctx.lineTo(maxX, minY + bracketLen);
  ctx.stroke();
  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(minX, maxY - bracketLen);
  ctx.lineTo(minX, maxY);
  ctx.lineTo(minX + bracketLen, maxY);
  ctx.stroke();
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(maxX - bracketLen, maxY);
  ctx.lineTo(maxX, maxY);
  ctx.lineTo(maxX, maxY - bracketLen);
  ctx.stroke();

  // Skeleton Connections
  const bones: [Point2D, Point2D][] = [
    // Torso
    [landmarks.leftShoulder, landmarks.rightShoulder],
    [landmarks.leftShoulder, landmarks.leftHip],
    [landmarks.rightShoulder, landmarks.rightHip],
    [landmarks.leftHip, landmarks.rightHip],
    // Head connection
    [landmarks.nose, landmarks.leftShoulder],
    [landmarks.nose, landmarks.rightShoulder],
    // Left Arm
    [landmarks.leftShoulder, landmarks.leftElbow],
    [landmarks.leftElbow, landmarks.leftWrist],
    // Right Arm
    [landmarks.rightShoulder, landmarks.rightElbow],
    [landmarks.rightElbow, landmarks.rightWrist],
    // Left Leg
    [landmarks.leftHip, landmarks.leftKnee],
    [landmarks.leftKnee, landmarks.leftAnkle],
    // Right Leg
    [landmarks.rightHip, landmarks.rightKnee],
    [landmarks.rightKnee, landmarks.rightAnkle],
  ];

  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#06b6d4'; // Cyan neon
  ctx.shadowColor = '#06b6d4';
  ctx.shadowBlur = 8;

  bones.forEach(([p1, p2]) => {
    ctx.beginPath();
    ctx.moveTo(p1.x * width, p1.y * height);
    ctx.lineTo(p2.x * width, p2.y * height);
    ctx.stroke();
  });

  ctx.shadowBlur = 0; // reset shadow

  // Draw Joint Nodes
  const nodes = Object.entries(landmarks);
  nodes.forEach(([key, pt]) => {
    const px = pt.x * width;
    const py = pt.y * height;

    const isFocalJoint =
      (exerciseType === 'Squat' && (key.includes('Knee') || key.includes('Hip'))) ||
      (exerciseType === 'Push-up' && (key.includes('Elbow') || key.includes('Shoulder')));

    ctx.beginPath();
    ctx.arc(px, py, isFocalJoint ? 7 : 5, 0, Math.PI * 2);
    ctx.fillStyle = isFocalJoint ? '#f59e0b' : '#38bdf8';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pulse ring for focal joints
    if (isFocalJoint) {
      ctx.beginPath();
      ctx.arc(px, py, 13, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });

  // Focal Angle Arc & Value Display
  let focalX = landmarks.leftKnee.x * width;
  let focalY = landmarks.leftKnee.y * height;
  if (exerciseType === 'Push-up') {
    focalX = landmarks.leftElbow.x * width;
    focalY = landmarks.leftElbow.y * height;
  }

  // Draw angle tag near focal joint
  const angleTagText = `${metrics.currentAngle}°`;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.fillRect(focalX + 14, focalY - 20, 56, 26);
  ctx.strokeStyle = metrics.currentAngle <= 95 ? '#10b981' : '#f59e0b';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(focalX + 14, focalY - 20, 56, 26);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText(angleTagText, focalX + 22, focalY - 3);

  // Real-time HUD Status Overlay in top corner
  const hudX = 16;
  const hudY = 16;
  ctx.fillStyle = 'rgba(11, 19, 43, 0.88)';
  ctx.beginPath();
  ctx.roundRect(hudX, hudY, 260, 100, 8);
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Top header in HUD
  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`BIOMECHANICAL MOVEMENT ENGINE`, hudX + 14, hudY + 18);

  // Reps count big display
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 28px "JetBrains Mono", monospace';
  ctx.fillText(String(metrics.reps).padStart(2, '0'), hudX + 14, hudY + 54);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`REPETITIONS`, hudX + 62, hudY + 44);

  ctx.fillStyle = metrics.state === 'BOTTOM' ? '#10b981' : '#f59e0b';
  ctx.font = 'bold 11px "JetBrains Mono", monospace';
  ctx.fillText(`PHASE: ${metrics.state}`, hudX + 62, hudY + 58);

  // Angle bar & confidence
  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Joint: ${metrics.currentAngle}° | CV Conf: ${metrics.confidence}%`, hudX + 14, hudY + 86);

  ctx.restore();
}

/**
 * Generates synthetic frame landmark coordinates for realistic movement cycles
 * (used for live benchmark simulation / demonstration mode)
 */
export function generateSyntheticLandmarks(
  exerciseType: 'Squat' | 'Push-up' | 'Vertical Jump' | 'Agility',
  timeSeconds: number
): SkeletonLandmarks {
  // Period of 1 cycle = ~2.4 seconds
  const cycle = (timeSeconds % 2.4) / 2.4;
  // Sinusoidal movement between 0 (top) and 1 (bottom)
  const phase = 0.5 - 0.5 * Math.cos(cycle * 2 * Math.PI);

  if (exerciseType === 'Squat') {
    // Standing squat: hips descend from y=0.52 to y=0.68, knees flex
    const hipY = 0.52 + phase * 0.16;
    const kneeY = 0.68 + phase * 0.05;
    const kneeXSpread = 0.03 * phase; // slight knee tracking

    return {
      nose: { x: 0.5, y: 0.18 - phase * 0.04, score: 0.98 },
      leftShoulder: { x: 0.44, y: 0.28 + phase * 0.12, score: 0.96 },
      rightShoulder: { x: 0.56, y: 0.28 + phase * 0.12, score: 0.96 },
      leftElbow: { x: 0.41, y: 0.38 + phase * 0.13, score: 0.94 },
      rightElbow: { x: 0.59, y: 0.38 + phase * 0.13, score: 0.94 },
      leftWrist: { x: 0.46, y: 0.35 + phase * 0.12, score: 0.92 },
      rightWrist: { x: 0.54, y: 0.35 + phase * 0.12, score: 0.92 },
      leftHip: { x: 0.46, y: hipY, score: 0.97 },
      rightHip: { x: 0.54, y: hipY, score: 0.97 },
      leftKnee: { x: 0.45 - kneeXSpread, y: kneeY, score: 0.96 },
      rightKnee: { x: 0.55 + kneeXSpread, y: kneeY, score: 0.96 },
      leftAnkle: { x: 0.45, y: 0.88, score: 0.98 },
      rightAnkle: { x: 0.55, y: 0.88, score: 0.98 },
    };
  } else if (exerciseType === 'Push-up') {
    // Horizontal prone push-up: shoulders drop from y=0.48 to y=0.64
    const shoulderY = 0.48 + phase * 0.17;
    const elbowY = 0.44 + phase * 0.19;

    return {
      nose: { x: 0.24, y: shoulderY - 0.02, score: 0.95 },
      leftShoulder: { x: 0.32, y: shoulderY, score: 0.97 },
      rightShoulder: { x: 0.35, y: shoulderY - 0.03, score: 0.92 },
      leftElbow: { x: 0.30, y: elbowY, score: 0.96 },
      rightElbow: { x: 0.33, y: elbowY - 0.02, score: 0.91 },
      leftWrist: { x: 0.32, y: 0.68, score: 0.98 },
      rightWrist: { x: 0.36, y: 0.67, score: 0.94 },
      leftHip: { x: 0.54, y: shoulderY + 0.04, score: 0.95 },
      rightHip: { x: 0.56, y: shoulderY + 0.02, score: 0.91 },
      leftKnee: { x: 0.70, y: 0.62, score: 0.95 },
      rightKnee: { x: 0.72, y: 0.60, score: 0.90 },
      leftAnkle: { x: 0.84, y: 0.68, score: 0.97 },
      rightAnkle: { x: 0.86, y: 0.66, score: 0.92 },
    };
  } else {
    // Vertical Jump / Agility
    const jumpOffset = phase > 0.6 ? -(phase - 0.6) * 0.35 : (phase * 0.1);
    return {
      nose: { x: 0.5, y: 0.2 + jumpOffset, score: 0.96 },
      leftShoulder: { x: 0.45, y: 0.3 + jumpOffset, score: 0.95 },
      rightShoulder: { x: 0.55, y: 0.3 + jumpOffset, score: 0.95 },
      leftElbow: { x: 0.42, y: 0.42 + jumpOffset, score: 0.92 },
      rightElbow: { x: 0.58, y: 0.42 + jumpOffset, score: 0.92 },
      leftWrist: { x: 0.43, y: 0.52 + jumpOffset, score: 0.91 },
      rightWrist: { x: 0.57, y: 0.52 + jumpOffset, score: 0.91 },
      leftHip: { x: 0.47, y: 0.52 + jumpOffset, score: 0.96 },
      rightHip: { x: 0.53, y: 0.52 + jumpOffset, score: 0.96 },
      leftKnee: { x: 0.46, y: 0.7 + jumpOffset * 0.7, score: 0.95 },
      rightKnee: { x: 0.54, y: 0.7 + jumpOffset * 0.7, score: 0.95 },
      leftAnkle: { x: 0.46, y: 0.88 + Math.min(0, jumpOffset), score: 0.96 },
      rightAnkle: { x: 0.54, y: 0.88 + Math.min(0, jumpOffset), score: 0.96 },
    };
  }
}

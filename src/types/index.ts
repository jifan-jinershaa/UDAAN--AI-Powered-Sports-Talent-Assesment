export type Role = 'athlete' | 'admin' | 'scout';

export type ScoutingStatus =
  | 'Profile Incomplete'
  | 'Profile Created'
  | 'Assessment Completed'
  | 'Under Review'
  | 'Shortlisted'
  | 'Regional Selection'
  | 'National Scouting';

export interface AadhaarVerificationRecord {
  aadhaarNumberMasked: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  state: string;
  district: string;
  verificationMethod: string;
  verifiedAt: string;
  status: 'Verified' | 'Pending' | 'Rejected_Fake' | 'Unverified';
  fraudCheckPassed: boolean;
  securityHash: string;
  remarks?: string;
  documentUrl?: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  athleteId?: string;
  isLoggedIn?: boolean;
  aadhaarVerified?: boolean;
  aadhaarDetails?: AadhaarVerificationRecord;
}

export interface Athlete {
  id: string;
  userId: string;
  fullName: string;
  dateOfBirth: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  state: string;
  district: string;
  city: string;
  phone: string;
  email: string;
  primarySport: string;
  secondarySport?: string;
  playingPosition?: string;
  dominantSide?: 'Right' | 'Left' | 'Both';
  heightCm: number;
  weightKg: number;
  reachCm?: number;
  fitnessLevel: string;
  trainingAcademy?: string;
  coachName?: string;
  profilePhotoUrl: string;
  overallScore: number;
  fitnessScore: number;
  techniqueScore: number;
  consistencyScore: number;
  aiConfidence: number;
  scoutingStatus: ScoutingStatus;
  profileCompletion: number;
  bio: string;
  shortlisted?: boolean;
  aadhaarVerified?: boolean;
  aadhaarNumberMasked?: string;
  aadhaarVerificationDate?: string;
  createdAt: string;
}

export interface AssessmentType {
  id: string;
  title: string;
  category: 'General Fitness' | 'Athletics' | 'Basketball' | 'Football' | 'Badminton';
  description: string;
  instructions: string[];
  targetJoints: string[];
  primaryMetric: string;
  exerciseType: 'Squat' | 'Push-up' | 'Vertical Jump' | 'Agility';
  cvSupported: boolean;
  icon: string;
  recommendedDurationSec: number;
}

export interface AIReportEvaluation {
  athleticPotential: string;
  overallGrade: string;
  summary: string;
  strengths: string[];
  areasForImprovement: string[];
  recommendedDrills: string[];
  scoutVerdict: string;
}

export interface AssessmentResult {
  id: string;
  athleteId: string;
  athleteName: string;
  sport: string;
  assessmentId: string;
  assessmentTitle: string;
  exerciseType: 'Squat' | 'Push-up' | 'Vertical Jump' | 'Agility';
  repetitions: number;
  formScore: number;
  movementScore: number;
  consistencyScore: number;
  poseConfidence: number;
  overallScore: number;
  lowestAngle: number;
  averageAngle: number;
  averageTempo: number;
  maxDepthPercent: number;
  durationSeconds: number;
  aiFeedback: string;
  evaluation?: AIReportEvaluation;
  videoUrl?: string;
  isDemoSimulated?: boolean;
  landmarkTelemetry?: {
    angles: number[];
    repTimestamps: number[];
    states: string[];
  };
  createdAt: string;
}

export interface Certificate {
  id: string;
  athleteId: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  category: 'Tournament' | 'Fitness' | 'National Camp' | 'State Championship' | 'School Games';
  certificateUrl: string;
  verificationStatus: 'Pending' | 'Verified' | 'Rejected';
  verifiedBy?: string;
  remarks?: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  athleteId: string;
  title: string;
  sport: string;
  tournament: string;
  level: 'School' | 'District' | 'State' | 'National' | 'International';
  position: string;
  year: number;
  location: string;
  organization: string;
  description: string;
  proofUrl?: string;
  createdAt: string;
}

export interface ScoutNote {
  id: string;
  athleteId: string;
  scoutName: string;
  scoutRole: string;
  note: string;
  rating: number;
  recommendation: 'Fast-Track National Camp' | 'Regional Development' | 'Monitor Progress' | 'Needs Technical Refinement';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  timestamp: string;
  read: boolean;
}

export interface PoseKeypoint {
  name: string;
  x: number;
  y: number;
  score: number;
}

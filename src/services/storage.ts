import {
  Athlete,
  AssessmentType,
  AssessmentResult,
  Certificate,
  Achievement,
  ScoutNote,
  NotificationItem,
  User,
  ScoutingStatus,
  AIReportEvaluation,
  AadhaarVerificationRecord,
} from '../types';

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi NCR',
  'Jammu & Kashmir',
  'Ladakh',
  'Chandigarh',
] as const;

export const SPORTS_LIST = [
  'Athletics',
  'Badminton',
  'Basketball',
  'Boxing',
  'Cricket',
  'Football',
  'Swimming',
  'Tennis',
  'Volleyball',
  'Wrestling',
  'Archery',
  'Weightlifting',
  'Kabaddi',
] as const;

export const ASSESSMENT_TYPES: AssessmentType[] = [
  {
    id: 'squat-cv-01',
    title: 'Standard Squat Biomechanics Test',
    category: 'General Fitness',
    exerciseType: 'Squat',
    description: 'Evaluates lower-body explosive strength, knee flexion depth, and bilateral movement symmetry using real-time computer vision joint tracking.',
    instructions: [
      'Position full body in frame (head to feet visible).',
      'Stand sideways or 45-degree angle to the camera for optimal knee angle capture.',
      'Descend until thighs are parallel to ground (knee angle ≤ 95°).',
      'Keep heels planted and maintain steady tempo throughout.',
    ],
    targetJoints: ['Hip', 'Knee', 'Ankle'],
    primaryMetric: 'Knee Flexion Depth & Reps',
    cvSupported: true,
    icon: 'Activity',
    recommendedDurationSec: 45,
  },
  {
    id: 'pushup-cv-02',
    title: 'Push-up Kinematic Form Test',
    category: 'General Fitness',
    exerciseType: 'Push-up',
    description: 'Measures upper-body pectoral and tricep endurance, core trunk rigidity, and elbow flexion angle.',
    instructions: [
      'Maintain prone plank position parallel to camera view.',
      'Lower chest until elbow flexion is 90° or lower.',
      'Ensure straight spine alignment between shoulders, hips, and ankles.',
      'Press firmly back up to full arm extension.',
    ],
    targetJoints: ['Shoulder', 'Elbow', 'Wrist', 'Hip'],
    primaryMetric: 'Elbow Articulation & Trunk Linearity',
    cvSupported: true,
    icon: 'Shield',
    recommendedDurationSec: 45,
  },
  {
    id: 'jump-cv-03',
    title: 'Vertical Jump Displacement Test',
    category: 'Athletics',
    exerciseType: 'Vertical Jump',
    description: 'Calculates vertical center-of-mass takeoff velocity, flight time, and estimated peak jump height.',
    instructions: [
      'Face camera with full vertical headroom visible.',
      'Perform counter-movement squat and explode straight upwards.',
      'Land with knees bent to absorb ground reaction force.',
      'Execute 3 consecutive maximum effort jumps.',
    ],
    targetJoints: ['Center of Mass (Hip/Shoulder)', 'Knee', 'Ankle'],
    primaryMetric: 'Displacement Height & Flight Time',
    cvSupported: true,
    icon: 'TrendingUp',
    recommendedDurationSec: 30,
  },
  {
    id: 'sprint-20m',
    title: '20m Acceleration & Velocity Sprint',
    category: 'Athletics',
    exerciseType: 'Agility',
    description: 'Standardized linear sprint measuring initial 10m burst acceleration and top 20m speed cadence.',
    instructions: [
      'Set cones at 0m, 10m, and 20m markers on flat turf/track.',
      'Camera positioned perpendicular to the 10m midpoint.',
      'Sprint at 100% effort through the finish line.',
    ],
    targetJoints: ['Stride Frequency', 'Hip Extension', 'Torso Lean'],
    primaryMetric: 'Sprint Time (seconds)',
    cvSupported: false,
    icon: 'Zap',
    recommendedDurationSec: 20,
  },
  {
    id: 'agility-shuttle',
    title: '5-10-5 Pro Agility Shuttle Run',
    category: 'Badminton',
    exerciseType: 'Agility',
    description: 'Tests multidirectional change-of-direction, decelerating deceleration, and lateral push-off force.',
    instructions: [
      'Three cones placed 5 yards apart in a straight line.',
      'Start in 3-point stance at center cone.',
      'Sprint 5 yards to right, touch line, sprint 10 yards to left, then 5 yards through center.',
    ],
    targetJoints: ['Hip Drop', 'Lateral Plant Angle', 'Turn Time'],
    primaryMetric: 'Total Shuttle Time',
    cvSupported: false,
    icon: 'Shuffle',
    recommendedDurationSec: 30,
  },
];

const INITIAL_ATHLETES: Athlete[] = [
  {
    id: 'IND-2025-ATH-01',
    userId: 'user-01',
    fullName: 'Arjun Kumar',
    dateOfBirth: '2006-04-18',
    age: 19,
    gender: 'Male',
    state: 'Tamil Nadu',
    district: 'Salem',
    city: 'Attur',
    phone: '+91 98451 22301',
    email: 'arjun.kumar@talent.udaan.in',
    primarySport: 'Athletics',
    secondarySport: 'Kabaddi',
    playingPosition: '100m & 200m Sprinter',
    dominantSide: 'Right',
    heightCm: 178,
    weightKg: 68,
    reachCm: 182,
    fitnessLevel: 'Advanced Elite',
    trainingAcademy: 'Salem District Sports Complex',
    coachName: 'K. R. Natarajan',
    profilePhotoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&auto=format&fit=crop&q=80',
    overallScore: 87,
    fitnessScore: 89,
    techniqueScore: 85,
    consistencyScore: 92,
    aiConfidence: 95,
    scoutingStatus: 'Regional Selection',
    profileCompletion: 95,
    shortlisted: true,
    aadhaarVerified: true,
    aadhaarNumberMasked: 'XXXX XXXX 4829',
    aadhaarVerificationDate: '2025-01-10T10:00:00Z',
    bio: 'Grassroots sprint specialist from rural Salem. Won Gold in Tamil Nadu Sub-Junior State Meet. Specializes in explosive block starts and 60-100m acceleration.',
    createdAt: '2025-01-12T10:00:00Z',
  },
  {
    id: 'IND-2025-ATH-02',
    userId: 'user-02',
    fullName: 'Meera Raj',
    dateOfBirth: '2007-09-22',
    age: 18,
    gender: 'Female',
    state: 'Kerala',
    district: 'Kozhikode',
    city: 'Vadakara',
    phone: '+91 97412 88123',
    email: 'meera.raj@talent.udaan.in',
    primarySport: 'Badminton',
    secondarySport: 'Athletics',
    playingPosition: 'Women Singles',
    dominantSide: 'Right',
    heightCm: 169,
    weightKg: 58,
    reachCm: 173,
    fitnessLevel: 'Elite Junior',
    trainingAcademy: 'Malabar Badminton Academy',
    coachName: 'Sunil George',
    profilePhotoUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80',
    overallScore: 84,
    fitnessScore: 82,
    techniqueScore: 89,
    consistencyScore: 86,
    aiConfidence: 93,
    scoutingStatus: 'Under Review',
    profileCompletion: 90,
    shortlisted: true,
    bio: 'Ranked #2 in Kerala Under-19 state circuit. Known for high wrist snap cadence, rapid recovery footwork, and tactical drop shots.',
    createdAt: '2025-01-18T14:30:00Z',
  },
  {
    id: 'IND-2025-ATH-03',
    userId: 'user-03',
    fullName: 'Rahul Singh',
    dateOfBirth: '2005-11-04',
    age: 20,
    gender: 'Male',
    state: 'Karnataka',
    district: 'Bengaluru Rural',
    city: 'Doddaballapura',
    phone: '+91 99018 33412',
    email: 'rahul.singh@talent.udaan.in',
    primarySport: 'Football',
    secondarySport: 'Athletics',
    playingPosition: 'Central Midfielder / Playmaker',
    dominantSide: 'Both',
    heightCm: 175,
    weightKg: 67,
    reachCm: 176,
    fitnessLevel: 'High-Performance',
    trainingAcademy: 'Karnataka State FA Grassroots Center',
    coachName: 'B. Mohan Raj',
    profilePhotoUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=300&auto=format&fit=crop&q=80',
    overallScore: 82,
    fitnessScore: 85,
    techniqueScore: 80,
    consistencyScore: 88,
    aiConfidence: 91,
    scoutingStatus: 'Assessment Completed',
    profileCompletion: 85,
    shortlisted: false,
    bio: 'Dynamic box-to-box midfielder with exceptional aerobic recovery rate. High pass-completion index under defensive pressing.',
    createdAt: '2025-02-01T08:15:00Z',
  },
  {
    id: 'IND-2025-ATH-04',
    userId: 'user-04',
    fullName: 'Ananya Sharma',
    dateOfBirth: '2007-02-14',
    age: 18,
    gender: 'Female',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Baramati',
    phone: '+91 94220 55198',
    email: 'ananya.sharma@talent.udaan.in',
    primarySport: 'Basketball',
    secondarySport: 'Volleyball',
    playingPosition: 'Point Guard',
    dominantSide: 'Right',
    heightCm: 174,
    weightKg: 61,
    reachCm: 180,
    fitnessLevel: 'Elite Junior',
    trainingAcademy: 'Deccan Gymkhana Hoops Academy',
    coachName: 'V. S. Kulkarni',
    profilePhotoUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&auto=format&fit=crop&q=80',
    overallScore: 86,
    fitnessScore: 88,
    techniqueScore: 86,
    consistencyScore: 89,
    aiConfidence: 94,
    scoutingStatus: 'Shortlisted',
    profileCompletion: 92,
    shortlisted: true,
    bio: 'Top scorer in Maharashtra State Inter-School Championship. High basketball IQ with explosive first-step drive and perimeter shooting.',
    createdAt: '2025-02-10T11:45:00Z',
  },
  {
    id: 'IND-2025-ATH-05',
    userId: 'user-05',
    fullName: 'Vikram Rathore',
    dateOfBirth: '2004-08-30',
    age: 21,
    gender: 'Male',
    state: 'Haryana',
    district: 'Bhiwani',
    city: 'Bhiwani',
    phone: '+91 98120 77410',
    email: 'vikram.rathore@talent.udaan.in',
    primarySport: 'Boxing',
    secondarySport: 'Wrestling',
    playingPosition: 'Middleweight (75kg)',
    dominantSide: 'Right',
    heightCm: 181,
    weightKg: 74,
    reachCm: 188,
    fitnessLevel: 'National Camp Caliber',
    trainingAcademy: 'Bhiwani Boxing Club',
    coachName: 'Jagdish Singh',
    profilePhotoUrl: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=300&auto=format&fit=crop&q=80',
    overallScore: 89,
    fitnessScore: 92,
    techniqueScore: 87,
    consistencyScore: 91,
    aiConfidence: 96,
    scoutingStatus: 'National Scouting',
    profileCompletion: 100,
    shortlisted: true,
    bio: 'Bhiwani powerhouse with heavy punching leverage, swift slipping defense, and national-level conditioning metrics.',
    createdAt: '2025-01-05T09:00:00Z',
  },
  {
    id: 'IND-2025-ATH-06',
    userId: 'user-06',
    fullName: 'Priya Patel',
    dateOfBirth: '2006-12-11',
    age: 19,
    gender: 'Female',
    state: 'Gujarat',
    district: 'Surat',
    city: 'Bardoli',
    phone: '+91 98251 44102',
    email: 'priya.patel@talent.udaan.in',
    primarySport: 'Swimming',
    secondarySport: 'Athletics',
    playingPosition: '100m / 200m Freestyle',
    dominantSide: 'Right',
    heightCm: 172,
    weightKg: 62,
    reachCm: 179,
    fitnessLevel: 'Advanced State Level',
    trainingAcademy: 'Surat Municipal Aquatics Center',
    coachName: 'Dharmesh Dave',
    profilePhotoUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=300&auto=format&fit=crop&q=80',
    overallScore: 83,
    fitnessScore: 86,
    techniqueScore: 82,
    consistencyScore: 85,
    aiConfidence: 92,
    scoutingStatus: 'Under Review',
    profileCompletion: 88,
    shortlisted: false,
    bio: 'Gujarat State Swimming medalist. Exceptional streamline kick cadence and sustained lactic threshold tolerance.',
    createdAt: '2025-02-14T16:20:00Z',
  },
  {
    id: 'IND-2025-ATH-07',
    userId: 'user-07',
    fullName: 'Sunita Soren',
    dateOfBirth: '2006-07-08',
    age: 19,
    gender: 'Female',
    state: 'Jharkhand',
    district: 'Ranchi',
    city: 'Khunti',
    phone: '+91 97710 33908',
    email: 'sunita.soren@talent.udaan.in',
    primarySport: 'Archery',
    secondarySport: 'Athletics',
    playingPosition: 'Recurve Bow',
    dominantSide: 'Right',
    heightCm: 164,
    weightKg: 53,
    reachCm: 168,
    fitnessLevel: 'High-Performance Junior',
    trainingAcademy: 'Birsa Munda Archery Academy, Silli',
    coachName: 'Prakash Ram',
    profilePhotoUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=300&auto=format&fit=crop&q=80',
    overallScore: 88,
    fitnessScore: 84,
    techniqueScore: 93,
    consistencyScore: 94,
    aiConfidence: 97,
    scoutingStatus: 'Regional Selection',
    profileCompletion: 95,
    shortlisted: true,
    bio: 'Tribal talent from Khunti district. Phenomenal shoulder stability under draw tension, micro-tremor control, and mental focus.',
    createdAt: '2025-01-25T13:00:00Z',
  },
];

const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-01',
    athleteId: 'IND-2025-ATH-01',
    title: 'Gold Medal - 100m Sprint, Tamil Nadu State Junior Athletics',
    issuingOrganization: 'Tamil Nadu Athletics Association (TNAA)',
    issueDate: '2024-08-15',
    category: 'State Championship',
    certificateUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
    verificationStatus: 'Verified',
    verifiedBy: 'SAI State Scrutiny Cell, Chennai',
    remarks: 'Official certificate verified against TNAA championship registrar record #2024-TN-SPR-88.',
    createdAt: '2025-01-12T11:00:00Z',
  },
  {
    id: 'cert-02',
    athleteId: 'IND-2025-ATH-01',
    title: 'Silver Medal - 200m Sprint, South Zone Junior Championship',
    issuingOrganization: 'Athletics Federation of India (AFI)',
    issueDate: '2024-11-20',
    category: 'Tournament',
    certificateUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    verificationStatus: 'Verified',
    verifiedBy: 'SAI Regional Center, Bengaluru',
    remarks: 'AFI official time record logged at 21.84s.',
    createdAt: '2025-01-15T15:20:00Z',
  },
  {
    id: 'cert-03',
    athleteId: 'IND-2025-ATH-02',
    title: 'Winner - Kerala State Under-19 Girls Singles Championship',
    issuingOrganization: 'Kerala Badminton (Shuttle) Association',
    issueDate: '2024-10-02',
    category: 'State Championship',
    certificateUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
    verificationStatus: 'Verified',
    verifiedBy: 'State Sports Council, Thiruvananthapuram',
    remarks: 'Verified official championship draw sheet.',
    createdAt: '2025-01-19T10:00:00Z',
  },
  {
    id: 'cert-04',
    athleteId: 'IND-2025-ATH-05',
    title: 'Gold Medal - All India Inter-University Boxing Championship (75kg)',
    issuingOrganization: 'Association of Indian Universities (AIU)',
    issueDate: '2024-12-14',
    category: 'National Camp',
    certificateUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    verificationStatus: 'Verified',
    verifiedBy: 'BFI National Selection Committee',
    remarks: 'Candidate placed in SAI National Centre of Excellence (NCOE) talent pool.',
    createdAt: '2025-01-08T12:00:00Z',
  },
  {
    id: 'cert-05',
    athleteId: 'IND-2025-ATH-03',
    title: 'Best Midfielder - South Zone Grassroots Youth Cup',
    issuingOrganization: 'Karnataka State Football Association',
    issueDate: '2024-09-18',
    category: 'Tournament',
    certificateUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
    verificationStatus: 'Pending',
    remarks: 'Awaiting match commissioner report verification.',
    createdAt: '2025-02-02T09:30:00Z',
  },
];

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-01',
    athleteId: 'IND-2025-ATH-01',
    title: 'State 100m Sprint Gold',
    sport: 'Athletics',
    tournament: 'Tamil Nadu Junior Athletics Championship',
    level: 'State',
    position: 'Gold Medal (10.68s)',
    year: 2024,
    location: 'Jawaharlal Nehru Stadium, Chennai',
    organization: 'TNAA',
    description: 'Set a new district record in the 100m sprint final with a wind-legal timing of 10.68 seconds.',
    createdAt: '2025-01-12T11:30:00Z',
  },
  {
    id: 'ach-02',
    athleteId: 'IND-2025-ATH-01',
    title: 'South Zone 200m Sprint Silver',
    sport: 'Athletics',
    tournament: 'South Zone Junior Athletics Meet',
    level: 'National',
    position: 'Silver Medal (21.84s)',
    year: 2024,
    location: 'Guntur, Andhra Pradesh',
    organization: 'Athletics Federation of India',
    description: 'Represented Tamil Nadu state team; finished 2nd in an 8-state competition.',
    createdAt: '2025-01-15T16:00:00Z',
  },
  {
    id: 'ach-03',
    athleteId: 'IND-2025-ATH-02',
    title: 'Kerala State U-19 Singles Champion',
    sport: 'Badminton',
    tournament: 'Kerala State Junior Badminton Championship',
    level: 'State',
    position: 'Gold / Champion',
    year: 2024,
    location: 'Regional Sports Centre, Kochi',
    organization: 'KBSA',
    description: 'Defeated top seed 21-18, 19-21, 21-16 in a 58-minute championship final.',
    createdAt: '2025-01-19T11:00:00Z',
  },
  {
    id: 'ach-04',
    athleteId: 'IND-2025-ATH-04',
    title: 'Maharashtra Inter-School Most Valuable Player',
    sport: 'Basketball',
    tournament: 'Maharashtra State Inter-School Hoops Trophy',
    level: 'State',
    position: 'Champion & Tournament MVP',
    year: 2024,
    location: 'Shiv Chhatrapati Sports Complex, Balewadi, Pune',
    organization: 'Maharashtra Basketball Association',
    description: 'Averaged 24.2 points, 6.8 assists, and 3.4 steals across 6 tournament games.',
    createdAt: '2025-02-10T12:30:00Z',
  },
  {
    id: 'ach-05',
    athleteId: 'IND-2025-ATH-05',
    title: 'All India Inter-University Boxing Gold (75kg)',
    sport: 'Boxing',
    tournament: 'All India Inter-University Boxing Championship',
    level: 'National',
    position: 'Gold Medal',
    year: 2024,
    location: 'Chandigarh University',
    organization: 'AIU / BFI',
    description: 'Won all 5 tournament bouts by unanimous referee decision or RSC (Referee Stopped Contest).',
    createdAt: '2025-01-08T14:00:00Z',
  },
];

const INITIAL_ASSESSMENTS: AssessmentResult[] = [
  {
    id: 'res-01',
    athleteId: 'IND-2025-ATH-01',
    athleteName: 'Arjun Kumar',
    sport: 'Athletics',
    assessmentId: 'squat-cv-01',
    assessmentTitle: 'Standard Squat Biomechanics Test',
    exerciseType: 'Squat',
    repetitions: 16,
    formScore: 88,
    movementScore: 89,
    consistencyScore: 92,
    poseConfidence: 96,
    overallScore: 87,
    lowestAngle: 86,
    averageAngle: 91,
    averageTempo: 1.7,
    maxDepthPercent: 98,
    durationSeconds: 40,
    aiFeedback: 'Excellent lower-body power cadence. Femur reached below parallel depth consistently. Great hip hinge control.',
    evaluation: {
      athleticPotential: 'High National Potential',
      overallGrade: 'A',
      summary: 'Biomechanical movement audit reveals high neuromuscular control with 16 clean repetitions completed. Average knee flexion angle measured at 91° with exceptional cadence consistency of 92%.',
      strengths: [
        'Superior ground reaction force stabilization during deep concentric drive',
        'Minimal lateral knee valgus wobble throughout all 16 cycles',
        'Precise tempo maintenance (1.7s per repetition) with zero early deceleration',
      ],
      areasForImprovement: [
        'Thoracic posture shows minor forward flexion at rep 14-16 under fatigue',
        'Add ankle dorsiflexion mobility drills to further stabilize upright trunk position',
      ],
      recommendedDrills: [
        'Pause squats with 2-second hold at 90° depth',
        'Unilateral Bulgarian split squats for hip stabilizer symmetry',
        'Barbell explosive hip thrusts for sprint drive acceleration',
      ],
      scoutVerdict: 'Fast-track candidate for National Sprint Development Academy. Physical markers indicate elite acceleration ceiling.',
    },
    createdAt: '2025-01-20T10:30:00Z',
  },
  {
    id: 'res-02',
    athleteId: 'IND-2025-ATH-02',
    athleteName: 'Meera Raj',
    sport: 'Badminton',
    assessmentId: 'squat-cv-01',
    assessmentTitle: 'Standard Squat Biomechanics Test',
    exerciseType: 'Squat',
    repetitions: 14,
    formScore: 86,
    movementScore: 84,
    consistencyScore: 88,
    poseConfidence: 94,
    overallScore: 84,
    lowestAngle: 89,
    averageAngle: 93,
    averageTempo: 1.9,
    maxDepthPercent: 96,
    durationSeconds: 38,
    aiFeedback: 'Great knee alignment and foot stability. Rapid turnaround between eccentric and concentric phases.',
    evaluation: {
      athleticPotential: 'Promising Regional Talent',
      overallGrade: 'B+',
      summary: 'Solid foundational biomechanics recorded. The athlete demonstrates steady joint cadence and reproducible movement trajectory throughout the test cycle.',
      strengths: [
        'Quick turnaround between eccentric and concentric phases, typical of badminton lungers',
        'Stable core bracing with upright spinal angle',
        'High pose confidence and landmark stability',
      ],
      areasForImprovement: [
        'Slight right-side weight bias noted during the bottom phase (1.8% deviation)',
        'Increase explosive power output on the concentric ascent',
      ],
      recommendedDrills: [
        'Lateral agility shuffle jumps',
        'Isometric split squat holds with reactive medicine ball toss',
      ],
      scoutVerdict: 'Candidate demonstrates strong kinetic transfer and agility suitability for regional junior camp.',
    },
    createdAt: '2025-01-22T14:15:00Z',
  },
  {
    id: 'res-03',
    athleteId: 'IND-2025-ATH-05',
    athleteName: 'Vikram Rathore',
    sport: 'Boxing',
    assessmentId: 'pushup-cv-02',
    assessmentTitle: 'Push-up Kinematic Form Test',
    exerciseType: 'Push-up',
    repetitions: 24,
    formScore: 92,
    movementScore: 94,
    consistencyScore: 91,
    poseConfidence: 97,
    overallScore: 89,
    lowestAngle: 82,
    averageAngle: 87,
    averageTempo: 1.4,
    maxDepthPercent: 99,
    durationSeconds: 42,
    aiFeedback: 'Elite chest depth and rigid scapular retraction. Zero hip sag detected across 24 full-depth reps.',
    evaluation: {
      athleticPotential: 'High National Potential',
      overallGrade: 'A+',
      summary: 'High-caliber upper body and core biomechanics. Maintained a rigid plank line throughout all 24 repetitions with full 82° elbow flexion.',
      strengths: [
        'Exceptional core rigidity (Shoulder-Hip-Ankle alignment remained within 3 degrees of linear plane)',
        'Ballistic pressing speed (1.4s cycle) indicating high fast-twitch pectoral recruitment',
        'Symmetrical elbow flare angle (approx 45° relative to torso)',
      ],
      areasForImprovement: [
        'Maintain neck neutral posture rather than slight hyperextension',
        'Incorporate plyometric clapping push-ups for punch retraction speed',
      ],
      recommendedDrills: [
        'Plyometric push-ups onto elevated boxes',
        'Heavy rotational core landmine presses',
      ],
      scoutVerdict: 'Top-tier physical conditioning suitable for National Games and international camp sparring.',
    },
    createdAt: '2025-01-10T16:00:00Z',
  },
];

const INITIAL_SCOUT_NOTES: ScoutNote[] = [
  {
    id: 'note-01',
    athleteId: 'IND-2025-ATH-01',
    scoutName: 'Dr. Ramesh Sundaram',
    scoutRole: 'Senior SAI Talent Observer',
    note: 'Observed Arjun in Salem district trials. Biomechanical squat depth (86°) aligns with his explosive 100m block clearance. High stride frequency. Recommended for upcoming South Zone Talent Identification Camp.',
    rating: 5,
    recommendation: 'Fast-Track National Camp',
    createdAt: '2025-01-22T16:00:00Z',
  },
  {
    id: 'note-02',
    athleteId: 'IND-2025-ATH-02',
    scoutName: 'Aparna Nair',
    scoutRole: 'State Badminton Development Officer',
    note: 'Meera displays great tactical deception and swift split-step recovery. Her AI assessment shows good bilateral knee symmetry. Needs additional power training in lower-body eccentric loading.',
    rating: 4,
    recommendation: 'Regional Development',
    createdAt: '2025-01-25T11:20:00Z',
  },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    title: 'AI Assessment Report Ready',
    message: 'Your Standard Squat Biomechanics Test has been analyzed. Score: 87/100.',
    type: 'success',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: 'notif-02',
    title: 'Certificate Verified',
    message: 'Tamil Nadu Junior Athletics Gold Medal certificate was verified by SAI Scrutiny Cell.',
    type: 'info',
    timestamp: '1 day ago',
    read: false,
  },
  {
    id: 'notif-03',
    title: 'Scouting Stage Advanced',
    message: 'Your profile has progressed to "Regional Selection" status.',
    type: 'success',
    timestamp: '3 days ago',
    read: true,
  },
  {
    id: 'notif-04',
    title: 'Profile Optimization',
    message: 'Add competition history details to achieve 100% profile completion.',
    type: 'warning',
    timestamp: '5 days ago',
    read: true,
  },
];

// Persistent storage helper
class UdaanDataStore {
  private athletes: Athlete[] = [];
  private certificates: Certificate[] = [];
  private achievements: Achievement[] = [];
  private assessments: AssessmentResult[] = [];
  private scoutNotes: ScoutNote[] = [];
  private notifications: NotificationItem[] = [];
  private currentUser: User = {
    id: 'user-01',
    email: 'arjun.kumar@talent.udaan.in',
    fullName: 'Arjun Kumar',
    role: 'athlete',
    athleteId: 'IND-2025-ATH-01',
    isLoggedIn: false, // User sees login page first
    aadhaarVerified: false,
  };

  constructor() {
    this.load();
  }

  private load() {
    if (typeof window === 'undefined') return;
    try {
      const savedAthletes = localStorage.getItem('udaan_athletes');
      this.athletes = savedAthletes ? JSON.parse(savedAthletes) : INITIAL_ATHLETES;

      const savedCertificates = localStorage.getItem('udaan_certificates');
      this.certificates = savedCertificates ? JSON.parse(savedCertificates) : INITIAL_CERTIFICATES;

      const savedAchievements = localStorage.getItem('udaan_achievements');
      this.achievements = savedAchievements ? JSON.parse(savedAchievements) : INITIAL_ACHIEVEMENTS;

      const savedAssessments = localStorage.getItem('udaan_assessments');
      this.assessments = savedAssessments ? JSON.parse(savedAssessments) : INITIAL_ASSESSMENTS;

      const savedNotes = localStorage.getItem('udaan_scout_notes');
      this.scoutNotes = savedNotes ? JSON.parse(savedNotes) : INITIAL_SCOUT_NOTES;

      const savedNotifs = localStorage.getItem('udaan_notifications');
      this.notifications = savedNotifs ? JSON.parse(savedNotifs) : INITIAL_NOTIFICATIONS;

      const savedUser = localStorage.getItem('udaan_current_user');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    } catch {
      this.resetToDefaults();
    }
  }

  save() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('udaan_athletes', JSON.stringify(this.athletes));
      localStorage.setItem('udaan_certificates', JSON.stringify(this.certificates));
      localStorage.setItem('udaan_achievements', JSON.stringify(this.achievements));
      localStorage.setItem('udaan_assessments', JSON.stringify(this.assessments));
      localStorage.setItem('udaan_scout_notes', JSON.stringify(this.scoutNotes));
      localStorage.setItem('udaan_notifications', JSON.stringify(this.notifications));
      localStorage.setItem('udaan_current_user', JSON.stringify(this.currentUser));
    } catch {
      // quota or storage error
    }
  }

  resetToDefaults() {
    this.athletes = [...INITIAL_ATHLETES];
    this.certificates = [...INITIAL_CERTIFICATES];
    this.achievements = [...INITIAL_ACHIEVEMENTS];
    this.assessments = [...INITIAL_ASSESSMENTS];
    this.scoutNotes = [...INITIAL_SCOUT_NOTES];
    this.notifications = [...INITIAL_NOTIFICATIONS];
    this.currentUser = {
      id: 'user-01',
      email: 'arjun.kumar@talent.udaan.in',
      fullName: 'Arjun Kumar',
      role: 'athlete',
      athleteId: 'IND-2025-ATH-01',
    };
    this.save();
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    this.save();
  }

  loginUser(user: Partial<User>) {
    this.currentUser = {
      ...this.currentUser,
      ...user,
      isLoggedIn: true,
    };
    this.save();
  }

  logoutUser() {
    this.currentUser = {
      id: '',
      email: '',
      fullName: '',
      role: 'athlete',
      isLoggedIn: false,
      aadhaarVerified: false,
    };
    this.save();
  }

  verifyAthleteAadhaar(athleteId: string, record: AadhaarVerificationRecord) {
    const athlete = this.getAthlete(athleteId);
    if (athlete) {
      athlete.aadhaarVerified = true;
      athlete.aadhaarNumberMasked = record.aadhaarNumberMasked;
      athlete.aadhaarVerificationDate = record.verifiedAt;
      this.updateAthlete(athlete);
    }
    this.currentUser.aadhaarVerified = true;
    this.currentUser.aadhaarDetails = record;
    this.save();

    this.addNotification({
      title: 'Aadhaar Verified (UIDAI e-KYC)',
      message: `Indian Citizenship & Aadhaar ${record.aadhaarNumberMasked} verified successfully. Full assessment video upload unlocked.`,
      type: 'success',
    });
  }

  isAthleteAadhaarVerified(athleteId?: string): boolean {
    if (this.currentUser.role === 'admin') return true;
    if (this.currentUser.aadhaarVerified) return true;
    const targetId = athleteId || this.currentUser.athleteId;
    if (!targetId) return false;
    const athlete = this.getAthlete(targetId);
    return !!athlete?.aadhaarVerified;
  }

  getAthletes(): Athlete[] {
    return this.athletes;
  }

  getAthlete(id: string): Athlete | undefined {
    return this.athletes.find((a) => a.id === id);
  }

  updateAthlete(athlete: Athlete) {
    const idx = this.athletes.findIndex((a) => a.id === athlete.id);
    if (idx !== -1) {
      this.athletes[idx] = athlete;
    } else {
      this.athletes.unshift(athlete);
    }
    this.save();
  }

  updateScoutingStatus(athleteId: string, status: ScoutingStatus) {
    const athlete = this.getAthlete(athleteId);
    if (athlete) {
      athlete.scoutingStatus = status;
      this.updateAthlete(athlete);

      this.addNotification({
        title: 'Scouting Stage Updated',
        message: `${athlete.fullName} promoted to ${status} stage.`,
        type: 'info',
      });
    }
  }

  toggleShortlist(athleteId: string) {
    const athlete = this.getAthlete(athleteId);
    if (athlete) {
      athlete.shortlisted = !athlete.shortlisted;
      this.updateAthlete(athlete);
    }
  }

  getCertificates(athleteId?: string): Certificate[] {
    if (athleteId) {
      return this.certificates.filter((c) => c.athleteId === athleteId);
    }
    return this.certificates;
  }

  addCertificate(cert: Omit<Certificate, 'id' | 'createdAt'>): Certificate {
    const newCert: Certificate = {
      ...cert,
      id: `cert-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.certificates.unshift(newCert);
    this.save();

    this.addNotification({
      title: 'Certificate Submitted',
      message: `"${cert.title}" submitted for scout verification.`,
      type: 'info',
    });

    return newCert;
  }

  updateCertificateStatus(id: string, status: 'Verified' | 'Rejected', remarks?: string, verifiedBy?: string) {
    const cert = this.certificates.find((c) => c.id === id);
    if (cert) {
      cert.verificationStatus = status;
      if (remarks) cert.remarks = remarks;
      if (verifiedBy) cert.verifiedBy = verifiedBy;
      this.save();

      this.addNotification({
        title: `Certificate ${status}`,
        message: `"${cert.title}" has been ${status.toLowerCase()}.`,
        type: status === 'Verified' ? 'success' : 'warning',
      });
    }
  }

  getAchievements(athleteId?: string): Achievement[] {
    if (athleteId) {
      return this.achievements.filter((a) => a.athleteId === athleteId);
    }
    return this.achievements;
  }

  addAchievement(ach: Omit<Achievement, 'id' | 'createdAt'>): Achievement {
    const newAch: Achievement = {
      ...ach,
      id: `ach-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.achievements.unshift(newAch);
    this.save();
    return newAch;
  }

  getAssessments(athleteId?: string): AssessmentResult[] {
    if (athleteId) {
      return this.assessments.filter((a) => a.athleteId === athleteId);
    }
    return this.assessments;
  }

  addAssessment(result: Omit<AssessmentResult, 'id' | 'createdAt'>): AssessmentResult {
    const newResult: AssessmentResult = {
      ...result,
      id: `res-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.assessments.unshift(newResult);

    // Also update athlete's score & scouting status
    const athlete = this.getAthlete(result.athleteId);
    if (athlete) {
      athlete.overallScore = Math.round((athlete.overallScore + result.overallScore) / 2);
      athlete.fitnessScore = Math.max(athlete.fitnessScore, result.formScore);
      athlete.techniqueScore = Math.max(athlete.techniqueScore, result.movementScore);
      athlete.consistencyScore = Math.max(athlete.consistencyScore, result.consistencyScore);
      athlete.aiConfidence = Math.max(athlete.aiConfidence, result.poseConfidence);

      if (athlete.scoutingStatus === 'Profile Created' || athlete.scoutingStatus === 'Profile Incomplete') {
        athlete.scoutingStatus = 'Assessment Completed';
      }
      this.updateAthlete(athlete);
    }

    this.save();

    this.addNotification({
      title: 'AI Assessment Completed',
      message: `${result.assessmentTitle} processed. Performance Score: ${result.overallScore}/100.`,
      type: 'success',
    });

    return newResult;
  }

  getScoutNotes(athleteId: string): ScoutNote[] {
    return this.scoutNotes.filter((n) => n.athleteId === athleteId);
  }

  addScoutNote(note: Omit<ScoutNote, 'id' | 'createdAt'>): ScoutNote {
    const newNote: ScoutNote = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.scoutNotes.unshift(newNote);
    this.save();
    return newNote;
  }

  getNotifications(): NotificationItem[] {
    return this.notifications;
  }

  markNotificationsAsRead() {
    this.notifications.forEach((n) => (n.read = true));
    this.save();
  }

  addNotification(notif: { title: string; message: string; type: 'info' | 'success' | 'warning' }) {
    this.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: notif.title,
      message: notif.message,
      type: notif.type,
      timestamp: 'Just now',
      read: false,
    });
    this.save();
  }
}

export const store = new UdaanDataStore();

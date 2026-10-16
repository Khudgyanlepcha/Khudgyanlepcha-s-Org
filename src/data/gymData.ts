export interface BusinessSettings {
  gymName: string;
  tagline: string;
  address: string;
  cityRegion: string;
  mapQuery: string;
  phoneDisplay: string;
  phoneDial: string;
  whatsappNumber: string;
  email: string;
  weekdayHours: string;
  sundayHours: string;
  currencySymbol: string;
  prices: {
    basic: number;
    pro: number;
    elite: number;
  };
  socialLinks: {
    instagram: string;
    youtube: string;
    facebook: string;
  };
}

export const DEFAULT_BUSINESS_SETTINGS: BusinessSettings = {
  gymName: 'KhudGyan Gym',
  tagline: 'Know Your Strength. Unlock Your Potential.',
  address: '2nd & 3rd Floor, Apex Athletic Complex, MG Road (Editable Address Placeholder)',
  cityRegion: 'Siliguri / Gangtok Highway Corridor, India',
  mapQuery: 'MG Road Gym Fitness Center India',
  phoneDisplay: '+91 98765 43210',
  phoneDial: '+919876543210',
  whatsappNumber: '919876543210',
  email: 'info@khudgyangym.com',
  weekdayHours: 'Mon – Sat: 05:30 AM – 10:30 PM',
  sundayHours: 'Sunday: 07:00 AM – 08:00 PM',
  currencySymbol: '₹',
  prices: {
    basic: 1999,
    pro: 3499,
    elite: 5999,
  },
  socialLinks: {
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    facebook: 'https://facebook.com',
  },
};

export interface TrainingProgram {
  id: string;
  index: string;
  title: string;
  category: 'strength' | 'conditioning' | 'coaching';
  categoryLabel: string;
  duration: string;
  frequency: string;
  level: string;
  shortDescription: string;
  fullOverview: string;
  image: string;
  imageAlt: string;
  targetOutcomes: string[];
  weeklyStructure: { day: string; focus: string }[];
  equipmentUsed: string[];
}

import HERO_IMAGE from '../assets/images/khudgyan_hero_athlete_1791802469062.jpg';
import STRENGTH_IMAGE from '../assets/images/khudgyan_strength_zone_1791802482857.jpg';
import FUNCTIONAL_IMAGE from '../assets/images/khudgyan_functional_cardio_1791802496178.jpg';
import COACHING_IMAGE from '../assets/images/khudgyan_personal_coaching_1791802509116.jpg';
import TEAM_IMAGE from '../assets/images/khudgyan_transformation_athlete_1791802520900.jpg';

export { HERO_IMAGE, STRENGTH_IMAGE, FUNCTIONAL_IMAGE, COACHING_IMAGE, TEAM_IMAGE };

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'strength-training',
    index: '01',
    title: 'Strength Training',
    category: 'strength',
    categoryLabel: 'Strength & Power',
    duration: '60–75 min sessions',
    frequency: '3–5 days / week',
    level: 'All Levels',
    shortDescription:
      'Master compound barbell movements—squat, bench press, deadlift, and overhead press—using structured progressive overload.',
    fullOverview:
      'Our flagship Strength Training track focuses on neuromuscular efficiency, joint stability, and measurable force production. Every training block is built around multi-joint barbell and heavy dumbbell movements with tracked progression charts.',
    image: STRENGTH_IMAGE,
    imageAlt: 'Calibrated weight plates and Olympic squat racks at KhudGyan Gym',
    targetOutcomes: [
      'Increase 1RM and 5RM strength across core compound lifts',
      'Build dense tendon, ligament, and postural resilience',
      'Learn proper bracing, bar path mechanics, and recovery pacing',
    ],
    weeklyStructure: [
      { day: 'Day 1', focus: 'Lower Body Squat & Posterior Chain Accessory' },
      { day: 'Day 2', focus: 'Horizontal Press, Weighted Pulls & Scapular Stability' },
      { day: 'Day 3', focus: 'Active Mobility & Core Anti-Rotation' },
      { day: 'Day 4', focus: 'Deadlift Hinge Progression & Unilateral Leg Strength' },
      { day: 'Day 5', focus: 'Overhead Press & Upper Back Hypertrophy' },
    ],
    equipmentUsed: [
      'Competition Olympic Barbells & Calibrated Iron Plates',
      'Heavy-Duty Power Cages with Safety Spotter Arms',
      'Deadlift Platforms & Specialty Bars (Trap Bar, Safety Squat Bar)',
    ],
  },
  {
    id: 'muscle-building',
    index: '02',
    title: 'Muscle Building',
    category: 'strength',
    categoryLabel: 'Hypertrophy',
    duration: '60 min sessions',
    frequency: '4–6 days / week',
    level: 'Beginner to Advanced',
    shortDescription:
      'Science-backed hypertrophy training combining mechanical tension, controlled eccentrics, and targeted volume for lean muscle growth.',
    fullOverview:
      'Designed for members focused on physique transformation and lean muscle mass. Sessions combine free-weight compound lifts with precision cable and plate-loaded isolation work to stimulate balanced muscular development across every muscle group.',
    image: HERO_IMAGE,
    imageAlt: 'Athlete performing heavy barbell training for muscle hypertrophy',
    targetOutcomes: [
      'Maximize lean muscle tissue cross-sectional growth',
      'Correct muscular asymmetries and improve mind-muscle connection',
      'Align caloric and protein intake targets with training volume',
    ],
    weeklyStructure: [
      { day: 'Day 1', focus: 'Chest, Anterior/Lateral Deltoids & Triceps (Push)' },
      { day: 'Day 2', focus: 'Lats, Mid-Back Rhomboids, Rear Delts & Biceps (Pull)' },
      { day: 'Day 3', focus: 'Quadriceps, Hamstrings, Glutes & Calves (Legs)' },
      { day: 'Day 4', focus: 'Upper Body Hypertrophy Specialization' },
      { day: 'Day 5', focus: 'Lower Body Volume & Core Conditioning' },
    ],
    equipmentUsed: [
      'Knurled Dumbbells (2.5 kg to 60 kg pairs)',
      'Dual Adjustable Pulley Cable Towers',
      'Plate-Loaded Incline Press, Hack Squat & Leg Press Machines',
    ],
  },
  {
    id: 'weight-loss',
    index: '03',
    title: 'Weight Loss',
    category: 'conditioning',
    categoryLabel: 'Metabolic & Fat Loss',
    duration: '45–60 min sessions',
    frequency: '4–5 days / week',
    level: 'All Levels',
    shortDescription:
      'Sustainable fat loss combining metabolic resistance circuits, heart-rate zone conditioning, and practical nutrition habits.',
    fullOverview:
      'Forget crash dieting and endless treadmill slogging. Our Weight Loss program preserves metabolically active muscle tissue through resistance training while elevating daily caloric expenditure via structured interval conditioning and sustainable nutritional accountability.',
    image: FUNCTIONAL_IMAGE,
    imageAlt: 'Indoor turf lane with conditioning sleds and air bikes for metabolic fat loss',
    targetOutcomes: [
      'Reduce body fat percentage while preserving lean muscle mass',
      'Improve insulin sensitivity, resting metabolic rate, and daily energy',
      'Establish sustainable protein and whole-food nutrition habits',
    ],
    weeklyStructure: [
      { day: 'Day 1', focus: 'Full-Body Resistance + Zone 2 Aerobic Finisher' },
      { day: 'Day 2', focus: 'Metabolic Turf Circuit (Sleds, Kettlebells, Battle Ropes)' },
      { day: 'Day 3', focus: 'Low-Impact Recovery Walk & Core Stability' },
      { day: 'Day 4', focus: 'Upper/Lower Supersets + Air Bike Intervals' },
      { day: 'Day 5', focus: 'Athletic Conditioning & Weekly Body-Comp Check-In' },
    ],
    equipmentUsed: [
      'Prowler Sleds & 40m Indoor Turf Track',
      'Cast-Iron Kettlebells, Battle Ropes & Medicine Balls',
      'Fan Air Bikes & Rowing Ergometers',
    ],
  },
  {
    id: 'personal-training',
    index: '04',
    title: 'Personal Training',
    category: 'coaching',
    categoryLabel: '1-on-1 Coaching',
    duration: '60 min dedicated',
    frequency: 'Custom Schedule',
    level: 'Tailored 1:1',
    shortDescription:
      'Individualized 1-on-1 coaching with a dedicated KhudGyan specialist who builds, supervises, and adapts every rep of your plan.',
    fullOverview:
      'The fastest, safest path to measurable transformation. Your coach conducts a comprehensive movement screen, postural assessment, and strength baseline test on Day 1, then guides you through customized mesocycles with real-time cueing and nutrition adjustments.',
    image: COACHING_IMAGE,
    imageAlt: 'Strength coach spotting and guiding an athlete during a barbell squat',
    targetOutcomes: [
      '100% individualized programming around your schedule and injury history',
      'Real-time biomechanical feedback on every set to eliminate injury risk',
      'Bi-weekly progress audits and direct WhatsApp coach accountability',
    ],
    weeklyStructure: [
      { day: 'Phase 1', focus: 'Biomechanical Assessment, Mobility Screen & Baseline Testing' },
      { day: 'Phase 2', focus: 'Foundational Neuromuscular Control & Technique Mastery' },
      { day: 'Phase 3', focus: 'Progressive Load Escalation & Body Composition Optimization' },
      { day: 'Phase 4', focus: 'Peak Performance Testing & Long-Term Maintenance Blueprint' },
    ],
    equipmentUsed: [
      'Full Access to Private Assessment & Free-Weight Zones',
      'Velocity & Rep-Tracking Coaching Logs',
      'Mobility Bands, Foam Rollers & Corrective Exercise Tools',
    ],
  },
  {
    id: 'functional-fitness',
    index: '05',
    title: 'Functional Fitness',
    category: 'conditioning',
    categoryLabel: 'Athletic Performance',
    duration: '50 min sessions',
    frequency: '3–5 days / week',
    level: 'All Levels',
    shortDescription:
      'Build real-world athleticism, multi-planar core stability, rotational power, and joint mobility for everyday resilience.',
    fullOverview:
      'Train movement patterns—not just isolated muscles. Functional Fitness integrates loaded carries, kettlebell ballistics, sled pushes, plyometrics, and thoracic mobility drills so your strength translates seamlessly outside the gym.',
    image: FUNCTIONAL_IMAGE,
    imageAlt: 'Athletes pushing weighted sleds and training with battle ropes on gym turf',
    targetOutcomes: [
      'Enhance agility, balance, grip strength, and multi-planar core stability',
      'Eliminate stiffness from desk work through active hip and shoulder mobility',
      'Build work capacity for sports, trekking, and demanding physical lifestyles',
    ],
    weeklyStructure: [
      { day: 'Day 1', focus: 'Loaded Carries (Farmer, Suitcase, Overhead) & Hinges' },
      { day: 'Day 2', focus: 'Rotational Power, Landmine Press & Sled Conditioning' },
      { day: 'Day 3', focus: 'Gymnastic Pull-Up Progression & Core Stabilization' },
      { day: 'Day 4', focus: 'Turf Agility, Box Plyometrics & Kettlebell Complexes' },
    ],
    equipmentUsed: [
      'Farmer Walk Handles, Sandbags & Weighted Sleds',
      'Landmine Attachments, Rings & Pull-Up Rigs',
      'Plyometric Soft Boxes & Competition Kettlebells',
    ],
  },
  {
    id: 'cardio-training',
    index: '06',
    title: 'Cardio Training',
    category: 'conditioning',
    categoryLabel: 'Endurance & Stamina',
    duration: '35–50 min sessions',
    frequency: '3–6 days / week',
    level: 'All Levels',
    shortDescription:
      'Elevate VO2 max, cardiovascular endurance, and recovery capacity with structured Zone 2 aerobic and HIIT protocols.',
    fullOverview:
      'Whether you are training for high-altitude treks, improving resting heart rate, or boosting stamina between heavy lifting sets, our Cardio Training protocols replace aimless cardio with targeted heart-rate zone intervals.',
    image: TEAM_IMAGE,
    imageAlt: 'Coaches and athletes reviewing cardiovascular conditioning benchmarks',
    targetOutcomes: [
      'Increase VO2 max and lower resting heart rate within 6–8 weeks',
      'Accelerate inter-set recovery during heavy strength workouts',
      'Improve cardiovascular longevity without excessive joint wear',
    ],
    weeklyStructure: [
      { day: 'Session A', focus: 'Zone 2 Aerobic Base Builder (35–45 min steady state)' },
      { day: 'Session B', focus: 'Norwegian 4x4 High-Intensity Interval Protocol' },
      { day: 'Session C', focus: 'Rowing & Air Bike Threshold Conditioning' },
      { day: 'Session D', focus: 'Alactic Sprint Repeats & Active Breathwork Recovery' },
    ],
    equipmentUsed: [
      'Commercial Incline Treadmills & Curved Non-Motorized Runners',
      'Concept-Style Rowing Machines & Ski Ergs',
      'Heavy-Duty Assault Air Bikes & Stair Climbers',
    ],
  },
  {
    id: 'beginner-fitness',
    index: '07',
    title: 'Beginner Fitness Programs',
    category: 'coaching',
    categoryLabel: 'Foundations Track',
    duration: '45–55 min sessions',
    frequency: '3 days / week',
    level: 'First-Time Lifters',
    shortDescription:
      'A structured, zero-intimidation 8-week onboarding track designed to teach gym fundamentals, safe form, and workout consistency.',
    fullOverview:
      'Stepping onto a gym floor for the first time should feel empowering, never overwhelming. Our Beginner Foundations Track pairs small-group floor guidance with step-by-step instruction on machine setup, dumbbell control, breathing mechanics, and habit building.',
    image: COACHING_IMAGE,
    imageAlt: 'Supportive coach teaching foundational squat mechanics to a gym member',
    targetOutcomes: [
      'Build complete confidence navigating free weights, cables, and machines',
      'Master fundamental movement patterns: squat, hinge, push, pull, and carry',
      'Establish a sustainable 3-day-per-week training rhythm without burnout',
    ],
    weeklyStructure: [
      { day: 'Weeks 1–2', focus: 'Equipment Orientation, Bodyweight Mechanics & Machine Control' },
      { day: 'Weeks 3–4', focus: 'Goblet Squats, Dumbbell Presses, Cable Rows & Core Bracing' },
      { day: 'Weeks 5–6', focus: 'Introduction to Barbell Technique & Progressive Logging' },
      { day: 'Weeks 7–8', focus: 'Full-Body Independence Assessment & Next-Stage Graduation' },
    ],
    equipmentUsed: [
      'Guided Pin-Loaded Biomechanical Machines',
      'Light-to-Moderate Dumbbells, Kettlebells & Technique Barbells',
      'Dedicated Beginner Floor Zone with Coach Supervision',
    ],
  },
];

export interface MembershipPlan {
  id: 'basic' | 'pro' | 'elite';
  name: string;
  subtitle: string;
  badge?: string;
  highlighted: boolean;
  description: string;
  features: string[];
  notIncluded?: string[];
  ctaLabel: string;
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    subtitle: 'Essential Gym Access',
    highlighted: false,
    description:
      'Full access to our strength floor, free weights, cardio zone, and locker facilities for self-directed lifters.',
    features: [
      'Unlimited access to strength, barbell & cardio floors',
      '1 complimentary beginner floor orientation session',
      'Digital workout log template & foundational split guide',
      'Secure locker room, filtered hydration station & showers',
      'Flexible month-to-month renewal with zero hidden fees',
    ],
    ctaLabel: 'Select Basic Plan',
  },
  {
    id: 'pro',
    name: 'Pro',
    subtitle: 'Gym Access + Group Training',
    badge: 'Most Popular',
    highlighted: true,
    description:
      'Built for consistent results: full facility access combined with coach-led group conditioning and monthly progress check-ins.',
    features: [
      'Everything in Basic plus 40m functional turf track access',
      'Unlimited coach-led Functional & Metabolic Group Sessions',
      'Monthly body-composition & strength benchmark assessment',
      'Customized 8-week training program updated every mesocycle',
      '2 complimentary guest passes per month for training partners',
      'Membership freeze privilege (up to 14 days per quarter)',
    ],
    ctaLabel: 'Select Pro Plan',
  },
  {
    id: 'elite',
    name: 'Elite',
    subtitle: 'Premium Access & Personal Training',
    highlighted: false,
    description:
      'The complete performance package featuring dedicated 1-on-1 personal training sessions, nutrition coaching, and priority scheduling.',
    features: [
      'Everything in Pro with priority peak-hour rack & turf access',
      '8 dedicated 1-on-1 Personal Training sessions per month',
      'Individualized macro & whole-food nutrition blueprint',
      'Bi-weekly biomechanical video form review & mobility screen',
      'Direct WhatsApp coaching support & recovery adjustments',
      'Membership freeze privilege (up to 30 days per year)',
    ],
    ctaLabel: 'Select Elite Plan',
  },
];

export interface WhyChooseItem {
  number: string;
  title: string;
  metric: string;
  description: string;
}

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    number: '01',
    title: 'Modern Fitness Equipment',
    metric: '45+ Stations & Racks',
    description:
      'Train on competition-grade Olympic barbells, calibrated cast-iron plates, smooth dual-pulley cable towers, and an indoor conditioning turf lane.',
  },
  {
    number: '02',
    title: 'Experienced Trainers',
    metric: '100% Certified Staff',
    description:
      'Our coaches hold recognized strength, conditioning, and sports nutrition credentials—prioritizing safe biomechanics over reckless ego lifting.',
  },
  {
    number: '03',
    title: 'Personalized Workout Plans',
    metric: 'Tailored Mesocycles',
    description:
      'No cookie-cutter routines. Every member receives a structured training split matched to their current mobility, goals, and weekly schedule.',
  },
  {
    number: '04',
    title: 'Clean & Motivating Environment',
    metric: 'Sanitized Hourly',
    description:
      'Climate-controlled ventilation, hospital-grade equipment sanitization throughout the day, and an acoustics-tuned floor designed for deep focus.',
  },
  {
    number: '05',
    title: 'Flexible Membership Options',
    metric: 'Monthly · Quarterly · Annual',
    description:
      'Transparent pricing tiers with zero surprise enrollment fees, straightforward upgrade paths, and pause privileges when travel calls.',
  },
  {
    number: '06',
    title: 'Supportive Fitness Community',
    metric: 'Zero-Ego Culture',
    description:
      'Whether you are learning your first goblet squat or pulling a 200 kg deadlift, our floor culture celebrates discipline, respect, and mutual progress.',
  },
];

export interface TransformationCase {
  id: string;
  title: string;
  memberLabel: string;
  programUsed: string;
  timeframe: string;
  summary: string;
  beforeMetrics: { label: string; value: string }[];
  afterMetrics: { label: string; value: string }[];
  facilityImage: string;
  statusNote: string;
}

export const TRANSFORMATION_CASES: TransformationCase[] = [
  {
    id: 'case-recomp',
    title: '16-Week Strength & Body Recomposition',
    memberLabel: 'Member Track #01 (Authorized Benchmark Log)',
    programUsed: 'Strength Training + Nutrition Blueprint',
    timeframe: '16 Weeks · 4 Sessions / Week',
    summary:
      'Transitioned from sedentary desk routine and chronic lower-back stiffness to pain-free barbell squatting and consistent progressive overload.',
    beforeMetrics: [
      { label: 'Bodyweight', value: '86.4 kg' },
      { label: 'Barbell Squat (5RM)', value: '45.0 kg' },
      { label: 'Deadlift (5RM)', value: '60.0 kg' },
      { label: 'Waist Circumference', value: '94.0 cm' },
    ],
    afterMetrics: [
      { label: 'Bodyweight', value: '78.2 kg' },
      { label: 'Barbell Squat (5RM)', value: '95.0 kg' },
      { label: 'Deadlift (5RM)', value: '125.0 kg' },
      { label: 'Waist Circumference', value: '81.5 cm' },
    ],
    facilityImage: HERO_IMAGE,
    statusNote: 'Verified training log metrics · Upload authorized member photo to replace placeholder view',
  },
  {
    id: 'case-fatloss',
    title: '12-Week Metabolic Conditioning & Stamina',
    memberLabel: 'Member Track #02 (Authorized Benchmark Log)',
    programUsed: 'Weight Loss + Functional Fitness',
    timeframe: '12 Weeks · 5 Sessions / Week',
    summary:
      'Combined full-body resistance supersets with 40m sled pushes and Zone 2 cardiovascular intervals to improve stamina and drop visceral fat.',
    beforeMetrics: [
      { label: 'Bodyweight', value: '79.0 kg' },
      { label: 'Resting Heart Rate', value: '78 bpm' },
      { label: '2km Row Time', value: '09:42 min' },
      { label: 'Push-Up Capacity', value: '6 reps' },
    ],
    afterMetrics: [
      { label: 'Bodyweight', value: '70.5 kg' },
      { label: 'Resting Heart Rate', value: '61 bpm' },
      { label: '2km Row Time', value: '07:54 min' },
      { label: 'Push-Up Capacity', value: '24 reps' },
    ],
    facilityImage: FUNCTIONAL_IMAGE,
    statusNote: 'Verified training log metrics · Upload authorized member photo to replace placeholder view',
  },
  {
    id: 'case-beginner',
    title: '24-Week Beginner Foundation to Hypertrophy',
    memberLabel: 'Member Track #03 (Authorized Benchmark Log)',
    programUsed: 'Beginner Foundations → Muscle Building',
    timeframe: '24 Weeks · 4 Sessions / Week',
    summary:
      'Started with zero prior free-weight experience; completed the 8-week Foundations Track and progressed into an upper/lower hypertrophy split.',
    beforeMetrics: [
      { label: 'Bodyweight', value: '58.5 kg' },
      { label: 'Goblet / Barbell Squat', value: '16.0 kg' },
      { label: 'Overhead Press (5RM)', value: '20.0 kg' },
      { label: 'Strict Chin-Ups', value: '0 reps' },
    ],
    afterMetrics: [
      { label: 'Bodyweight', value: '64.8 kg' },
      { label: 'Barbell Squat (5RM)', value: '82.5 kg' },
      { label: 'Overhead Press (5RM)', value: '45.0 kg' },
      { label: 'Strict Chin-Ups', value: '8 reps' },
    ],
    facilityImage: COACHING_IMAGE,
    statusNote: 'Verified training log metrics · Upload authorized member photo to replace placeholder view',
  },
];

export interface TrainerProfile {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  certifications: string;
  bio: string;
  philosophy: string;
  availability: string;
  image: string;
}

export const TRAINERS: TrainerProfile[] = [
  {
    id: 'trainer-1',
    name: 'Coach Vikram Lepcha (Editable Profile)',
    role: 'Head Strength & Conditioning Coach',
    specialization: 'Barbell Strength · Powerlifting · Biomechanics',
    experience: '9+ Years Coaching Experience',
    certifications: 'CSCS Certified · Olympic Weightlifting Level 2',
    bio: 'Leads programming design at KhudGyan Gym. Specializes in foundational barbell mechanics, progressive strength periodization, and post-rehab strength rebuilding.',
    philosophy: 'Strength is a skill built through patience, textbook form, and consistent logbook progression.',
    availability: 'Mon – Sat · Morning & Evening Blocks',
    image: COACHING_IMAGE,
  },
  {
    id: 'trainer-2',
    name: 'Coach Ananya Sharma (Editable Profile)',
    role: 'Senior Functional & Metabolic Specialist',
    specialization: 'Fat Loss · Functional Mobility · Athletic Conditioning',
    experience: '7+ Years Coaching Experience',
    certifications: 'ACE Certified Personal Trainer · Functional Movement Screen (FMS)',
    bio: 'Heads group metabolic conditioning and beginner onboarding tracks. Focuses on joint mobility, sustainable body recomposition, and female strength development.',
    philosophy: 'Your training should give you more energy for life outside the gym, never leave you broken down.',
    availability: 'Mon – Sat · 06:00 AM – 02:00 PM',
    image: TEAM_IMAGE,
  },
  {
    id: 'trainer-3',
    name: 'Coach Rohan Thapa (Editable Profile)',
    role: 'Hypertrophy & Sports Nutrition Coach',
    specialization: 'Muscle Hypertrophy · Body Recomposition · Macro Planning',
    experience: '6+ Years Coaching Experience',
    certifications: 'ISSN Sports Nutrition Specialist · Certified Strength Coach',
    bio: 'Guides members through structured muscle-building mesocycles paired with practical, culturally adaptable whole-food nutrition strategies.',
    philosophy: 'Hard work on the gym floor only compounds when supported by disciplined sleep and nutrition.',
    availability: 'Mon – Sat · 01:00 PM – 10:00 PM',
    image: HERO_IMAGE,
  },
];

export interface TestimonialItem {
  id: string;
  memberName: string;
  memberRole: string;
  programTag: string;
  durationTag: string;
  quote: string;
  outcomeHighlight: string;
  isPlaceholder: boolean;
}

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'journey-1',
    memberName: 'Authorized Member Slot #1 (Editable Placeholder)',
    memberRole: 'Beginner Foundations & Strength Track',
    programTag: 'Strength Training',
    durationTag: '6 Months at KhudGyan Gym',
    quote:
      'Before joining KhudGyan Gym, I avoided the free-weight area out of fear of injuring my lower back. The coaches walked me through every squat and deadlift cue during my onboarding month. Six months later, I train four days a week pain-free and feel stronger than I did in my twenties.',
    outcomeHighlight: 'Progressed from bodyweight movements to a 90 kg barbell deadlift with zero lower-back pain',
    isPlaceholder: true,
  },
  {
    id: 'journey-2',
    memberName: 'Authorized Member Slot #2 (Editable Placeholder)',
    memberRole: 'Working Professional · Morning Batch',
    programTag: 'Weight Loss & Functional Fitness',
    durationTag: '16 Weeks at KhudGyan Gym',
    quote:
      'What sets KhudGyan Gym apart is the discipline and cleanliness of the floor. There is no ego, equipment is always racked where it belongs, and the 6:30 AM functional conditioning sessions helped me stay consistent even during demanding work weeks.',
    outcomeHighlight: 'Completed 64 consecutive morning sessions and improved cardiovascular recovery',
    isPlaceholder: true,
  },
  {
    id: 'journey-3',
    memberName: 'Authorized Member Slot #3 (Editable Placeholder)',
    memberRole: '1-on-1 Personal Training Member',
    programTag: 'Personal Training',
    durationTag: '24 Weeks at KhudGyan Gym',
    quote:
      'Having a structured workout log and a coach who tracks every set changed my entire approach to fitness. Instead of guessing what machines to use, every session has a clear objective and measurable progression.',
    outcomeHighlight: 'Built consistent 4-day training discipline and sustainable high-protein nutrition habits',
    isPlaceholder: true,
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How does the Free Trial or Gym Visit booking work?',
    answer:
      'You can book a complimentary 1-day trial workout and facility tour using the booking form below or via WhatsApp. Upon arrival, a coach will walk you through the training zones, discuss your fitness goals, and supervise your trial workout—with zero obligation or high-pressure sales.',
  },
  {
    question: 'I am a complete beginner. Will I receive guidance on how to use the equipment?',
    answer:
      'Yes. Every membership includes a structured floor orientation, and our Beginner Fitness Program is specifically designed for first-time lifters. Our floor coaches are always available to spot your lifts, check your posture, and adjust machine settings.',
  },
  {
    question: 'Are the membership prices all-inclusive, or are there hidden joining fees?',
    answer:
      'Our pricing is 100% transparent. There are no surprise annual maintenance charges or hidden registration fees. You can also save 15% on Quarterly plans or 25% on Annual memberships.',
  },
  {
    question: 'Can I pause or freeze my membership if I travel out of town?',
    answer:
      'Pro members can freeze their membership for up to 14 days per quarter, and Elite members can freeze for up to 30 days per year with simple prior notice via WhatsApp or the front desk.',
  },
  {
    question: 'What should I bring for my first training session at KhudGyan Gym?',
    answer:
      'Bring clean indoor training shoes (non-marking soles), comfortable athletic wear, a sweat towel, and a water bottle. We provide secure day lockers, filtered drinking water refills, and clean changing rooms.',
  },
  {
    question: 'How can the gym owner customize the placeholder prices, address, and member stories on this website?',
    answer:
      'Click the "Customize Gym Details & Pricing" button in the Membership or Contact section at any time. You can update the monthly prices, currency symbol, street address, phone number, WhatsApp number, business hours, and member testimonials—all changes update live and save automatically in your browser.',
  },
];

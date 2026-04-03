export type UserRole = 'student' | 'mentor' | 'counselor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface CareerMatch {
  id: string;
  title: string;
  matchPercent: number;
  reason: string;
  salaryRange: { min: number; max: number };
  skills: string[];
  educationPath: string[];
  description: string;
  field: string;
  growth: string;
  courses?: Course[];
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  url: string;
  free: boolean;
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  category: 'personality' | 'interest' | 'skills' | 'values';
  type: 'scale' | 'multiple' | 'open';
  options?: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  category: 'skill' | 'achievement' | 'milestone';
  verified: boolean;
  color: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  rating: number;
  sessions: number;
  avatar: string;
  bio: string;
  available: boolean;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Internship';
  skills: string[];
  posted: string;
  description: string;
}

export interface DNAProfile {
  analytical: number;
  creative: number;
  technical: number;
  communication: number;
  leadership: number;
  empathy: number;
}

export interface StudentProgress {
  assessmentComplete: boolean;
  passportBadges: number;
  mentorSessions: number;
  simulationsComplete: number;
  overallProgress: number;
  weeklyActivity: { day: string; hours: number }[];
}

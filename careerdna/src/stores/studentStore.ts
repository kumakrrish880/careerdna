import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DNAProfile, CareerMatch, Badge, StudentProgress } from '@/types';

interface StudentStore {
  dnaProfile: DNAProfile;
  careerMatches: CareerMatch[];
  badges: Badge[];
  progress: StudentProgress;
  assessmentAnswers: Record<string, unknown>;
  setDNAProfile: (profile: DNAProfile) => void;
  setCareerMatches: (matches: CareerMatch[]) => void;
  setAssessmentAnswer: (questionId: string, answer: unknown) => void;
  clearAssessment: () => void;
}

export const useStudentStore = create<StudentStore>()(
  persist(
    (set) => ({
      dnaProfile: { analytical: 78, creative: 65, technical: 82, communication: 70, leadership: 58, empathy: 74 },
      careerMatches: [],
      badges: [],
      progress: {
        assessmentComplete: false,
        passportBadges: 0,
        mentorSessions: 0,
        simulationsComplete: 0,
        overallProgress: 0,
        weeklyActivity: [
          { day: 'Mon', hours: 1.5 },
          { day: 'Tue', hours: 2 },
          { day: 'Wed', hours: 0.5 },
          { day: 'Thu', hours: 3 },
          { day: 'Fri', hours: 2.5 },
          { day: 'Sat', hours: 4 },
          { day: 'Sun', hours: 1 },
        ],
      },
      assessmentAnswers: {},
      setDNAProfile: (profile) => set({ dnaProfile: profile }),
      setCareerMatches: (matches) => set({ careerMatches: matches }),
      setAssessmentAnswer: (questionId, answer) =>
        set((state) => ({ assessmentAnswers: { ...state.assessmentAnswers, [questionId]: answer } })),
      clearAssessment: () => set({ assessmentAnswers: {} }),
    }),
    { name: 'student-store' }
  )
);

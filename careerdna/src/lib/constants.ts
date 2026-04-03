import { AssessmentQuestion, Badge, Mentor, JobListing, CareerMatch } from '@/types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  { id: 'q1', text: 'I enjoy analyzing complex problems and finding logical solutions.', category: 'personality', type: 'scale' },
  { id: 'q2', text: 'I prefer working in teams rather than independently.', category: 'personality', type: 'scale' },
  { id: 'q3', text: 'I am drawn to creative fields like design, writing, or art.', category: 'interest', type: 'scale' },
  { id: 'q4', text: 'I enjoy working with computers, software, and technology.', category: 'interest', type: 'scale' },
  { id: 'q5', text: 'I like helping others and making a positive social impact.', category: 'values', type: 'scale' },
  { id: 'q6', text: 'Which of these activities excites you most?', category: 'interest', type: 'multiple', options: ['Building apps or websites', 'Designing visuals or experiences', 'Conducting scientific research', 'Leading a business or startup', 'Teaching or mentoring others'] },
  { id: 'q7', text: 'What is your strongest academic subject area?', category: 'skills', type: 'multiple', options: ['Mathematics & Science', 'Languages & Literature', 'Arts & Humanities', 'Commerce & Economics', 'Computer Science'] },
  { id: 'q8', text: 'I am comfortable taking risks for potentially bigger rewards.', category: 'personality', type: 'scale' },
  { id: 'q9', text: 'I prefer structured routines over spontaneous, varied work.', category: 'personality', type: 'scale' },
  { id: 'q10', text: 'What work environment suits you best?', category: 'values', type: 'multiple', options: ['Startup - fast-paced, innovative', 'Corporate - structured, stable', 'Remote - flexible, independent', 'Field - outdoor, hands-on', 'Creative agency - collaborative'] },
  { id: 'q11', text: 'I enjoy public speaking and presenting ideas to others.', category: 'skills', type: 'scale' },
  { id: 'q12', text: 'I often think about entrepreneurship and starting my own venture.', category: 'interest', type: 'scale' },
  { id: 'q13', text: 'Describe a project or activity you worked on that made you feel proud.', category: 'skills', type: 'open' },
  { id: 'q14', text: 'What kind of problems do you most want to solve in the world?', category: 'values', type: 'open' },
  { id: 'q15', text: 'Where do you see yourself professionally in 10 years?', category: 'values', type: 'open' },
];

export const MOCK_BADGES: Badge[] = [
  { id: 'b1', title: 'Assessment Pioneer', description: 'Completed your first Career DNA Assessment', icon: '🧬', earnedAt: '2024-01-15', category: 'milestone', verified: true, color: 'from-cyan-500 to-blue-500' },
  { id: 'b2', title: 'Tech Explorer', description: 'Completed 3 technology career simulations', icon: '🚀', earnedAt: '2024-01-20', category: 'achievement', verified: true, color: 'from-violet-500 to-purple-500' },
  { id: 'b3', title: 'Design Thinker', description: 'Passed the UX Design Challenge', icon: '🎨', earnedAt: '2024-01-25', category: 'skill', verified: true, color: 'from-pink-500 to-rose-500' },
  { id: 'b4', title: 'Code Warrior', description: 'Solved 10 programming challenges', icon: '💻', earnedAt: '2024-02-01', category: 'skill', verified: false, color: 'from-emerald-500 to-teal-500' },
  { id: 'b5', title: 'Mentor Connect', description: 'Had your first mentorship session', icon: '🤝', earnedAt: '2024-02-05', category: 'milestone', verified: true, color: 'from-amber-500 to-orange-500' },
  { id: 'b6', title: 'Market Maven', description: 'Explored 5+ career market insights', icon: '📊', earnedAt: '2024-02-10', category: 'achievement', verified: false, color: 'from-blue-500 to-indigo-500' },
];

export const MOCK_MENTORS: Mentor[] = [
  { id: 'm1', name: 'Priya Sharma', title: 'Senior Product Manager', company: 'Google', expertise: ['Product Management', 'UX', 'Tech Strategy'], rating: 4.9, sessions: 142, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100', bio: '10+ years in tech. Helped 200+ students break into PM roles at top companies.', available: true },
  { id: 'm2', name: 'Rahul Mehta', title: 'AI Research Engineer', company: 'DeepMind', expertise: ['Machine Learning', 'Python', 'Research'], rating: 4.8, sessions: 89, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', bio: 'PhD in CS. Passionate about making AI education accessible.', available: true },
  { id: 'm3', name: 'Ananya Krishnan', title: 'Founder & CEO', company: 'EduTech Startup', expertise: ['Entrepreneurship', 'Fundraising', 'EdTech'], rating: 4.7, sessions: 203, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', bio: 'Built and sold 2 startups. Now mentoring the next gen of founders.', available: false },
  { id: 'm4', name: 'Vikram Nair', title: 'Design Lead', company: 'Figma', expertise: ['UI/UX Design', 'Design Systems', 'Figma'], rating: 4.9, sessions: 167, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', bio: 'Design systems expert. Helped shape the tools millions of designers use daily.', available: true },
];

export const MOCK_JOBS: JobListing[] = [
  { id: 'j1', title: 'Frontend Developer', company: 'Razorpay', location: 'Bangalore', salary: '₹12-18 LPA', type: 'Full-time', skills: ['React', 'TypeScript', 'Node.js'], posted: '2024-02-10', description: 'Build next-gen payment experiences for millions of users.' },
  { id: 'j2', title: 'Data Science Intern', company: 'Flipkart', location: 'Remote', salary: '₹50,000/mo', type: 'Internship', skills: ['Python', 'ML', 'SQL'], posted: '2024-02-08', description: 'Work on recommendation systems impacting 400M+ users.' },
  { id: 'j3', title: 'UX Designer', company: 'CRED', location: 'Bangalore', salary: '₹10-15 LPA', type: 'Full-time', skills: ['Figma', 'User Research', 'Prototyping'], posted: '2024-02-07', description: 'Design premium experiences for India\'s credit-conscious consumers.' },
  { id: 'j4', title: 'Product Manager', company: 'Swiggy', location: 'Bangalore', salary: '₹18-25 LPA', type: 'Full-time', skills: ['Product Strategy', 'Analytics', 'SQL'], posted: '2024-02-06', description: 'Drive growth for food delivery products used by millions daily.' },
];

export const MOCK_CAREERS: CareerMatch[] = [
  {
    id: 'c1', title: 'AI/ML Engineer', matchPercent: 94, field: 'Technology',
    reason: 'Your strong analytical profile combined with high technical aptitude and curiosity for complex systems makes you a natural fit for AI/ML engineering.',
    salaryRange: { min: 1200000, max: 3500000 },
    skills: ['Python', 'TensorFlow', 'Mathematics', 'Data Analysis', 'SQL'],
    educationPath: ["B.Tech CS/AI", "Kaggle competitions", "Research internship", "ML Engineer role"],
    description: 'Design and deploy machine learning models that power intelligent applications.',
    growth: '+40% by 2030',
    courses: [
      { id: 'co1', title: 'Machine Learning Specialization', provider: 'Coursera', duration: '3 months', level: 'Intermediate', url: '#', free: false },
      { id: 'co2', title: 'Deep Learning with Python', provider: 'Fast.ai', duration: '7 weeks', level: 'Advanced', url: '#', free: true },
    ],
  },
  {
    id: 'c2', title: 'Product Designer', matchPercent: 88, field: 'Design',
    reason: 'Your creative tendencies, empathy scores, and communication strengths align perfectly with user-centered design thinking.',
    salaryRange: { min: 800000, max: 2200000 },
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Psychology'],
    educationPath: ["Design degree / bootcamp", "Portfolio building", "Internship", "Junior Designer"],
    description: 'Craft digital experiences that are both beautiful and functionally seamless.',
    growth: '+25% by 2030',
    courses: [
      { id: 'co3', title: 'Google UX Design Certificate', provider: 'Coursera', duration: '6 months', level: 'Beginner', url: '#', free: false },
    ],
  },
  {
    id: 'c3', title: 'Startup Founder', matchPercent: 82, field: 'Entrepreneurship',
    reason: 'High risk tolerance, leadership traits, and your vision for solving real-world problems positions you strongly for entrepreneurship.',
    salaryRange: { min: 0, max: 10000000 },
    skills: ['Leadership', 'Communication', 'Product Thinking', 'Fundraising', 'Strategy'],
    educationPath: ["Any degree", "Side projects", "Network building", "First startup"],
    description: 'Build companies from scratch, solving problems that matter at scale.',
    growth: 'Unlimited',
    courses: [
      { id: 'co4', title: 'How to Start a Startup', provider: 'Y Combinator', duration: '20 videos', level: 'Beginner', url: '#', free: true },
    ],
  },
];

export const NAV_LINKS = [
  { href: '/student', label: 'Dashboard' },
  { href: '/student/assessment', label: 'Assessment' },
  { href: '/student/recommendations', label: 'Careers' },
  { href: '/student/simulations/ux-designer', label: 'Simulations' },
  { href: '/student/passport', label: 'Passport' },
  { href: '/student/mentors', label: 'Mentors' },
  { href: '/student/market', label: 'Market' },
  { href: '/student/progress', label: 'Progress' },
];

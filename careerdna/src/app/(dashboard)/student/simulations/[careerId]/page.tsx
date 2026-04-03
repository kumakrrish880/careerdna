'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Clock, CheckCircle2, XCircle, Lightbulb, ArrowRight, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import toast from 'react-hot-toast';

const simulations: Record<string, { title: string; scenario: string; challenges: Challenge[] }> = {
  'c1': {
    title: 'AI/ML Engineer Day',
    scenario: "You're a junior ML engineer at a fast-growing fintech startup. It's Monday morning and your team has an urgent problem.",
    challenges: [
      { id: 1, type: 'decision', prompt: "Your model's accuracy dropped from 94% to 81% overnight in production. What's your first action?", options: ["Rollback to the previous model immediately", "Analyze the data distribution shift", "Alert the team and start root cause analysis", "Deploy a hotfix without investigation"], correct: 2, explanation: "Root cause analysis with team involvement is crucial before any action. Blind rollback may lose important improvements." },
      { id: 2, type: 'design', prompt: "Design the feature pipeline for a fraud detection model. Which features would you prioritize?", options: ["Transaction amount only", "Amount + time + merchant + user history + velocity", "Just use raw transaction data without features", "Only user demographic data"], correct: 1, explanation: "Rich contextual features (amount, time, merchant, history, velocity) give the model the best signal for fraud detection." },
      { id: 3, type: 'voice', prompt: "Your manager asks you to explain the model performance drop to a non-technical stakeholder. How would you describe it?", options: ["Use technical jargon like 'data drift' and 'covariate shift'", "Explain it as: 'The real-world data changed from what we trained on, like training to recognize cats but seeing dogs'", "Say it's too technical to explain", "Just show them the accuracy numbers"], correct: 1, explanation: "Analogies make technical concepts accessible. Simplification builds trust with non-technical stakeholders." },
    ]
  },
  'c2': {
    title: 'UX Designer Challenge',
    scenario: "You just joined a product design team at a mid-stage startup. Your first brief: redesign the onboarding flow that has a 60% drop-off.",
    challenges: [
      { id: 1, type: 'decision', prompt: "Where do you start with the onboarding redesign?", options: ["Jump straight into Figma and start designing", "Run user interviews to understand why people drop off", "Look at analytics data first, then plan research", "Copy a competitor's onboarding"], correct: 2, explanation: "Analytics first helps you understand where drop-offs happen, then research reveals why. Data-informed research planning." },
      { id: 2, type: 'design', prompt: "You discover users leave at the 'Add your first item' step. What's the best UX solution?", options: ["Remove that step entirely", "Add more detailed instructions", "Add a pre-filled example so users see what 'done' looks like", "Make the button bigger"], correct: 2, explanation: "Pre-filled examples remove cognitive load and show users a clear goal state — a classic UX pattern for reducing abandonment." },
      { id: 3, type: 'decision', prompt: "Your design is ready. How do you validate it before full launch?", options: ["Launch directly to all users", "A/B test with 10% of users first", "Send to only 1 user", "Ask the CEO what they think"], correct: 1, explanation: "A/B testing with a small cohort lets you validate improvements with real data and minimal risk." },
    ]
  },
  'c3': {
    title: 'Startup Founder Simulation',
    scenario: "You've just raised ₹50L seed funding for your EdTech startup. It's your first week as CEO.",
    challenges: [
      { id: 1, type: 'decision', prompt: "Your first priority with the ₹50L should be:", options: ["Marketing campaigns immediately", "Hire a great team and build an MVP", "Rent a fancy office", "Pay yourself a high salary"], correct: 1, explanation: "Team and MVP are the foundation. You need product-market fit before spending on marketing or perks." },
      { id: 2, type: 'voice', prompt: "An investor asks: 'How will you beat BYJUs?' Your best response:", options: ["'We'll outspend them on marketing'", "'We're focused on a specific underserved niche they ignore — vernacular language learners in Tier 2/3 cities'", "'We have better technology'", "'We won't compete, we'll partner with them'"], correct: 1, explanation: "Niche focus and clear differentiation is a winning strategy for startups vs giants. Generic answers don't inspire investor confidence." },
      { id: 3, type: 'decision', prompt: "After 3 months, your metrics: 500 users, ₹40L remaining, 35% monthly churn. What do you do?", options: ["Raise more money immediately", "Pause growth, fix churn first by talking to churned users", "Pivot to a completely different market", "Cut the team to extend runway"], correct: 1, explanation: "High churn means you haven't found product-market fit. Understanding why users leave is critical before spending more on acquisition." },
    ]
  },
};

type Challenge = {
  id: number;
  type: string;
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
};

export default function SimulationPage() {
  const params = useParams();
  const careerId = params?.careerId as string || 'c1';
  const sim = simulations[careerId] || simulations['c1'];

  const [step, setStep] = useState<'intro' | 'challenge' | 'result'>('intro');
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const challenge = sim.challenges[challengeIdx];
  const score = answers.filter(Boolean).length;
  const total = sim.challenges.length;

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setShowExplanation(true);
    setAnswers(prev => [...prev, i === challenge.correct]);
  };

  const handleNext = () => {
    if (challengeIdx < total - 1) {
      setChallengeIdx(c => c + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setStep('result');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
          <Link href="/student/recommendations" className="hover:text-white transition-colors">Careers</Link>
          <span>/</span>
          <span className="text-white/70">Simulation</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-white">{sim.title}</h1>
      </motion.div>

      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Card>
              <CardContent className="pt-8 pb-8 space-y-6 text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 flex items-center justify-center mx-auto text-4xl">🎮</div>
                <div className="space-y-3">
                  <h2 className="font-display text-2xl font-bold text-white">Career Simulation</h2>
                  <p className="text-white/50 leading-relaxed">{sim.scenario}</p>
                </div>
                <div className="flex items-center justify-center gap-6 text-sm text-white/40">
                  <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> ~5 minutes</div>
                  <div className="flex items-center gap-1.5">📋 {total} challenges</div>
                  <div className="flex items-center gap-1.5">🏆 Badge on completion</div>
                </div>
                <Button size="lg" onClick={() => setStep('challenge')} className="gap-2">
                  Start Simulation <ArrowRight className="w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'challenge' && (
          <motion.div key={`ch-${challengeIdx}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/40">
                <span>Challenge {challengeIdx + 1} of {total}</span>
                <Badge variant="secondary" className="capitalize">{challenge.type}</Badge>
              </div>
              <Progress value={((challengeIdx) / total) * 100} />
            </div>

            <Card>
              <CardContent className="pt-6 pb-6 space-y-5">
                <h2 className="font-display text-xl font-bold text-white leading-tight">{challenge.prompt}</h2>

                <div className="space-y-3">
                  {challenge.options.map((opt, i) => {
                    const isSelected = selected === i;
                    const isCorrect = i === challenge.correct;
                    const showResult = selected !== null;

                    return (
                      <motion.button
                        key={i}
                        onClick={() => handleSelect(i)}
                        whileHover={selected === null ? { scale: 1.01 } : {}}
                        className={`w-full text-left px-5 py-4 rounded-xl border font-body transition-all duration-300 ${
                          !showResult ? 'bg-white/3 border-white/8 text-white/60 hover:bg-white/8 hover:text-white hover:border-white/15' :
                          isCorrect ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' :
                          isSelected && !isCorrect ? 'bg-red-500/15 border-red-500/40 text-red-300' :
                          'bg-white/2 border-white/5 text-white/25'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            !showResult ? 'border-white/20' :
                            isCorrect ? 'border-emerald-400' :
                            isSelected ? 'border-red-400' : 'border-white/10'
                          }`}>
                            {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                            {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400" />}
                          </div>
                          <span className="text-sm">{opt}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {showExplanation && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-3">
                      <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-blue-400 font-display font-semibold text-sm mb-1">Insight</div>
                        <p className="text-blue-200/70 text-sm leading-relaxed">{challenge.explanation}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {selected !== null && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Button onClick={handleNext} className="w-full gap-2">
                      {challengeIdx < total - 1 ? 'Next Challenge' : 'See Results'}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
            <Card>
              <CardContent className="pt-10 pb-10 space-y-6">
                <motion.div animate={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ delay: 0.5, duration: 0.5 }} className="text-6xl">
                  {score === total ? '🏆' : score >= total / 2 ? '🎯' : '💪'}
                </motion.div>
                <div>
                  <h2 className="font-display text-3xl font-bold text-white">Simulation Complete!</h2>
                  <p className="text-white/40 mt-2">You scored {score} out of {total}</p>
                </div>
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-500/30 flex items-center justify-center mx-auto">
                  <div>
                    <div className="font-display text-4xl font-extrabold text-cyan-400">{Math.round((score / total) * 100)}%</div>
                    <div className="text-white/30 text-xs">Score</div>
                  </div>
                </div>
                {score === total && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="text-amber-400 font-display font-semibold flex items-center gap-2 justify-center">
                      <Trophy className="w-5 h-5" /> Badge Unlocked: {sim.title} Expert
                    </div>
                  </div>
                )}
                <div className="flex gap-3 justify-center">
                  <Button asChild>
                    <Link href="/student/recommendations">Explore Careers</Link>
                  </Button>
                  <Button variant="outline" onClick={() => { setStep('intro'); setChallengeIdx(0); setSelected(null); setAnswers([]); }}>
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

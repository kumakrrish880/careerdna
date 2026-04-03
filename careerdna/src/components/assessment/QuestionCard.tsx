'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AssessmentQuestion } from '@/types';
import { VoiceRecorder } from './VoiceRecorder';

interface Props {
  question: AssessmentQuestion;
  answer: unknown;
  onChange: (val: unknown) => void;
  index: number;
}

const SCALE_LABELS = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

export function QuestionCard({ question, answer, onChange, index }: Props) {
  const categoryColors: Record<string, string> = {
    personality: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400',
    interest: 'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-400',
    skills: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    values: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
  };
  const colorClass = categoryColors[question.category] || categoryColors.personality;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="space-y-6"
      >
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-gradient-to-r text-xs font-display font-semibold ${colorClass}`}>
          {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
          {question.text}
        </h2>

        {question.type === 'scale' && (
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => onChange(val)}
                  className={`py-3 rounded-xl border font-display font-bold text-lg transition-all duration-200 hover:scale-105 ${
                    answer === val
                      ? 'bg-gradient-to-b from-cyan-500 to-blue-600 border-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-white/30 px-1">
              <span>{SCALE_LABELS[0]}</span>
              <span>{SCALE_LABELS[4]}</span>
            </div>
          </div>
        )}

        {question.type === 'multiple' && question.options && (
          <div className="space-y-3">
            {question.options.map((opt) => (
              <button
                key={opt}
                onClick={() => onChange(opt)}
                className={`w-full text-left px-5 py-4 rounded-xl border font-body transition-all duration-200 hover:scale-[1.01] ${
                  answer === opt
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-cyan-500/50 text-cyan-300'
                    : 'bg-white/3 border-white/8 text-white/60 hover:bg-white/8 hover:border-white/15 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${answer === opt ? 'border-cyan-400' : 'border-white/20'}`}>
                    {answer === opt && <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />}
                  </div>
                  {opt}
                </div>
              </button>
            ))}
          </div>
        )}

        {question.type === 'open' && (
          <div className="space-y-3">
            <textarea
              value={(answer as string) || ''}
              onChange={(e) => onChange(e.target.value)}
              rows={4}
              placeholder="Share your thoughts..."
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 resize-none font-body text-sm transition-all"
            />
            <VoiceRecorder onTranscript={(t) => onChange(t)} />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Upload, CheckCircle2, Loader2, Dna } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressSteps } from '@/components/assessment/ProgressSteps';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { useAssessment } from '@/hooks/useAssessment';
import Link from 'next/link';

export default function AssessmentPage() {
  const {
    currentStep, currentQuestion, totalQuestions, progress,
    assessmentAnswers, isSubmitting, isComplete,
    setAnswer, next, prev, submit,
  } = useAssessment();

  const currentAnswer = assessmentAnswers[currentQuestion?.id];
  const isLast = currentStep === totalQuestions - 1;
  const hasAnswer = currentAnswer !== undefined && currentAnswer !== '';

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: 2, ease: 'linear' }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"
        >
          <Dna className="w-12 h-12 text-white" />
        </motion.div>
        <div className="space-y-3">
          <h2 className="font-display text-4xl font-bold text-white">
            Your Career DNA is <span className="text-gradient">Ready!</span>
          </h2>
          <p className="text-white/50 text-lg max-w-md">
            We&apos;ve analyzed your responses and built your unique career profile. Explore your matches now.
          </p>
        </div>
        <div className="flex gap-4">
          <Button size="lg" asChild>
            <Link href="/student/recommendations">View Career Matches</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/student">Back to Dashboard</Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        <div className="flex items-center gap-2 text-white/40 text-sm">
          <Link href="/student" className="hover:text-white transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-white/70">Career DNA Assessment</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-white">Career DNA Assessment</h1>
        <p className="text-white/40">Answer honestly for the most accurate career matches.</p>
      </motion.div>

      {/* Progress */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <ProgressSteps current={currentStep} total={totalQuestions} />
      </motion.div>

      {/* Question */}
      <Card className="min-h-[360px]">
        <CardContent className="pt-8 pb-6">
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              answer={currentAnswer}
              onChange={setAnswer}
              index={currentStep}
            />
          )}
        </CardContent>
      </Card>

      {/* File Upload (last question area) */}
      {currentStep === totalQuestions - 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-5 border-dashed border-2 border-white/15 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
            <Upload className="w-5 h-5 text-white/40" />
          </div>
          <div className="flex-1">
            <p className="text-white/60 text-sm font-display font-medium">Optional: Upload your marksheet</p>
            <p className="text-white/25 text-xs mt-0.5">PDF or image — helps us refine academic-based recommendations</p>
          </div>
          <Button variant="outline" size="sm">Browse</Button>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={prev}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </Button>

        <span className="text-white/25 text-sm font-mono">{currentStep + 1} / {totalQuestions}</span>

        {isLast ? (
          <Button
            onClick={submit}
            disabled={isSubmitting || !hasAnswer}
            className="gap-2"
            size="lg"
          >
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing DNA...</>
            ) : (
              <><CheckCircle2 className="w-4 h-4" /> Complete Assessment</>
            )}
          </Button>
        ) : (
          <Button
            onClick={next}
            disabled={!hasAnswer}
            className="gap-2"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto"
              >
                <Dna className="w-10 h-10 text-white" />
              </motion.div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white">Building Your Career DNA</h3>
                <p className="text-white/40 mt-1">AI is analyzing your responses across 50+ dimensions...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

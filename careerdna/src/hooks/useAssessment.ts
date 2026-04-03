import { useState } from 'react';
import { useStudentStore } from '@/stores/studentStore';
import { ASSESSMENT_QUESTIONS } from '@/lib/constants';
import { submitAssessment } from '@/lib/api-client';
import toast from 'react-hot-toast';

export function useAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { assessmentAnswers, setAssessmentAnswer } = useStudentStore();

  const currentQuestion = ASSESSMENT_QUESTIONS[currentStep];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const progress = ((currentStep) / totalQuestions) * 100;

  const setAnswer = (value: unknown) => {
    setAssessmentAnswer(currentQuestion.id, value);
  };

  const next = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const submit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setIsComplete(true);
      toast.success('Assessment complete! Generating your Career DNA...');
    } catch {
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    currentQuestion,
    totalQuestions,
    progress,
    assessmentAnswers,
    isSubmitting,
    isComplete,
    setAnswer,
    next,
    prev,
    submit,
  };
}

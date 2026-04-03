'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

interface Props {
  onTranscript: (text: string) => void;
}

export function VoiceRecorder({ onTranscript }: Props) {
  const [recording, setRecording] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Speech recognition not supported in this browser');
      return;
    }
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: typeof window.SpeechRecognition; webkitSpeechRecognition?: typeof window.SpeechRecognition }).SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: typeof window.SpeechRecognition }).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join('');
      onTranscript(transcript);
      setHasResult(true);
    };
    recognition.onerror = () => {
      setRecording(false);
      toast.error('Voice recognition error. Please try typing instead.');
    };
    recognition.onend = () => setRecording(false);
    
    recognition.start();
    recognitionRef.current = recognition;
    setRecording(true);
    toast.success('Listening... speak your answer');
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={recording ? stopRecording : startRecording}
        className={recording ? 'border-red-500/40 text-red-400 hover:bg-red-500/10' : ''}
      >
        <AnimatePresence mode="wait">
          {recording ? (
            <motion.span key="stop" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                <Square className="w-3 h-3 fill-current" />
              </motion.div>
              Stop Recording
            </motion.span>
          ) : (
            <motion.span key="start" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
              <Mic className="w-3 h-3" /> Voice Answer
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
      {hasResult && <span className="text-xs text-emerald-400 flex items-center gap-1">✓ Voice captured</span>}
    </div>
  );
}

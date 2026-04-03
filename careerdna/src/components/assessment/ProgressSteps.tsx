'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Props {
  current: number;
  total: number;
}

export function ProgressSteps({ current, total }: Props) {
  const segments = Math.min(total, 15);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/40">Question {current + 1} of {total}</span>
        <span className="font-display font-bold text-cyan-400">{Math.round(((current) / total) * 100)}%</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: segments }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.03 }}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              i < current ? 'bg-gradient-to-r from-cyan-500 to-blue-600' :
              i === current ? 'bg-cyan-500/50' : 'bg-white/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Loader2, RefreshCw } from 'lucide-react';
import { CareerCard } from '@/components/recommendations/CareerCard';
import { useRecommendations } from '@/hooks/useRecommendations';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export default function RecommendationsPage() {
  const { careers, loading, favorites, toggleFavorite } = useRecommendations();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
            <Link href="/student" className="hover:text-white transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-white/70">Career Matches</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white">Your Career Matches</h1>
          <p className="text-white/40 mt-1">AI-ranked based on your Career DNA profile</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="w-4 h-4" /> Retake Assessment
        </Button>
      </motion.div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-64 rounded-2xl" />)}
        </div>
      ) : (
        <div className="space-y-6">
          {careers.map((career, i) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <CareerCard
                career={career}
                rank={i + 1}
                isFavorite={favorites.includes(career.id)}
                onFavorite={() => toggleFavorite(career.id)}
              />
            </motion.div>
          ))}
        </div>
      )}

      {!loading && careers.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 space-y-4">
          <div className="text-6xl">🎯</div>
          <h3 className="font-display text-xl text-white">No matches yet</h3>
          <p className="text-white/40">Complete your assessment to get personalized career matches</p>
          <Button asChild>
            <Link href="/student/assessment">Take Assessment</Link>
          </Button>
        </motion.div>
      )}
    </div>
  );
}

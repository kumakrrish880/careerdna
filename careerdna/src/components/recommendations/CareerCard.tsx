'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Heart, Zap, TrendingUp, GraduationCap, BookOpen } from 'lucide-react';
import { CareerMatch } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { formatSalary } from '@/lib/utils';

interface Props {
  career: CareerMatch;
  isFavorite: boolean;
  onFavorite: () => void;
  rank: number;
}

export function CareerCard({ career, isFavorite, onFavorite, rank }: Props) {
  const [expanded, setExpanded] = useState(false);

  const rankColors = ['from-amber-500 to-orange-600', 'from-slate-400 to-slate-500', 'from-amber-700 to-amber-800'];
  const matchColor = career.matchPercent >= 90 ? 'text-emerald-400' : career.matchPercent >= 80 ? 'text-cyan-400' : 'text-blue-400';

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Rank badge */}
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${rankColors[rank - 1] || 'from-blue-500 to-indigo-600'} flex items-center justify-center flex-shrink-0 font-display font-extrabold text-white text-lg`}>
            #{rank}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-bold text-white">{career.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{career.field}</Badge>
                  <span className="text-white/30 text-xs">•</span>
                  <span className="text-white/40 text-xs flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> {career.growth}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={onFavorite} className="p-2 rounded-xl hover:bg-white/5 transition-colors">
                  <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-rose-400 text-rose-400' : 'text-white/20'}`} />
                </button>
                <div className="text-right">
                  <div className={`font-display text-2xl font-extrabold ${matchColor}`}>{career.matchPercent}%</div>
                  <div className="text-white/30 text-xs">match</div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <Progress value={career.matchPercent} className="h-2" />
            </div>

            <p className="mt-3 text-white/50 text-sm leading-relaxed">{career.reason}</p>

            {/* Salary */}
            <div className="mt-4 flex items-center gap-4">
              <div className="glass rounded-xl px-4 py-2">
                <div className="text-white/30 text-xs">Salary Range</div>
                <div className="font-display font-bold text-white text-sm">
                  {formatSalary(career.salaryRange.min)} – {formatSalary(career.salaryRange.max)}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {career.skills.map((skill) => (
                <span key={skill} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-white/50 text-xs">
                  {skill}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap gap-3">
              <Button size="sm" asChild>
                <Link href={`/student/simulations/${career.id}`}>
                  <Zap className="w-3 h-3 mr-1" /> Try Simulation
                </Link>
              </Button>
              <Button size="sm" variant="outline" onClick={() => setExpanded(!expanded)}>
                <BookOpen className="w-3 h-3 mr-1" />
                Courses & Path
                {expanded ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Expanded: Education Path + Courses */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Education Path */}
                <div>
                  <h4 className="font-display font-semibold text-white/70 text-sm flex items-center gap-2 mb-3">
                    <GraduationCap className="w-4 h-4 text-violet-400" /> Education Path
                  </h4>
                  <div className="space-y-2">
                    {career.educationPath.map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </div>
                        <span className="text-white/50 text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Courses */}
                {career.courses && career.courses.length > 0 && (
                  <div>
                    <h4 className="font-display font-semibold text-white/70 text-sm flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-emerald-400" /> Recommended Courses
                    </h4>
                    <div className="space-y-3">
                      {career.courses.map((course) => (
                        <div key={course.id} className="p-3 rounded-xl bg-white/3 border border-white/5">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-white/80 text-sm font-medium">{course.title}</p>
                              <p className="text-white/40 text-xs mt-0.5">{course.provider} · {course.duration}</p>
                            </div>
                            <Badge variant={course.free ? 'success' : 'outline'} className="flex-shrink-0">
                              {course.free ? 'Free' : 'Paid'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

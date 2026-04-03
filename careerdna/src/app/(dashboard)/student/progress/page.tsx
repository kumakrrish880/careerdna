'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2, Circle, Trophy, Calendar, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useStudentStore } from '@/stores/studentStore';
import Link from 'next/link';
import toast from 'react-hot-toast';

const milestones = [
  { label: 'Account Created', date: 'Jan 10, 2024', done: true },
  { label: 'Career DNA Assessment', date: 'Jan 15, 2024', done: true },
  { label: 'First Career Simulation', date: 'Jan 20, 2024', done: true },
  { label: 'Mentor Session Booked', date: 'Feb 5, 2024', done: true },
  { label: 'Second Simulation', date: 'Feb 12, 2024', done: false },
  { label: 'Career Roadmap Finalized', date: 'Mar 2024 (planned)', done: false },
  { label: 'First Internship Application', date: 'Apr 2024 (planned)', done: false },
];

export default function ProgressPage() {
  const { progress } = useStudentStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
          <Link href="/student" className="hover:text-white transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-white/70">My Progress</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-white">Career Progress</h1>
        <p className="text-white/40 mt-1">Your journey from student to career-ready</p>
      </motion.div>

      {/* Overall Progress */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-display font-semibold text-white">Overall Journey</span>
              <span className="font-display font-bold text-2xl text-gradient">34%</span>
            </div>
            <Progress value={34} className="h-4" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {[
                { label: 'Assessment', value: 100, color: 'text-cyan-400' },
                { label: 'Simulations', value: 40, color: 'text-violet-400' },
                { label: 'Mentorship', value: 25, color: 'text-emerald-400' },
                { label: 'Career Plan', value: 10, color: 'text-amber-400' },
              ].map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/50">{item.label}</span>
                    <span className={`font-bold ${item.color}`}>{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" /> This Week's Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={progress.weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} unit="h" />
                  <Tooltip
                    contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#f1f5f9' }}
                    formatter={(v: number) => [`${v}h`, 'Hours']}
                  />
                  <Bar dataKey="hours" fill="url(#weekGrad)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="weekGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00d2ff" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.5} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-3 flex items-center gap-2 text-sm text-white/40">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>15.5 hours total this week · <span className="text-emerald-400">+23%</span> from last week</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Journey Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-0">
                <div className="absolute left-4 top-3 bottom-3 w-px bg-gradient-to-b from-cyan-500/50 via-white/10 to-transparent" />
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.07 }}
                    className="flex gap-4 py-3 items-start"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${m.done ? 'bg-cyan-500/20 border border-cyan-500/40' : 'bg-white/5 border border-white/10'}`}>
                      {m.done
                        ? <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        : <Circle className="w-4 h-4 text-white/20" />}
                    </div>
                    <div className="pt-0.5">
                      <div className={`font-display font-medium text-sm ${m.done ? 'text-white' : 'text-white/30'}`}>{m.label}</div>
                      <div className="text-white/25 text-xs mt-0.5">{m.date}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Check-in + Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="sm:col-span-2">
          <Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-transparent">
            <CardContent className="pt-6 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                <Bell className="w-7 h-7 text-violet-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-white text-lg">Weekly Check-In</h3>
                <p className="text-white/40 text-sm mt-0.5">Log your progress and reflect on your week. Keep the momentum going!</p>
              </div>
              <Button onClick={() => toast.success('Check-in saved! Great work this week 🎯')} className="flex-shrink-0">
                Check In
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="text-center">
            <CardContent className="pt-6 space-y-2">
              <div className="text-4xl">🔥</div>
              <div className="font-display text-3xl font-extrabold text-amber-400">14</div>
              <div className="text-white/50 text-sm">Day Streak</div>
              <Badge variant="warning">Personal Best!</Badge>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

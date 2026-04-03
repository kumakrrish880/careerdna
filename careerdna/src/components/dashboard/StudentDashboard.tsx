'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Brain, Target, Trophy, Zap, Users, TrendingUp, ArrowRight, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { DNARadarChart } from './RadarChart';
import { useStudentStore } from '@/stores/studentStore';
import { MOCK_CAREERS, MOCK_BADGES } from '@/lib/constants';

interface Props { userName: string }

export function StudentDashboard({ userName }: Props) {
  const { dnaProfile, progress } = useStudentStore();

  const quickActions = [
    { label: 'Take Assessment', href: '/student/assessment', icon: Brain, color: 'from-cyan-500 to-blue-600', desc: 'Discover your DNA' },
    { label: 'Find Mentor', href: '/student/mentors', icon: Users, color: 'from-violet-500 to-purple-600', desc: 'Expert guidance' },
    { label: 'View Passport', href: '/student/passport', icon: Trophy, color: 'from-amber-500 to-orange-600', desc: 'Your credentials' },
    { label: 'Market Data', href: '/student/market', icon: TrendingUp, color: 'from-emerald-500 to-teal-600', desc: 'Job insights' },
  ];

  const activities = [
    { text: 'Completed UX Design simulation', time: '2h ago', icon: '🎨' },
    { text: 'Earned "Tech Explorer" badge', time: '1d ago', icon: '🏆' },
    { text: 'Session with Priya Sharma', time: '2d ago', icon: '🤝' },
    { text: 'Reviewed ML Engineer career path', time: '3d ago', icon: '🔍' },
  ];

  const deadlines = [
    { task: 'Complete skills assessment', due: 'Today', urgent: true },
    { task: 'Book mentor session', due: 'In 3 days', urgent: false },
    { task: 'Try career simulation', due: 'This week', urgent: false },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">
            Welcome back, <span className="text-gradient">{userName}</span> 👋
          </h1>
          <p className="text-white/40 mt-1">Your career journey is {progress.overallProgress || 34}% complete</p>
        </div>
        <div className="glass rounded-2xl px-5 py-3 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/60 text-sm">Active Journey</span>
        </div>
      </motion.div>

      {/* Overall Progress */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/60 text-sm font-medium">Overall Journey Progress</span>
              <span className="font-display font-bold text-cyan-400">34%</span>
            </div>
            <Progress value={34} className="h-3" />
            <div className="mt-4 grid grid-cols-4 gap-4">
              {[
                { label: 'Assessment', done: true },
                { label: 'Simulations', done: false },
                { label: 'Mentor', done: false },
                { label: 'Passport', done: false },
              ].map((step) => (
                <div key={step.label} className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.done ? 'bg-cyan-500/20 border border-cyan-500/40' : 'bg-white/5 border border-white/10'}`}>
                    {step.done ? <CheckCircle2 className="w-4 h-4 text-cyan-400" /> : <div className="w-2 h-2 rounded-full bg-white/20" />}
                  </div>
                  <span className="text-xs text-white/40">{step.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Row */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Career Matches', value: '3', icon: Target, color: 'text-cyan-400' },
          { label: 'Badges Earned', value: '6', icon: Trophy, color: 'text-amber-400' },
          { label: 'Simulations', value: '2', icon: Zap, color: 'text-violet-400' },
          { label: 'Mentor Sessions', value: '1', icon: Users, color: 'text-emerald-400' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.05 }}>
            <Card className="text-center p-4">
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
              <div className={`font-display text-3xl font-extrabold ${stat.color}`}>{stat.value}</div>
              <div className="text-white/40 text-xs mt-1">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* DNA Radar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-400" /> Your Career DNA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DNARadarChart profile={dnaProfile} />
              <div className="mt-4 grid grid-cols-2 gap-2">
                {Object.entries(dnaProfile).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white/3">
                    <span className="text-white/50 text-xs capitalize">{key}</span>
                    <span className="font-display font-bold text-sm text-cyan-400">{val}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Career Matches + Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="lg:col-span-2 space-y-6">
          {/* Top Careers */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="w-5 h-5 text-violet-400" /> Top Career Matches
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/student/recommendations">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_CAREERS.map((career) => (
                <div key={career.id} className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all group">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-semibold text-white text-sm">{career.title}</span>
                      <Badge variant="secondary" className="text-xs">{career.field}</Badge>
                    </div>
                    <p className="text-white/40 text-xs mt-0.5">{career.growth} growth</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-display font-bold text-cyan-400">{career.matchPercent}%</div>
                      <div className="text-white/30 text-xs">match</div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/student/recommendations">Explore</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Activity + Deadlines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-white/40" /> Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-lg">{a.icon}</span>
                    <div>
                      <p className="text-white/70 text-xs leading-relaxed">{a.text}</p>
                      <p className="text-white/25 text-xs mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-white/40" /> Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {deadlines.map((d, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/3">
                    <span className="text-white/60 text-xs flex-1">{d.task}</span>
                    <Badge variant={d.urgent ? 'destructive' : 'outline'} className="text-xs ml-2 flex-shrink-0">{d.due}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <h2 className="font-display font-semibold text-white/60 text-sm mb-4 uppercase tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <motion.div key={action.label} whileHover={{ y: -3, scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Link href={action.href} className="block">
                <div className="glass rounded-2xl p-5 text-center space-y-3 border-white/10 hover:border-white/20 transition-all group">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-white text-sm">{action.label}</div>
                    <div className="text-white/35 text-xs">{action.desc}</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

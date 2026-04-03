'use client';

import { motion } from 'framer-motion';
import { Users, BarChart3, FileText, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CounselorDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-white">Counselor Dashboard</h1>
        <p className="text-white/40 mt-1">Manage and guide your student cohort</p>
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Active Students', value: '234', icon: Users, color: 'text-cyan-400' },
          { label: 'Assessments Done', value: '187', icon: FileText, color: 'text-violet-400' },
          { label: 'Career Clarity', value: '78%', icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Avg Progress', value: '52%', icon: BarChart3, color: 'text-amber-400' },
        ].map((s) => (
          <Card key={s.label} className="p-4 text-center">
            <s.icon className={`w-6 h-6 ${s.color} mx-auto mb-2`} />
            <div className={`font-display text-3xl font-extrabold ${s.color}`}>{s.value}</div>
            <div className="text-white/40 text-xs mt-1">{s.label}</div>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Student Overview</CardTitle></CardHeader>
        <CardContent>
          <p className="text-white/50 text-sm mb-4">Your students who need attention:</p>
          {['Ravi Kumar - Assessment incomplete', 'Divya Nair - No mentor session in 2 weeks', 'Amit Shah - Low progress score'].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5 mb-2">
              <span className="text-white/60 text-sm">{s}</span>
              <Button size="sm" variant="outline">View</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

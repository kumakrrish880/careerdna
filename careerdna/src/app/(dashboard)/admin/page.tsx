'use client';

import { motion } from 'framer-motion';
import { Users, Shield, Database, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-white/40 mt-1">Platform management and analytics</p>
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '52,400', icon: Users, color: 'text-cyan-400' },
          { label: 'Active Institutions', value: '124', icon: Shield, color: 'text-violet-400' },
          { label: 'DB Health', value: '99.9%', icon: Database, color: 'text-emerald-400' },
          { label: 'API Uptime', value: '100%', icon: Activity, color: 'text-amber-400' },
        ].map((s) => (
          <Card key={s.label} className="p-4 text-center">
            <s.icon className={`w-6 h-6 ${s.color} mx-auto mb-2`} />
            <div className={`font-display text-3xl font-extrabold ${s.color}`}>{s.value}</div>
            <div className="text-white/40 text-xs mt-1">{s.label}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

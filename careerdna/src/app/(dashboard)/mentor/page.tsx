'use client';

import { motion } from 'framer-motion';
import { Users, Calendar, Star, MessageSquare, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const pendingRequests = [
  { name: 'Arjun Patel', goal: 'Break into ML Engineering', time: '2h ago', match: 92 },
  { name: 'Priya Reddy', goal: 'UX Design Portfolio Review', time: '1d ago', match: 85 },
  { name: 'Kiran Mehta', goal: 'Product Management career switch', time: '2d ago', match: 78 },
];

export default function MentorDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-white">Mentor Dashboard</h1>
        <p className="text-white/40 mt-1">Guide the next generation of Indian talent</p>
      </motion.div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Sessions', value: '142', icon: Calendar, color: 'text-cyan-400' },
          { label: 'Students Helped', value: '89', icon: Users, color: 'text-violet-400' },
          { label: 'Avg Rating', value: '4.9', icon: Star, color: 'text-amber-400' },
          { label: 'Pending Requests', value: '3', icon: MessageSquare, color: 'text-emerald-400' },
        ].map((s) => (
          <Card key={s.label} className="p-4 text-center">
            <s.icon className={`w-6 h-6 ${s.color} mx-auto mb-2`} />
            <div className={`font-display text-3xl font-extrabold ${s.color}`}>{s.value}</div>
            <div className="text-white/40 text-xs mt-1">{s.label}</div>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><MessageSquare className="w-5 h-5 text-cyan-400" /> Session Requests</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {pendingRequests.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-all">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{r.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-display font-semibold text-white text-sm">{r.name}</div>
                  <div className="text-white/40 text-xs">{r.goal}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right text-xs text-white/30"><Clock className="w-3 h-3 inline mr-1" />{r.time}</div>
                <Badge variant="success">{r.match}% match</Badge>
                <Button size="sm">Accept</Button>
                <Button size="sm" variant="outline">Decline</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

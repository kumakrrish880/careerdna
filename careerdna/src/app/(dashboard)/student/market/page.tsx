'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, TrendingUp, ExternalLink } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_JOBS } from '@/lib/constants';
import Link from 'next/link';

const salaryData = [
  { role: 'ML Engineer', avg: 2200000, min: 1200000, max: 3500000 },
  { role: 'Product Designer', avg: 1400000, min: 800000, max: 2200000 },
  { role: 'PM', avg: 2800000, min: 1800000, max: 4000000 },
  { role: 'Data Scientist', avg: 1800000, min: 1000000, max: 2800000 },
  { role: 'SWE', avg: 2000000, min: 1200000, max: 3200000 },
];

const demandData = [
  { month: 'Sep', ml: 420, design: 280, pm: 310 },
  { month: 'Oct', ml: 480, design: 310, pm: 340 },
  { month: 'Nov', ml: 510, design: 330, pm: 360 },
  { month: 'Dec', ml: 460, design: 290, pm: 320 },
  { month: 'Jan', ml: 590, design: 380, pm: 410 },
  { month: 'Feb', ml: 640, design: 420, pm: 450 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload?.length) {
    return (
      <div className="glass rounded-xl p-3 text-xs">
        <p className="text-white/60 font-display mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' && p.value > 10000 ? `₹${(p.value / 100000).toFixed(1)}L` : p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function MarketPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
          <Link href="/student" className="hover:text-white transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-white/70">Market Intelligence</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-white">Job Market Intelligence</h1>
        <p className="text-white/40 mt-1">Real-time data from 1M+ job postings across India</p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Open Roles', value: '24,800+', trend: '+12%', color: 'text-cyan-400' },
          { label: 'Avg Tech Salary', value: '₹18.5L', trend: '+8%', color: 'text-emerald-400' },
          { label: 'Remote Jobs', value: '38%', trend: '+5%', color: 'text-violet-400' },
          { label: 'Hiring Growth', value: '+22%', trend: 'YoY', color: 'text-amber-400' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.05 }}>
            <Card className="p-4 text-center">
              <div className={`font-display text-2xl font-extrabold ${s.color}`}>{s.value}</div>
              <div className="text-white/40 text-xs mt-1">{s.label}</div>
              <div className="text-emerald-400 text-xs mt-0.5 flex items-center justify-center gap-1">
                <TrendingUp className="w-3 h-3" />{s.trend}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Salary Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Salary Benchmarks by Role</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={salaryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" tickFormatter={(v) => `₹${v / 100000}L`} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
                  <YAxis type="category" dataKey="role" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} width={90} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="avg" fill="url(#barGrad)" radius={[0, 4, 4, 0]} />
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00d2ff" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.9} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Demand Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Skill Demand Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={demandData}>
                  <defs>
                    <linearGradient id="mlGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d2ff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00d2ff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="designGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="pmGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }} />
                  <Area type="monotone" dataKey="ml" stroke="#00d2ff" fill="url(#mlGrad)" strokeWidth={2} name="ML/AI" />
                  <Area type="monotone" dataKey="design" stroke="#8b5cf6" fill="url(#designGrad)" strokeWidth={2} name="Design" />
                  <Area type="monotone" dataKey="pm" stroke="#f59e0b" fill="url(#pmGrad)" strokeWidth={2} name="Product" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Job Listings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-400" /> Live Job Listings
              </CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {MOCK_JOBS.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-semibold text-white">{job.title}</h4>
                    <Badge variant={job.type === 'Remote' ? 'success' : job.type === 'Internship' ? 'warning' : 'default'}>
                      {job.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-white/40">
                    <span className="text-cyan-400 font-medium">{job.company}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.posted}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {job.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-white/5 text-white/40 text-xs">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className="font-display font-bold text-emerald-400 text-sm">{job.salary}</div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1">
                    Apply <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

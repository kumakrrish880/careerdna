'use client';

import { motion } from 'framer-motion';
import { Brain, TrendingUp, Users, Gamepad2, Shield, BarChart3 } from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI Career DNA', desc: 'Psychometric analysis + AI creates your unique career fingerprint from 50+ data points.', gradient: 'from-cyan-500/20 to-blue-500/20', iconColor: 'text-cyan-400', border: 'border-cyan-500/20' },
  { icon: TrendingUp, title: 'Real-Time Job Data', desc: 'Live market insights from 1M+ job postings, salary benchmarks, and demand forecasts.', gradient: 'from-violet-500/20 to-purple-500/20', iconColor: 'text-violet-400', border: 'border-violet-500/20' },
  { icon: Users, title: 'AI Mentor Matching', desc: 'Get matched with industry professionals who align with your exact career DNA profile.', gradient: 'from-pink-500/20 to-rose-500/20', iconColor: 'text-pink-400', border: 'border-pink-500/20' },
  { icon: Gamepad2, title: 'Career Simulations', desc: 'Experience actual day-in-the-life scenarios before committing to a career path.', gradient: 'from-emerald-500/20 to-teal-500/20', iconColor: 'text-emerald-400', border: 'border-emerald-500/20' },
  { icon: Shield, title: 'Blockchain Skill Badges', desc: 'Earn verifiable, blockchain-backed credentials that prove your competencies to employers.', gradient: 'from-amber-500/20 to-orange-500/20', iconColor: 'text-amber-400', border: 'border-amber-500/20' },
  { icon: BarChart3, title: 'Progress Tracking', desc: 'Visualize your career journey evolution with rich analytics and milestone tracking.', gradient: 'from-blue-500/20 to-indigo-500/20', iconColor: 'text-blue-400', border: 'border-blue-500/20' },
];

export function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/50 text-sm">
          Platform Features
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold">
          Everything You Need to{' '}
          <span className="text-gradient">Navigate Your Future</span>
        </h2>
        <p className="text-white/40 text-lg max-w-2xl mx-auto">
          From AI-powered assessments to real industry simulations — CareerDNA has every tool to help you find your path.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`relative rounded-2xl border ${f.border} bg-gradient-to-br ${f.gradient} backdrop-blur-xl p-6 group overflow-hidden`}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors" />
            <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4`}>
              <f.icon className={`w-6 h-6 ${f.iconColor}`} />
            </div>
            <h3 className="font-display font-semibold text-lg text-white mb-2">{f.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

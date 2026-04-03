'use client';

import { motion } from 'framer-motion';

const steps = [
  { n: '01', title: 'Create Your Account', desc: 'Sign up with Google or email. Choose your role as student, mentor, or counselor.' },
  { n: '02', title: 'Take the DNA Assessment', desc: '15 deep-dive questions across personality, interests, skills, and values — takes just 10 minutes.' },
  { n: '03', title: 'Get Your Career DNA', desc: 'AI analyzes your responses and generates a unique multidimensional profile.' },
  { n: '04', title: 'Explore Career Matches', desc: 'Receive your top career paths with salary data, skill requirements, and real demand signals.' },
  { n: '05', title: 'Try Career Simulations', desc: 'Experience real work scenarios in your top matches to validate your interest.' },
  { n: '06', title: 'Build Your Career Passport', desc: 'Earn blockchain-backed badges, connect with mentors, and track your progress.' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 space-y-4">
        <h2 className="font-display text-4xl sm:text-5xl font-bold">
          Your Journey in <span className="text-gradient">6 Steps</span>
        </h2>
        <p className="text-white/40 text-lg max-w-xl mx-auto">From assessment to career clarity — a clear, guided path designed for students at any stage.</p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-violet-500/30 to-transparent hidden md:block" />
        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 md:gap-8 items-start"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 flex items-center justify-center font-display font-bold text-cyan-400 text-lg relative z-10">
                {step.n}
              </div>
              <div className="pt-3 flex-1">
                <h3 className="font-display font-semibold text-xl text-white mb-2">{step.title}</h3>
                <p className="text-white/40 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

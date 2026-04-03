'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Arjun Patel', role: 'Now at Google — Software Engineer', text: 'CareerDNA\'s AI assessment identified ML engineering for me when I thought I wanted finance. The career simulation sealed the deal. Best decision I made in Class 12.', rating: 5, avatar: 'AP' },
  { name: 'Sneha Reddy', role: 'UX Designer at Zomato', text: 'I was completely lost about my career. Within 20 minutes of the assessment, I had a clear roadmap to UX design. The mentor matching found me the perfect guide.', rating: 5, avatar: 'SR' },
  { name: 'Dev Sharma', role: 'Founder, AgriTech Startup', text: 'The entrepreneurship pathway recommendation was spot-on. The blockchain badges I earned helped me get into a startup incubator. CareerDNA changed my trajectory.', rating: 5, avatar: 'DS' },
];

export function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
          Students Who Found Their <span className="text-gradient">Path</span>
        </h2>
        <p className="text-white/40 text-lg">Real transformations from students just like you.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass rounded-2xl p-6 space-y-4 border-white/10"
          >
            <div className="flex gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-white/70 text-sm leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
            <div className="flex items-center gap-3 pt-2 border-t border-white/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-violet-600 flex items-center justify-center font-display font-bold text-sm text-white">
                {t.avatar}
              </div>
              <div>
                <div className="font-display font-semibold text-white text-sm">{t.name}</div>
                <div className="text-white/40 text-xs">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

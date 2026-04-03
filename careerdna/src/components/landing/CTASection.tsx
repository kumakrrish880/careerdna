'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 p-12 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 to-transparent" />
        <div className="relative z-10 space-y-6">
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            Ready to Discover Your{' '}
            <span className="text-gradient">Career DNA?</span>
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Join 50,000+ students who have found career clarity through AI-powered guidance. Free forever.
          </p>
          <Button size="xl" variant="glow" asChild>
            <Link href="/sign-up">
              Start Free — No Credit Card <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <p className="text-white/25 text-sm">Takes 10 minutes. Results last a lifetime.</p>
        </div>
      </motion.div>
    </section>
  );
}

'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.8, 100, 200]} scale={1}>
        <MeshDistortMaterial
          color="#00d2ff"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
          emissive="#0066ff"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[100px] translate-x-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-8 z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Career Intelligence Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight"
          >
            Discover Your{' '}
            <span className="text-gradient">Career</span>
            <br />
            <span className="text-white/90">Blueprint</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl text-white/50 max-w-lg leading-relaxed font-body"
          >
            CareerDNA analyzes your personality, skills, and passions to generate a personalized career roadmap — backed by real job market data and expert mentors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="xl" variant="glow" asChild>
              <Link href="/sign-up">
                Start Free Assessment <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-6 text-sm text-white/30"
          >
            {['50,000+ Students', '98% Match Accuracy', '500+ Career Paths'].map((stat) => (
              <div key={stat} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                {stat}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="h-[500px] lg:h-[600px] relative"
        >
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={1} color="#00d2ff" />
              <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />
              <pointLight position={[0, 0, 3]} intensity={1} color="#00d2ff" />
              <Suspense fallback={null}>
                <AnimatedSphere />
              </Suspense>
            </Canvas>
          </div>
          {/* Floating badges */}
          {[
            { label: 'AI Match: 94%', pos: 'top-10 left-4', delay: 0.9 },
            { label: '🎯 UX Designer', pos: 'top-32 right-4', delay: 1.1 },
            { label: '💡 ML Engineer', pos: 'bottom-32 left-4', delay: 1.3 },
            { label: '₹18-25 LPA', pos: 'bottom-10 right-8', delay: 1.5 },
          ].map(({ label, pos, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay }}
              className={`absolute ${pos} glass rounded-xl px-3 py-2 text-xs font-display font-semibold text-white border-white/10 z-10`}
            >
              {label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

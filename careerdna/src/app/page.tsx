import Link from 'next/link';
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Dna, Github, Twitter, Linkedin } from 'lucide-react';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Testimonials } from '@/components/landing/Testimonials';
import { CTASection } from '@/components/landing/CTASection';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Dna className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl">Career<span className="text-gradient">DNA</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/50">
            <Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#testimonials" className="hover:text-white transition-colors">Stories</Link>
          </nav>
          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Get Started</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button size="sm" asChild>
                <Link href="/student">Dashboard</Link>
              </Button>
            </SignedIn>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <Features />
        <div id="how-it-works"><HowItWorks /></div>
        <div id="testimonials"><Testimonials /></div>

        {/* Pricing */}
        <section id="pricing" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-display text-4xl sm:text-5xl font-bold">Simple, <span className="text-gradient">Transparent</span> Pricing</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { plan: 'Free', price: '₹0', period: 'forever', features: ['Basic DNA Assessment', 'Top 3 career matches', 'Market data overview', 'Community access'], cta: 'Get Started', highlight: false },
              { plan: 'Premium', price: '₹999', period: 'per month', features: ['Full DNA Assessment', 'Unlimited career matches', 'Career simulations', 'Mentor matching', 'Blockchain badges', 'Priority support'], cta: 'Start Free Trial', highlight: true },
              { plan: 'Institutional', price: 'Custom', period: 'per institution', features: ['Everything in Premium', 'Bulk student licenses', 'Counselor dashboard', 'Analytics & reporting', 'Custom branding', 'Dedicated support'], cta: 'Contact Sales', highlight: false },
            ].map((p) => (
              <div key={p.plan} className={`rounded-2xl p-6 space-y-6 ${p.highlight ? 'bg-gradient-to-b from-cyan-500/20 to-blue-600/10 border border-cyan-500/30 glow-cyan' : 'glass border-white/10'}`}>
                <div>
                  <div className="font-display font-bold text-lg text-white/70">{p.plan}</div>
                  <div className="font-display text-4xl font-extrabold text-white mt-1">{p.price}</div>
                  <div className="text-white/30 text-sm">{p.period}</div>
                </div>
                <ul className="space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={p.highlight ? 'glow' : 'outline'} asChild>
                  <Link href="/sign-up">{p.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </section>

        <CTASection />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Dna className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold">CareerDNA</span>
          </div>
          <p className="text-white/25 text-sm">© 2024 CareerDNA. Built for India's next generation.</p>
          <div className="flex items-center gap-4 text-white/30">
            <Github className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
            <Twitter className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
            <Linkedin className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}

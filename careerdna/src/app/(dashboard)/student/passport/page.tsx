'use client';

import { motion } from 'framer-motion';
import { Shield, Share2, ExternalLink, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_BADGES } from '@/lib/constants';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function PassportPage() {
  const verifiedCount = MOCK_BADGES.filter(b => b.verified).length;
  const passportUrl = 'https://careerdna.app/passport/student-123';

  const handleShare = () => {
    navigator.clipboard?.writeText(passportUrl);
    toast.success('Passport link copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
          <Link href="/student" className="hover:text-white transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-white/70">Career Passport</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-white">Career Passport</h1>
        <p className="text-white/40 mt-1">Your blockchain-verified skill credentials</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR + Share Panel */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-base">Share Your Passport</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full aspect-square max-w-[180px] mx-auto rounded-2xl bg-white p-3 flex items-center justify-center">
                <QRCodeSVG value={passportUrl} size={160} bgColor="white" fgColor="#0f172a" />
              </div>
              <div className="space-y-2">
                <div className="text-xs text-white/30 break-all font-mono px-2">{passportUrl}</div>
                <div className="flex items-center gap-1 justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-emerald-400 text-xs">{verifiedCount} verified on blockchain</span>
                </div>
              </div>
              <div className="space-y-2">
                <Button className="w-full gap-2" onClick={handleShare}>
                  <Share2 className="w-4 h-4" /> Share Passport
                </Button>
                <Button className="w-full gap-2" variant="outline">
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
                <Button className="w-full gap-2" variant="outline">
                  <ExternalLink className="w-4 h-4" /> Verify on Chain
                </Button>
              </div>

              {/* Stats */}
              <div className="pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="font-display font-bold text-xl text-cyan-400">{MOCK_BADGES.length}</div>
                  <div className="text-white/30 text-xs">Total</div>
                </div>
                <div>
                  <div className="font-display font-bold text-xl text-emerald-400">{verifiedCount}</div>
                  <div className="text-white/30 text-xs">Verified</div>
                </div>
                <div>
                  <div className="font-display font-bold text-xl text-violet-400">3</div>
                  <div className="text-white/30 text-xs">Skills</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Badges Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-400" /> Earned Badges
                </CardTitle>
                <Badge variant="warning">{MOCK_BADGES.length} Badges</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {MOCK_BADGES.map((badge, i) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    whileHover={{ y: -4, scale: 1.03 }}
                    className="group relative"
                  >
                    <div className={`rounded-2xl border bg-gradient-to-br ${badge.color} p-4 text-center space-y-2 border-white/10 group-hover:border-white/20 transition-all`}>
                      <div className="text-4xl">{badge.icon}</div>
                      <div className="font-display font-semibold text-white text-xs leading-tight">{badge.title}</div>
                      <div className="text-white/40 text-xs">{badge.description.substring(0, 40)}...</div>
                      {badge.verified ? (
                        <Badge variant="success" className="text-xs w-full justify-center">✓ Verified</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs w-full justify-center">Pending</Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
                {/* Locked badge */}
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}
                  className="rounded-2xl border border-white/5 bg-white/2 p-4 text-center space-y-2 opacity-40">
                  <div className="text-4xl grayscale">🔒</div>
                  <div className="font-display font-semibold text-white/30 text-xs">Simulation Master</div>
                  <div className="text-white/20 text-xs">Complete 5 simulations</div>
                  <Badge variant="outline" className="text-xs w-full justify-center opacity-50">Locked</Badge>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

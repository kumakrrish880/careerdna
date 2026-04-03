'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, Users, Filter, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MOCK_MENTORS } from '@/lib/constants';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function MentorsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const expertises = ['All', 'Product Management', 'Machine Learning', 'Entrepreneurship', 'UI/UX Design'];
  const filtered = MOCK_MENTORS.filter(m =>
    (filter === 'All' || m.expertise.some(e => e.includes(filter))) &&
    (search === '' || m.name.toLowerCase().includes(search.toLowerCase()) || m.company.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
          <Link href="/student" className="hover:text-white transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-white/70">Find Mentors</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-white">Mentor Connect</h1>
        <p className="text-white/40 mt-1">AI-matched industry professionals for your career journey</p>
      </motion.div>

      {/* Search + Filters */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input placeholder="Search mentors, companies..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {expertises.map(ex => (
            <button key={ex} onClick={() => setFilter(ex)}
              className={`px-3 py-2 rounded-xl text-sm transition-all font-display ${filter === ex ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'glass text-white/40 hover:text-white border-white/10'}`}>
              {ex}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="space-y-4">
        {filtered.map((mentor, i) => (
          <motion.div key={mentor.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.1 }}>
            <Card className="hover:border-white/20 transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                        <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {mentor.available && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-xl text-white">{mentor.name}</h3>
                      <p className="text-white/50 text-sm">{mentor.title} @ <span className="text-cyan-400">{mentor.company}</span></p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-white/70 text-sm font-semibold">{mentor.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/30 text-xs">
                          <Users className="w-3 h-3" /> {mentor.sessions} sessions
                        </div>
                        <Badge variant={mentor.available ? 'success' : 'outline'}>
                          {mentor.available ? 'Available' : 'Busy'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <p className="text-white/50 text-sm leading-relaxed">{mentor.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map(ex => (
                        <span key={ex} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-white/50 text-xs">{ex}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex sm:flex-col gap-2 sm:w-36 flex-shrink-0">
                    <Button className="flex-1 sm:flex-none gap-2" disabled={!mentor.available}
                      onClick={() => toast.success(`Session request sent to ${mentor.name}!`)}>
                      <Calendar className="w-4 h-4" /> Request Session
                    </Button>
                    <Button variant="outline" className="flex-1 sm:flex-none">View Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

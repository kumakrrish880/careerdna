'use client';

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { DNAProfile } from '@/types';

interface Props { profile: DNAProfile }

export function DNARadarChart({ profile }: Props) {
  const data = [
    { trait: 'Analytical', value: profile.analytical },
    { trait: 'Creative', value: profile.creative },
    { trait: 'Technical', value: profile.technical },
    { trait: 'Communication', value: profile.communication },
    { trait: 'Leadership', value: profile.leadership },
    { trait: 'Empathy', value: profile.empathy },
  ];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.08)" />
        <PolarAngleAxis
          dataKey="trait"
          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'DM Sans' }}
        />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <Radar
          name="DNA Profile"
          dataKey="value"
          stroke="#00d2ff"
          fill="#00d2ff"
          fillOpacity={0.15}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(15,23,42,0.95)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            color: '#f1f5f9',
            fontFamily: 'DM Sans',
          }}
          formatter={(val: number) => [`${val}%`, 'Score']}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

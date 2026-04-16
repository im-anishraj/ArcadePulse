'use client';

import { Info } from 'lucide-react';
import { MOCK_WEEKLY_DATA } from '@/lib/mock-data';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function WeeklyProgress() {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-semibold">Weekly Progress</h3>
        <Info size={16} className="text-[var(--text-muted)]" />
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={MOCK_WEEKLY_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              axisLine={{ stroke: 'var(--border-color)' }}
              tickLine={false}
              tickFormatter={(v) => v.slice(0, 3)}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              axisLine={{ stroke: 'var(--border-color)' }}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                fontSize: '13px',
              }}
              labelStyle={{ fontWeight: 600 }}
              formatter={(value) => [`badges : ${value}`, '']}
            />
            <Line
              type="monotone"
              dataKey="badges"
              stroke="var(--accent)"
              strokeWidth={2}
              dot={{ fill: 'var(--accent)', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: 'var(--accent)', stroke: 'white', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

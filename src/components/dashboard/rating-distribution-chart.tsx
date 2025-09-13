'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell } from 'recharts';

// Dummy data for distribution - replace with real data if available
const distributionData = [
  { rating: 1400, count: 15 },
  { rating: 1500, count: 45 },
  { rating: 1600, count: 90 },
  { rating: 1700, count: 80 },
  { rating: 1800, count: 50 },
  { rating: 1900, count: 30 },
  { rating: 2000, count: 10 },
  { rating: 2100, count: 5 },
  { rating: 2200, count: 2 },
  { rating: 2300, count: 1 },
];

const getBucket = (topPercentage: number) => {
    if (topPercentage <= 1) return 2300;
    if (topPercentage <= 5) return 2200;
    if (topPercentage <= 10) return 2100;
    if (topPercentage <= 15) return 2000;
    if (topPercentage <= 25) return 1900;
    if (topPercentage <= 40) return 1800;
    if (topPercentage <= 60) return 1700;
    if (topPercentage <= 80) return 1600;
    if (topPercentage <= 95) return 1500;
    return 1400;
}


type RatingDistributionChartProps = {
  topPercentage: number;
};

export function RatingDistributionChart({ topPercentage }: RatingDistributionChartProps) {
  const userBucket = getBucket(topPercentage);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={distributionData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey="rating" hide />
        <YAxis hide />
        <Bar
          dataKey="count"
          radius={[4, 4, 4, 4]}
          >
           {distributionData.map((entry) => (
            <Cell
              key={`cell-${entry.rating}`}
              fill={entry.rating === userBucket ? 'hsl(var(--primary))' : 'hsl(var(--muted))'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

'use client';

import { Line, LineChart, Tooltip, XAxis, Dot, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import {
  ChartTooltipContent,
  ChartContainer,
} from '@/components/ui/chart';
import type { DotProps } from 'recharts';

type RatingHistoryChartProps = {
  data: { rating: number; date: string }[];
};

const CustomizedDot = (props: DotProps & { payload?: any, index?: number, data: any[] }) => {
  const { cx, cy, payload, index, data } = props;
  
  const allRatings = data.map(d => d.rating);
  const maxRating = Math.max(...allRatings);
  const isMaxRating = payload && payload.rating === maxRating;
  const isFirstPoint = index === 0;

  if (isMaxRating || isFirstPoint) {
    return (
      <Dot
        cx={cx}
        cy={cy}
        r={6}
        stroke="hsl(var(--chart-2))"
        strokeWidth={2}
        fill="white"
      />
    );
  }

  return (
    <Dot 
      cx={cx} 
      cy={cy} 
      r={3} 
      fill="hsl(var(--chart-2))" 
    />
  );
};


export function RatingHistoryChart({ data }: RatingHistoryChartProps) {
    if (!data || data.length === 0) {
        return null;
    }
  const minRating = Math.min(...data.map(h => h.rating));
  const maxRating = Math.max(...data.map(h => h.rating));
  const ratingBuffer = Math.max(50, (maxRating - minRating) * 0.1);


  return (
    <ChartContainer config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
           <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
           <Tooltip
            cursor={false}
            content={<ChartTooltipContent hideIndicator />}
          />
          <XAxis
            hide={true}
            dataKey="date"
          />
          <YAxis 
            hide={true}
            domain={[minRating - ratingBuffer, maxRating + ratingBuffer]}
          />
          <Line
            dataKey="rating"
            type="linear"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={<CustomizedDot data={data} />}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

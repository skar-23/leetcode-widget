'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, Dot, YAxis, CartesianGrid } from 'recharts';
import {
  ChartTooltipContent,
  ChartContainer,
} from '@/components/ui/chart';
import type { DotProps } from 'recharts';

type RatingHistoryChartProps = {
  data: { rating: number; date: string }[];
  maxRating: number;
};

const CustomizedDot = (props: DotProps & { payload?: any, maxRating: number }) => {
  const { cx, cy, stroke, payload, maxRating } = props;

  if (payload && payload.rating === maxRating) {
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


export function RatingHistoryChart({ data, maxRating }: RatingHistoryChartProps) {
  const minRating = Math.min(...data.map(h => h.rating));
  const ratingBuffer = Math.max(50, (maxRating - minRating) * 0.1);


  return (
    <ChartContainer config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
           <CartesianGrid vertical={false} stroke="transparent" />
           <Tooltip
            cursor={false}
            content={<ChartTooltipContent hideIndicator />}
          />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
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
            dot={<CustomizedDot maxRating={maxRating} />}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

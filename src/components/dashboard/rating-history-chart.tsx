'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, Dot } from 'recharts';
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
  return (
    <ChartContainer config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
           <Tooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <Line
            dataKey="rating"
            type="monotone"
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

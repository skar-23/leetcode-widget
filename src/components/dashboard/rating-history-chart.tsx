'use client';

import { Line, LineChart, Tooltip, XAxis, Dot, YAxis } from 'recharts';
import {
  ChartTooltipContent,
  ChartContainer,
} from '@/components/ui/chart';
import type { DotProps } from 'recharts';

type RatingHistoryChartProps = {
  data: { rating: number; date: string }[];
  maxRating: number;
};

const CustomizedDot = (props: DotProps & { payload?: any, index?: number, maxRating: number, dataLength: number }) => {
  const { cx, cy, payload, maxRating, index } = props;

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


export function RatingHistoryChart({ data, maxRating }: RatingHistoryChartProps) {
  const minRating = Math.min(...data.map(h => h.rating));
  const ratingBuffer = Math.max(50, (maxRating - minRating) * 0.1);


  return (
    <ChartContainer config={{}}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
           <Tooltip
            cursor={false}
            content={<ChartTooltipContent hideIndicator />}
          />
          <XAxis
            hide={true}
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
            dot={<CustomizedDot maxRating={maxRating} dataLength={data.length} />}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
    </ChartContainer>
  );
}

'use client';

import { Line, LineChart, Tooltip, XAxis, Dot, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { DotProps } from 'recharts';

type RatingHistoryChartProps = {
  data: { rating: number; date: string }[];
  maxRating: number;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border/50 bg-background px-3 py-2 text-xs shadow-xl">
        <p className="font-medium">{`Rating: ${payload[0].value}`}</p>
        <p className="text-muted-foreground">{`Date: ${label}`}</p>
      </div>
    );
  }
  return null;
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


export function RatingHistoryChart({ data, maxRating }: RatingHistoryChartProps) {
    if (!data || data.length === 0) {
        return null;
    }
  const minRating = Math.min(...data.map(h => h.rating));
  const ratingBuffer = Math.max(50, (maxRating - minRating) * 0.1);

  const getNiceInterval = (range: number) => {
    const exponent = Math.floor(Math.log10(range));
    const fraction = range / Math.pow(10, exponent);

    let niceFraction;
    if (fraction < 1.5) {
      niceFraction = 1;
    } else if (fraction < 3) {
      niceFraction = 2;
    } else if (fraction < 7) {
      niceFraction = 5;
    } else {
      niceFraction = 10;
    }

    const interval = niceFraction * Math.pow(10, exponent - 1);
    // Suggest some "nice" intervals like 50, 100, 200, 250, 500
    if (interval < 75) return 50;
    if (interval < 150) return 100;
    if (interval < 225) return 200;
    return 250;
  };
  
  const ratingRange = maxRating - minRating;
  const tickInterval = getNiceInterval(ratingRange > 0 ? ratingRange : 100);

  const domainMin = Math.floor((minRating - ratingBuffer) / tickInterval) * tickInterval;
  const domainMax = Math.ceil((maxRating + ratingBuffer) / tickInterval) * tickInterval;

  const ticks: number[] = [];
  for (let i = domainMin; i <= domainMax; i += tickInterval) {
    ticks.push(i);
  }

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
           <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
           <Tooltip
            cursor={false}
            content={<CustomTooltip />}
          />
          <XAxis
            hide={true}
            dataKey="date"
          />
          <YAxis 
            hide={true}
            domain={[domainMin, domainMax]}
            ticks={ticks}
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
    </div>
  );
}

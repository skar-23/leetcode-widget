'use client';

import { Pie, PieChart, Cell } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { UserData } from '@/lib/data';
import { cn } from '@/lib/utils';

type DifficultyChartProps = {
  data: UserData['problemsSolved'];
  className?: string;
};

const chartConfig = {
  easy: { label: 'Easy', color: 'hsl(var(--chart-1))' },
  medium: { label: 'Medium', color: 'hsl(var(--chart-2))' },
  hard: { label: 'Hard', color: 'hsl(var(--chart-3))' },
};

export function DifficultyChart({ data, className }: DifficultyChartProps) {
  const chartData = [
    { name: 'Easy', value: data.easy, fill: chartConfig.easy.color },
    { name: 'Medium', value: data.medium, fill: chartConfig.medium.color },
    { name: 'Hard', value: data.hard, fill: chartConfig.hard.color },
  ];

  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Problem Difficulty Distribution</CardTitle>
        <CardDescription>Easy, Medium, and Hard solves</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 pt-4 text-sm">
        <div className="flex w-full items-center justify-center gap-4 text-xs">
          {chartData.map(item => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

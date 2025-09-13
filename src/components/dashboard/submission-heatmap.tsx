'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { subDays, format, getDay } from 'date-fns';

type SubmissionHeatmapProps = {
  submissionHistory: { date: string; count: number }[];
  className?: string;
};

const getColor = (count: number) => {
  if (count === 0) return 'hsl(var(--muted) / 0.5)';
  if (count < 3) return 'hsl(var(--primary) / 0.2)';
  if (count < 6) return 'hsl(var(--primary) / 0.4)';
  if (count < 9) return 'hsl(var(--primary) / 0.7)';
  return 'hsl(var(--primary))';
};

export function SubmissionHeatmap({
  submissionHistory,
  className,
}: SubmissionHeatmapProps) {
  const today = new Date();
  const dataByDate = new Map(submissionHistory.map(d => [d.date, d.count]));

  const daysInYear = Array.from({ length: 365 }).map((_, i) =>
    subDays(today, 364 - i)
  );

  const firstDayOffset = getDay(daysInYear[0]);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Submission Frequency</CardTitle>
        <CardDescription>Your coding activity over the last year.</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto pt-4">
        <div className="flex gap-3">
          <div className="flex flex-col gap-[11px] text-xs text-muted-foreground mt-0.5">
            <div className="h-3.5">Mon</div>
            <div className="h-3.5">Wed</div>
            <div className="h-3.5">Fri</div>
          </div>
          <div className="grid grid-flow-col grid-rows-7 gap-1">
            {Array.from({ length: firstDayOffset }).map((_, i) => (
              <div key={`pad-${i}`} className="h-3.5 w-3.5" />
            ))}
            {daysInYear.map(day => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const count = dataByDate.get(dateStr) || 0;
              const dateFormatted = format(day, 'MMMM d, yyyy');

              return (
                <Tooltip key={dateStr} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div
                      className="h-3.5 w-3.5 rounded-sm"
                      style={{ backgroundColor: getColor(count) }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      {count} submissions on {dateFormatted}
                    </p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

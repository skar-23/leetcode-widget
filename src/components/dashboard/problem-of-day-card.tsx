import { Flame } from 'lucide-react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type ProblemOfDayCardProps = {
  className?: string;
  streak: number;
  completedToday: boolean;
};

export function ProblemOfDayCard({ className, streak, completedToday }: ProblemOfDayCardProps) {
  const flameColor = completedToday ? 'text-orange-500' : 'text-muted-foreground/50';
  const tooltipText = completedToday ? "You've completed the problem of the day. Great job!" : "Keep the streak going! Solve today's problem.";

  return (
    <Card className={cn("flex flex-col items-center justify-center", className)}>
       <CardContent className="flex items-center justify-center p-6">
        <Tooltip>
          <TooltipTrigger>
            <a
              href="https://leetcode.com/problem-of-the-day/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Flame className={cn("h-8 w-8", flameColor, completedToday && 'fill-orange-500')} />
              <span className="text-3xl font-bold">{streak}</span>
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </CardContent>
    </Card>
  );
}

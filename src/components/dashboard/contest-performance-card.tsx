import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { RatingHistoryChart } from './rating-history-chart';
import { ArrowUp, ArrowDown } from 'lucide-react';

type ContestPerformanceCardProps = {
  rating: number;
  attended: number;
  topPercentage: number;
  history: { rating: number; date: string }[];
  className?: string;
};

export function ContestPerformanceCard({
  rating,
  attended,
  topPercentage,
  history,
  className,
}: ContestPerformanceCardProps) {
  const lastRating = history.length > 1 ? history[history.length - 1].rating : 0;
  const secondLastRating = history.length > 1 ? history[history.length - 2].rating : 0;
  const trend = lastRating > secondLastRating ? 'up' : lastRating < secondLastRating ? 'down' : 'same';
  const maxRating = Math.max(...history.map(h => h.rating));

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Contest Performance</CardTitle>
        <CardDescription>
          An overview of your performance in LeetCode contests.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-around text-center">
           <div className="flex-1">
              <p className="text-sm text-muted-foreground">Contest Rating</p>
              <div className="flex items-center justify-center gap-2">
                 <p className="text-2xl font-bold">{rating}</p>
                 {trend === 'up' && <ArrowUp className="h-5 w-5 text-green-500" />}
                 {trend === 'down' && <ArrowDown className="h-5 w-5 text-red-500" />}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Attended</p>
              <p className="text-2xl font-bold">{attended}</p>
            </div>
           <div className="flex-1">
                <p className="text-sm text-muted-foreground">Top</p>
                <p className="text-2xl font-bold">{topPercentage}%</p>
            </div>
        </div>
        <div className="h-52 min-w-0">
            <RatingHistoryChart data={history} maxRating={maxRating} />
        </div>
      </CardContent>
    </Card>
  );
}

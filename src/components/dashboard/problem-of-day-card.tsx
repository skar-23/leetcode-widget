import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

type ProblemOfDayCardProps = {
  className?: string;
};

export function ProblemOfDayCard({ className }: ProblemOfDayCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Problem of the Day</CardTitle>
        <CardDescription>
          Stay consistent, solve one problem every day.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-start gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold">234. Palindrome Linked List</h3>
            <p className="text-sm text-muted-foreground">
              Difficulty: <span className="text-primary font-medium">Easy</span>
            </p>
          </div>
          <Button asChild>
            <a
              href="https://leetcode.com/problem-of-the-day/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solve Problem
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import { Sparkles, Info } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

type MotivationCardProps = {
  stats: {
    username: string;
    contestRating: number;
    globalRanking: number;
    problemsSolved: number;
    problemsAttempted: number;
    currentStreak: number;
    solvedProblemOfTheDay: boolean;
  };
  className?: string;
};

export function MotivationCard({ stats, className }: MotivationCardProps) {
  // Generate a simple motivational message based on stats without AI
  const generateStaticMessage = () => {
    if (stats.solvedProblemOfTheDay) {
      return {
        title: "Great Job Today! 🎉",
        message: `You've solved today's problem and maintained your ${stats.currentStreak}-day streak! Keep up the excellent work, ${stats.username}. You've solved ${stats.problemsSolved} problems so far - every problem brings you closer to mastery!`
      };
    } else {
      return {
        title: "Ready for Today's Challenge? 💪",
        message: `Time to tackle today's problem, ${stats.username}! You're on a ${stats.currentStreak}-day streak with ${stats.problemsSolved} problems solved. Every problem you solve strengthens your coding skills!`
      };
    }
  };

  const { title, message } = generateStaticMessage();

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Progress Motivation</CardTitle>
        <CardDescription>Keep pushing forward with your coding journey!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Sparkles className="h-4 w-4" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Static Export Mode</AlertTitle>
          <AlertDescription>
            AI-powered insights are disabled in static export mode. This app can be deployed as static files to any hosting platform.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

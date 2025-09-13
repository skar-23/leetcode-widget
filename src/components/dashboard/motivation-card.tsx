'use client';

import { Sparkles } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { MotivationalMessageInput } from '@/ai/flows/motivational-progress-messages';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

type MotivationCardProps = {
  stats: MotivationalMessageInput;
  className?: string;
};

// Static motivational messages based on user stats
function generateStaticMotivationalMessage(stats: MotivationalMessageInput) {
  const { problemsSolved, currentStreak, solvedProblemOfTheDay } = stats;
  
  let title = "Keep Going! 🚀";
  let message = "Every problem solved is a step closer to mastery. ";

  if (currentStreak > 10) {
    title = "Streak Master! 🔥";
    message = `Amazing ${currentStreak}-day streak! Your consistency is paying off. `;
  } else if (currentStreak > 5) {
    title = "On Fire! 🔥";
    message = `Great ${currentStreak}-day streak! Keep the momentum going. `;
  } else if (currentStreak > 0) {
    title = "Building Momentum! ⚡";
    message = `${currentStreak} days strong! Consistency is key to success. `;
  }

  if (problemsSolved > 500) {
    message += "You're in elite territory with 500+ problems solved!";
  } else if (problemsSolved > 100) {
    message += "You've crossed the 100 problems milestone - impressive progress!";
  } else if (problemsSolved > 50) {
    message += "50+ problems down! You're building solid foundations.";
  } else {
    message += "Every expert was once a beginner. Keep pushing forward!";
  }

  if (solvedProblemOfTheDay) {
    message += " Plus, you conquered today's daily challenge! 🎯";
  }

  return { title, message };
}

export function MotivationCard({ stats, className }: MotivationCardProps) {
  const { title, message } = generateStaticMotivationalMessage(stats);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Motivational Analysis</CardTitle>
        <CardDescription>Insights to keep you motivated on your coding journey.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Sparkles className="h-4 w-4" />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

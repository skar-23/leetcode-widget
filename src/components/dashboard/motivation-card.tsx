import { Sparkles } from 'lucide-react';
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

function generateStaticMotivationalMessage(stats: MotivationCardProps['stats']) {
  const messages = [
    {
      title: "Keep Up the Momentum! 🚀",
      message: `You've solved ${stats.problemsSolved} problems! ${stats.currentStreak > 0 ? `Your ${stats.currentStreak}-day streak shows real dedication.` : 'Start a new streak today!'} Every problem brings you closer to mastery.`
    },
    {
      title: "Progress Spotlight ⭐",
      message: `With a global rank of ${stats.globalRanking.toLocaleString()}, you're among the top coders! ${stats.solvedProblemOfTheDay ? 'Great job completing today\'s daily challenge!' : 'Don\'t forget to tackle today\'s daily problem.'}`
    },
    {
      title: "Contest Champion 🏆",
      message: `Your contest rating of ${stats.contestRating} reflects your problem-solving skills. ${stats.contestRating > 1500 ? 'You\'re performing at an advanced level!' : 'Keep practicing to reach the next milestone!'}`
    }
  ];
  
  // Simple selection based on stats
  if (stats.currentStreak >= 7) {
    return messages[0]; // Momentum message for good streak
  } else if (stats.contestRating > 1400) {
    return messages[2]; // Contest message for good rating
  } else {
    return messages[1]; // General progress message
  }
}

export function MotivationCard({ stats, className }: MotivationCardProps) {
  const motivationalContent = generateStaticMotivationalMessage(stats);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Progress Insights</CardTitle>
        <CardDescription>Celebrating your coding journey and achievements.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Sparkles className="h-4 w-4" />
          <AlertTitle>{motivationalContent.title}</AlertTitle>
          <AlertDescription>{motivationalContent.message}</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

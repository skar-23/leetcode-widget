'use client';

import { useEffect, useState } from 'react';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getMotivationalMessageAction } from '@/app/actions';
import type { MotivationalMessageInput } from '@/ai/flows/motivational-progress-messages';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

type MotivationCardProps = {
  stats: MotivationalMessageInput;
  className?: string;
};

export function MotivationCard({ stats, className }: MotivationCardProps) {
  const [title, setTitle] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateMessage = async () => {
      setIsLoading(true);
      setError(null);
      setMessage(null);
      const result = await getMotivationalMessageAction(stats);
      if (result.success) {
        setTitle(result.data.title);
        setMessage(result.data.message);
      } else {
        setError(result.message);
      }
      setIsLoading(false);
    };
    generateMessage();
  }, [stats]);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Motivational Analysis</CardTitle>
        <CardDescription>AI-powered insights to keep you going.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading && (
          <div className="space-y-2">
             <Skeleton className="h-5 w-1/3" />
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-4/5" />
          </div>
        )}
        {message && !isLoading && (
          <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        {error && !isLoading && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

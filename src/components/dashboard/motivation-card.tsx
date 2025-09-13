'use client';

import { useState } from 'react';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getMotivationalMessageAction } from '@/app/actions';
import type { MotivationalMessageInput } from '@/ai/flows/motivational-progress-messages';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

type MotivationCardProps = {
  stats: MotivationalMessageInput;
  className?: string;
};

export function MotivationCard({ stats, className }: MotivationCardProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateMessage = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);
    const result = await getMotivationalMessageAction(stats);
    if (result.success) {
      setMessage(result.message);
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Motivational Analysis</CardTitle>
        <CardDescription>AI-powered insights to keep you going.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleGenerateMessage}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate Motivation
        </Button>
        {message && (
          <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertTitle>Your Personal Boost!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        {error && (
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

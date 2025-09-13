import { Award } from 'lucide-react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { UserData } from '@/lib/data';
import { cn } from '@/lib/utils';

type BadgeShowcaseProps = {
  totalBadges: number;
  latestBadge: UserData['badges'][0];
  className?: string;
};

export function BadgeShowcase({ totalBadges, latestBadge, className }: BadgeShowcaseProps) {
  const isUrl = latestBadge?.icon.startsWith('http');
  const badgeImageUrl = latestBadge?.icon 
    ? isUrl ? latestBadge.icon : `https://leetcode.com${latestBadge.icon}` 
    : null;

  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">Badges</CardTitle>
        <CardDescription className="text-2xl font-bold">{totalBadges}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col items-center justify-center text-center">
        {badgeImageUrl ? (
          <Image
            src={badgeImageUrl}
            alt={latestBadge.name}
            width={100}
            height={100}
            className="shadow-lg mb-4"
          />
        ) : (
          <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-muted mb-4">
            <Award className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <p className="text-sm text-muted-foreground">Most Recent Badge</p>
        <p className="font-semibold text-lg">{latestBadge?.name || 'No badges yet'}</p>
      </CardContent>
    </Card>
  );
}

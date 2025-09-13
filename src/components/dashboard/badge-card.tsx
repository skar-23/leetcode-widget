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

type BadgeCardProps = {
  badge: UserData['latestBadge'];
  className?: string;
};

export function BadgeCard({ badge, className }: BadgeCardProps) {
  // LeetCode returns badge icons as either full URLs or relative paths
  const isUrl = badge.icon.startsWith('http');
  const badgeImageUrl = isUrl ? badge.icon : badge.icon ? `https://leetcode.com${badge.icon}` : null;

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Most Recent Badge</CardTitle>
        {badge.date && <CardDescription>Awarded on {badge.date}</CardDescription>}
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
        {badgeImageUrl ? (
          <Image
            src={badgeImageUrl}
            alt={badge.name}
            width={100}
            height={100}
            className="shadow-lg"
          />
        ) : (
          <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-muted">
            <Award className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <p className="font-semibold text-lg">{badge.name}</p>
      </CardContent>
    </Card>
  );
}

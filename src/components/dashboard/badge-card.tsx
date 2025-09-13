import { Award } from 'lucide-react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { UserData } from '@/lib/data';
import { cn } from '@/lib/utils';

type BadgeCardProps = {
  badge: UserData['latestBadge'];
  className?: string;
};

export function BadgeCard({ badge, className }: BadgeCardProps) {
  const badgeImage = PlaceHolderImages.find(img => img.id === badge.icon);

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Most Recent Badge</CardTitle>
        <CardDescription>Awarded on {badge.date}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
        {badgeImage ? (
          <Image
            src={badgeImage.imageUrl}
            alt={badge.name}
            width={100}
            height={100}
            className="rounded-full shadow-lg"
            data-ai-hint={badgeImage.imageHint}
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

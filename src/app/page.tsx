import { Flame, Globe, BookOpenCheck, Trophy } from 'lucide-react';
import { LeetCodeIcon } from '@/components/icons/leetcode-icon';
import { StatCard } from '@/components/dashboard/stat-card';
import { DifficultyChart } from '@/components/dashboard/difficulty-chart';
import { SubmissionHeatmap } from '@/components/dashboard/submission-heatmap';
import { BadgeCard } from '@/components/dashboard/badge-card';
import { MotivationCard } from '@/components/dashboard/motivation-card';
import { ProblemOfDayCard } from '@/components/dashboard/problem-of-day-card';
import { userData } from '@/lib/data';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function Home() {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex items-center gap-2">
            <LeetCodeIcon className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold font-headline">
              LeetCode Progress Tracker
            </h1>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Contest Rating"
              value={userData.contestRating}
              icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
              description="Top 10% this season"
            />
            <StatCard
              title="Global Ranking"
              value={`#${userData.globalRanking.toLocaleString()}`}
              icon={<Globe className="h-4 w-4 text-muted-foreground" />}
              description="Keep climbing!"
            />
            <StatCard
              title="Problems Solved"
              value={userData.problemsSolved.total}
              icon={<BookOpenCheck className="h-4 w-4 text-muted-foreground" />}
              description={`${userData.problemsAttempted} attempted`}
            />
            <StatCard
              title="Current Streak"
              value={`${userData.currentStreak} Days`}
              icon={<Flame className="h-4 w-4 text-accent" />}
              description="Keep the fire burning!"
            />

            <SubmissionHeatmap
              submissionHistory={userData.submissionHistory}
              className="md:col-span-2 lg:col-span-4"
            />

            <DifficultyChart
              data={userData.problemsSolved}
              className="md:col-span-2 lg:col-span-2"
            />

            <ProblemOfDayCard className="md:col-span-2 lg:col-span-2" />
            
            <BadgeCard badge={userData.latestBadge} className="md:col-span-1 lg:col-span-2"/>

            <MotivationCard
              stats={{
                username: userData.username,
                contestRating: userData.contestRating,
                globalRanking: userData.globalRanking,
                problemsSolved: userData.problemsSolved.total,
                problemsAttempted: userData.problemsAttempted,
                currentStreak: userData.currentStreak,
              }}
              className="md:col-span-1 lg:col-span-2"
            />
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}

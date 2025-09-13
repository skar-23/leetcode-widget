import { BookOpenCheck, Flame, Trophy } from 'lucide-react';
import { LeetCodeIcon } from '@/components/icons/leetcode-icon';
import { StatCard } from '@/components/dashboard/stat-card';
import { SubmissionHeatmap } from '@/components/dashboard/submission-heatmap';
import { BadgeShowcase } from '@/components/dashboard/badge-showcase';
import { MotivationCard } from '@/components/dashboard/motivation-card';
import { TooltipProvider } from '@/components/ui/tooltip';
import { UserData } from '@/lib/data';
import { ContestPerformanceCard } from '@/components/dashboard/contest-performance-card';
import { ProblemOfDayCard } from '@/components/dashboard/problem-of-day-card';

// Mock data for testing chart responsiveness
const mockUserData: UserData = {
  username: 'test-user',
  contestRating: 1547,
  globalRanking: 12345,
  attendedContests: 25,
  topPercentage: 15.6,
  contestHistory: [
    { rating: 1200, date: 'Jan 2023' },
    { rating: 1250, date: 'Feb 2023' },
    { rating: 1300, date: 'Mar 2023' },
    { rating: 1280, date: 'Apr 2023' },
    { rating: 1350, date: 'May 2023' },
    { rating: 1400, date: 'Jun 2023' },
    { rating: 1420, date: 'Jul 2023' },
    { rating: 1380, date: 'Aug 2023' },
    { rating: 1450, date: 'Sep 2023' },
    { rating: 1480, date: 'Oct 2023' },
    { rating: 1520, date: 'Nov 2023' },
    { rating: 1500, date: 'Dec 2023' },
    { rating: 1540, date: 'Jan 2024' },
    { rating: 1547, date: 'Feb 2024' },
  ],
  problemsSolved: {
    total: 457,
    easy: 185,
    medium: 234,
    hard: 38,
  },
  problemsAttempted: 2800,
  currentStreak: 15,
  solvedProblemOfTheDay: true,
  submissionHistory: [],
  badges: [],
};


export default async function Home() {
  const userData = mockUserData;

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <header className="sticky top-0 z-30 flex h-auto shrink-0 items-center justify-between border-b bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4">
          <div className="flex items-center gap-2">
            <LeetCodeIcon className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold font-headline">
              LeetCode Progress Tracker
            </h1>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          {userData && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
               <div className="lg:col-span-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <StatCard
                  title="Global Ranking"
                  value={userData.globalRanking.toLocaleString()}
                  icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
                />
                <StatCard
                  title="Problems Solved"
                  value={userData.problemsSolved.total}
                  icon={<BookOpenCheck className="h-4 w-4 text-muted-foreground" />}
                  description={`${userData.problemsAttempted} total problems`}
                />
                <ProblemOfDayCard
                  streak={userData.currentStreak}
                  completedToday={userData.solvedProblemOfTheDay}
                />
              </div>

              <ContestPerformanceCard
                rating={userData.contestRating}
                attended={userData.attendedContests}
                topPercentage={userData.topPercentage}
                history={userData.contestHistory}
                className="lg:col-span-4"
              />

              <SubmissionHeatmap
                submissionHistory={userData.submissionHistory}
                className="lg:col-span-3"
              />

              <BadgeShowcase
                totalBadges={userData.badges.length}
                latestBadge={userData.badges[0]}
                className="lg:col-span-1"
              />

              <MotivationCard
                stats={{
                  username: userData.username,
                  contestRating: userData.contestRating,
                  globalRanking: userData.globalRanking,
                  problemsSolved: userData.problemsSolved.total,
                  problemsAttempted: userData.problemsAttempted,
                  currentStreak: userData.currentStreak,
                  solvedProblemOfTheDay: userData.solvedProblemOfTheDay,
                }}
                className="lg:col-span-4"
              />
            </div>
          )}
        </main>
      </div>
    </TooltipProvider>
  );
}

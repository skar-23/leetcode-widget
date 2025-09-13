import { BookOpenCheck, Trophy } from 'lucide-react';
import { LeetCodeIcon } from '@/components/icons/leetcode-icon';
import { StatCard } from '@/components/dashboard/stat-card';
import { SubmissionHeatmap } from '@/components/dashboard/submission-heatmap';
import { BadgeCard } from '@/components/dashboard/badge-card';
import { MotivationCard } from '@/components/dashboard/motivation-card';
import { ProblemOfDayCard } from '@/components/dashboard/problem-of-day-card';
import { TooltipProvider } from '@/components/ui/tooltip';
import { UserData } from '@/lib/data';

type HomeProps = {
  searchParams: {
    username?: string;
  };
};

async function getLeetCodeData(username: string): Promise<UserData | null> {
  try {
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
    if (!res.ok) {
      // The API returns 404 for not found, but also other errors.
      // We'll treat all errors as user not found for simplicity.
      return null;
    }
    const data = await res.json();

    if (data.status === 'error') {
      return null;
    }

    // The API doesn't have all the fields we need, so we'll mock them.
    // A more robust solution would find a better API or adjust the UI.
    const submissionHistory: { date: string; count: number }[] = [];
    if (data.submissionCalendar) {
      const calendar = JSON.parse(data.submissionCalendar);
      Object.keys(calendar).forEach(timestamp => {
        const date = new Date(parseInt(timestamp) * 1000);
        submissionHistory.push({
          date: date.toISOString().split('T')[0],
          count: calendar[timestamp],
        });
      });
    }

    return {
      username: username,
      contestRating: data.ranking,
      globalRanking: data.ranking, // API doesn't provide this separately
      problemsSolved: {
        total: data.totalSolved,
        easy: data.easySolved,
        medium: data.mediumSolved,
        hard: data.hardSolved,
      },
      problemsAttempted: data.totalQuestions,
      currentStreak: 0, // Mocked
      solvedProblemOfTheDay: data.recentAC.length > 0, // Heuristic
      submissionHistory: submissionHistory,
      latestBadge: { // Mocked
        name: 'Welcome!',
        icon: '1',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      },
    };
  } catch (error) {
    console.error('Failed to fetch LeetCode data:', error);
    return null;
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const username = searchParams.username ?? 'satorugojo';
  const userData = await getLeetCodeData(username);

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <header className="sticky top-0 z-30 flex h-auto items-center gap-4 border-b bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4">
          <div className="flex items-center gap-2">
            <LeetCodeIcon className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold font-headline">
              LeetCode Progress Tracker
            </h1>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto mb-8 max-w-md">
            <form className="flex w-full items-center space-x-2">
              <input
                type="text"
                name="username"
                placeholder="Enter your LeetCode username"
                defaultValue={username}
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Fetch
              </button>
            </form>
          </div>

          {!userData && (
             <div className="text-center text-muted-foreground">
                Could not find data for user: <strong>{username}</strong>. Please check the username and try again.
             </div>
          )}

          {userData && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <StatCard
                title="Contest Rating"
                value={userData.contestRating}
                icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
                description={`Top ${((userData.contestRating / 20000) * 100).toFixed(0)}% this season`}
              />
              <StatCard
                title="Problems Solved"
                value={userData.problemsSolved.total}
                icon={<BookOpenCheck className="h-4 w-4 text-muted-foreground" />}
                description={`${userData.problemsAttempted} attempted`}
              />
              <ProblemOfDayCard
                streak={userData.currentStreak}
                completedToday={userData.solvedProblemOfTheDay}
              />

              <SubmissionHeatmap
                submissionHistory={userData.submissionHistory}
                className="md:col-span-2 lg:col-span-3"
              />

              <BadgeCard badge={userData.latestBadge} className="md:col-span-1" />

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
                className="md:col-span-2"
              />
            </div>
          )}
        </main>
      </div>
    </TooltipProvider>
  );
}

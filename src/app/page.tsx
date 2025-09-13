'use client';

import { useEffect, useState } from 'react';
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
import { Skeleton } from '@/components/ui/skeleton';

async function getLeetCodeData(username: string): Promise<UserData | null> {
  try {
    const query = `
      query getUserProfile($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          username
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
            userAvatar
          }
          userCalendar {
            streak
            totalActiveDays
            submissionCalendar
          }
          badges {
            id
            name
            icon
            creationDate
          }
        }
        userContestRanking(username: $username) {
          rating
          topPercentage
          attendedContestsCount
        }
        userContestRankingHistory(username: $username) {
          attended
          rating
          ranking
          contest {
            startTime
          }
        }
        activeDailyCodingChallengeQuestion {
          date
          userStatus
          question {
            title
          }
        }
      }
    `;

    const res = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': `https://leetcode.com/${username}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!res.ok) {
        const errorBody = await res.text();
        console.error('LeetCode API request failed:', res.status, errorBody);
        return null;
    }

    const { data, errors } = await res.json();
    
    if (errors) {
      console.error('LeetCode API returned errors:', errors);
      return null;
    }

    const matchedUser = data?.matchedUser;
    const activeDailyQuestion = data?.activeDailyCodingChallengeQuestion;
    const contestRanking = data?.userContestRanking;
    const contestHistory = data?.userContestRankingHistory;

    if (!matchedUser) {
      console.error('No matched user found for:', username);
      return null;
    }

    const submissionHistory: { date: string; count: number }[] = [];
    if (matchedUser.userCalendar.submissionCalendar) {
      try {
        const calendar = JSON.parse(matchedUser.userCalendar.submissionCalendar);
        Object.keys(calendar).forEach(timestamp => {
            const date = new Date(parseInt(timestamp, 10) * 1000);
            submissionHistory.push({
            date: date.toISOString().split('T')[0],
            count: calendar[timestamp],
            });
        });
      } catch (e) {
        console.error("Failed to parse submission calendar", e);
      }
    }

    const totalSolved = matchedUser.submitStats.acSubmissionNum.find((d: any) => d.difficulty === 'All')?.count || 0;
    const easySolved = matchedUser.submitStats.acSubmissionNum.find((d: any) => d.difficulty === 'Easy')?.count || 0;
    const mediumSolved = matchedUser.submitStats.acSubmissionNum.find((d: any) => d.difficulty === 'Medium')?.count || 0;
    const hardSolved = matchedUser.submitStats.acSubmissionNum.find((d: any) => d.difficulty === 'Hard')?.count || 0;
    const totalQuestions = data.allQuestionsCount.find((d: any) => d.difficulty === 'All')?.count || 0;

    const badges = matchedUser.badges
      .map((badge: any) => ({
        name: badge.name,
        icon: badge.icon,
        date: new Date(badge.creationDate * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        creationTimestamp: parseInt(badge.creationDate, 10)
      }))
      .sort((a: any, b: any) => b.creationTimestamp - a.creationTimestamp);
    
    const ratingHistory = contestHistory
        ?.filter((contest: any) => contest.attended)
        .map((contest: any) => ({
            rating: Math.round(contest.rating),
            date: new Date(contest.contest.startTime * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
        }));

    return {
      username: username,
      contestRating: contestRanking?.rating ? Math.round(contestRanking.rating) : 0,
      globalRanking: matchedUser.profile.ranking,
      attendedContests: contestRanking?.attendedContestsCount || 0,
      topPercentage: contestRanking?.topPercentage ? parseFloat(contestRanking.topPercentage.toFixed(2)) : 0,
      contestHistory: ratingHistory || [],
      problemsSolved: {
        total: totalSolved,
        easy: easySolved,
        medium: mediumSolved,
        hard: hardSolved,
      },
      problemsAttempted: totalQuestions,
      currentStreak: matchedUser.userCalendar.streak,
      solvedProblemOfTheDay: activeDailyQuestion?.userStatus === 'Finish',
      submissionHistory: submissionHistory,
      badges: badges,
    };
  } catch (error) {
    console.error('Failed to fetch LeetCode data:', error);
    return null;
  }
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const username = 'scarlet23';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLeetCodeData(username);
        setUserData(data);
      } catch (err) {
        setError('Failed to fetch LeetCode data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

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
          {loading && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
              <div className="lg:col-span-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-8 w-1/3" />
                  </div>
                ))}
              </div>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={`rounded-lg border bg-card text-card-foreground shadow-sm p-6 ${i === 0 ? 'lg:col-span-4' : 'lg:col-span-1'}`}>
                  <Skeleton className="h-6 w-1/2 mb-4" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
             <div className="text-center text-destructive">
                {error}
             </div>
          )}

          {!loading && !error && !userData && (
             <div className="text-center text-muted-foreground">
                Could not find data for user: <strong>{username}</strong>. Please check the username and try again.
             </div>
          )}

          {!loading && !error && userData && (
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

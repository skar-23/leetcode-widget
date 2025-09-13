export type UserData = {
  username: string;
  contestRating: number;
  globalRanking: number;
  attendedContests: number;
  topPercentage: number;
  contestHistory: { rating: number; date: string }[];
  problemsSolved: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
  };
  problemsAttempted: number;
  currentStreak: number;
  solvedProblemOfTheDay: boolean;
  submissionHistory: { date: string; count: number }[];
  badges: {
    name: string;
    icon: string;
    date: string;
    creationTimestamp: number;
  }[];
};

export type UserData = {
  username: string;
  contestRating: number;
  globalRanking: number;
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
  }[];
};

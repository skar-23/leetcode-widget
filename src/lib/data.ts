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
  latestBadge: {
    name: string;
    icon: string;
    date: string;
  };
};

const generateSubmissionHistory = () => {
  const history: { date: string; count: number }[] = [];
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = date.toISOString().split('T')[0];

    if (Math.random() > 0.4) {
      const count = Math.floor(Math.random() * 10) + 1;
      history.push({ date: dateString, count });
    } else {
      history.push({ date: dateString, count: 0 });
    }
  }
  return history;
};

export const userData: UserData = {
  username: 'CodeWarrior',
  contestRating: 1850,
  globalRanking: 10234,
  problemsSolved: {
    total: 420,
    easy: 150,
    medium: 220,
    hard: 50,
  },
  problemsAttempted: 580,
  currentStreak: 25,
  solvedProblemOfTheDay: true,
  submissionHistory: generateSubmissionHistory(),
  latestBadge: {
    name: '50 Days Badge',
    icon: '1',
    date: '2024-05-15',
  },
};

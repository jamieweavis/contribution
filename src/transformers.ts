export interface GitHubStats {
  bestStreak: number;
  currentStreak: number;
  previousStreak: number;

  isStreakAtRisk: boolean;

  mostContributions: number;
  todaysContributions: number;
  totalContributions: number;
}

interface ParsedContributions {
  [key: string]: number;
}

export const parseContributions = (body: string): ParsedContributions => {
  const bodyMatches = body.matchAll(
    /data-date="(\d{4}-\d{2}-\d{2}).*\n.*>(\d+|No) contribution/g,
  );
  const contributions: ParsedContributions = {};
  for (const [match, date, contribution] of bodyMatches) {
    contributions[date] =
      contribution === 'No' ? 0 : Number.parseInt(contribution);
  }
  const sortedContributionData = Object.fromEntries(
    Object.entries(contributions).sort(
      ([a], [b]) => +new Date(a) - +new Date(b),
    ),
  );
  return sortedContributionData;
};

export const parseGitHubStats = (
  parsedContributions: ParsedContributions,
): GitHubStats => {
  const stats = {
    bestStreak: 0,
    currentStreak: 0,
    previousStreak: 0,
    isStreakAtRisk: false,
    mostContributions: 0,
    todaysContributions: 0,
    totalContributions: 0,
  };
  let previousStreak = 0;

  for (const [date, contribution] of Object.entries(parsedContributions)) {
    // Contributions
    stats.totalContributions += contribution;
    stats.todaysContributions = contribution;
    if (contribution > stats.mostContributions) {
      stats.mostContributions = contribution;
    }

    // Streak
    stats.currentStreak = contribution > 0 ? stats.currentStreak + 1 : 0;
    if (stats.currentStreak > stats.bestStreak) {
      stats.bestStreak = stats.currentStreak;
    }

    stats.isStreakAtRisk = stats.currentStreak === 0 && previousStreak > 0;
    if (stats.isStreakAtRisk) {
      stats.previousStreak = previousStreak;
    }

    previousStreak = stats.currentStreak;
  }

  return stats;
};

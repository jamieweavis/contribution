export interface GitHubStats {
  bestStreak: number;
  currentStreak: number;
  previousStreak: number;

  isStreakAtRisk: boolean;

  mostContributions: number;
  todaysContributions: number;
  totalContributions: number;

  contributions: Contributions;
}

export interface ContributionDay {
  contributions: number;
  gitHubLegendLevel: number;
}

export interface Contributions {
  [date: string]: ContributionDay; // YYYY-MM-DD
}

export const parseContributionGraph = (body: string): Contributions => {
  const bodyMatches = body.matchAll(
    /data-date="([\d-]+)".*?data-level="(\d+)".*\n.*>(\d+|No) contribution/g,
  );
  const contributions: Contributions = {};
  for (const [_, date, level, contribution] of bodyMatches) {
    contributions[date] = {
      contributions:
        contribution === 'No' ? 0 : Number.parseInt(contribution, 10),
      gitHubLegendLevel: Number.parseInt(level, 10),
    };
  }
  const sortedContributions = Object.fromEntries(
    Object.entries(contributions).sort(
      ([a], [b]) => +new Date(a) - +new Date(b),
    ),
  );
  return sortedContributions;
};

export const buildGitHubStats = (contributions: Contributions): GitHubStats => {
  const stats = {
    bestStreak: 0,
    currentStreak: 0,
    previousStreak: 0,
    isStreakAtRisk: false,
    mostContributions: 0,
    todaysContributions: 0,
    totalContributions: 0,
    contributions,
  };
  let previousStreak = 0;

  for (const [_, day] of Object.entries(contributions)) {
    // Contributions
    stats.totalContributions += day.contributions;
    stats.todaysContributions = day.contributions;
    if (day.contributions > stats.mostContributions) {
      stats.mostContributions = day.contributions;
    }

    // Streak
    stats.currentStreak = day.contributions > 0 ? stats.currentStreak + 1 : 0;
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

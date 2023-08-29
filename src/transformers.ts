export interface GitHubStats {
  streak: {
    best: number;
    current: number;
    isAtRisk: boolean;
    previous: number;
  };
  contributions: {
    best: number;
    total: number;
    current: number;
  };
}

interface ParsedContributions {
  [key: string]: number;
}

export const parseContributions = (body: string): ParsedContributions => {
  const bodyMatches = body.matchAll(
    /data-date="(\d{4}-\d{2}-\d{2}).*>(\d+|No) contribution/g,
  );
  const contributions: ParsedContributions = {};
  for (const [match, date, contribution] of bodyMatches) {
    contributions[date] = contribution === 'No' ? 0 : parseInt(contribution);
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
    streak: { best: 0, current: 0, isAtRisk: false, previous: 0 },
    contributions: { best: 0, total: 0, current: 0 },
  };
  let previousStreak = 0;

  Object.entries(parsedContributions).forEach(([date, contribution]) => {
    // Contributions
    stats.contributions.total += contribution;
    stats.contributions.current = contribution;
    if (contribution > stats.contributions.best) {
      stats.contributions.best = contribution;
    }

    // Streak
    stats.streak.current = contribution > 0 ? stats.streak.current + 1 : 0;
    if (stats.streak.current > stats.streak.best) {
      stats.streak.best = stats.streak.current;
    }
    stats.streak.isAtRisk = stats.streak.current === 0 && previousStreak > 0;
    if (stats.streak.isAtRisk) {
      stats.streak.previous = previousStreak;
    }

    previousStreak = stats.streak.current;
  });

  return stats;
};

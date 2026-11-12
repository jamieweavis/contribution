import type {
  ContributionDay,
  ContributionStats,
  GitHubStats,
  StreakStats,
} from './types.js';

type Mutable<T> = { -readonly [K in keyof T]: T[K] };

/** Calculates streak and contribution statistics from chronologically sorted contribution days */
export const buildGitHubStats = (
  days: readonly ContributionDay[],
): GitHubStats => {
  const streak: Mutable<StreakStats> = {
    current: 0,
    best: 0,
    previous: 0,
    isAtRisk: false,
    startDate: null,
  };
  const contributions: Mutable<ContributionStats> = {
    today: 0,
    total: 0,
    most: 0,
    lastContributionDate: null,
  };
  const lastIndex = days.length - 1;

  for (const [index, { date, count }] of days.entries()) {
    // Contributions
    contributions.total += count;
    contributions.today = count;
    contributions.most = Math.max(contributions.most, count);

    // Streak
    if (count > 0) {
      contributions.lastContributionDate = date;
      if (streak.current === 0) {
        streak.startDate = date;
      }
      streak.current += 1;
      streak.best = Math.max(streak.best, streak.current);
    } else if (index === lastIndex && streak.current > 0) {
      // No contributions yet on the most recent day, but the streak can still be continued
      streak.isAtRisk = true;
    } else if (streak.current > 0) {
      streak.previous = streak.current;
      streak.current = 0;
      streak.startDate = null;
    }
  }

  return { streak, contributions, days };
};

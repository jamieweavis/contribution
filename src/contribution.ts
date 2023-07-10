import { get } from 'https';
import { IncomingMessage } from 'http';

interface FetchStatsOptions {
  onSuccess?: (stats: GitHubStats) => void;
  onFailure?: (error: IncomingMessage) => void;
}

interface Streak {
  best: number;
  current: number;
  isAtRisk: boolean;
}

interface Contributions {
  best: number;
  total: number;
  current: number;
}

interface GitHubStats {
  streak: Streak;
  contributions: Contributions;
}

const parseBody = (body: string): GitHubStats => {
  const streak: Streak = {
    best: 0,
    current: 0,
    isAtRisk: false,
  };

  const contributions: Contributions = {
    best: 0,
    total: 0,
    current: 0,
  };

  const contributionMatches = [];
  const contributionRegex = /(\d+|No) contributions on/g;
  let contributionMatch;
  while ((contributionMatch = contributionRegex.exec(body))) {
    contributionMatches.push(contributionMatch);
  }

  let previousStreak = 0;
  contributionMatches.forEach((match) => {
    const contributionCount = match[1] === 'No' ? 0 : parseInt(match[1], 10);

    // Contributions
    contributions.total += contributionCount;
    contributions.current = contributionCount;
    if (contributionCount > contributions.best) {
      contributions.best = contributionCount;
    }

    // Streak
    streak.current = contributionCount > 0 ? (streak.current += 1) : 0;
    if (streak.current > streak.best) {
      streak.best = streak.current;
    }
    streak.isAtRisk = streak.current === 0 && previousStreak > 0;
    previousStreak = streak.current;
  });

  return { streak, contributions };
};

const fetchStats = (
  username: string,
  options: FetchStatsOptions = {},
): Promise<GitHubStats> =>
  new Promise((resolve: Function, reject: Function) => {
    get(`https://github.com/users/${username}/contributions`, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => (body += chunk));
      response.on('end', () => {
        if (response.statusCode === 404) {
          if (options.onFailure) {
            return options.onFailure(response);
          }
          return reject(response);
        }
        const data = parseBody(body);
        if (options.onSuccess) {
          return options.onSuccess(data);
        }
        return resolve(data);
      });
    });
  });

export { fetchStats, GitHubStats };

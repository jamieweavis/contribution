import { get } from 'https';
import { IncomingMessage } from 'http';

interface Options {
  onSuccess?: (stats: GitHubStats) => void;
  onFailure?: (error: IncomingMessage) => void;
}

interface Streak {
  best: number;
  current: number;
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
  };

  const contributions: Contributions = {
    best: 0,
    total: 0,
    current: 0,
  };

  const contributionMatches = [];
  const contributionRegex = /(\d+|No) contributions on/g;
  let contributionMatch;
  while ((contributionMatch = contributionRegex.exec(body)))
    contributionMatches.push(contributionMatch);

  contributionMatches.forEach((contributionMatch) => {
    let contributionCount =
      contributionMatch[1] === 'No' ? 0 : parseInt(contributionMatch[1], 10);

    contributions.total += contributionCount;
    contributions.current = contributionCount;
    if (contributionCount > contributions.best)
      contributions.best = contributionCount;

    streak.current = contributionCount > 0 ? (streak.current += 1) : 0;
    if (streak.current > streak.best) streak.best = streak.current;
  });

  return { streak, contributions };
};

const fetchStats = (
  username: string,
  options: Options = {},
): Promise<GitHubStats> =>
  new Promise((resolve: Function, reject: Function) => {
    get(`https://github.com/users/${username}/contributions`, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => (body += chunk));
      response.on('end', () => {
        if (response.statusCode === 404) {
          if (options.onFailure) return options.onFailure(response);
          return reject(response);
        }
        const data = parseBody(body);
        if (options.onSuccess) return options.onSuccess(data);
        return resolve(data);
      });
    });
  });

export { fetchStats, GitHubStats };

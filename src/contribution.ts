import type { GitHubStats } from './transformers';
import { parseContributions, parseGitHubStats } from './transformers';

const fetchStats = async (username: string): Promise<GitHubStats> => {
  try {
    const response = await fetch(
      `https://github.com/users/${username}/contributions`,
    );
    if (!response.ok) throw new Error('Failed to fetch GitHub contributions');

    const body = await response.text();
    const contributions = parseContributions(body);
    const gitHubStats = parseGitHubStats(contributions);

    return gitHubStats;
  } catch (error) {
    throw new Error(error);
  }
};

export { fetchStats };
export type { GitHubStats };

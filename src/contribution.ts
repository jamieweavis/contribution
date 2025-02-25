import type { GitHubStats } from './transformers';
import { parseContributions, parseGitHubStats } from './transformers';

interface Options {
  onSuccess?: (stats: GitHubStats) => unknown;
  onFailure?: (error: Response) => unknown;
}

const fetchStats = async (username: string, options?: Options) => {
  try {
    const response = await fetch(
      `https://github.com/users/${username}/contributions`,
    );
    if (!response.ok) throw new Error('Failed to fetch GitHub contributions');

    const body = await response.text();
    const contributions = parseContributions(body);
    const gitHubStats = parseGitHubStats(contributions);

    if (options?.onSuccess) return options.onSuccess(gitHubStats);
    return gitHubStats;
  } catch (error) {
    if (options?.onFailure) return options.onFailure(error);
    throw error;
  }
};

export { fetchStats };
export type { GitHubStats };

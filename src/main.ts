import { fetchContributionGraph } from './client.js';
import { parseContributionGraph } from './parser.js';
import { buildGitHubStats } from './stats.js';
import type { FetchOptions, GitHubStats } from './types.js';

/** Fetches a user's GitHub contribution graph and calculates their contribution statistics */
export const fetchGitHubStats = async (
  username: string,
  options?: FetchOptions,
): Promise<GitHubStats> => {
  const html = await fetchContributionGraph(username, options);
  const days = parseContributionGraph(html);
  return buildGitHubStats(days);
};

export { fetchContributionGraph } from './client.js';
export {
  ContributionError,
  ContributionGraphParseError,
  GitHubRequestError,
  InvalidUsernameError,
} from './errors.js';
export { parseContributionGraph } from './parser.js';
export { buildGitHubStats } from './stats.js';
export type {
  ContributionDay,
  ContributionLevel,
  ContributionStats,
  FetchOptions,
  GitHubStats,
  StreakStats,
} from './types.js';

import {
  buildGitHubStats,
  type ContributionDay,
  type Contributions,
  type GitHubStats,
  parseContributionGraph,
} from './utils';

const fetchGitHubStats = async (username: string): Promise<GitHubStats> => {
  try {
    const contributionGraphResponse = await fetch(
      `https://github.com/users/${username}/contributions`,
    );
    if (!contributionGraphResponse.ok) {
      throw new Error('Failed to fetch GitHub contributions');
    }

    const contributionGraphBody = await contributionGraphResponse.text();
    const contributions = parseContributionGraph(contributionGraphBody);
    const gitHubStats = buildGitHubStats(contributions);

    return gitHubStats;
  } catch (error) {
    throw new Error(error);
  }
};

export { fetchGitHubStats };
export type { ContributionDay, Contributions, GitHubStats };

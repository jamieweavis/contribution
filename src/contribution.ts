import {
  type GitHubStats,
  type Contributions,
  type ContributionDay,
  parseContributionGraph,
  buildGitHubStats,
} from './transformers';

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
export type { GitHubStats, Contributions, ContributionDay };

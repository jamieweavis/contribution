import { afterEach, describe, expect, it, vi } from 'vitest';

import { fetchContributionGraph } from '../src/client';
import * as main from '../src/main';
import { parseContributionGraph } from '../src/parser';
import { buildGitHubStats } from '../src/stats';
import type { ContributionDay, GitHubStats } from '../src/types';

vi.mock('../src/client', { spy: true });
vi.mock('../src/parser', { spy: true });
vi.mock('../src/stats', { spy: true });

describe('fetchGitHubStats', () => {
  const html = '<div>Mock Contributions</div>';
  const days: ContributionDay[] = [{ date: '2024-02-01', count: 5, level: 1 }];
  const stats: GitHubStats = {
    streak: {
      current: 5,
      best: 69,
      previous: 13,
      isAtRisk: false,
      startDate: '2024-01-28',
    },
    contributions: {
      today: 6,
      total: 1337,
      most: 42,
      lastContributionDate: '2024-02-01',
    },
    days,
  };

  afterEach(() => vi.resetAllMocks());

  it('should fetch, parse and build stats for a user', async () => {
    vi.mocked(fetchContributionGraph).mockResolvedValue(html);
    vi.mocked(parseContributionGraph).mockReturnValue(days);
    vi.mocked(buildGitHubStats).mockReturnValue(stats);
    const options = { signal: new AbortController().signal };

    await expect(main.fetchGitHubStats('testuser', options)).resolves.toBe(
      stats,
    );
    expect(fetchContributionGraph).toHaveBeenCalledWith('testuser', options);
    expect(parseContributionGraph).toHaveBeenCalledWith(html);
    expect(buildGitHubStats).toHaveBeenCalledWith(days);
  });

  it('should propagate fetch errors without parsing', async () => {
    const error = new Error('fetch failed');
    vi.mocked(fetchContributionGraph).mockRejectedValue(error);

    await expect(main.fetchGitHubStats('testuser')).rejects.toBe(error);
    expect(parseContributionGraph).not.toHaveBeenCalled();
  });

  it('should propagate parse errors without building stats', async () => {
    const error = new Error('parse failed');
    vi.mocked(fetchContributionGraph).mockResolvedValue(html);
    vi.mocked(parseContributionGraph).mockImplementation(() => {
      throw error;
    });

    await expect(main.fetchGitHubStats('testuser')).rejects.toBe(error);
    expect(buildGitHubStats).not.toHaveBeenCalled();
  });
});

describe('public api', () => {
  it('should export the public api', () => {
    expect(Object.keys(main).sort()).toEqual([
      'ContributionError',
      'ContributionGraphParseError',
      'GitHubRequestError',
      'InvalidUsernameError',
      'buildGitHubStats',
      'fetchContributionGraph',
      'fetchGitHubStats',
      'parseContributionGraph',
    ]);
  });
});

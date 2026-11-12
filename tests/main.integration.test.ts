import { describe, expect, it } from 'vitest';

import { fetchGitHubStats } from '../src/main';
import { gitHubStatsShape, readFixture } from './helpers';

describe('fetchGitHubStats (integration)', () => {
  it('should calculate stats from the contribution graph fixture', async () => {
    const html = readFixture('github-contributions.html');
    const fetch = async () => new Response(html);

    const stats = await fetchGitHubStats('jamieweavis', { fetch });

    expect(stats).toMatchObject({
      streak: {
        current: 1,
        best: 4,
        previous: 1,
        isAtRisk: true,
        startDate: '2025-02-24',
      },
      contributions: {
        today: 0,
        total: 206,
        most: 21,
        lastContributionDate: '2025-02-24',
      },
    });
    expect(stats.days).toHaveLength(367);
  });

  it('should calculate stats from the live GitHub contribution graph', async () => {
    const stats = await fetchGitHubStats('jamieweavis');

    expect(stats).toEqual(gitHubStatsShape);
    expect(stats.days.length).toBeGreaterThan(0);
  });
});

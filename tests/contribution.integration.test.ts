import { describe, expect, it } from 'vitest';

import { fetchGitHubStats } from '../src/contribution';
import { fetchGitHubStatsShape } from './utils';

describe('contribution', () => {
  describe('fetchGitHubStats', () => {
    it('should resolve a promise with contribution stats', async () => {
      const stats = await fetchGitHubStats('jamieweavis');
      expect(stats).toEqual(expect.objectContaining(fetchGitHubStatsShape));
    });
  });
});

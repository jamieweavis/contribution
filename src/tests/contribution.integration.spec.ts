import { fetchStats } from '../contribution';
import { fetchStatsShape } from './utils';

describe('contribution', () => {
  describe('fetchStats', () => {
    it('should resolve a promise with contribution stats', async () => {
      const stats = await fetchStats('jamieweavis');

      expect(stats).toEqual(expect.objectContaining(fetchStatsShape));
    });
  });
});

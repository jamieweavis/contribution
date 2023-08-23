import { parseContributions, parseGitHubStats } from '../src/transformers';
import { mockGitHubResponse } from './utils';

describe('transformers', () => {
  describe('parseGitHubStats', () => {
    it('should calculate contributions correctly', () => {
      const stats = parseGitHubStats({
        '2020-01-01': 10,
        '2020-01-02': 5,
        '2020-01-03': 15,
      });

      expect(stats.contributions.current).toEqual(15);
      expect(stats.contributions.total).toEqual(30);
      expect(stats.contributions.best).toEqual(15);
    });

    it('should calculate an unbroken streak correctly', () => {
      const stats = parseGitHubStats({
        '2020-01-01': 10,
        '2020-01-02': 1,
        '2020-01-03': 15,
        '2020-01-04': 2,
        '2020-01-05': 7,
      });

      expect(stats.streak.best).toEqual(5);
      expect(stats.streak.current).toEqual(5);
    });

    it('should calculate broken streaks correctly', () => {
      const stats = parseGitHubStats({
        '2020-01-01': 10,
        '2020-01-02': 1,
        '2020-01-03': 15,
        '2020-01-04': 0,
        '2020-01-05': 7,
      });

      expect(stats.streak.best).toEqual(3);
      expect(stats.streak.current).toEqual(1);
    });

    describe('streak is at risk calculations', () => {
      it('should be false if the most recent day has contributions', () => {
        const stats = parseGitHubStats({
          '2020-01-01': 10,
          '2020-01-02': 1,
          '2020-01-03': 15,
        });

        expect(stats.streak.isAtRisk).toEqual(false);
      });

      it('should be true if the most recent day has no contributions', () => {
        const stats = parseGitHubStats({
          '2020-01-01': 10,
          '2020-01-02': 1,
          '2020-01-03': 0,
        });

        expect(stats.streak.isAtRisk).toEqual(true);
      });

      it('should be false if the two most recent days had no contributions', () => {
        const stats = parseGitHubStats({
          '2020-01-01': 10,
          '2020-01-02': 0,
          '2020-01-03': 0,
        });

        expect(stats.streak.isAtRisk).toEqual(false);
      });
    });
  });

  describe('parseContributions', () => {
    it('should parse contributions', () => {
      const contributions = parseContributions(mockGitHubResponse);

      expect(contributions).toEqual({
        '2022-08-21': 0,
        '2022-08-22': 0,
        '2022-08-23': 5,
        '2022-08-24': 0,
        '2022-08-25': 50,
        '2022-08-26': 0,
        '2022-08-27': 0,
        '2022-08-28': 0,
        '2022-08-29': 0,
        '2022-08-30': 23,
        '2022-08-31': 3,
        '2022-09-01': 10,
        '2022-09-02': 9,
        '2022-09-03': 0,
        '2022-09-04': 0,
        '2022-09-05': 31,
        '2022-09-06': 5,
        '2022-09-07': 23,
        '2022-09-08': 10,
        '2022-09-09': 0,
        '2022-09-10': 0,
        '2022-09-11': 0,
        '2022-09-12': 10,
        '2022-09-13': 2,
        '2022-09-14': 0,
        '2022-09-15': 7,
        '2022-09-16': 1,
        '2022-09-17': 0,
        '2022-09-18': 0,
        '2022-09-19': 0,
        '2022-09-20': 11,
        '2022-09-21': 11,
        '2022-09-22': 4,
        '2022-09-23': 1,
        '2022-09-24': 0,
        '2022-09-25': 0,
        '2022-09-26': 18,
        '2022-09-27': 1,
        '2022-09-28': 2,
        '2022-09-29': 7,
        '2022-09-30': 4,
        '2022-10-01': 0,
        '2022-10-02': 0,
        '2022-10-03': 0,
        '2022-10-04': 1,
        '2022-10-05': 0,
        '2022-10-06': 0,
        '2022-10-07': 0,
        '2022-10-08': 0,
        '2022-10-09': 0,
        '2022-10-10': 0,
        '2022-10-11': 0,
        '2022-10-12': 0,
        '2022-10-13': 0,
        '2022-10-14': 0,
        '2022-10-15': 0,
        '2022-10-16': 0,
        '2022-10-17': 0,
        '2022-10-18': 0,
        '2022-10-19': 1,
        '2022-10-20': 0,
        '2022-10-21': 1,
        '2022-10-22': 0,
        '2022-10-23': 0,
        '2022-10-24': 0,
        '2022-10-25': 0,
        '2022-10-26': 0,
        '2022-10-27': 0,
        '2022-10-28': 0,
        '2022-10-29': 0,
        '2022-10-30': 0,
        '2022-10-31': 0,
        '2022-11-01': 0,
        '2022-11-02': 1,
        '2022-11-03': 2,
        '2022-11-04': 0,
        '2022-11-05': 0,
        '2022-11-06': 0,
        '2022-11-07': 0,
        '2022-11-08': 0,
        '2022-11-09': 0,
        '2022-11-10': 6,
        '2022-11-11': 0,
        '2022-11-12': 0,
        '2022-11-13': 0,
        '2022-11-14': 0,
        '2022-11-15': 0,
        '2022-11-16': 0,
        '2022-11-17': 0,
        '2022-11-18': 0,
        '2022-11-19': 0,
        '2022-11-20': 0,
        '2022-11-21': 2,
        '2022-11-22': 6,
        '2022-11-23': 3,
        '2022-11-24': 26,
        '2022-11-25': 12,
        '2022-11-26': 4,
        '2022-11-27': 1,
        '2022-11-28': 5,
        '2022-11-29': 5,
        '2022-11-30': 2,
        '2022-12-01': 0,
        '2022-12-02': 0,
        '2022-12-03': 0,
        '2022-12-04': 3,
        '2022-12-05': 13,
        '2022-12-06': 7,
        '2022-12-07': 6,
        '2022-12-08': 6,
        '2022-12-09': 3,
        '2022-12-10': 0,
        '2022-12-11': 0,
        '2022-12-12': 19,
        '2022-12-13': 4,
        '2022-12-14': 4,
        '2022-12-15': 8,
        '2022-12-16': 1,
        '2022-12-17': 0,
        '2022-12-18': 0,
        '2022-12-19': 14,
        '2022-12-20': 0,
        '2022-12-21': 1,
        '2022-12-22': 0,
        '2022-12-23': 0,
        '2022-12-24': 0,
        '2022-12-25': 0,
        '2022-12-26': 0,
        '2022-12-27': 0,
        '2022-12-28': 0,
        '2022-12-29': 0,
        '2022-12-30': 0,
        '2022-12-31': 0,
        '2023-01-01': 0,
        '2023-01-02': 0,
        '2023-01-03': 0,
        '2023-01-04': 2,
        '2023-01-05': 5,
        '2023-01-06': 0,
        '2023-01-07': 0,
        '2023-01-08': 0,
        '2023-01-09': 0,
        '2023-01-10': 2,
        '2023-01-11': 4,
        '2023-01-12': 0,
        '2023-01-13': 1,
        '2023-01-14': 0,
        '2023-01-15': 0,
        '2023-01-16': 1,
        '2023-01-17': 2,
        '2023-01-18': 2,
        '2023-01-19': 0,
        '2023-01-20': 0,
        '2023-01-21': 0,
        '2023-01-22': 0,
        '2023-01-23': 0,
        '2023-01-24': 0,
        '2023-01-25': 0,
        '2023-01-26': 0,
        '2023-01-27': 0,
        '2023-01-28': 0,
        '2023-01-29': 0,
        '2023-01-30': 0,
        '2023-01-31': 0,
        '2023-02-01': 1,
        '2023-02-02': 1,
        '2023-02-03': 1,
        '2023-02-04': 0,
        '2023-02-05': 0,
        '2023-02-06': 1,
        '2023-02-07': 0,
        '2023-02-08': 0,
        '2023-02-09': 5,
        '2023-02-10': 0,
        '2023-02-11': 0,
        '2023-02-12': 0,
        '2023-02-13': 4,
        '2023-02-14': 4,
        '2023-02-15': 1,
        '2023-02-16': 3,
        '2023-02-17': 0,
        '2023-02-18': 0,
        '2023-02-19': 0,
        '2023-02-20': 3,
        '2023-02-21': 2,
        '2023-02-22': 3,
        '2023-02-23': 2,
        '2023-02-24': 2,
        '2023-02-25': 0,
        '2023-02-26': 0,
        '2023-02-27': 14,
        '2023-02-28': 4,
        '2023-03-01': 21,
        '2023-03-02': 2,
        '2023-03-03': 2,
        '2023-03-04': 1,
        '2023-03-05': 0,
        '2023-03-06': 7,
        '2023-03-07': 5,
        '2023-03-08': 0,
        '2023-03-09': 3,
        '2023-03-10': 0,
        '2023-03-11': 0,
        '2023-03-12': 0,
        '2023-03-13': 0,
        '2023-03-14': 0,
        '2023-03-15': 12,
        '2023-03-16': 0,
        '2023-03-17': 0,
        '2023-03-18': 0,
        '2023-03-19': 1,
        '2023-03-20': 0,
        '2023-03-21': 0,
        '2023-03-22': 0,
        '2023-03-23': 0,
        '2023-03-24': 4,
        '2023-03-25': 4,
        '2023-03-26': 4,
        '2023-03-27': 1,
        '2023-03-28': 0,
        '2023-03-29': 0,
        '2023-03-30': 0,
        '2023-03-31': 0,
        '2023-04-01': 0,
        '2023-04-02': 0,
        '2023-04-03': 0,
        '2023-04-04': 0,
        '2023-04-05': 0,
        '2023-04-06': 0,
        '2023-04-07': 0,
        '2023-04-08': 0,
        '2023-04-09': 0,
        '2023-04-10': 0,
        '2023-04-11': 0,
        '2023-04-12': 0,
        '2023-04-13': 2,
        '2023-04-14': 0,
        '2023-04-15': 0,
        '2023-04-16': 0,
        '2023-04-17': 0,
        '2023-04-18': 0,
        '2023-04-19': 0,
        '2023-04-20': 0,
        '2023-04-21': 0,
        '2023-04-22': 0,
        '2023-04-23': 0,
        '2023-04-24': 3,
        '2023-04-25': 0,
        '2023-04-26': 0,
        '2023-04-27': 0,
        '2023-04-28': 0,
        '2023-04-29': 0,
        '2023-04-30': 0,
        '2023-05-01': 0,
        '2023-05-02': 0,
        '2023-05-03': 0,
        '2023-05-04': 0,
        '2023-05-05': 0,
        '2023-05-06': 0,
        '2023-05-07': 0,
        '2023-05-08': 0,
        '2023-05-09': 0,
        '2023-05-10': 0,
        '2023-05-11': 0,
        '2023-05-12': 0,
        '2023-05-13': 0,
        '2023-05-14': 0,
        '2023-05-15': 1,
        '2023-05-16': 2,
        '2023-05-17': 2,
        '2023-05-18': 0,
        '2023-05-19': 0,
        '2023-05-20': 0,
        '2023-05-21': 0,
        '2023-05-22': 3,
        '2023-05-23': 5,
        '2023-05-24': 1,
        '2023-05-25': 1,
        '2023-05-26': 0,
        '2023-05-27': 0,
        '2023-05-28': 0,
        '2023-05-29': 0,
        '2023-05-30': 0,
        '2023-05-31': 1,
        '2023-06-01': 0,
        '2023-06-02': 8,
        '2023-06-03': 0,
        '2023-06-04': 0,
        '2023-06-05': 3,
        '2023-06-06': 8,
        '2023-06-07': 0,
        '2023-06-08': 1,
        '2023-06-09': 0,
        '2023-06-10': 0,
        '2023-06-11': 0,
        '2023-06-12': 1,
        '2023-06-13': 0,
        '2023-06-14': 3,
        '2023-06-15': 3,
        '2023-06-16': 1,
        '2023-06-17': 0,
        '2023-06-18': 0,
        '2023-06-19': 0,
        '2023-06-20': 0,
        '2023-06-21': 0,
        '2023-06-22': 0,
        '2023-06-23': 0,
        '2023-06-24': 0,
        '2023-06-25': 0,
        '2023-06-26': 0,
        '2023-06-27': 0,
        '2023-06-28': 0,
        '2023-06-29': 0,
        '2023-06-30': 0,
        '2023-07-01': 0,
        '2023-07-02': 0,
        '2023-07-03': 2,
        '2023-07-04': 0,
        '2023-07-05': 0,
        '2023-07-06': 0,
        '2023-07-07': 0,
        '2023-07-08': 0,
        '2023-07-09': 0,
        '2023-07-10': 9,
        '2023-07-11': 0,
        '2023-07-12': 1,
        '2023-07-13': 0,
        '2023-07-14': 1,
        '2023-07-15': 0,
        '2023-07-16': 0,
        '2023-07-17': 0,
        '2023-07-18': 10,
        '2023-07-19': 6,
        '2023-07-20': 3,
        '2023-07-21': 1,
        '2023-07-22': 0,
        '2023-07-23': 0,
        '2023-07-24': 1,
        '2023-07-25': 0,
        '2023-07-26': 2,
        '2023-07-27': 2,
        '2023-07-28': 29,
        '2023-07-29': 0,
        '2023-07-30': 0,
        '2023-07-31': 13,
        '2023-08-01': 5,
        '2023-08-02': 6,
        '2023-08-03': 3,
        '2023-08-04': 0,
        '2023-08-05': 0,
        '2023-08-06': 0,
        '2023-08-07': 0,
        '2023-08-08': 0,
        '2023-08-09': 5,
        '2023-08-10': 0,
        '2023-08-11': 5,
        '2023-08-12': 0,
        '2023-08-13': 0,
        '2023-08-14': 11,
        '2023-08-15': 11,
        '2023-08-16': 9,
        '2023-08-17': 12,
        '2023-08-18': 0,
        '2023-08-19': 0,
        '2023-08-20': 0,
        '2023-08-21': 4,
        '2023-08-22': 3,
        '2023-08-23': 5,
      });
    });
  });
});

import { describe, expect, it } from 'vitest';

import { buildGitHubStats } from '../src/stats';
import { buildDays } from './helpers';

describe('buildGitHubStats', () => {
  it('should return empty stats when there are no contributions', () => {
    expect(buildGitHubStats([])).toEqual({
      streak: {
        current: 0,
        best: 0,
        previous: 0,
        isAtRisk: false,
        startDate: null,
      },
      contributions: {
        today: 0,
        total: 0,
        most: 0,
        lastContributionDate: null,
      },
      days: [],
    });
  });

  it('should include the days it was built from', () => {
    const days = buildDays([1, 2]);
    expect(buildGitHubStats(days).days).toBe(days);
  });

  it('should calculate contributions correctly', () => {
    const stats = buildGitHubStats(buildDays([10, 5, 15]));

    expect(stats.contributions.today).toEqual(15);
    expect(stats.contributions.total).toEqual(30);
    expect(stats.contributions.most).toEqual(15);
  });

  it('should calculate an unbroken streak correctly', () => {
    const stats = buildGitHubStats(buildDays([10, 1, 15, 2, 7]));

    expect(stats.streak.best).toEqual(5);
    expect(stats.streak.current).toEqual(5);
    expect(stats.streak.previous).toEqual(0);
  });

  it('should calculate broken streaks correctly', () => {
    const stats = buildGitHubStats(buildDays([10, 1, 15, 0, 7]));

    expect(stats.streak.best).toEqual(3);
    expect(stats.streak.current).toEqual(1);
    expect(stats.streak.previous).toEqual(3);
  });

  it('should calculate previous streak correctly', () => {
    const stats = buildGitHubStats(buildDays([10, 1, 15, 2, 0, 0]));

    expect(stats.streak.best).toEqual(4);
    expect(stats.streak.current).toEqual(0);
    expect(stats.streak.previous).toEqual(4);
  });

  it('should keep the current streak while it is at risk', () => {
    const stats = buildGitHubStats(buildDays([10, 1, 15, 2, 0]));

    expect(stats.streak.best).toEqual(4);
    expect(stats.streak.current).toEqual(4);
    expect(stats.streak.previous).toEqual(0);
    expect(stats.streak.startDate).toEqual('2020-01-01');
  });

  it('should not treat an at-risk streak as the previous streak', () => {
    const stats = buildGitHubStats(buildDays([1, 1, 1, 0, 2, 2, 0]));

    expect(stats.streak.best).toEqual(3);
    expect(stats.streak.current).toEqual(2);
    expect(stats.streak.previous).toEqual(3);
    expect(stats.streak.startDate).toEqual('2020-01-05');
  });

  it('should calculate multiple previous streaks correctly', () => {
    const stats = buildGitHubStats(buildDays([10, 1, 15, 0, 3, 1, 0, 1]));

    expect(stats.streak.best).toEqual(3);
    expect(stats.streak.current).toEqual(1);
    expect(stats.streak.previous).toEqual(2);
  });

  describe('streak.startDate', () => {
    it('should be the first day of an unbroken streak', () => {
      const stats = buildGitHubStats(buildDays([1, 2, 3]));
      expect(stats.streak.startDate).toEqual('2020-01-01');
    });

    it('should be the first day after the most recent break', () => {
      const stats = buildGitHubStats(buildDays([1, 0, 2, 3, 0, 4, 5]));
      expect(stats.streak.startDate).toEqual('2020-01-06');
    });

    it('should be the first day of an at-risk streak', () => {
      const stats = buildGitHubStats(buildDays([0, 1, 2, 0]));
      expect(stats.streak.startDate).toEqual('2020-01-02');
    });

    it('should be null when there is no current streak', () => {
      const stats = buildGitHubStats(buildDays([1, 2, 0, 0]));
      expect(stats.streak.startDate).toBeNull();
    });
  });

  describe('contributions.lastContributionDate', () => {
    it('should be the most recent day with contributions', () => {
      const stats = buildGitHubStats(buildDays([1, 3, 0, 0]));
      expect(stats.contributions.lastContributionDate).toEqual('2020-01-02');
    });

    it('should be null when there are no contributions', () => {
      const stats = buildGitHubStats(buildDays([0, 0]));
      expect(stats.contributions.lastContributionDate).toBeNull();
    });
  });

  describe('isStreakAtRisk', () => {
    it('should be false if the most recent day has contributions', () => {
      const stats = buildGitHubStats(buildDays([10, 1, 15]));
      expect(stats.streak.isAtRisk).toEqual(false);
    });

    it('should be true if the most recent day has no contributions', () => {
      const stats = buildGitHubStats(buildDays([10, 1, 0]));
      expect(stats.streak.isAtRisk).toEqual(true);
    });

    it('should be false if the two most recent days had no contributions', () => {
      const stats = buildGitHubStats(buildDays([10, 0, 0]));
      expect(stats.streak.isAtRisk).toEqual(false);
    });

    it('should be false if the only day has no contributions', () => {
      const stats = buildGitHubStats(buildDays([0]));
      expect(stats.streak.isAtRisk).toEqual(false);
    });
  });
});

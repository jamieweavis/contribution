import fs from 'node:fs';

export const fetchGitHubStatsShape = {
  bestStreak: expect.any(Number),
  currentStreak: expect.any(Number),
  previousStreak: expect.any(Number),
  isStreakAtRisk: expect.any(Boolean),
  mostContributions: expect.any(Number),
  todaysContributions: expect.any(Number),
  totalContributions: expect.any(Number),
};

export const mockGitHubResponse = fs.readFileSync(
  './src/tests/mocks/mock-github-response.html',
  'utf8',
);

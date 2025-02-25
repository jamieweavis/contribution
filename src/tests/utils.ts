import fs from 'node:fs';

export const fetchStatsShape = {
  streak: {
    best: expect.any(Number),
    current: expect.any(Number),
    isAtRisk: expect.any(Boolean),
    previous: expect.any(Number),
  },
  contributions: {
    best: expect.any(Number),
    current: expect.any(Number),
    total: expect.any(Number),
  },
};

export const mockGitHubResponse = fs.readFileSync(
  './src/tests/mocks/mock-github-response.html',
  'utf8',
);

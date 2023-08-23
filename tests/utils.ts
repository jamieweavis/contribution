import fs from 'fs';

export const fetchStatsShape = {
  streak: {
    best: expect.any(Number),
    current: expect.any(Number),
    isAtRisk: expect.any(Boolean),
  },
  contributions: {
    best: expect.any(Number),
    current: expect.any(Number),
    total: expect.any(Number),
  },
};

export const mockGitHubResponse = fs.readFileSync(
  './tests/mocks/mock-github-response.html',
  'utf8',
);

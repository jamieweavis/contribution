import https from 'https';
import { IncomingMessage } from 'http';
import { Socket } from 'net';

import { fetchStats } from '../src/contribution';
import { fetchStatsShape } from './utils';

jest.mock('https');
(https.get as jest.Mock).mockImplementation((url, callback) => {
  const response = new IncomingMessage({} as unknown as Socket);
  if (callback) callback(response);
  response.statusCode = 200;
  response.emit('data', 'mocked body string');
  response.emit('end');
  return response;
});

jest.mock('../src/transformers', () => ({
  parseContributions: (params) => mockParseContributions(params),
  parseGitHubStats: (params) => mockParseGitHubStats(params),
}));

const mockParseContributions = jest.fn((params: unknown) => ({
  '2020-01-01': 5,
  '2020-01-02': 10,
  '2020-01-03': 15,
}));

const mockParseGitHubStats = jest.fn((params: unknown) => ({
  streak: { best: 3, current: 3, isAtRisk: false },
  contributions: { best: 3, total: 6, current: 3 },
}));

describe('contribution', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchStats', () => {
    it('should resolve a promise with contribution stats', async () => {
      const stats = await fetchStats('username');

      expect(stats).toEqual(expect.objectContaining(fetchStatsShape));
    });

    it('should call parseContribution with the response body string', async () => {
      await fetchStats('username');

      expect(mockParseContributions).toHaveBeenCalledWith('mocked body string');
      expect(mockParseContributions).toHaveBeenCalledTimes(1);
    });

    it('should call parseGitHubStats with contribution data', async () => {
      await fetchStats('username');

      expect(mockParseGitHubStats).toHaveBeenCalledWith({
        '2020-01-01': 5,
        '2020-01-02': 10,
        '2020-01-03': 15,
      });
      expect(mockParseGitHubStats).toHaveBeenCalledTimes(1);
    });

    describe('when supplied with an onSuccess callback', () => {
      it('should execute the success callback with contribution stats', () => {
        const mockOnSuccess = jest.fn();
        fetchStats('username', { onSuccess: mockOnSuccess });

        expect(mockOnSuccess).toHaveBeenCalledWith(
          expect.objectContaining(fetchStatsShape),
        );
      });
    });

    describe('when the request fails', () => {
      it('should reject the promise with a failed response', async () => {
        (https.get as jest.Mock).mockImplementation((url, callback) => {
          const response = new IncomingMessage({} as unknown as Socket);
          if (callback) callback(response);
          response.statusCode = 404;
          response.emit('end');
          return response;
        });

        await expect(fetchStats('username')).rejects.toEqual(
          expect.objectContaining({
            statusCode: 404,
          }),
        );
      });

      describe('when supplied with a onFailure callback', () => {
        it('should execute the failure callback with the response', () => {
          (https.get as jest.Mock).mockImplementation((url, callback) => {
            const response = new IncomingMessage({} as unknown as Socket);
            if (callback) callback(response);
            response.statusCode = 404;
            response.emit('data', 'mocked body string');
            response.emit('end');
            return response;
          });

          const mockOnFailure = jest.fn();
          fetchStats('username', { onFailure: mockOnFailure });

          expect(mockOnFailure).toHaveBeenCalledWith(
            expect.objectContaining({
              statusCode: 404,
            }),
          );
        });
      });
    });
  });
});

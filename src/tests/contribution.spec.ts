import { fetchStats } from '../contribution';
import type { GitHubStats } from '../transformers';
import { parseContributions, parseGitHubStats } from '../transformers';

jest.mock('../transformers', () => ({
  parseContributions: jest.fn(),
  parseGitHubStats: jest.fn(),
}));

describe('fetchStats', () => {
  const mockUsername = 'testuser';
  const mockHtmlResponse = '<div>Mock Contributions</div>';
  const mockContributions = { '2024-02-01': 10 };
  const mockGitHubStats: GitHubStats = {
    streak: { best: 0, current: 0, isAtRisk: false, previous: 0 },
    contributions: { best: 0, total: 0, current: 0 },
  };

  beforeEach(() => {
    global.fetch = jest.fn();
    (parseContributions as jest.Mock).mockReturnValue(mockContributions);
    (parseGitHubStats as jest.Mock).mockReturnValue(mockGitHubStats);
  });

  afterEach(() => jest.clearAllMocks());

  it('should fetch and parse GitHub stats successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue(mockHtmlResponse),
    });

    const result = await fetchStats(mockUsername);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://github.com/users/${mockUsername}/contributions`,
    );
    expect(parseContributions).toHaveBeenCalledWith(mockHtmlResponse);
    expect(parseGitHubStats).toHaveBeenCalledWith(mockContributions);
  });

  it('should resolve with a successful response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue(mockHtmlResponse),
    });

    await expect(fetchStats(mockUsername)).resolves.toEqual(mockGitHubStats);
  });

  it('should reject with a failed response', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    await expect(fetchStats(mockUsername)).rejects.toThrow(
      'Failed to fetch GitHub contributions',
    );
  });

  it('should throw an error when fetch fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(fetchStats(mockUsername)).rejects.toThrow('Network error');
  });

  it('should throw an error when response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(fetchStats(mockUsername)).rejects.toThrow(
      'Failed to fetch GitHub contributions',
    );
  });
});

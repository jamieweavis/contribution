import { afterEach, describe, expect, it, vi } from 'vitest';

import { fetchContributionGraph, getContributionGraphUrl } from '../src/client';
import {
  ContributionError,
  GitHubRequestError,
  InvalidUsernameError,
} from '../src/errors';

const mockResponse = (init: Partial<Response>): Response =>
  ({ ok: true, status: 200, statusText: 'OK', ...init }) as Response;

describe('getContributionGraphUrl', () => {
  it('should build the contribution graph url for a user', () => {
    expect(getContributionGraphUrl('jamieweavis')).toBe(
      'https://github.com/users/jamieweavis/contributions',
    );
  });

  it('should encode the username', () => {
    expect(getContributionGraphUrl('a/../b?c')).toBe(
      'https://github.com/users/a%2F..%2Fb%3Fc/contributions',
    );
  });
});

describe('fetchContributionGraph', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('should resolve with the response body', async () => {
    const fetch = vi
      .fn()
      .mockResolvedValue(
        mockResponse({ text: () => Promise.resolve('<html></html>') }),
      );

    await expect(fetchContributionGraph('testuser', { fetch })).resolves.toBe(
      '<html></html>',
    );
    expect(fetch).toHaveBeenCalledWith(
      'https://github.com/users/testuser/contributions',
      { signal: undefined },
    );
  });

  it('should use the global fetch by default', async () => {
    const fetch = vi
      .fn()
      .mockResolvedValue(mockResponse({ text: () => Promise.resolve('body') }));
    vi.stubGlobal('fetch', fetch);

    await expect(fetchContributionGraph('testuser')).resolves.toBe('body');
    expect(fetch).toHaveBeenCalledOnce();
  });

  it('should pass the abort signal to fetch', async () => {
    const fetch = vi
      .fn()
      .mockResolvedValue(mockResponse({ text: () => Promise.resolve('') }));
    const { signal } = new AbortController();

    await fetchContributionGraph('testuser', { fetch, signal });

    expect(fetch).toHaveBeenCalledWith(expect.any(String), { signal });
  });

  it.each([
    'a',
    'jamieweavis',
    'Jamie-Weavis',
    'a1-b2-c3',
    'jamie-',
    'jamie--weavis',
    'a'.repeat(39),
  ])('should accept the valid username "%s"', async (username) => {
    const fetch = vi
      .fn()
      .mockResolvedValue(mockResponse({ text: () => Promise.resolve('') }));

    await expect(fetchContributionGraph(username, { fetch })).resolves.toBe('');
  });

  it.each(['', '   ', '-', '-jamie', 'jamie_weavis', 'a/../b', 'a'.repeat(40)])(
    'should reject the invalid username "%s" without fetching',
    async (username) => {
      const fetch = vi.fn();

      const error = await fetchContributionGraph(username, { fetch }).catch(
        (error: unknown) => error,
      );

      expect(error).toBeInstanceOf(InvalidUsernameError);
      expect(error).toBeInstanceOf(ContributionError);
      expect(error).toMatchObject({
        message: `Invalid GitHub username "${username}"`,
      });
      expect(fetch).not.toHaveBeenCalled();
    },
  );

  it('should throw a GitHubRequestError for a non-ok response', async () => {
    const fetch = vi
      .fn()
      .mockResolvedValue(
        mockResponse({ ok: false, status: 404, statusText: 'Not Found' }),
      );

    const error = await fetchContributionGraph('testuser', { fetch }).catch(
      (error: unknown) => error,
    );

    expect(error).toBeInstanceOf(GitHubRequestError);
    expect(error).toBeInstanceOf(ContributionError);
    expect(error).toMatchObject({
      name: 'GitHubRequestError',
      message:
        'Failed to fetch GitHub contributions for "testuser": 404 Not Found',
      status: 404,
    });
  });

  it('should wrap network errors in a GitHubRequestError', async () => {
    const cause = new Error('Network error');
    const fetch = vi.fn().mockRejectedValue(cause);

    const error = await fetchContributionGraph('testuser', { fetch }).catch(
      (error: unknown) => error,
    );

    expect(error).toBeInstanceOf(GitHubRequestError);
    expect(error).toMatchObject({
      message:
        'Failed to fetch GitHub contributions for "testuser": Network error',
      status: undefined,
      cause,
    });
  });

  it('should wrap non-Error rejections in a GitHubRequestError', async () => {
    const fetch = vi.fn().mockRejectedValue('offline');

    await expect(
      fetchContributionGraph('testuser', { fetch }),
    ).rejects.toMatchObject({
      message: 'Failed to fetch GitHub contributions for "testuser": offline',
      cause: 'offline',
    });
  });
});

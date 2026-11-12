import { GitHubRequestError, InvalidUsernameError } from './errors.js';
import type { FetchOptions } from './types.js';

export const GITHUB_BASE_URL = 'https://github.com';

// Alphanumerics and hyphens, not starting with a hyphen, up to 39 characters.
// Looser than GitHub's current signup rules, as legacy accounts may have
// trailing or consecutive hyphens.
const USERNAME_PATTERN = /^[a-z\d][a-z\d-]{0,38}$/i;

export const getContributionGraphUrl = (username: string): string =>
  `${GITHUB_BASE_URL}/users/${encodeURIComponent(username)}/contributions`;

/** Fetches the raw contribution graph HTML for a GitHub user */
export const fetchContributionGraph = async (
  username: string,
  { fetch: fetchImpl = globalThis.fetch, signal }: FetchOptions = {},
): Promise<string> => {
  if (!USERNAME_PATTERN.test(username)) {
    throw new InvalidUsernameError(`Invalid GitHub username "${username}"`);
  }

  const url = getContributionGraphUrl(username);
  const failure = `Failed to fetch GitHub contributions for "${username}"`;

  let response: Response;
  try {
    response = await fetchImpl(url, { signal });
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new GitHubRequestError(`${failure}: ${reason}`, { cause: error });
  }

  if (!response.ok) {
    throw new GitHubRequestError(
      `${failure}: ${response.status} ${response.statusText}`,
      { status: response.status },
    );
  }

  return response.text();
};

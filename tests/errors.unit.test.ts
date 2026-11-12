import { describe, expect, it } from 'vitest';

import {
  ContributionError,
  ContributionGraphParseError,
  GitHubRequestError,
  InvalidUsernameError,
} from '../src/errors';

describe('errors', () => {
  it.each([
    ['ContributionError', ContributionError],
    ['GitHubRequestError', GitHubRequestError],
    ['ContributionGraphParseError', ContributionGraphParseError],
    ['InvalidUsernameError', InvalidUsernameError],
  ])('%s should be a named ContributionError', (name, ErrorClass) => {
    const error = new ErrorClass('message');

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ContributionError);
    expect(error.name).toBe(name);
    expect(error.message).toBe('message');
  });

  it('GitHubRequestError should expose the status and cause', () => {
    const cause = new Error('cause');
    const error = new GitHubRequestError('message', { status: 500, cause });

    expect(error.status).toBe(500);
    expect(error.cause).toBe(cause);
  });
});

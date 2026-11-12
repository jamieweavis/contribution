/** Base class for all errors thrown by this package */
export class ContributionError extends Error {
  override name = 'ContributionError';
}

/** Thrown when a username is not a valid GitHub username */
export class InvalidUsernameError extends ContributionError {
  override name = 'InvalidUsernameError';
}

/** Thrown when the contribution graph could not be fetched from GitHub */
export class GitHubRequestError extends ContributionError {
  override name = 'GitHubRequestError';

  /** HTTP status code, if a response was received */
  readonly status?: number;

  constructor(message: string, options?: ErrorOptions & { status?: number }) {
    super(message, options);
    this.status = options?.status;
  }
}

/** Thrown when the contribution graph HTML is not in the expected format */
export class ContributionGraphParseError extends ContributionError {
  override name = 'ContributionGraphParseError';
}

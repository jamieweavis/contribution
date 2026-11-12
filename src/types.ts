/** GitHub contribution graph legend level, from 0 (none) to 4 (most) */
export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  /** Date in `YYYY-MM-DD` format */
  readonly date: string;
  /** Number of contributions made on this day */
  readonly count: number;
  /** GitHub contribution graph legend level */
  readonly level: ContributionLevel;
}

export interface StreakStats {
  /** Consecutive days with contributions, ending on the most recent day (or the day before, when the streak is at risk) */
  readonly current: number;
  /** Longest run of consecutive days with contributions */
  readonly best: number;
  /** Length of the most recent streak that has ended before the current one */
  readonly previous: number;
  /** Whether the most recent day has no contributions yet but the day before did, so the current streak can still be continued */
  readonly isAtRisk: boolean;
  /** Date the current streak started in `YYYY-MM-DD` format, or `null` when there is no current streak */
  readonly startDate: string | null;
}

export interface ContributionStats {
  /** Contributions made on the most recent day */
  readonly today: number;
  /** Total contributions across all days */
  readonly total: number;
  /** Most contributions made on a single day */
  readonly most: number;
  /** Date of the most recent day with contributions in `YYYY-MM-DD` format, or `null` when there are none */
  readonly lastContributionDate: string | null;
}

export interface GitHubStats {
  readonly streak: StreakStats;
  readonly contributions: ContributionStats;
  /** Contribution days, sorted chronologically */
  readonly days: readonly ContributionDay[];
}

export interface FetchOptions {
  /** Custom fetch implementation, defaults to the global `fetch` */
  fetch?: typeof globalThis.fetch;
  /** Signal used to abort the request */
  signal?: AbortSignal;
}

import { IncomingMessage } from 'http';

export interface Options {
  enableCors?: boolean;
  onSuccess?: (stats: GitHubStats) => void;
  onFailure?: (error: IncomingMessage) => void;
}

export interface Streak {
  best: number;
  current: number;
}

export interface Contributions {
  best: number;
  total: number;
  current: number;
}

export interface GitHubStats {
  streak: Streak;
  contributions: Contributions;
}

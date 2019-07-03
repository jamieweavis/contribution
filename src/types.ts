export interface Options {
  enableCors?: boolean;
  onSuccess?: Function;
  onFailure?: Function;
}

interface Streak {
  best: number;
  current: number;
}

interface Contributions {
  best: number;
  total: number;
  current: number;
}

export interface Data {
  streak: Streak;
  contributions: Contributions;
}

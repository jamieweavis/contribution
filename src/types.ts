export interface Options {
  enableCors?: Boolean;
  onSuccess?: Function;
  onFailure?: Function;
}

interface Streak {
  best: Number;
  current: Number;
}

interface Contributions {
  best: Number;
  total: Number;
  current: Number;
}

export interface Data {
  streak: Streak;
  contributions: Contributions;
}

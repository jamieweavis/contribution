# Contribution

> 🗓 GitHub user contribution graph parser, streak & stat calculator

[![ci](https://github.com/jamieweavis/contribution/workflows/ci/badge.svg)](https://github.com/jamieweavis/contribution/actions)
[![downloads](https://img.shields.io/npm/dt/contribution.svg)](https://npmjs.com/package/contribution)
[![version](https://img.shields.io/npm/v/contribution.svg)](https://github.com/jamieweavis/contribution/releases)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jamieweavis/contribution/blob/main/LICENSE)
![zero dependencies](https://img.shields.io/badge/dependencies-0-violet)


## Install

```sh
npm install contribution
```

## Usage

```javascript
import { fetchGitHubStats } from 'contribution';

// Promise chaining
fetchGitHubStats('jamieweavis')
  .then((gitHubStats) => console.info(gitHubStats))
  .catch((error) => console.error(error));

// Try catch with async/await
try {
  const gitHubStats = await fetchGitHubStats('jamieweavis');
  console.info(gitHubStats);
} catch (error) {
  console.error(error);
}
```

```typescript
interface GitHubStats {
  bestStreak: number;
  currentStreak: number;
  previousStreak: number;

  isStreakAtRisk: boolean;

  mostContributions: number;
  todaysContributions: number;
  totalContributions: number;

  contributions: Contributions;
}

interface Contributions {
  [date: string]: Day; // YYYY-MM-DD
}

interface Day {
  contributions: number;
  gitHubLegendLevel: number;
}
```

## Built with

- [Node.js](https://github.com/nodejs/node)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Parcel](https://github.com/parcel-bundler/parcel)

## Related

- [Streaker](https://github.com/jamieweavis/streaker) - 🔥 GitHub contribution streak & stat tracking menu bar app
- [Streaker CLI](https://github.com/jamieweavis/streaker-cli) - 🔥 GitHub contribution streak & stat tracking command line app

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

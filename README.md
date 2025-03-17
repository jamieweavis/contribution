# Contribution

> 🗓 GitHub contribution streak & stat fetcher with zero dependencies

[![build](https://github.com/jamieweavis/contribution/workflows/build/badge.svg)](https://github.com/jamieweavis/contribution/actions/workflows/build.yml)
[![downloads](https://img.shields.io/npm/dt/contribution.svg)](https://npmjs.com/package/contribution)
[![version](https://img.shields.io/npm/v/contribution.svg)](https://github.com/jamieweavis/contribution/releases)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jamieweavis/contribution/blob/main/LICENSE.md)

## Install

```sh
npm install contribution
```

## Usage

```javascript
import { fetchStats } from 'contribution';

// Promise chaining
fetchStats('jamieweavis')
  .then((gitHubStats) => console.log(gitHubStats))
  .catch((error) => console.log(error));

// Try catch with async/await
try {
  const gitHubStats = await fetchStats('jamieweavis');
  console.info(gitHubStats);
} catch (error) {
  console.error(error);
}
```

```typescript
interface GitHubStats {
  streak: {
    best: number;
    current: number;
    isAtRisk: boolean;
    previous: number;
  };
  contributions: {
    best: number;
    total: number;
    current: number;
  };
}
```

## Related

- [Streaker](https://github.com/jamieweavis/streaker) - 🐙 GitHub contribution streak & stat tracking menu bar app
- [Streaker CLI](https://github.com/jamieweavis/streaker-cli) - 🐙 GitHub contribution streak & stat tracking command line app

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

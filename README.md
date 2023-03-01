# Contribution

> 🗓 GitHub contribution streak & stat fetcher with zero dependencies

[![build](https://github.com/jamieweavis/contribution/workflows/build/badge.svg)](https://github.com/jamieweavis/contribution/actions/workflows/build.yml)
[![downloads](https://img.shields.io/npm/dt/contribution.svg)](https://npmjs.com/package/contribution)
[![version](https://img.shields.io/npm/v/contribution.svg)](https://github.com/jamieweavis/contribution/releases)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jamieweavis/contribution/blob/main/LICENSE.md)

## Install

```shell
npm install contribution
```

## Usage

```javascript
import { fetchStats } from 'contribution';

// Callbacks
fetchStats('jamieweavis', {
  onSuccess: stats => console.log(stats),
  onFailure: error => console.log(error),
});

// Promises
fetchStats('jamieweavis')
  .then(stats => console.log(stats))
  .catch(error => console.log(error));

// Async/await
async function getContributionData() {
  try {
    const stats = await fetchStats('jamieweavis');
    console.log(stats);
  } catch (error) {
    console.log(error);
  }
}

// Returned `GitHubStats` object
// {
//   streak: {
//     best: 420,
//     current: 69,
//   },
//   contributions: {
//     best: 42,
//     current: 5,
//     total: 1337,
//   }
// }
```

## Related

- [Streaker](https://github.com/jamieweavis/streaker) - 🐙 GitHub contribution streak & stat tracking menu bar app
- [Streaker CLI](https://github.com/jamieweavis/streaker-cli) - 🐙 GitHub contribution streak & stat tracking CLI app

<div align="center">

# Contribution

GitHub contribution graph parser calculates contribution streak and commit statistics from a user's GitHub contribution graph page

[![ci](https://github.com/jamieweavis/contribution/workflows/ci/badge.svg)](https://github.com/jamieweavis/contribution/actions)
[![coverage](https://img.shields.io/badge/coverage-100%25-green)](https://npmjs.com/package/contribution)
[![downloads](https://img.shields.io/npm/dt/contribution.svg)](https://npmjs.com/package/contribution)
[![version](https://img.shields.io/npm/v/contribution.svg)](https://github.com/jamieweavis/contribution/releases)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jamieweavis/contribution/blob/main/LICENSE)

[**Install**](#install) · [Usage](#usage) · [Development](#development) · [Related](#related)

</div>

## Motivation

The GitHub API does not provide contribution streak data; this package scrapes and parses the contribution graph from a user's GitHub contribution graph at https://github.com/users/USERNAME/contributions to provide contribution streak and commit statistics.

## Install

Install from npm with your favourite package manager:

```sh
# npm
npm install contribution

# yarn
yarn add contribution

# pnpm
pnpm add contribution

# bun
bun add contribution
```

## Usage

Import the function and call it with a GitHub username:

```typescript
import { fetchGitHubStats } from 'contribution';

const stats = await fetchGitHubStats('jamieweavis');
console.log(stats);
```

An optional second argument accepts a custom `fetch` implementation and an `AbortSignal`:

```typescript
const stats = await fetchGitHubStats('jamieweavis', {
  signal: AbortSignal.timeout(5000),
});
```

The returned `GitHubStats` object has the following structure:

```typescript
interface GitHubStats {
  streak: {
    current: number; // consecutive days with contributions, ending today (or yesterday, when at risk)
    best: number; // longest streak
    previous: number; // length of the most recent streak that ended before the current one
    isAtRisk: boolean; // no contributions today yet, but the current streak can still be continued
    startDate: string | null; // YYYY-MM-DD the current streak started
  };
  contributions: {
    today: number;
    total: number;
    most: number; // most contributions on a single day
    lastContributionDate: string | null; // YYYY-MM-DD
  };
  days: ContributionDay[]; // sorted chronologically
}

interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // GitHub legend level
}
```

All returned objects are typed as `readonly`.

### Lower-level API

Each stage of the pipeline is also exported, so you can fetch, parse or calculate independently (for example, to parse HTML you have cached):

| Function | Description |
| --- | --- |
| `fetchContributionGraph(username, options?)` | Fetches the raw contribution graph HTML |
| `parseContributionGraph(html)` | Parses contribution graph HTML into chronologically sorted `ContributionDay[]` |
| `buildGitHubStats(days)` | Calculates `GitHubStats` from `ContributionDay[]` |

### Errors

All errors thrown by the package extend `ContributionError`:

- `InvalidUsernameError`: the username is not a valid GitHub username (letters, numbers and hyphens, not starting with a hyphen, up to 39 characters)
- `GitHubRequestError`: the request failed or GitHub returned a non-OK response (`status` holds the HTTP status code, `cause` holds the underlying network error)
- `ContributionGraphParseError`: the HTML does not contain a contribution graph in the expected format

```typescript
import { fetchGitHubStats, GitHubRequestError } from 'contribution';

try {
  await fetchGitHubStats('jamieweavis');
} catch (error) {
  if (error instanceof GitHubRequestError && error.status === 404) {
    console.error('User not found');
  }
}
```

## Development

### Prerequisites

- [Node.js](https://github.com/nodejs/node) (v22+)
- [pnpm](https://github.com/pnpm/pnpm) (v10+)

### Getting Started

Clone the repository and install dependencies:

```sh
git clone https://github.com/jamieweavis/contribution.git

cd contribution

pnpm install
```

Run all tests with [Vitest](https://github.com/vitest-dev/vitest):

```sh
pnpm test
```

Check the code for linting and formatting issues with [Biome](https://github.com/biomejs/biome):

```sh
pnpm check
```

Build the package with [TypeScript](https://github.com/microsoft/typescript):

```sh
pnpm build
```

## Related

- [Streaker](https://github.com/jamieweavis/streaker) - Cross-platform GitHub contribution streak & statistic tracking menu bar application with reminder notification
- [Streaker CLI](https://github.com/jamieweavis/streaker-cli) - GitHub contribution streak & statistic tracking command line application with ASCII contribution graph

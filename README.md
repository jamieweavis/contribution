# Contribution

GitHub contribution graph parser calculates contribution streak and commit statistics from a user's GitHub contribution graph page

[![ci](https://github.com/jamieweavis/contribution/workflows/ci/badge.svg)](https://github.com/jamieweavis/contribution/actions)
[![dependencies](https://img.shields.io/badge/dependencies-0-green)](https://npmjs.com/package/contribution)
[![coverage](https://img.shields.io/badge/coverage-100%25-green)](https://npmjs.com/package/contribution)
[![downloads](https://img.shields.io/npm/dt/contribution.svg)](https://npmjs.com/package/contribution)
[![version](https://img.shields.io/npm/v/contribution.svg)](https://github.com/jamieweavis/contribution/releases)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jamieweavis/contribution/blob/main/LICENSE)

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

The returned `GitHubStats` object has the following structure:

```typescript
interface GitHubStats {
  // Streak
  bestStreak: number;
  previousStreak: number;
  currentStreak: number;
  isStreakAtRisk: boolean;

  // Contributions
  mostContributions: number;
  todaysContributions: number;
  totalContributions: number;
  contributions: Contributions;
}

interface Contributions {
  [date: string]: Day; // [YYYY-MM-DD]
}

interface Day {
  contributions: number;
  gitHubLegendLevel: number;
}
```

## Development

### Prerequisites

- [Node.js](https://github.com/nodejs/node) (>=18.x.x)
- [pnpm](https://github.com/pnpm/pnpm) (>=10.x.x)

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

Build the package with [Parcel](https://github.com/parcel-bundler/parcel):

```sh
pnpm build
```

## Related

- [Streaker](https://github.com/jamieweavis/streaker) - Cross-platform GitHub contribution streak & statistic tracking menu bar application with reminder notification
- [Streaker CLI](https://github.com/jamieweavis/streaker-cli) - GitHub contribution streak & statistic tracking command line application with ASCII contribution graph

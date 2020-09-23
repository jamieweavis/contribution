# Contribution <img src="https://twemoji.maxcdn.com/2/svg/1f4c5.svg" height="64" alt="Project Logo" align="right">

> 🗓 GitHub contribution streak & stat fetcher with zero dependencies

![Node.js CI](https://github.com/jamieweavis/contribution/workflows/Node.js%20CI/badge.svg)
[![Coverage](https://img.shields.io/codecov/c/github/jamieweavis/contribution.svg)](https://codecov.io/gh/jamieweavis/contribution)
[![Downloads](https://img.shields.io/npm/dt/contribution.svg)](https://npmjs.com/package/contribution)
[![Version](https://img.shields.io/npm/v/contribution.svg)](https://github.com/jamieweavis/contribution/releases)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jamieweavis/contribution/blob/master/LICENSE.md)
[![Style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [`fetchStats(username, [options])`](#fetchstatsusername-options)
    - [`username`](#username)
    - [`options`](#options)
      - [`onSuccess`](#onsuccess)
      - [`onFailure`](#onfailure)
      - [`enableCors`](#enablecors)
- [Related](#related)
- [License](#license)

## Installation

Contribution can be installed from the command line with [npm](https://www.npmjs.com/):

```sh
$ npm install contribution
```

## Usage

Import `fetchStats` from Contribution using CommonJS `require` or ES Module `import`:

```javascript
// CommonJS require
const { fetchStats } = require('contribution');

// ES Module import
import { fetchStats } from 'contribution';
```

Contribution can be used with callbacks, promises or async/await:

```javascript
// Callbacks
fetchStats('jamieweavis', {
  onSuccess: data => console.log(data),
  onFailure: error => console.log(error),
});

// Promises
fetchStats('jamieweavis')
  .then(data => console.log(data))
  .catch(error => console.log(error));

// Async/await
async function getContributionData() {
  try {
    const data = await fetchStats('jamieweavis');
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
```

## API

### `fetchStats(username, [options])`

Type: `Function`

Returns: `Promise`

Resolves: `Object`

Resolves an object with the following structure:

```javascript
{
  streak: {
    best: Number,
    current: Number,
  },
  contributions: {
    best: Number,
    current: Number,
    total: Number,
  }
}
```

#### `username`

Type: `String`

The GitHub username to fetch contribution data for.

#### `options`

Type: `Object`

##### `onSuccess`

Type: `Function`

Parameters: `data`

Callback function to handle the returned data. Passed a `data` object which has the same structure as the resolved data object above.

##### `onFailure`

Type: `Function`

Parameters: `error`

Callback function to handle an error. Passed an `error` object which corresponds to a HTTP Response with `error.statusCode` etc.

##### `enableCors`

Type: `Boolean`

Default: `false`

Whether to proxy the request through the [cors-anywhere](https://github.com/Rob--W/cors-anywhere) API to enable fetching data x-origin. Set this option to true if you are using `contribution` through the browser.

## Related

- [streaker](https://github.com/jamieweavis/streaker) - 🐙 GitHub contribution streak & stat tracking menu bar app
- [streaker-cli](https://github.com/jamieweavis/streaker-cli) - 🐙 GitHub contribution streak & stat tracking CLI app

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

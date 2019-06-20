<p align="center"><img src="https://twemoji.maxcdn.com/2/svg/1f4c5.svg" height="64" alt="Project Logo"></p>
<h3 align="center">Contribution</h3>
<p align="center">🗓 GitHub contribution streak & stat fetcher with zero dependencies</p>
<p align="center">
    <a href="https://travis-ci.org/jamieweavis/contribution"><img src="https://img.shields.io/travis/jamieweavis/contribution.svg" alt="Build Status"></a>
    <a href="https://codecov.io/gh/jamieweavis/contribution/"><img src="https://img.shields.io/codecov/c/github/jamieweavis/contribution.svg" alt="Code Coverage"></a>
    <a href="https://npmjs.com/package/contribution"><img src="https://img.shields.io/npm/dt/contribution.svg" alt="npm Downloads"></a>
    <a href="https://npmjs.com/package/contribution"><img src="https://img.shields.io/npm/v/contribution.svg" alt="npm Version"></a>
    <a href="https://github.com/jamieweavis/contribution/blob/master/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a>
    <a href="https://github.com/airbnb/javascript"><img src="https://img.shields.io/badge/codestyle-airbnb-fd5c63.svg" alt="airbnb Code Style"></a>
</p>

## Installation

Contribution can be installed from command line with [npm](https://github.com/npm/npm).

```sh
$ npm install contribution
```

## Usage

Import Contribution using CommonJS `require` _or_ ES Module `import`.

```javascript
// CommonJS require
const contribution = require('contribution');

// ES Module import
import contribution from 'contribution';
```

Contribution can be used with callbacks, promises or async/await.

```javascript
// Callback
contribution('jamieweavis', {
  onSuccess: data => console.log(data),
  onFailure: error => console.log(error)
});

// Promise
contribution('jamieweavis').then(data => {
  console.log(data);
}).catch(error => {
  console.log(error);
});

// Async/await
async function getContributionData() {
  try {
    const data = await contribution('jamieweavis')
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
```

## API

### `contribution(username, [options])`

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

###### `onSuccess`

Type: `Function`

Parameters: `data`

Callback function to handle the returned data. Passed a `data` object which has the same structure as the resolved data object above.

###### `onFailure`

Type: `Function`

Parameters: `error`

Callback function to handle an error. Passed an `error` object which corresponds to a HTTP Response with `error.statusCode` etc.

###### `enableCors`

Type: `Boolean`

Default: `false`

Whether to proxy the request through the [cors-anywhere](https://github.com/Rob--W/cors-anywhere) API to enable fetching data x-origin. Set this option to true if you are using `contribution` through the browser.

## Related

* [streaker](https://github.com/jamieweavis/streaker) - 🐙 GitHub contribution streak & stat tracking menu bar app
* [streaker-cli](https://github.com/jamieweavis/streaker-cli) - 🐙 GitHub contribution streak & stat tracking CLI app

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

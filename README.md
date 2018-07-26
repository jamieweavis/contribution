<p align="center"><img src="https://twemoji.maxcdn.com/2/svg/1f4c5.svg" height="64" alt="Project Logo"></p>
<h3 align="center">Contribution</h3>
<p align="center">🗓 GitHub contribution count & streak fetcher with zero dependencies</p>
<p align="center">
    <a href="https://travis-ci.org/jamieweavis/contribution"><img src="https://img.shields.io/travis/jamieweavis/contribution.svg" alt="Build Status"></a>
    <a href="https://codecov.io/gh/jamieweavis/contribution/"><img src="https://img.shields.io/codecov/c/github/jamieweavis/contribution.svg" alt="Code Coverage"></a>
    <a href="https://npmjs.com/package/contribution"><img src="https://img.shields.io/npm/dt/contribution.svg" alt="npm Downloads"></a>
    <a href="https://npmjs.com/package/contribution"><img src="https://img.shields.io/npm/v/contribution.svg" alt="npm Version"></a>
    <a href="https://github.com/jamieweavis/contribution/blob/master/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a>
    <a href="https://github.com/airbnb/javascript"><img src="https://img.shields.io/badge/codestyle-airbnb-fd5c63.svg" alt="airbnb Code Style"></a>
</p>

## Installation

Contribution can be installed from command line with a JavaScript package manager such as [yarn](https://github.com/yarnpkg/yarn) or [npm](https://github.com/npm/npm).

```sh
# Via yarn
$ yarn add contribution

# Via npm
$ npm install contribution --save
```

## Usage

Contribution was designed to be flexible and compatible - it can be used with a traditional callback style approach, ES6 promises or ES7 async/await.

```javascript
const contribution = require('contribution');

// Via callback
contribution('jamieweavis', {
  callback: data => console.log(data); // { contributions: 1337, currentStreak: 42, bestStreak: 69 }
});

// Via promise
contribution('jamieweavis').then(data => {
  console.log(data); // { contributions: 1337, currentStreak: 42, bestStreak: 69 }
});

// Via async/await
async function foo() {
  const data = await contribution('jamieweavis')
  console.log(data); // { contributions: 1337, currentStreak: 42, bestStreak: 69 }
}
```

## API

### contribution(*username*, *[options]*)

Type: `Function`

Returns: `Promise`

Resolves a `data` object with `contributions`, `currentStreak` and `bestStreak` properties.

#### username

Type: `String`

The GitHub username to fetch contribution data for.

#### options

Type: `Object`

###### callback

Type: `Function`

Callback function to handle the returned data. Returns a `data` object with `contributions`, `currentStreak` and `bestStreak` properties.

###### enableCors

Type: `Boolean`

Default: `false`

Whether to proxy the request through the [cors-anywhere](https://github.com/Rob--W/cors-anywhere) API to enable fetching data x-origin. Set this option to true if you are using `contribution` through the browser.

## Related

* [streaker](https://github.com/jamieweavis/streaker) - 🐙 GitHub contribution streak tracking menubar app
* [streaker-cli](https://github.com/jamieweavis/streaker-cli) - 🐙 GitHub contribution streak tracking CLI tool

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

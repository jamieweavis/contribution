# Contribution

> GitHub contribution stat fetcher with zero dependencies

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/standard/standard) [![npm-downloads](https://img.shields.io/npm/dt/contribution.svg)](https://npmjs.com/package/contribution) [![npm-version](https://img.shields.io/npm/v/contribution.svg)](https://npmjs.com/package/contribution) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/jamiestraw/contribution/master/LICENSE.md) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

## Installation

Contribution can be installed from the command line via the npm registry with a package manager such as [yarn](https://github.com/yarnpkg/yarn) or [npm](https://github.com/npm/npm).

```sh
# Via yarn
$ yarn add contribution

# Via npm
$ npm install contribution --save
```

## Usage

Contribution was designed to be flexible and compatible for developers - it can be used with a traditional callback approach, ES6 promises or ES7 async/await.

### Via callback:
```javascript
const contribution = require('contribution')

contribution('jamiestraw', (data) => {
  console.log(data) // { contributions: 1337, streak: 42 }
})
```

### Via promise:
```javascript
const contribution = require('contribution')

contribution('jamiestraw').then((data) => {
  console.log(data) // { contributions: 1337, streak: 42 }
})
```

### Via async/await:
```javascript
const contribution = require('contribution')

async function foo () {
  const data = await contribution('jamiestraw')
  console.log(data) // { contributions: 1337, streak: 42 }
}
```

## Related

- [streaker](https://github.com/jamiestraw/streaker) - 🐙 GitHub contribution streak tracking menubar app
- [streaker-cli](https://github.com/jamiestraw/streaker-cli) - 🐙 GitHub contribution streak tracking CLI tool

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

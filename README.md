# Contribution

> GitHub contribution stat fetcher with zero dependencies

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard) [![npm-downloads](https://img.shields.io/npm/dt/contribution.svg)](https://npmjs.com/package/contribution) [![npm-version](https://img.shields.io/npm/v/contribution.svg)](https://npmjs.com/package/contribution) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/jamiestraw/contribution/master/LICENSE.md)

## Installation

```sh
# Via yarn
$ yarn add contribution

# Via npm
$ npm install contribution --save
```

## Usage

### Callback
```javascript
const contribution = require('contribution')

contribution('jamiestraw', data => {
  console.log(data) // { contributions: int, streak: int }
})
```

### Promise
```javascript
const contribution = require('contribution')

contribution('jamiestraw')
  .then(data => {
    console.log(data) // { contributions: int, streak: int }
  })
```

### Async/await
```javascript
const contribution = require('contribution')

async function foo () {
  const data = await contribution('jamiestraw')
  console.log(data) // { contributions: int, streak: int }
}
```

## API

### contribution(username|[callback])

#### username

Type: `String`

The GitHub username to fetch contribution stats for.

#### callback(data)

Type: `Function`

Optional*

Callback to handle the returned contribution `data`

###### returns

Type: `Object`

#### data.contributions

Number of contributions in the last year.

Type: `Number`

#### data.streak

Current contribution streak - the amount of consecutive days contributed

Type: `Number`

## Related

- [streaker](https://github.com/jamiestraw/streaker) - 🐙 GitHub contribution streak tracking menubar app
- [streaker-cli](https://github.com/jamiestraw/streaker-cli) - 🐙 GitHub contribution streak tracking CLI tool

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

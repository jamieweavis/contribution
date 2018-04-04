# contribution

> 🗓 GitHub contribution count & streak fetcher with zero dependencies

[![Travis](https://img.shields.io/travis/jamieweavis/contribution.svg)](https://travis-ci.org/jamieweavis/contribution) [![Codecov](https://img.shields.io/codecov/c/github/jamieweavis/contribution.svg)](https://codecov.io/gh/jamieweavis/contribution/) [![Downloads](https://img.shields.io/npm/dt/contribution.svg)](https://npmjs.com/package/contribution) [![Version](https://img.shields.io/npm/v/contribution.svg)](https://npmjs.com/package/contribution) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/jamieweavis/contribution/master/LICENSE.md) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

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

### Via callback:

```javascript
const contribution = require('contribution');

contribution('jamieweavis', data => {
  console.log(data); // { contributions: 1337, streak: 42 }
});
```

### Via promise:

```javascript
const contribution = require('contribution');

contribution('jamieweavis').then(data => {
  console.log(data); // { contributions: 1337, streak: 42 }
});
```

### Via async/await:

```javascript
const contribution = require('contribution');

async function foo() {
  const data = await contribution('jamieweavis');
  console.log(data); // { contributions: 1337, streak: 42 }
}
```

## Related

* [streaker](https://github.com/jamieweavis/streaker) - 🐙 GitHub contribution streak tracking menubar app
* [streaker-cli](https://github.com/jamieweavis/streaker-cli) - 🐙 GitHub contribution streak tracking CLI tool

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

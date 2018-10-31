module.exports = {
  'extends': ['airbnb-base', 'prettier'],
  'plugins': ['jest'],
  'root': true,
  'env': {
    'browser': true,
    'node': true,
    'es6': true,
    'jest/globals': true
  },
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 2017
  }
};

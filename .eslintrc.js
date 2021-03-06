module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': 'off',
    'no-use-before-define': 'off',
    'object-curly-newline': ['error', {
      'ImportDeclaration': 'never'
    }],
    'indent': ['error', 4],
    'max-len': 'off'
  },
};

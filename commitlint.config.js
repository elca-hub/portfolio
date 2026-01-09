module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'add',
      'remove',
      'update',
      'update',
      'style'
    ]],
    'body-max-line-length': [2, 'always', 50],
  }
}

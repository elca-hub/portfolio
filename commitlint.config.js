module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'add',
      'remove',
      'update',
      'update',
      'style',
      'chore',
    ]],
    'subject-max-length': [2, 'always', 50],
  }
}

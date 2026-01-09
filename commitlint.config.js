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
    'subject-max-length': [2, 'always', 50],
    'subject-empty': [2, 'always'],
    'type-empty': [2, 'always'],
  }
}

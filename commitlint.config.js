module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', [
      'add',
      'remove',
      'update',
      'update',
      'style'
    ]]
  }
}

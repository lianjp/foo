module.exports = {
  root: true,
  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@nuxtjs',
    'plugin:nuxt/recommended'
    // 'plugin:prettier/recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-v-html': '0',
    'space-before-function-paren': [2, 'never'],
    'arrow-parens': ["error", "as-needed"]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

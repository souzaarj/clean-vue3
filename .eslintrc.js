module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    '@vue/standard',
    '@vue/typescript/recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    project: "./tsconfig.json"
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "vue/html-self-closing": "off"
  }
}




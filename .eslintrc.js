module.exports = {
  root: true,
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
    // ecmaVersion: 7,
    // parser: 'babel-eslint',
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  // eslint内置eslint-config-eslint:recommended 安装eslint-config-airbnb
  extends: [
    'eslint:recommended',
    // 'airbnb',
  ],
  // 安装eslint-plugin-react和eslint-plugin-jsx-a11y
  plugins: [
    'react',
    'jsx-a11y',
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 2,
    'no-empty': 0,
    'react/jsx-uses-react': 1,
    'react/prefer-es6-class': 2,
    'react/jsx-uses-vars': 1,
  },
  settings: {
    'import/ignore': [
      'node_modules',
    ],
  },
}


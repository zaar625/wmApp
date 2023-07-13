module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': [
      {
        requirePragma: true,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: false,
        jsxBracketSameLine: true,
        parser: 'flow',
        semi: true
      },
    ],
    // 'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    // quotes: 0,
    // "react-native/no-inline-styles": ["error", { "ignorePattern": "something" }],
    // '@typescript-eslint/no-unused-vars': 'off',
  },
};

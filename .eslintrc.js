module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'off', //<<======= Pendding (Problem in remove : any) =======>>
    'no-console': 'error',
    // 'indent': ['error', 2], // <<======= Pendding =======>>
    'quotes': ['warn', 'single', { allowTemplateLiterals: true }],
    'no-unused-vars': 'off', // <<======= Pendding =======>>

    // 'comma-dangle': ['error', {    
    //   arrays: 'always',
    //   objects: 'always',
    //   imports: 'always',     <<======= Not needed because prettier provides =======>>
    //   exports: 'always',
    //   functions: 'never',
    // }],
    'no-trailing-spaces': 'warn',
    'no-multiple-empty-lines': 'warn',
    'eqeqeq': ['error', 'always'],
    'no-shadow': 'error',
    'object-curly-spacing': 'off',  // <<======= Not needed because prettier provides =======>>
    'no-undef': 'error',
    'no-unused-expressions': 'error',
    'no-var': 'error',
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'arrow-parens': ['error', 'always'],
    'no-else-return': 'warn',
    'no-param-reassign': 'off', // <<======= Not needed because we need to modify the function parameter =======>>
    'no-underscore-dangle': 'off', // <<======= Not needed because we used. =======>>
    'no-restricted-syntax': 'off', // <<======= Not needed. =======>>
    'no-use-before-define': ['error', { functions: true, variables: true }],
    'camelcase': 'warn',
    'prefer-const': 'warn',
    'no-restricted-globals': 'off',
    'no-await-in-loop': 'error',
    'no-extra-parens': 'error',
    'prefer-template': 'error',
    'no-extra-semi': 'error',
    'array-callback-return': "off", // <<======= Not needed. =======>>
    'no-constant-condition': 'error',
    'no-throw-literal': 'off', // <<======= Not needed. =======>>
    'newline-per-chained-call': 'off', // <<======= Not needed. =======>>
    'prefer-arrow-callback': 'warn',
    'radix ': 'off', // <<======= Not needed. =======>>
    'prefer-rest-params ': 'off', // <<======= Not needed. =======>>
    'func-names': 'off', // <<======= Not needed. =======>>
    'max-lines': ['error', { 'max': 300, 'skipBlankLines': true, 'skipComments': true }],
    'prefer-destructuring': 'off', // <<======= Not needed. =======>>
    'no-loop-func': 'off',  // <<======= Not needed. =======>>
    'comma-spacing': 'warn',
    'prefer-spread': 'off', // <<======= Not needed. =======>>
    'space-in-parens': 'warn',
    'no-fallthrough': 'off', // <<======= Not needed. =======>>
    'arrow-spacing': 'warn',
    'no-extra-bind': 'off', // <<======= Not needed. =======>>
    'no-return-await': 'off', // <<======= Not needed. =======>>
    'no-extra-label': 'off', // <<======= Not needed. =======>>
    'no-extra-boolean-cast': 'off', // <<======= Not needed. =======>>
    'no-useless-concat': 'off', // <<======= Not needed. =======>>
    'no-lonely-if': 'off', // <<======= Not needed. =======>>
    'no-new-wrappers': 'off', // <<======= Not needed. =======>>
    'no-bitwise': 'off', // <<======= Not needed. =======>>
    'no-plusplus': 'off', // <<======= Not needed. =======>>
    'no-continue': 'off',// <<======= Not needed. =======>>
    'no-unneeded-ternary': 'off', // <<======= Not needed. =======>>
    'no-self-assign': 'off', // <<======= Not needed. =======>>
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-nested-ternary': 'off', // <<======= Not needed. =======>>
    'prefer-promise-reject-errors': 'off', // <<======= Not needed. =======>>
    'no-empty-function': 'off', // <<======= Not needed. =======>>
    'space-unary-ops': 'warn',
    'no-redeclare': 'error',
    'no-useless-escape': 'off', // <<======= Not needed. =======>>
    'no-implicit-coercion': 'error',
    'no-new-func': 'warn',
    'no-unsafe-negation': 'warn',
    'no-useless-return': 'warn',
    'no-extra-args': 'off',
    'prefer-exponentiation-operator': 'warn',
    'no-eval': 'off', // <<======= Not needed. =======>>
    'require-await': 'error',
  },
};

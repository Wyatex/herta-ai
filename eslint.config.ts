import antfu from '@antfu/eslint-config'
import { importX } from 'eslint-plugin-import-x'

export default antfu({
  vue: true,
  ignores: ['**/*.md', '**/*.yaml', '**/*.yml', '**/*.toml'],
  rules: {
    'ts/ban-ts-comment': 'off',
    'import-x/order': [
      'error',
      {
        'groups': [
          ['type'],
          ['builtin', 'external'],
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
  },
  plugins: {
    'import-x': importX,
  },
  stylistic: {
    indent: 2,
    semi: false,
    quotes: 'single',
  },
})

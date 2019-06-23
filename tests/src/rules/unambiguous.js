import { RuleTester } from 'eslint'

const ruleTester = new RuleTester()
    , rule = require('rules/unambiguous')

ruleTester.run('unambiguous', rule, {
  valid: [
    'function x() {}',
    '"use strict"; function y() {}',

    {
      code: 'import y from "z"; function x() {}',
      parserOptions: { ecmaVersion: 2015, sourceType: 'module' },
    },
    {
      code: 'import * as y from "z"; function x() {}',
      parserOptions: { ecmaVersion: 2015, sourceType: 'module' },
    },
    {
      code: 'import { y } from "z"; function x() {}',
      parserOptions: { ecmaVersion: 2015, sourceType: 'module' },
    },
    {
      code: 'import z, { y } from "z"; function x() {}',
      parserOptions: { ecmaVersion: 2015, sourceType: 'module' },
    },
    {
      code: 'function x() {}; export {}',
      parserOptions: { ecmaVersion: 2015, sourceType: 'module' },
    },
    {
      code: 'function x() {}; export { x }',
      parserOptions: { ecmaVersion: 2015, sourceType: 'module' },
    },
    {
      code: 'function x() {}; export { y } from "z"',
      parserOptions: { ecmaVersion: 2015, sourceType: 'module' },
    },
    {
      code: 'function x() {}; export * as y from "z"',
      parser: 'babel-eslint',
      parserOptions: { ecmaVersion: 2015, sourceType: 'module' },
    },
    {
      code: 'export function x() {}',
      parserOptions: { ecmaVersion: 2015, sourceType: 'module' },
    },
  ],
  invalid: [
    {
      code: 'function x() {}',
      parserOptions: { ecmaVersion: 2015, sourceType: 'module' },
      errors: ['This module could be parsed as a valid script.'],
    },
  ],
})

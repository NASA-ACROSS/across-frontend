import globals from 'globals';
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import eslintPluginSvelte from 'eslint-plugin-svelte';

export default tsEslint.config(
    {
        // https://github.com/eslint/eslint/discussions/18304 lol
        ignores: ['static/**/*'],
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            ...tsEslint.configs.recommendedTypeChecked,
        ],
        languageOptions: {
            parserOptions: {
                projectService: true,
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    ...eslintPluginSvelte.configs['flat/prettier']
);

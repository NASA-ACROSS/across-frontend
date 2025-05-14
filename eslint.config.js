import globals from 'globals';
import js from '@eslint/js';
import tsEslint from 'typescript-eslint';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';

export default tsEslint.config(
    // top level ignores
    // https://github.com/eslint/eslint/discussions/18304 lol
    {
        ignores: ['static', '.svelte-kit', 'build'],
    },

    // Load predefined config
    js.configs.recommended,

    // TypeScript
    {
        files: ['**/*.ts'],
        ignores: ['playwright.config.ts'],
        extends: [...tsEslint.configs.recommendedTypeChecked],
        // ignores: ['playwright.config.ts'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
            parser: tsEslint.parser,
            parserOptions: {
                // for additional info on why this is here https://github.com/sveltejs/eslint-plugin-svelte/issues/422
                extraFileExtensions: ['.svelte'],
                project: true,
            },
        },
    },

    // svelte
    {
        files: ['**/*.svelte'],
        extends: [...eslintPluginSvelte.configs['flat/prettier']],
        // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
        languageOptions: {
            parser: svelteParser,
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                extraFileExtensions: ['.svelte'],
                project: true,
                parser: tsEslint.parser,
            },
        },
    }
);

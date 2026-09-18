import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

try {
    process.loadEnvFile('.env');
    console.log('BASE_PATH:', process.env.BASE_PATH);
} catch (err) {
    console.warn('Warning: No .env file found', err);
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        alias: {
            $config: 'src/config',
        },
        paths: {
            relative: false,
            base: process.env.PUBLIC_BASE_PATH || '',
        },

        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter(),

        // poll every minute checking for new version, fixes buggy navigation see: https://kit.svelte.dev/docs/configuration#version
        version: {
            pollInterval: 60000,
        },
    },
};

export default config;

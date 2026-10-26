import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        sveltekit({
            // Consult https://kit.svelte.dev/docs/integrations#preprocessors
            // for more information about preprocessors
            preprocess: vitePreprocess(),
            paths: { relative: false },
            // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
            // If your environment is not supported or you settled on a specific environment, switch out the adapter.
            // See https://kit.svelte.dev/docs/adapters for more information about adapters.
            adapter: adapter(),

            // poll every minute checking for new version, fixes buggy navigation see: https://kit.svelte.dev/docs/configuration#version
            version: { pollInterval: 60000 },
        }),
        tailwindcss(),
    ],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: '[name][hash].js',
            },
        },
    },
    test: { include: ['src/**/*.{test,spec}.{js,ts}'] },
});

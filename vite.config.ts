import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [sveltekit()],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: '[name][hash].js',
            },
        },
    },
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}'],
    },
    optimizeDeps: {
        include: ['svelte-native-drag-drop'],
    },
    ssr: {
        noExternal: ['svelte-native-drag-drop'],
    },
});

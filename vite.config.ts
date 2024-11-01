import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [sveltekit()],
    test: {
        // Jest like globals
        globals: true,
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{js,ts}'],
        // Extend jest-dom matchers
        setupFiles: ['./tests/setupTest.js'],
    },
    optimizeDeps: {
        include: ['svelte-native-drag-drop'],
    },
    ssr: {
        noExternal: ['svelte-native-drag-drop'],
    },
});

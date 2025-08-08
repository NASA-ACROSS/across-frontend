import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [sveltekit(), tailwindcss()],
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

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
    // Svelte 5 migration: `optimizeDeps.include` and `ssr.noExternal` entries for
    // 'svelte-native-drag-drop' were removed here. They only existed to work around
    // `svelte-tabular-table`, which had zero imports anywhere in src/ and has been
    // dropped from package.json. That package shipped uncompiled Svelte with no
    // `exports` map and no peerDependencies pinning a Svelte version -- exactly the
    // shape of dependency that breaks on a major upgrade. Removing it leaves the
    // project with no third-party Svelte *component* dependencies at all.
});

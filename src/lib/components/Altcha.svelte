<script lang="ts">
    import { onMount } from 'svelte';
    import { resolve } from '$app/paths';

    /**
     * When the proof-of-work runs:
     * - `onfocus`: starts when the user focuses a form field (good for forms with inputs).
     * - `onload`: starts immediately on mount (use for forms without inputs, e.g. a single button).
     */
    export let auto: 'off' | 'onfocus' | 'onload' | 'onsubmit' = 'onfocus';

    // Visual style. `invisible` renders no UI; verification runs passively.
    export let display: 'standard' | 'bar' | 'floating' | 'overlay' | 'invisible' = 'invisible';

    const challengeUrl = resolve('/api/altcha/challenge');

    onMount(async () => {
        // The widget relies on the browser SubtleCrypto API and custom elements,
        // so it must only be loaded in the browser (never during SSR).
        await import('altcha');
    });
</script>

<altcha-widget challenge={challengeUrl} {auto} {display}></altcha-widget>

<script lang="ts">
    import { onMount } from 'svelte';
    import { resolve } from '$app/paths';
    import type { Configuration } from 'altcha/types';

    interface Props {
        /** When the proof-of-work starts: `onfocus` for forms with inputs, `onload` for button-only forms. */
        auto?: Configuration['auto'];
        /** `invisible` renders no UI. */
        display?: Configuration['display'];
    }

    let { auto = 'onfocus', display = 'invisible' }: Props = $props();

    const challengeUrl = resolve('/api/altcha/challenge');

    // Browser-only: the widget needs SubtleCrypto and custom elements.
    onMount(async () => {
        await import('altcha');
    });
</script>

<altcha-widget challenge={challengeUrl} {auto} {display}></altcha-widget>

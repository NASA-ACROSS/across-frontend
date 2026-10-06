<script lang="ts">
    import { onMount } from 'svelte';
    import { resolve } from '$app/paths';
    import type { AltchaWidgetElement } from 'altcha';
    import type { Configuration } from 'altcha/types';
    import FormInputFeedback from '$lib/components/FormInputFeedback.svelte';

    interface Props {
        /** True while solved; false again once it expires. Bind it to disable submit, which also covers clicks before hydration. */
        isVerified?: boolean;
        /** `invisible` renders no UI. */
        display?: Configuration['display'];
    }

    let { isVerified = $bindable(false), display = 'invisible' }: Props = $props();
    let hasFailed = $state(false);
    let widget: AltchaWidgetElement | undefined = $state();

    const challengeUrl = resolve('/api/altcha/challenge');

    /** Solves a fresh challenge. Payloads are single-use, so call this after a submit that didn't reload the page. */
    export function refresh() {
        isVerified = false;
        void widget?.verify();
    }

    function onStateChange(event: CustomEvent<{ state: string }>) {
        const { state } = event.detail;
        const wasVerified = isVerified;
        isVerified = state === 'verified';
        hasFailed = state === 'error';
        // Re-solve after a reset (e.g. bfcache restore) or once a solved challenge expires. An 'expired' mid-solve
        // only means a fast client clock (the server checks expiry itself), and re-solving then would loop.
        if (widget?.isConnected && (state === 'unverified' || (state === 'expired' && wasVerified))) void widget.verify();
    }

    // Browser-only: the widget needs SubtleCrypto and custom elements.
    onMount(async () => {
        await import('altcha').catch(() => (hasFailed = true));
    });
</script>

<!-- `onload` so a bound submit unlocks without any interaction. -->
<altcha-widget bind:this={widget} challenge={challengeUrl} auto="onload" {display} onstatechange={onStateChange}></altcha-widget>
<div role="alert">
    {#if hasFailed}
        <FormInputFeedback type="error">Could not verify that you are human. Please reload the page and try again.</FormInputFeedback>
    {/if}
</div>

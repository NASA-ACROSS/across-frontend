<script lang="ts">
    import { resolve } from '$app/paths';
    import ArrowButton from './ArrowButton.svelte';

    export let apiDocsUrl: string;
</script>

<!-- Hero -->
<div class="hero min-h-[50vh] flex-grow" style="background-image: url(/assets/img/custom/bli_grc_sm.jpg);">
    <div class="hero-overlay"></div>
    <div class="hero-content text-neutral-content text-center">
        <div class="max-w-xl">
            <h1 class="mb-5 text-5xl font-bold">Welcome to ACROSS</h1>
            <p class="mb-5 max-w-lg mx-auto">
                The <strong class="text-white">Astrophysics Cross-Observatory Science Support (ACROSS)</strong> system focuses on the aggregation
                of NASA observatory state and status information to facilitate science situational awareness.
            </p>
            <div class="flex flex-col md:flex-row md:gap-4">
                <ArrowButton href={resolve('/ingestion-status')}>Data Ingestion Status</ArrowButton>
                <ArrowButton href={resolve('/observations')}>Browse Observations</ArrowButton>
                <ArrowButton href={apiDocsUrl}>Explore API</ArrowButton>
            </div>
        </div>
    </div>
</div>

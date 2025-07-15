<script lang="ts">
    import type { CardData } from '$lib/types/Card';

    import InfoBadge from '../badge/InfoBadge.svelte';

    export let data: CardData;
    export let img: { url: string; description: string } | undefined =
        undefined;
</script>

<div class="card m-3 border-0 shadow-sm card-hover">
    {#if img}
        <img src={img.url} class="card-img-top" alt={img.description} />
    {/if}

    <div class="card-header flex justify-content-between">
        <InfoBadge>{data.tag}</InfoBadge>
        <span class="fs-sm text-muted">{data.date}</span>
    </div>

    <div class="card-body">
        <h4 class="card-title">
            <a href={data.url} class="stretched-link">{data.title}</a>
        </h4>
        {#if data.subtitle}
            <p class="card-subtitle mb-2 text-muted">{data.subtitle}</p>
        {/if}
    </div>

    {#if $$slots.footer}
        <div class="card-footer">
            <slot name="footer" />
        </div>
    {/if}
</div>

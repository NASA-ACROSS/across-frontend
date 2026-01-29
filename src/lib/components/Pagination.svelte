<script lang="ts">
    import { CONFIG } from '../../config/config';

    export let currentPage: number = 1;
    export let totalPages: number = 1;
    export let searchParams: URLSearchParams = new URLSearchParams();

    function handlePageChange(newPage: number): string {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        return `?${params.toString()}`;
    }

    function createPagesArray(currentPage: number, totalPages: number, numButtons: number): number[] {
        let pagesBefore = Math.floor(numButtons / 2);
        let pagesAfter = Math.ceil(numButtons / 2);

        let start = currentPage - pagesBefore;
        if (start < 1) {
            start = 1;
        }
        let end = currentPage + pagesAfter;
        if (end > totalPages) {
            end = totalPages;
            pagesAfter = end - currentPage;
        }

        const length = Math.min(totalPages, pagesBefore + 1 + pagesAfter);

        return Array.from({ length: length }, (_, i) => start + i);
    }
</script>

<a data-sveltekit-noscroll data-sveltekit-preload-data="off" type="link" class="btn btn-sm" href={handlePageChange(1)}> &lt;&lt; </a>
<a
    data-sveltekit-noscroll
    data-sveltekit-preload-data="off"
    type="link"
    class="btn btn-sm {currentPage == 1 ? 'disabled-link' : ''}"
    href={handlePageChange(currentPage - 1)}
>
    &lt;
</a>

{#each createPagesArray(currentPage, totalPages, CONFIG.PAGINATION_BUTTONS) as pageNumber}
    {#if pageNumber === currentPage}
        <span class="btn btn-sm btn-active">
            {currentPage}
        </span>
    {:else}
        <a data-sveltekit-noscroll data-sveltekit-preload-data="off" type="button" class="btn btn-sm" href={handlePageChange(pageNumber)}>
            {pageNumber}
        </a>
    {/if}
{/each}

<a
    data-sveltekit-noscroll
    data-sveltekit-preload-data="off"
    type="button"
    class="btn btn-sm {totalPages > currentPage ? '' : 'disabled-link'}"
    href={handlePageChange(currentPage + 1)}
>
    &gt;
</a>

<a data-sveltekit-noscroll data-sveltekit-preload-data="off" type="button" class="btn btn-sm" href={handlePageChange(totalPages)}> &gt;&gt; </a>

<style>
    .disabled-link {
        pointer-events: none;
        cursor: not-allowed;
    }
</style>

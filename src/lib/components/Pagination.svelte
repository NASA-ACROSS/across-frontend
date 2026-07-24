<script lang="ts">
    import { beforeNavigate, afterNavigate } from '$app/navigation';
    import Spinner from './Spinner.svelte';

    export let currentPage: number = 1;
    export let totalPages: number = 1;
    export let numButtons: number = 4;
    export let searchParams: URLSearchParams;

    // Track if we're currently navigating
    let isLoading = false;

    beforeNavigate(() => {
        isLoading = true;
    });

    afterNavigate(() => {
        isLoading = false;
    });

    // Make all hrefs reactive to searchParams, currentPage, and totalPages changes
    const firstPageHref = buildHref(1, searchParams);
    const prevPageHref = buildHref(currentPage - 1, searchParams);
    const nextPageHref = buildHref(currentPage + 1, searchParams);
    const lastPageHref = buildHref(totalPages, searchParams);
    const pagesArray = createPagesArray(currentPage, totalPages, numButtons);
    const pageHrefs = pagesArray.map((pageNum) => ({
        pageNum,
        href: buildHref(pageNum, searchParams),
    }));

    function buildHref(newPage: number, params: URLSearchParams): string {
        const newParams = new URLSearchParams(params);
        newParams.set('page', newPage.toString());
        return `?${newParams.toString()}`;
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

<div class="flex items-center gap-2">
    {#if isLoading}
        <Spinner />
    {/if}

    <a
        data-sveltekit-noscroll
        data-sveltekit-preload-data="off"
        class="btn btn-sm {currentPage == 1 ? 'pointer-events-none cursor-not-allowed' : ''} {isLoading
            ? 'pointer-events-none cursor-wait'
            : ''}"
        href={firstPageHref}
        aria-disabled={currentPage == 1 || isLoading}
    >
        &lt;&lt;
    </a>
    <a
        data-sveltekit-noscroll
        data-sveltekit-preload-data="off"
        class="btn btn-sm {currentPage == 1 ? 'pointer-events-none cursor-not-allowed' : ''} {isLoading
            ? 'pointer-events-none cursor-wait'
            : ''}"
        href={prevPageHref}
        aria-disabled={currentPage == 1 || isLoading}
    >
        &lt;
    </a>

    {#each pageHrefs as { pageNum, href }}
        {#if pageNum == currentPage}
            <span class="btn btn-sm btn-active">
                {currentPage}
            </span>
        {:else}
            <a
                data-sveltekit-noscroll
                data-sveltekit-preload-data="off"
                class="btn btn-sm {isLoading ? 'pointer-events-none cursor-wait' : ''}"
                {href}
                aria-disabled={isLoading}
            >
                {pageNum}
            </a>
        {/if}
    {/each}

    <a
        data-sveltekit-noscroll
        data-sveltekit-preload-data="off"
        class="btn btn-sm {currentPage == totalPages ? 'pointer-events-none cursor-not-allowed' : ''} {isLoading
            ? 'pointer-events-none cursor-wait'
            : ''}"
        href={nextPageHref}
        aria-disabled={currentPage == totalPages || isLoading}
    >
        &gt;
    </a>

    <a
        data-sveltekit-noscroll
        data-sveltekit-preload-data="off"
        class="btn btn-sm {currentPage == totalPages ? 'pointer-events-none cursor-not-allowed' : ''} {isLoading
            ? 'pointer-events-none cursor-wait'
            : ''}"
        href={lastPageHref}
        aria-disabled={currentPage == totalPages || isLoading}
    >
        &gt;&gt;
    </a>
</div>

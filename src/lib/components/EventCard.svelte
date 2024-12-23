<script lang="ts">
    import type { Conference } from '$lib/types';

    export let conference: Conference;
</script>

<div class="col pb-3">
    <article class="card border-0 shadow-sm h-100">
        <div class="position-relative">
            <a
                href={conference.name}
                class="position-absolute top-0 start-0 w-100 h-100"
                aria-label="Name"
            ></a>
        </div>
        <div class="card-body pb-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
                <a
                    href={conference.location}
                    class="badge fs-sm text-nav bg-secondary text-decoration-none"
                    >{conference.location}</a
                >
                <span class="fs-sm text-muted">{conference.name}</span>
            </div>
            <h3 class="h5 mb-0">
                <a href={conference.name}>{conference.name}</a>
            </h3>
        </div>
    </article>
</div>

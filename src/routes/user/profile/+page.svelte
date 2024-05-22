<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<section class="py-5 bg-secondary">
    <div class="container py-md-3">
        <h1>Profile</h1>
        <p>{data.user}</p>
    </div>
</section>

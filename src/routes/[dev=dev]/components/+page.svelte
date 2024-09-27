<script lang="ts">
    import { base } from '$app/paths';

    export let data;
    let links = data.links;
</script>

<section class="py-5 bg-secondary">
    <div class="container pb-0">
        <div class="d-flex flex-row align-items-center border-bottom py-3 mb-4">
            <h1 class="pb-1 pe-2 my-0">
                <i class="bx bx-code-alt me-2"></i>Component Playground
            </h1>
        </div>
        {#each links as link}
            <h3>
                <p>
                    <a href="{base}/dev/components/{link.path}" class="link"
                        ><i class="bx bx-code me-2"></i>{link.name}</a
                    >
                </p>
            </h3>
        {/each}
    </div>
</section>

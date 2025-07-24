<script lang="ts">
    export let name: string = '';
    export let href: string | null = null;
    export let containerClasses = '';
    export let textClasses = '';
</script>

<div class="my-2 {containerClasses}">
    <a {href} class="text-lg h-auto {textClasses}">
        <span class="color-primary-content">
            {#if name}
                {name}
            {:else}
                <slot></slot>
            {/if}
        </span>
        <button class="btn btn-xs btn-circle bg-accent border-none">
            <svg
                viewBox="0 0 32 32"
                fill="var(--color-nasa-white)"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    d="M8 16.956h12.604l-3.844 4.106 1.252 1.338L24 16l-5.988-6.4-1.252 1.338 3.844 4.106H8v1.912z"
                    class=""
                ></path></svg
            >
        </button>
    </a>
</div>

<style>
</style>

<script lang="ts">
    export let title = '';
    export let icon: string | undefined = undefined;
    export let center: boolean = false;
</script>

<div class="pt-2 pb-8 lg:px-10 w-auto bg-base-100 flex flex-col flex-grow {center ? 'items-center' : ''}">
    <!--Page-->
    {#if icon || title}
        <h1 class="flex text-4xl">
            {#if icon}
                <div class="bx bx-{icon} opacity-70 mx-2" />
            {/if}
            {title}
        </h1>
    {/if}
    <slot />
</div>

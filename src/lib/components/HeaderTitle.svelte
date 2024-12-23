<script lang="ts">
    export let title = '';
    export let icon: string | undefined = undefined;
</script>

{#if icon}
    <div class="bx bx-{icon} opacity-70 mx-2" />
{/if}
<h1>{title}</h1>

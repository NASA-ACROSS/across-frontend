<script lang="ts">
    export let type: 'error' | 'success' = 'success';

    let styleClass = 'text-success';

    $: if (type === 'error') {
        styleClass = 'text-danger';
    }
</script>

<div class={styleClass}>
    <small>
        <slot />
    </small>
</div>

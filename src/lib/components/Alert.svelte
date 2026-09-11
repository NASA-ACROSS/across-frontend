<script lang="ts">
    export let type: string = 'info';
    export let soft: boolean = true;
    export let vertical: boolean = true;
</script>

<div role="alert" class={`alert alert-${type} ${soft ? 'alert-soft' : ''} ${vertical ? 'alert-vertical' : ''} grid w-full mx-auto`}>
    <slot></slot>
</div>

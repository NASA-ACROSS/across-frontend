<script lang="ts">
    export let type: string = 'info';
    export let soft: boolean = true;
</script>

<div role="alert" class={`alert alert-${type} ${soft ? 'alert-soft' : ''} w-full place-content-center mx-auto`}>
    <span class="">
        <slot></slot>
    </span>
</div>

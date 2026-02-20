<script lang="ts">
    export const type: string = 'info';
</script>

<div role="alert" class={`alert alert-${type} alert-soft w-full place-content-center mx-auto`}>
    <span class="">
        <slot></slot>
    </span>
</div>

<script lang="ts">
    export let title;
    export let imgSrc;
</script>

<div class="w-50 text-center pb-md-2 mb-3 mb-lg-4">
    <div class="d-inline-block bg-secondary rounded-circle p-3 mb-4">
        <img src={imgSrc} width="32" alt="Icon" />
    </div>
    <h3 class="h5 pb-1 mb-2">{title}</h3>
    <p class="fs-sm mx-sm-1">
        <slot></slot>
    </p>
</div>

<script lang="ts">
    import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';
    let visible = false;

    const confirmHook = (confirm: boolean) => {
        alert(`User Clicked ${confirm ? 'Confirm' : 'Cancel'}`);
    };
</script>

<ConfirmationModal bind:visible {confirmHook}></ConfirmationModal>

<section class="py-5 bg-secondary">
    <div class="container pb-0">
        <div class="d-flex flex-row align-items-center border-bottom py-3 mb-4">
            <h1 class="pb-1 pe-2 my-0">
                <i class="bx bx-code-alt me-2"></i>Component Playground
            </h1>
        </div>
        <h3 class="pb-3">
            <i class="bx bx-code-alt me-2"></i>Confirmation Modal
        </h3>
        <button class="btn btn-danger" on:click={() => (visible = !visible)}
            >DO THING!</button
        >
    </div>
</section>

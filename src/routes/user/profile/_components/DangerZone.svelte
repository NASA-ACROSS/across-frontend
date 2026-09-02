<script lang="ts">
    import Section from '$lib/components/Section.svelte';
    import Spinner from '$lib/components/Spinner.svelte';
    import FormSubmitFeedback from '$lib/components/FormSubmitFeedback.svelte';

    const COUNTDOWN_LENGTH = 3;

    let countdownRemaining = $state(0);
    let isDeleteModalOpen = $state(false);
    let isDeleteButtonEnabled = $state(false);

    let countdown = (countdownRemaining: number) => {
        countdownRemaining = countdownRemaining - 1;
        if (countdownRemaining) {
            setTimeout(() => {
                countdown(countdownRemaining);
            }, 1000);
        } else {
            isDeleteButtonEnabled = true;
        }
    };
</script>

<Section title="Danger Zone" icon="bomb">
    <form method="post" action="?/deleteUser">
        <FormSubmitFeedback action="deleteUser" />
        <!-- Delete User Modal -->
        {#if isDeleteModalOpen}
            <div class="fixed inset-0 bg-transparent flex items-center justify-center z-50">
                <div class="bg-base-100 p-6 w-full max-w-xl shadow-2xl border-3 border-accent">
                    <div class="text-lg font-bold mb-4 flex flex-row justify-between">
                        <h3 class="flex">Confirm User Delete</h3>
                        <button class="justify-end btn btn-sm btn-primary max-h-8" title="Close" onclick={() => (isDeleteModalOpen = false)}
                            >X</button
                        >
                    </div>
                    <p class="bold text-accent">I understand that I am about to delete my user account.</p>
                    <p class="bold text-accent">This action will expire my service accounts.</p>
                    <p class="bold text-accent">This action will remove me from all groups and remove my group roles.</p>
                    <p class="bold text-accent">I will not be able to register a new account with the same email.</p>
                    <p class="bold text-accent pb-6">I will have to contact support to re-activate my account.</p>

                    <div class="flex justify-between">
                        <div>
                            <button
                                data-sveltekit-preload-data="off"
                                data-sveltekit-preload-code="off"
                                class="btn btn-sm btn-accent w-xs max-w-md"
                                disabled={!isDeleteButtonEnabled}
                                type="submit"
                                title="Delete my User Account"
                            >
                                {#if !isDeleteButtonEnabled}
                                    <Spinner />
                                {:else}
                                    Delete my User Account
                                {/if}
                            </button>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-primary" type="button" title="Cancel" onclick={() => (isDeleteModalOpen = false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        {/if}

        <!-- Danger Zone Controls -->
        <div class="flex justify-between p-3 border-nasa-red border-3">
            <div class="text-xl text-center label text-primary cursor-default">
                <div>Delete My User Account</div>
            </div>
            <div class="">
                <!-- Open Delete User Modal -->
                <button
                    class={`btn btn-accent text-lg`}
                    type="button"
                    onclick={() => {
                        isDeleteModalOpen = true;
                        isDeleteButtonEnabled = false;
                        countdownRemaining = COUNTDOWN_LENGTH;
                        setTimeout(() => {
                            countdown(countdownRemaining);
                        }, 1000);
                    }}
                >
                    <i class="bx bx-log-out opacity-70 me-2"></i>
                    Delete User
                </button>
            </div>
        </div>
    </form>
</Section>

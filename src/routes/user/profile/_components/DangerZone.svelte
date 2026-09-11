<script lang="ts">
    import Section from '$lib/components/Section.svelte';
    import Spinner from '$lib/components/Spinner.svelte';
    import FormSubmitFeedback from '$lib/components/FormSubmitFeedback.svelte';

    const COUNTDOWN_LENGTH = 3;

    let countdownRemaining = 0;
    let isDeleteModalOpen = false;
    let isDeleteButtonEnabled = false;

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
                        <button
                            class="justify-end btn btn-sm btn-primary max-h-8"
                            title="Close"
                            on:click={() => (isDeleteModalOpen = false)}>X</button
                        >
                    </div>
                    <div class="pb-2 text-error">
                        <p class="font-bold text-error">
                            I understand that I am about to delete my user account. This action will result in the following:
                        </p>
                        <ol class="list-decimal pl-6">
                            <li class="text-error">Expire all of my service accounts.</li>
                            <li class="text-error">Remove me from all groups and remove my group roles.</li>
                            <li class="text-error">Prevent registration with the same email.</li>
                        </ol>

                        <p class="font-bold">
                            If I want to re-active this email, I will need to contact
                            <a class="link" href="mailto:gsfc-across-support@mail.nasa.gov">ACROSS Support</a>.
                        </p>
                    </div>

                    <div class="flex justify-between">
                        <div>
                            <button
                                data-sveltekit-preload-data="off"
                                data-sveltekit-preload-code="off"
                                class="btn btn-sm btn-error w-xs max-w-md"
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
                            <button
                                class="btn btn-sm btn-primary"
                                type="button"
                                title="Cancel"
                                on:click={() => (isDeleteModalOpen = false)}
                            >
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
                    on:click={() => {
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

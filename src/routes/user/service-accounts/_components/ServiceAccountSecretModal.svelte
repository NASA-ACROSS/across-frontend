<script lang="ts">
    import type { ServiceAccountSecret } from '$lib/types/User/ServiceAccountSecret';
    import { downloadJSON } from '$lib/utils/download/downloadJSON';

    export let isOpen = true;
    export let serviceAccountSecret: ServiceAccountSecret | undefined;

    function closeModal() {
        isOpen = false;
        serviceAccountSecret = undefined;
    }
</script>

{#if isOpen}
    <div class="fixed inset-0 bg-transparent flex items-center justify-center z-50">
        <div class="bg-base-100 p-6 w-full max-w-2xl shadow-2xl border-3 border-warning flex flex-col gap-3">
            <div class="text-lg font-bold mb-1 flex flex-row justify-between">
                <h3 class="flex">New Service Account Key Created</h3>
            </div>
            <div role="alert" class="alert alert-warning alert-soft font-bold w-full place-content-center mx-auto">
                Warning! Once you close this modal the secret_key will no longer be visible unless you rotate the key. Please store the
                client_id and secret_key in a secure location. These client credentials are used to authenticate your service account
                through the across-client
            </div>

            <code>
                <div class="text-left flex flex-col p-3 bg-carbon-10 overflow-x-scroll text-nowrap">
                    <div class="">name: {serviceAccountSecret?.name}</div>
                    <div class="">description: {serviceAccountSecret?.description}</div>
                    <div class="">expiration: {serviceAccountSecret?.expiration}</div>
                    <div class="">expiration days: {serviceAccountSecret?.expiration_duration}</div>
                    <div class="mt-4">client_id: {serviceAccountSecret?.id}</div>
                    <div class="">secret_key: {serviceAccountSecret?.secret_key}</div>
                </div>
            </code>

            <div class="flex justify-between">
                <div>
                    <button
                        data-sveltekit-preload-data="off"
                        data-sveltekit-preload-code="off"
                        class="btn btn-sm btn-info"
                        type="submit"
                        title="Download service account credentials"
                        on:click={() => {
                            downloadJSON(serviceAccountSecret, 'across_client_credentials.json');
                        }}
                    >
                        Download Credentials
                    </button>
                </div>
                <div>
                    <button class="btn btn-sm btn-primary" type="button" title="Close" on:click={closeModal}> Close </button>
                </div>
            </div>
        </div>
    </div>
{/if}

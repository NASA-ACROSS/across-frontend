<script lang="ts">
    import { resolve } from '$app/paths';
    import Collapse from '$lib/components/Collapse.svelte';
    import Fieldset from '$lib/components/Fieldset.svelte';
    import Section from '$lib/components/Section.svelte';
    import type { ServiceAccountDetail } from '$lib/types/User/ServiceAccountDetail';
    import type { User } from '$lib/types/User/User';
    import { DateTime } from 'luxon';
    import FormSubmitFeedback from '$lib/components/FormSubmitFeedback.svelte';

    interface Props {
        user: User;
        serviceAccounts: ServiceAccountDetail[];
    }

    let { user, serviceAccounts }: Props = $props();

    let newServiceAccount: Pick<ServiceAccountDetail, 'name' | 'description' | 'expiration_duration'> = $state({
        name: '',
        description: '',
        expiration_duration: 30,
    });

    let activeServiceAccounts = $derived(
        serviceAccounts.filter((serviceAccount) => {
            return serviceAccount.expiration > DateTime.utc().toISO();
        })
    );

    let expiredServiceAccounts = $derived(
        serviceAccounts.filter((serviceAccount) => {
            return serviceAccount.expiration <= DateTime.utc().toISO();
        })
    );

    let activeServiceAccountsTitle = $derived(
        'Active Service Accounts' + (activeServiceAccounts?.length ? ` (${activeServiceAccounts.length})` : '')
    );
    let expiredServiceAccountsTitle = $derived(
        'Expired Service Accounts' + (expiredServiceAccounts?.length ? ` (${expiredServiceAccounts.length})` : '')
    );
</script>

<Section title="My Service Accounts" icon="server">
    <Collapse border={true}>
        {#snippet title()}{activeServiceAccountsTitle}{/snippet}
        {#if activeServiceAccounts && activeServiceAccounts?.length}
            <div class="input-group flex flex-col p-3 gap-3 bg-base-200 max-h-180 overflow-y-scroll">
                {#each activeServiceAccounts as serviceAccount}
                    <form method="post" action="?/deleteServiceAccount">
                        <FormSubmitFeedback action="deleteServiceAccount" />
                        <fieldset class="bg-base-100 w-full flex flex-row">
                            <div class="fieldset w-full p-4">
                                <p class="text-2xl">{serviceAccount.name}</p>
                                <p class="text-lg text-carbon-50">{serviceAccount.description}</p>
                                {#if serviceAccount.group_roles.length}
                                    <p class="text-lg">Group Roles ({serviceAccount.group_roles.length})</p>
                                {/if}
                                <p class="text-lg text-nasa-blue-shade">
                                    Expires {DateTime.fromISO(serviceAccount.expiration).toRelative()} on
                                    {DateTime.fromISO(serviceAccount.expiration, { zone: 'UTC' })
                                        .toLocal()
                                        .toLocaleString(DateTime.DATETIME_FULL)}
                                </p>
                            </div>

                            <div class="flex justify-end items-end gap-4 w-full p-4">
                                <!-- Edit Service Account Roles button -->
                                <a
                                    class="btn btn-info text-lg"
                                    href={resolve('/user/service-accounts/[serviceAccountId]', { serviceAccountId: serviceAccount.id })}
                                >
                                    <i class="bx bx-edit me-2"></i> Edit
                                </a>
                                <!-- Delete Service Account button -->
                                <button
                                    class={`btn btn-accent text-lg`}
                                    type="submit"
                                    onkeydown={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    <i class="bx bx-x opacity-70 me-2"></i>
                                    Expire
                                </button>
                            </div>
                        </fieldset>
                        <input type="hidden" name="serviceAccountId" value={serviceAccount.id} />
                        <input type="hidden" name="userId" value={serviceAccount.id} />
                    </form>
                {/each}
            </div>
        {:else}
            <div class="input-group flex p-4 gap-3 bg-base-200">No active service accounts</div>
        {/if}
    </Collapse>

    <Collapse border={true} open={false}>
        {#snippet title()}{expiredServiceAccountsTitle}{/snippet}
        {#if expiredServiceAccounts && expiredServiceAccounts?.length}
            <div class="input-group flex flex-col p-3 gap-3 bg-base-200 max-h-180 overflow-y-scroll">
                {#each expiredServiceAccounts as serviceAccount}
                    <form method="post" action="?/restoreServiceAccount">
                        <FormSubmitFeedback action="restoreServiceAccount" />
                        <fieldset class="bg-base-100 w-full flex flex-row">
                            <div class="fieldset w-full p-4">
                                <p class="text-2xl">{serviceAccount.name}</p>
                                <p class="text-lg text-carbon-50">{serviceAccount.description}</p>
                                {#if serviceAccount.group_roles.length}
                                    <p class="text-lg">Group Roles ({serviceAccount.group_roles.length})</p>
                                {/if}
                                <p class="text-lg text-warning">
                                    Expired {DateTime.fromISO(serviceAccount.expiration, { zone: 'UTC' }).toRelative()} on
                                    {DateTime.fromISO(serviceAccount.expiration, { zone: 'UTC' })
                                        .toLocal()
                                        .toLocaleString(DateTime.DATETIME_FULL)}
                                </p>
                            </div>
                            <div class="flex justify-end items-end gap-4 w-full p-4">
                                <a
                                    class="btn btn-info text-lg"
                                    href={resolve('/user/service-accounts/[serviceAccountId]', { serviceAccountId: serviceAccount.id })}
                                >
                                    <i class="bx bx-edit me-2"></i> Edit
                                </a>
                                <!-- Restore Service Account button -->
                                <button
                                    class="btn btn-warning text-lg text-primary"
                                    type="submit"
                                    onkeydown={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    <i class="bx bx-rotate-ccw opacity-70 me-2"></i>
                                    Rotate Key / Reactivate
                                </button>
                            </div>
                        </fieldset>
                        <input type="hidden" name="userId" value={user.id} />
                        <input type="hidden" name="serviceAccountId" value={serviceAccount.id} />
                    </form>
                {/each}
            </div>
        {:else}
            <div class="input-group flex p-4 gap-3 bg-base-200">No expired service accounts</div>
        {/if}
    </Collapse>
</Section>

<Section title="Create Service Account" icon="server">
    <Fieldset>
        <form method="post" action="?/createServiceAccount">
            <FormSubmitFeedback action="createServiceAccount" />
            <label class="text-lg" for="name">Name</label>
            <div class="flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group w-full">
                    <input
                        id="name"
                        class="input ps-5 w-full"
                        required
                        bind:value={newServiceAccount.name}
                        autocomplete="off"
                        name="name"
                        title="Service Account Name"
                        type="text"
                        placeholder="Service Account Name"
                    />
                </div>
            </div>
            <label class="text-lg" for="description">Description</label>
            <div class="flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group w-full">
                    <input
                        class="input ps-5 w-full"
                        required
                        bind:value={newServiceAccount.description}
                        autocomplete="off"
                        name="description"
                        title="Description"
                        type="text"
                        placeholder="Purpose of use for service account"
                    />
                </div>
            </div>
            <label class="text-lg" for="expiration">Expiration in Days</label>
            <div class="flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group w-full">
                    <input
                        class="input ps-5 w-full"
                        required
                        bind:value={newServiceAccount.expiration_duration}
                        autocomplete="off"
                        name="expiration_duration"
                        title="Expiration in Days"
                        type="number"
                        min="1"
                        max="365"
                        step="1"
                        placeholder="30"
                    />
                    <p class="text-nasa-red-shade pt-2">
                        {#if newServiceAccount.expiration_duration > 30}
                            We recommend keeping expiration duration under 31 days and rotating service account keys regularly
                        {/if}
                    </p>
                </div>
            </div>
            <button type="submit" class="btn text-lg btn-info"> Create Service Account </button>
        </form>
    </Fieldset>
</Section>

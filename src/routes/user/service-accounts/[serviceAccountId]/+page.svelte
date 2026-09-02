<script lang="ts">
    import { resolve } from '$app/paths';
    import type { PageData } from './$types';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';
    import Alert from '$lib/components/Alert.svelte';
    import Fieldset from '$lib/components/Fieldset.svelte';
    import { DateTime } from 'luxon';
    import Collapse from '$lib/components/Collapse.svelte';
    import { getGroupsFromRoles } from '$lib/utils/user/getGroupsFromRoles.js';
    import Spinner from '$lib/components/Spinner.svelte';
    import FormSubmitFeedback from '$lib/components/FormSubmitFeedback.svelte';

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    const serviceAccount = $state(data.serviceAccount);
    const user = data.user;
    const userGroupRoles = data.userGroupRoles;

    // enable diffing for changes
    const originalServiceAccount = structuredClone(data.serviceAccount);

    // aggregate group roles into groups for display
    const serviceAccountGroupRoles = getGroupsFromRoles(serviceAccount.group_roles);

    // filter down groups and roles list to only assignable roles for current service account
    const assignableGroupRoles = userGroupRoles
        .map((group) => ({
            ...group,
            roles: group.roles.filter((groupRole) => !serviceAccount.group_roles.some((saRole) => saRole.id === groupRole.id)),
        }))
        .filter((group) => group.roles.length > 0);

    // loading spinner display
    let isUpdating = $state(false);

    let isServiceAccountExpired = $derived(serviceAccount.expiration < DateTime.utc().toISO());

    // lock update until changes or already expired
    let disableUpdate = $derived(
        originalServiceAccount.name == serviceAccount.name &&
            originalServiceAccount.description == serviceAccount.description &&
            originalServiceAccount.expiration_duration == serviceAccount.expiration_duration
    );
</script>

<Page title="Edit Service Account" icon="edit">
    {#snippet buttons()}
        <div>
            <a class="btn btn-info text-lg" href={resolve('/user/service-accounts')}
                >← <i class="bx bx-pen mx-2"></i>Manage Service Accounts</a
            >
        </div>
    {/snippet}
    <Section>
        <Fieldset>
            <form method="post" action="?/updateServiceAccount">
                <FormSubmitFeedback action="updateServiceAccount" />
                <label class="text-lg" for="name">Name</label>
                <div class="flex nneeds-validation">
                    <div class="input-group mb-3 w-full">
                        <input
                            id="name"
                            class="input ps-5 w-full"
                            required
                            bind:value={serviceAccount.name}
                            autocomplete="off"
                            name="name"
                            title="Service Account Name"
                            type="text"
                            placeholder="Service Account Name"
                        />
                    </div>
                </div>
                <label class="text-lg" for="description">Description</label>
                <div class="flex flex-sm-row flex-column needs-validation">
                    <div class="input-group mb-3 w-full">
                        <input
                            class="input ps-5 w-full"
                            required
                            bind:value={serviceAccount.description}
                            autocomplete="off"
                            name="description"
                            title="Description"
                            type="text"
                            placeholder="Purpose of use for service account"
                        />
                    </div>
                </div>
                <label class="text-lg" for="expiration">Expiration in Days</label>
                <div class="flex flex-sm-row flex-column needs-validation">
                    <div class="input-group mb-3 w-full">
                        <input
                            class="input ps-5 w-full"
                            required
                            bind:value={serviceAccount.expiration_duration}
                            autocomplete="off"
                            name="expiration_duration"
                            title="Expiration in Days"
                            type="number"
                            min="1"
                            max="365"
                            step="1"
                            placeholder="30"
                        />
                        <p class="text-nasa-red-shade min-h-5 pt-2">
                            {#if serviceAccount.expiration_duration > 30}
                                We recommend limiting expiration duration to under 31 days and rotating service account keys regularly
                            {/if}
                        </p>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row justify-between">
                    <div>
                        <p class="text-lg text-carbon-50">ID: {serviceAccount.id}</p>
                        <p class={`text-lg ${isServiceAccountExpired ? 'text-warning' : 'text-nasa-blue-shade'}`}>
                            Expire{`${isServiceAccountExpired ? 'd' : 's'}`}: {DateTime.fromISO(serviceAccount.expiration, { zone: 'UTC' })
                                .toLocal()
                                .toLocaleString(DateTime.DATETIME_FULL)}
                        </p>
                    </div>
                    <button
                        type="submit"
                        class="btn text-lg self-end {`${isServiceAccountExpired ? 'btn-warning' : 'btn-info'}`}"
                        disabled={!isServiceAccountExpired && disableUpdate}
                        onclick={() => (isUpdating = true)}
                    >
                        {#if !isUpdating}
                            Update {`${isServiceAccountExpired ? ' And Restore' : ''}`}
                        {:else}
                            <Spinner></Spinner>
                        {/if}</button
                    >
                </div>

                <div class="pt-6">
                    <Alert type="warning" soft={!isServiceAccountExpired && disableUpdate}
                        >Updating a service account will re-compute the expiration date based on expiration in days provided, it <b
                            >does not rotate the key</b
                        ></Alert
                    >
                </div>

                <input type="hidden" name="serviceAccountId" value={serviceAccount.id} />
                <input type="hidden" name="userId" value={user.id} />
            </form>
        </Fieldset>
    </Section>

    <Section title="Edit Service Account Roles" icon="edit">
        <Alert>Users can only assign group roles to service accounts that have been assigned to their user by a group admin.</Alert>
        <Section type="row">
            <Section title="Assigned Group Roles" icon="check-shield">
                {#if serviceAccountGroupRoles.length}
                    {#each serviceAccountGroupRoles as group}
                        <Collapse open={true} border={true}>
                            {#snippet title()}{`[${group.short_name}] ${group.name} (${group.roles.length})`}{/snippet}
                            {#each serviceAccount.group_roles as groupRole}
                                <form method="post" action="?/removeGroupRole">
                                    <FormSubmitFeedback action="removeGroupRole" />
                                    <div class="flex pt-2 pb-4">
                                        <div class="flex flex-col basis-5/6">
                                            <p class="text-lg tracking-wider">{groupRole.name}</p>

                                            <p class="font-bold tracking-wider">Permissions</p>
                                            <div class="max-h-24 overflow-y-scroll bg-base-200 p-2 me-4">
                                                {#each groupRole.permissions as permission}
                                                    <pre>{permission.name}</pre>
                                                {/each}
                                            </div>
                                        </div>
                                        <button class="w-30 btn btn-accent text-lg self-end" type="submit">Remove</button>
                                    </div>
                                    <input type="hidden" name="userId" value={user.id} />
                                    <input type="hidden" name="groupRoleId" value={groupRole.id} />
                                    <input type="hidden" name="serviceAccountId" value={serviceAccount.id} />
                                </form>
                            {/each}
                        </Collapse>
                    {/each}
                {:else}
                    <p>No group roles assigned to service account</p>
                {/if}
            </Section>

            <Section title="My Group Roles" icon="plus-shield">
                <div class="flex flex-col gap-5">
                    {#if assignableGroupRoles.length}
                        {#each assignableGroupRoles as group}
                            <Collapse open={true} border={true}>
                                {#snippet title()}{`[${group.short_name}] ${group.name} (${group.roles.length})`}{/snippet}
                                {#each group.roles as groupRole}
                                    <form method="post" action="?/assignGroupRole">
                                        <FormSubmitFeedback action="assignGroupRole" />
                                        <div class="flex pt-2 pb-4">
                                            <div class="flex flex-col basis-5/6">
                                                <p class="text-lg tracking-wider">{groupRole.name}</p>

                                                <p class="font-bold tracking-wider">Permissions</p>
                                                <div class="max-h-24 overflow-y-scroll bg-base-200 p-2 me-4">
                                                    {#each groupRole.permissions as permission}
                                                        <pre>{permission.name}</pre>
                                                    {/each}
                                                </div>
                                            </div>
                                            <button class="w-30 btn btn-info text-lg self-end" type="submit">Add</button>
                                        </div>

                                        <input type="hidden" name="userId" value={user.id} />
                                        <input type="hidden" name="groupRoleId" value={groupRole.id} />
                                        <input type="hidden" name="serviceAccountId" value={serviceAccount.id} />
                                    </form>
                                {/each}
                            </Collapse>
                        {/each}
                    {:else}
                        {#if serviceAccount.group_roles.length}
                            <p>No assignable roles remaining.</p>
                        {:else if !serviceAccount.group_roles.length}
                            <p>No group roles assigned to user.</p>
                        {/if}
                        <p>Use group management to assign roles.</p>
                    {/if}
                </div>
            </Section>
        </Section>
    </Section>
</Page>

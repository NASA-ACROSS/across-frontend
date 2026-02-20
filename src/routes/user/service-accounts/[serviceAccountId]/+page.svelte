<script lang="ts">
    import { resolve } from '$app/paths';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';
    import Alert from '$lib/components/Alert.svelte';
    import Fieldset from '$lib/components/Fieldset.svelte';
    import { DateTime } from 'luxon';
    import Collapse from '$lib/components/Collapse.svelte';
    import { reduceGroupRolesByGroup } from '$lib/utils/user/reduceGroupRolesByGroup.js';
    import Spinner from '$lib/components/Spinner.svelte';

    export let data;

    let serviceAccount = data.serviceAccount;
    let user = data.user;
    let userGroupRoles = data.userGroupRoles;

    // enable diffing for changes
    const originalServiceAccount = structuredClone(data.serviceAccount);

    // aggregate group roles into groups for display
    let serviceAccountGroupRoles = reduceGroupRolesByGroup(serviceAccount.group_roles);

    // filter down groups and roles list to only unassigned roles for current service account
    const assignableGroupRoles = userGroupRoles
        .map((group) => ({
            ...group,
            roles: group.roles.filter((groupRole) => !serviceAccount.group_roles.some((saRole) => saRole.id === groupRole.id)),
        }))
        .filter((group) => group.roles.length > 0);

    // loading spinner display
    let isUpdating = false;

    // lock update until changes
    $: disableUpdate =
        originalServiceAccount.name == serviceAccount.name &&
        originalServiceAccount.description == serviceAccount.description &&
        originalServiceAccount.expiration_duration == serviceAccount.expiration_duration;

    const isExpired = (date: string) => {
        return date < DateTime.utc().toISO();
    };
</script>

<Page title="Edit Service Account" icon="edit">
    <div slot="buttons">
        <a class="btn btn-info text-lg" href={resolve('/user/service-accounts')}>← <i class="bx bx-pen mx-2"></i>Manage Service Accounts</a>
    </div>
    <Section>
        <Alert>Updating a service account will re-compute the expiration date based on expiration in days provided, it does not rotate the key</Alert>
        <Fieldset>
            <form method="post" action="?/updateServiceAccount">
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
                            placeholder="Description of Purpose"
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
                            placeholder="Expiration in Days"
                        />
                        <p class="text-nasa-red-shade min-h-5">
                            {#if serviceAccount.expiration_duration > 30}
                                We recommend limiting expiration duration to under 31 days and rotating service account keys regularly
                            {/if}
                        </p>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row justify-between">
                    <div>
                        <p class="text-lg text-carbon-50">ID: {serviceAccount.id}</p>
                        <p class={`text-lg ${isExpired(serviceAccount.expiration) ? 'text-warning' : 'text-nasa-blue-shade'}`}>
                            Expire{`${isExpired(serviceAccount.expiration) ? 'd' : 's'}`}: {serviceAccount.expiration}
                        </p>
                    </div>
                    <button
                        type="submit"
                        class="btn text-lg self-end {`${isExpired(serviceAccount.expiration) ? 'btn-warning' : 'btn-info'}`}"
                        disabled={disableUpdate}
                        on:click={() => {
                            isUpdating = true;
                        }}
                    >
                        {#if !isUpdating}
                            Update {`${isExpired(serviceAccount.expiration) ? ' And Restore' : ''}`}
                        {:else}
                            <Spinner></Spinner>
                        {/if}</button
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
                        <Collapse open={true} border={true} title={`[${group.short_name}] ${group.name} (${group.roles.length})`}>
                            {#each serviceAccount.group_roles as groupRole}
                                <form method="post" action="?/removeGroupRole">
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
                            <Collapse open={true} border={true} title={`[${group.short_name}] ${group.name} (${group.roles.length})`}>
                                {#each group.roles as groupRole}
                                    <form method="post" action="?/assignGroupRole">
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

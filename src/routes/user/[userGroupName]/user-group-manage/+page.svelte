<script lang="ts">
    import { resolve } from '$app/paths';
    import type { GroupInvite } from '$lib/types/User/GroupInvite';
    import InvitedUsers from './_components/InvitedUsers.svelte';
    import InviteUser from './_components/InviteUser.svelte';
    import type { ActionData, PageData } from './$types.js';
    import GroupUsers from './_components/GroupUsers.svelte';
    import AssignRole from './_components/AssignRole.svelte';
    import UserDetailCard from './_components/UserDetailCard.svelte';
    import type { GroupUser } from '$lib/types/User/GroupUser';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';

    interface Props {
        form: ActionData;
        data: PageData;
    }

    let { form, data }: Props = $props();

    // Svelte 5 migration: `sv migrate` refused this file ("Can't migrate code with
    // afterUpdate"), so it was still Svelte 4. These three were plain `let` aliases of
    // `data` refreshed by an afterUpdate() hook; they are pure derivations, so $derived
    // replaces both the aliases and the hook.
    let group = $derived(data.groupData);
    let invitedUsers = $derived(data.invitedUsers as GroupInvite[]);
    let users = $derived(group.users);

    // Track the selection by id rather than by object reference. `load` re-running
    // hands us fresh user objects, so a stored reference would go stale -- which is
    // what the previous `afterUpdate` reconciliation existed to patch up.
    let selectedUserId: string | undefined = $state();
    let selectedUser = $derived(users.find((user: GroupUser) => user.id == selectedUserId));
</script>

<Page title={'Group Management - ' + group.name} icon="group">
    <!--
        Svelte 5 migration: was `<div slot="buttons">`. Page declares `buttons` as a
        Snippet, and a legacy named slot handed to a runes component renders nothing at
        all -- with no error. Page also gates its header row on `{#if icon || title ||
        buttons}`, so the whole row vanished.
    -->
    {#snippet buttons()}
        <div>
            <a class="btn btn-info text-lg" href={resolve('/user/profile')}>← <i class="bx bx-user mx-2"></i>Profile</a>
        </div>
    {/snippet}

    <InviteUser {group} {form}></InviteUser>
    <InvitedUsers {invitedUsers}></InvitedUsers>

    <Section title="User Role Management" icon="shield-quarter">
        <div class="flex gap-5">
            <GroupUsers {users} bind:selectedUserId></GroupUsers>

            <UserDetailCard {selectedUser} {group}></UserDetailCard>

            <AssignRole user={selectedUser} {group}></AssignRole>
        </div>
    </Section>
</Page>

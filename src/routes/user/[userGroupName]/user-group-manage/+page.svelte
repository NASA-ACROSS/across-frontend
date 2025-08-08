<script lang="ts">
    import { resolve } from '$app/paths';
    import type { GroupInvite } from '$lib/types/User/GroupInvite';
    import InvitedUsers from './_components/InvitedUsers.svelte';
    import InviteUser from './_components/InviteUser.svelte';
    import { afterUpdate } from 'svelte';
    import type { ActionData } from './$types.js';
    import GroupUsers from './_components/GroupUsers.svelte';
    import AssignRole from './_components/AssignRole.svelte';
    import UserDetailCard from './_components/UserDetailCard.svelte';
    import type { GroupUser } from '$lib/types/User/GroupUser';
    import type { User } from '$lib/types/User/User';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';

    export let form: ActionData;
    export let data;

    let selectedUser: GroupUser | undefined;

    let group = data.groupData;
    let invitedUsers: GroupInvite[] = data.invitedUsers as GroupInvite[];
    let users = group.users;

    afterUpdate(() => {
        invitedUsers = data.invitedUsers as GroupInvite[];
        users = data.groupData.users;

        if (selectedUser) {
            selectedUser =
                users.find((user: User) => user.id == selectedUser?.id) ||
                undefined;
        }
    });
</script>

<Page>
    <Section title={'Manage - ' + group.name} icon="edit">
        <div slot="buttons">
            <a class="btn btn-info text-lg" href={resolve('/user/profile')}
                >← <i class="bx bx-user mx-2"></i>Profile</a
            >
        </div>
    </Section>

    <InviteUser {group} {form}></InviteUser>
    <InvitedUsers {invitedUsers}></InvitedUsers>

    <Section title="User Role Management" icon="shield-quarter">
        <div class="flex gap-5">
            <GroupUsers {users} bind:selectedUser></GroupUsers>

            <UserDetailCard {selectedUser} {group}></UserDetailCard>

            <AssignRole user={selectedUser} {group}></AssignRole>
        </div>
    </Section>
</Page>

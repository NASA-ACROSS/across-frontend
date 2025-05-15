<script lang="ts">
    import { base } from '$app/paths';
    import type { UserGroupInvite } from '$lib/types/User/UserGroupInvite';
    import InvitedUsers from './_components/InvitedUsers.svelte';
    import InviteUser from './_components/InviteUser.svelte';
    import { afterUpdate } from 'svelte';
    import type { ActionData } from './$types.js';
    import GroupUsers from './_components/GroupUsers.svelte';
    import AssignRole from './_components/AssignRole.svelte';
    import UserDetailCard from './_components/UserDetailCard.svelte';
    import type { GroupUser } from '$lib/types/User/GroupUser';
    import type { User } from '$lib/types/User/User';

    export let form: ActionData;
    export let data;

    let selectedUser: GroupUser | undefined;

    let group = data.groupData;
    let invitedUsers: UserGroupInvite[] =
        data.invitedUsers as UserGroupInvite[];
    let users = group.users;

    afterUpdate(() => {
        invitedUsers = data.invitedUsers as UserGroupInvite[];
        users = data.groupData.users;

        if (selectedUser) {
            selectedUser =
                users.find((user: User) => user.id == selectedUser?.id) ||
                undefined;
        }
    });
</script>

<section class="py-5 bg-secondary">
    <div class="container pb-0">
        <a class="btn btn-primary btn-lg" href="{base}/user/profile"
            >← <i class="bx bx-user opacity-70 mx-2"></i>Profile</a
        >
        <div class="d-flex flex-row align-items-center border-bottom py-3">
            <h1 class="pb-1 pe-2 my-0">
                <i class="bx bx-edit me-2"></i>Manage -
            </h1>
            <h3 class="pb-0 my-0">{group.name}</h3>
        </div>
    </div>

    <InviteUser {group} {form}></InviteUser>
    <InvitedUsers {invitedUsers}></InvitedUsers>

    <div class="container pb-0">
        <h2 class="border-bottom pb-4">
            <i class="bx bx-shield-quarter opacity-70"></i>
            User Role Management
        </h2>
        <div class="row align-items-start">
            <GroupUsers {users} bind:selectedUser></GroupUsers>

            <UserDetailCard {selectedUser} {group}></UserDetailCard>

            <AssignRole user={selectedUser} {group}></AssignRole>
        </div>
    </div>
</section>

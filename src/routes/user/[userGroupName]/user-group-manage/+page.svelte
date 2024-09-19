<script lang="ts">
    import { base } from '$app/paths';
    import type { UserGroupInviteRecord } from '$lib/types/User/UserGroupInvite';
    import InvitedUsers from './_components/InvitedUsers.svelte';
    import InviteUser from './_components/InviteUser.svelte';
    import { afterUpdate } from 'svelte';
    import type { ActionData } from './$types.js';
    import GroupUsers from './_components/GroupUsers.svelte';
    import AssignRole from './_components/AssignRole.svelte';
    import UserDetailCard from './_components/UserDetailCard.svelte';
    import type { UserGroupAdminUser } from '$lib/types/User/UserGroupAdminUser';

    export let form: ActionData;
    export let data;

    let selectedUser: UserGroupAdminUser | undefined;

    let userGroup = data.userGroup;
    let invitedUsers: UserGroupInviteRecord[] = data.invitedUsers[
        'entries'
    ] as unknown as UserGroupInviteRecord[];
    let users = data.userGroupAdminData.users;
    let roles = data.userGroupAdminData.roles;
    let assignableRoles = data.assignableRoles;
    let currentUserEmail = data.currentUserEmail;

    afterUpdate(() => {
        invitedUsers = data.invitedUsers[
            'entries'
        ] as unknown as UserGroupInviteRecord[];
        users = data.userGroupAdminData.users;
        roles = data.userGroupAdminData.roles;
        assignableRoles = data.assignableRoles;

        if (selectedUser) {
            selectedUser =
                users.find((user) => user.id == selectedUser?.id) || undefined;
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
            <h3 class="pb-0 my-0">{userGroup.name}</h3>
        </div>
    </div>

    <InviteUser {userGroup} {form}></InviteUser>
    <InvitedUsers {invitedUsers}></InvitedUsers>

    <div class="container pb-0">
        <h2 class="border-bottom pb-4">
            <i class="bx bx-shield-quarter opacity-70"></i>
            User Role Management
        </h2>
        <div class="row align-items-start">
            <GroupUsers {users} bind:selectedUser></GroupUsers>

            <UserDetailCard {selectedUser} {assignableRoles}></UserDetailCard>

            <AssignRole user={selectedUser} roles={assignableRoles}
            ></AssignRole>
        </div>
    </div>
</section>

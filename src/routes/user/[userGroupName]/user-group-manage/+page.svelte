<script lang="ts">
    import { base } from '$app/paths';
    import InvitedUsers from '$lib/components/InvitedUsers.svelte';
    import InviteUser from '$lib/components/InviteUser.svelte';
    import { afterUpdate } from 'svelte';

    /** @type {import('./$types').ActionData} */
    export let form;
    export let data;

    let userGroup = data.userGroup;
    let invitedUsers = data.invitedUsers;

    afterUpdate(() => {
        invitedUsers = data.invitedUsers;
    });
</script>

<section class="py-5 bg-secondary">
    <div class="container pb-0">
        <a class="btn btn-primary btn-lg" href="{base}/user/profile"
            >← <i class="bx bx-user opacity-70 mx-2"></i>Profile</a
        >
        <div class="d-flex flex-row align-items-center border-bottom py-3">
            <h1 class="pb-1 my-0">
                <i class="bx bx-edit me-2"></i>Manage -&nbsp;&nbsp;
            </h1>
            <h3 class="pb-0 my-0">{userGroup.name}</h3>
        </div>
    </div>

    <InviteUser {userGroup} {form}></InviteUser>
    <InvitedUsers invitedUsers={invitedUsers['entries']}></InvitedUsers>
</section>

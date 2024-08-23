<script lang="ts">
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
    <InviteUser {userGroup} {form}></InviteUser>
    <InvitedUsers invitedUsers={invitedUsers['entries']}></InvitedUsers>
</section>

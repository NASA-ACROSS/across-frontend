<script lang="ts">
    import { base } from '$app/paths';
    import type {
        UserGroupInvite,
        UserGroupInviteEntry,
    } from '$lib/types/UserGroupInvite';

    export let invitedUsers: UserGroupInviteEntry[];
</script>

<div class="container py-md-3">
    <h2>Recently Invited Users</h2>
    <div>
        {#if !invitedUsers || invitedUsers.length == 0}
            <p>No pending invites</p>
        {/if}
        {#each invitedUsers as userInvite}
            <form
                id="{userInvite.id}-invite"
                method="post"
                action="?/deleteInvite"
            >
                <div class="input-group-lg d-flex flex-row">
                    <span class="input-group-text">
                        {userInvite.receiver_email}
                    </span>

                    <button class="btn btn-lg btn-danger mx-3" type="submit"
                        >Delete Invitation</button
                    >
                    <input
                        id="userGroupId-{userInvite.user_group_id}"
                        hidden={true}
                        name="userGroupId"
                        bind:value={userInvite.user_group_id}
                    />
                    <input
                        id="userInviteId-{userInvite.id}"
                        hidden={true}
                        name="userInviteId"
                        bind:value={userInvite.id}
                    />
                </div>
            </form>
        {/each}
    </div>
</div>

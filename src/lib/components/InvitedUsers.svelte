<script lang="ts">
    import { base } from '$app/paths';
    import type {
        UserGroupInvite,
        UserGroupInviteEntry,
    } from '$lib/types/UserGroupInvite';

    export let invitedUsers: UserGroupInviteEntry[];
</script>

<div class="container py-md-1">
    <h2>
        <i class="bx bx-time opacity-70 me-2"></i>Recently Invited Users
    </h2>
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
                <div class="input-group-lg d-flex flex-row pb-3">
                    <button class="btn btn-lg btn-danger me-3" type="submit"
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
                    <span class="input-group-text">
                        {userInvite.receiver_email}
                    </span>
                </div>
            </form>
        {/each}
    </div>
</div>

<script lang="ts">
    import { base } from '$app/paths';
    import type {
        UserGroupInvite,
        UserGroupInviteEntry,
    } from '$lib/types/UserGroupInvite';

    export let invitedUsers: UserGroupInviteEntry[];
</script>

<div class="py-2">
    <div class="container py-md-3">
        <h2>Recent Invites</h2>
        <div
            class="password-toggle d-flex flex-sm-row flex-row mb-3 needs-validation"
        >
            <div
                class="input-group me-sm-3 mb-sm-0 mb-3 d-flex flex-column justify-content-start"
            >
                <div>
                    {#if !invitedUsers || invitedUsers.length == 0}
                        <p>No pending invites</p>
                    {/if}
                    {#each invitedUsers as userInvite}
                        <ul class="list-group d-flex flex-sm-row flex-row">
                            <li class="list-group-item">
                                {userInvite.receiver_email}
                            </li>
                            <form method="post" action="?/deleteInvite">
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
                                <button
                                    class="btn btn-lg btn-danger"
                                    type="submit">Delete Invitation</button
                                >
                            </form>
                        </ul>
                    {/each}
                </div>
            </div>
            <div
                class="input-group me-sm-3 mb-sm-0 mb-3 d-flex flex-column justify-content-start"
            ></div>
        </div>
    </div>
</div>

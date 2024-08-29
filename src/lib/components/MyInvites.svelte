<script lang="ts">
    import { base } from '$app/paths';
    import type { UserInvite } from '$lib/types/User';

    export let invitations: UserInvite[];
</script>

{#if invitations && invitations?.length}
    <section class="py-2 bg-secondary">
        <div class="container py-md-3">
            <h3>
                <i class="bx bx-envelope opacity-70 me-2"></i>My Group
                Invitations
            </h3>

            {#each invitations as invitation}
                <div
                    id="invite-{invitation.id}"
                    class="input-group-lg d-flex flex-row pb-3"
                >
                    <form method="post" action="?/acceptInvite">
                        <input
                            id="userGroupId-{invitation.group_id}"
                            hidden={true}
                            name="userGroupId"
                            bind:value={invitation.group_id}
                        />
                        <input
                            id="userInviteId-{invitation.id}"
                            hidden={true}
                            name="userInviteId"
                            bind:value={invitation.id}
                        />
                        <button
                            class="btn btn-lg btn-outline-success me-3"
                            type="submit"
                            ><i class="bx bx-check-square fs-lg me-2"
                            ></i>Accept</button
                        >
                    </form>
                    <form method="post" action="?/rejectInvite">
                        <input
                            id="userGroupId-{invitation.group_id}"
                            hidden={true}
                            name="userGroupId"
                            bind:value={invitation.group_id}
                        />
                        <input
                            id="userInviteId-{invitation.id}"
                            hidden={true}
                            name="userInviteId"
                            bind:value={invitation.id}
                        />
                        <button
                            class="btn btn-lg btn-outline-danger me-3"
                            type="submit"
                        >
                            <i class="bx bx-no-entry fs-lg me-2"></i>
                            Reject</button
                        >
                    </form>
                    <div class="input-group-text">
                        {invitation.name}
                    </div>
                </div>
            {/each}
        </div>
    </section>
{/if}

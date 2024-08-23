<script lang="ts">
    import { base } from '$app/paths';
    import type { UserInvite } from '$lib/types/User';

    export let invitations: UserInvite[];
</script>

{#if invitations && invitations.length}
    <section class="py-2 bg-secondary">
        <div class="container py-md-3">
            <h3>My Group Invitations</h3>
            <div
                class="password-toggle d-flex flex-sm-row flex-row mb-3 needs-validation"
            >
                <div
                    class="input-group me-sm-3 mb-sm-0 mb-3 d-flex flex-column justify-content-start"
                >
                    <div>
                        {#each invitations as invitation}
                            <ul class="list-group d-flex flex-sm-row flex-row">
                                <li class="list-group-item">
                                    {invitation.name}
                                </li>
                                <form method="post" action="?/acceptInvite">
                                    <input
                                        id="userGroupId-{invitation.user_group_id}"
                                        hidden={true}
                                        name="userGroupId"
                                        bind:value={invitation.user_group_id}
                                    />
                                    <input
                                        id="userInviteId-{invitation.id}"
                                        hidden={true}
                                        name="userInviteId"
                                        bind:value={invitation.id}
                                    />
                                    <button
                                        class="btn btn-lg btn-outline-success"
                                        type="submit">Accept</button
                                    >
                                </form>
                                <form method="post" action="?/denyInvite">
                                    <input
                                        id="userGroupId-{invitation.user_group_id}"
                                        hidden={true}
                                        name="userGroupId"
                                        bind:value={invitation.user_group_id}
                                    />
                                    <input
                                        id="userInviteId-{invitation.id}"
                                        hidden={true}
                                        name="userInviteId"
                                        bind:value={invitation.id}
                                    />
                                    <button
                                        class="btn btn-lg btn-outline-danger"
                                        type="submit">Deny</button
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
    </section>
{/if}

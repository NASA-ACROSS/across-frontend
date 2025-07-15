<script lang="ts">
    import Container from '$lib/components/Container.svelte';
    import Section from '$lib/components/Section.svelte';
    import type { UserInvite } from '$lib/types/User/UserInvite';

    export let invitations: UserInvite[];
</script>

{#if invitations && invitations?.length}
    <Section>
        <Container
            title="My Group
                Invitations"
            icon="envelope"
        >
            {#each invitations as invitation}
                <div
                    id="invite-{invitation.id}"
                    class="input-group-lg flex flex-row pb-3"
                >
                    <form method="post" action="?/acceptInvite">
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
                    <div class="input-group-text me-3">
                        <div>
                            {invitation.group.name}
                        </div>
                    </div>
                    <div class="d-flex flex-column me-3">
                        <div>
                            from {invitation.sender.first_name}
                            {invitation.sender.last_name}
                        </div>
                        <div>
                            <a href="mailto:{invitation.sender.email}"
                                >{invitation.sender.email}</a
                            >
                        </div>
                    </div>
                </div>
            {/each}
        </Container>
    </Section>
{/if}

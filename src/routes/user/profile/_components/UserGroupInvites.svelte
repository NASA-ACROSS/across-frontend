<script lang="ts">
    import Container from '$lib/components/Container.svelte';
    import Page from '$lib/components/Page.svelte';
    import type { UserInvite } from '$lib/types/User/UserInvite';

    export let invitations: UserInvite[];
</script>

{#if invitations && invitations?.length}
    <Page>
        <Container
            title="My Group
                Invitations"
            icon="envelope"
        >
            {#each invitations as invitation}
                <div
                    id="invite-{invitation.id}"
                    class="input-group-lg flex flex-col-reverse gap-3 lg:flex-row bg-base-200 p-3 mb-3"
                >
                    <div class="flex">
                        <form
                            class="flex-grow me-3"
                            method="post"
                            action="?/acceptInvite"
                        >
                            <input
                                id="userInviteId-{invitation.id}"
                                hidden={true}
                                name="userInviteId"
                                bind:value={invitation.id}
                            />
                            <button
                                class="btn btn-info text-xl me-3 w-full"
                                type="submit"
                                ><i class="bx bx-check-square fs-lg"
                                ></i>Accept</button
                            >
                        </form>
                        <form
                            class="flex-grow"
                            method="post"
                            action="?/rejectInvite"
                        >
                            <input
                                id="userInviteId-{invitation.id}"
                                hidden={true}
                                name="userInviteId"
                                bind:value={invitation.id}
                            />
                            <button
                                class="btn btn-accent text-xl me-3 w-full"
                                type="submit"
                            >
                                <i class="bx bx-no-entry fs-lg me-2"></i>
                                Reject</button
                            >
                        </form>
                    </div>

                    <div class="flex">
                        <div
                            class="text-xl text-center label text-primary me-2 btn btn-outline btn-active"
                        >
                            <div>
                                {invitation.group.name}
                            </div>
                        </div>
                        <div class="flex flex-row me-3 text-xl label">
                            <div class="text-primary">
                                from {invitation.sender.first_name}
                                {invitation.sender.last_name}
                            </div>
                            <div>
                                <a
                                    class="email text-info underline"
                                    href="mailto:{invitation.sender.email}"
                                    >{invitation.sender.email}</a
                                >
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </Container>
    </Page>
{/if}

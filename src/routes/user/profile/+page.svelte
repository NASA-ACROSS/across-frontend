<script lang="ts">
    import { base } from '$app/paths';
    import _ from 'lodash';
    /** @type {import('./$types').ActionData} */
    export let form;

    import type { PageData } from './$types';
    import { browser } from '$app/environment';
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    export let data: PageData;
    let roles = data.roles;

    const originalUserData = structuredClone(data.user);
    let userData = data.user;
    $: isUserDataUnchanged = _.isEqual(originalUserData, userData);

    // safari browser should force a reload on cached navigation using back button
    if (browser) {
        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };
    }
</script>

<section class="pt-5 pb-2 bg-secondary">
    <div class="container py-md-3">
        <div class="d-flex justify-content-between align-items-end">
            <h1>Profile</h1>
            <form action="{base}/user/logout">
                <button class="btn btn-lg btn-danger">Logout</button>
            </form>
        </div>
        <h3>User Information</h3>
        <form method="post" action="?/updateUserInformation">
            <label for="firstname">Name</label>
            <div class="d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        required
                        bind:value={userData.firstname}
                        autocomplete="off"
                        name="firstname"
                        type="text"
                        placeholder="First"
                    />
                </div>
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        required
                        bind:value={userData.lastname}
                        autocomplete="off"
                        name="lastname"
                        type="text"
                        placeholder="Last"
                    />
                </div>
            </div>
            <label for="username">Username</label>
            <div class="d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        required
                        bind:value={userData.username}
                        autocomplete="off"
                        name="username"
                        type="text"
                        placeholder="Username"
                    />
                </div>
            </div>
            <label for="email">Email</label>
            <div class="d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        required
                        bind:value={userData.email}
                        autocomplete="off"
                        name="email"
                        type="email"
                        placeholder="Please enter your email"
                    />
                </div>
            </div>
            <button
                class="btn btn-lg btn-primary"
                disabled={isUserDataUnchanged}>Update</button
            >
            {#if form?.successUpdateUserInformation}
                <p
                    class="form-text fs-sm text-sm-start text-center text-success"
                >
                    Successfully updated user information!
                </p>
            {/if}
            {#if form?.failUpdateUserInformation}
                <p
                    class="form-text fs-sm text-sm-start text-center text-danger"
                >
                    Something went wrong, please try again. If this error
                    persists, contact support.
                </p>
            {/if}
        </form>
    </div>
</section>

<section class="py-2 bg-secondary">
    <div class="container py-md-3">
        <h3>API Key</h3>
        <div
            class="password-toggle d-flex flex-sm-row flex-column mb-3 needs-validation"
        >
            <div class="input-group me-sm-3 mb-sm-0 mb-3">
                <input
                    class="form-control form-control-lg rounded-3 ps-5 default-cursor"
                    type="password"
                    disabled={true}
                    value={userData.api_token}
                />
                <label
                    class="password-toggle-btn"
                    aria-label="Show/hide password"
                >
                    <input class="password-toggle-check" type="checkbox" />
                    <span class="password-toggle-indicator"></span>
                </label>
            </div>
        </div>
    </div>
</section>

<section class="py-2 pb-5 bg-secondary">
    <div class="container py-md-3">
        <h3>Roles</h3>
        <div
            class="password-toggle d-flex flex-sm-row flex-row mb-3 needs-validation"
        >
            <div class="input-group me-sm-3 mb-sm-0 mb-3 d-flex flex-column justify-content-start">
                <h4 class="ms-1">Active Roles</h4>
                <div>
                    <ul class="list-group">
                        {#each roles.approved_roles as role}
                            <li class="list-group-item my-1">{role}</li>
                        {/each}
                    </ul>
                </div>
            </div>

            <div class="input-group me-sm-3 mb-sm-0 mb-3 d-flex flex-column justify-content-start">
                <h4 class="ms-1">Pending Roles</h4>
                <div>
                    <ul class="list-group">
                        {#each roles.requested_roles as role}
                            <form method="post" id={role.name+"form"} action="?/cancelRequestedRole">
                                <li class="card my-1">
                                    <div class="card-body">
                                        <h5 class="card-title">{role.name}</h5>
                                        <p class="card-text fs-sm">reason: {role.request_reason}</p>
                                        <p class="card-text fs-sm">status: {role.status}</p>
                                        <p class="card-text fs-sm">status reason: {role.status_reason}</p>
                                        <input class="d-none" readonly name="role" value={JSON.stringify(role)}>
                                        <button type="submit" formaction="?/cancelRequestedRole" class="btn btn-sm btn-danger">Cancel Request</button>
                                    </div>
                                </li>
                            </form>
                        {/each}
                    </ul>
                </div>
            </div>

            <div class="input-group me-sm-3 mb-sm-0 mb-3 d-flex flex-column justify-content-start">
                <h4 class="ms-1">Request Roles</h4>
                <ul class="list-group">
                    {#each roles.requestable_roles as role}
                    <form method="post" id={role+"form"} action="?/requestRole">
                        <div class="input-group my-1">
                            <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">Request</button>
                            <div class="dropdown-menu dropdown">
                                <label class="px-3" for="reason">Reason</label>
                                <div class="px-3">
                                    <input class="form-control" type="text" name="reason" placeholder="Please specify" required autocomplete="off">
                                    <button class="btn btn-primary" type="submit" formaction="?/requestRole">Submit</button>
                                </div>
                            </div>
                            <input readonly={true} class="form-control list-group-item rounded-end" name="role" type="text" placeholder="" value={role}>
                        </div>
                    </form>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</section>

<style>
    input[disabled].default-cursor {
        cursor: default;
        pointer-events: none;
    }
</style>

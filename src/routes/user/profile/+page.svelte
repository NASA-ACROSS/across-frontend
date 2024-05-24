<script lang="ts">
    import _ from 'lodash';
    import type { PageData } from './$types';
    export let data: PageData;
    const originalUserData = structuredClone(data.user);
    let userData = data.user;
    $: isUserDataUnchanged = _.isEqual(originalUserData, userData)
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<section class="pt-5 pb-2 bg-secondary">
    <div class="container py-md-3">
        <h1>Profile</h1>
        <h3>User Information</h3>
        <form method="post">
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
            <button class="btn btn-lg btn-primary" disabled={isUserDataUnchanged}
                >Update</button
            >
        </form>
    </div>
</section>

<section class="py-2 bg-secondary">
    <div class="container py-md-3">
        <h3>API Key</h3>
            <div class="password-toggle d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input class="form-control form-control-lg rounded-3 ps-5" type="password" value={userData.api_token}>
                    <label class="password-toggle-btn" aria-label="Show/hide password">
                        <input class="password-toggle-check" type="checkbox">
                        <span class="password-toggle-indicator"></span>
                    </label>
                </div>
        </div>
    </div>
</section>

<section class="py-2 bg-secondary">
    <div class="container py-md-3">
        <h3>Roles</h3>
            <div class="password-toggle d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <ul class="list-group">
                        {#each userData.roles as role}
                            <li class="list-group-item">{role}</li>
                        {/each}
                      </ul>
                </div>
        </div>
    </div>
</section>
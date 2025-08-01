<script lang="ts">
    import { base } from '$app/paths';
    import { page } from '$app/state';

    import { loggedIn } from '$lib/stores/login';
    import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';

    export let user: UserCredentialsCookie | undefined;

    let isLoggedIn = false;
    loggedIn.subscribe((value) => {
        isLoggedIn = value;
    });

    $: currentPath = page.url.pathname;

    $: userEmail = user?.email;

    $: userInitials = isLoggedIn
        ? user?.first_name?.[0]?.toUpperCase() +
          user?.last_name?.[0]?.toUpperCase()
        : '';
</script>

<div class="navbar bg-primary shadow-sm h-22">
    <div class="navbar-start">
        <div class="dropdown">
            <div
                tabindex="0"
                role="button"
                class="btn btn-ghost text-primary-content lg:hidden"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                    />
                </svg>
            </div>
            <ul
                tabindex="0"
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
                <li><a>Item 1</a></li>
                <li>
                    <a>Parent</a>
                    <ul class="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                </li>
                <li><a>Item 3</a></li>
            </ul>
        </div>
        <a
            href="{base}/"
            role="button"
            class="text-xl font-bold flex flex-row items-center pl-3"
        >
            <img
                src="{base}/assets/img/custom/logo-nasa.svg"
                width="60"
                alt="NASA logo"
            />
            <div
                class="align-center text-primary-content sm:hidden md:hidden lg:block hidden text-nowrap"
            >
                Astrophysics Cross-Observatory Science Support
            </div>
            <div class="align-center text-primary-content lg:hidden">
                ACROSS
            </div>
        </a>
    </div>
    <div class="navbar-end">
        <ul class="menu menu-horizontal px-1 hidden lg:flex lg:items-center">
            <li>
                <div
                    class="dropdown dropdown-hover dropdown-end m-0.75 hover:m-0 hover:border-3 hover:border-solid hover:border-info"
                >
                    <div
                        tabindex="0"
                        class="text-lg font-bold text-primary-content"
                        role="button"
                    >
                        Data
                        <div class="bx bx-chevron-down"></div>
                    </div>
                    <ul
                        class="dropdown-content menu bg-primary text-primary-content rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                        <li><a href="{base}/schedules">Schedules</a></li>
                        <li><a href="{base}/observations">Observations</a></li>
                        <li>
                            <a href="{base}/observatories">Observatories</a>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div
                    class="dropdown dropdown-hover dropdown-end m-0.75 hover:m-0 hover:border-3 hover:border-solid hover:border-info"
                >
                    <div
                        tabindex="0"
                        class="text-lg font-bold text-primary-content"
                        role="button"
                    >
                        Tools
                        <div class="bx bx-chevron-down"></div>
                    </div>
                    <ul
                        class="dropdown-content menu bg-primary text-primary-content rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                        <li>
                            <a href="{base}/visibility-calculator"
                                >Visibility Calculator</a
                            >
                        </li>
                        <li>
                            <a href="{base}/target-of-opportunity"
                                >Data Ingestion Status</a
                            >
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div
                    class="m-0.75 hover:m-0 hover:border-3 hover:border-solid hover:border-info"
                >
                    <a
                        class="text-lg font-bold text-primary-content"
                        data-sveltekit-reload
                        href="http://127.0.0.1:8000/docs"
                        >API
                    </a>
                </div>
            </li>
        </ul>
    </div>

    {#key currentPath}
        <!-- profile -->
        {#if userEmail}
            <a
                href="{base}/user/profile"
                class="text-sm font-bold text-primary-content m-2"
                >{userEmail}</a
            >
        {/if}
        <div class="flex-none">
            <div class="dropdown dropdown-hover dropdown-end pr-3">
                <a href="{base}/user/profile">
                    <div
                        tabindex="0"
                        role="button"
                        class="btn btn-ghost btn-circle avatar avatar-placeholder -my-3"
                    >
                        <div
                            class="bg-info text-neutral-content w-10 rounded-full"
                        >
                            <div class={isLoggedIn ? 'text-lg' : 'bx bx-user'}>
                                {userInitials}
                            </div>
                        </div>
                    </div>
                </a>
                <ul
                    role="link"
                    class="menu dropdown-content bg-primary rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                    {#if isLoggedIn}
                        <li>
                            <a
                                class="justify-between text-primary-content hover:bg-info"
                                href="{base}/user/profile"
                            >
                                Profile
                            </a>
                        </li>
                        <li>
                            <a
                                class="text-primary-content hover:bg-accent hover:text-primary"
                                data-sveltekit-preload-data="false"
                                href="{base}/user/logout">Logout</a
                            >
                        </li>
                    {:else}
                        <li>
                            <a
                                class="justify-between text-primary-content"
                                href="{base}/user/register"
                            >
                                Create Account
                            </a>
                        </li>
                        <li>
                            <a
                                class="text-primary-content"
                                href="{base}/user/login">Login</a
                            >
                        </li>
                    {/if}
                </ul>
            </div>
        </div>
    {/key}
</div>

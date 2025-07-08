<script lang="ts">
    import { base } from '$app/paths';

    import { loggedIn } from '$lib/stores/login';
    import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';

    export let user: UserCredentialsCookie | undefined;

    let isLoggedIn = false;
    loggedIn.subscribe((value) => {
        isLoggedIn = value;
    });
</script>

<div class="navbar bg-base-900 shadow-sm h-22">
    <div class="navbar-start">
        <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
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
        <a href="{base}/" class="btn btn-ghost text-xl">
            <img
                src="{base}/assets/img/custom/logo-nasa.svg"
                width="60"
                alt="NASA logo"
            />
            Astrophysics Cross-Observatory Science Support
        </a>
    </div>
    <div class="navbar-end">
        <ul class="menu menu-horizontal px-1 hidden lg:flex lg:items-center">
            <li>
                <div class="dropdown dropdown-hover dropdown-end">
                    <div tabindex="0" class="text-lg font-bold" role="button">
                        Data
                        <div class="bx bx-chevron-down"></div>
                    </div>
                    <ul
                        class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
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
                <div class="dropdown dropdown-hover dropdown-end">
                    <div tabindex="0" class="text-lg font-bold" role="button">
                        Tools
                        <div class="bx bx-chevron-down"></div>
                    </div>
                    <ul
                        class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
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
                <div>
                    <a
                        class="text-lg font-bold"
                        data-sveltekit-reload
                        href="http://127.0.0.1:8000/docs"
                        >API
                    </a>
                </div>
            </li>
        </ul>
    </div>

    <!-- profile -->
    {#if user}
        <a href="{base}/user/profile" class="text-lg font-bold m-2"
            >{user?.email}</a
        >
    {:else}
        <a href="{base}/user/login" class="btn btn-lg text-lg font-bold m-2"
            >Log In</a
        >
    {/if}
    <div class="flex-none">
        <div class="dropdown dropdown-end">
            <div
                tabindex="0"
                role="button"
                class="btn btn-ghost btn-circle avatar avatar-placeholder"
            >
                <div class="bg-neutral text-neutral-content w-10 rounded-full">
                    <a href="{base}/user/profile" class="bx bx-user"></a>
                </div>
            </div>
            <ul
                role="link"
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
                {#if isLoggedIn}
                    <li>
                        <a class="justify-between" href="{base}/user/profile">
                            Profile
                        </a>
                    </li>
                    <li>
                        <a
                            data-sveltekit-preload-data="false"
                            href="{base}/user/logout">Logout</a
                        >
                    </li>
                {:else}
                    <li>
                        <a class="justify-between" href="{base}/user/register">
                            Create Account
                        </a>
                    </li>
                    <li><a href="{base}/user/login">Login</a></li>
                {/if}
            </ul>
        </div>
    </div>
</div>

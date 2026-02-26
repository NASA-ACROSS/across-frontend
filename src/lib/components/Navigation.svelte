<script lang="ts">
    import { asset, resolve } from '$app/paths';
    import { page } from '$app/state';
    import { PUBLIC_CONFIG } from '$config/config.public';

    import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';

    export let user: UserCredentialsCookie | undefined;
    export let API_DOCS_URL: string;

    $: currentPath = page.url.pathname;

    $: userEmail = user?.email ? user.email : '';

    $: userInitials = user ? user?.first_name?.[0]?.toUpperCase() + user?.last_name?.[0]?.toUpperCase() : '';
</script>

<div class="navbar bg-primary shadow-sm h-22">
    <div class="navbar-start">
        <div class="dropdown">
            <button
                tabindex="0"
                class="btn btn-primary border-3 border-primary text-primary-content hover:bg-primary hover:text-primary-content focus:bg-primary focus:border-info lg:hidden"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
            </button>
            <ul class="menu menu-xl w-screen dropdown-content bg-primary text-primary-content z-1 -ms-2 pb-5">
                <li>
                    <p>Data</p>
                    <ul class="p-2">
                        <li class="hover:underline decoration-dashed">
                            <a data-sveltekit-preload-data="tap" href={resolve('/schedules')}>Schedules</a>
                        </li>
                        <li class="hover:underline decoration-dashed">
                            <a data-sveltekit-preload-data="tap" href={resolve('/observations')}>Observations</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <p>Tools</p>
                    <ul>
                        <li class="hover:underline decoration-dashed">
                            <a data-sveltekit-preload-data="tap" href={resolve('/ingestion-status')}>Data Ingestion Status</a>
                        </li>
                        <li>
                            <a data-sveltekit-preload-data="tap" href={resolve('/visibility-calculator')}>Visibility Calculator</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <a href={resolve('/')} role="button" class="text-xl font-bold flex flex-row items-center pl-3">
            <img src={asset('/assets/img/custom/logo-nasa.svg')} width="60" alt="NASA logo" />
            <div class="align-center text-primary-content sm:hidden md:hidden lg:block hidden text-nowrap">Astrophysics Cross-Observatory Science Support</div>
            <div class="align-center text-primary-content lg:hidden">ACROSS</div>
        </a>
    </div>
    <div class="navbar-end">
        {#if PUBLIC_CONFIG.BUILD_VERSION === 'local'}
            <div class="m-0.75 hover:m-0 hover:border-3 hover:border-solid hover:border-info">
                <a class="text-lg font-bold text-primary-content" data-sveltekit-reload href={resolve('/playground')}>Playground</a>
            </div>
        {/if}
        <ul class="menu menu-horizontal px-1 hidden lg:flex lg:items-center">
            <li>
                <div class="dropdown dropdown-hover dropdown-end m-0.75 hover:m-0 hover:border-3 hover:border-solid hover:border-info">
                    <div tabindex="0" class="text-lg font-bold text-primary-content" role="button">
                        Data
                        <div class="bx bx-chevron-down"></div>
                    </div>
                    <ul class="dropdown-content menu bg-primary text-primary-content rounded-box z-1 w-52 p-2 shadow-sm">
                        <li>
                            <a data-sveltekit-preload-data="tap" href={resolve('/schedules')}>Schedules</a>
                        </li>
                        <li>
                            <a data-sveltekit-preload-data="tap" href={resolve('/observations')}>Observations</a>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div class="dropdown dropdown-hover dropdown-end m-0.75 hover:m-0 hover:border-3 hover:border-solid hover:border-info">
                    <div tabindex="0" class="text-lg font-bold text-primary-content" role="button">
                        Tools
                        <div class="bx bx-chevron-down"></div>
                    </div>
                    <ul class="dropdown-content menu bg-primary text-primary-content rounded-box z-1 w-52 p-2 shadow-sm">
                        <li>
                            <a data-sveltekit-preload-data="tap" href={resolve('/ingestion-status')}>Data Ingestion Status</a>
                        </li>
                        <li>
                            <a data-sveltekit-preload-data="tap" href={resolve('/visibility-calculator')}>Visibility Calculator</a>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <div class="m-0.75 hover:m-0 hover:border-3 hover:border-solid hover:border-info">
                    <a class="text-lg font-bold text-primary-content" data-sveltekit-reload href={API_DOCS_URL} target="_blank" rel="noopener noreferrer"
                        >API
                    </a>
                </div>
            </li>
        </ul>
    </div>

    {#key currentPath}
        <!-- profile -->
        {#key userEmail}
            {#if userEmail}
                <a href={resolve('/user/profile')} class="text-sm font-bold text-primary-content m-2">{userEmail}</a>
            {/if}
        {/key}
        <div class="flex-none">
            <div class="dropdown dropdown-hover dropdown-end pr-3">
                <a href={resolve('/user/profile')}>
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar avatar-placeholder -my-3">
                        <div class="bg-info text-neutral-content w-10 rounded-full">
                            <div class={user ? 'text-lg' : 'bx bx-user'}>
                                {userInitials}
                            </div>
                        </div>
                    </div>
                </a>
                <ul class="menu dropdown-content bg-primary rounded-box z-1 mt-3 w-52 p-2 shadow">
                    {#if user}
                        <li>
                            <a class="justify-between text-primary-content hover:bg-info" href={resolve('/user/profile')}> Profile </a>
                        </li>
                        <li>
                            <a
                                class="text-primary-content hover:bg-accent hover:text-primary"
                                data-sveltekit-preload-data="false"
                                href={resolve('/user/logout')}>Logout</a
                            >
                        </li>
                    {:else}
                        <li>
                            <a class="justify-between text-primary-content" href={resolve('/user/register')}> Create Account </a>
                        </li>
                        <li>
                            <a class="text-primary-content" href={resolve('/user/login')}>Login</a>
                        </li>
                    {/if}
                </ul>
            </div>
        </div>
    {/key}
</div>

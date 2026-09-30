<script lang="ts">
    import { asset, resolve } from '$app/paths';
    import { page } from '$app/state';
    import type { Header, Link } from '$lib/types/navigation';
    import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
    import LocalOnlyRender from './dev/LocalOnlyRender.svelte';
    import MobileHeader from './MobileHeader.svelte';
    import NavHeader from './NavHeader.svelte';
    import NavLink from './NavLink.svelte';

    interface Props {
        navItems: Header[];
        user: UserCredentialsCookie | undefined;
    }

    let { navItems, user }: Props = $props();

    let currentPath = $derived(page.url.pathname);

    let userEmail = $derived(user?.email ? user.email : '');

    let userInitials = $derived(user ? user?.first_name?.[0]?.toUpperCase() + user?.last_name?.[0]?.toUpperCase() : '');
</script>

<div data-testid="navbar" class="navbar bg-primary shadow-sm h-22">
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
                {#each navItems as header}
                    {#if header.localOnly}
                        <LocalOnlyRender>
                            <MobileHeader {header} />
                        </LocalOnlyRender>
                    {:else}
                        <MobileHeader {header} />
                    {/if}
                {/each}
            </ul>
        </div>
        <a data-testid="nav-home-button" href={resolve('/')} role="button" class="text-xl font-bold flex flex-row items-center pl-3">
            <img src={asset('/assets/img/custom/logo-nasa.svg')} width="60" alt="NASA logo" />
            <div class="align-center text-primary-content hidden lg:block text-nowrap">Astrophysics Cross-Observatory Science Support</div>
            <div class="align-center text-primary-content lg:hidden">ACROSS</div>
        </a>
    </div>
    <div class="navbar-end">
        <ul class="menu menu-horizontal px-1 hidden lg:flex lg:items-center">
            {#each navItems as header}
                {#if header.localOnly}
                    <LocalOnlyRender>
                        <NavHeader {header} />
                    </LocalOnlyRender>
                {:else}
                    <NavHeader {header} />
                {/if}
            {/each}
        </ul>
    </div>

    <LocalOnlyRender>
        {#key currentPath}
            <!-- profile -->
            {#key userEmail}
                {#if userEmail}
                    <a href={resolve('/user/profile')} class="text-sm font-bold text-primary-content m-2">{userEmail}</a>
                {/if}
            {/key}
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

                <ul class="menu dropdown-content bg-primary rounded-box z-1 mt-3 w-52 p-2 shadow text-primary-content">
                    {#if user}
                        <NavLink link={{ id: 'profile', label: 'Profile', href: resolve('/user/profile') }} />
                        <div class="hover:bg-accent hover:text-primary">
                            <NavLink link={{ id: 'logout', label: 'Logout', href: resolve('/user/logout'), reload: true }} />
                        </div>
                    {:else}
                        <NavLink link={{ id: 'register', label: 'Create Account', href: resolve('/user/register') }} />
                        <NavLink link={{ id: 'login', label: 'Login', href: resolve('/user/login') }} />
                    {/if}
                </ul>
            </div>
        {/key}
    </LocalOnlyRender>
</div>

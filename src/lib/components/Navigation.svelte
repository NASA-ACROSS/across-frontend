<script lang="ts">
    import { base } from '$app/paths';

    import { loggedIn } from '$lib/stores/login';
    import { navHeight } from '$lib/stores/navHeight';
    import { onMount } from 'svelte';

    let isLoggedIn = false;
    loggedIn.subscribe((value) => {
        isLoggedIn = value;
    });
    let nav: HTMLElement;

    const setNavHeight = () => {
        if (nav) {
            navHeight.set(nav?.clientHeight);
        }
    };

    onMount(() => {
        window.addEventListener('resize', setNavHeight);
        setNavHeight();
    });
</script>

<nav
    bind:this={nav}
    class="header navbar navbar-expand-lg bg-light navbar-sticky border-bottom"
>
    <div class="container px-3">
        <a href="{base}/" class="navbar-brand pe-3">
            <img
                src="{base}/assets/img/custom/logo-nasa.svg"
                width="75"
                alt="NASA logo"
            />
            <!-- <span class='navbar-title' >Multimessenger<br> Astrophysics</span> -->
            <p class="navbar-title mt-0 mb-0" style="line-height:25px">
                ACROSS<br /> Astrophysics Cross-Observatory Science Support
            </p>
        </a>
        <button
            type="button"
            class="navbar-toggler ms-auto"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" id="navbarNav">
            <div
                class="offcanvas-header shadow-sm border-bottom"
                data-bs-dismiss="offcanvas"
            >
                <h6 class="offcanvas-title">Menu</h6>
                <button type="button" class="btn-close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav mb-lg-0 justify-content-end">
                    <li class="nav-item">
                        <a href="{base}/" class="nav-link">Home</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            href="{base}/data"
                            class="nav-link dropdown-toggle"
                            aria-current="page">Data</a
                        >
                        <ul class="dropdown-menu">
                            <li>
                                <a href="{base}/schedules" class="dropdown-item"
                                    >Schedules</a
                                >
                            </li>
                            <li>
                                <a
                                    href="{base}/observations"
                                    class="dropdown-item">Observations</a
                                >
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            href="{base}/tools"
                            class="nav-link dropdown-toggle"
                            aria-current="page">Tools</a
                        >
                        <ul class="dropdown-menu">
                            <li>
                                <a
                                    href="{base}/visibility-calculator"
                                    class="dropdown-item"
                                    >Visibility Calculator</a
                                >
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a
                            data-sveltekit-reload
                            href="{base}/about"
                            class="nav-link">About</a
                        >
                    </li>
                    <li class="nav-item">
                        <a
                            data-sveltekit-reload
                            href="http://127.0.0.1:8000/docs"
                            class="nav-link"
                            aria-current="page">API</a
                        >
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            data-sveltekit-reload
                            href="{base}/user/profile"
                            class="nav-link dropdown-toggle"
                            aria-current="page">My ACROSS</a
                        >
                        <ul class="dropdown-menu">
                            {#if isLoggedIn}
                                <li>
                                    <a
                                        href="{base}/user/profile"
                                        class="dropdown-item">My Profile</a
                                    >
                                </li>
                                <li>
                                    <a
                                        data-sveltekit-preload-data="false"
                                        href="{base}/user/logout"
                                        class="dropdown-item">Logout</a
                                    >
                                </li>
                            {:else}
                                <li>
                                    <a
                                        href="{base}/user/register"
                                        class="dropdown-item">Create Account</a
                                    >
                                </li>
                                <li>
                                    <a
                                        href="{base}/user/login"
                                        class="dropdown-item">Login</a
                                    >
                                </li>
                            {/if}
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>

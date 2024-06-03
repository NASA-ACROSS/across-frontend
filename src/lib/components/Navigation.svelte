<script>
    import { base } from '$app/paths';

    import { loggedIn } from '$lib/stores/login';

    let isLoggedIn = false;
    loggedIn.subscribe((value)=>{
        isLoggedIn = value
    });
</script>

<nav
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
                Multimessenger<br /> Astrophysics
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
                            href="{base}/missions"
                            class="nav-link dropdown-toggle"
                            aria-current="page">Missions</a
                        >
                        <ul class="dropdown-menu">
                            <li>
                                <a
                                    href="{base}/missions#overview"
                                    class="dropdown-item">Overview</a
                                >
                            </li>
                            <li>
                                <a
                                    href="{base}/missions#timeline"
                                    class="dropdown-item">Timeline</a
                                >
                            </li>
                            <li>
                                <a
                                    href="{base}/missions#active"
                                    class="dropdown-item">Active</a
                                >
                            </li>
                            <li>
                                <a
                                    href="{base}/missions#development"
                                    class="dropdown-item">Development</a
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
                                    href="{base}/tools#overview"
                                    class="dropdown-item">Overview</a
                                >
                            </li>
                            <li>
                                <a
                                    href="{base}/tools#reporting"
                                    class="dropdown-item"
                                    >Rapid Reporting Resources</a
                                >
                            </li>
                            <li>
                                <a
                                    href="{base}/tools#analysis"
                                    class="dropdown-item"
                                    >Data Analysis Toolkits</a
                                >
                            </li>
                            <li>
                                <a
                                    href="{base}/tools#planning"
                                    class="dropdown-item"
                                    >Observations Planning Tools</a
                                >
                            </li>
                            <li>
                                <a
                                    href="{base}/tools#archives"
                                    class="dropdown-item"
                                    >Data Archives & Repositories</a
                                >
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            href="{base}/proposals"
                            class="nav-link dropdown-toggle"
                            aria-current="page">Proposals</a
                        >
                        <ul class="dropdown-menu">
                            <li>
                                <a
                                    href="{base}/proposals#proposals"
                                    class="dropdown-item"
                                    >Proposal Opportunities</a
                                >
                            </li>
                            <li>
                                <a
                                    href="{base}/proposals#programs"
                                    class="dropdown-item"
                                    >Guest Observer & Investigator Programs</a
                                >
                            </li>
                            <li>
                                <a
                                    href="{base}/proposals#joint"
                                    class="dropdown-item"
                                    >Joint Observing Opportunities</a
                                >
                            </li>
                            <li>
                                <a
                                    href="{base}/proposals#resources"
                                    class="dropdown-item"
                                    >Complementary Opportunities</a
                                >
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            href="{base}/conferences"
                            class="nav-link dropdown-toggle"
                            aria-current="page">Conferences</a
                        >
                        <ul class="dropdown-menu">
                            <li>
                                <a
                                    href="{base}/conferences#upcoming"
                                    class="dropdown-item">Upcoming Meetings</a
                                >
                            </li>
                            <li>
                                <a
                                    href="{base}/conferences#past"
                                    class="dropdown-item">Past Meetings</a
                                >
                            </li>
                            <li>
                                <a
                                    href="{base}/conferences#resources"
                                    class="dropdown-item"
                                    >Presentation Resources</a
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
                    <li class="nav-item dropdown">
                        <a
                            data-sveltekit-reload
                            href="{base}/api/v1/docs"
                            class="nav-link dropdown-toggle"
                            aria-current="page">API</a
                        >
                        <ul class="dropdown-menu">
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="{base}/api/v1/docs"
                                    class="dropdown-item">Documentation</a
                                >
                            </li>
                            {#if isLoggedIn}
                                <li>
                                    <a
                                        href="{base}/user/profile"
                                        class="dropdown-item">Profile</a
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
                                        class="dropdown-item">Register</a
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

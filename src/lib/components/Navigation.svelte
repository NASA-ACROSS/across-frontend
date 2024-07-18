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
                                    class="dropdown-item">In Development</a
                                >
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">For Scientists</a>
                        <div class="dropdown-menu">
                            <div class="d-lg-flex pt-lg-3">
                                <div class="mega-dropdown-column" style="width: 250px;">
                                    <h6 class="px-3 mb-2"><a href="#">ACROSS Tools</a></h6>
                                    <ul class="list-unstyled mb-3">
                                    <li><a href="#" class="dropdown-item py-1">Mission Status Table</a></li>
                                    <li><a href="#" class="dropdown-item py-1">Mission Skymap</a></li>
                                    <li><a href="#" class="dropdown-item py-1">Mission ToO Pages</a></li>
                                    <li><a href="#" class="dropdown-item py-1">ACROSS API</a></li>
                                    </ul> 
                                    <h6 class="px-3 mb-2"><a href="#">ACROSS Resources</a></h6>
                                    <ul class="list-unstyled mb-3">
                                    <li><a href="services-v1.html" class="dropdown-item py-1">TDAMM Help Desk</a></li>
                                    <li><a href="#" class="dropdown-item py-1">Analysis Tutorials</a></li>
                                    </ul>                                                                       
                                    <h6 class="px-3 mb-2">Proposals</h6>
                                    <ul class="list-unstyled mb-3">
                                    <li><a href="blog-list-with-sidebar.html" class="dropdown-item py-1">ACROSS Community Grant Program</a></li>
                                    <li><a href="blog-list-with-sidebar.html" class="dropdown-item py-1">NASA Funding Opportunities</a></li>
                                    <li><a href="blog-grid-with-sidebar.html" class="dropdown-item py-1">Guest Investigator Programs</a></li>
                                    <li><a href="blog-list-no-sidebar.html" class="dropdown-item py-1">Joint Observing Capabilities</a></li>
                                    <li><a href="blog-grid-no-sidebar.html" class="dropdown-item py-1">Complementary Opportunities</a></li>
                                    </ul>
                                </div>
                                <div class="mega-dropdown-column" style="width: 250px;">
                                    <h6 class="px-3 mb-2">Community Resources</h6>
                                    <ul class="list-unstyled mb-3">
                                    <li><a href="tools" class="dropdown-item py-1">Rapid Alerts</a></li>
                                    <li><a href="tools" class="dropdown-item py-1">Observation Planning Tools</a></li>
                                    <li><a href="tools" class="dropdown-item py-1">Data Archives</a></li>
                                    <li><a href="tools" class="dropdown-item py-1">Data Analysis Toolkits</a></li>
                                    </ul>                                    
                                    <h6 class="px-3 mb-2">Conferences</h6>
                                    <ul class="list-unstyled mb-3">
                                    <li><a href="portfolio-grid.html" class="dropdown-item py-1">ACROSS Workshops</a></li>
                                    <li><a href="portfolio-grid.html" class="dropdown-item py-1">Upcoming Meetings</a></li>
                                    <li><a href="portfolio-list.html" class="dropdown-item py-1">Past Meetings</a></li>
                                    <li><a href="portfolio-slider.html" class="dropdown-item py-1">Presentation Resources</a></li>
                                    </ul>
                                    <h6 class="px-3 mb-2">Papers and Studies</h6>
                                    <ul class="list-unstyled mb-3">
                                    <li><a href="services-v1.html" class="dropdown-item py-1">White Papers</a></li>
                                    <li><a href="services-v2.html" class="dropdown-item py-1">SIG Reports</a></li>
                                    </ul>                                    
                                </div>
                                <!-- <div class="mega-dropdown-column">
                                    <h6 class="px-3 mb-2">Pricing</h6>
                                    <ul class="list-unstyled mb-3">
                                    <li><a href="pricing.html" class="dropdown-item py-1">Pricing Page</a></li>
                                    </ul>
                                    <h6 class="px-3 mb-2">Contacts</h6>
                                    <ul class="list-unstyled mb-3">
                                    <li><a href="contacts-v1.html" class="dropdown-item py-1">Contacts v.1</a></li>
                                    <li><a href="contacts-v2.html" class="dropdown-item py-1">Contacts v.2</a></li>
                                    <li><a href="contacts-v3.html" class="dropdown-item py-1">Contacts v.3</a></li>
                                    </ul>
                                    <h6 class="px-3 mb-2">Specialty</h6>
                                    <ul class="list-unstyled">
                                    <li><a href="404-v1.html" class="dropdown-item py-1">404 Error v.1</a></li>
                                    <li><a href="404-v2.html" class="dropdown-item py-1">404 Error v.2</a></li>
                                    </ul>
                                </div> -->
                            </div>
                        </div>
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

<script lang="ts">
    import { PUBLIC_CONFIG } from "../config/config.public";
    import { base } from "$app/paths";
    import { page } from "$app/stores";
    import BackToTopButton from "$lib/components/BackToTopButton.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { onMount } from "svelte";

    $: DOM_MOUNTED = false;

    onMount(() => {
        DOM_MOUNTED = true;
    });

    // theme variables for light/dark mode and root html ref
    let mode, root;
</script>

<svelte:head>
    <meta charset="utf-8" />
    <title>ACROSS</title>

    <!-- Viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Meta -->
    <meta name="msapplication-TileColor" content="#080032" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="build-version" content={PUBLIC_CONFIG.BUILD_VERSION} />

    <!-- Vendor Styles -->
    <link
        rel="stylesheet"
        media="screen"
        href="{base}/assets/vendor/boxicons/css/boxicons.min.css"
    />
    <link
        rel="stylesheet"
        media="screen"
        href="{base}/assets/vendor/swiper/swiper-bundle.min.css"
    />
    <link
        rel="stylesheet"
        media="screen"
        href="{base}/assets/vendor/lightgallery/css/lightgallery-bundle.min.css"
    />

    <!-- Main Theme Styles + Bootstrap -->
    <link
        rel="stylesheet"
        media="screen"
        href="{base}/assets/css/theme.min.css"
    />

    {#key $page.url}
        <script>
            // must run every navigation change asap to prevent flashing
            mode = window.localStorage.getItem("mode");
            root = document.getElementsByTagName("html")[0];
            if (mode == null) {
                mode = "dark";
            } else if (mode !== null && mode === "dark") {
                root.classList.add("dark-mode");
            } else {
                root.classList.remove("dark-mode");
            }
        </script>

        {#if DOM_MOUNTED}
            <!-- Vendor Scripts -->
            <script
                src="{base}/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"
            ></script>
            <script
                src="{base}/assets/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js"
            ></script>
            <script
                src="{base}/assets/vendor/jarallax/dist/jarallax.min.js "
            ></script>
            <script
                src="{base}/assets/vendor/parallax-js/dist/parallax.min.js"
            ></script>
            <script
                src="{base}/assets/vendor/lightgallery/lightgallery.min.js"
            ></script>
            <script
                src="{base}/assets/vendor/lightgallery/plugins/zoom/lg-zoom.min.js"
            ></script>
            <script
                src="{base}/assets/vendor/lightgallery/plugins/fullscreen/lg-fullscreen.min.js"
            ></script>
            <script
                src="{base}/assets/vendor/lightgallery/plugins/video/lg-video.min.js"
            ></script>
            <script
                src="{base}/assets/vendor/swiper/swiper-bundle.min.js"
            ></script>
            <script src="{base}/assets/vendor/rellax/rellax.min.js"></script>

            <!-- Main Theme Script -->
            <script src="{base}/assets/js/theme.min.js"></script>
        {/if}
    {/key}
</svelte:head>

<!-- Navbar -->
<!-- <header class="header navbar navbar-expand-lg position-absolute navbar-sticky"> -->
<header
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
        <div id="navbarNav" class="offcanvas offcanvas-end">
            <div class="offcanvas-header border-bottom">
                <h5 class="offcanvas-title">Menu</h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div class="offcanvas-body">
                <!-- <ul class="navbar-nav me-auto mb-2 mb-lg-0"> -->
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 justify-content-end">
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
                            data-sveltekit-reload
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
                            <li>
                                <a
                                    href="{base}/user/login"
                                    class="dropdown-item">Login</a
                                >
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</header>

<slot />

<Footer></Footer>
<BackToTopButton></BackToTopButton>

<script lang="ts">
    import { PUBLIC_CONFIG } from "../config/config.public";
</script>

<svelte:head>
    <meta charset="utf-8" />
    <title>ACROSS</title>

    <!-- Viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Favicon and Touch Icons -->
    <!-- <link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png">
    <link rel="manifest" href="assets/favicon/site.webmanifest">
    <link rel="mask-icon" href="assets/favicon/safari-pinned-tab.svg" color="#6366f1">
    <link rel="shortcut icon" href="assets/favicon/favicon.ico"> -->
    <meta name="msapplication-TileColor" content="#080032" />
    <!-- <meta name="msapplication-config" content="assets/favicon/browserconfig.xml"> -->
    <meta name="theme-color" content="#ffffff" />

    <meta name="build-version" content={PUBLIC_CONFIG.BUILD_VERSION} />

    <!-- Vendor Styles -->
    <link
        rel="stylesheet"
        media="screen"
        href="assets/vendor/boxicons/css/boxicons.min.css"
    />
    <link
        rel="stylesheet"
        media="screen"
        href="assets/vendor/swiper/swiper-bundle.min.css"
    />
    <link
        rel="stylesheet"
        media="screen"
        href="assets/vendor/lightgallery/css/lightgallery-bundle.min.css"
    />

    <!-- Main Theme Styles + Bootstrap -->
    <link rel="stylesheet" media="screen" href="assets/css/theme.min.css" />

    <!-- Page loading styles -->
    <style>
        .page-loading {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            -webkit-transition: all 0.4s 0.2s ease-in-out;
            transition: all 0.4s 0.2s ease-in-out;
            background-color: #fff;
            opacity: 0;
            visibility: hidden;
            z-index: 9999;
        }
        .dark-mode .page-loading {
            background-color: #0b0f19;
        }
        .page-loading.active {
            opacity: 1;
            visibility: visible;
        }
        .page-loading-inner {
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            text-align: center;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            -webkit-transition: opacity 0.2s ease-in-out;
            transition: opacity 0.2s ease-in-out;
            opacity: 0;
        }
        .page-loading.active > .page-loading-inner {
            opacity: 1;
        }
        .page-loading-inner > span {
            display: block;
            font-size: 1rem;
            font-weight: normal;
            color: #9397ad;
        }
        .dark-mode .page-loading-inner > span {
            color: #fff;
            opacity: 0.6;
        }
        .page-spinner {
            display: inline-block;
            width: 2.75rem;
            height: 2.75rem;
            margin-bottom: 0.75rem;
            vertical-align: text-bottom;
            border: 0.15em solid #b4b7c9;
            border-right-color: transparent;
            border-radius: 50%;
            -webkit-animation: spinner 0.75s linear infinite;
            animation: spinner 0.75s linear infinite;
        }
        .dark-mode .page-spinner {
            border-color: rgba(255, 255, 255, 0.4);
            border-right-color: transparent;
        }
        @-webkit-keyframes spinner {
            100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
            }
        }
        @keyframes spinner {
            100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
            }
        }
    </style>

    <!-- Theme mode -->
    <script>
        let mode = window.localStorage.getItem("mode"),
            root = document.getElementsByTagName("html")[0];
        if (mode == null) {
            mode = "dark";
        } else if (mode !== null && mode === "dark") {
            root.classList.add("dark-mode");
        } else {
            root.classList.add("dark-mode");
        }
    </script>
</svelte:head>

<!-- Navbar -->
<!-- <header class="header navbar navbar-expand-lg position-absolute navbar-sticky"> -->
<header class="header navbar navbar-expand-lg bg-light navbar-sticky">
    <div class="container px-3">
        <a data-sveltekit-reload href="/" class="navbar-brand pe-3">
            <!-- <img src="assets/img/logo.svg" width="47" alt="Silicon"> -->
            <img
                src="./assets/img/custom/logo-nasa.svg"
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
                        <a data-sveltekit-reload href="/" class="nav-link"
                            >Home</a
                        >
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            data-sveltekit-reload
                            href="missions"
                            class="nav-link dropdown-toggle"
                            aria-current="page">Missions</a
                        >
                        <ul class="dropdown-menu">
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="missions#overview"
                                    class="dropdown-item">Overview</a
                                >
                            </li>
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="missions#timeline"
                                    class="dropdown-item">Timeline</a
                                >
                            </li>
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="missions#active"
                                    class="dropdown-item">Active</a
                                >
                            </li>
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="missions#development"
                                    class="dropdown-item">Development</a
                                >
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            data-sveltekit-reload
                            href="tools"
                            class="nav-link dropdown-toggle"
                            aria-current="page">Tools</a
                        >
                        <ul class="dropdown-menu">
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="tools#overview"
                                    class="dropdown-item">Overview</a
                                >
                            </li>
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="tools#reporting"
                                    class="dropdown-item"
                                    >Rapid Reporting Resources</a
                                >
                            </li>
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="tools#analysis"
                                    class="dropdown-item"
                                    >Data Analysis Toolkits</a
                                >
                            </li>
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="tools#planning"
                                    class="dropdown-item"
                                    >Observations Planning Tools</a
                                >
                            </li>
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="tools#archives"
                                    class="dropdown-item"
                                    >Data Archives & Repositories</a
                                >
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            data-sveltekit-reload
                            href="proposals"
                            class="nav-link dropdown-toggle"
                            aria-current="page">Proposals</a
                        >
                        <ul class="dropdown-menu">
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="proposals#proposals"
                                    class="dropdown-item"
                                    >Proposal Opportunities</a
                                >
                            </li>
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="proposals#programs"
                                    class="dropdown-item"
                                    >Guest Observer & Investigator Programs</a
                                >
                            </li>
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="proposals#joint"
                                    class="dropdown-item"
                                    >Joint Observing Opportunities</a
                                >
                            </li>
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="proposals#resources"
                                    class="dropdown-item"
                                    >Complementary Opportunities</a
                                >
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            data-sveltekit-reload
                            href="conferences"
                            class="nav-link dropdown-toggle"
                            aria-current="page">Conferences</a
                        >
                        <ul class="dropdown-menu">
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="conferences#upcoming"
                                    class="dropdown-item">Upcoming Meetings</a
                                >
                            </li>
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="conferences#past"
                                    class="dropdown-item">Past Meetings</a
                                >
                            </li>
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="conferences#resources"
                                    class="dropdown-item"
                                    >Presentation Resources</a
                                >
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a data-sveltekit-reload href="about" class="nav-link"
                            >About</a
                        >
                    </li>
                    <li class="nav-item">
                        <a data-sveltekit-reload href="api" class="nav-link"
                            >API</a
                        >
                    </li>
                </ul>
            </div>
        </div>
    </div>
</header>

<slot />

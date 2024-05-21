<script lang="ts">
    import { PUBLIC_CONFIG } from "../config/config.public";
    import { onMount } from "svelte";

    import { base } from "$app/paths";
    import { page } from "$app/stores";

    // components
    import Navigation from "$lib/components/Navigation.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import BackToTopButton from "$lib/components/BackToTopButton.svelte";

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

<Navigation></Navigation>

<slot />

<Footer></Footer>
<BackToTopButton></BackToTopButton>

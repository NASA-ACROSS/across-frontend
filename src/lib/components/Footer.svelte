<script lang="ts">
    import { base } from '$app/paths';
    import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<footer
    class="footer sm:footer-horizontal bg-primary text-primary-content p-10"
>
    <aside>
        <img
            src="{base}/assets/img/custom/logo-nasa.svg"
            width="75"
            alt="NASA logo"
        />
        <p class="my-5">
            National Aeronautics and Space Administration
            <br />
            Astrophysics Cross-Observatory Science Support
        </p>
        <ThemeSwitch />
    </aside>
    <nav>
        <h6 class="footer-title">Services</h6>
        <a href="{base}/schedules">Schedules</a>
        <a href="{base}/observations">Observations</a>
        <a href="{base}/observations">Visibility Calculator</a>
    </nav>
    <nav>
        <h6 class="footer-title">Info</h6>
        <a href="/" class="nav-link d-lg-inline-block px-0 pt-0 pb-0 mt-1"
            >across.sciencecloud.nasa.gov</a
        >
        <a
            href="http://gsfc.nasa.gov"
            class="nav-link d-lg-inline-block px-0 pt-0 pb-0"
            >Goddard Space Flight Center</a
        >
        <a
            href="http://mfsc.nasa.gov"
            class="nav-link d-lg-inline-block px-0 pt-0 pb-0"
            >Marshall Space Flight Center</a
        >
        <a href="https://www.nasa.gov/about/highlights/HP_Privacy.html"
            >Privacy Policy</a
        >
        <a href="https://www.nasa.gov/no-fear-act/">No Fear Act</a>
    </nav>
</footer>

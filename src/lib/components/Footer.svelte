<script lang="ts">
    import { asset, resolve } from '$app/paths';
</script>

<footer class="footer sm:footer-horizontal bg-primary text-primary-content p-10">
    <aside>
        <img src={asset('/assets/img/custom/logo-nasa.svg')} width="75" alt="NASA logo" />
        <p class="my-5">
            National Aeronautics and Space Administration
            <br />
            Astrophysics Cross-Observatory Science Support
        </p>
    </aside>
    <nav>
        <h6 class="footer-title">Services</h6>
        <a href={resolve('/schedules')}>Schedules</a>
        <a href={resolve('/observations')}>Observations</a>
        <a href={resolve('/observations')}>Visibility Calculator</a>
        <a href={resolve('/docs/about')}>Docs</a>
    </nav>
    <nav>
        <h6 class="footer-title">Info</h6>
        <a href="https://www.nasa.gov/goddard/">Goddard Space Flight Center</a>
        <a href="https://www.nasa.gov/marshall/">Marshall Space Flight Center</a>
        <a href="https://www.nasa.gov/vulnerability-disclosure-policy/">Vulnerability Disclosure Policy</a>
        <a href="https://www.nasa.gov/privacy/">Privacy Policy</a>
        <a href="https://www.nasa.gov/no-fear-act/">No Fear Act</a>
    </nav>
</footer>

<script lang="ts">
    import { asset, resolve } from '$app/paths';
</script>

<footer
    class="footer sm:footer-horizontal bg-primary text-primary-content p-10"
>
    <aside>
        <img
            src={asset('/assets/img/custom/logo-nasa.svg')}
            width="75"
            alt="NASA logo"
        />
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
    </nav>
    <nav>
        <h6 class="footer-title">Info</h6>
        <a href="/">across.sciencecloud.nasa.gov</a>
        <a href="http://gsfc.nasa.gov">Goddard Space Flight Center</a>
        <a href="http://mfsc.nasa.gov">Marshall Space Flight Center</a>
        <a href="https://www.nasa.gov/about/highlights/HP_Privacy.html"
            >Privacy Policy</a
        >
        <a href="https://www.nasa.gov/no-fear-act/">No Fear Act</a>
    </nav>
</footer>

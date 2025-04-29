<script lang="ts">
    import { base } from '$app/paths';
    import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<!-- Footer -->
<footer class="footer bg-light border-top">
    <div class="container pt-3">
        <div class="row pb-5">
            <div class="col-xl-6 col-lg-6 col-md-12">
                <div class="navbar-brand text-dark p-0 me-0 mb-3 mb-lg-4">
                    <img
                        src="{base}/assets/img/custom/logo-nasa.svg"
                        width="75"
                        alt="NASA logo"
                    />
                    <h5 class="mt-1 mb-0 d-lg-block text-wrap">
                        National Aeronautics and Space Administration
                    </h5>
                </div>

                <div
                    id="page-stats"
                    class="d-lg-block"
                    data-bs-parent="#footer-links"
                >
                    <ul class="nav flex-column pb-lg-1 mb-lg-0 mt-3">
                        <li>
                            <span class="h6">NASA Official: </span> Official TBD
                        </li>
                        <li>
                            <span class="h6">Informational Website: </span> Link
                            TBD
                        </li>
                        <li>
                            <span class="h6">Git Repository: </span> Link TBD
                        </li>
                    </ul>

                    <p class="">
                        <a
                            href="#useful-links"
                            class="d-block text-dark dropdown-toggle d-lg-none py-2"
                            data-bs-toggle="collapse">Useful Links</a
                        >
                    </p>

                    <p
                        class="pt-xl-0 pt-lg-0 d-lg-block collapse"
                        id="useful-links"
                    >
                        <a
                            href="https://www.nasa.gov/about/highlights/HP_Privacy.html"
                            >Privacy Policy</a
                        >
                        &nbsp;| &nbsp;
                        <a href="http://odeo.hq.nasa.gov/nofear.html"
                            >No Fear Act</a
                        >
                        &nbsp;| &nbsp;
                        <a href="https://www.nasa.gov/FOIA/index.html">FOIA</a>
                        &nbsp;| &nbsp;
                        <a
                            href="https://www.nasa.gov/about/highlights/HP_Privacy.html"
                            >Contact Us</a
                        >
                    </p>
                </div>
            </div>

            <div class="col-xl-6 col-lg-6 col-md-12">
                <div id="footer-links" class="row">
                    <div class="text-end">
                        <div
                            id="useful-links"
                            class="collapse d-lg-block"
                            data-bs-parent="#footer-links"
                        >
                            <ul class="nav flex-column pb-lg-1 mb-lg-0 mt-0">
                                <li class="nav-item">
                                    <h5 class="mb-0 mt-xl-4 mt-lg-4">
                                        <a
                                            class="nav nav-link d-lg-inline-block px-0 pt-0 pb-0"
                                            href="about">ACROSS</a
                                        >
                                    </h5>
                                </li>
                                <li class="nav-item">
                                    <a
                                        href="/"
                                        class="nav-link d-lg-inline-block px-0 pt-0 pb-0 mt-1"
                                        >across.sciencecloud.nasa.gov</a
                                    >
                                </li>
                                <li class="nav-item">
                                    <a
                                        href="http://gsfc.nasa.gov"
                                        class="nav-link d-lg-inline-block px-0 pt-0 pb-0"
                                        >Goddard Space Flight Center</a
                                    >
                                </li>
                                <li class="nav-item">
                                    <a
                                        href="http://mfsc.nasa.gov"
                                        class="nav-link d-lg-inline-block px-0 pt-0 pb-0"
                                        >Marshall Space Flight Center</a
                                    >
                                </li>
                            </ul>
                        </div>

                        <ThemeSwitch />
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>

<script>
    import { base } from '$app/paths';
    export let statisticsCounts;
</script>

<!-- Hero -->
<section
    class="dark-mode bg-dark bg-size-cover bg-repeat-0 bg-position-center position-relative overflow-hidden mb-4"
>
    <div class="jarallax bg-dark py" data-jarallax data-speed="0.5">
        <span
            class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"
        ></span>
        <div
            class="jarallax-img"
            style="background-image: url(/assets/img/custom/bli_grc_sm.jpg);"
        ></div>
        <div class="position-relative text-center zindex-5 py-sm-5">
            <div
                class="container position-relative zindex-2 pb-md-2 pb-lg-4 pb-xl-5"
            >
                <div class="row pt-3 pb-2 py-md-4">
                    <!-- Text -->
                    <div
                        class="col-xl-5 col-md-6 pt-lg-5 text-center text-md-start mb-4 mb-md-0"
                    >
                        <h5 class="display-6 pb-2 pb-md-3">
                            Enabling Time Domain and Multimessenger Astrophysics
                        </h5>
                        <p class="fs-lg d-xl-block pb-2 pb-md-0 mb-4 mb-md-5">
                            The <strong class="text-white"
                                >Astrophysics Cross-Observatory Science Support
                                (ACROSS)</strong
                            > center focuses on the coordination of NASA resources
                            to help facilitate this new era of astronomy. Time domain
                            and multimessenger astrophysics are opening entirely
                            new windows on the Universe.
                        </p>

                        <!-- Buttons -->
                        <div
                            class="d-flex justify-content-center justify-content-md-start pb-2 pt-lg-2 pt-xl-0"
                        >
                            <a
                                href="#stats"
                                class="btn btn-lg btn-primary shadow-primary me-3 me-sm-4"
                                >Get Started</a
                            >
                            <a
                                href={`${base}/missions`}
                                class="btn btn-lg btn-outline-secondary"
                                >Learn More</a
                            >
                        </div>

                        <!-- Stats -->
                        <div
                            id="stats"
                            class="row row-cols-3 pt-4 pt-md-5 mt-2 mt-xl-4"
                        >
                            {#if statisticsCounts.apiCount}
                                <div class="col">
                                    <h3 class="h2 mb-2">
                                        {statisticsCounts.apiCount}
                                    </h3>
                                    <p class="mb-0">API Queries</p>
                                </div>
                            {/if}
                            {#if statisticsCounts.tooCount}
                                <div class="col">
                                    <h3 class="h2 mb-2">
                                        {statisticsCounts.tooCount}
                                    </h3>
                                    <p class="mb-0">ToO Submissions</p>
                                </div>
                            {/if}
                            {#if statisticsCounts.coordinatedObservationsCount}
                                <div class="col">
                                    <h3 class="h2 mb-2">
                                        {statisticsCounts.coordinatedObservationsCount}
                                    </h3>
                                    <p class="mb-0">Coordinated Obs</p>
                                </div>
                            {/if}
                        </div>
                    </div>

                    <!-- Cursor position parallax -->
                    <div
                        class="col-xl-7 col-md-6 d-md-flex d-sm-none d-lg-flexjustify-content-end"
                    >
                        <div class="parallax" style="max-width: 648px;">
                            <div class="parallax-layer" data-depth="0.1">
                                <img
                                    src="assets/img/landing/online-courses/hero/layer01.png"
                                    alt="Layer"
                                />
                            </div>
                            <div class="parallax-layer" data-depth="0.13">
                                <img
                                    src="assets/img/landing/online-courses/hero/layer02.png"
                                    alt="Layer"
                                />
                            </div>
                            <div
                                class="parallax-layer zindex-5"
                                data-depth="-0.12"
                            >
                                <img
                                    src="assets/img/custom/layer03.png"
                                    alt="Layer"
                                />
                            </div>
                            <div
                                class="parallax-layer zindex-3"
                                data-depth="0.27"
                            >
                                <img
                                    src="assets/img/custom/layer04_02.png"
                                    alt="Layer"
                                />
                            </div>
                            <div
                                class="parallax-layer zindex-1"
                                data-depth="-0.18"
                            >
                                <img
                                    src="assets/img/custom/layer05.png"
                                    alt="Layer"
                                />
                            </div>
                            <div
                                class="parallax-layer zindex-1"
                                data-depth="0.1"
                            >
                                <img
                                    src="assets/img/custom/layer06.png"
                                    alt="Layer"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

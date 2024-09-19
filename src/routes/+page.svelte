<script lang="ts">
    import type { PageData } from './$types';
    import Card from '$lib/components/Card.svelte';
    import Hero from '$lib/components/Hero.svelte';
    import { base } from '$app/paths';

    export let data: PageData;

    let tooCount = data.too_count;
    let apiCount = data.api_count;
    let coordinatedObservationsCount = data.coordinated_observations_count;

    // extracted to make old site work with svelte
    // library expects a string json object and runs JSON.parse on it
    const blogPostsSliderOptions = JSON.stringify({
        slidesPerView: 1,
        spaceBetween: 8,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            '0': {
                slidesPerView: 1,
            },
            '560': {
                slidesPerView: 2,
            },
            '992': {
                slidesPerView: 3,
            },
        },
    });

    const testimonialsSliderOptions = JSON.stringify({
        spaceBetween: 24,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            prevEl: '#testimonials-prev',
            nextEl: '#testimonials-next',
        },
    });
</script>

<!-- Page wrapper for sticky footer -->
<!-- Wraps everything except footer to push footer to the bottom of the page if there is little content -->
<main class="page-wrapper">
    <!-- <Hero></Hero> -->

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
                                Enabling Time Domain and Multimessenger
                                Astrophysics
                            </h5>
                            <p
                                class="fs-lg d-md-none d-xl-block pb-2 pb-md-0 mb-4 mb-md-5"
                            >
                                The <strong class="text-white"
                                    >Astrophysics Cross-Observatory Science
                                    Support (ACROSS)</strong
                                > center focuses on the coordination of NASA resources
                                to help facilitate this new era of astronomy. Time
                                domain and multimessenger astrophysics are opening
                                entirely new windows on the Universe.
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
                                {#if apiCount}
                                    <div class="col">
                                        <h3 class="h2 mb-2">{apiCount}</h3>
                                        <p class="mb-0">API Queries</p>
                                    </div>
                                {/if}
                                {#if tooCount}
                                    <div class="col">
                                        <h3 class="h2 mb-2">{tooCount}</h3>
                                        <p class="mb-0">ToO Submissions</p>
                                    </div>
                                {/if}
                                {#if coordinatedObservationsCount}
                                    <div class="col">
                                        <h3 class="h2 mb-2">
                                            {coordinatedObservationsCount}
                                        </h3>
                                        <p class="mb-0">Coordinated Obs</p>
                                    </div>
                                {/if}
                            </div>
                        </div>

                        <!-- Cursor position parallax -->
                        <div
                            class="col-xl-7 col-md-6 d-md-flex justify-content-end"
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

    <!-- Services -->
    <section id="services" class="container mt-3 pt-3 pb-5">
        <h2 class="h1 text-center pt-1 pt-xl-2 mb-4">
            ACROSS Support Overview
        </h2>
        <p class="fs-lg text-muted text-center pb-4 mb-2 mb-lg-3">
            How does ACROSS coordinate NASA resources and support the TDAMM
            community?
        </p>
        <div class="row mb-3">
            <div
                class="col-lg-3 col-md-4 col-sm-6 text-center pb-md-2 mb-3 mb-lg-4"
            >
                <div
                    class="d-inline-block bg-secondary rounded-circle p-3 mb-4"
                >
                    <img
                        src="assets/img/landing/saas-1/features/chat.svg"
                        width="32"
                        alt="Icon"
                    />
                </div>
                <h3 class="h5 pb-1 mb-2">Mission APIs</h3>
                <p class="fs-sm">
                    APIs to obtain mission state and status, observing plans,
                    observability constraints, and submit target of opportunity
                    requests
                </p>
            </div>
            <div
                class="col-lg-3 col-md-4 col-sm-6 text-center pb-md-2 mb-3 mb-lg-4"
            >
                <div
                    class="d-inline-block bg-secondary rounded-circle p-3 mb-4"
                >
                    <img
                        src="assets/img/landing/saas-1/features/analytics.svg"
                        width="32"
                        alt="Icon"
                    />
                </div>
                <h3 class="h5 pb-1 mb-2">Situational Awarness</h3>
                <p class="fs-sm">
                    Mission dashboards that provide situational awareness and
                    multi-observatory follow-up planning and feasibility.
                </p>
            </div>
            <div
                class="col-lg-3 col-md-4 col-sm-6 text-center pb-md-2 mb-3 mb-lg-4"
            >
                <div
                    class="d-inline-block bg-secondary rounded-circle p-3 mb-4"
                >
                    <img
                        src="assets/img/landing/saas-1/features/bell.svg"
                        width="32"
                        alt="Icon"
                    />
                </div>
                <h3 class="h5 pb-1 mb-2">Community News</h3>
                <p class="fs-sm">
                    Mattis urna ultricies non amet, purus in auctor non. Odio
                    vulputate ac nibh. Sapien fermentum, fringilla molestie
                    lorem nec.
                </p>
            </div>
            <div
                class="col-lg-3 col-md-4 col-sm-6 text-center pb-md-2 mb-3 mb-lg-4"
            >
                <div
                    class="d-inline-block bg-secondary rounded-circle p-3 mb-4"
                >
                    <img
                        src="assets/img/landing/saas-1/features/tasks.svg"
                        width="32"
                        alt="Icon"
                    />
                </div>
                <h3 class="h5 pb-1 mb-2">Conferences</h3>
                <p class="fs-sm">
                    A elementum, imperdiet enim, pretium etiam facilisi in
                    aenean quam mauris.
                </p>
            </div>
        </div>
        <div class="row">
            <div
                class="col-lg-3 col-md-4 col-sm-6 text-center pb-md-2 mb-3 mb-lg-4"
            >
                <div
                    class="d-inline-block bg-secondary rounded-circle p-3 mb-4"
                >
                    <img
                        src="assets/img/landing/saas-1/features/calendar.svg"
                        width="32"
                        alt="Icon"
                    />
                </div>
                <h3 class="h5 pb-1 mb-2">TDAMM Workshops</h3>
                <p class="fs-sm">
                    Mattis urna ultricies non amet, purus in auctor non. Odio
                    vulputate ac nibh. Sapien fermentum, fringilla molestie
                    lorem nec.
                </p>
            </div>
            <div
                class="col-lg-3 col-md-4 col-sm-6 text-center pb-md-2 mb-3 mb-lg-4"
            >
                <div
                    class="d-inline-block bg-secondary rounded-circle p-3 mb-4"
                >
                    <img
                        src="assets/img/landing/saas-1/features/add-group.svg"
                        width="32"
                        alt="Icon"
                    />
                </div>
                <h3 class="h5 pb-1 mb-2">TDAMM Toolkits</h3>
                <p class="fs-sm">
                    Mattis urna ultricies non amet, purus in auctor non. Odio
                    vulputate ac nibh. Sapien fermentum, fringilla molestie
                    lorem nec.
                </p>
            </div>
            <div
                class="col-lg-3 col-md-4 col-sm-6 text-center pb-md-2 mb-3 mb-lg-4"
            >
                <div
                    class="d-inline-block bg-secondary rounded-circle p-3 mb-4"
                >
                    <img
                        src="assets/img/landing/saas-1/features/headset.svg"
                        width="32"
                        alt="Icon"
                    />
                </div>
                <h3 class="h5 pb-1 mb-2">TDAMM Help Desk</h3>
                <p class="fs-sm">
                    SMattis urna ultricies non amet, purus in auctor non. Odio
                    vulputate ac nibh. Sapien fermentum, fringilla molestie
                    lorem nec.
                </p>
            </div>
            <div
                class="col-lg-3 col-md-4 col-sm-6 text-center pb-md-2 mb-3 mb-lg-4"
            >
                <div
                    class="d-inline-block bg-secondary rounded-circle p-3 mb-4"
                >
                    <img
                        src="assets/img/landing/saas-1/features/shield.svg"
                        width="32"
                        alt="Icon"
                    />
                </div>
                <h3 class="h5 pb-1 mb-2">Community Grant Program</h3>
                <p class="fs-sm">
                    Mattis urna ultricies non amet, purus in auctor non. Odio
                    vulputate ac nibh. Sapien fermentum, fringilla molestie
                    lorem nec.
                </p>
            </div>
        </div>
    </section>

    <!-- Quotes -->
    <section class="container pt-0 pb-5 mt-0 mb-5">
        <div class="row">
            <div class="col-md-5">
                <div class="card h-100 border-0 overflow-hidden px-md-4">
                    <span
                        class="bg-gradient-primary position-absolute top-0 start-0 w-100 h-100 opacity-10 d-none d-md-block"
                    ></span>
                    <div
                        class="card-body d-flex flex-column align-items-center justify-content-center position-relative zindex-2 p-0 pb-2 p-lg-4"
                    >
                        <h2 class="h1 text-center text-md-start p-lg-4">
                            The Decadal Survey Findings on Multi-messenger
                            Astronomy
                        </h2>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <div class="card border-0 shadow-sm p-4 p-xxl-5">
                    <div class="d-flex justify-content-between pb-4 mb-2">
                        <span
                            class="btn btn-icon btn-primary btn-lg shadow-primary pe-none"
                        >
                            <i class="bx bxs-quote-left"></i>
                        </span>
                        <div class="d-flex">
                            <button
                                type="button"
                                id="testimonials-prev"
                                class="btn btn-prev btn-icon btn-sm me-2"
                            >
                                <i class="bx bx-chevron-left"></i>
                            </button>
                            <button
                                type="button"
                                id="testimonials-next"
                                class="btn btn-next btn-icon btn-sm ms-2"
                            >
                                <i class="bx bx-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Slider -->
                    <div
                        class="swiper mx-0 mb-md-n2 mb-xxl-n3"
                        data-swiper-options={testimonialsSliderOptions}
                    >
                        <div class="swiper-wrapper">
                            <!-- Item -->
                            <div class="swiper-slide h-auto">
                                <figure
                                    class="card h-100 position-relative border-0 bg-transparent"
                                >
                                    <blockquote class="card-body p-0 mb-0">
                                        <p class="fs-lg mb-0">
                                            The New Messengers and New Physics
                                            theme embodies the dual revolutions
                                            brought about by the marriage of
                                            observations of light with those
                                            from gravitational waves and
                                            elementary particles
                                            (multi-messenger astrophysics) along
                                            with the expansion of measurements
                                            of the sky over time (time-domain).
                                        </p>
                                    </blockquote>
                                    <figcaption
                                        class="card-footer border-0 d-flex align-items-center w-100 pb-2"
                                    >
                                        <img
                                            src="{base}/assets/img/custom/Astro2020.png"
                                            width="60"
                                            class="rounded-circle"
                                            alt="Ralph Edwards"
                                        />
                                        <div class="ps-3">
                                            <h6
                                                class="fw-semibold lh-base mb-0"
                                            >
                                                Decadal Survey on Astronomy and
                                                Astrophysics 2020
                                            </h6>
                                            <span class="fs-sm text-muted"
                                                >Section 1.1.1, Page 1-2</span
                                            >
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>

                            <!-- Item -->
                            <div class="swiper-slide h-auto">
                                <figure
                                    class="card h-100 position-relative border-0 bg-transparent"
                                >
                                    <blockquote class="card-body p-0 mb-0">
                                        <p class="fs-lg mb-0">
                                            In space, the highest-priority
                                            sustaining activity is a space-based
                                            time-domain and multi-messenger
                                            program of small and medium-scale
                                            missions.
                                        </p>
                                    </blockquote>
                                    <figcaption
                                        class="card-footer border-0 d-flex align-items-center w-100 pb-2"
                                    >
                                        <img
                                            src="{base}/assets/img/custom/Astro2020.png"
                                            width="60"
                                            class="rounded-circle"
                                            alt="Ralph Edwards"
                                        />
                                        <div class="ps-3">
                                            <h6
                                                class="fw-semibold lh-base mb-0"
                                            >
                                                Decadal Survey on Astronomy and
                                                Astrophysics 2020
                                            </h6>
                                            <span class="fs-sm text-muted"
                                                >Page S-3</span
                                            >
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>

                        <!-- Pagination (bullets) -->
                        <div
                            class="swiper-pagination position-relative mt-5"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Program News -->
    <section class="container mt-4 pt-lg-2 pb-4">
        <!-- Page title + Search form -->
        <div class="row gy-4 align-items-end mb-2 pb-md-3">
            <div class="col-lg-8 col-md-6">
                <h1 class="mb-0">Program News</h1>
            </div>
        </div>

        <!-- Blog posts slider -->
        <div
            class="swiper swiper-nav-onhover mx-n2"
            data-swiper-options={blogPostsSliderOptions}
        >
            <div class="swiper-wrapper">
                <!-- Item -->
                <div class="swiper-slide h-auto py-3">
                    <article
                        class="card p-md-3 p-2 border-0 shadow-sm card-hover-primary h-100 mx-2"
                    >
                        <div class="card-body pb-0">
                            <div
                                class="d-flex align-items-center justify-content-between mb-3"
                            >
                                <a
                                    href="#"
                                    class="badge fs-sm text-nav bg-secondary text-decoration-none position-relative zindex-2"
                                    >Soliciations</a
                                >
                                <span class="fs-sm text-muted"
                                    >Aug 16, 2022</span
                                >
                            </div>
                            <h3 class="h4">
                                <a
                                    href="https://www.nasa.gov/press-release/nasa-selects-proposals-to-study-stellar-explosions-galaxies-stars"
                                    class="stretched-link"
                                    >2023 Astrophysics Probe Explorer (APEX)
                                    draft announcement released</a
                                >
                            </h3>
                            <p class="mb-0">
                                Astrophysics Probe Explorer (APEX) AO Community
                                Announcement release of draft solicitation
                            </p>
                        </div>
                    </article>
                </div>

                <!-- Item -->
                <div class="swiper-slide h-auto py-3">
                    <article
                        class="card p-md-3 p-2 border-0 shadow-sm card-hover-primary h-100 mx-2"
                    >
                        <div class="card-body pb-0">
                            <div
                                class="d-flex align-items-center justify-content-between mb-3"
                            >
                                <a
                                    href="#"
                                    class="badge fs-sm text-nav bg-secondary text-decoration-none position-relative zindex-2"
                                    >Swift</a
                                >
                                <span class="fs-sm text-muted"
                                    >Feb 18, 2022</span
                                >
                            </div>
                            <h3 class="h4">
                                <a
                                    href="https://swift.gsfc.nasa.gov/news/2022/safe_mode.html"
                                    class="stretched-link"
                                    >NASA's Swift Observatory Returns to Science</a
                                >
                            </h3>
                            <p class="mb-0">
                                NASA's Neil Gehrels Swift Observatory
                                successfully returned to science operations
                                Thursday, Feb. 17. The spacecraft and its three
                                instruments are healthy and operating as
                                expected.
                            </p>
                        </div>
                    </article>
                </div>

                <!-- Item -->
                <div class="swiper-slide h-auto py-3">
                    <article
                        class="card p-md-3 p-2 border-0 shadow-sm card-hover-primary h-100 mx-2"
                    >
                        <div class="card-body pb-0">
                            <div
                                class="d-flex align-items-center justify-content-between mb-3"
                            >
                                <a
                                    href="#"
                                    class="badge fs-sm text-nav bg-secondary text-decoration-none position-relative zindex-2"
                                    >Swift</a
                                >
                                <span class="fs-sm text-muted"
                                    >Feb 15, 2022</span
                                >
                            </div>
                            <h3 class="h4">
                                <a
                                    href="https://swift.gsfc.nasa.gov/proposals/c18_acceptarg.html"
                                    class="stretched-link"
                                    >Swift Cycle 18 Results</a
                                >
                            </h3>
                            <p class="mb-0">
                                Swift Cycle 18 Recommended Targets and Proposals
                                have been posted.
                            </p>
                        </div>
                    </article>
                </div>
            </div>

            <!-- Pagination (bullets) -->
            <div
                class="swiper-pagination position-relative pt-2 pt-sm-3 mt-4"
            ></div>
        </div>
    </section>

    <!-- Science News -->
    <section class="container mt-4 mb-lg-5 pt-lg-2 pb-5">
        <div class="row align-items-end gy-3 mb-4 pb-lg-3 pb-1">
            <div class="col-lg-5 col-md-4">
                <h1 class="mb-2 mb-md-0">Science Highlights</h1>
            </div>
        </div>

        <!-- Card grid -->
        <div class="row row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-md-4 gy-2">
            {#each data.newsPosts as newsData}
                <Card data={newsData}></Card>
            {/each}
        </div>
    </section>
</main>

<style>
    .green-dot {
        width: 8px;
        height: 8px;
        background-color: #00ff00; /* Green color */
        border-radius: 50%;
        display: inline-block;
        margin-right: 8px; /* Space between the dot and the text */
        margin-bottom: 2px; /* Space between the dot and the text */
    }
    .status-text {
        display: inline-block;
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: white;
    }
</style>

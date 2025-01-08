<script lang="ts">
    import type { PageData } from './$types';
    import { base } from '$app/paths';
    import Card from '$lib/components/NewsCard.svelte';
    import Hero from '$lib/components/Hero.svelte';
    import SupportOverview from '$lib/components/SupportOverview.svelte';

    export let data: PageData;

    let statisticsCounts = {
        tooCount: data.too_count,
        apiCount: data.api_count,
        coordinatedObservationsCount: data.coordinated_observations_count,
    };

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

<main class="page-wrapper">
    <Hero {statisticsCounts}></Hero>

    <!-- Services -->
    <section id="services" class="container mt-3 pt-3 pb-5">
        <h2 class="h1 text-center pt-1 pt-xl-2 mb-4">
            ACROSS Support Overview
        </h2>
        <p class="fs-lg text-muted text-center pb-4 mb-2 mb-lg-3">
            How does ACROSS coordinate NASA resources and support the TDAMM
            community?
        </p>
        <div class="d-flex flex-sm-wrap flex-md-nowrap">
            <SupportOverview
                title="Mission APIs"
                imgSrc="assets/img/landing/saas-1/features/chat.svg"
            >
                Application Programming Interfaces (APIs) to obtain mission
                state and status, observing plans, observing constraints, and
                submit target of opportunity requests.
            </SupportOverview>
            <SupportOverview
                title="Situational Awarness"
                imgSrc="assets/img/landing/saas-1/features/analytics.svg"
            >
                Mission dashboards that provide situational awareness and
                multi-obesrvatory follow-up planing and feasibility.
            </SupportOverview>
            <SupportOverview
                title="Community News"
                imgSrc="assets/img/landing/saas-1/features/bell.svg"
            >
                Updates on the latest TDAMM press releases, science highlights,
                and programmatic news.
            </SupportOverview>
            <SupportOverview
                title="Conferences"
                imgSrc="assets/img/landing/saas-1/features/tasks.svg"
            >
                A comprehensive list upcoming and past conferences and workshops
                focusing on TDAMM related science and infrastructure
            </SupportOverview>
        </div>
        <div class="d-flex flex-sm-wrap flex-md-nowrap">
            <SupportOverview
                title="TDAMM Workshops"
                imgSrc="assets/img/landing/saas-1/features/calendar.svg"
            >
                Community workshops to demonstrate the use of community and
                ACROSS developed tools to lower the barriers to entry to their
                usage.
            </SupportOverview>
            <SupportOverview
                title="TDAMM Toolkits"
                imgSrc="assets/img/landing/saas-1/features/add-group.svg"
            >
                Toolkits to programmatically interface with ACROSS developed
                TDAMM infrastructure.
            </SupportOverview>
            <SupportOverview
                title="TDAMM Help Desk"
                imgSrc="assets/img/landing/saas-1/features/headset.svg"
            >
                A virtual help desk staffed by domain experts who can assist
                observers in submitting ToO requests and coordinating with
                observatory teams.
            </SupportOverview>
            <SupportOverview
                title="Community Grant Program"
                imgSrc="assets/img/landing/saas-1/features/shield.svg"
            >
                A public solicitation to fund the development of TDAMM related
                observing tools, analysis software, and infrastructure.
            </SupportOverview>
        </div>
    </section>

    <!-- Quotes -->
    <section class="container pt-0 pb-5 mt-0 mb-5">
        <div class="row">
            <div class="col-md-5 my-sm-2 my-md-0">
                <div class="card h-100 border-0 overflow-hidden px-md-4">
                    <span
                        class="bg-gradient-primary position-absolute top-0 start-0 w-100 h-100 opacity-10 d-none d-sm-block"
                    ></span>
                    <div
                        class="card-body d-flex flex-column align-items-center justify-content-center position-relative zindex-2 p-0 py-sm-3 p-lg-4"
                    >
                        <h2 class="h1 text-center text-md-start mb-2">
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

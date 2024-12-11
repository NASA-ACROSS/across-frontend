<script lang="ts">
    import { base } from '$app/paths';
    import HorizontalCard from '$lib/components/HorizontalCard.svelte';

    import type { PageData } from './$types';
    export let data: PageData;
</script>

<!-- Page wrapper for sticky footer -->
<!-- Wraps everything except footer to push footer to the bottom of the page if there is little content -->
<main class="page-wrapper">
    <div
        class="page-banner"
        style="background-image: url({base}/assets/img/custom/Fermi_Earth_GWs.jpg);  "
    ></div>
    <!-- Content -->
    <section class="container pt-4 pb-5 mb-md-2 mb-lg-4">
        <div class="row gy-4">
            <!-- Main Content -->
            <div class="col-lg-9">
                <div id="overview"></div>
                <h1 class="border-bottom pb-4" id="Overview">
                    Multimessenger Missions
                </h1>

                <div id="toolkits"></div>
                <h2 class="h3 mt-5">Overview</h2>

                <!-- <h2 class="h4">Paragraph Title</h2> -->
                <p class="mb-4 pb-2">
                    The joint discovery of gravitational waves and
                    electromagnetic radiation from the binary neutron star
                    merger GW170817 was a watershed moment for astrophysics.
                    NASA missions played a critical role in this discovery, from
                    constraining the speed of gravity, to determining the site
                    of heavy (r-process) element formation, to furthering our
                    understanding of the formation and structure of relativistic
                    jets. The recent detection of a neutrino correlated in space
                    and time with a flare from gamma-ray blazar has also
                    provided a tantalizing clue to the origin of high-energy
                    cosmic neutrinos. These studies of astrophysical transients
                    and time-domain and multimessenger phenomena are perhaps the
                    most rapidly growing field of astrophysics, rich with
                    opportunities for exciting discoveries. In the
                    present/near-future, NASA is well-positioned to capitalize
                    on the exciting scientific opportunities in time-domain and
                    multimessenger astrophysics. As highlighted in the 2019
                    Astrophysics Senior Review of Operating Missions, the
                    portfolio provides a suite of capabilities that is “greater
                    than the sum of its parts”, and will contribute
                    significantly to the major science questions in this field.
                </p>

                <!-- Image -->
                <div class="gallery mb-4 pb-2">
                    <img
                        src="{base}/assets/img/custom/astro-fleet-spiral-2024-10-21.webp"
                    />
                </div>

                <p class="mb-4 pb-2">
                    The current NASA Astrophysics Fleet, flying and in
                    development.
                </p>

                <!-- Quotation -->
                <figure class="position-relative mb-4 ps-4">
                    <span
                        class="position-absolute top-0 start-0 w-3 h-100 bg-primary"
                    ></span>
                    <blockquote
                        class="blockquote fs-xl fw-medium text-dark ps-1 ps-sm-3"
                    >
                        <p>
                            "The complementary nature of these missions makes
                            the overall capability of the portfolio more than
                            the sum of its parts, and many of the most exciting
                            developments in contemporary astrophysics draw on
                            observations from several of these observatories
                            simultaneously."
                        </p>
                    </blockquote>
                    <figcaption
                        class="d-flex align-items-center pt-3 ps-1 ps-sm-3"
                    >
                        <img
                            src="https://www1.grc.nasa.gov/wp-content/themes/nasapress/dist/images/logo-nasa.svg"
                            width="48"
                            class="rounded-circle"
                            alt="Jane Cooper"
                        />
                        <div class="ps-3">
                            <h6 class="fw-semibold lh-base mb-0">
                                2019 Astrophysics Senior Review
                            </h6>
                            <span class="fs-sm text-muted"
                                >Executive Summary, Page 2</span
                            >
                        </div>
                    </figcaption>
                </figure>

                <!-- <p class="mb-4 pb-2">Pellentesque laoreet neque ut dictumst fames scelerisque. In malesuada orci dapibus risus tellus, amet, ultrices sagittis a. Turpis vel tincidunt tristique maecenas cursus tortor, suscipit ut. Ullamcorper at faucibus dolor tortor suspendisse suscipit senectus convallis aliquam. At orci amet facilisi nunc mi vitae iaculis diam a. Mauris venenatis sed purus cursus torte.</p>
            <h2 class="h4">Paragraph Title 2</h2>
            <p class="mb-4 pb-2">Praesent sed pulvinar posuere nisl tincidunt. Iaculis sit quam magna congue. Amet vel non aliquet habitasse. Egestas erat odio et, eleifend turpis etiam blandit interdum. Nec augue ut senectus quisque diam quis. At augue accumsan, in bibendum. A eget et, eget quisque egestas netus vel. Velit, aliquet turpis convallis ullamcorper. Scelerisque sagittis condimentum pretium in vitae etiam lacinia quis amet. Porttitor consequat, sollicitudin vivamus pharetra nibh faucibus neque, viverra. Praesent amet sed lacus vitae.</p> -->

                <div id="timeline"></div>
                <h2 class="h3 mt-5">Multimessenger Mission Timeline</h2>
                <p class="mb-4 pb-2">
                    NASA missions played a critical role in the discovery and
                    characterization of the first binary neutron star merger
                    (GW170817). In the near future, the balanced mission
                    portfolio is well-positioned to continue to make major
                    contributions to EM followup of gravitational-wave sources.
                    Current workhorse facilities in the area of time-domain and
                    multi-messenger astronony such as Fermi, Swift, Chandra, &
                    HST are well past design lifetimes. These capabiltiies are
                    currently being augemted and will eventually be replaced by
                    specalized CubeSats, SmallSats, and Missions of Opportunity,
                    many of which are currently in development and lager
                    missions currently being proposed.
                </p>

                <!-- Image -->
                <div class="gallery mb-4 pb-2">
                    <img src="{base}/assets/img/custom/mission-timeline.png" />
                </div>

                <div id="capabilities"></div>
                <h2 class="h3 pt-5 mt-5">Target of Opportunity Capabilities</h2>

                <p class="mb-4 pb-2">
                    Several of NASA's astrophysics missions provide community
                    submitted target of opportunity requests to observe new and
                    intersting transient events. The number of these
                    opportunities and the latency in observing the requested
                    target varies by mission and is driven by a combination of
                    funding and technical limitations. The table below outlines
                    the current ToO capabilities. Given growing community need
                    and the anticipated increase in number of events to
                    follow-up, increasing the number of available requests and
                    improving to the technical limitations that limit response
                    are top priorities of existing missions as well as those
                    currently in development.
                </p>

                <!-- Dark table with striped rows -->
                <div class="table-responsive">
                    <table
                        class="table table-dark table-striped text-center align-middle"
                    >
                        <thead>
                            <tr>
                                <th>Mission</th>
                                <th>Current or planned ToO capability</th>
                                <th>Response Time</th>
                                <th
                                    >Number of fastest response ToOs in latest
                                    cycle</th
                                >
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">HST</th>
                                <td
                                    ><a
                                        href="https://www.stsci.edu/hst/proposing/phase-i"
                                        ><i class="bx bx-check bx-md me-1"
                                        ></i></a
                                    >
                                </td>
                                <td> 36 hr</td>
                                <td>1 - 2</td>
                            </tr>
                            <tr>
                                <th scope="row">Chandra</th>
                                <td
                                    ><a
                                        href="https://cxc.harvard.edu/proposer/Chandra_RfO.html&usg=AOvVaw0-OiTiiFhKz6VCK6_0LNP4"
                                        ><i class="bx bx-check bx-md me-1"
                                        ></i></a
                                    ></td
                                >
                                <td> 5 days</td>
                                <td>8 GO + 4 DDT</td>
                            </tr>
                            <tr>
                                <th scope="row">Swift</th>
                                <td
                                    ><a
                                        href="https://www.swift.psu.edu/toop/too.php"
                                        ><i class="bx bx-check bx-md me-1"
                                        ></i></a
                                    ></td
                                >
                                <td> 1 hr</td>
                                <td>No Limit</td>
                            </tr>
                            <tr>
                                <th scope="row">NuSTAR</th>
                                <td
                                    ><a
                                        href="https://nustarsoc.caltech.edu/NuSTAR_Public/GO/GOsubmit.php"
                                        ><i class="bx bx-check bx-md me-1"
                                        ></i></a
                                    ></td
                                >
                                <td> 48 hr</td>
                                <td>500 ksec</td>
                            </tr>
                            <tr>
                                <th scope="row">NICER</th>
                                <td
                                    ><a
                                        href="https://heasarc.gsfc.nasa.gov/docs/nicer/proposals/too_policy.html"
                                        ><i class="bx bx-check bx-md me-1"
                                        ></i></a
                                    ></td
                                >
                                <td> 1 hr</td>
                                <td>No Limit</td>
                            </tr>
                            <tr>
                                <th scope="row">JWST</th>
                                <td
                                    ><a
                                        href="https://jwst-docs.stsci.edu/methods-and-roadmaps/jwst-target-of-opportunity-observations"
                                        ><i class="bx bx-check bx-md me-1"
                                        ></i></a
                                    ></td
                                >
                                <td> 48 hr</td>
                                <td>8</td>
                            </tr>
                            <tr>
                                <th scope="row">Roman</th>
                                <td><i class="bx bx-check bx-md me-1"></i></td>
                                <td> - </td>
                                <td> - </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div id="active"></div>
                <h2 class="h3 pt-5 mt-5">
                    NASA's Active Multimessenger Missions
                </h2>

                <p class="mb-4 pb-2">
                    According to a suvery of the community performed by NASA's
                    2020 GW-EM Task Force report, Swift, Fermi, HST, Chandra
                    have been the most utilized missions for multimessenger
                    science. In addition, NuSTAR, NICER, TESS are recognized as
                    playing important supporting role for rare bright events.
                    There is also significant community interest in using JWST
                    for multimessenger follow-up in the next decade.
                </p>

                {#each data.missionCards as missionCard}
                    <HorizontalCard {...missionCard}></HorizontalCard>
                {/each}

                <div id="development"></div>
                <!-- <h2 class="h3 mt-5">NASA's Multimessenger Missions - in Development</h2> -->
                <h2 class="h3 mt-5">
                    NASA's Multimessenger Mission in Development
                </h2>

                <!-- Glowbug -->
                <article class="card border-0 bg-transparent me-xl-5 mb-4 pt-5">
                    <div class="row g-0">
                        <div
                            class="col-sm-5 position-relative bg-position-center bg-repeat-0 bg-size-cover rounded-3"
                            style="background-image: url({base}/assets/img/custom/bli_grc_sm.jpg); min-height: 15rem;"
                        >
                            <a
                                href="blog-single.html"
                                class="position-absolute top-0 start-0 w-100 h-100"
                                aria-label="Read more"
                            >
                            </a>
                        </div>
                        <div class="col-sm-7">
                            <div
                                class="card-body px-0 pt-sm-0 ps-sm-4 pb-0 pb-sm-4"
                            >
                                <a
                                    href="#"
                                    class="badge fs-sm text-white bg-primary shadow-primary text-decoration-none mb-3"
                                    >Gamma-rays</a
                                >
                                <h3 class="h4">
                                    <a
                                        href="https://pcos.gsfc.nasa.gov/physpag/meetings/head2019/grsig/EricGrove-Glowbug-HEAD2019_V2.pdf"
                                        >Glowbug</a
                                    >
                                </h3>
                                <p class="mb-4">
                                    Glowbug is a wide-field gamma-ray monitor to
                                    be launched to the ISS to detect gamma-ray
                                    bursts and will test new gamma-ray detector
                                    technology.
                                </p>
                            </div>
                        </div>
                    </div>
                </article>

                <!-- StarBurst -->
                <article class="card border-0 bg-transparent me-xl-5 mb-4 pt-5">
                    <div class="row g-0">
                        <div
                            class="col-sm-5 position-relative bg-position-center bg-repeat-0 bg-size-cover rounded-3"
                            style="background-image: url({base}/assets/img/custom/bli_grc_sm.jpg); min-height: 15rem;"
                        >
                            <a
                                href="blog-single.html"
                                class="position-absolute top-0 start-0 w-100 h-100"
                                aria-label="Read more"
                            >
                            </a>
                        </div>
                        <div class="col-sm-7">
                            <div
                                class="card-body px-0 pt-sm-0 ps-sm-4 pb-0 pb-sm-4"
                            >
                                <a
                                    href="#"
                                    class="badge fs-sm text-white bg-primary shadow-primary text-decoration-none mb-3"
                                    >Gamma-rays</a
                                >
                                <h3 class="h4">
                                    <a
                                        href="https://science.nasa.gov/astrophysics/programs/astrophysics-pioneers"
                                        >The StarBurst Multimessenger Pioneer</a
                                    >
                                </h3>
                                <p class="mb-4">
                                    StarBurst is a wide-field gamma-ray monitor
                                    designed to detect the electromagnetic
                                    counterpart to neutron star mergers.
                                </p>
                            </div>
                        </div>
                    </div>
                </article>

                <!-- Blackcat -->
                <article class="card border-0 bg-transparent me-xl-5 mb-4 pt-5">
                    <div class="row g-0">
                        <div
                            class="col-sm-5 position-relative bg-position-center bg-repeat-0 bg-size-cover rounded-3"
                            style="background-image: url({base}/assets/img/custom/bli_grc_sm.jpg); min-height: 15rem;"
                        >
                            <a
                                href="blog-single.html"
                                class="position-absolute top-0 start-0 w-100 h-100"
                                aria-label="Read more"
                            >
                            </a>
                        </div>
                        <div class="col-sm-7">
                            <div
                                class="card-body px-0 pt-sm-0 ps-sm-4 pb-0 pb-sm-4"
                            >
                                <a
                                    href="#"
                                    class="badge fs-sm text-white bg-danger shadow-danger text-decoration-none mb-3"
                                    >X-ray</a
                                >
                                <h3 class="h4">
                                    <a
                                        href="https://www.psu.edu/news/research/story/penn-state-astrophysicist-lead-58-million-nasa-cubesat-mission/"
                                        >BlackCat</a
                                    >
                                </h3>
                                <p class="mb-4">
                                    Nunc aliquet scelerisque pellentesque
                                    imperdiet tortor elit, dictum. Tristique
                                    odio at dignissim viverra aliquet eleifend
                                    erat. Tellus, at arcu, egestas praesent.
                                </p>
                            </div>
                        </div>
                    </div>
                </article>

                <!-- COSI -->
                <article class="card border-0 bg-transparent me-xl-5 mb-4 pt-5">
                    <div class="row g-0">
                        <div
                            class="col-sm-5 position-relative bg-position-center bg-repeat-0 bg-size-cover rounded-3"
                            style="background-image: url({base}/assets/img/custom/cosi.png); min-height: 15rem;"
                        >
                            <a
                                href="https://cosi.ssl.berkeley.edu"
                                class="position-absolute top-0 start-0 w-100 h-100"
                                aria-label="Read more"
                            >
                            </a>
                        </div>
                        <div class="col-sm-7">
                            <div
                                class="card-body px-0 pt-sm-0 ps-sm-4 pb-0 pb-sm-4"
                            >
                                <a
                                    href="#"
                                    class="badge fs-sm text-white bg-primary shadow-primary text-decoration-none mb-3"
                                >
                                    Gamma-rays
                                </a>
                                <h3 class="h4">
                                    <a href="https://cosi.ssl.berkeley.edu"
                                        >The Compton Spectrometer and Imager
                                        (COSI)</a
                                    >
                                </h3>
                                <p class="mb-4">
                                    COSI is a soft gamma-ray survey telescope
                                    (0.2-5 MeV) designed to probe the origins of
                                    Galactic positrons, uncover the sites of
                                    nucleosynthesis in the Galaxy, perform
                                    pioneering studies of gamma-ray
                                    polarization, and find counterparts to
                                    multi-messenger sources.
                                </p>
                                <div
                                    class="d-flex align-items-center text-muted"
                                ></div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>

            <!-- Sidebar -->
            <div class="col-xl-3 col-lg-5 position-relative pt-5">
                <div
                    class="sticky-top ms-xl-5 ms-lg-4 ps-xxl-4"
                    style="top: 105px !important; margin-left: 0px !important;"
                >
                    <!-- Page Outline -->
                    <div class="card card-body border-0 position-relative mb-4">
                        <span
                            class="position-absolute top-0 start-0 w-100 h-100 bg-gradient-primary opacity-10 rounded-3"
                        ></span>
                        <div class="position-relative zindex-2">
                            <h3 class="h5 mb-4">Page Outline</h3>
                            <ul class="list-unstyled mb-3">
                                <li class="pb-1 mb-1">
                                    <div class="mb-0">
                                        <a
                                            class="nav nav-link p-0"
                                            href="#overview">Overview</a
                                        >
                                    </div>
                                </li>
                                <li class="pb-1 mb-1">
                                    <div class="mb-0">
                                        <a
                                            class="nav nav-link p-0"
                                            href="#timeline">Mission Timeline</a
                                        >
                                    </div>
                                </li>
                                <li class="pb-1 mb-1">
                                    <div class="mb-0">
                                        <a
                                            class="nav nav-link p-0"
                                            href="#active"
                                            >Active NASA Missions</a
                                        >
                                    </div>
                                </li>
                                <li class="pb-1 mb-1">
                                    <div class="mb-0">
                                        <a
                                            class="nav nav-link p-0"
                                            href="#capabilities"
                                            >Target of Opportunity Capabilities</a
                                        >
                                    </div>
                                </li>
                                <li class="pb-1 mb-1">
                                    <div class="mb-0">
                                        <a
                                            class="nav nav-link p-0"
                                            href="#development"
                                            >NASA Missions in Development</a
                                        >
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Sharing -->
                    <div class="mt-4">
                        <h5 class="mb-4">Share this page:</h5>
                        <div class="mb-4 pb-lg-3">
                            <a
                                href="#"
                                class="btn btn-icon btn-secondary btn-linkedin me-2 mb-2"
                            >
                                <i class="bx bxl-linkedin"></i>
                            </a>
                            <a
                                href="#"
                                class="btn btn-icon btn-secondary btn-facebook me-2 mb-2"
                            >
                                <i class="bx bxl-facebook"></i>
                            </a>
                            <a
                                href="#"
                                class="btn btn-icon btn-secondary btn-twitter me-2 mb-2"
                            >
                                <i class="bx bxl-twitter"></i>
                            </a>
                            <a
                                href="#"
                                class="btn btn-icon btn-secondary btn-instagram me-2 mb-2"
                            >
                                <i class="bx bxl-instagram"></i>
                            </a>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact -->
    <section
        class="container pt-3 pb-4 pb-md-5 pb-5"
        style="margin-top: -156px; margin-bottom: 220px; transform: translateY(156px);"
    >
        <div class="card border-0 bg-gradient-primary">
            <div
                class="card-body p-md-5 p-4 bg-size-cover"
                style="background-image: url({base}/assets/img/landing/digital-agency/contact-bg.png);"
            >
                <div class="py-md-5 py-4 text-center">
                    <h3 class="h4 fw-normal text-light opacity-75">
                        Want to see a mission added to this list?
                    </h3>
                    <a
                        href="mailto:daniel.kocevski@nasa.gov"
                        class="display-6 text-light">Contact us!</a
                    >
                    <div class="pt-md-5 pt-4 pb-md-2">
                        <!-- <a href="contacts-v1.html" class="btn btn-lg btn-light">Contact us!</a> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<style>
    .page-banner {
        width: 100vw;
        background-clip: border-box;
        background-size: cover;
        height: 20vh;
        min-height: 20vh;
        background-position-y: center;
    }
</style>

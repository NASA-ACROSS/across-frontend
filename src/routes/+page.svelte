<script lang="ts">
  import type { PageData } from "./$types";
  import Card from "$lib/components/Card.svelte";
  import { base } from "$app/paths";

  export let data: PageData;

  // extracted to make old site work with svelte
  // library expects a string json object and runs JSON.parse on it
  const blogPostsSliderOptions = JSON.stringify({
    slidesPerView: 1,
    spaceBetween: 8,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      "0": {
        slidesPerView: 1,
      },
      "560": {
        slidesPerView: 2,
      },
      "992": {
        slidesPerView: 3,
      },
    },
  });

  const testimonialsSliderOptions = JSON.stringify({
    spaceBetween: 24,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      prevEl: "#testimonials-prev",
      nextEl: "#testimonials-next",
    },
  });
</script>

<!-- Page wrapper for sticky footer -->
<!-- Wraps everything except footer to push footer to the bottom of the page if there is little content -->
<main class="page-wrapper">
  <!-- Hero -->
  <!-- <section class="dark-mode position-relative jarallax pb-xl-3" data-jarallax data-speed="0.4" style="min-height: 900px;"> -->
  <section
    class="dark-mode position-relative jarallax pb-xl-3"
    data-jarallax
    data-speed="0.4"
    style="min-height: 900px;"
  >
    <!-- Parallax img -->
    <div
      class="jarallax-img bg-dark opacity-100"
      style="background-image: url({base}/assets/img/custom/bli_grc_sm.jpg);"
    ></div>

    <!-- Overlay bg -->
    <span
      class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25 zindex-1"
    ></span>

    <!-- Overlay content -->
    <div class="container position-relative pb-5 zindex-5">
      <!-- Featured article -->
      <div class="row mb-xxl-5 py-md-4 py-lg-5">
        <div
          class="col-lg-6 col-md-7 pb-3 pb-md-0 mb-4 mb-md-5 mt-5 position-absolute top-55 start-0"
        >
          <div class="mb-3 fs-lg text-light mt-5 pt-0">
            <!-- <img src="assets/img/blog/flame.svg" width="24" alt="Flame icon" class="mt-n1 me-1"> -->
            <h5>The Dawn of a New Era in Astronomy</h5>
          </div>
          <!-- <h1 class="pb-2 pb-md-3">About Silicon</h1> -->
          <!-- <p class="fs-xl pb-4 mb-1 mb-md-2 mb-lg-3" style="max-width: 526px;">Multimessenger and time-domain astrophysics are opening entirely new windows on the Universe. The Multimessenger Operational Science Support & Astrophysical Information Collaboration (MOSSAIC) is an initiative to facilitate communication, coordination, and collaboration in this new era of astronomy.</p> -->
          <p class="fs-xl pb-4 mb-1 mb-md-2 mb-lg-3" style="max-width: 526px;">
            Multimessenger and time-domain astrophysics are opening entirely new
            windows on the Universe. The Astrophysics Cross-Observatory Science
            Support (ACROSS) center is an initiative to facilitate
            communication, coordination, and collaboration in this new era of
            astronomy.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Breadcrumb -->
  <nav class="container py-4 mb-2 my-lg-3" aria-label="breadcrumb">
    <!-- <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item">
            <a href="index.html"><i class="bx bx-home-alt fs-lg me-1"></i>Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">About v.2</li>
        </ol> -->
  </nav>

  <!-- Overview -->
  <section class="container pb-5 mb-md-2 mb-lg-4">
    <h1 class="border-bottom pb-4">Overview</h1>
    <div class="row pt-2 pt-md-3">
      <div class="col-md-6">
        <p class="pe-lg-4 mb-1 mb-lg-4">
          The emerging field of multimessenger astronomy combines the
          observation of disparate messenger signals to reveal unique
          information about astrophysical sources. The four extrasolar
          messengers that make up multimessenger astronomy are electromagnetic
          radiation, gravitational waves, neutrinos, and cosmic rays and the
          primary multimessenger sources outside the heliosphere are expected to
          be compact binary pairs (black holes and neutron stars), supernovae,
          irregular neutron stars, gamma-ray bursts, active galactic nuclei, and
          relativistic jets. The present study of the these multimessenger
          sources has become one of the most promising discovery areas of modern
          astronomy. Identified as one of the central themes of the 2020 Decadal
          Review, the full realization of time-domain and multi-messenger
          astronomy now stands to open an entirely new window on the Universe.
        </p>

        <p>
          The first joint detection of two merging neutron stars in
          gravitational waves and electromagnetic radiation on August 17, 2017
          was a watershed moment for the field of multimessenger astronomy. The
          information gained from the detection of both messengers enable
          science that would have been impossible to perform with either signal
          alone. The discovery demonstrated that multimessenger astrophysics
          offers a powerful methodology of growing importance, as astronomers
          combine electromagnetic radiation, gravitational wave radiation, and
          particle astrophysics observations of cosmic events.
        </p>

        <p>
          Multimessenger.nasa.gov aims to support this emerging field by
          consolidating important information on resources available to
          scientists around the world to enable future discoveries.
        </p>
      </div>
      <div class="col-md-6">
        <!-- Cursor position parallax -->
        <div class="parallax" style="max-width: 648px;">
          <div class="parallax-layer" data-depth="0.1">
            <img
              src="{base}/assets/img/landing/online-courses/hero/layer01.png"
              alt="Layer"
            />
          </div>
          <div class="parallax-layer" data-depth="0.13">
            <img
              src="{base}/assets/img/landing/online-courses/hero/layer02.png"
              alt="Layer"
            />
          </div>
          <div class="parallax-layer zindex-5" data-depth="-0.12">
            <img src="{base}/assets/img/custom/layer03.png" alt="Layer" />
          </div>
          <div class="parallax-layer zindex-3" data-depth="0.27">
            <img src="{base}/assets/img/custom/layer04_02.png" alt="Layer" />
          </div>
          <div class="parallax-layer zindex-1" data-depth="-0.18">
            <img src="{base}/assets/img/custom/layer05.png" alt="Layer" />
          </div>
          <div class="parallax-layer zindex-1" data-depth="0.1">
            <img src="{base}/assets/img/custom/layer06.png" alt="Layer" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Quotes -->
  <section class="container pt-md-2 pb-5">
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
              The Decadal Survey Findings on Multi-messenger Astronomy
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
                      The New Messengers and New Physics theme embodies the dual
                      revolutions brought about by the marriage of observations
                      of light with those from gravitational waves and
                      elementary particles (multi-messenger astrophysics) along
                      with the expansion of measurements of the sky over time
                      (time-domain).
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
                      <h6 class="fw-semibold lh-base mb-0">
                        Decadal Survey on Astronomy and Astrophysics 2020
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
                      In space, the highest-priority sustaining activity is a
                      space-based time-domain and multi-messenger program of
                      small and medium-scale missions.
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
                      <h6 class="fw-semibold lh-base mb-0">
                        Decadal Survey on Astronomy and Astrophysics 2020
                      </h6>
                      <span class="fs-sm text-muted">Page S-3</span>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>

            <!-- Pagination (bullets) -->
            <div class="swiper-pagination position-relative mt-5"></div>
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
                <span class="fs-sm text-muted">Aug 16, 2022</span>
              </div>
              <h3 class="h4">
                <a
                  href="https://www.nasa.gov/press-release/nasa-selects-proposals-to-study-stellar-explosions-galaxies-stars"
                  class="stretched-link"
                  >2023 Astrophysics Probe Explorer (APEX) draft announcement
                  released</a
                >
              </h3>
              <p class="mb-0">
                Astrophysics Probe Explorer (APEX) AO Community Announcement
                release of draft solicitation
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
                <span class="fs-sm text-muted">Feb 18, 2022</span>
              </div>
              <h3 class="h4">
                <a
                  href="https://swift.gsfc.nasa.gov/news/2022/safe_mode.html"
                  class="stretched-link"
                  >NASA's Swift Observatory Returns to Science</a
                >
              </h3>
              <p class="mb-0">
                NASA's Neil Gehrels Swift Observatory successfully returned to
                science operations Thursday, Feb. 17. The spacecraft and its
                three instruments are healthy and operating as expected.
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
                <span class="fs-sm text-muted">Feb 15, 2022</span>
              </div>
              <h3 class="h4">
                <a
                  href="https://swift.gsfc.nasa.gov/proposals/c18_acceptarg.html"
                  class="stretched-link">Swift Cycle 18 Results</a
                >
              </h3>
              <p class="mb-0">
                Swift Cycle 18 Recommended Targets and Proposals have been
                posted.
              </p>
            </div>
          </article>
        </div>
      </div>

      <!-- Pagination (bullets) -->
      <div class="swiper-pagination position-relative pt-2 pt-sm-3 mt-4"></div>
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

<script lang="ts">
  import { base } from "$app/paths";
</script>

<!-- Page wrapper for sticky footer -->
<!-- Wraps everything except footer to push footer to the bottom of the page if there is little content -->
<main class="page-wrapper">
  <!-- Page image (parallax) -->
  <!-- <div class="jarallax mb-lg-5 mb-4" data-jarallax data-speed="0.35" style="height: 30.45vw; min-height: 300px;">
        <div class="jarallax-img" style="background-image: url(assets/img/custom/729665main_A-BlackHoleArt-pia16695_full.jpg);"></div>
      </div>   -->

  <!-- Hero -->
  <section class="position-relative pt-5">
    <!-- Background -->
    <div
      class="position-absolute top-0 start-0 w-100 bg-position-bottom-center bg-size-cover bg-repeat-0"
      style="background-image: url({base}/assets/img/about/hero-bg.svg);"
    >
      <div class="d-lg-none" style="height: 960px;"></div>
      <div class="d-none d-lg-block" style="height: 930px;"></div>
    </div>

    <!-- Content -->
    <div class="container position-relative zindex-5 pt-lg-5">
      <div class="row">
        <div class="col-lg-6">
          <!-- Breadcrumb -->
          <nav
            class="pt-md-2 pt-lg-3 pb-4 pb-md-5 mb-xl-4"
            aria-label="breadcrumb"
          >
            <!-- <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <a href="index.html"><i class="bx bx-home-alt fs-lg me-1"></i>Home</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">About v.1</li>
                </ol> -->
          </nav>

          <!-- Text -->
          <h1 class="pb-2 pb-md-3">About ACROSS</h1>
          <p class="" style="max-width: 600px;">
            The very nature of multimessenger and time domain astronomy calls
            for the coordination of resources and expertise from diverse domains
            of astrophysics, cosmology, and physics to correlate and interpret
            data from multiple messengers to enable further groundbreaking
            discoveries. Progress in this field depends on many stakeholders
            working together efficiently - not only scientists from the
            astronomy and physics, ground- and space-based communities, but also
            engineers, software developers, data and communication scientists,
            and more. This paradigm shift in astronomical research, thus,
            depends as much on technological advancements and scientific acumen
            as on the collaboration, communication, and infrastructure
            frameworks that are in place to enable such multifaceted exploration
            of the universe. The vision at the core of Astrophysics
            Cross-Observatory Science Support (ACROSS) center is the recognition
            that progress in MMA/TDA science can only be achieved if all
            stakeholders Communicate (often and regularly), Coordinate (plan and
            execute together), and Collaborate (share ideas and tools) - the
            three Cs. The challenges to MMA/TDA of the 21st century, with the
            improved sensitivities of ground- and space-based facilities,
            require nothing less.
          </p>

          <!-- <p class="pb-4 mb-1 mb-md-2 mb-lg-3" style="max-width: 600px;">MOSSAIC is an initiative of two NASA Centers (Goddard and Marshall Space Flight Centers), with a vision to include other stakeholders from Universities, government Labs, non-profits, and industry as active partners. It brings together current research, capabilities, and resources needed to support MMA/TDA scientists around the world. MOSSAIC is primarily intended as a service to the community, to facilitate connections between ground- and space-based observers, theorists, and data scientists from the astronomy and physics fields. It also aims to provide data analysis and interpretation tools, observations planning capabilities, proposal preparation and submission support, mission concept development, and more. Each MOSSAIC partner has equal weight and provides unique contributions, and has pledged to work with the others while maintaining their identity and autonomy.</p> -->
        </div>

        <!-- Images -->
        <div class="col-lg-6 mt-xl-3 pt-5 pt-lg-4">
          <div class="row row-cols-2 gx-3 gx-lg-4">
            <div class="col pt-lg-5 mt-lg-1">
              <img
                src="{base}/assets/img/custom/ANUNCIAN.jpg"
                class="d-block rounded-3 mb-3 mb-lg-4"
                alt="Image"
              />
              <img
                src="{base}/assets/img/custom/About_02.jpg"
                class="d-block rounded-3"
                alt="Image"
              />
            </div>
            <div class="col">
              <img
                src="{base}/assets/img/custom/About_03.jpg"
                class="d-block rounded-3 mb-3 mb-lg-4"
                alt="Image"
              />
              <img
                src="{base}/assets/img/custom/about_04.jpg"
                class="d-block rounded-3"
                alt="Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact CTA -->
  <section
    class="container pt-2 pb-4 pb-md-5 pb-5 mt-0"
    style="margin-top: -156px; margin-bottom: 220px; transform: translateY(156px);"
  >
    <div class="card border-0 bg-gradient-primary">
      <div
        class="card-body p-md-5 p-4 bg-size-cover"
        style="background-image: url({base}/assets/img/landing/digital-agency/contact-bg.png);"
      >
        <div class="py-md-5 py-4 text-center">
          <h3 class="h4 fw-normal text-light opacity-75">
            Interested in contributing to the ACROSS effort?
          </h3>
          <a href="mailto:daniel.kocevski@nasa.gov" class="display-6 text-light"
            >Contact us!</a
          >
          <div class="pt-md-5 pt-4 pb-md-2">
            <!-- <a href="contacts-v1.html" class="btn btn-lg btn-light">Contact us</a> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

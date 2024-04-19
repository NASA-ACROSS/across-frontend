<script lang="ts">
  import { base } from "$app/paths";
</script>

<!-- Page wrapper for sticky footer -->
<!-- Wraps everything except footer to push footer to the bottom of the page if there is little content -->
<main class="page-wrapper">
  <!-- Page image (parallax) -->
  <!-- <div class="jarallax mb-lg-5 mb-4" data-jarallax data-speed="0.35" style="height: 36.45vw; height: 750px;">
        <div class="jarallax-img" style="background-image: url(assets/img/custom/rsz_shutterstock_744577681.jpg);"></div>
      </div>   -->

  <!-- Breadcrumb -->
  <nav class="container py-4 mb-2 my-lg-3" aria-label="breadcrumb">
    <!-- <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item">
            <a href="index.html"><i class="bx bx-home-alt fs-lg me-1"></i>Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Tools and Resources</li>
        </ol> -->
  </nav>

  <!-- Post content + Sharing -->
  <div id="overview"></div>
  <section class="container pb-0 mb-md-2 mb-lg-4">
    <div class="row gy-4">
      <h1 class="border-bottom pb-4" id="Overview">Tools and Resources</h1>
    </div>
    <!-- <p class="d-md-none d-lg-block pb-3 mb-2 mb-md-3">Id eget blandit sapien cras massa lectus lorem placerat. Quam dolor commodo fermentum bibendum dictumst. Risus pretium eget at viverra eget. Sit neque adipiscing malesuada blandit justo, quam. Id eget blandit sapien cras massa lectus lorem placerat. Quam dolor commodo fermentum bibendum dictumst. Risus pretium eget at viverra eget. Sit neque adipiscing malesuada blandit justo, quam.</p> -->
  </section>

  <!-- Reporting Tools -->
  <div id="reporting"></div>
  <section class="pb-md-2 pb-lg-0 mb-5">
    <div class="container pb-4 pt-2">
      <h2 class="h2 text-center text-md-start mb-lg-0 pt-0 pt-md-0">
        Rapid Reporting Resources
      </h2>

      <!-- Item -->
      <div class="row pb-0 mb-md-4 mb-lg-5 pt-5 mt-4">
        <div
          class="rellax col-md-6 pb-1 mb-3 pb-md-0 mb-md-0"
          data-rellax-percentage="0.5"
          data-rellax-speed="0.8"
          data-disable-parallax-down="md"
        >
          <a href="portfolio-single-project.html">
            <img
              src="{base}/assets/img/custom/gcn-diagram.jpg"
              class="rounded-3"
              width="600"
              alt="Image"
            />
          </a>
        </div>
        <div
          class="rellax col-md-6"
          data-rellax-percentage="0.5"
          data-rellax-speed="-0.6"
          data-disable-parallax-down="md"
        >
          <div class="ps-md-4 ms-md-2">
            <a
              href="#"
              class="d-table badge bg-faded-primary text-primary fs-sm mb-3"
              >Featured Resource</a
            >
            <!-- <div class="fs-sm text-muted mb-1">Nov 18, 2021</div> -->
            <h2 class="h4">The General Coordinates Network</h2>
            <p class="d-md-none d-lg-block pb-3 mb-2 mb-md-3">
              The General Coordinates Network (GCN) is a public collaboration
              platform run by NASA for the astronomy research community to share
              alerts and rapid communications about high-energy, multimessenger,
              and transient phenomena. GCN is the established platform for
              publishing discoveries and follow-up of gamma-ray bursts (GRBs),
              gravitational-wave (GW) compact binary mergers, and high-energy
              neutrinos. GCN distributes alerts between space- and ground-based
              observatories, physics experiments, and thousands of astronomers
              around the world.
            </p>
            <!-- <a href="portfolio-single-project.html" class="btn btn-outline-primary">Learn More</a> -->
            <div class="d-flex flex-column flex-sm-row">
              <a href="#" class="btn btn-primary mb-3 mb-sm-0 me-sm-3">
                Visit gcn.nasa.gov
              </a>
              <a href="#" class="btn btn-outline-primary">
                <i class="bx bx-edit fs-xl me-xl-2"></i>
                Contribute
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="row align-items-center pb-5 mb-lg-2">
        <div class="col-md-8 text-center text-md-start">
          <!-- <p class="fs-lg text-muted mb-md-0">We are focused on helping brands grow through digital transformation services. We bring real solutions to each client’s problems through a deep understanding of their market, solution, and vision.</p> -->
        </div>
        <div
          class="col-md-4 d-flex justify-content-center justify-content-md-end"
        >
          <!--  <a href="services-v1.html" class="btn btn-outline-primary btn-lg">See all services</a> -->
        </div>
      </div>
      <div class="row row-cols-1 row-cols-md-2">
        <!-- Item -->
        <div class="col py-4 my-2 my-sm-3">
          <a
            href="https://www.wis-tns.org"
            class="card card-hover h-100 border-0 shadow-sm text-decoration-none pt-5 px-sm-3 px-md-0 px-lg-3 pb-sm-3 pb-md-0 pb-lg-3 ms-xl-2 border-primary"
          >
            <div class="card-body pt-3">
              <div
                class="d-inline-block bg-primary shadow-primary rounded-3 position-absolute top-0 translate-middle-y p-3"
              >
                <img
                  src="{base}/assets/img/services/icons/web-search.svg"
                  class="d-block m-1"
                  width="40"
                  alt="Icon"
                />
              </div>
              <h2 class="h4 d-inline-flex align-items-center">
                Transient Name Server
                <i class="bx bx-right-arrow-circle text-primary fs-3 ms-2"></i>
              </h2>
              <p class="fs-sm text-body mb-0">
                The official IAU mechanism for reporting new astronomical
                transients, provided by the IAU supernova working group.
              </p>
            </div>
          </a>
        </div>

        <!-- Item -->
        <div class="col py-4 my-2 my-sm-3">
          <a
            href="https://www.astronomerstelegram.org"
            class="card card-hover h-100 border-0 shadow-sm text-decoration-none pt-5 px-sm-3 px-md-0 px-lg-3 pb-sm-3 pb-md-0 pb-lg-3 ms-xl-2 border-primary"
          >
            <div class="card-body pt-3">
              <div
                class="d-inline-block bg-primary shadow-primary rounded-3 position-absolute top-0 translate-middle-y p-3"
              >
                <img
                  src="{base}/assets/img/about/icons/chat-light.svg"
                  class="d-block m-1"
                  width="40"
                  alt="Icon"
                />
              </div>
              <h2 class="h4 d-inline-flex align-items-center">
                The Astronomer's Telegrams
                <i class="bx bx-right-arrow-circle text-primary fs-3 ms-2"></i>
              </h2>
              <p class="fs-sm text-body mb-0">
                Email notices for the reporting new astronomical observations of
                transient sources.
              </p>
            </div>
          </a>
        </div>

        <!-- Item -->
        <div class="col py-4 my-2 my-sm-3">
          <a
            href="services-single-v1.html"
            class="card card-hover h-100 border-0 shadow-sm text-decoration-none pt-5 px-sm-3 px-md-0 px-lg-3 pb-sm-3 pb-md-0 pb-lg-3 ms-xl-2 border-primary"
          >
            <div class="card-body pt-3">
              <div
                class="d-inline-block bg-primary shadow-primary rounded-3 position-absolute top-0 translate-middle-y p-3"
              >
                <img
                  src="{base}/assets/img/about/icons/chat-light.svg"
                  class="d-block m-1"
                  width="40"
                  alt="Icon"
                />
              </div>
              <h2 class="h4 d-inline-flex align-items-center">
                Hopskotch
                <i class="bx bx-right-arrow-circle text-primary fs-3 ms-2"></i>
              </h2>
              <p class="fs-sm text-body mb-0">
                Gravida eget euismod tempus diam dignissim quam. Dignissim
                magnis blandit faucibus convallis augue nisl, etiam. Feugiat ut
                molestie non arcu senectus sed. Diam pellentesque sit mattis nec
                amet varius nunc a sed.
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Analysis Toolkits -->
  <div id="analysis"></div>
  <section class="pb-md-2 pb-lg-0 mb-0">
    <div class="container pb-4 pt-0">
      <h2 class="h2 text-center text-md-start mb-lg-0 pt-0 pt-md-0">
        Data Analysis Toolkits
      </h2>

      <!-- Item -->
      <div class="row pb-0 mb-md-4 mb-lg-5 pt-5 mt-4">
        <div
          class="rellax col-md-6 pb-1 mb-3 pb-md-0 mb-md-0"
          data-rellax-percentage="0.5"
          data-rellax-speed="0.8"
          data-disable-parallax-down="md"
        >
          <a href="portfolio-single-project.html">
            <img
              src="{base}/assets/img/custom/gdt_logo.png"
              class="rounded-3 pt-5 mt-5"
              width="600"
              alt="Image"
            />
          </a>
        </div>
        <div
          class="rellax col-md-6"
          data-rellax-percentage="0.5"
          data-rellax-speed="-0.6"
          data-disable-parallax-down="md"
        >
          <div class="ps-md-4 ms-md-2">
            <a
              href="#"
              class="d-table badge bg-faded-primary text-primary fs-sm mb-3"
              >Featured Resource</a
            >
            <!-- <a href="#" class="badge fs-sm text-white bg-primary shadow-primary text-decoration-none mb-3">Featured Resource</a> -->
            <!-- <div class="fs-sm text-muted mb-1">Nov 18, 2021</div> -->
            <h2 class="h4">The Gamma-ray Data Tools</h2>
            <p class="d-md-none d-lg-block pb-3 mb-2 mb-md-3">
              The Gamma-ray Data Tools consist of an Application Programming
              Interface (API) for detctors that gather GBM like data. The
              fundamental purpose of the Data Tools is to allow general users to
              incorporate gamma-ray analysis into their scripts and workflows
              without having to sweat very many details. The Data Tools have a
              fairly high-level API layer allowing a user to read, reduce, and
              visualize GBM data with only a few lines of code. For expert
              users, and users who want fine control over various aspects of
              their analysis, the Data Tools exposes a lower-level API layer,
              which can also be used to generalize the GBM Data Tools to data
              from other like instruments.
            </p>
            <!-- <a href="portfolio-single-project.html" class="btn btn-outline-primary">Learn More</a> -->
            <div class="d-flex flex-column flex-sm-row">
              <a href="#" class="btn btn-primary mb-3 mb-sm-0 me-sm-3">
                Learn More
              </a>
              <a href="#" class="btn btn-outline-primary">
                <i class="bx bx-edit fs-xl me-xl-2"></i>
                Contribute
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="row align-items-center pb-5 mb-lg-2">
        <div class="col-md-8 text-center text-md-start">
          <!-- <p class="fs-lg text-muted mb-md-0">We are focused on helping brands grow through digital transformation services. We bring real solutions to each client’s problems through a deep understanding of their market, solution, and vision.</p> -->
        </div>
        <div
          class="col-md-4 d-flex justify-content-center justify-content-md-end"
        >
          <!--  <a href="services-v1.html" class="btn btn-outline-primary btn-lg">See all services</a> -->
        </div>
      </div>
      <div class="row row-cols-1 row-cols-md-2">
        <!-- Item -->
        <!-- <div class="col py-4 my-2 my-sm-3">
              <a href="services-single-v1.html" class="card card-hover h-100 border-0 shadow-sm text-decoration-none pt-5 px-sm-3 px-md-0 px-lg-3 pb-sm-3 pb-md-0 pb-lg-3 me-xl-2">
                <div class="card-body pt-3">
                  <div class="d-inline-block bg-primary shadow-primary rounded-3 position-absolute top-0 translate-middle-y p-3">
                    <img src="assets/img/services/icons/rocket.svg" class="d-block m-1" width="40" alt="Icon">
                  </div>
                  <h2 class="h4 d-inline-flex align-items-center">
                    Gamma-ray Data Tools
                    <i class="bx bx-right-arrow-circle text-primary fs-3 ms-2"></i>
                  </h2>
                  <p class="fs-sm text-body mb-0">Nisi, dis sed cursus eget pellentesque mattis. Odio eu proin aliquam a. Semper bibendum tellus non tellus, facilisi dignissim in quam massa. Aliquam, feugiat ut cum tellus, sit. Quis consectetur gravida ac ac lectus cursus egestas.</p>
                </div>
              </a>
            </div> -->

        <!-- Item -->
        <div class="col py-4 my-2 my-sm-3">
          <a
            href="https://threeml.readthedocs.io/en/stable/index.html"
            class="card card-hover h-100 border-0 shadow-sm text-decoration-none pt-5 px-sm-3 px-md-0 px-lg-3 pb-sm-3 pb-md-0 pb-lg-3 ms-xl-2 border-primary"
          >
            <div class="card-body pt-3">
              <div
                class="d-inline-block bg-primary shadow-primary rounded-3 position-absolute top-0 translate-middle-y p-3"
              >
                <img
                  src="{base}/assets/img/services/icons/analytics.svg"
                  class="d-block m-1"
                  width="40"
                  alt="Icon"
                />
              </div>
              <h2 class="h4 d-inline-flex align-items-center">
                The Multi-Mission Maximum Likelihood framework (3ML)
                <i class="bx bx-right-arrow-circle text-primary fs-3 ms-2"></i>
              </h2>
              <p class="fs-sm text-body mb-0">
                A common framework for source modeling and analysis with data
                from different instrument.
              </p>
            </div>
          </a>
        </div>

        <!-- Item -->
        <div class="col py-4 my-2 my-sm-3">
          <a
            href="https://www.astropy.org"
            class="card card-hover h-100 border-0 shadow-sm text-decoration-none pt-5 px-sm-3 px-md-0 px-lg-3 pb-sm-3 pb-md-0 pb-lg-3 ms-xl-2 border-primary"
          >
            <div class="card-body pt-3">
              <div
                class="d-inline-block bg-primary shadow-primary rounded-3 position-absolute top-0 translate-middle-y p-3"
              >
                <img
                  src="{base}/assets/img/services/icons/cms.svg"
                  class="d-block m-1"
                  width="40"
                  alt="Icon"
                />
              </div>
              <h2 class="h4 d-inline-flex align-items-center">
                AstroPy
                <i class="bx bx-right-arrow-circle text-primary fs-3 ms-2"></i>
              </h2>
              <p class="fs-sm text-body mb-0">
                A community-developed core Python package for Astronomy.
              </p>
            </div>
          </a>
        </div>

        <!-- Item -->
        <div class="col py-4 my-2 my-sm-3">
          <a
            href="https://mhealpy.readthedocs.io/en/latest/index.html"
            class="card card-hover h-100 border-0 shadow-sm text-decoration-none pt-5 px-sm-3 px-md-0 px-lg-3 pb-sm-3 pb-md-0 pb-lg-3 ms-xl-2 border-primary"
          >
            <div class="card-body pt-3">
              <div
                class="d-inline-block bg-primary shadow-primary rounded-3 position-absolute top-0 translate-middle-y p-3"
              >
                <img
                  src="{base}/assets/img/services/icons/cms.svg"
                  class="d-block m-1"
                  width="40"
                  alt="Icon"
                />
              </div>
              <h2 class="h4 d-inline-flex align-items-center">
                mhealpy
                <i class="bx bx-right-arrow-circle text-primary fs-3 ms-2"></i>
              </h2>
              <p class="fs-sm text-body mb-0">
                Object-oriented wrapper of healpy.
              </p>
            </div>
          </a>
        </div>

        <!-- Item -->
        <div class="col py-4 my-2 my-sm-3">
          <a
            href="https://pypi.org/project/healpix-alchemy"
            class="card card-hover h-100 border-0 shadow-sm text-decoration-none pt-5 px-sm-3 px-md-0 px-lg-3 pb-sm-3 pb-md-0 pb-lg-3 ms-xl-2 border-primary"
          >
            <div class="card-body pt-3">
              <div
                class="d-inline-block bg-primary shadow-primary rounded-3 position-absolute top-0 translate-middle-y p-3"
              >
                <img
                  src="{base}/assets/img/services/icons/cms.svg"
                  class="d-block m-1"
                  width="40"
                  alt="Icon"
                />
              </div>
              <h2 class="h4 d-inline-flex align-items-center">
                HEALPix-alchemy
                <i class="bx bx-right-arrow-circle text-primary fs-3 ms-2"></i>
              </h2>
              <p class="fs-sm text-body mb-0">
                An open-source, Python implementation of a set of methods that
                enables rapid all-sky geometry calculations. Designed for
                cross-matching galaxy catalogs, observation footprints, and
                all-sky images like gravitational-wave probability sky maps or
                even dust maps.
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Observations Planning Tools -->
  <div id="planning"></div>
  <section class="pb-md-2 pb-lg-0 mb-5">
    <div class="container pb-4 pt-0">
      <h2 class="h2 text-center text-md-start mb-lg-0 pt-0 pt-md-0">
        Observations Planning Tools
      </h2>

      <!-- Item -->
      <div class="row pb-0 mb-md-4 mb-lg-5 pt-5 mt-4">
        <div
          class="rellax col-md-6 pb-1 mb-3 pb-md-0 mb-md-0"
          data-rellax-percentage="0.5"
          data-rellax-speed="0.8"
          data-disable-parallax-down="md"
        >
          <a href="portfolio-single-project.html">
            <img
              src="{base}/assets/img/custom/TreasureMap.png"
              class="rounded-3 pt-0"
              width="600"
              alt="Image"
            />
          </a>
        </div>
        <div
          class="rellax col-md-6"
          data-rellax-percentage="0.5"
          data-rellax-speed="-0.6"
          data-disable-parallax-down="md"
        >
          <div class="ps-md-4 ms-md-2">
            <a
              href="#"
              class="d-table badge bg-faded-primary text-primary fs-sm mb-3"
              >Featured Resource</a
            >
            <!-- <a href="#" class="badge fs-sm text-white bg-primary shadow-primary text-decoration-none mb-3">Featured Resource</a> -->
            <!-- <div class="fs-sm text-muted mb-1">Nov 18, 2021</div> -->
            <h2 class="h4">Treasure Map</h2>
            <p class="d-md-none d-lg-block pb-3 mb-2 mb-md-3">
              The Gamma-ray Data Tools consist of an Application Programming
              Interface (API) for detctors that gather GBM like data. The
              fundamental purpose of the Data Tools is to allow general users to
              incorporate gamma-ray analysis into their scripts and workflows
              without having to sweat very many details. The Data Tools have a
              fairly high-level API layer allowing a user to read, reduce, and
              visualize GBM data with only a few lines of code. For expert
              users, and users who want fine control over various aspects of
              their analysis, the Data Tools exposes a lower-level API layer,
              which can also be used to generalize the GBM Data Tools to data
              from other like instruments.
            </p>
            <!-- <a href="portfolio-single-project.html" class="btn btn-outline-primary">Learn More</a> -->
            <div class="d-flex flex-column flex-sm-row">
              <a href="#" class="btn btn-primary mb-3 mb-sm-0 me-sm-3">
                Learn More
              </a>
              <a href="#" class="btn btn-outline-primary">
                <i class="bx bx-edit fs-xl me-xl-2"></i>
                Contribute
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="row align-items-center pb-5 mb-lg-2">
        <div class="col-md-8 text-center text-md-start">
          <!-- <p class="fs-lg text-muted mb-md-0">We are focused on helping brands grow through digital transformation services. We bring real solutions to each client’s problems through a deep understanding of their market, solution, and vision.</p> -->
        </div>
        <div
          class="col-md-4 d-flex justify-content-center justify-content-md-end"
        >
          <!--  <a href="services-v1.html" class="btn btn-outline-primary btn-lg">See all services</a> -->
        </div>
      </div>
      <div class="row row-cols-1 row-cols-md-2">
        <!-- Item -->
        <!-- <div class="col py-4 my-2 my-sm-3">
              <a href="services-single-v1.html" class="card card-hover h-100 border-0 shadow-sm text-decoration-none pt-5 px-sm-3 px-md-0 px-lg-3 pb-sm-3 pb-md-0 pb-lg-3 me-xl-2">
                <div class="card-body pt-3">
                  <div class="d-inline-block bg-primary shadow-primary rounded-3 position-absolute top-0 translate-middle-y p-3">
                    <img src="assets/img/services/icons/rocket.svg" class="d-block m-1" width="40" alt="Icon">
                  </div>
                  <h2 class="h4 d-inline-flex align-items-center">
                    TreasureMap
                    <i class="bx bx-right-arrow-circle text-primary fs-3 ms-2"></i>
                  </h2>
                  <p class="fs-sm text-body mb-0">Nisi, dis sed cursus eget pellentesque mattis. Odio eu proin aliquam a. Semper bibendum tellus non tellus, facilisi dignissim in quam massa. Aliquam, feugiat ut cum tellus, sit. Quis consectetur gravida ac ac lectus cursus egestas.</p>
                </div>
              </a>
            </div> -->

        <!-- Item -->
        <div class="col py-4 my-2 my-sm-3">
          <a
            href="https://m4opt.readthedocs.io/en/latest/index.html"
            class="card card-hover h-100 border-0 shadow-sm text-decoration-none pt-5 px-sm-3 px-md-0 px-lg-3 pb-sm-3 pb-md-0 pb-lg-3 ms-xl-2 border-primary"
          >
            <div class="card-body pt-3">
              <div
                class="d-inline-block bg-primary shadow-primary rounded-3 position-absolute top-0 translate-middle-y p-3"
              >
                <img
                  src="{base}/assets/img/services/icons/rocket.svg"
                  class="d-block m-1"
                  width="40"
                  alt="Icon"
                />
              </div>
              <h2 class="h4 d-inline-flex align-items-center">
                M4OPT
                <i class="bx bx-right-arrow-circle text-primary fs-3 ms-2"></i>
              </h2>
              <p class="fs-sm text-body mb-0">
                An open-source toolkit for multi-facility scheduling of
                astrophysics observing campaigns, with a focus on extremely
                rapid follow-up of gravitational wave and neutrino events.
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Data Archives -->
  <div id="archives"></div>
  <section class="pb-md-2 pb-lg-0 mb-5">
    <div class="container pb-4 pt-0">
      <h2 class="h2 text-center text-md-start mb-lg-0 pt-0 pt-md-0">
        Data Archives & Repositories
      </h2>
      <div class="row align-items-center pb-5 mb-lg-2">
        <div class="col-md-8 text-center text-md-start">
          <!-- <p class="fs-lg text-muted mb-md-0">We are focused on helping brands grow through digital transformation services. We bring real solutions to each client’s problems through a deep understanding of their market, solution, and vision.</p> -->
        </div>
        <div
          class="col-md-4 d-flex justify-content-center justify-content-md-end"
        >
          <!--  <a href="services-v1.html" class="btn btn-outline-primary btn-lg">See all services</a> -->
        </div>
      </div>
      <div class="row row-cols-1 row-cols-md-2">
        <!-- Item -->
        <div class="col py-4 my-2 my-sm-3">
          <a
            href="https://heasarc.gsfc.nasa.gov"
            class="card card-hover h-100 border-0 shadow-sm text-decoration-none pt-5 px-sm-3 px-md-0 px-lg-3 pb-sm-3 pb-md-0 pb-lg-3 me-xl-2 border-primary"
          >
            <div class="card-body pt-3">
              <div
                class="d-inline-block bg-primary shadow-primary rounded-3 position-absolute top-0 translate-middle-y p-3"
              >
                <img
                  src="{base}/assets/img/services/icons/rocket.svg"
                  class="d-block m-1"
                  width="40"
                  alt="Icon"
                />
              </div>
              <h2 class="h4 d-inline-flex align-items-center">
                High Energy Astrophysics Science Archive Research Center
                (HEASARC)
                <i class="bx bx-right-arrow-circle text-primary fs-3 ms-2"></i>
              </h2>
              <p class="fs-sm text-body mb-0">
                NASA's archive of data on energetic phenomena.
              </p>
            </div>
          </a>
        </div>

        <!-- Item -->
        <div class="col py-4 my-2 my-sm-3">
          <a
            href="https://www.gw-openscience.org"
            class="card card-hover h-100 border-0 shadow-sm text-decoration-none pt-5 px-sm-3 px-md-0 px-lg-3 pb-sm-3 pb-md-0 pb-lg-3 ms-xl-2 border-primary"
          >
            <div class="card-body pt-3">
              <div
                class="d-inline-block bg-primary shadow-primary rounded-3 position-absolute top-0 translate-middle-y p-3"
              >
                <img
                  src="{base}/assets/img/services/icons/web-search.svg"
                  class="d-block m-1"
                  width="40"
                  alt="Icon"
                />
              </div>
              <h2 class="h4 d-inline-flex align-items-center">
                Gravitational Wave Open Science Center
                <i class="bx bx-right-arrow-circle text-primary fs-3 ms-2"></i>
              </h2>
              <p class="fs-sm text-body mb-0">
                A repository of data and software tools from gravitational-wave
                observatories.
              </p>
            </div>
          </a>
        </div>

        <!-- Item -->
        <div class="col py-4 my-2 my-sm-3">
          <a
            href="https://fermi.gsfc.nasa.gov/ssc/data/access/lat/FAVA"
            class="card card-hover h-100 border-0 shadow-sm text-decoration-none pt-5 px-sm-3 px-md-0 px-lg-3 pb-sm-3 pb-md-0 pb-lg-3 ms-xl-2 border-primary"
          >
            <div class="card-body pt-3">
              <div
                class="d-inline-block bg-primary shadow-primary rounded-3 position-absolute top-0 translate-middle-y p-3"
              >
                <img
                  src="{base}/assets/img/services/icons/web-search.svg"
                  class="d-block m-1"
                  width="40"
                  alt="Icon"
                />
              </div>
              <h2 class="h4 d-inline-flex align-items-center">
                Fermi All-sky Variability Analysis (FAVA)
                <i class="bx bx-right-arrow-circle text-primary fs-3 ms-2"></i>
              </h2>
              <p class="fs-sm text-body mb-0">
                A catalog of flaring sources observed by the Fermi Large Area
                Telescope.
              </p>
            </div>
          </a>
        </div>

        <!-- Item -->
        <div class="col py-4 my-2 my-sm-3">
          <a
            href="https://fermi.gsfc.nasa.gov/ssc/data/access/lat/LightCurveRepository"
            class="card card-hover h-100 border-0 shadow-sm text-decoration-none pt-5 px-sm-3 px-md-0 px-lg-3 pb-sm-3 pb-md-0 pb-lg-3 ms-xl-2 border-primary"
          >
            <div class="card-body pt-3">
              <div
                class="d-inline-block bg-primary shadow-primary rounded-3 position-absolute top-0 translate-middle-y p-3"
              >
                <img
                  src="{base}/assets/img/services/icons/web-search.svg"
                  class="d-block m-1"
                  width="40"
                  alt="Icon"
                />
              </div>
              <h2 class="h4 d-inline-flex align-items-center">
                Fermi LAT Light Curve Repository (LCR)
                <i class="bx bx-right-arrow-circle text-primary fs-3 ms-2"></i>
              </h2>
              <p class="fs-sm text-body mb-0">
                A database of multi-cadence flux calibrated lightcurves for
                variable sources observed by the Fermi Large Area Telescope .
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!--      <section class="container pb-5 mb-2 mb-md-4 mb-lg-5 mt-n3 mt-lg-0">
        <div>
          <h2 class="h2">Additional Resources</h2>
          <p class="mb-4 pb-2">Although not an exhaustive, below is a list of upcoming conferences that are of particular interest to the multimessenger community. Please feel free to contact us if you would like to see a conference added to this list!</p>

          <!-- Dark table with striped rows -->
  <!--         <div class="table-responsive">
            <table class="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Conference</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Registration Deadline</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">massa</th>
                  <td>tellus</td>
                  <td>fermentum</td>
                  <td>orci</td>
                </tr>
                <tr>
                  <th scope="row">egestas</th>
                  <td>Urna</td>
                  <td>sed</td>
                  <td>gravida</td>
                </tr>
                <tr>
                  <th scope="row">ipsum</th>
                  <td>dictum</td>
                  <td>orci</td>
                  <td>Sit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section> -->

  <!-- Contact CTA -->
  <section class="container mb-1 mb-md-3 mb-lg-4 pb-5">
    <div class="bg-secondary rounded-3 overflow-hidden">
      <div class="row align-items-center">
        <div class="col-xl-4 col-md-5 offset-lg-1">
          <div class="pt-5 pb-3 pb-md-5 px-4 px-lg-0 text-center text-md-start">
            <p class="lead mb-3">Ready to contribute?</p>
            <h2 class="h1 pb-3 pb-sm-4">
              Want to see <span class="text-primary">your</span> project listed here?
            </h2>
            <a
              href="mailto:daniel.kocevski@nasa.gov"
              class="btn btn-primary btn-lg">Contact us!</a
            >
          </div>
        </div>
        <div class="col-lg-6 col-md-7 offset-xl-1">
          <div
            class="position-relative d-flex flex-column align-items-center justify-content-center h-100"
          >
            <svg
              class="d-none d-md-block position-absolute top-50 start-0 translate-middle-y"
              width="868"
              height="868"
              style="min-width: 868px;"
              viewBox="0 0 868 868"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              ><circle
                opacity="0.15"
                cx="434"
                cy="434"
                r="434"
                fill="#6366F1"
              /></svg
            >
            <img
              src="{base}/assets/img/about/cta.png"
              class="position-relative zindex-3 mb-2 my-lg-4"
              width="382"
              alt="Illustration"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

<!-- Footer -->
<footer class="footer dark-mode bg-dark border-top border-light pt-5">
  <div class="container pt-lg-4">
    <div class="row pb-5">
      <div class="col-lg-4 col-md-6">
        <div class="navbar-brand text-dark p-0 me-0 mb-3 mb-lg-4">
          <img
            src="https://www1.grc.nasa.gov/wp-content/themes/nasapress/dist/images/logo-nasa.svg"
            width="75"
            alt="NASA logo"
          />
          <!-- <h6>National Aeronautics and Space Administration</h6> -->
          <h5 class="mt-1 mb-0">
            National Aeronautics and Space Administration
          </h5>
          <!-- <h6 class='mt-0 mb-0' style="line-height:25px">National Aeronautics<br> and Space Administration</h6> -->
        </div>
        <div
          id="useful-links"
          class="collapse d-lg-block"
          data-bs-parent="#footer-links"
        >
          <ul class="nav flex-column pb-lg-1 mb-lg-0 mt-3">
            <li><span class="h6">NASA Official: </span> Daniel Kocevski</li>
            <li><span class="h6">Page Editor: </span> Daniel Kocevski</li>
            <li>
              <span class="h6">Page Last Updated: </span> August 21st, 2022
            </li>
          </ul>
          <!--  <div class="form-check form-switch mode-switch pt-1" data-bs-toggle="mode">
                <input type="checkbox" class="form-check-input" id="theme-mode">
                <label class="form-check-label d-none d-sm-block" for="theme-mode">Light</label>
                <label class="form-check-label d-none d-sm-block" for="theme-mode">Dark</label>
              </div> -->
        </div>
        <p class="pt-5">
          <a href="https://www.nasa.gov/about/highlights/HP_Privacy.html"
            >Privacy Policy</a
          >
          &nbsp;| &nbsp;
          <a href="http://odeo.hq.nasa.gov/nofear.html">No Fear Act</a>
          &nbsp;| &nbsp;
          <a href="https://www.nasa.gov/FOIA/index.html">FOIA</a>
          &nbsp;| &nbsp;
          <a href="https://www.nasa.gov/about/highlights/HP_Privacy.html"
            >Contact Us</a
          >
        </p>
      </div>

      <div
        class="col-xl-6 col-lg-7 col-md-5 offset-xl-2 offset-md-1 pt-4 pt-md-1 pt-lg-0"
      >
        <div id="footer-links" class="row">
          <div class="col-lg-4">
            <h6 class="mb-2">
              <a
                href="#useful-links"
                class="d-block text-dark dropdown-toggle d-lg-none py-2"
                data-bs-toggle="collapse">Useful Links</a
              >
            </h6>

            <!-- Empty Column -->
            <div
              id="useful-links"
              class="collapse d-lg-block"
              data-bs-parent="#footer-links"
            ></div>
          </div>

          <!-- ACROSS Column -->
          <div class="col-lg-4 col-lg-5 mt-5 pt-5 pt-lg-0 text-end">
            <h5 class="mb-0 mt-4">
              <a
                class="nav nav-link d-inline-block px-0 pt-0 pb-0"
                href="about.html">ACROSS</a
              >
            </h5>
            <div
              id="useful-links"
              class="collapse d-lg-block"
              data-bs-parent="#footer-links"
            >
              <ul class="nav flex-column pb-lg-1 mb-lg-0 mt-0">
                <li class="nav-item">
                  <a
                    href="index.html"
                    class="nav-link d-inline-block px-0 pt-0 pb-0 mt-1"
                    >multimessenger.nasa.gov</a
                  >
                </li>
                <li>
                  <a
                    href="http://gsfc.nasa.gov"
                    class="nav-link d-inline-block px-0 pt-0 pb-0"
                    >Goddard Space Flight Center</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="http://mfsc.nasa.gov"
                    class="nav-link d-inline-block px-0 pt-0 pb-0"
                    >Marshall Space Flight Center</a
                  >
                </li>
              </ul>
            </div>

            <div class="mb-4 pb-lg-3 mt-4 float-end">
              <div
                class="form-check form-switch mode-switch pt-1"
                data-bs-toggle="mode"
              >
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="theme-mode"
                />
                <label
                  class="form-check-label d-none d-sm-block"
                  for="theme-mode">Light</label
                >
                <label
                  class="form-check-label d-none d-sm-block"
                  for="theme-mode">Dark</label
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>

<!-- Back to top button -->
<a href="#top" class="btn-scroll-top" data-scroll>
  <span class="btn-scroll-top-tooltip text-muted fs-sm me-2">Top</span>
  <i class="btn-scroll-top-icon bx bx-chevron-up"></i>
</a>

<div>
  <!-- Vendor Scripts -->
  <script
    src="{base}/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"
  ></script>
  <script
    src="{base}/assets/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js"
  ></script>
  <script src="{base}/assets/vendor/jarallax/dist/jarallax.min.js "></script>
  <script src="{base}/assets/vendor/lightgallery/lightgallery.min.js"></script>
  <script src="{base}/assets/vendor/lightgallery/plugins/zoom/lg-zoom.min.js"></script>
  <script
    src="{base}/assets/vendor/lightgallery/plugins/fullscreen/lg-fullscreen.min.js"
  ></script>
  <script
    src="{base}/assets/vendor/lightgallery/plugins/video/lg-video.min.js"
  ></script>
  <script src="{base}/assets/vendor/swiper/swiper-bundle.min.js"></script>
  <script src="{base}/assets/vendor/rellax/rellax.min.js"></script>

  <!-- Main Theme Script -->
  <script src="{base}/assets/js/theme.min.js"></script>
</div>

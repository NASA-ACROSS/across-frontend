<script lang="ts">
  import { base } from "$app/paths";
</script>

<!-- Page wrapper for sticky footer -->
<!-- Wraps everything except footer to push footer to the bottom of the page if there is little content -->
<main class="page-wrapper">
  <!-- Breadcrumb -->
  <nav class="container py-4 mb-2 my-lg-3" aria-label="breadcrumb">
    <!-- <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item">
            <a href="index.html"><i class="bx bx-home-alt fs-lg me-1"></i>Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Proposal Opportunities</li>
        </ol> -->
  </nav>

  <!-- Post content + Sharing -->
  <section class="container pb-5 mb-md-2 mb-lg-4">
    <div class="row gy-4">
      <!-- Content -->
      <div class="col-lg-9">
        <div id="proposals"></div>
        <h1 class="border-bottom pb-4" id="Overview">Tools and Resources</h1>

        <div id="overview"></div>
        <h2 class="h4">Overview</h2>

        <p class="mb-4 pb-2">
          Supporting research in science and technology is an important part of
          NASA's overall mission. NASA solicits this research through the
          release of various research announcements in a wide range of science
          and technology disciplines. Basic and applied research in support of
          NASA’s Science Mission Directorate (SMD) is solicited through the
          Research Opportunities in Space and Earth Sciences (ROSES) research
          announcement (NRA). Through this ROSES NRA, NASA encourages the
          participation of the space and Earth science communities in SMD’s
          research and technology programs. These programs form the foundation
          of both the basic and applied research opportunities that allows
          NASA’s space and Earth science programs realize the Strategic
          Objectives of NASA and the SMD.
        </p>

        <div id="programs"></div>
        <h2 class="h4">Rapid Reporting Tools</h2>

        <p class="mb-0 pb-0">
          Real-time messaging systems are pivotal in enabling multimessenger astronomy by facilitating the rapid and efficient sharing of observational data across the global scientific community. These systems provide prompt notifications of transient astrophysical events, such as gamma-ray bursts, gravitational waves, and neutrino detections, allowing astronomers to coordinate observations using various instruments and across different wavelengths. This timely dissemination of information is crucial for capturing fleeting signals and gaining a comprehensive understanding of the dynamic and often elusive phenomena in the universe.
        </p>

        <div class="row row-cols-2 row-cols-md-2 g-4 pt-2 pt-md-4 pb-lg-2 mb-5">
          <!-- Item -->
          <div class="col">
            <div class="card bg-secondary border-0 flex-column flex-sm-row flex-md-column flex-xxl-row align-items-top card-hover border-primary h-100">
              <!-- <img src="assets/img/landing/medical/icons/doctor.svg" alt="Doctor icon"> -->
              <div class="card-body text-center text-sm-start text-md-center text-xxl-start pb-3 pb-sm-2 pb-md-3 pb-xxl-2 text-align-top">
                <h3 class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0">
                  The General Coordinates Network
                </h3>
                <p class="fs-sm mb-1">
                  The General Coordinates Network (GCN) is a public collaboration platform run by NASA for the astronomy research community to share alerts and rapid communications about high-energy, multimessenger, and transient phenomena.
                </p>
                <a
                  href="https://science.nasa.gov/researchers/sara/grant-solicitations"
                  class="btn btn-link stretched-link px-0"
                >
                  Visit gcn.nasa.gov
                  <i class="bx bx-right-arrow-alt fs-xl ms-1"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Item -->
          <div class="col">
            <div
              class="card bg-secondary border-0 flex-column flex-sm-row flex-md-column flex-xxl-row align-items-top card-hover border-primary h-100"
            >
              <!-- <img src="assets/img/landing/medical/icons/doctor.svg" width="168" alt="Doctor icon"> -->
              <div
                class="card-body text-center text-sm-start text-md-center text-xxl-start pb-3 pb-sm-2 pb-md-3 pb-xxl-2"
              >
                <h3 class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0">
                  HOPSKOTCH
                </h3>
                <p class="fs-sm mb-1">
                  Hop.SCIMMA is an NSF funded hub providing real-time streams of candidate discoveries from MMA experiments. Hop.SCIMMA allows observatories to publish streams of candidates and discoveries, and scientists, brokers, and TOMs to subscribe to these streams.
                </p>
                <a
                  href="https://nspires.nasaprs.com/external/viewrepositorydocument/cmdocumentid=735966/solicitationId=%7BBCEE336B-D550-CCBA-1C8C-7A866DB06F45%7D/viewSolicitationDocument=1/FULL%20ROSES-2020_Amend89.pdf"
                  class="btn btn-link stretched-link px-0"
                >
                Visit hop.scimma.org
                  <i class="bx bx-right-arrow-alt fs-xl ms-1"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Item -->
          <div class="col">
            <div
              class="card bg-secondary border-0 flex-column flex-sm-row flex-md-column flex-xxl-row align-items-top card-hover border-primary h-100"
            >
              <!-- <img src="assets/img/landing/medical/icons/doctor.svg" width="168" alt="Doctor icon"> -->
              <div
                class="card-body text-center text-sm-start text-md-center text-xxl-start pb-3 pb-sm-2 pb-md-3 pb-xxl-2"
              >
                <h3 class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0">
                  The Astronomer's Telegrams
                </h3>
                <p class="fs-sm mb-1">
                  Email notices for the reporting new astronomical observations of transient sources.
                </p>
                <a
                  href="https://nspires.nasaprs.com"
                  class="btn btn-link stretched-link px-0"
                >
                  Visit astronomerstelegram.org
                  <i class="bx bx-right-arrow-alt fs-xl ms-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div id="programs"></div>
        <h2 class="h4">Data Analysis Toolkits</h2>

        <p class="mb-0 pb-0">
          Windows on the Universe: The era of Multi-Messenger Astrophysics
          (WoU-MMA) is one of the 10 Big Ideas that will drive NSF’s long-term
          research agenda.
        </p>

        <div class="row row-cols-1 row-cols-md-3 g-4 pt-2 pt-md-4 pb-lg-2 mb-5">
          <!-- Item -->
          <div class="col">
            <div
              class="card bg-secondary border-0 flex-column flex-sm-row flex-md-column flex-xxl-row align-items-top card-hover border-primary h-100"
            >
              <!-- <img src="assets/img/landing/medical/icons/doctor.svg" width="168" alt="Doctor icon"> -->
              <div
                class="card-body text-center text-sm-start text-md-center text-xxl-start pb-3 pb-sm-2 pb-md-3 pb-xxl-2 text-align-top"
              >
                <h3 class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0">
                  Neil Gehrels Swift Observatory Guest Investigator Program
                </h3>
                <p class="fs-sm mb-1">
                  Cycle 19 proposals are due Thursday, September 22, 2022
                </p>
                <a
                  href="https://swift.gsfc.nasa.gov/proposals/swiftgi.html"
                  class="btn btn-link stretched-link px-0"
                >
                  Learn More
                  <i class="bx bx-right-arrow-alt fs-xl ms-1"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Item -->
          <div class="col">
            <div
              class="card bg-secondary border-0 flex-column flex-sm-row flex-md-column flex-xxl-row align-items-top card-hover border-primary h-100"
            >
              <!-- <img src="assets/img/landing/medical/icons/doctor.svg" width="168" alt="Doctor icon"> -->
              <div
                class="card-body text-center text-sm-start text-md-center text-xxl-start pb-3 pb-sm-2 pb-md-3 pb-xxl-2 text-align-top"
              >
                <h3 class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0">
                  Hubble Space Telescope Observations
                </h3>
                <p class="fs-sm mb-1">
                  Cycle 30 1st Mid-Cycle proposals due September 30, 2022
                </p>
                <a
                  href="https://hst-docs.stsci.edu/hsp"
                  class="btn btn-link stretched-link px-0"
                >
                  Learn More
                  <i class="bx bx-right-arrow-alt fs-xl ms-1"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Item -->
          <div class="col">
            <div
              class="card bg-secondary border-0 flex-column flex-sm-row flex-md-column flex-xxl-row align-items-top card-hover border-primary h-100"
            >
              <!-- <img src="assets/img/landing/medical/icons/doctor.svg" width="168" alt="Doctor icon"> -->
              <div
                class="card-body text-center text-sm-start text-md-center text-xxl-start pb-3 pb-sm-2 pb-md-3 pb-xxl-2 text-align-top"
              >
                <h3 class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0">
                  Fermi Guest Investigator Program
                </h3>
                <p class="fs-sm mb-1">
                  Cycle 16 proposals are due in early 2023
                </p>
                <a
                  href="https://fermi.gsfc.nasa.gov/ssc/proposals/"
                  class="btn btn-link stretched-link px-0"
                >
                  Learn More
                  <i class="bx bx-right-arrow-alt fs-xl ms-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div id="resources"></div>
        <h2 class="h5 pt-3">Observations Planning Tools</h2>
        <p class="mb-0 pb-0">
          Windows on the Universe: The era of Multi-Messenger Astrophysics
          (WoU-MMA) is one of the 10 Big Ideas that will drive NSF’s long-term
          research agenda. 
        </p>

        <div class="row row-cols-1 row-cols-md-3 g-4 pt-2 pt-md-4 pb-lg-2 mb-5">
          <!-- Item -->
          <div class="col">
            <div
              class="card bg-secondary border-0 flex-column flex-sm-row flex-md-column flex-xxl-row align-items-top card-hover border-primary h-100"
            >
              <!-- <img src="assets/img/landing/medical/icons/doctor.svg" width="168" alt="Doctor icon"> -->
              <div
                class="card-body text-center text-sm-start text-md-center text-xxl-start pb-3 pb-sm-2 pb-md-3 pb-xxl-2 text-align-top"
              >
                <h3 class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0">
                  Astronomy and Astrophysics Research Grants (AAG)
                </h3>
                <p class="fs-sm mb-1">Annual deadline 15 November.</p>
                <a href="#" class="btn btn-link stretched-link px-0">
                  Learn More
                  <i class="bx bx-right-arrow-alt fs-xl ms-1"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Item -->
          <div class="col">
            <div
              class="card bg-secondary border-0 flex-column flex-sm-row flex-md-column flex-xxl-row align-items-top card-hover border-primary h-100"
            >
              <!-- <img src="assets/img/landing/medical/icons/doctor.svg" width="168" alt="Doctor icon"> -->
              <div
                class="card-body text-center text-sm-start text-md-center text-xxl-start pb-3 pb-sm-2 pb-md-3 pb-xxl-2"
              >
                <h3 class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0">
                  Division of Physics: Investigator-Initiated Research Projects
                  (PHY)
                </h3>
                <p class="fs-sm mb-1">
                  Annual deadlines in November and December.
                </p>
                <a href="#" class="btn btn-link stretched-link px-0">
                  Learn More
                  <i class="bx bx-right-arrow-alt fs-xl ms-1"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Item -->
          <div class="col">
            <div
              class="card bg-secondary border-0 flex-column flex-sm-row flex-md-column flex-xxl-row align-items-top card-hover border-primary h-100"
            >
              <!-- <img src="assets/img/landing/medical/icons/doctor.svg" width="168" alt="Doctor icon"> -->
              <div
                class="card-body text-center text-sm-start text-md-center text-xxl-start pb-3 pb-sm-2 pb-md-3 pb-xxl-2"
              >
                <h3 class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0">
                  Faculty Early Career Development Program (CAREER)
                </h3>
                <p class="fs-sm mb-1">
                  Annual deadline fourth Wednesday every year.
                </p>
                <a href="#" class="btn btn-link stretched-link px-0">
                  Read More
                  <i class="bx bx-right-arrow-alt fs-xl ms-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div id="resources"></div>
        <h2 class="h5 pt-3">Data Archives & Repositories</h2>
        <p class="mb-0 pb-0">
          Windows on the Universe: The era of Multi-Messenger Astrophysics
          (WoU-MMA) is one of the 10 Big Ideas that will drive NSF’s long-term
          research agenda.
        </p>

        <div class="row row-cols-1 row-cols-md-3 g-4 pt-2 pt-md-4 pb-lg-2 mb-5">
          <!-- Item -->
          <div class="col">
            <div
              class="card bg-secondary border-0 flex-column flex-sm-row flex-md-column flex-xxl-row align-items-top card-hover border-primary h-100"
            >
              <!-- <img src="assets/img/landing/medical/icons/doctor.svg" width="168" alt="Doctor icon"> -->
              <div
                class="card-body text-center text-sm-start text-md-center text-xxl-start pb-3 pb-sm-2 pb-md-3 pb-xxl-2 text-align-top"
              >
                <h3 class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0">
                  Astronomy and Astrophysics Research Grants (AAG)
                </h3>
                <p class="fs-sm mb-1">Annual deadline 15 November.</p>
                <a href="#" class="btn btn-link stretched-link px-0">
                  Learn More
                  <i class="bx bx-right-arrow-alt fs-xl ms-1"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Item -->
          <div class="col">
            <div
              class="card bg-secondary border-0 flex-column flex-sm-row flex-md-column flex-xxl-row align-items-top card-hover border-primary h-100"
            >
              <!-- <img src="assets/img/landing/medical/icons/doctor.svg" width="168" alt="Doctor icon"> -->
              <div
                class="card-body text-center text-sm-start text-md-center text-xxl-start pb-3 pb-sm-2 pb-md-3 pb-xxl-2"
              >
                <h3 class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0">
                  Division of Physics: Investigator-Initiated Research Projects
                  (PHY)
                </h3>
                <p class="fs-sm mb-1">
                  Annual deadlines in November and December.
                </p>
                <a href="#" class="btn btn-link stretched-link px-0">
                  Learn More
                  <i class="bx bx-right-arrow-alt fs-xl ms-1"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Item -->
          <div class="col">
            <div
              class="card bg-secondary border-0 flex-column flex-sm-row flex-md-column flex-xxl-row align-items-top card-hover border-primary h-100"
            >
              <!-- <img src="assets/img/landing/medical/icons/doctor.svg" width="168" alt="Doctor icon"> -->
              <div
                class="card-body text-center text-sm-start text-md-center text-xxl-start pb-3 pb-sm-2 pb-md-3 pb-xxl-2"
              >
                <h3 class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0">
                  Faculty Early Career Development Program (CAREER)
                </h3>
                <p class="fs-sm mb-1">
                  Annual deadline fourth Wednesday every year.
                </p>
                <a href="#" class="btn btn-link stretched-link px-0">
                  Read More
                  <i class="bx bx-right-arrow-alt fs-xl ms-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>      </div>

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
                    <a class="nav nav-link p-0" href="#overview">Overview</a>
                  </div>
                </li>

                <li class="pb-1 mb-1">
                  <div class="mb-0">
                    <a class="nav nav-link p-0" href="#gops"
                      >Guest Observer & Investigator Programs</a
                    >
                  </div>
                </li>

                <li class="pb-1 mb-1">
                  <div class="mb-0">
                    <a class="nav nav-link p-0" href="#joint"
                      >Joint Observing Opportunities</a
                    >
                  </div>
                </li>

                <li class="pb-1 mb-1">
                  <div class="mb-0">
                    <a class="nav nav-link p-0" href="#resources"
                      >Complementary Opportunities</a
                    >
                  </div>
                </li>
              </ul>
            </div>
          </div>

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
</main>

<script lang="ts">
  import { base } from "$app/paths";
</script>

<!-- Page wrapper for sticky footer -->
<!-- Wraps everything except footer to push footer to the bottom of the page if there is little content -->
<main class="page-wrapper">
  <!-- Page image (parallax) -->
  <div
    class="jarallax mb-lg-5 mb-4"
    data-jarallax
    data-speed="0.35"
    style="height: 36.45vw; min-height: 300px;"
  >
    <div
      class="jarallax-img"
      style="background-image: url({base}/assets/img/landing/conference/video-cover.jpg);"
    ></div>
  </div>

  <!-- Breadcrumb -->
  <nav class="container py-4 mb-2 my-lg-3" aria-label="breadcrumb">
    <!-- <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item">
            <a href="index.html"><i class="bx bx-home-alt fs-lg me-1"></i>Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Conferences</li>
        </ol> -->
  </nav>

  <!-- Title -->
  <section class="container pb-5 mb-md-2 mb-lg-4">
    <div class="row gy-4">
      <h1 class="border-bottom pb-4" id="Overview">Conferences</h1>
    </div>
  </section>

  <!-- Featured Conferences -->
  <section class="container pb-5 mb-2 mb-md-4 mb-lg-5 mt-n3 mt-lg-0">
    <div class="row gy-4">
      <div class="col-xl-5 col-lg-6 position-relative py-0">
        <div
          class="position-relative zindex-5 text-center text-lg-start px-3 px-lg-0 py-xl-0 py-xxl-0 mt-lg-0 mx-auto mx-lg-0"
          style="max-width: 530px;"
        >
          <h2 class="h3 text-primary">Aug 22-24, 2022</h2>
          <h2 class="h2 pb-lg-3 mb-3">
            Time-Domain and Multimessenger (TDAMM) Workshop
          </h2>
          <div
            class="d-flex justify-content-center justify-content-lg-start text-start mb-2"
          >
            <i class="bx bx-map fs-4 text-primary me-2"></i>
            <div class="fs-xl">
              International Convention Centre,<br />Annapolis, MD
            </div>
          </div>
          <div
            class="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start py-4 py-lg-5"
          >
            <a
              href="https://pcos.gsfc.nasa.gov/TDAMM"
              class="btn btn-primary shadow-primary btn-lg me-sm-3 me-xl-4 mb-3"
            >
              Learn more
              <i class="bx bx-right-arrow-alt fs-xl ms-2 me-n1"></i>
            </a>
            <a href="#" class="btn btn-outline-primary btn-lg mb-3">
              <i class="bx bx-calendar-check fs-xl me-2 ms-n1"></i>
              Add to calendar
            </a>
          </div>
        </div>
      </div>
      <div class="col-xl-7 col-lg-6 pe-lg-5">
        <div class="d-flex h-100 pe-xl-4">
          <!-- Ticket card -->
          <div class="position-relative">
            <div
              class="position-relative overflow-hidden bg-gradient-primary rounded-3 zindex-5 py-5 px-4 p-sm-5"
            >
              <span
                class="position-absolute top-50 start-0 translate-middle bg-light rounded-circle p-4"
              ></span>
              <span
                class="position-absolute top-0 start-0 w-100 h-100 bg-repeat-0 bg-position-center-end bg-size-cover"
                style="background-image: url({base}/assets/img/landing/conference/price-card-pattern.png);"
              ></span>
              <div class="px-md-4 position-relative zindex-5">
                <div
                  class="d-sm-flex align-items-start justify-content-between"
                >
                  <div class="text-center text-sm-start me-sm-4">
                    <div
                      class="lead fw-semibold text-light text-uppercase mb-2"
                    >
                      Aug 22-24, 2022
                    </div>
                    <h3 class="h1 text-light">TDAMM Workshop</h3>
                    <span class="fs-lg text-light me-2">Annapolis, MD</span>
                  </div>
                  <div
                    class="d-table bg-white rounded-3 p-4 flex-shrink-0 mx-auto mx-sm-0"
                  >
                    <img
                      src="{base}/assets/img/landing/conference/qr.png"
                      width="102"
                      alt="QR Code"
                    />
                  </div>
                </div>
                <div
                  class="d-flex flex-column flex-sm-row align-items-center pt-4 mt-2"
                >
                  <!-- <a href="#" class="btn btn-light btn-lg mb-3 mb-sm-0 me-sm-3">Register</a> -->
                  <div class="d-flex align-items-center">
                    <span class="fs-lg text-light me-2"
                      >Registation Deadline: July 30th, 2022</span
                    >
                    <span class="h4 text-light mb-0"></span>
                  </div>
                </div>
              </div>
              <span
                class="position-absolute top-50 end-0 translate-middle-y bg-light rounded-circle p-4 me-n4"
              ></span>
            </div>
            <span
              class="position-absolute bg-gradient-primary opacity-60 bottom-0 mb-n2 d-dark-mode-none"
              style="left: 1.5rem; width: calc(100% - 3rem); height: 5rem; filter: blur(.625rem);"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Upcoming and past conferences -->
  <section class="container pb-5 mb-2 mb-md-4 mb-lg-5 mt-n3 mt-lg-0">
    <div>
      <div id="upcoming"></div>
      <h2 class="h2">Upcoming Conferences</h2>
      <p class="mb-4 pb-2">
        Although not exhaustive, below is a selected list of upcoming
        conferences that are of particular interest to the multimessenger
        community. Please feel free to contact us if you would like to see a
        conference added to this list!
      </p>

      <!-- Dark table with striped rows -->
      <div class="table-responsive">
        <table class="table table-dark table-striped align-middle">
          <thead>
            <tr>
              <th style="max-width:20px">Conference</th>
              <th>Location</th>
              <th>Date</th>
              <th>Registration Deadline</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                ><a
                  href="https://www.dunlap.utoronto.ca/hotwired7/ "
                  class="nav nav-link p-0">Hot-Wiring the Transient Universe</a
                ></th
              >
              <td>Toronto, Canada</td>
              <td>May 13-16, 2024</td>
              <td>May 10, 2024 (online attendance)</td>
            </tr>
            <tr>
              <th
                ><a
                  href="https://spie.org/conferences-and-exhibitions/astronomical-telescopes-and-instrumentation"
                  class="nav nav-link p-0"
                  >SPIE Astronomical Telescopes + Instrumentation</a
                ></th
              >
              <td>Yokohama , Japan</td>
              <td>June 15-18, 2024</td>
              <td>May 31, 2024</td>
            </tr>
            <tr>
              <th scope="row"
                ><a
                  href="https://pcos.gsfc.nasa.gov/sags/figsag/events/workshops/June-2024/June-2024.php"
                  class="nav nav-link p-0"
                  >Future Innovations in Gamma Rays (FIG SAG) Workshop</a
                ></th
              >
              <td>Houghton, Michigan</td>
              <td>June 24-28, 2024</td>
              <td>April 30, 2024 (abstracts)</td>
            </tr>
            <tr>
              <th scope="row"
                ><a
                  href="https://sites.google.com/view/grbforum2024/overview"
                  class="nav nav-link p-0">Gamma Ray Burst Forum 2024</a
                ></th
              >
              <td>Athens, Greece</td>
              <td>July 8-12, 2024</td>
              <td>May 15, 2024 (abstracts due April 30)</td>
            </tr>
            <tr>
              <th scope="row"
                ><a
                  href="https://www.cospar2024.org/"
                  class="nav nav-link p-0">45th COSPAR Scientific Assembly</a
                ></th
              >
              <td>Busan, South Korea</td>
              <td>July 13-21, 2024</td>
              <td>June 3, 2024 (July 5 for late registration)</td>
            </tr>
            <tr>
              <th scope="row"
                ><a href="https://astronomy2024.org/" class="nav nav-link p-0"
                  >32nd IAU General Assembly</a
                ></th
              >
              <td>Cape Town, South Africa</td>
              <td>August 6-15, 2024</td>
              <td>May 31, 2024 (Aug 15 for late registration)</td>
            </tr>
	    <tr>
              <th scope="row"
                ><a
                  href="https://indico.uchicago.edu/event/427/overview"
                  class="nav nav-link p-0">TeV Particle Astrophysics</a
                ></th
              >
              <td>Chicago, Illnois</td>
              <td>August 26-30, 2024</td>
              <td>June 1, 2024</td>
            </tr>
	    <tr>
              <th scope="row"
                ><a
                  href="https://indico.ict.inaf.it/event/2661/overview"
                  class="nav nav-link p-0">Gamma 2024</a
                ></th
              >
              <td>Milan, Italy</td>
              <td>September 2-6, 2024</td>
              <td>August 1, 2024 (abstracts due June 1)</td>
            </tr>
	    <tr>
              <th scope="row"
                ><a
                  href="https://fermi.gsfc.nasa.gov/science/mtgs/symposia/eleventh/"
                  class="nav nav-link p-0">11th International Fermi Symposium</a
                ></th
              >
              <td>College Park, Maryland</td>
              <td>September 9-13, 2024</td>
              <td>Augst 1, 2024 (abstracts due May 1)</td>
            </tr>
	    <tr>
              <th scope="row"
                ><a
                  href="https://sites.google.com/view/3rd-tdamm-workshop/home"
                  class="nav nav-link p-0">Multidisciplinary Science
      in the Multimessenger Era (3rd TDAMM Workshop)</a
                ></th
              >
              <td>Baton Rouge, Louisiana</td>
              <td>September 23-26, 2024</td>
              <td>July 23, 2024</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="past"></div>
      <h2 class="h2 mt-5">Past Conferences</h2>
      <!-- <p class="mb-4 pb-2">Purus ornare nisl est nec. Nunc, enim tellus pretium viverra quisque id in metus volutpat. Urna eget velit venenatis, commodo eget massa. Magna donec dictum cras nullam platea. Diam rhoncus massa lectus pellentesque tristique. Amet commodo, egestas vitae bibendum. Volutpat elit condimentum integer tortor porttitor justo vel lobortis risus. Lacinia pellentesque fermentum tellus orci mauris, velit duis eget. Commodo justo, hac ligula molestie felis, iaculis. Vitae dui at ante orci, dictum fusce. Urna, sed urna fringilla faucibus euismod aliquet nec. Quis libero, fermentum amet eu, condimentum auctor. Sit vel ipsum sem tempus gravida et. Scelerisque blandit orci, est quis. Nisi, tellus amet est nascetur habitant faucibus ornare et vivamus.</p> -->

      <!-- Dark table with striped rows -->
      <div class="table-responsive">
        <table class="table table-dark table-striped align-middle">
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
              <th style="max-width: 275px;"
                ><a
                  href="https://noirlab.edu/science/events/websites/MMA2023"
                  class="nav nav-link p-0"
                  >Windows on the Universe: Establishing the
      Infrastructure for a Collaborative Multi-messenger Ecosystem (2st TDAMM Workshop)</a
                ></th
              >
              <td>Tucson, Arizona</td>
              <td>October 16-18, 2023</td>
              <td></td>
            </tr>	    
            <tr>
              <th style="max-width: 275px;"
                ><a
                  href="https://pcos.gsfc.nasa.gov/TDAMM/"
                  class="nav nav-link p-0"
                  >The 1st TDAMM Workshop</a
                ></th
              >
              <td>Anapolis, Maryland</td>
              <td>August 22–24, 2022</td>
              <td>July 30, 2022</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Resources -->
  <section class="container pb-0 mb-2 mb-md-4 mb-lg-5 mt-n3 mt-lg-0">
    <div>
      <div id="resources"></div>
      <h2 class="h2 mt-5">Presentation Resources</h2>
      <p class="mb-4 pb-2">
        NASA's <a class="btn-link" href="https://svs.gsfc.nasa.gov"
          >Scientific Visualization Studio</a
        >
        and Goddard Media Studios have produced several
        <a
          class="btn-link"
          href="https://svs.gsfc.nasa.gov/Gallery/Multimessengerastronomy.html"
          >excellent resources</a
        > on multimessenger discoveries over the years. These visualizations, animations,
        and images are available to the community to help promote a greater understanding
        of multimessenger astrophysics to the genereal public and within the academic
        research community. Below is a selected list of resources produced in recent
        years.
      </p>
    </div>
  </section>

  <!-- Portfolio grid -->
  <section class="container pb-5 mb-2 mb-md-4 mb-lg-5">
    <div class="row pb-lg-3">
      <!-- GRB 170817 -->
      <div class="col-md-5 mb-2">
        <div class="card card-portfolio">
          <div class="card-img">
            <img
              src="{base}/assets/img/custom/AT2019dsg_prores_still_cropped2.jpg"
              alt="Image"
              style="height: 400px; min-height: 400px;"
            />
          </div>
          <div class="card-body">
            <h2 class="h5 mb-2">
              <a href="https://svs.gsfc.nasa.gov/13805" class="stretched-link"
                >Swift Links Neutrino to Star-destroying Black Hole</a
              >
            </h2>
            <div class="">
              <span class="text-muted">Feburary 22, 2021</span>
            </div>
          </div>
        </div>
      </div>

      <!-- GRB 170817 -->
      <div class="col-md-7 mb-2">
        <div class="card card-portfolio">
          <div class="card-img">
            <img
              src="{base}/assets/img/custom/Neutron_Star_Merger_Still_2_new_print.jpg"
              alt="Image"
              style="height: 400px; min-height: 400px;"
            />
          </div>
          <div class="card-body">
            <h2 class="h5 mb-2">
              <a href="https://svs.gsfc.nasa.gov/12740" class="stretched-link"
                >Doomed Neutron Stars Create Blast of Light and Gravitational
                Waves</a
              >
            </h2>
            <div class="">
              <span class="text-muted">October 16, 2017</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Item -->
      <div class="col-md-7 mb-2">
        <div class="card card-portfolio">
          <div class="card-img">
            <img
              src="{base}/assets/img/custom/UniverseHD1845_print.jpg"
              alt="Image"
              style="height: 400px; min-height: 400px;"
            />
          </div>
          <div class="card-body">
            <h2 class="h5 mb-2">
              <a href="https://svs.gsfc.nasa.gov/12218" class="stretched-link"
                >Fermi Helps Link a Cosmic Neutrino to a Blazar Outburst</a
              >
            </h2>
            <div class="">
              <span class="text-muted">April 28, 2016</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Item -->
      <div class="col-md-5 mb-2">
        <div class="card card-portfolio">
          <div class="card-img">
            <img
              src="{base}/assets/img/custom/Fermi_neutrinos2.png"
              alt="Image"
              style="height: 400px; min-height: 400px;"
            />
          </div>
          <div class="card-body">
            <h2 class="h5 mb-2">
              <a href="https://svs.gsfc.nasa.gov/12994" class="stretched-link"
                >NASA's Fermi Links Cosmic Neutrino to Monster Black Hole</a
              >
            </h2>
            <div class="">
              <span class="text-muted">July 12, 2018</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Item -->
      <div class="col-md-5 mb-2">
        <div class="card card-portfolio">
          <div class="card-img">
            <img
              src="{base}/assets/img/custom/chandra_sagittarius_a_20150105_print_cropped.png"
              alt="Image"
              style="height: 400px; min-height: 400px;"
            />
          </div>
          <div class="card-body">
            <h2 class="h5 mb-2">
              <a href="https://svs.gsfc.nasa.gov/30576" class="stretched-link"
                >X-ray Telescopes Find Black Hole May Be a Neutrino Factory</a
              >
            </h2>
            <div class="">
              <span class="text-muted">January 15, 2015</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Item -->
      <div class="col-md-7 mb-2">
        <div class="card card-portfolio">
          <div class="card-img">
            <img
              src="{base}/assets/img/custom/Neutron_Star_Merger_Still_1_1024x576.jpg"
              alt="Image"
              style="height: 400px; min-height: 400px;"
            />
          </div>
          <div class="card-body">
            <h2 class="h5 mb-2">
              <a href="https://svs.gsfc.nasa.gov/12949" class="stretched-link"
                >Star Collision</a
              >
            </h2>
            <div class="">
              <span class="text-muted">July 2, 2018</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contacts -->
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
            Want to see a conference added to this list?
          </h3>
          <a href="mailto:daniel.kocevski@nasa.gov" class="display-6 text-light"
            >Contact us!</a
          >
          <div class="pt-md-5 pt-4 pb-md-2">
            <!-- <a href="mailto:daniel.kocevski@nasa.gov" class="btn btn-lg btn-light">Contact us!</a> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

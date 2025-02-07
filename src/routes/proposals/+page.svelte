<script lang="ts">
    import JointFacilitiesTable from './_components/JointFacilitiesTable.svelte';
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
                <h1 class="border-bottom pb-4" id="Overview">
                    Proposal Opportunities
                </h1>

                <div id="overview"></div>
                <h2 class="h4">Overview</h2>

                <p class="mb-4 pb-2">
                    Supporting research in science and technology is an
                    important part of NASA's overall mission. NASA solicits this
                    research through the release of various research
                    announcements in a wide range of science and technology
                    disciplines. Basic and applied research in support of NASA’s
                    Science Mission Directorate (SMD) is solicited through the
                    Research Opportunities in Space and Earth Sciences (ROSES)
                    research announcement (NRA). Through this ROSES NRA, NASA
                    encourages the participation of the space and Earth science
                    communities in SMD’s research and technology programs. These
                    programs form the foundation of both the basic and applied
                    research opportunities that allows NASA’s space and Earth
                    science programs realize the Strategic Objectives of NASA
                    and the SMD.
                </p>

                <div
                    class="row row-cols-1 row-cols-md-3 g-4 pt-2 pt-md-4 pb-lg-2 mb-5"
                >
                    <!-- Item -->
                    <div class="col">
                        <div
                            class="card bg-secondary border-0 flex-column flex-sm-row flex-md-column flex-xxl-row align-items-top card-hover border-primary h-100"
                        >
                            <!-- <img src="assets/img/landing/medical/icons/doctor.svg" width="168" alt="Doctor icon"> -->
                            <div
                                class="card-body text-center text-sm-start text-md-center text-xxl-start pb-3 pb-sm-2 pb-md-3 pb-xxl-2 text-align-top"
                            >
                                <h3
                                    class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0"
                                >
                                    Science @ NASA
                                </h3>
                                <p class="fs-sm mb-1">
                                    Science.nasa.gov provides a high level
                                    overview of NASA funding opportunities and
                                    links to proposal development resources.
                                </p>
                                <a
                                    href="https://science.nasa.gov/researchers/sara/grant-solicitations"
                                    class="btn btn-link stretched-link px-0"
                                >
                                    Visit science.nasa.gov
                                    <i class="bx bx-right-arrow-alt fs-xl ms-1"
                                    ></i>
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
                                <h3
                                    class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0"
                                >
                                    ROSES 2022
                                </h3>
                                <p class="fs-sm mb-1">
                                    The Research Opportunities in Space and
                                    Earth Sciences (ROSES) 2022 is an omnibus
                                    announcement and the comprehensive list of
                                    NASA's funding opportunities.
                                </p>
                                <a
                                    href="https://nspires.nasaprs.com/external/viewrepositorydocument/cmdocumentid=735966/solicitationId=%7BBCEE336B-D550-CCBA-1C8C-7A866DB06F45%7D/viewSolicitationDocument=1/FULL%20ROSES-2020_Amend89.pdf"
                                    class="btn btn-link stretched-link px-0"
                                >
                                    Read ROSES 2020
                                    <i class="bx bx-right-arrow-alt fs-xl ms-1"
                                    ></i>
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
                                <h3
                                    class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0"
                                >
                                    NASA NSPIRES
                                </h3>
                                <p class="fs-sm mb-1">
                                    The NASA Solicitation and Proposal
                                    Integrated Review and Evaluation System
                                    (NSPIRES) allows users to search for and
                                    view future, open, and past NASA research
                                    announcements.
                                </p>
                                <a
                                    href="https://nspires.nasaprs.com"
                                    class="btn btn-link stretched-link px-0"
                                >
                                    Visit nspires.nasaprs.com
                                    <i class="bx bx-right-arrow-alt fs-xl ms-1"
                                    ></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="programs"></div>
                <h2 class="h4">Guest Observer & Investigator Programs</h2>

                <p class="mb-4 pb-2">
                    Mission specific Guest Observer (GO) and Guest Investigator
                    (GI) programs, part of NASA's Research Opportunities in
                    Space and Earth Sciences (ROSES) Announcement, provides
                    opportunities for community members to carry out basic
                    research relevant to each mission. Below is a list of
                    proposal opportunities for missions with significant
                    relevance to multimessenger astronomy.
                </p>

                <div
                    class="row row-cols-1 row-cols-md-3 g-4 pt-2 pt-md-4 pb-lg-2 mb-5"
                >
                    <!-- Item -->
                    <div class="col">
                        <div
                            class="card bg-secondary border-0 flex-column flex-sm-row flex-md-column flex-xxl-row align-items-top card-hover border-primary h-100"
                        >
                            <!-- <img src="assets/img/landing/medical/icons/doctor.svg" width="168" alt="Doctor icon"> -->
                            <div
                                class="card-body text-center text-sm-start text-md-center text-xxl-start pb-3 pb-sm-2 pb-md-3 pb-xxl-2 text-align-top"
                            >
                                <h3
                                    class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0"
                                >
                                    Neil Gehrels Swift Observatory Guest
                                    Investigator Program
                                </h3>
                                <p class="fs-sm mb-1">
                                    Cycle 19 proposals are due Thursday,
                                    September 22, 2022
                                </p>
                                <a
                                    href="https://swift.gsfc.nasa.gov/proposals/swiftgi.html"
                                    class="btn btn-link stretched-link px-0"
                                >
                                    Learn More
                                    <i class="bx bx-right-arrow-alt fs-xl ms-1"
                                    ></i>
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
                                <h3
                                    class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0"
                                >
                                    Hubble Space Telescope Observations
                                </h3>
                                <p class="fs-sm mb-1">
                                    Cycle 30 1st Mid-Cycle proposals due
                                    September 30, 2022
                                </p>
                                <a
                                    href="https://hst-docs.stsci.edu/hsp"
                                    class="btn btn-link stretched-link px-0"
                                >
                                    Learn More
                                    <i class="bx bx-right-arrow-alt fs-xl ms-1"
                                    ></i>
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
                                <h3
                                    class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0"
                                >
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
                                    <i class="bx bx-right-arrow-alt fs-xl ms-1"
                                    ></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="joint-observing-opportunities"></div>
                <h2 class="h4 pt-3">Joint Observing Opportunities</h2>
                <p class="mb-4 pb-2">
                    Joint observing opportunities allow community members to
                    write single proposals and obtain observing time on multiple
                    space and ground-based observatories. NASA is currently
                    pursuing additional joint programs where scientifically
                    relevant. The table below summarizes the current joint
                    observing opportunities offered through NASA's ROSES-2022
                    program elements. In the future, joint funding program with
                    the NSF would open new opportunities for novel
                    multimessenger programs.
                </p>

                <p class="mb-5">
                    The individual program elements (e.g. the proposal
                    opportunities) are listed in the top row of the table and
                    the facilities for which observers can be awarded joint
                    observing time are listed below and named in the first
                    column.
                </p>

                <JointFacilitiesTable></JointFacilitiesTable>

                <div id="resources"></div>
                <h2 class="h4 pt-5">Complementary Opportunities</h2>
                <p class="mb-4 pb-2">
                    Multimessenger and Time Domain Astrophysics are supported by
                    many observatories and institutions besides NASA. In the
                    United States, a key funding organization is the National
                    Science Foundation (NSF), and US scientists at all career
                    stages (including students) have access to observing time at
                    many facilities through competitive time allocation
                    processes. The growing list below gives an overview of such
                    opportunities.
                </p>

                <h2 class="h5 pt-3">National Science Foundation</h2>
                <p class="mb-4 pb-2">
                    Windows on the Universe: The era of Multi-Messenger
                    Astrophysics (WoU-MMA) is one of the 10 Big Ideas that will
                    drive NSF’s long-term research agenda. There are several
                    funding opportunities through the <a
                        class="btn-link"
                        href="https://www.nsf.gov/div/index.jsp?div=AST"
                        >Divisions of Astronomical Science and Physics</a
                    >, including
                </p>

                <div
                    class="row row-cols-1 row-cols-md-3 g-4 pt-2 pt-md-4 pb-lg-2 mb-5"
                >
                    <!-- Item -->
                    <div class="col">
                        <div
                            class="card bg-secondary border-0 flex-column flex-sm-row flex-md-column flex-xxl-row align-items-top card-hover border-primary h-100"
                        >
                            <!-- <img src="assets/img/landing/medical/icons/doctor.svg" width="168" alt="Doctor icon"> -->
                            <div
                                class="card-body text-center text-sm-start text-md-center text-xxl-start pb-3 pb-sm-2 pb-md-3 pb-xxl-2 text-align-top"
                            >
                                <h3
                                    class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0"
                                >
                                    Astronomy and Astrophysics Research Grants
                                    (AAG)
                                </h3>
                                <p class="fs-sm mb-1">
                                    Annual deadline 15 November.
                                </p>
                                <a
                                    href="#"
                                    class="btn btn-link stretched-link px-0"
                                >
                                    Learn More
                                    <i class="bx bx-right-arrow-alt fs-xl ms-1"
                                    ></i>
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
                                <h3
                                    class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0"
                                >
                                    Division of Physics: Investigator-Initiated
                                    Research Projects (PHY)
                                </h3>
                                <p class="fs-sm mb-1">
                                    Annual deadlines in November and December.
                                </p>
                                <a
                                    href="#"
                                    class="btn btn-link stretched-link px-0"
                                >
                                    Learn More
                                    <i class="bx bx-right-arrow-alt fs-xl ms-1"
                                    ></i>
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
                                <h3
                                    class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0"
                                >
                                    Faculty Early Career Development Program
                                    (CAREER)
                                </h3>
                                <p class="fs-sm mb-1">
                                    Annual deadline fourth Wednesday every year.
                                </p>
                                <a
                                    href="#"
                                    class="btn btn-link stretched-link px-0"
                                >
                                    Read More
                                    <i class="bx bx-right-arrow-alt fs-xl ms-1"
                                    ></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 class="h5 pt-3">
                    Observatories with Open Observing Time for US Scientists
                </h2>

                <div
                    class="row row-cols-1 row-cols-md-3 g-4 pt-2 pt-md-4 pb-lg-2 mb-5"
                >
                    <!-- Item -->
                    <div class="col">
                        <div
                            class="card bg-secondary border-0 flex-column flex-sm-row flex-md-column flex-xxl-row align-items-top card-hover border-primary h-100"
                        >
                            <!-- <img src="assets/img/landing/medical/icons/doctor.svg" width="168" alt="Doctor icon"> -->
                            <div
                                class="card-body text-center text-sm-start text-md-center text-xxl-start pb-3 pb-sm-2 pb-md-3 pb-xxl-2 text-align-top"
                            >
                                <h3
                                    class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0"
                                >
                                    National Optical-Infrared Astronomy Research
                                    Laboratory (NOIRLab)
                                </h3>
                                <p class="fs-sm mb-1">
                                    Two annual deadlines on March 31st and
                                    September 30th. Includes Gemini Observatory,
                                    Cerro Tololo Inter-American Observatory
                                    (CTIO), Kitt Peak National Observatory
                                    (KPNO), WIYN Community-access time.
                                </p>
                                <a
                                    href="#"
                                    class="btn btn-link stretched-link px-0"
                                >
                                    Learn More
                                    <i class="bx bx-right-arrow-alt fs-xl ms-1"
                                    ></i>
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
                                <h3
                                    class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0"
                                >
                                    Atacama Large Millimeter/submillimeter Array
                                    (ALMA)
                                </h3>
                                <p class="fs-sm mb-1">
                                    Annual deadline in April.
                                </p>
                                <a
                                    href="#"
                                    class="btn btn-link stretched-link px-0"
                                >
                                    Learn More
                                    <i class="bx bx-right-arrow-alt fs-xl ms-1"
                                    ></i>
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
                                <h3
                                    class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0"
                                >
                                    National Radio Astronomy Observatory (NRAO)
                                </h3>
                                <p class="fs-sm mb-1">
                                    Two annual deadlines on February 1st and
                                    August 1st. Includes the Very Large Array
                                    (VLA) and Very Long Baseline Array (VLBA).
                                </p>
                                <a
                                    href="#"
                                    class="btn btn-link stretched-link px-0"
                                >
                                    Read More
                                    <i class="bx bx-right-arrow-alt fs-xl ms-1"
                                    ></i>
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
                                <h3
                                    class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0"
                                >
                                    Green Bank Observatory (GBO)
                                </h3>
                                <p class="fs-sm mb-1">
                                    Annual deadlines on February 1st and August
                                    1st.
                                </p>
                                <a
                                    href="#"
                                    class="btn btn-link stretched-link px-0"
                                >
                                    Read More
                                    <i class="bx bx-right-arrow-alt fs-xl ms-1"
                                    ></i>
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
                                <!-- <a href="#" class="badge fs-sm text-white bg-primary shadow-primary text-decoration-none mb-3">Optical</a>
                  <a href="#" class="badge fs-sm text-white bg-primary shadow-primary text-decoration-none mb-3">Radio</a> -->
                                <h3
                                    class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0"
                                >
                                    Australia Telescope National Facility (ATNF)
                                </h3>
                                <p class="fs-sm mb-1">
                                    Two annual deadlines on June 15th and
                                    December 15th. Includes the Australia
                                    Telescope Compact Array (ATCA), Australian
                                    Long Baseline Array (LBA) and Parkes
                                    Telescope.
                                </p>
                                <a
                                    href="#"
                                    class="btn btn-link stretched-link px-0"
                                >
                                    Read More
                                    <i class="bx bx-right-arrow-alt fs-xl ms-1"
                                    ></i>
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
                                <!-- <a href="#" class="badge fs-sm text-white bg-primary shadow-primary text-decoration-none mb-3">Radio</a> -->
                                <h3
                                    class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0"
                                >
                                    South African Radio Astronomy Observatory
                                    (SARAO)
                                </h3>
                                <p class="fs-sm mb-1">
                                    MeerKAT, with varying annual deadlines for
                                    open time.
                                </p>
                                <a
                                    href="#"
                                    class="btn btn-link stretched-link px-0"
                                >
                                    Read More
                                    <i class="bx bx-right-arrow-alt fs-xl ms-1"
                                    ></i>
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
                                <!-- <a href="#" class="badge fs-sm text-white bg-primary shadow-primary text-decoration-none mb-3">Radio</a> -->
                                <h3
                                    class="h6 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0"
                                >
                                    Low Frequency Array (LOFAR)
                                </h3>
                                <p class="fs-sm mb-1">
                                    Two annual deadlines in March and September.
                                </p>
                                <a
                                    href="#"
                                    class="btn btn-link stretched-link px-0"
                                >
                                    Read More
                                    <i class="bx bx-right-arrow-alt fs-xl ms-1"
                                    ></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div id="references"></div>
          <h2 class="h4 pt-3">References</h2>
          <p class="mb-4 pb-2">Purus ornare nisl est nec. Nunc, enim tellus pretium viverra quisque id in metus volutpat. Urna eget velit venenatis, commodo eget massa. Magna donec dictum cras nullam platea. Diam rhoncus massa lectus pellentesque tristique. Amet commodo, egestas vitae bibendum. Volutpat elit condimentum integer tortor porttitor justo vel lobortis risus. Lacinia pellentesque fermentum tellus orci mauris, velit duis eget. Commodo justo, hac ligula molestie felis, iaculis. Vitae dui at ante orci, dictum fusce. Urna, sed urna fringilla faucibus euismod aliquet nec. Quis libero, fermentum amet eu, condimentum auctor. Sit vel ipsum sem tempus gravida et. Scelerisque blandit orci, est quis. Nisi, tellus amet est nascetur habitant faucibus ornare et vivamus.</p> -->
            </div>

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
                                        <a class="nav nav-link p-0" href="#gops"
                                            >Guest Observer & Investigator
                                            Programs</a
                                        >
                                    </div>
                                </li>

                                <li class="pb-1 mb-1">
                                    <div class="mb-0">
                                        <a
                                            class="nav nav-link p-0"
                                            href="#joint"
                                            >Joint Observing Opportunities</a
                                        >
                                    </div>
                                </li>

                                <li class="pb-1 mb-1">
                                    <div class="mb-0">
                                        <a
                                            class="nav nav-link p-0"
                                            href="#resources"
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

<script>
    import { base } from "$app/paths";
</script>

<section
    class="dark-mode position-relative jarallax pb-xl-3"
    data-jarallax
    data-speed="0.4"
    style="min-height: 600px;"
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
                <p
                    class="fs-xl pb-4 mb-1 mb-md-2 mb-lg-3"
                    style="max-width: 526px;"
                >
                    Multimessenger and time-domain astrophysics are opening
                    entirely new windows on the Universe. The Astrophysics
                    Cross-Observatory Science Support (ACROSS) center is an
                    initiative to facilitate communication, coordination, and
                    collaboration in this new era of astronomy.
                </p>
            </div>
        </div>
    </div>
</section>

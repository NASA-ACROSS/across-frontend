<script>
    import { base } from '$app/paths';
</script>

<!-- Hero -->
<section class="dark-mode bg-dark position-relative top-0 start-0 w-100 h-100">
    <div
        class="bg-dark bg-size-cover bg-repeat-0 position-relative top-0 start-0 w-100 h-100"
        style="background-image: url(/assets/img/custom/bli_grc_sm.jpg);"
    >
        <span
            class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"
        ></span>

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
                            Welcome to ACROSS
                        </h5>
                        <p class="fs-lg d-xl-block pb-2 pb-md-0 mb-4 mb-md-5">
                            The <strong class="text-white"
                                >Astrophysics Cross-Observatory Science Support
                                (ACROSS)</strong
                            > system focuses on the aggregation of NASA observatory
                            state and status information to facilitate science situational
                            awareness.
                        </p>

                        <!-- Buttons -->
                        <div
                            class="d-flex justify-content-center justify-content-md-start pb-2 pt-lg-2 pt-xl-0"
                        >
                            <a
                                href={base + '/user/login'}
                                class="btn btn-lg btn-primary shadow-primary me-3 me-sm-4"
                                >Log in</a
                            >
                            <a
                                href="http://127.0.0.1:8000/docs"
                                class="btn btn-lg btn-outline-secondary"
                                >Explore API</a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

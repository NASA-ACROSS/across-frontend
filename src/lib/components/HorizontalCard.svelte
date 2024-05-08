<script>
    import { base } from "$app/paths";
    export let title;
    export let tags;
    export let buttons;
</script>

<!-- Fermi -->
<article class="card border-0 bg-transparent me-xl-5 mb-4 pt-4">
    <div class="row g-0">
        <div
            class="col-sm-5 position-relative bg-position-center bg-repeat-0 bg-size-cover rounded-3"
            style="background-image: url({base}/assets/img/custom/fermi.jpg); min-height: 15rem;"
        >
            <a
                href="blog-single.html"
                class="position-absolute top-0 start-0 w-100 h-100"
                aria-label="Read more"
            ></a>
        </div>
        <div class="col-sm-7">
            <div class="card-body px-0 pt-sm-0 ps-sm-4 pb-0 pb-sm-4">
                {#each tags as tag}
                    <a
                        href="#"
                        class="badge fs-sm text-white bg-primary shadow-primary text-decoration-none mb-3"
                        >{tag}</a
                    >
                {/each}

                <h3 class="h4">
                    <a href="blog-single.html">{title}</a>
                </h3>
                <p class="mb-4">
                    Fermi provides an unprecedented energy coverage of the
                    gamma-ray spectrum. Its two instruments collective cover an
                    energy range from 8 keV to over 200 GeV, with an extremely
                    large field of view, making it indispensable as a gamma-ray
                    monitor.
                </p>
                <div class="d-flex align-items-center text-muted">
                    <div class="d-flex flex-column flex-md-row">
                        <a
                            href="#"
                            class="btn btn-outline-primary btn-md mb-sm-2 mb-md-0 me-md-3"
                        >
                            <i class="bx bx-planet fs-xl me-xl-2"></i>
                            Science Support Center
                        </a>
                        <a href="#" class="btn btn-outline-primary btn-md">
                            <i class="bx bx-data fs-xl me-xl-2"></i>
                            Data Archive
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</article>

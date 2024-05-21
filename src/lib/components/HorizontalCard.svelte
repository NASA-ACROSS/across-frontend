<script lang="ts">
    import { base } from '$app/paths';

    
    export let tags: string[];
    export let title: string;
    export let description: string;
    export let imgURL: string;
    export let href: string;
    export let buttons: {
        href: string;
        text: string;
    }[];

    let tagBackgroundColors = ['bg-primary', 'bg-danger', 'bg-warning', 'bg-success'];
</script>

<!-- Fermi -->
<article class="card border-0 bg-transparent me-xl-5 mb-4 pt-4">
    <div class="row g-0">
        <div
            class="col-sm-5 position-relative bg-position-center bg-repeat-0 bg-size-cover rounded-3"
            style="background-image: url({base}{imgURL}); min-height: 15rem;"
        />
        <div class="col-sm-7">
            <div class="card-body px-0 pt-sm-0 ps-sm-4 pb-0 pb-sm-4">
                {#each tags as tag, i}
                    <div
                        class="badge fs-sm text-white {tagBackgroundColors[i%tagBackgroundColors.length]} shadow-primary text-decoration-none mb-3 me-1"
                        >{tag}</div
                    >
                {/each}
                <h3 class="h4">
                    <a href={href}>
                        {title}
                    </a>
                </h3>
                <p class="mb-4">
                    {description}
                </p>
                <div class="d-flex align-items-center text-muted">
                    <div
                        class="d-inline-flex flex-column flex-md-row flex-wrap"
                    >
                        {#each buttons as button}
                            <a
                                href={button.href}
                                class="btn btn-outline-primary btn-md mb-2 me-3"
                            >
                                <i class="bx bx-planet fs-xl me-xl-2"></i>
                                {button.text}
                            </a>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</article>

<script lang="ts">
    import type { newsDataType } from "$lib/content/newsData";
    export let data: newsDataType;
</script>

<!-- Item -->
<div class="col pb-3">
    <article class="card border-0 shadow-sm h-100">
        <div class="position-relative">
            <a
                href="blog-single.html"
                class="position-absolute top-0 start-0 w-100 h-100"
                aria-label="Read more"
            ></a>
            <img
                src={data.imgURL}
                class="card-img-top"
                alt={data.imgDescription}
            />
        </div>
        <div class="card-body pb-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
                <a
                    href="#"
                    class="badge fs-sm text-nav bg-secondary text-decoration-none"
                    >{data.tag}</a
                >
                <span class="fs-sm text-muted">{data.date}</span>
            </div>
            <h3 class="h5 mb-0">
                <a href={data.newsURL}>{data.title}</a>
            </h3>
        </div>
    </article>
</div>

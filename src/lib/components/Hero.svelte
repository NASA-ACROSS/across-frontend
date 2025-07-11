<script>
    import { base } from '$app/paths';
</script>

<!-- Hero -->
<div
    class="hero min-h-screen"
    style="background-image: url(/assets/img/custom/bli_grc_sm.jpg);"
>
    <div class="hero-overlay"></div>
    <div class="hero-content text-neutral-content text-center">
        <div class="max-w-lg">
            <h1 class="mb-5 text-5xl font-bold">Welcome to ACROSS</h1>
            <p class="mb-5">
                The <strong class="text-white"
                    >Astrophysics Cross-Observatory Science Support (ACROSS)</strong
                > system focuses on the aggregation of NASA observatory state and
                status information to facilitate science situational awareness.
            </p>
            <button class="btn btn-accent"
                ><a href="{base}/schedules">View Schedules</a></button
            >
            <button class="btn btn-info"
                ><a href="{base}/observations">Browse Observations</a></button
            >
            <button class="btn btn-primary">
                <a href="http://127.0.0.1:8000/docs">Explore API</a></button
            >
        </div>
    </div>
</div>

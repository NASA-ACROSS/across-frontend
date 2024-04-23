<script>
    import { page } from "$app/stores";
</script>

<section class="py-5 bg-secondary">
    <div class="container py-md-3">
        <h1>{$page.status}</h1>
        <h2>{$page.error.message}</h2>
        <h3>{$page.url}</h3>
    </div>
</section>

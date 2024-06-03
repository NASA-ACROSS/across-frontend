<script>
    import { base } from '$app/paths';
</script>

<section class="py-5 bg-secondary">
    <div class="container py-md-3">
        <h1>You have succesfully logged out!</h1>
        <form action="{base}/user/login">
            <button class="btn btn-lg btn-primary mb-3">Login</button>
        </form>
    </div>
</section>

<script lang="ts">
    import type { PageData } from "./$types";
    import { base } from "$app/paths";
    export let data: PageData;
</script>

<h1>{data.hello}</h1>

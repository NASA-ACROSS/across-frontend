<script lang="ts">
    import type { Link } from '$lib/types/navigation';

    export let link: Link;
</script>

<li class="hover:underline decoration-dashed">
    <a data-sveltekit-reload={link.reload} target={link.newTab === true ? '_blank' : ''} rel={link.rel ? link.rel : ''} href={link.href}>
        {link.label}
    </a>
</li>

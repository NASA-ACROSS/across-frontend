<script lang="ts">
    import type { Link } from '$lib/types/navigation';

    export let link: Link;
</script>

<li>
    <a
        class="hover:underline decoration-dashed underline-offset-4"
        data-sveltekit-preload-data="tap"
        target={link.newTab === true ? '_blank' : ''}
        rel={link.rel ? link.rel : ''}
        href={link.href}
    >
        {link.label}
    </a>
</li>

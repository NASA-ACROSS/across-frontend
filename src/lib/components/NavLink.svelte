<script lang="ts">
    import type { Link } from '$lib/types/navigation';

    interface Props {
        link: Link;
    }

    let { link }: Props = $props();
</script>

<li class="hover:underline decoration-dashed underline-offset-4">
    <a
        data-testid="NavLink:{link.id}"
        data-sveltekit-reload={link.reload}
        data-sveltekit-preload-data="tap"
        target={link.newTab === true ? '_blank' : ''}
        rel={link.rel ? link.rel : ''}
        href={link.href}
    >
        {link.label}
    </a>
</li>

<script>
    export let text;
    export let url;
    export let hasArrow = false;
</script>

<a class="link" href={url}>
    <span class="color-primary">{text}</span>
    {#if hasArrow}
        <svg
            class="margin-left-auto margin-right-0"
            viewBox="0 0 32 32"
            fill="none"
        >
            <circle class="color-accent" cx="16" cy="16" r="16"></circle><path
                d="M8 16.956h12.604l-3.844 4.106 1.252 1.338L24 16l-5.988-6.4-1.252 1.338 3.844 4.106H8v1.912z"
                class="color-spacesuit-white"
            ></path>
        </svg>
    {/if}
</a>

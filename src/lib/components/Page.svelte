<script lang="ts">
    /**
     * Page component
     *
     * Sets up the page layout by filling the screen
     * and displaying all children in a column layout.
     *
     * Provides dynamic padding for various screen sizes
     *
     * Left sidebar can be toggled with showMenu
     * Right sidebar can be toggled with showInfo
     *
     * Names are decoupled from direction for ease of modification later
     */
    export let title = '';
    export let icon: string | undefined = undefined;

    export let showMenu = false;
    export let showInfo = false;

    const sidebarClasses = 'w-full flex flex-col flex-grow lg:max-w-1/6';
</script>

<!-- Page -->
<div class="pt-6 pb-8 px-2 md:px-5 lg:px-15 xl:px-30 w-auto bg-base-100 flex flex-col flex-grow">
    <!-- Page Alert -->
    {#if $$slots.alert}
        <div class="pb-2">
            <slot name="alert"></slot>
        </div>
    {/if}

    <!-- Page Title and Buttons-->
    {#if icon || title || $$slots.buttons}
        <h1 class="flex flex-col sm:flex-row justify-between text-primary py-2 text-4xl">
            <div class="flex items-center">
                {#if icon}
                    <div class="bx bx-{icon} opacity-70 me-2" />
                {/if}
                {title}
            </div>
            <div class="flex justify-end">
                <slot name="buttons"></slot>
            </div>
        </h1>
    {/if}

    <!-- Page Content -->
    <div class="flex flex-col flex-grow wrap-anywhere lg:flex-row md:gap-1 lg:gap-3 xl:gap-6 lg:w-full">
        {#if showMenu}
            <div class={sidebarClasses}>
                <slot name="menu" />
            </div>
        {/if}
        <div class="w-full flex flex-col flex-grow">
            <slot />
        </div>
        {#if showInfo}
            <div class={sidebarClasses}>
                <slot name="info" />
            </div>
        {/if}
    </div>
</div>

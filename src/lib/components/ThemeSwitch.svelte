<script lang="ts">
    import { browser } from '$app/environment';

    let darkMode = true;

    function handleSwitch() {
        darkMode = !darkMode;

        localStorage.setItem('theme', darkMode ? 'dark' : 'light');

        darkMode
            ? document.documentElement.classList.add('dark-mode')
            : document.documentElement.classList.remove('dark-mode');
    }

    if (browser) {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark-mode');
            darkMode = true;
        } else {
            document.documentElement.classList.remove('dark-mode');
            darkMode = false;
        }
    }
</script>

<div class="mb-4 pb-lg-3 mt-4 float-xl-end float-lg-end">
    <div class="form-check form-switch mode-switch pt-1">
        <input
            type="checkbox"
            class="form-check-input"
            id="theme-mode"
            checked={darkMode}
            on:click={handleSwitch}
        />
        <label class="form-check-label d-none d-sm-block" for="theme-mode"
            >Light</label
        >
        <label class="form-check-label d-none d-sm-block" for="theme-mode"
            >Dark</label
        >
    </div>
</div>

<script context="module" lang="ts">
    /**
     * Structure required for MultiSelect options.
     * @template T The type of the underlying data object.
     */
    export interface Option<T> {
        /** The underlying data object or value */
        value: T;
        /** The string shown in the UI list */
        displayName: string;
        /** Unique ID for checking existence/selection State */
        key: string;
        /** The string used when filtering via the search input */
        searchableText: string;
    }
</script>

<script lang="ts" generics="T">
    /**
     * A generic multi-select component with search filtering and scrolling.
     *
     * Supports two modes:
     * 1. **Simple Mode:** Pass `bind:selected`. The component manages add/remove logic internally.
     * 2. **Controlled Mode:** Pass `onToggle`. The parent handles logic (useful for complex cascading selections).
     */

    /** Generic list of options to be used in selection */
    export let options: Option<T>[] = [];

    /**
     * The list of currently selected options. Use `bind:selected` if not using `onToggle`.
     */
    export let selected: Option<T>[] = [];

    /** Text to display when search input is empty. Default: 'Search...' */
    export let placeholder: string = 'Search...';

    /** Label text displayed above the component. Default: 'Select From' */
    export let label: string = 'Select From';

    /** Tooltip text for the search input. Default: 'Search by name' */
    export let title: string = 'Search by name';

    /**
     * Optional callback. If provided, internal selection logic is bypassed
     * and this function is called with the value `T`.
     * Use this for complex logic (e.g. "Selecting Parent selects Child").
     */
    export let onToggle: ((optionValue: T) => void) | null = null;

    let search = '';

    $: filtered = options.filter((option) => option.searchableText.toLowerCase().includes(search.toLowerCase()));
    $: selectedSet = new Set(selected.map((item: Option<T>) => item.key || item));

    function toggle(option: Option<T>) {
        if (onToggle) {
            onToggle(option.value);
        } else {
            // fallback behavior if no onToggle is provided: manage selection internally
            const isSelected = selectedSet.has(option.key);
            if (isSelected) {
                selectedSet.delete(option.key);
            } else {
                selectedSet.add(option.key);
            }

            // Update the selected array based on the new set
            selected = options.filter((opt) => selectedSet.has(opt.key));
        }
    }
</script>

<div class="min-w-0">
    <label class="label text-lg" for="select-input">
        <span class="label-text">{label}</span>
        <span class="text-xs justify-end">({selected.length}/{options.length})</span>
    </label>
    <div class="border border-base-300 p-2 bg-base-100 h-full flex flex-col">
        <label class="input w-full flex mb-2">
            <input type="text" class="grow" {placeholder} bind:value={search} {title} />
            {#if search.length > 0}
                <button type="button" class="btn btn-ghost btn-xs bx bx-x opacity-70 text-xl" on:click={() => (search = '')} title="Clear Search" />
            {:else}
                <i class="p-2 bx bx-search text-lg opacity-70"></i>
            {/if}
        </label>
        <div class="max-h-60 overflow-y-auto border border-base-200 p-2">
            {#each filtered as option}
                <label class="flex items-center px-1.5 py-2 cursor-pointer select-none transition-colors hover:bg-nasa-blue-lite">
                    <input
                        type="checkbox"
                        value={option.key}
                        checked={selectedSet.has(option.key)}
                        on:change={() => toggle(option)}
                        class="checkbox checkbox-primary checkbox-sm mr-2.5 shrink-0"
                    />
                    <span class="text-sm">{option.displayName}</span>
                </label>
            {/each}
        </div>
    </div>
</div>

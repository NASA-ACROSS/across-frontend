<script lang="ts">
    import MultiSelect, { type Option } from '$lib/components/MultiSelect.svelte';
    import Section from '$lib/components/Section.svelte';
    import Page from '$lib/components/Page.svelte';
    import DateRangeInput from '$lib/components/DateRangeInput.svelte';
    import DateRangeInputExample from './_components/DateRangeInputExample.svelte';

    // Multiselect properties and testing custom onToggle
    type Fruit = { name: string; color: string };

    const fruits: Fruit[] = [
        { name: 'apple', color: 'red' },
        { name: 'banana', color: 'yellow' },
        { name: 'cherry', color: 'red' },
        { name: 'orange', color: 'orange' },
        { name: 'grape', color: 'green' },
        { name: 'watermelon', color: 'green' },
        { name: 'kiwi', color: 'brown' },
        { name: 'strawberry', color: 'red' },
        { name: 'blueberry', color: 'blue' },
        { name: 'pineapple', color: 'yellow' },
    ].sort((a, b) => a.name.localeCompare(b.name));
    const options: Option<Fruit>[] = fruits.map((fruit, idx) => ({
        value: fruit,
        displayName: `${fruit.name.charAt(0).toUpperCase() + fruit.name.slice(1)} (${fruit.color})`,
        key: idx.toString(),
        searchableText: `${fruit.name} ${fruit.color}`,
    }));

    let selectedFruits: Option<Fruit>[] = [];
    let useToggle = false;

    $: selectedSet = new Set(selectedFruits.map((item: Option<Fruit>) => item.value));

    let onToggle = (fruit: Fruit) => {
        const isSelected = selectedSet.has(fruit);

        options.forEach((opt) => {
            if (opt.value.color === fruit.color) {
                if (isSelected) selectedSet.delete(opt.value);
                else selectedSet.add(opt.value);
            }
        });

        // Update the selected array based on the new set
        selectedFruits = options.filter((opt) => selectedSet.has(opt.value));
    };
</script>

<Page title="Component Playground">
    <p class="text-lg text-gray-700">This page is only visible in local development mode.</p>

    <Section title="MultiSelect Component">
        <label class="flex space-x-2 items-center px-1.5 py-2 cursor-pointer">
            <input type="checkbox" bind:checked={useToggle} class="checkbox checkbox-primary checkbox-sm" />
            <span class="text-sm"
                >Use custom <code class="bg-base-300 text-xs p-1">onToggle</code> to test checking one fruit will check all fruits with the same color.
                <span class="font-bold">Note:</span>
                custom toggling will disable the ability to select all/none.</span
            >
        </label>
        <div class="max-w-md h-80">
            <MultiSelect
                label="Fruits"
                onToggle={useToggle ? onToggle : null}
                {options}
                selected={useToggle ? selectedFruits : []}
                placeholder="Search by name or color..."
            ></MultiSelect>
        </div>
    </Section>

    <Section title="DateRangeInput Component">
        <DateRangeInputExample />
    </Section>
</Page>

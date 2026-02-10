<script lang="ts">
    import MultiSelect, { type Option } from '$lib/components/MultiSelect.svelte';
    import Section from '$lib/components/Section.svelte';
    import Page from '$lib/components/Page.svelte';
    import { PUBLIC_CONFIG } from '$config/config.public';

    // Multiselect properties and testing custom onToggle
    let selectedFruits: Option<string>[] = [];
    let useToggle = false;
    let fruits: { name: string; color: string }[] = [
        { name: 'apple', color: 'red' },
        { name: 'banana', color: 'yellow' },
        { name: 'cherry', color: 'red' },
        { name: 'orange', color: 'orange' },
        { name: 'grape', color: 'purple' },
        { name: 'watermelon', color: 'green' },
        { name: 'kiwi', color: 'brown' },
        { name: 'strawberry', color: 'red' },
        { name: 'blueberry', color: 'blue' },
        { name: 'pineapple', color: 'yellow' },
    ];
    let options: Option<string>[] = [
        ...fruits.map((fruit) => ({
            value: fruit.name,
            displayName: `${fruit.name.charAt(0).toUpperCase() + fruit.name.slice(1)} (${fruit.color})`,
            key: fruit.name,
            searchableText: `${fruit.name} ${fruit.color}`,
        })),
    ];

    $: selectedSet = new Set(selectedFruits.map((item: Option<string>) => item.key || item));

    let onToggle = (option: Option<string>) => {
        const isSelected = selectedSet.has(option.key);
        if (isSelected) {
            selectedSet.delete(option.key);
        } else {
            selectedSet.add(option.key);
        }

        // Update the selected array based on the new set
        selectedFruits = options.filter((opt) => selectedSet.has(opt.key));
    };
</script>

<Page title="Playground">
    <p class="text-lg text-gray-700">This page is only visible in local development mode.</p>
    <Section title="MultiSelect Component">
        <div>
            <label class="flex space-x-2 items-center px-1.5 py-2 cursor-pointer">
                <input type="checkbox" bind:checked={useToggle} class="checkbox checkbox-primary checkbox-sm" />
                <span class="text-sm"
                    >Use custom <code class="bg-base-300 text-xs p-1">onToggle</code> to test checking one fruit will check all fruits with the same color.</span
                >
            </label>
        </div>
        <div class="my-6 max-w-md">
            <MultiSelect
                label="Fruits"
                onToggle={useToggle ? onToggle : null}
                {options}
                selected={useToggle ? selectedFruits : []}
                placeholder="Search by name or color..."
            ></MultiSelect>
        </div>
    </Section>
</Page>

<script lang="ts">
    import MultiSelect from '$lib/components/MultiSelect.svelte';
    import Section from '$lib/components/Section.svelte';
    import Page from '$lib/components/Page.svelte';
    import { PUBLIC_CONFIG } from '$config/config.public';
</script>

<Page center={true}>
    <Section title="Playground">
        <p class="text-lg text-gray-700">This page is only visible in local development mode.</p>
        <div class="my-6 max-w-md h-60">
            <h2 class="text-2xl font-semibold mb-3">MultiSelect Component</h2>
            <MultiSelect
                label="Fruits"
                title="Search by fruit name"
                options={[
                    { key: '1', displayName: 'apple', searchableText: 'apple', value: 'apple' },
                    { key: '2', displayName: 'banana', searchableText: 'banana', value: 'banana' },
                    { key: '3', displayName: 'cherry', searchableText: 'cherry', value: 'cherry' },
                    { key: '4', displayName: 'orange', searchableText: 'orange', value: 'orange' },
                    { key: '5', displayName: 'grape', searchableText: 'grape', value: 'grape' },
                    { key: '6', displayName: 'watermelon', searchableText: 'watermelon', value: 'watermelon' },
                    { key: '7', displayName: 'kiwi', searchableText: 'kiwi', value: 'kiwi' },
                    { key: '8', displayName: 'strawberry', searchableText: 'strawberry', value: 'strawberry' },
                    { key: '9', displayName: 'blueberry', searchableText: 'blueberry', value: 'blueberry' },
                    { key: '10', displayName: 'pineapple', searchableText: 'pineapple', value: 'pineapple' },
                ]}
            ></MultiSelect>
        </div>
    </Section>
</Page>

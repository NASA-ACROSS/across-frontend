<script lang="ts">
    import { resolve } from '$app/paths';
    import Page from '$lib/components/Page.svelte';
    import type { ActionData, PageData } from './$types';
    import ServiceAccounts from './_components/ServiceAccounts.svelte';
    import ServiceAccountSecretModal from './_components/ServiceAccountSecretModal.svelte';

    interface Props {
        data: PageData;
        form: ActionData;
    }

    let { data, form }: Props = $props();

    let user = data.user;
    let serviceAccounts = data.serviceAccounts;
    let serviceAccountSecret = $state(form?.serviceAccountSecret);
</script>

<Page title="Manage Service Accounts" icon="pen">
    {#snippet buttons()}
        <div>
            <a class="btn btn-info text-lg" href={resolve('/user/profile')}>← <i class="bx bx-user mx-2"></i>Profile</a>
        </div>
    {/snippet}

    <ServiceAccountSecretModal isOpen={serviceAccountSecret !== undefined} bind:serviceAccountSecret></ServiceAccountSecretModal>

    <ServiceAccounts {user} {serviceAccounts}></ServiceAccounts>
</Page>

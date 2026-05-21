<script lang="ts">
    import { resolve } from '$app/paths';
    import Page from '$lib/components/Page.svelte';
    import ServiceAccounts from './_components/ServiceAccounts.svelte';
    import ServiceAccountSecretModal from './_components/ServiceAccountSecretModal.svelte';

    export let data;
    export let form;

    let user = data.user;
    let serviceAccounts = data.serviceAccounts;
    let serviceAccountSecret = form?.serviceAccountSecret;
</script>

<Page title="Manage Service Accounts" icon="pen">
    <div slot="buttons">
        <a class="btn btn-info text-lg" href={resolve('/user/profile')}>← <i class="bx bx-user mx-2"></i>Profile</a>
    </div>

    <ServiceAccountSecretModal isOpen={serviceAccountSecret !== undefined} bind:serviceAccountSecret></ServiceAccountSecretModal>

    <ServiceAccounts {user} {serviceAccounts}></ServiceAccounts>
</Page>

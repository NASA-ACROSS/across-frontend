<script lang="ts">
    import { Table } from 'svelte-tabular-table';
    import type { PageData } from './$types';
    import Modal from '$lib/components/Modal.svelte';
    import Spinner from '$lib/components/Spinner.svelte';
    import type { CellClickCallbackInput } from '$lib/types/svelte-tabular-table/CellClickCallbackInput';
    import BurstcubeTooTableCellComponentRender from './BurstcubeTooTableCellComponentRender.svelte';
    import { onMount } from 'svelte';

    export let data: PageData;

    $: tableData = data.table || [];
    $: showTable = false;
    $: showModal = false;
    $: triggerInfoData = {};

    const ADMIN_PAGE_ROLES = ['put_burstcube_too', 'delete_burstcube_too'];

    const columns = [
        'id',
        'created_on',
        'trigger_time',
        'trigger_info',
        'status',
        'too_info',
    ];

    // add admin actions column to table when the user has appropriate roles
    if (data.userRoles.some((val: string) => ADMIN_PAGE_ROLES.includes(val))) {
        columns.push('actions');
    }

    const cellClick = ({
        id,
        item,
        key,
        value,
        rowIndex,
        cellIndex,
        event,
    }: CellClickCallbackInput) => {
        console.log(
            JSON.stringify(
                { id, item, key, value, rowIndex, cellIndex, event },
                null,
                2
            )
        );
        // key is column name
        if (key === 'trigger_info') {
            triggerInfoData = tableData[rowIndex].trigger_info;
            showModal = true;
        }
    };

    $: config = {
        init: {
            keys: columns,
            index: 'id',
            name: 'burstcube-too-tabular',
            nohead: false,
            nodiv: false,
            data: [],
        },
        features: {
            sortable: {
                key: 'create_on',
                direction: false, // descending
            },
        },
        callbacks: {
            click: {
                cell: cellClick,
            },
        },
    } as any;

    onMount(() => {
        showTable = true;
        config.init.data = tableData;
        config.callbacks.render = {
            cell: BurstcubeTooTableCellComponentRender,
            key: BurstcubeTooTableCellComponentRender,
        };
    });
</script>

<section class="pt-5 pb-2 bg-secondary">
    <div class="container py-md-3">
        <div class="d-flex justify-content-between align-items-end">
            <h1>{data?.slug?.toUpperCase()} Download of Opportunity</h1>
        </div>
    </div>
    <Modal bind:showModal>
        <h5 slot="header" class="modal-title">Trigger Info</h5>
        {#each Object.entries(triggerInfoData) as [key, value]}
            <div><b>{key}</b>: {value}</div>
        {/each}
    </Modal>
    <div class="container">
        {#if showTable}
            <Table {...config} class="table table-hover" />
        {:else}
            <Spinner />
        {/if}
    </div>
</section>

<style>
    .table {
        font-size: 12px;
    }
</style>

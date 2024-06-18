<script lang="ts">
    import { Table } from 'svelte-tabular-table';
    import type { PageData } from './$types';
    import Modal from '$lib/components/Modal.svelte';
    import type { CellClickCallbackInput } from '$lib/types/svelte-tabular-table/CellClickCallbackInput';
    import BurstcubeTooTableCellComponentRender from './BurstcubeTooTableCellComponentRender.svelte';

    export let data: PageData;
    $: tableData = data.table || [];

    $: showModal = false;
    $: triggerInfoData = {};

    const columns = [
        'id',
        'created_on',
        'trigger_time',
        'trigger_info',
        'status',
        'too_info',
    ];

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
            data: tableData,
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
            render: {
                cell: BurstcubeTooTableCellComponentRender,
                key: BurstcubeTooTableCellComponentRender,
            },
        },
    } as any;
</script>

<section class="pt-5 pb-2 bg-secondary">
    <div class="container py-md-3">
        <div class="d-flex justify-content-between align-items-end">
            <h1>{data?.slug?.toUpperCase()} TOO</h1>
        </div>
    </div>
    <Modal bind:showModal>
        <h5 slot="header" class="modal-title">Trigger Info</h5>
        {#each Object.entries(triggerInfoData) as [key, value]}
            <div><b>{key}</b>: {value}</div>
        {/each}
    </Modal>
    <div class="container">
        {#if tableData?.length}
            <Table {...config} class="table table-hover" />
        {:else}
            <p>No data currently unavailable</p>
        {/if}
    </div>
</section>

<style>
    .table {
        font-size: 12px;
    }
</style>

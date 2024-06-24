<script lang="ts">
    import { Table } from 'svelte-tabular-table';
    import type { PageData } from './$types';
    import Modal from '$lib/components/Modal.svelte';
    import Spinner from '$lib/components/Spinner.svelte';
    import type { CellClickCallbackInput } from '$lib/types/svelte-tabular-table/CellClickCallbackInput';
    import BurstcubeTooTableCellComponentRender from './BurstcubeTooTableCellComponentRender.svelte';
    import { afterUpdate, onMount } from 'svelte';
    import { base } from '$app/paths';
    import { invalidateAll } from '$app/navigation';

    export let data: PageData;

    $: tableData = data.table || [];
    $: showTable = false;
    $: showModal = false;
    $: triggerInfoData = {};
    $: triggerInfoDataRow = {};
    $: page = +data.page;
    let limit = +data.limit;

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
        // key is the column name
        if (key === 'trigger_info') {
            triggerInfoData = tableData[rowIndex].trigger_info;
            triggerInfoDataRow = tableData[rowIndex];
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

    afterUpdate(() => {
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
            <div
                class="btn-toolbar"
                role="toolbar"
                aria-label="Results per page toolbar"
            >
                <div
                    class="btn-group me-2 mb-2"
                    role="group"
                    aria-label="Results per page group"
                >
                    <div class="btn btn-outline-secondary">
                        Results Per Page
                    </div>
                    <select
                        class="form-select btn btn-outline-primary pe-5"
                        id="select-input"
                        aria-label="Results per page"
                        bind:value={limit}
                    >
                        {#each data.limits as lim}
                            <option
                                value={lim}
                                selected={data.limits.includes(lim)}
                                >{lim}</option
                            >
                        {/each}
                    </select>
                </div>
            </div>
            <div class="btn-toolbar" role="toolbar" aria-label="Pagination">
                <div
                    class="btn-group me-2 mb-2"
                    role="group"
                    aria-label="First group"
                >
                    <a
                        type="button"
                        class="btn btn-lg btn-outline-secondary {page == 1
                            ? 'disabled'
                            : ''}"
                        href="{base}/across/too/burstcube?page={page -
                            1}&limit={limit}"
                    >
                        <i class="bx bx-left-arrow" />
                    </a>
                    <button type="button" class="btn btn-outline-secondary"
                        >Page {page}</button
                    >
                    <a
                        type="button"
                        class="btn btn-lg btn-outline-secondary"
                        href="{base}/across/too/burstcube?page={page +
                            1}&limit={limit}"
                    >
                        <i class="bx bx-right-arrow" />
                    </a>
                </div>
            </div>
        </div>
    </div>
    <Modal bind:showModal centered={true}>
        <h5 slot="header" class="modal-title">
            Trigger Info Details {triggerInfoDataRow.id
                ? `#${triggerInfoDataRow.id}`
                : ''}
        </h5>
        {#each Object.entries(triggerInfoData) as [key, value]}
            {#if key === 'justification'}
                <div class="text-warning"><b>{key}</b>: {value}</div>
            {:else}
                <div><b>{key}</b>: {value}</div>
            {/if}
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

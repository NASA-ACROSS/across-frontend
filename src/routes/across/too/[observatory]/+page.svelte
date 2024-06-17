<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
    $: tableData = data.table;
    $: console.log(tableData);

    function deleteRow(rowToBeDeleted) {
        tableData = tableData.filter((row) => row != rowToBeDeleted);
    }

    const columnsToDrop = [
        'created_by',
        'modified_by',
        'modified_on',
        'healpix_filename',
    ];

    $: columns = Object.keys(tableData[0] || {}).filter(
        (colName) => !columnsToDrop.includes(colName)
    );
</script>

<section class="pt-5 pb-2 bg-secondary">
    <div class="container py-md-3">
        <div class="d-flex justify-content-between align-items-end">
            <h1>{data?.slug?.toUpperCase()} TOO</h1>
        </div>
    </div>
    {#if tableData.length}
        <table class="table table-hover container">
            <thead>
                <tr>
                    {#each columns as column}
                        <th>{column}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each tableData as rowObject}
                    <tr>
                        {#each columns as columnName}
                            {#if typeof rowObject[columnName] == 'object' && rowObject[columnName] != null}
                                <!-- Button trigger modal -->
                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                >
                                    Open Trigger Info
                                </button>

                                <!-- Modal -->
                                <div
                                    class="modal fade"
                                    id="exampleModal"
                                    tabindex="-1"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                >
                                    <div
                                        class="modal-dialog"
                                        style="min-width: auto; max-width: 1300px;"
                                    >
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5
                                                    class="modal-title"
                                                    id="exampleModalLabel"
                                                >
                                                    {columnName}
                                                </h5>
                                                <button
                                                    type="button"
                                                    class="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                ></button>
                                            </div>
                                            <div class="modal-body">
                                                <table
                                                    class="table table-hover"
                                                >
                                                    <thead>
                                                        <tr>
                                                            {#each Object.keys(rowObject[columnName]) as innerColumn}
                                                                <th
                                                                    >{innerColumn}</th
                                                                >
                                                            {/each}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            {#each Object.values(rowObject[columnName]) as innerCell}
                                                                <td>
                                                                    {innerCell ||
                                                                        ''}
                                                                </td>
                                                            {/each}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="modal-footer">
                                                <!-- <button
                                                    type="button"
                                                    class="btn btn-secondary"
                                                    data-bs-dismiss="modal"
                                                    >Close</button
                                                > -->
                                                <button
                                                    type="button"
                                                    class="btn btn-primary"
                                                    >Close</button
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="modal-dialog modal-dialog-centered"
                                ></div>
                            {:else}
                                <td> {rowObject[columnName] || ''} </td>
                            {/if}
                        {/each}
                        <button
                            class="btn btn-danger"
                            on:click={() => deleteRow(rowObject)}>X</button
                        >
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <p>No data currently unavailable</p>
    {/if}
</section>

<style>
    .table {
        font-size: 12px;
    }
</style>

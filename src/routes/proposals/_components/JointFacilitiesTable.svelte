<script lang="ts">
    import { navHeight } from '$lib/stores/navHeight';

    let heightOffset: number = 0;

    navHeight.subscribe((value) => {
        heightOffset = value;
    });
</script>

<!-- Dark table with striped rows -->
<div id="table-container" class="">
    <table
        id="joint-facilities-table"
        class="table table-striped-columns text-center align-middle"
    >
        <thead class="header" style="top:{heightOffset}px">
            <tr>
                <th class="border-bottom border-5">Joint Facility</th>
                <th title="Primary Facility" class="border-bottom border-5"
                    >HST</th
                >
                <th title="Primary Facility" class="border-bottom border-5"
                    >JWST</th
                >
                <th title="Primary Facility" class="border-bottom border-5"
                    >Chandra</th
                >
                <th title="Primary Facility" class="border-bottom border-5"
                    >XMM</th
                >
                <th title="Primary Facility" class="border-bottom border-5"
                    >Swift</th
                >
                <th title="Primary Facility" class="border-bottom border-5"
                    >Fermi</th
                >
                <th title="Primary Facility" class="border-bottom border-5"
                    >NuSTAR</th
                >
                <th title="Primary Facility" class="border-bottom border-5"
                    >TESS</th
                >
                <th title="Primary Facility" class="border-bottom border-5"
                    >NICER</th
                >
                <th title="Primary Facility" class="border-bottom border-5"
                    >IXPE</th
                >
            </tr>
        </thead>
        <tbody>
            <tr>
                <th title="Joint Facility" scope="row">HST</th>
                <td></td>
                <td
                    ><i
                        title="submit to primary facility"
                        class="bx bx-plus bx-md me-1"
                    ></i></td
                >
                <td
                    ><i
                        title="submit to primary facility"
                        class="bx bx-plus bx-md me-1"
                    ></i></td
                >
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <th title="Joint Facility" scope="row">JWST</th>
                <td
                    ><i
                        title="submit to primary facility"
                        class="bx bx-plus bx-md me-1"
                    ></i></td
                >
                <td></td>
                <td
                    ><i
                        title="submit to primary facility"
                        class="bx bx-plus bx-md me-1"
                    ></i></td
                >
                <td
                    ><i
                        title="submit to primary facility"
                        class="bx bx-plus bx-md me-1"
                    ></i></td
                >
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <th title="Joint Facility" scope="row">Chandra</th>
                <td
                    ><i
                        title="submit to primary facility"
                        class="bx bx-plus bx-md me-1"
                    ></i></td
                >
                <td
                    ><i
                        title="submit to primary facility"
                        class="bx bx-plus bx-md me-1"
                    ></i></td
                >
                <td></td>
                <td
                    ><i
                        title="submit to primary facility"
                        class="bx bx-plus bx-md me-1"
                    ></i></td
                >
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <th title="Joint Facility" scope="row">XMM</th>
                <td
                    ><i
                        title="submit to primary facility"
                        class="bx bx-plus bx-md me-1"
                    ></i></td
                >
                <td
                    ><i
                        title="submit to primary facility"
                        class="bx bx-plus bx-md me-1"
                    ></i></td
                >
                <td
                    ><i
                        title="submit to primary facility"
                        class="bx bx-plus bx-md me-1"
                    ></i></td
                >
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <th title="Joint Facility" scope="row">Swift</th>
                <td></td>
                <td></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td></td>
                <td></td>
                <td></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
            </tr>
            <tr>
                <th title="Joint Facility" scope="row">Fermi</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <th title="Joint Facility" scope="row">NuSTAR</th>
                <td></td>
                <td></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td></td>
                <td></td>
                <td></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
            </tr>

            <tr>
                <th title="Joint Facility" scope="row">TESS</th>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td></td>
                <td></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td></td>
            </tr>
            <tr>
                <th title="Joint Facility" scope="row">NICER</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td></td>
                <td></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
            </tr>
            <tr>
                <th title="Joint Facility" scope="row">IXPE</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <th title="Joint Facility" scope="row">NRAO</th>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td
                    ><i
                        title="submit to primary facility"
                        class="bx bx-plus bx-md me-1"
                    ></i></td
                >
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td></td>
                <td></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td></td>
            </tr>
            <tr>
                <th title="Joint Facility" scope="row">ALMA</th>
                <td></td>
                <td
                    ><i
                        title="submit to primary facility"
                        class="bx bx-plus bx-md me-1"
                    ></i></td
                >
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <th title="Joint Facility" scope="row">LCO</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td
                    ><i
                        title="coordinated reviews"
                        class="bx bx-star bx-md me-1"
                    ></i></td
                >
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <th title="Joint Facility" scope="row">NOIRlab</th>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td></td>
                <td></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <th title="Joint Facility" scope="row">VERITAS</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><i class="bx bx-check bx-md me-1"></i></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
</div>

<style>
    #table-container {
        overflow: visible;
    }

    td {
        height: 66px;
    }

    /* Ensures table header bottom border sticks to the header */
    table {
        border-collapse: separate; /* Don't collapse */
        border-spacing: 0;
    }

    #table-container::-webkit-scrollbar {
        display: none;
    }

    .header {
        position: sticky;
        background-color: var(--si-body-bg);
    }
</style>

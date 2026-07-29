<script lang="ts">
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';

    type RaDecTuple = [number, number];

    type ObservationWithUnknownFields = Record<string, unknown> & {
        id?: string;
        object_name?: string;
        date_range?: {
            begin?: string;
            end?: string;
        };
        pointing_position?: {
            ra?: number;
            dec?: number;
        };
    };

    interface AladinOverlay {
        addFootprints: (footprints: unknown[]) => void;
    }

    interface AladinInstance {
        addOverlay: (overlay: AladinOverlay) => void;
        gotoRaDec: (ra: number, dec: number) => void;
        animateToRaDec?: (ra: number, dec: number, durationMs?: number) => void;
        setFov: (degrees: number) => void;
        removeLayers: () => void;
    }

    interface AladinNamespace {
        init: Promise<void>;
        aladin: (selector: string, options?: Record<string, unknown>) => AladinInstance;
        graphicOverlay: (options?: { color?: string; lineWidth?: number }) => AladinOverlay;
        polygon: (points: RaDecTuple[]) => unknown;
    }

    export let data;

    $: scheduleId = data.scheduleId as string;
    $: observations = (data.observations || []) as ObservationWithUnknownFields[];
    $: error = data.error as string;
    $: totalCount = data.totalCount as number;

    const MAX_SCAN_DEPTH = 8;

    let aladin: AladinInstance | null = null;
    let mapError = '';
    let mapReady = false;
    let selectedObservationId = '';
    let sliderStartIndex = 0;
    let sliderEndIndex = -1;
    let observationsTableContainer: HTMLDivElement | null = null;

    const getAladinGlobal = (): AladinNamespace | undefined => {
        const aladinWindow = window as Window & { A?: AladinNamespace };
        return aladinWindow.A;
    };

    const toNumber = (value: unknown): number | null => {
        if (typeof value === 'number' && Number.isFinite(value)) return value;
        if (typeof value === 'string') {
            const parsed = Number(value);
            return Number.isFinite(parsed) ? parsed : null;
        }
        return null;
    };

    const toPoint = (value: unknown): RaDecTuple | null => {
        if (!value) return null;

        if (Array.isArray(value) && value.length >= 2) {
            const ra = toNumber(value[0]);
            const dec = toNumber(value[1]);
            if (ra === null || dec === null) return null;
            return [ra, dec];
        }

        if (typeof value === 'object') {
            const record = value as Record<string, unknown>;
            const ra = toNumber(record.ra) ?? toNumber(record.x) ?? toNumber(record.lon);
            const dec = toNumber(record.dec) ?? toNumber(record.y) ?? toNumber(record.lat);
            if (ra === null || dec === null) return null;
            return [ra, dec];
        }

        return null;
    };

    const toPolygon = (value: unknown): RaDecTuple[] | null => {
        if (!Array.isArray(value) || value.length < 3) return null;

        const polygon: RaDecTuple[] = [];
        for (const candidate of value) {
            const point = toPoint(candidate);
            if (!point) return null;
            polygon.push(point);
        }

        return polygon;
    };

    const extractPolygons = (value: unknown, depth = 0): RaDecTuple[][] => {
        if (!value || depth > MAX_SCAN_DEPTH) return [];

        const directPolygon = toPolygon(value);
        if (directPolygon) return [directPolygon];

        if (Array.isArray(value)) {
            return value.flatMap((child) => extractPolygons(child, depth + 1));
        }

        if (typeof value !== 'object') return [];

        const record = value as Record<string, unknown>;
        const matchingKeys = Object.keys(record).filter((key) => {
            const lowered = key.toLowerCase();
            return lowered.includes('footprint') || lowered.includes('polygon');
        });

        if (matchingKeys.length > 0) {
            return matchingKeys.flatMap((key) => extractPolygons(record[key], depth + 1));
        }

        return Object.values(record).flatMap((child) => extractPolygons(child, depth + 1));
    };

    const uniquePolygons = (polygons: RaDecTuple[][]): RaDecTuple[][] => {
        const unique = new Map<string, RaDecTuple[]>();

        for (const polygon of polygons) {
            unique.set(JSON.stringify(polygon), polygon);
        }

        return Array.from(unique.values());
    };

    const toTimestamp = (value: unknown): number | null => {
        if (typeof value !== 'string') return null;
        const timestamp = Date.parse(value);
        return Number.isFinite(timestamp) ? timestamp : null;
    };

    const formatTimestamp = (timestamp: number | null): string => {
        if (timestamp === null) return 'N/A';
        return new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ');
    };

    type ObservationFootprint = {
        observationId: string;
        objectName: string;
        polygons: RaDecTuple[][];
        startMs: number | null;
        endMs: number | null;
    };

    const buildObservationFootprint = (observation: ObservationWithUnknownFields): ObservationFootprint => {
        const dateRange = (observation.date_range || {}) as Record<string, unknown>;
        return {
            observationId: observation.id || 'unknown-observation',
            objectName: observation.object_name || 'Unknown target',
            polygons: uniquePolygons(extractPolygons(observation)),
            startMs: toTimestamp(dateRange.begin),
            endMs: toTimestamp(dateRange.end),
        };
    };

    const isContainedInTimeRange = (observation: ObservationFootprint, rangeStartMs: number, rangeEndMs: number): boolean => {
        if (observation.startMs === null || observation.endMs === null) {
            return true;
        }

        return observation.startMs >= rangeStartMs && observation.endMs <= rangeEndMs;
    };

    $: observationFootprints = observations.map((observation) => buildObservationFootprint(observation));

    $: observationTimeBounds = observationFootprints
        .flatMap((footprint) => [footprint.startMs, footprint.endMs])
        .filter((value): value is number => value !== null)
        .sort((a, b) => a - b);

    $: uniqueTimeBounds = Array.from(new Set(observationTimeBounds));

    $: if (uniqueTimeBounds.length > 0) {
        if (sliderStartIndex < 0 || sliderStartIndex >= uniqueTimeBounds.length) {
            sliderStartIndex = 0;
        }

        if (sliderEndIndex < 0 || sliderEndIndex >= uniqueTimeBounds.length) {
            sliderEndIndex = uniqueTimeBounds.length - 1;
        }

        if (sliderStartIndex > sliderEndIndex) {
            sliderStartIndex = sliderEndIndex;
        }
    } else {
        sliderStartIndex = 0;
        sliderEndIndex = 0;
    }

    $: sliderRangeStartMs = uniqueTimeBounds.length ? uniqueTimeBounds[sliderStartIndex] : null;
    $: sliderRangeEndMs = uniqueTimeBounds.length ? uniqueTimeBounds[sliderEndIndex] : null;

    $: visibleObservationFootprints =
        sliderRangeStartMs === null || sliderRangeEndMs === null
            ? observationFootprints
            : observationFootprints.filter((observation) => isContainedInTimeRange(observation, sliderRangeStartMs, sliderRangeEndMs));

    $: hiddenObservationFootprints = observationFootprints.filter((observation) => !visibleObservationFootprints.includes(observation));

    $: visibleObservationIds = new Set(visibleObservationFootprints.map((observation) => observation.observationId));

    $: observationPolygons = uniquePolygons(visibleObservationFootprints.flatMap((observation) => observation.polygons));

    $: totalPolygons = uniquePolygons(observationFootprints.flatMap((observation) => observation.polygons)).length;

    $: firstPointingPosition =
        observations
            .filter((observation) => Boolean(observation.id) && visibleObservationIds.has(observation.id || ''))
            .map((observation) => observation.pointing_position)
            .map((pointingPosition) => toPoint(pointingPosition))
            .find((point) => point !== null) || null;

    // Scroll table to selected observation when polygon is clicked
    $: if (browser && selectedObservationId && observationsTableContainer) {
        const selectedRow = observationsTableContainer.querySelector(
            `tr[data-observation-id="${selectedObservationId}"]`
        ) as HTMLTableRowElement | null;

        if (selectedRow) {
            selectedRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    const handleSliderStartInput = (event: Event) => {
        const target = event.currentTarget as HTMLInputElement;
        const nextStart = Number(target.value);
        sliderStartIndex = Math.min(nextStart, sliderEndIndex);
    };

    const handleSliderEndInput = (event: Event) => {
        const target = event.currentTarget as HTMLInputElement;
        const nextEnd = Number(target.value);
        sliderEndIndex = Math.max(nextEnd, sliderStartIndex);
    };

    const estimateFov = (polygons: RaDecTuple[][]): number => {
        const points = polygons.flat();
        if (points.length === 0) return 10;

        const raValues = points.map((point) => point[0]);
        const decValues = points.map((point) => point[1]);

        const raSpan = Math.max(...raValues) - Math.min(...raValues);
        const decSpan = Math.max(...decValues) - Math.min(...decValues);
        const span = Math.max(raSpan, decSpan);

        return Math.min(180, Math.max(0.2, span * 1.5));
    };

    const getObservationCenter = (observation: ObservationFootprint): RaDecTuple | null => {
        const points = observation.polygons.flat();
        if (!points.length) return null;

        const raMean = points.reduce((sum, point) => sum + point[0], 0) / points.length;
        const decMean = points.reduce((sum, point) => sum + point[1], 0) / points.length;

        return [raMean, decMean];
    };

    const centerOnObservation = (observation: ObservationFootprint) => {
        if (!aladin) return;

        const center = getObservationCenter(observation);
        if (!center) return;

        const [ra, dec] = center;
        if (typeof aladin.animateToRaDec === 'function') {
            aladin.animateToRaDec(ra, dec, 1.5);
        } else {
            aladin.gotoRaDec(ra, dec);
        }

        const selectedObservationFov = 2.0 * estimateFov(observation.polygons);
        aladin.setFov(selectedObservationFov);
        selectedObservationId = observation.observationId;
    };

    $: mapCenter = observationPolygons[0]?.[0] || firstPointingPosition || [0, 0];

    const drawFootprints = (polygons: RaDecTuple[][]) => {
        const A = getAladinGlobal();
        if (!A || !aladin) return;

        aladin.removeLayers();

        const overlay = A.graphicOverlay({
            color: '#ff5722',
            lineWidth: 2,
        });

        aladin.addOverlay(overlay);

        // Create mapping from polygon coordinates to observation ID for click handling
        const polygonToObservationMap = new Map<string, string>();

        // Draw each visible observation's polygons, attaching click handlers
        visibleObservationFootprints.forEach((observation) => {
            observation.polygons.forEach((polygon) => {
                const polygonKey = JSON.stringify(polygon);
                polygonToObservationMap.set(polygonKey, observation.observationId);

                const polygonObj = A.polygon(polygon);

                // Attach observation ID as metadata to the polygon object
                (polygonObj as any)._observationId = observation.observationId;

                // Try to attach click handler to the polygon object
                if (typeof (polygonObj as any).on === 'function') {
                    (polygonObj as any).on('click', () => {
                        selectedObservationId = observation.observationId;
                    });
                }

                overlay.addFootprints([polygonObj]);
            });
        });

        // Also add a global click listener on the overlay as fallback
        if (typeof (overlay as any).on === 'function') {
            (overlay as any).on('click', (event: any) => {
                // Try to extract observation ID from the clicked polygon
                if (event && event.data && (event.data as any)._observationId) {
                    selectedObservationId = (event.data as any)._observationId;
                }
            });
        }
    };

    const loadAladinScript = (): Promise<void> => {
        if (getAladinGlobal()) return Promise.resolve();

        return new Promise((resolve, reject) => {
            const scriptTag = document.createElement('script');
            scriptTag.src = 'https://aladin.cds.unistra.fr/AladinLite/api/v3/latest/aladin.js';
            scriptTag.async = true;
            scriptTag.onload = () => resolve();
            scriptTag.onerror = () => reject(new Error('Unable to load Aladin Lite script.'));
            document.head.appendChild(scriptTag);
        });
    };

    const initializeMap = async () => {
        try {
            await loadAladinScript();

            const A = getAladinGlobal();

            if (!A) {
                mapError = 'Aladin Lite did not initialize correctly.';
                return;
            }

            await A.init;

            aladin = A.aladin('#schedule-footprint-map', {
                survey: 'P/DSS2/color',
                target: '0 +0',
                fov: 20,
                showReticle: true,
                showCooGrid: true,
                showCooGridControl: true,
            });

            const [initialRa, initialDec] = mapCenter;
            aladin.gotoRaDec(initialRa, initialDec);
            aladin.setFov(estimateFov(observationPolygons));

            mapReady = true;
            drawFootprints(observationPolygons);
        } catch (err) {
            console.error('Error creating Aladin Lite instance:', err);
            mapError = 'Unable to initialize sky visualization.';
        }
    };

    $: if (browser && mapReady) {
        drawFootprints(observationPolygons);
    }

    onMount(async () => {
        if (!browser) return;
        await initializeMap();
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="https://aladin.cds.unistra.fr/AladinLite/api/v3/latest/aladin.min.css" />
</svelte:head>

<Page title="Schedule Footprint Visualization" icon="star">
    <Section title="Schedule {scheduleId}" icon="calendar">
        <div class="space-y-4 border-t border-base-300 pt-3">
            {#if error}
                <div class="alert alert-error">
                    <span>{error}</span>
                </div>
            {/if}

            {#if mapError}
                <div class="alert alert-warning">
                    <span>{mapError}</span>
                </div>
            {/if}

            <div class="stats stats-horizontal bg-base-200 shadow w-full md:w-fit">
                <div class="stat">
                    <div class="stat-title">Observations Loaded</div>
                    <div class="stat-value text-2xl">{totalCount}</div>
                </div>
                <div class="stat">
                    <div class="stat-title">Visible Footprint Polygons</div>
                    <div class="stat-value text-2xl">{observationPolygons.length}</div>
                </div>
                <div class="stat">
                    <div class="stat-title">Hidden Observations</div>
                    <div class="stat-value text-2xl">{hiddenObservationFootprints.length}</div>
                </div>
            </div>

            {#if uniqueTimeBounds.length > 1}
                <div class="space-y-3 bg-base-200 p-4 rounded-box">
                    <div class="text-sm font-semibold">Observation Time Filter</div>
                    <div class="text-xs opacity-80">
                        Range: {formatTimestamp(sliderRangeStartMs)} to {formatTimestamp(sliderRangeEndMs)}
                    </div>
                    <div class="grid grid-cols-1 gap-3">
                        <label class="text-xs opacity-80" for="time-slider-start">Start Bound</label>
                        <input
                            id="time-slider-start"
                            class="range range-info"
                            type="range"
                            min="0"
                            max={String(uniqueTimeBounds.length - 1)}
                            value={sliderStartIndex}
                            on:input={handleSliderStartInput}
                        />
                        <label class="text-xs opacity-80" for="time-slider-end">End Bound</label>
                        <input
                            id="time-slider-end"
                            class="range range-info"
                            type="range"
                            min="0"
                            max={String(uniqueTimeBounds.length - 1)}
                            value={sliderEndIndex}
                            on:input={handleSliderEndInput}
                        />

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs opacity-80">
                            <div>
                                Start Bound: {formatTimestamp(sliderRangeStartMs)}
                            </div>
                            <div class="md:text-right">
                                End Bound: {formatTimestamp(sliderRangeEndMs)}
                            </div>
                        </div>
                    </div>
                </div>
            {/if}

            {#if totalCount > 0 && observationPolygons.length === 0}
                <div class="alert alert-info">
                    <span> Observations were found for this schedule, but no footprint polygons were detected in the API response. </span>
                </div>
            {/if}

            {#if totalPolygons > observationPolygons.length}
                <div class="alert alert-info">
                    <span>
                        Time filter is hiding {totalPolygons - observationPolygons.length} polygon(s) from observations outside the selected
                        range.
                    </span>
                </div>
            {/if}

            <div id="schedule-footprint-map" class="w-full h-[65vh] min-h-120 rounded-box border border-base-300"></div>

            <div
                class="overflow-x-auto overflow-y-auto border border-base-300 rounded-box max-h-112"
                bind:this={observationsTableContainer}
            >
                <table class="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Target</th>
                            <th>RA (deg)</th>
                            <th>Dec (deg)</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Polygons</th>
                            <th>Visible</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#if observationFootprints.length === 0}
                            <tr>
                                <td colspan={8} class="text-center py-3">No observations available.</td>
                            </tr>
                        {:else}
                            {#each observationFootprints as observation}
                                {@const isVisible = visibleObservationIds.has(observation.observationId)}
                                {@const isSelected = selectedObservationId === observation.observationId}
                                {@const observationCenter = getObservationCenter(observation)}
                                <tr
                                    data-observation-id={observation.observationId}
                                    class="{selectedObservationId === observation.observationId ? 'bg-base-300' : ''} {observation.polygons
                                        .length > 0
                                        ? 'cursor-pointer'
                                        : ''}"
                                    on:dblclick={() => centerOnObservation(observation)}
                                >
                                    <td
                                        class="text-xs {isSelected
                                            ? 'bg-info text-info-content font-semibold outline-2 outline-info -outline-offset-2'
                                            : ''}"
                                    >
                                        {observation.objectName}
                                    </td>
                                    <td class="text-xs font-mono">{observationCenter ? observationCenter[0].toFixed(5) : 'N/A'}</td>
                                    <td class="text-xs font-mono">{observationCenter ? observationCenter[1].toFixed(5) : 'N/A'}</td>
                                    <td class="text-xs">{formatTimestamp(observation.startMs)}</td>
                                    <td class="text-xs">{formatTimestamp(observation.endMs)}</td>
                                    <td>{observation.polygons.length}</td>
                                    <td>{isVisible ? 'Yes' : 'No'}</td>
                                    <td>
                                        <button
                                            class="btn btn-xs btn-outline btn-info"
                                            disabled={observation.polygons.length === 0}
                                            on:click={() => centerOnObservation(observation)}
                                        >
                                            Center
                                        </button>
                                    </td>
                                </tr>
                            {/each}
                        {/if}
                    </tbody>
                </table>
            </div>
        </div>
    </Section>
</Page>

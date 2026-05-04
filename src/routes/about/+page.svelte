<script lang="ts">
    import Section from '$lib/components/Section.svelte';
</script>

<Section title="What is ACROSS?">
    <div class="border-t border-base-300 pt-3 space-y-3">
        <p class="leading-relaxed">
            The <strong>Astrophysics Cross-Observatory Science Support (ACROSS)</strong> initiative aims to advance time-domain and multimessenger
            (TDAMM) science by facilitating the coordination of observational resources and scientific expertise. Its goal is to enable rapid,
            unified, and effective responses to astrophysical events — maximizing the scientific return of the astrophysics community.
        </p>
        <p class="leading-relaxed">
            ACROSS is a <strong>NASA-led effort</strong>, initially focused on supporting NASA's own fleet of space observatories, with the
            longer-term vision of potentially expanding to include observatories across the broader astrophysics community.
        </p>
        <p class="leading-relaxed">
            Advancing this field relies not only on technological innovation and scientific insight, but equally on the collaboration,
            communication, and infrastructure necessary to support multifaceted exploration of the universe.
        </p>
    </div>
</Section>

<Section title="System Overview">
    <div class="border-t border-base-300 pt-3 space-y-3">
        <p class="leading-relaxed">
            The ACROSS system aggregates and normalizes supported mission schedule and observation data to provide a single queryable source
            for science situational awareness across NASA's ground and space observatories. By providing a unified interface to access and
            analyze this data, ACROSS empowers scientists to make informed decisions about observation planning, coordination, and
            execution.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div class="bg-base-200 p-4 space-y-2">
                <div class="text-primary">
                    <i class="bx bx-analyze text-2xl"></i>
                </div>
                <p class="font-semibold">Aggregated Data</p>
                <p class="text-sm leading-relaxed">
                    Normalizes schedule and observation data from multiple missions into a single, consistent data model.
                </p>
            </div>
            <div class="bg-base-200 p-4 space-y-2">
                <div class="text-primary">
                    <i class="bx bx-search-alt text-2xl"></i>
                </div>
                <p class="font-semibold">Unified Query Interface</p>
                <p class="text-sm leading-relaxed">
                    A single API to query across all supported observatories, telescopes, and instruments simultaneously.
                </p>
            </div>
            <div class="bg-base-200 p-4 space-y-2">
                <div class="text-primary">
                    <i class="bx bx-calendar-check text-2xl"></i>
                </div>
                <p class="font-semibold">Observing Tools</p>
                <p class="text-sm leading-relaxed">
                    Built-in tools for visibility calculation, schedule coordination, and observation planning to support TDAMM science.
                </p>
            </div>
        </div>
    </div>
</Section>

<Section title="Open Data Policy" icon="lock-open-alt">
    <div class="border-t border-base-300 pt-3 space-y-3">
        <p class="leading-relaxed">
            ACROSS is committed to making astrophysics scheduling and observation data as openly accessible as possible. <strong
                >No account or login is required to read data from the ACROSS API.</strong
            >
            All <code class="bg-base-200 px-1 text-sm">GET</code> endpoints are publicly accessible without authentication, allowing anyone to
            query schedules, observations, observatory configurations, and visibility information freely.
        </p>
        <p class="leading-relaxed">
            Authentication is only required for write operations — such as submitting or updating schedule data on behalf of an observatory.
            These actions require credentials issued to registered observatory partners.
        </p>
    </div>
</Section>

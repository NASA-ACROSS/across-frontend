<script lang="ts">
    import Section from '$lib/components/Section.svelte';
    import type { PageData } from '../$types';

    export let data: PageData;
</script>

<Section title="Observatories" id="observatories">
    <div class="border-t border-base-300 pt-3 space-y-3">
        <p class="leading-relaxed">
            Supported observatories are represented through a series of one-to-many relationships: an observatory has many telescopes, and a
            telescope can have many instruments. This generalized approach allows us to support a wide variety of observatory
            configurations, and has the flexibility to accommodate future additions and/or changes to supported missions.
        </p>
        <p class="py-2 leading-relaxed">The instrument model supports the following metadata:</p>
        <ul class="list-disc list-inside space-y-1 ml-2 leading-relaxed">
            <li>
                <strong>Field of View (FOV) Footprint</strong> — instruments with imaging capabilities can have their FOV represented as a list
                of polygon vertices. Upon data-ingestion, we accept a projected footprint for the instrument's observation FOV.
            </li>
            <li>
                <strong>Visibility Constraints</strong> — a list of observing constraints (e.g. sun angle, moon angle, Earth limb exclusion)
                used by the visibility calculator to determine when a target is observable by that instrument.
            </li>
            <li>
                <strong>Bandpass Filters</strong> — a list of filters describing the wavelength, energy, or frequency regimes the instrument
                can probe, covering both photometric (broadband filters) and spectroscopic (grisms, gratings) modes. Filter ranges are stored
                in Angstroms.
            </li>
        </ul>
        <div class="bg-base-200 p-4 pb-6 mt-4 text-sm leading-relaxed">
            <p class="font-semibold mb-3">Hierarchy</p>
            <div class="flex items-center gap-2 flex-wrap content/80">
                <span class="badge badge-primary">Observatory</span>
                <span>→</span>
                <span class="badge badge-primary">Telescope(s)</span>
                <span>→</span>
                <span class="badge badge-primary">Instrument(s)</span>
                <span class="content/40">→</span>
                <span class="badge badge-secondary">Footprint</span>
                <span class="badge badge-secondary">Visibility Constraints</span>
                <span class="badge badge-secondary">Bandpass Filters</span>
            </div>
        </div>
    </div>
</Section>

<Section title="Schedules" id="schedules">
    <div class="border-t border-base-300 pt-3 space-y-3">
        <p class="leading-relaxed">
            Similarly, observing schedules are represented as an aggregation of many observations over a continuous date range. A schedule
            can contain observations belonging to multiple instruments associated with the particular schedule's telescope.
        </p>
        <p class="py-2 leading-relaxed">Each observation can be described by:</p>
        <ul class="list-disc list-inside space-y-1 ml-2 leading-relaxed">
            <li>Observation type (spectroscopy, imaging, etc.)</li>
            <li>Target coordinates</li>
            <li>A date range for the exposure time</li>
            <li>Bandpass and filter information</li>
            <li>Status:</li>
            <ul class="list-disc list-inside space-y-1 ml-2 leading-relaxed marker:text-carbon-40">
                <li>Planned - Subject to change</li>
                <li>Scheduled - Unlikely to change, committed to spacecraft.</li>
                <li>Performed - As flown schedules</li>
            </ul>
            <li>
                Fidelity: (high or low) - denotes confidence of Planned schedules becoming Scheduled. Some teams choose to plan low fidelity
                schedules and refine later.
            </li>
            <li>
                <a href="{data?.apiDocsUrl}#/Observation/get_observation" target="_blank" class="text-blue-600 italic hover:underline">
                    See full observation model response on API docs
                </a>
            </li>
        </ul>
        <p class="py-2 leading-relaxed">
            There are current plans on providing a translation between this observation model and the IVOA ObsLocTAP standard in the near
            future.
        </p>
    </div>
</Section>

<Section title="Units & Conventions" id="units">
    <div class="border-t border-base-300 pt-3 space-y-3">
        <p class="leading-relaxed">Below are the assumptions for how we store physical representations of our data.</p>
        <ul class="list-disc list-inside space-y-1 ml-2 leading-relaxed">
            <li>
                All dates are stored in ISO format (<code class="bg-base-200 px-1 text-sm">YYYY-MM-DDTHH:MM:SSZ</code>) in UTC timezone.
            </li>
            <li>All coordinates are stored in decimal degrees</li>
            <ul class="list-disc pl-6 space-y-1 ml-2 leading-relaxed">
                <li>RA values between 0° and 360°</li>
                <li>Dec values between -90° and 90°</li>
            </ul>
            <li>
                All FOV polygons are stored as lists of vertices, where each vertex is a <code class="bg-base-200 px-1 text-sm"
                    >(RA, Dec)</code
                > tuple in decimal degrees.
            </li>
            <li>All associated instrument filter (bandpass, grism) ranges are stored in Angstroms.</li>
        </ul>
    </div>
</Section>

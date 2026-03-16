<h2 class="text-3xl flex flex-col md:flex-row justify-between text-primary md:items-center items-start pb-3">
    <div>Data Models</div>
</h2>
<div class="space-y-8">
    <section id="observatories" class="space-y-3">
        <h3 class="text-2xl font-semibold text-primary border-b border-base-300 pb-2">Observatories</h3>
        <p class="text-base leading-relaxed">
            The way we represent our supported observatories is nominally through a series of one-to-many relationships: an observatory has many telescopes, and
            a telescope can have many instruments. This generalized approach allows us to support a wide variety of observatory configurations, and is flexible
            enough to accommodate future additions and changes to our supported missions.
        </p>
        <p class="text-base leading-relaxed">The instrument model supports the following metadata:</p>
        <ul class="list-disc list-inside space-y-1 ml-2 text-base leading-relaxed">
            <li>
                <strong>FOV Footprint</strong> — instruments with imaging capabilities can have their field of view represented as a list of polygon vertices. Upon
                data-ingestion, we accept a projected footprint for the instrument's observation FOV.
            </li>
            <li>
                <strong>Visibility Constraints</strong> — a list of observing constraints (e.g. sun angle, moon angle, Earth limb exclusion) used by the visibility
                calculator to determine when a target is observable by that instrument.
            </li>
            <li>
                <strong>Bandpass Filters</strong> — a list of filters describing the wavelength, energy, or frequency regimes the instrument can probe, covering
                both photometric (broadband filters) and spectroscopic (grisms, gratings) modes. Filter ranges are stored in Angstroms.
            </li>
        </ul>
        <div class="bg-base-200 rounded-box p-4 text-sm leading-relaxed">
            <p class="font-semibold mb-2">Hierarchy</p>
            <div class="flex items-center gap-2 flex-wrap text-base-content/80">
                <span class="badge badge-primary badge-outline">Observatory</span>
                <span>→</span>
                <span class="badge badge-primary badge-outline">Telescope(s)</span>
                <span>→</span>
                <span class="badge badge-primary badge-outline">Instrument(s)</span>
                <span>→</span>
                <span class="badge badge-secondary badge-outline">Footprint(s)</span>
                <span class="text-base-content/40">|</span>
                <span class="badge badge-secondary badge-outline">Visibility Constraints</span>
                <span class="text-base-content/40">|</span>
                <span class="badge badge-secondary badge-outline">Bandpass Filters</span>
            </div>
        </div>
    </section>

    <section id="schedules" class="space-y-3">
        <h3 class="text-2xl font-semibold text-primary border-b border-base-300 pb-2">Schedules</h3>
        <p class="text-base leading-relaxed">
            Similarly, we represent observing schedules where a schedule is an aggregation of many observations over a continuous date range. A schedule can
            contain observations belonging to multiple instruments associated with the particular schedule's telescope.
        </p>
        <p class="text-base leading-relaxed">Each observation can be described by:</p>
        <ul class="list-disc list-inside space-y-1 ml-2 text-base leading-relaxed">
            <li>Observation type (spectroscopy, imaging, etc.)</li>
            <li>Target coordinates</li>
            <li>A date range for the exposure time</li>
        </ul>
    </section>

    <section id="units" class="space-y-3">
        <h3 class="text-2xl font-semibold text-primary border-b border-base-300 pb-2">Units & Conventions</h3>
        <p class="text-base leading-relaxed">Below are the assumptions for how we store physical representations of our data.</p>
        <ul class="list-disc list-inside space-y-1 ml-2 text-base leading-relaxed">
            <li>All dates are stored in ISO format (<code class="bg-base-200 px-1 rounded text-sm">YYYY-MM-DDTHH:MM:SSZ</code>) in UTC timezone.</li>
            <li>All coordinates are stored in decimal degrees, with RA values between 0° and 360°, and Dec values between -90° and 90°.</li>
            <li>
                All FOV polygons are stored as lists of vertices, where each vertex is a <code class="bg-base-200 px-1 rounded text-sm">(RA, Dec)</code> tuple in
                decimal degrees.
            </li>
            <li>All associated instrument filter (bandpass, grism) ranges are stored in Angstroms.</li>
        </ul>
    </section>
</div>

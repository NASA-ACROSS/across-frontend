<h2 class="text-3xl flex flex-col md:flex-row justify-between text-primary md:items-center items-start pb-3">
    <div>Tools & Code</div>
</h2>
<div class="space-y-10">
    <p class="text-base leading-relaxed">
        In addition to ingested mission scheduling data, a set of observing tools is available to aid in TDAMM observing endeavors — accessible both as
        interactive web-based portals and as open-source Python packages.
    </p>

    <!-- ── Online Portals ─────────────────────────────────────────── -->
    <div class="space-y-6">
        <div class="flex items-center gap-3">
            <i class="bx bx-desktop text-2xl text-primary"></i>
            <h3 class="text-2xl font-bold text-primary">Web Tools</h3>
        </div>
        <div class="border-l-4 border-primary pl-6 space-y-8">
            <!-- Visibility Calculator -->
            <section id="visibility-calculator" class="space-y-3">
                <h3 class="text-2xl font-semibold text-primary border-b border-base-300 pb-2 flex items-center justify-between">
                    <span>Visibility Calculator</span>
                    <a href="/visibility-calculator" class="btn btn-sm btn-outline btn-primary">
                        <i class="bx bx-globe"></i>
                        Open Tool
                    </a>
                </h3>
                <p class="text-base leading-relaxed">
                    The Joint Visibility Calculator allows users to determine when a celestial target is simultaneously observable by one or more selected
                    telescope–instrument combinations. Given a target position (RA/Dec in J2000) and a date range, the tool computes:
                </p>
                <ul class="list-disc list-inside space-y-1 ml-2 text-base leading-relaxed">
                    <li>
                        <strong>Joint Visibility Windows</strong> — time intervals during which <em>all</em> selected instruments can observe the target concurrently
                    </li>
                    <li><strong>Per-Instrument Visibility Windows</strong> — individual observability windows broken down by instrument</li>
                </ul>
                <p class="text-base leading-relaxed">Query parameters include:</p>
                <ul class="list-disc list-inside space-y-1 ml-2 text-base leading-relaxed">
                    <li><strong>Target Coordinates</strong> — RA and Dec (J2000 decimal degrees); an object name resolver is provided for convenience</li>
                    <li><strong>Instrument Selection</strong> — one or more observatory / telescope / instrument combinations</li>
                    <li><strong>Date Range</strong> — the time window over which to calculate visibility</li>
                </ul>
                <div class="bg-base-200 rounded-box p-4 space-y-2 text-sm leading-relaxed">
                    <p class="font-semibold">Visibility Constraints</p>
                    <p class="text-base-content/70">
                        Each instrument carries its own set of observing constraints that are applied during the calculation. Typical constraints include:
                    </p>
                    <ul class="list-disc list-inside space-y-1 ml-2 text-base-content/70">
                        <li><strong>Earth Limb Exclusion</strong> — minimum elevation angle above the Earth's limb for space-based observatories</li>
                        <li><strong>Sun Avoidance</strong> — minimum angular separation between the target and the Sun</li>
                        <li><strong>Moon Avoidance</strong> — minimum angular separation between the target and the Moon</li>
                        <li><strong>SAA Avoidance</strong> — exclusion of passes through the South Atlantic Anomaly for affected missions</li>
                        <li>
                            <strong>Altitude / Azimuth Limits</strong> — minimum elevation above the horizon and azimuth range restrictions for ground-based observatories
                        </li>
                    </ul>
                </div>
            </section>
            <section id="query-portals" class="space-y-4">
                <h3 class="text-2xl font-semibold text-primary border-b border-base-300 pb-2 flex items-center justify-between">
                    <span>Query Portals</span>
                </h3>
                <p class="text-base leading-relaxed">ACROSS provides interactive web-based portals for querying and exploring data directly in the browser.</p>

                <!-- Schedules -->
                <div class="space-y-2">
                    <h4 class="text-xl font-semibold flex items-center justify-between">
                        <span>Schedules</span>
                        <a href="/schedules" class="btn btn-sm btn-outline btn-primary">
                            <i class="bx bx-calendar"></i>
                            Browse Schedules
                        </a>
                    </h4>
                    <p class="text-base leading-relaxed">
                        Query observing schedules across all supported missions. Results can be filtered by the following parameters:
                    </p>
                    <ul class="list-disc list-inside space-y-1 ml-2 text-base leading-relaxed">
                        <li><strong>Observatory / Telescope / Instrument</strong> — filter results to one or more specific instruments</li>
                        <li><strong>Date Range</strong> — narrow results to schedules that overlap a given time window</li>
                        <li><strong>Schedule Type</strong> — filter by planned, executed, or other schedule states</li>
                    </ul>
                    <p class="text-base leading-relaxed">
                        Each schedule in the results links through to its constituent observations, allowing you to drill down from a high-level schedule view
                        into the individual pointings and exposure details that make it up.
                    </p>
                </div>

                <!-- Observations -->
                <div class="space-y-2">
                    <h4 class="text-xl font-semibold flex items-center justify-between">
                        <span>Observations</span>
                        <a href="/observations" class="btn btn-sm btn-outline btn-primary">
                            <i class="bx bx-calendar"></i>
                            Browse Observations
                        </a>
                    </h4>
                    <p class="text-base leading-relaxed">
                        Query individual observations ingested from supported mission schedules. Available filter parameters include:
                    </p>
                    <ul class="list-disc list-inside space-y-1 ml-2 text-base leading-relaxed">
                        <li><strong>Observatory / Telescope / Instrument</strong> — scope results to a specific instrument</li>
                        <li><strong>Date Range</strong> — filter by the start or end time of the observation exposure</li>
                        <li><strong>Observation Type</strong> — filter by mode such as imaging or spectroscopy</li>
                        <li><strong>Coordinates &amp; Search Radius</strong> — find observations targeting a specific sky position</li>
                    </ul>
                </div>
            </section>
        </div>
    </div>
    <!-- ── Python Libraries ──────────────────────────────────────── -->
    <div id="python-libraries" class="space-y-6">
        <div class="flex items-center gap-3">
            <i class="bx bx-cube text-2xl text-primary"></i>
            <h3 class="text-2xl font-bold text-primary">Python Libraries</h3>
        </div>
        <div class="border-l-4 border-primary pl-6 space-y-8">
            <!-- across-tools -->
            <section id="across-tools" class="space-y-3">
                <h3 class="text-2xl font-semibold text-primary border-b border-base-300 pb-2 flex items-center justify-between">
                    <a href="https://pypi.org/project/across-tools" class="hover:underline" target="_blank" rel="noopener noreferrer">across-tools</a>
                    <div class="flex items-center gap-2">
                        <a
                            href="https://across-tools.readthedocs.io/en/latest/"
                            class="inline-flex items-center gap-2 btn btn-sm btn-outline btn-primary mt-1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i class="bx bx-book-open"></i>
                            Read the Docs
                        </a>
                        <a
                            href="https://github.com/NASA-ACROSS/across-tools"
                            class="inline-flex items-center gap-2 btn btn-sm btn-outline btn-primary mt-1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                                />
                            </svg>
                            View on GitHub
                        </a>
                    </div>
                </h3>
                <p class="text-base leading-relaxed">A lightweight astronomy observing Python package that provides functionality for:</p>
                <ul class="list-disc list-inside space-y-1 ml-2 text-base leading-relaxed">
                    <li>Ephemeris Based Visibility Calculation</li>
                    <li>Spherical Polygon Analysis — for instrument footprints</li>
                    <li>Bandpass Converter</li>
                    <li class="italic text-base-content/60">...more coming TBA...</li>
                </ul>
            </section>

            <!-- across-client -->
            <section id="across-client" class="space-y-3">
                <h3 class="text-2xl font-semibold text-primary border-b border-base-300 pb-2 flex items-center justify-between">
                    <a href="https://pypi.org/project/across-client" class="hover:underline" target="_blank" rel="noopener noreferrer">across-client</a>
                    <div class="flex items-center gap-2">
                        <a
                            href="https://across-client.readthedocs.io/en/latest/"
                            class="inline-flex items-center gap-2 btn btn-sm btn-outline btn-primary mt-1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i class="bx bx-book-open"></i>
                            Read the Docs
                        </a>
                        <a
                            href="https://github.com/NASA-ACROSS/across-client"
                            class="inline-flex items-center gap-2 btn btn-sm btn-outline btn-primary mt-1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                                />
                            </svg>
                            View on GitHub
                        </a>
                    </div>
                </h3>
                <p class="text-base leading-relaxed">
                    An API client package that wraps all astronomy observing related API endpoints, while providing resource methods for the aforementioned
                    across-tools package on the API results.
                </p>
            </section>
        </div>
    </div>
</div>

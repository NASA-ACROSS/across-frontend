<h2 class="text-3xl flex flex-col md:flex-row justify-between text-primary md:items-center items-start pb-3">
    <div>Data Ingestion</div>
</h2>
<div class="space-y-8">
    <!-- How We Obtain Data -->
    <section class="space-y-3">
        <h3 class="text-2xl font-semibold text-primary border-b border-base-300 pb-2">How We Obtain Data</h3>
        <p class="text-base leading-relaxed">
            At the start of this project, our data is obtained by aggregating all available open-source mission observing schedules and translating them into
            our data-model format. We have a data-ingestion service that runs a cron-job task for each telescope, grabbing the latest planned (or completed)
            schedule <strong>at that time</strong>.
        </p>
        <p class="text-base leading-relaxed">
            A major caveat to how we do this is that if a given schedule is updated in-between cron tasks, there is a chance that our data repository might not
            capture that update. When a schedule is ingested, we generate a <code class="bg-base-200 px-1 rounded text-sm">checksum</code> based on common schedule
            metadata (date-range, status, type, telescope id, etc.). When a schedule is submitted, we check against the checksum so that the same schedule isn't
            duplicated.
        </p>
        <div class="alert alert-warning text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
            </svg>
            <span>
                We recognize that this method is not ideal given the potential for incompleteness, but our hope is that observing teams will recognize our
                effort as a proof-of-concept and begin submitting their schedules directly to us, mitigating this risk.
            </span>
        </div>
        <div class="bg-base-200 rounded-box p-4 text-sm leading-relaxed flex items-center justify-between gap-4">
            <div>
                <p class="font-semibold mb-1">Ingestion Status</p>
                <p class="text-base-content/70">View the most up-to-date statuses for all active ingestion tasks across our supported missions.</p>
            </div>
            <a href="/ingestion-status" class="btn btn-sm btn-primary whitespace-nowrap">
                <i class="bx bx-sync"></i>
                View Status
            </a>
        </div>
    </section>
    <section class="space-y-3">
        <h3 class="text-2xl font-semibold text-primary border-b border-base-300 pb-2">Submitting Observatory Scheduling Data</h3>
        <p class="text-base leading-relaxed">
            If you have access to your observatory's scheduling information and want to submit it to the ACROSS API, please reach out to our support team. You
            will need to:
        </p>
        <ol class="list-decimal list-inside space-y-1 ml-2 text-base leading-relaxed">
            <li>Register a client with credentials for your observatory's telescope.</li>
            <li>POST schedule data to our API schedule endpoint.</li>
        </ol>
        <div class="bg-base-200 rounded-box p-4 text-sm leading-relaxed">
            <p class="font-semibold mb-1">Ready to get started?</p>
            <p>Contact the ACROSS support team to register your observatory and obtain API credentials.</p>
        </div>
    </section>
</div>

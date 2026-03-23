<script>
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import Section from '$lib/components/Section.svelte';
</script>

<Section title="How Data Is Obtained">
    <a
        slot="buttons"
        href="https://github.com/NASA-ACROSS/across-data-ingestion"
        class="btn h-8 btn-sm btn-outline btn-primary"
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

    <div class="border-t border-base-300 pt-3 space-y-2">
        <p class="leading-relaxed">
            Data is obtained by aggregating all available open-source mission observing schedules and translating them into the appropriate ACROSS data models.
            The ACROSS system has a data-ingestion service that runs a cron-job task for each telescope, grabbing the latest planned (or completed) schedule <strong
                >at that time</strong
            >. Each cron task is scheduled to align with when new schedule information is typically made available by that mission, ensuring ingested data stays
            as current as possible.
        </p>
        <p class="leading-relaxed">
            A major caveat to how this is done is that if a given schedule is updated in-between cron tasks, there is a chance that the data repository might
            not capture that update. When a schedule is ingested, a <code class="bg-base-200 px-1 text-sm">checksum</code> is generated based on common schedule
            metadata (date-range, status, type, telescope id, etc.). When a schedule is submitted, the checksum ensures that the same schedule isn't duplicated.
            Note that this means older versions of a schedule are <strong>retained</strong> — previously ingested schedules are not deleted when a newer version
            is added, preserving a historical record of how schedules have changed over time.
        </p>
        <div class="alert alert-warning alert-soft text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
            </svg>
            <span>
                This method is not ideal given the potential for incompleteness. The ACROSS team is looking for help from the respective observatories to submit
                any schedules directly to the system in order to prevent this incompleteness of data.
            </span>
        </div>
        <div class="alert alert-info alert-soft p-4 text-sm leading-relaxed flex items-center justify-between gap-4">
            <div>
                <p class="font-semibold mb-1">Ingestion Status</p>
                <p>View the most up-to-date statuses for all active ingestion tasks across all supported missions.</p>
            </div>
            <ArrowButton href="/ingestion-status">View Status</ArrowButton>
        </div>
    </div>
</Section>

<Section title="Submitting Observatory Scheduling Data">
    <div class="border-t border-base-300 pt-3 space-y-2">
        <p class="leading-relaxed">
            If you have access to your observatory's scheduling information and want to submit it to the ACROSS API, please reach out to the ACROSS support
            team. You will need to:
        </p>
        <ol class="list-decimal list-inside space-y-1 ml-2 leading-relaxed">
            <li>Register a client with credentials for your observatory's telescope.</li>
            <li>POST schedule data to the API schedule endpoint.</li>
        </ol>
        <div class="bg-base-200 p-4 text-sm leading-relaxed">
            <p class="font-semibold mb-1">Ready to get started?</p>
            <p>Contact the ACROSS support team to register your observatory and obtain API credentials.</p>
        </div>
    </div>
</Section>

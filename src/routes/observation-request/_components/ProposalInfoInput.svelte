<script lang="ts">
    export let proposalCode: string;
    export let proposalName: string;
    export let justification: string;
    export let anonymize: boolean;
</script>

<div class="flex flex-col gap-2">
    <label class="input text-lg pe-0 w-full" for="proposal-code-input">
        Proposal Code:
        <input
            id="proposal-code-input"
            class="input validator input-bordered text-lg w-full"
            type="text"
            bind:value={proposalCode}
            placeholder="XYZ-123"
            maxlength="128"
        />
        <p class="hidden validator-hint mt-18" style="position: absolute;">Must be less than or equal to 128 characters</p>
    </label>

    <label class="input text-lg pe-0 w-full" for="proposal-name-input">
        Proposal Name:
        <input
            id="proposal-name-input"
            class="input validator input-bordered text-lg w-full"
            type="text"
            bind:value={proposalName}
            placeholder="My Super Awesome Proposal"
            maxlength="4096"
        />
        <p class="hidden validator-hint mt-18" style="position: absolute;">Must be less than or equal to 4096 characters</p>
    </label>

    <div>
        <label class="label text-lg" for="date-input">
            <span class="label-text">Justification</span>
        </label>
        <div class="grid gap-2 w-full">
            <textarea class="textarea textarea-lg w-full" rows="5" bind:value={justification} maxlength="8192" />
            <p class="hidden validator-hint mt-18" style="position: absolute;">Must be less than or equal to 8192 characters</p>
        </div>
        <input
            id="proposal-justification-input"
            class="input validator input-bordered text-lg w-full"
            type="text"
            bind:value={justification}
            maxlength="8192"
            hidden={true}
        />
    </div>

    <div>
        <label class="label text-xl">
            <input id="anonymize-proposal-input" type="checkbox" bind:checked={anonymize} class="checkbox checkbox-info bg-secondary" />
            Anonymize Proposal Information
        </label>
    </div>
</div>

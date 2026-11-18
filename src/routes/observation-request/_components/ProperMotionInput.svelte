<script lang="ts">
    import UnitValueInput from '#lib/components/inputs/UnitValueInput.svelte';

    interface Props {
        properMotionRa: number | undefined;
        properMotionDec: number | undefined;
        properMotionEpoch: string;
    }

    let { properMotionRa = $bindable(), properMotionDec = $bindable(), properMotionEpoch = $bindable() }: Props = $props();
</script>

<div>
    <UnitValueInput
        required={true}
        id="proper-motion-ra"
        displayName="Proper Motion RA"
        bind:value={properMotionRa}
        unit="mas/yr"
        placeholder="decimal"
    />
    <UnitValueInput
        required={true}
        id="proper-motion-dec"
        displayName="Proper Motion Dec"
        bind:value={properMotionDec}
        unit="mas/yr"
        placeholder="decimal"
    />
    <label class="input text-lg pe-0 w-full mb-4" for="proper-motion-epoch-input">
        Proper Motion Epoch:
        <input
            id="proper-motion-epoch-input"
            class="input validator input-bordered text-lg w-full"
            type="text"
            required
            minlength="1"
            maxlength="16"
            bind:value={properMotionEpoch}
            placeholder="J2000"
        />
        <p class="hidden validator-hint mt-18" style="position: absolute;">Must be between 1 and 16 characters</p>
    </label>
</div>

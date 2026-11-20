<script lang="ts">
    import UnitValueInput from '#lib/components/inputs/UnitValueInput.svelte';

    interface Props {
        ra: number | undefined;
        dec: number | undefined;
        epoch: string;
    }

    let { ra = $bindable(), dec = $bindable(), epoch = $bindable() }: Props = $props();
</script>

<div>
    <UnitValueInput
        required={true}
        id="proper-motion-ra"
        displayName="Proper Motion RA"
        bind:value={ra}
        unit="mas/yr"
        placeholder="decimal"
    />
    <UnitValueInput
        required={true}
        id="proper-motion-dec"
        displayName="Proper Motion Dec"
        bind:value={dec}
        unit="mas/yr"
        placeholder="decimal"
    />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
        <div>
            <label class="label text-lg" for="proper-motion-epoch-input">
                <span class="label-text">Proper Motion Epoch</span>
            </label>
            <label class="input text-lg w-full"
                >Value:
                <input
                    id="proper-motion-epoch-input"
                    class="input validator input-bordered text-lg w-full"
                    type="text"
                    required
                    minlength="1"
                    maxlength="16"
                    bind:value={epoch}
                    placeholder="J2000"
                />
                <p class="hidden validator-hint mt-18" style="position: absolute;">Must be between 1 and 16 characters</p>
            </label>
        </div>
    </div>
</div>
